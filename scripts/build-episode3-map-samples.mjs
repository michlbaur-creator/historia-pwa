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

await mkdir(outputRoot, { recursive: true });
await Promise.all([
  writeFile(path.join(outputRoot, 'scene01.svg'), scene01),
  writeFile(path.join(outputRoot, 'scene02.svg'), scene02),
  writeFile(path.join(outputRoot, 'scene03.svg'), scene03),
]);

console.log('Episode-3-Testkarten für Szene 1–3 erstellt.');
