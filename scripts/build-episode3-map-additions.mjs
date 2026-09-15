// Focused, reproducible map additions; does not rewrite other episode maps.
import { readFile, writeFile } from 'node:fs/promises';
const worldAtlas = JSON.parse(
  await readFile(
    new URL('./data/natural-earth-countries-50m.json', import.meta.url),
    'utf8',
  ),
);
const outputRoot = new URL(
  '../public/assets/historia/episode3/maps/',
  import.meta.url,
);
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
    .map(
      (point, index) =>
        `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`,
    )
    .join(' ');
  const className = options.dashed ? 'route-static dashed' : 'route-static';
  const liveClassName = options.dashed ? 'route-live dashed' : 'route-live';
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

// Expand the geographic extent to the canvas ratio: no empty side bands,
// and no stretching of coastlines or positions.
function extent(lonMin, lonMax, latMin, latMax) {
  const width = ((lonMax - lonMin) * Math.PI) / 180;
  const height = mercator(latMax) - mercator(latMin);
  const requiredWidth = (height * 1672) / 941;
  if (requiredWidth > width) {
    const extra = ((requiredWidth - width) * 180) / Math.PI / 2;
    lonMin -= extra;
    lonMax += extra;
  } else {
    const middle = (mercator(latMax) + mercator(latMin)) / 2;
    const half = (width * 941) / 1672 / 2;
    const inverse = (y) =>
      ((2 * Math.atan(Math.exp(y)) - Math.PI / 2) * 180) / Math.PI;
    latMin = inverse(middle - half);
    latMax = inverse(middle + half);
  }
  return { lonMin, lonMax, latMin, latMax };
}

