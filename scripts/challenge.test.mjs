import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function loadTS(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const { chooseQuestions, rankFor } = await loadTS('../app/episode-1/challenge/questions.ts');
const { historiaLearning } = await loadTS('../app/learning.ts');
const scenes = Object.entries(historiaLearning).map(([id, data]) => ({ id: Number(id), title: `Szene ${id}`, ...data }));

test('1000 rounds: nine distinct scenes, balanced eras, discoveries and preserved answers', () => {
  for (let round = 0; round < 1000; round++) {
    const questions = chooseQuestions(scenes);
    assert.equal(questions.length, 9);
    assert.equal(new Set(questions.map(q => q.sceneId)).size, 9);
    assert.equal(questions.filter(q => q.sceneId <= 5).length, 3);
    assert.equal(questions.filter(q => q.sceneId >= 6 && q.sceneId <= 10).length, 3);
    assert.equal(questions.filter(q => q.sceneId >= 11).length, 3);
    assert.equal(questions.filter(q => q.discovery).length, 3);
    for (const q of questions) {
      assert.equal(q.options.length, 3);
      assert.equal(new Set(q.options).size, 3);
      const original = historiaLearning[q.sceneId].quiz.find(item => item.explanation === q.explanation);
      assert.equal(q.options[q.correctIndex], original.options[original.correctIndex]);
    }
  }
});
test('all score boundaries have the expected rank', () => {
  assert.deepEqual(Array.from({length:10}, (_, score) => rankFor(score)), [
    'Zeitstarter','Zeitstarter','Zeitstarter','Zeitstarter','Zeitstarter',
    'Spurensucher','Spurensucher','Zeitkenner','Zeitkenner','Zeitmeister',
  ]);
});
test('does not mutate the scene data', () => {
  const before = JSON.stringify(scenes);
  chooseQuestions(scenes);
  assert.equal(JSON.stringify(scenes), before);
});
test('all source questions can be drawn over repeated rounds', () => {
  const seen = new Set();
  for (let i = 0; i < 1000; i++) chooseQuestions(scenes).forEach(q => seen.add(q.explanation));
  assert.equal(seen.size, 32);
});
