// Editorial migration only. The Player does not shuffle or rewrite any answers.
import { readFile, writeFile } from 'node:fs/promises';
import ts from 'typescript';
import { loadEpisodes } from './load-scenes.mjs';

const episodes = await loadEpisodes();
const files = ['learning.ts', 'episode2-data.ts', 'episode3-data.ts'];
for (let episode = 0; episode < 3; episode++) {
  const questions = episodes[episode].flatMap((scene) => scene.quiz);
  const positions = questions.map((_, i) => i % 3);
  let seed = 20261019 + episode;
  for (let i = positions.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  const targets = new Map(questions.map((q, i) => [q.question, positions[i]]));
  const file = new URL(`../app/${files[episode]}`, import.meta.url);
  const source = await readFile(file, 'utf8');
  const ast = ts.createSourceFile(
    files[episode],
    source,
    ts.ScriptTarget.Latest,
    true,
  );
  const edits = [];
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const props = new Map(
        node.properties
          .filter(ts.isPropertyAssignment)
          .map((p) => [p.name.getText(ast), p.initializer]),
      );
      const q = props.get('question');
      const options = props.get('options');
      const correct = props.get('correctIndex');
      if (
        q &&
        ts.isStringLiteral(q) &&
        targets.has(q.text) &&
        options &&
        ts.isArrayLiteralExpression(options) &&
        correct
      ) {
        const desired = targets.get(q.text);
        const current = Number(correct.getText(ast));
        if (current !== desired) {
          const values = options.elements.map((e) => e.getText(ast));
          [values[current], values[desired]] = [
            values[desired],
            values[current],
          ];
          edits.push({
            start: options.getStart(ast),
            end: options.end,
            text: `[${values.join(', ')}]`,
          });
          edits.push({
            start: correct.getStart(ast),
            end: correct.end,
            text: String(desired),
          });
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  let result = source;
  for (const edit of edits.sort((a, b) => b.start - a.start))
    result = result.slice(0, edit.start) + edit.text + result.slice(edit.end);
  await writeFile(file, result);
}
