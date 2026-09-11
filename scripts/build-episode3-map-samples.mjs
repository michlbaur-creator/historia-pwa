import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mapRoot = path.join(projectRoot, 'public/assets/historia');
const outputRoot = path.join(mapRoot, 'episode3/maps');

const europeSource = await readFile(
  path.join(mapRoot, 'episode2/maps/scene14.svg'),
  'utf8',
);
const americaSource = await readFile(
  path.join(mapRoot, 'episode2/maps/scene15.svg'),
  'utf8',
);
const worldAtlas = JSON.parse(
  await readFile(
    path.join(projectRoot, 'scripts/data/natural-earth-countries-50m.json'),
    'utf8',
  ),
);

function baseBeforeRoutes(source, viewBox = '0 0 1672 941') {
  const routeStart = source.indexOf('  <g id="play"');
  if (routeStart < 0) throw new Error('Kartengrundlage enthält keinen Routenblock.');
  return source
    .slice(0, routeStart)
    .replace('viewBox="0 0 1672 941"', `viewBox="${viewBox}"`);
}

function baseBeforeOverlays(source, viewBox = '0 0 1672 941') {
  const overlayStart = source.indexOf('  <g mask="url(#land-mask)">');
  if (overlayStart < 0) throw new Error('Kartengrundlage enthält keinen Flächenblock.');
  return source
    .slice(0, overlayStart)
    .replace('viewBox="0 0 1672 941"', `viewBox="${viewBox}"`);
}

const atlasTransform = worldAtlas.transform;
const atlasArcs = new Map();

function decodedArc(index) {
  const reverse = index < 0;
  const normalizedIndex = reverse ? ~index : index;
  if (!atlasArcs.has(normalizedIndex)) {
    let x = 0;
    let y = 0;
    const points = worldAtlas.arcs[normalizedIndex].map(([deltaX, deltaY]) => {
      x += deltaX;
      y += deltaY;
      return [
        x * atlasTransform.scale[0] + atlasTransform.translate[0],
        y * atlasTransform.scale[1] + atlasTransform.translate[1],
      ];
    });
    atlasArcs.set(normalizedIndex, points);
  }
  const points = atlasArcs.get(normalizedIndex);
  return reverse ? [...points].reverse() : points;
}

function joinedRing(indices) {
  return indices.flatMap((index, position) =>
    position === 0 ? decodedArc(index) : decodedArc(index).slice(1),
  );
}

function mercator(latitude) {
  const limited = Math.max(-84, Math.min(84, latitude));
  return Math.log(Math.tan(Math.PI / 4 + (limited * Math.PI) / 360));
}

function projectionFor(view) {
  const minX = (view.lonMin * Math.PI) / 180;
  const maxX = (view.lonMax * Math.PI) / 180;
  const minY = -mercator(view.latMax);
  const maxY = -mercator(view.latMin);
  const scale = Math.min(1672 / (maxX - minX), 941 / (maxY - minY));
  const offsetX = (1672 - (maxX - minX) * scale) / 2 - minX * scale;
  const offsetY = (941 - (maxY - minY) * scale) / 2 - minY * scale;
  return { scale, offsetX, offsetY };
}

function projectToMap(view, longitude, latitude) {
  const projection = projectionFor(view);
  return {
    x: projection.offsetX + ((longitude * Math.PI) / 180) * projection.scale,
    y: projection.offsetY - mercator(latitude) * projection.scale,
  };
}

function geometryRings(geometry) {
  if (geometry.type === 'Polygon') return geometry.arcs;
  if (geometry.type === 'MultiPolygon') return geometry.arcs.flat();
  return [];
}

function unwrappedRing(points) {
  if (points.length === 0) return [];
  const unwrapped = [points[0]];
  for (const [, latitude] of points.slice(1)) {
    let longitude = points[unwrapped.length][0];
    const previousLongitude = unwrapped.at(-1)[0];
    while (longitude - previousLongitude > 180) longitude -= 360;
    while (longitude - previousLongitude < -180) longitude += 360;
    unwrapped.push([longitude, latitude]);
  }
  return unwrapped;
}

