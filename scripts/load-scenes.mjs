import { readFile } from 'node:fs/promises';
import ts from 'typescript';

export async function loadTS(relativePath) {
  async function moduleURL(url) {
    const { outputText } = ts.transpileModule(await readFile(url, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
    });
    let resolved = outputText;
    for (const match of outputText.matchAll(/from ['"](\.[^'"]+)['"]/g)) {
      resolved = resolved.replace(
        match[1],
        await moduleURL(new URL(`${match[1]}.ts`, url)),
      );
    }
    return `data:text/javascript;base64,${Buffer.from(resolved).toString('base64')}`;
  }
  return import(await moduleURL(new URL(relativePath, import.meta.url)));
}

export async function loadEpisodes() {
  return [
    (await loadTS('../app/data.ts')).historiaScenes,
    (await loadTS('../app/episode2-data.ts')).historiaEpisode2Scenes,
    (await loadTS('../app/episode3-data.ts')).historiaEpisode3Scenes,
  ];
}