function label(view, text, lon, lat, size = 32, anchor = 'middle') {
  const p = projectToMap(view, lon, lat);
  return `<text x="${p.x}" y="${p.y}" text-anchor="${anchor}" style="font-size:${size}px;font-weight:600;paint-order:stroke;stroke:#f8efd9;stroke-width:5px;stroke-linejoin:round">${text}</text>`;
}
function line(view, points, color = '#a44e3e', arrow = false, dashed = false) {
  const d = points
    .map(([lon, lat], i) => {
      const p = projectToMap(view, lon, lat);
      return `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    })
    .join(' ');
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" ${dashed ? 'stroke-dasharray="13 10"' : ''} ${arrow ? 'marker-end="url(#arrow-e3)"' : ''}/>`;
}
function note(lines) {
  return `<rect x="34" y="735" width="1604" height="100" rx="14" fill="#fff8e8" opacity=".93"/>${lines.map((text, i) => `<text x="58" y="${772 + i * 38}" style="font-size:28px">${text}</text>`).join('')}`;
}
function noteBox(text, x, y, width = 510) {
  const lines = [''];
  for (const word of text.split(' ')) {
    if ((lines.at(-1) + word).length > 32) lines.push('');
    lines[lines.length - 1] += `${word} `;
  }
  return (
    `<rect x="${x}" y="${y}" width="${width}" height="${lines.length * 37 + 28}" rx="14" fill="#fff8e8" opacity=".95"/>` +
    lines
      .map(
        (line, i) =>
          `<text x="${x + 20}" y="${y + 38 + i * 37}" style="font-size:26px">${line.trim()}</text>`,
      )
      .join('')
  );
}
async function save(name, view, date, content) {
  await writeFile(
    new URL(name, outputRoot),
    datedNaturalMap(view, date, content),
  );
}

const russia = extent(20, 50, 51, 63);
await save(
  'scene08-russia-full.svg',
  russia,
  'Russland · 1917–1928',
  marker(russia, 1, 'Petrograd', 30.335, 59.934) +
    marker(russia, 2, 'Moskau', 37.617, 55.756) +
    label(russia, 'Ostsee', 21, 57, 30) +
    label(russia, 'Russland', 42, 59, 38) +
    note([
      '1917: Revolution und Machtübernahme der Bolschewiki',
      '1922: Gründung der Sowjetunion · ab Ende der 1920er-Jahre: Stalins Diktatur',
    ]),
);

const germany = extent(1, 22, 46.5, 56);
await save(
  'scene14-airlift-full.svg',
  germany,
  'Berliner Luftbrücke · 1948–1949',
  line(
    germany,
    [
      [8.57, 50.03],
      [10.9, 51.6],
      [13.28, 52.47],
    ],
    '#496f7c',
    true,
  ) +
    line(
      germany,
      [
        [9.99, 53.55],
        [11.6, 53.1],
        [13.28, 52.47],
      ],
      '#496f7c',
      true,
    ) +
    marker(germany, 1, 'Frankfurt', 8.57, 50.03, { anchor: 'end' }) +
    marker(germany, 2, 'West-Berlin', 13.28, 52.47) +
    label(germany, 'Hamburg', 9.99, 54, 29) +
    label(germany, 'Frankreich', 3, 49, 29) +
    label(germany, 'Polen', 18, 52, 32) +
    label(germany, 'Deutschland', 9, 51.8, 32) +
    note([
      'Flugzeuge bringen Lebensmittel und Kohle nach West-Berlin.',
      'Schematische Flugwege aus dem Westen · keine maßstabsgetreuen Luftkorridore',
    ]),
);

const cuba = extent(-103, -59, 15, 43);
await save(
  'scene15-cuba-full.svg',
  cuba,
  'Kubakrise · Oktober 1962',
  line(
    cuba,
    [
      [-65, 28],
      [-70, 26],
      [-76, 24],
      [-80, 23],
    ],
    '#496f7c',
    true,
  ) +
    line(
      cuba,
      [
        [-84, 25],
        [-80, 25.5],
        [-76, 23.5],
        [-75, 20],
      ],
      '#a44e3e',
      false,
      true,
    ) +
    marker(cuba, 1, 'Washington', -77.037, 38.907) +
    marker(cuba, 2, 'Kuba · Havanna', -82.366, 23.114, { anchor: 'end' }) +
    label(cuba, 'USA', -91, 36, 46) +
    label(cuba, 'Atlantik', -66, 33, 36) +
    label(cuba, 'Golf von Mexiko', -91, 26, 32) +
    noteBox(
      'Blauer Pfeil: sowjetischer Seeweg nach Kuba. Rote Striche: amerikanische Seesperre. Beide schematisch.',
      38,
      360,
    ),
);

const germanGeometry = worldAtlas.objects.countries.geometries.find(
  (g) => String(g.id) === '276',
);
if (!germanGeometry) throw new Error('Deutschland fehlt im Atlas');
const border = [
  [10.91, 53.91],
  [10.75, 53.65],
  [10.93, 53.4],
  [11, 53],
  [11.55, 52.9],
  [11.0, 52.5],
  [10.95, 52.2],
  [10.6, 52],
  [10.7, 51.7],
  [10.15, 51.3],
  [10.2, 50.9],
  [9.9, 50.65],
  [10.3, 50.4],
  [10.75, 50.25],
  [11, 50.35],
  [11.4, 50.5],
  [11.9, 50.3],
  [12.15, 50.25],
];
const polygon = (points) =>
  points
    .map(([lon, lat]) => {
      const p = projectToMap(germany, lon, lat);
      return `${p.x},${p.y}`;
    })
    .join(' ');
const germanOutline = countryPath(germanGeometry, germany);
await save(
  'scene14-germany-division.svg',
  germany,
  'Deutschland · zwei Staaten 1949',
  `<defs><clipPath id="germany"><path d="${germanOutline}"/></clipPath></defs><path d="${germanOutline}" fill="#90b8b6" stroke="#536d72" stroke-width="3"/>` +
    `<g clip-path="url(#germany)"><polygon points="${polygon([...border, [16, 49], [16, 56], [10.91, 56]])}" fill="#cc9c82"/>` +
    `<polygon points="${polygon([
      [6.36, 49.45],
      [6.85, 49.65],
      [7.4, 49.45],
      [7.37, 49.17],
      [7.1, 49.1],
      [6.36, 49.15],
    ])}" fill="#ddd2b8"/></g>` +
    line(germany, border, '#6a5149', false, true) +
    label(germany, 'Bundesrepublik', 7.4, 51.8, 34) +
    label(germany, 'Deutschland', 7.4, 51.35, 34) +
    label(germany, 'DDR', 12.9, 51.2, 40) +
    marker(germany, 1, 'Bonn', 7.1, 50.74, { anchor: 'end' }) +
    marker(germany, 2, 'Berlin', 13.405, 52.52) +
    label(germany, 'Saarland*', 6.2, 48.7, 26) +
    label(germany, 'Polen', 18, 52, 30) +
    noteBox(
      'Berlin: vier Sektoren; West-Berlin mit Sonderstatus. Grenze vereinfacht. * Saarland 1949 separat unter französischem Einfluss; ab 1957 Bundesland.',
      1120,
      460,
    ),
);

const europe = extent(-12, 49, 36, 65);
const cities =
  label(europe, 'Berlin', 13.405, 52.52, 28) +
  label(europe, 'Warschau', 21.01, 52.23, 28) +
  label(europe, 'Paris', 2.35, 48.85, 28) +
  label(europe, 'London', -0.12, 51.5, 28) +
  label(europe, 'Moskau', 37.62, 55.75, 28) +
  label(europe, 'Stalingrad', 44.5, 48.7, 28) +
  label(europe, 'Nordafrika', 10, 36.8, 30);
const advances = [
  line(
    europe,
    [
      [14, 51],
      [18, 51],
      [20.6, 52],
    ],
    '#a44e3e',
    true,
  ),
  line(
    europe,
    [
      [8, 52],
      [5, 51],
      [2.7, 49.3],
    ],
    '#a44e3e',
    true,
  ) +
    line(
      europe,
      [
        [10, 54],
        [10, 57],
        [10.7, 59.3],
      ],
      '#a44e3e',
      true,
    ),
  line(
    europe,
    [
      [22, 53],
      [29, 54],
      [35.4, 55],
    ],
    '#a44e3e',
    true,
  ) +
    line(
      europe,
      [
        [17, 48],
        [21, 44],
        [23, 39],
      ],
      '#a44e3e',
      true,
    ),
  line(
    europe,
    [
      [30, 49],
      [37, 48.4],
      [43.6, 48.7],
    ],
    '#a44e3e',
    true,
  ),
];
const stages = [
  [
    'September 1939',
    'Deutschland überfällt Polen.',
    'Auch die Sowjetunion besetzt im September den Osten Polens.',
  ],
  [
    '1940',
    'Deutsche Eroberungen in Nord- und Westeuropa.',
    'Großbritannien wird nicht erobert.',
  ],
  [
    '1941',
    'Angriff auf die Sowjetunion; Besetzung des Balkans mit Verbündeten.',
    'Moskau wird nicht eingenommen.',
  ],
  [
    '1942',
    'Der deutsche Vormarsch reicht bis Stalingrad und in den Kaukasus.',
    'Die Pfeile zeigen Angriffsrichtungen, keine exakten Front- oder Staatsgrenzen.',
  ],
];
for (let i = 0; i < stages.length; i++) {
  await save(
    `scene12-expansion-${i + 1}.svg`,
    europe,
    `Kriegsausbreitung · ${stages[i][0]}`,
    '<style>.countries path{fill:#eee5cf!important;stroke:none!important}</style>' +
      advances.slice(0, i + 1).join('') +
      cities +
      noteBox(stages[i].slice(1).join(' '), 35, 105, 535),
  );
}