function clipPolygon(points, boundary, keep, intersect) {
  const output = [];
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const previous = points[(index + points.length - 1) % points.length];
    const currentInside = keep(current, boundary);
    const previousInside = keep(previous, boundary);
    if (currentInside) {
      if (!previousInside) output.push(intersect(previous, current, boundary));
      output.push(current);
    } else if (previousInside) {
      output.push(intersect(previous, current, boundary));
    }
  }
  return output;
}

function clippedRing(points, view) {
  let clipped = points;
  clipped = clipPolygon(
    clipped,
    view.lonMin,
    ([longitude], boundary) => longitude >= boundary,
    ([x1, y1], [x2, y2], boundary) => [
      boundary,
      y1 + ((y2 - y1) * (boundary - x1)) / (x2 - x1),
    ],
  );
  clipped = clipPolygon(
    clipped,
    view.lonMax,
    ([longitude], boundary) => longitude <= boundary,
    ([x1, y1], [x2, y2], boundary) => [
      boundary,
      y1 + ((y2 - y1) * (boundary - x1)) / (x2 - x1),
    ],
  );
  clipped = clipPolygon(
    clipped,
    view.latMin,
    ([, latitude], boundary) => latitude >= boundary,
    ([x1, y1], [x2, y2], boundary) => [
      x1 + ((x2 - x1) * (boundary - y1)) / (y2 - y1),
      boundary,
    ],
  );
  clipped = clipPolygon(
    clipped,
    view.latMax,
    ([, latitude], boundary) => latitude <= boundary,
    ([x1, y1], [x2, y2], boundary) => [
      x1 + ((x2 - x1) * (boundary - y1)) / (y2 - y1),
      boundary,
    ],
  );
  return clipped;
}

function countryPath(geometry, view) {
  return geometryRings(geometry)
    .flatMap((ring) => {
      const unwrapped = unwrappedRing(joinedRing(ring));
      return [-360, 0, 360]
        .map((shift) =>
          clippedRing(
            unwrapped.map(([longitude, latitude]) => [
              longitude + shift,
              latitude,
            ]),
            view,
          ),
        )
        .filter((points) => points.length >= 3);
    })
    .map((ring) => {
      const points = ring.map(([longitude, latitude]) =>
        projectToMap(view, longitude, latitude),
      );
      return `${points
        .map(
          (point, index) =>
            `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`,
        )
        .join(' ')}Z`;
    })
    .join(' ');
}

