import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outputDirectory = 'dist/client';
const routes = ['episode-1/challenge', 'episode-2/challenge', 'episode-3/challenge', 'hyper-challenge', 'episode-2', 'episode-3', 'impressum', 'ueber'];

for (const route of routes) {
  const routeDirectory = join(outputDirectory, route);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(
    join(outputDirectory, `${route}.html`),
    join(routeDirectory, 'index.html'),
  );
}

await writeFile(join(outputDirectory, '.nojekyll'), '');