function naturalEarthBase(view) {
  const palette = ['#eee5cf', '#eadfc7', '#e5d7b9', '#e9dec4', '#e2d2b2'];
  const countryPaths = worldAtlas.objects.countries.geometries
    .map((geometry, index) => {
      const d = countryPath(geometry, view);
      return d
        ? `    <path d="${d}" fill="${palette[index % palette.length]}"/>`
        : '';
    })
    .filter(Boolean)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1672" height="941" viewBox="0 0 1672 941">
  <metadata>Geografische Grundlage: Natural Earth 1:50m über world-atlas. Historische Wege und Grenzen sind bewusst vereinfacht.</metadata>
  <defs>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#91acb7"/><stop offset="1" stop-color="#7f9eaa"/></linearGradient>
    <filter id="paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="3" seed="23"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".10"/></feComponentTransfer></filter>
    <clipPath id="map-clip"><rect width="1672" height="941"/></clipPath>
  </defs>
  <rect width="1672" height="941" fill="url(#sea)"/>
  <g class="countries" clip-path="url(#map-clip)">
${countryPaths}
  </g>
  <rect width="1672" height="941" fill="#b89f72" opacity=".10" filter="url(#paper)"/>`;
}

function marker(view, number, title, longitude, latitude, options = {}) {
  const { x, y } = projectToMap(view, longitude, latitude);
  const anchor = options.anchor ?? 'start';
  const textX = anchor === 'end' ? -38 : 38;
  return `<g class="marker" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" style="--marker:${options.color ?? '#bd654b'}">
    <circle r="31"/><text class="number" text-anchor="middle" y="11">${number}</text>
    <text class="marker-title" x="${textX}" y="12" text-anchor="${anchor}">${title}</text>
  </g>`;
}

function route(view, coordinates, delay = '.12s', options = {}) {
  const points = coordinates.map(([longitude, latitude]) =>
    projectToMap(view, longitude, latitude),
  );
  const d = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ');
  const className = options.dashed ? 'route-static dashed' : 'route-static';
  const liveClassName = options.dashed
    ? 'route-live dashed'
    : 'route-live';
  return `<g style="--delay:${delay}">
      <path class="${className}" d="${d}"/>
      <path class="${liveClassName}" pathLength="1" d="${d}"/>
    </g>`;
}

function datedNaturalMap(view, date, content) {
  return `${naturalEarthBase(view)}${sharedDefs}
${content}
  <text class="date" x="40" y="66">${date}</text>
  <style>
    .dashed{stroke-dasharray:15 12}
    .countries path{stroke:#c1b59d;stroke-width:1.35;vector-effect:non-scaling-stroke;fill-rule:evenodd;stroke-linejoin:round}
  </style>
${sharedStyle}`;
}

const sharedDefs = `
  <defs>
    <marker id="arrow-e3" markerWidth="17" markerHeight="17" refX="14" refY="8.5" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M1,1 L15,8.5 L1,16" fill="none" stroke="#496f7c" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
    <filter id="e3-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>`;

const sharedStyle = `
  <rect x="1" y="1" width="1670" height="939" fill="none" stroke="#c9b99a" stroke-width="2" vector-effect="non-scaling-stroke"/>
  <style>
    text{font-family:Arial,Helvetica,sans-serif;fill:#27353a;letter-spacing:.2px}
    .date{font-size:50px;font-weight:700}
    .marker circle{fill:var(--marker);stroke:#fff6e5;stroke-width:5px}
    .number{font-size:31px;font-weight:800;fill:white}
    .marker-title{font-size:44px;font-weight:700}
    .route-static,.route-live{fill:none;stroke:#496f7c;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;opacity:.82;marker-end:url(#arrow-e3)}
    .route-live{display:none;stroke-dasharray:1;stroke-dashoffset:1;animation:draw .9s ease-out forwards;animation-delay:var(--delay)}
    #play:target .route-static{display:none}#play:target .route-live{display:inline}
    @keyframes draw{to{stroke-dashoffset:0}}
    @media (prefers-reduced-motion:reduce){#play:target .route-live{animation:none;stroke-dashoffset:0}}
  </style>
</svg>
`;

const scene01 = `${baseBeforeRoutes(europeSource)}${sharedDefs}
  <g id="play">
    <g style="--delay:.12s">
      <path class="route-static" d="M438 179 C555 230 651 310 733 354"/>
      <path class="route-live" pathLength="1" d="M438 179 C555 230 651 310 733 354"/>
    </g>
    <g style="--delay:.42s">
      <path class="route-static" d="M438 179 C605 211 747 245 879 305"/>
      <path class="route-live" pathLength="1" d="M438 179 C605 211 747 245 879 305"/>
    </g>
  </g>
  <g class="marker" transform="translate(438 179)" style="--marker:#bd654b">
    <circle r="31"/><text class="number" text-anchor="middle" y="11">1</text>
    <text class="marker-title" x="-38" y="12" text-anchor="end">Manchester</text>
  </g>
  <g class="marker" transform="translate(506 104)" style="--marker:#4d8293">
    <circle r="31"/><text class="number" text-anchor="middle" y="11">2</text>
    <text class="marker-title" x="38" y="12" text-anchor="start">Stockton–Darlington</text>
  </g>
  <text class="date" x="40" y="66">18. bis 19. Jahrhundert</text>
${sharedStyle}`;

const scene02 = `${baseBeforeRoutes(europeSource)}${sharedDefs}
  <g id="play">
    <g style="--delay:.12s">
      <path class="route-static" d="M603 360 C684 345 746 338 806 334"/>
      <path class="route-live" pathLength="1" d="M603 360 C684 345 746 338 806 334"/>
    </g>
    <g style="--delay:.38s">
      <path class="route-static" d="M806 334 C892 285 958 245 1020 219"/>
      <path class="route-live" pathLength="1" d="M806 334 C892 285 958 245 1020 219"/>
    </g>
    <g style="--delay:.64s">
      <path class="route-static" d="M806 334 C917 362 1027 392 1132 422"/>
      <path class="route-live" pathLength="1" d="M806 334 C917 362 1027 392 1132 422"/>
    </g>
  </g>
  <g class="marker" transform="translate(603 360)" style="--marker:#bd654b">
    <circle r="31"/><text class="number" text-anchor="middle" y="11">1</text>
    <text class="marker-title" x="-38" y="12" text-anchor="end">Paris</text>
  </g>
  <g class="marker" transform="translate(806 334)" style="--marker:#4d8293">
    <circle r="31"/><text class="number" text-anchor="middle" y="11">2</text>
    <text class="marker-title" x="38" y="12" text-anchor="start">Frankfurt</text>
  </g>
  <text class="date" x="40" y="66">1848 bis 1849</text>
${sharedStyle}`;

const scene03 = `${baseBeforeOverlays(americaSource, '200 380 1000 563')}${sharedDefs}
  <g mask="url(#land-mask)">
    <path d="M0 0 H1150 V500 C960 505 790 515 640 535 C455 520 265 495 0 455Z" fill="#6d8991" opacity=".20" filter="url(#e3-soft)"/>
    <path d="M0 470 C245 505 445 535 640 550 C795 595 920 720 1035 941 H0Z" fill="#bd654b" opacity=".20" filter="url(#e3-soft)"/>
  </g>
  <g id="play">
    <g style="--delay:.16s">
      <path class="route-static" d="M584 701 C557 656 532 618 507 582"/>
      <path class="route-live" pathLength="1" d="M584 701 C557 656 532 618 507 582"/>
    </g>
  </g>
  <g class="marker" transform="translate(584 701)" style="--marker:#bd654b">
    <circle r="31"/><text class="number" text-anchor="middle" y="11">1</text>
    <text class="marker-title" x="38" y="12" text-anchor="start">Fort Sumter</text>
  </g>
  <g class="marker" transform="translate(507 582)" style="--marker:#4d8293">
    <circle r="31"/><text class="number" text-anchor="middle" y="11">2</text>
    <text class="marker-title" x="-38" y="12" text-anchor="end">Appomattox</text>
  </g>
  <text class="date" x="230" y="446">1861 bis 1865</text>
${sharedStyle}`;

const europeBox = { lonMin: -12, lonMax: 62, latMin: 31, latMax: 61 };
const worldBox = { lonMin: -180, lonMax: 180, latMin: -60, latMax: 80 };
const westernRussiaBox = { lonMin: 15, lonMax: 75, latMin: 42, latMax: 66 };
const warEuropeBox = { lonMin: -15, lonMax: 70, latMin: 25, latMax: 61 };
const atlanticBox = { lonMin: -110, lonMax: 40, latMin: -35, latMax: 70 };
const eastAsiaBox = { lonMin: 70, lonMax: 150, latMin: -20, latMax: 48 };

const scene04 = datedNaturalMap(
  europeBox,
  '1859 bis 1871',
  `  <g id="play">
    ${route(europeBox, [[7.6869, 45.0703], [5.2, 47.2], [2.1301, 48.8014]], '.14s')}
  </g>
  ${marker(europeBox, 1, 'Turin', 7.6869, 45.0703, { color: '#bd654b' })}
  ${marker(europeBox, 2, 'Versailles', 2.1301, 48.8014, { color: '#4d8293', anchor: 'end' })}`,
);

const scene05 = datedNaturalMap(
  worldBox,
  '1884 bis 1900',
  `  <g id="play">
    ${route(
      worldBox,
      [[13.405, 52.52], [35, 45], [67, 40], [95, 41], [116.4074, 39.9042]],
      '.16s',
    )}
  </g>
  ${marker(worldBox, 1, 'Berlin', 13.405, 52.52, { color: '#bd654b', anchor: 'end' })}
  ${marker(worldBox, 2, 'Beijing', 116.4074, 39.9042, { color: '#4d8293', anchor: 'end' })}`,
);

const scene06 = datedNaturalMap(
  europeBox,
  '1914 bis 1918',
  `  <g id="play">
    ${route(europeBox, [[18.4131, 43.8563], [13.405, 52.52], [7.2, 50.5], [2.826, 49.4179]], '.12s')}
    ${route(europeBox, [[5.0, 51.0], [4.0, 49.0], [5.8, 47.7]], '.38s', { dashed: true })}
    ${route(europeBox, [[22.0, 55.0], [24.0, 50.0], [25.0, 46.0]], '.62s', { dashed: true })}
  </g>
  ${marker(europeBox, 1, 'Sarajevo', 18.4131, 43.8563, { color: '#bd654b' })}
  ${marker(europeBox, 2, 'Compiègne', 2.826, 49.4179, { color: '#4d8293', anchor: 'end' })}`,
);

const scene07 = datedNaturalMap(
  westernRussiaBox,
  '1917 bis 1928',
  `  <g id="play">
    ${route(westernRussiaBox, [[30.3351, 59.9343], [32.0, 57.0], [37.6173, 55.7558]], '.14s')}
    ${route(westernRussiaBox, [[37.6173, 55.7558], [42.0, 53.0], [48.0, 51.0]], '.44s', { dashed: true })}
  </g>
  ${marker(westernRussiaBox, 1, 'Petrograd', 30.3351, 59.9343, { color: '#bd654b', anchor: 'end' })}
  ${marker(westernRussiaBox, 2, 'Moskau', 37.6173, 55.7558, { color: '#4d8293' })}`,
);

const scene08 = datedNaturalMap(
  europeBox,
  '1919 bis 1933',
  `  <g id="play">
    ${route(europeBox, [[2.1301, 48.8014], [7.0, 50.5], [13.405, 52.52]], '.16s')}
  </g>
  ${marker(europeBox, 1, 'Versailles', 2.1301, 48.8014, { color: '#bd654b', anchor: 'end' })}
  ${marker(europeBox, 2, 'Berlin', 13.405, 52.52, { color: '#4d8293' })}`,
);

const scene09 = datedNaturalMap(
  europeBox,
  '1933 bis 1939',
  `  <g id="play">
    ${route(europeBox, [[13.405, 52.52], [12.0, 50.8], [11.0767, 49.4521]], '.14s')}
    ${route(europeBox, [[13.405, 52.52], [14.4378, 50.0755], [16.3738, 48.2082]], '.46s', { dashed: true })}
  </g>
  ${marker(europeBox, 1, 'Berlin', 13.405, 52.52, { color: '#bd654b', anchor: 'end' })}
  ${marker(europeBox, 2, 'Nürnberg', 11.0767, 49.4521, { color: '#4d8293' })}`,
);

const scene10 = datedNaturalMap(
  warEuropeBox,
  '1939 bis 1945',
  `  <g id="play">
    ${route(warEuropeBox, [[21.0122, 52.2297], [16.5, 51.4], [13.405, 52.52]], '.14s')}
    ${route(warEuropeBox, [[-3.0, 49.8], [4.0, 51.0], [13.405, 52.52]], '.40s', { dashed: true })}
    ${route(warEuropeBox, [[30.3, 53.5], [22.0, 52.5], [13.405, 52.52]], '.66s', { dashed: true })}
  </g>
  ${marker(warEuropeBox, 1, 'Warschau', 21.0122, 52.2297, { color: '#bd654b' })}
  ${marker(warEuropeBox, 2, 'Berlin', 13.405, 52.52, { color: '#4d8293', anchor: 'end' })}`,
);

const scene11 = datedNaturalMap(
  europeBox,
  '1941 bis 1945',
  `  <g id="play"></g>
  ${marker(europeBox, 1, 'Babyn Jar', 30.5234, 50.4753, { color: '#bd654b' })}
  ${marker(europeBox, 2, 'Auschwitz-Birkenau', 19.2036, 50.0359, { color: '#4d8293', anchor: 'end' })}`,
);

const scene12 = datedNaturalMap(
  atlanticBox,
  '1945 bis 1962',
  `  <g id="play"></g>
  ${marker(atlanticBox, 1, 'West-Berlin', 13.405, 52.52, { color: '#bd654b', anchor: 'end' })}
  ${marker(atlanticBox, 2, 'Kuba', -79.3832, 21.5218, { color: '#4d8293' })}`,
);

const scene13 = datedNaturalMap(
  worldBox,
  '1947 bis 1975',
  `  <g id="play"></g>
  ${marker(worldBox, 1, 'Neu-Delhi', 77.209, 28.6139, { color: '#bd654b' })}
  ${marker(worldBox, 2, 'Accra', -0.187, 5.6037, { color: '#4d8293', anchor: 'end' })}`,
);

const scene14 = datedNaturalMap(
  eastAsiaBox,
  '1949 bis 1975',
  `  <g id="play"></g>
  ${marker(eastAsiaBox, 1, 'Beijing', 116.4074, 39.9042, { color: '#bd654b', anchor: 'end' })}
  ${marker(eastAsiaBox, 2, 'Saigon', 106.6297, 10.8231, { color: '#4d8293' })}`,
);

const scene15 = datedNaturalMap(
  europeBox,
  '1957 bis 1991',
  `  <g id="play"></g>
  ${marker(europeBox, 1, 'Rom', 12.4964, 41.9028, { color: '#bd654b', anchor: 'end' })}
  ${marker(europeBox, 2, 'Berlin', 13.405, 52.52, { color: '#4d8293' })}`,
);

const scene16 = datedNaturalMap(
  worldBox,
  '1991 bis heute',
  `  <g id="play"></g>
  ${marker(worldBox, 1, 'New York', -74.006, 40.7128, { color: '#bd654b', anchor: 'end' })}
  ${marker(worldBox, 2, 'Kyiv', 30.5234, 50.4501, { color: '#4d8293' })}`,
);

await mkdir(outputRoot, { recursive: true });
await Promise.all([
  writeFile(path.join(outputRoot, 'scene01.svg'), scene01),
  writeFile(path.join(outputRoot, 'scene02.svg'), scene02),
  writeFile(path.join(outputRoot, 'scene03.svg'), scene03),
  writeFile(path.join(outputRoot, 'scene04.svg'), scene04),
  writeFile(path.join(outputRoot, 'scene05.svg'), scene05),
  writeFile(path.join(outputRoot, 'scene06.svg'), scene06),
  writeFile(path.join(outputRoot, 'scene07.svg'), scene07),
  writeFile(path.join(outputRoot, 'scene08.svg'), scene08),
  writeFile(path.join(outputRoot, 'scene09.svg'), scene09),
  writeFile(path.join(outputRoot, 'scene10.svg'), scene10),
  writeFile(path.join(outputRoot, 'scene11.svg'), scene11),
  writeFile(path.join(outputRoot, 'scene12.svg'), scene12),
  writeFile(path.join(outputRoot, 'scene13.svg'), scene13),
  writeFile(path.join(outputRoot, 'scene14.svg'), scene14),
  writeFile(path.join(outputRoot, 'scene15.svg'), scene15),
  writeFile(path.join(outputRoot, 'scene16.svg'), scene16),
]);

console.log('Episode-3-Karten für Szene 1–16 erstellt.');
