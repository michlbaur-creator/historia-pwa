import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function moduleURL(url) {
  const source = await readFile(url, 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  let resolved = outputText;
  for (const match of outputText.matchAll(/from ['"](\.[^'"]+)['"]/g)) {
    resolved = resolved.replace(match[1], await moduleURL(new URL(`${match[1]}.ts`, url)));
  }
  return `data:text/javascript;base64,${Buffer.from(resolved).toString('base64')}`;
}
async function loadTS(path) { return import(await moduleURL(new URL(path, import.meta.url))); }
const { chooseQuestions, rankFor } = await loadTS('../app/episode-1/challenge/questions.ts');
const { challengeQuestions } = await loadTS('../app/episode-1/challenge/question-bank.ts');
const { historiaLearning } = await loadTS('../app/learning.ts');
const scenes = Object.entries(historiaLearning).map(([id, data]) => ({ id: Number(id), title: `Szene ${id}`, ...data }));
const { historiaEpisode2Scenes } = await loadTS('../app/episode2-data.ts');
const { historiaEpisode3Scenes } = await loadTS('../app/episode3-data.ts');
const { challengeConfig, challengeBestKey } = await loadTS('../app/episode-1/challenge/config.ts');

for (const [episode, pool] of [[1, scenes], [2, historiaEpisode2Scenes], [3, historiaEpisode3Scenes]]) {
  test(`Episode ${episode}: 1000 rounds use only this episode, all eras and intact solutions`, () => {
    const before = JSON.stringify(pool);
    const seen = new Set();
    for (let round = 0; round < 1000; round++) {
      const questions = chooseQuestions(pool, Math.random, episode);
      assert.equal(questions.length, 9);
      assert.equal(new Set(questions.map(q => q.sceneId)).size, 9);
      assert.equal(questions.filter(q => q.sceneId <= 5).length, 3);
      assert.equal(questions.filter(q => q.sceneId >= 6 && q.sceneId <= 10).length, 3);
      assert.equal(questions.filter(q => q.sceneId >= 11).length, 3);
      assert.ok(questions.some(q => q.tricky));
      for (const q of questions) {
        const source = pool.find(s => s.id === q.sceneId);
        assert.equal(q.topic, source.title);
        const original = challengeQuestions[episode][q.sceneId];
        assert.ok(original);
        assert.equal(q.question, original.question);
        assert.equal(q.options.length, 3);
        assert.equal(new Set(q.options).size, 3);
        assert.equal(q.options[q.correctIndex], original.options[original.correctIndex]);
        seen.add(q.explanation);
      }
    }
    assert.equal(seen.size, 16);
    assert.equal(JSON.stringify(pool), before);
  });
}
test('independent best scores and correct episode transitions', () => {
  assert.equal(new Set([1,2,3].map(challengeBestKey)).size, 3);
  assert.equal(challengeBestKey(1), 'historia-episode1-challenge-best-v2');
  assert.equal(challengeConfig[1].href, '/episode-2');
  assert.equal(challengeConfig[2].href, '/episode-3');
  assert.equal(challengeConfig[3].href, '/');
});

test('1000 rounds: nine distinct scenes, balanced eras, misconceptions and preserved answers', () => {
  for (let round = 0; round < 1000; round++) {
    const questions = chooseQuestions(scenes);
    assert.equal(questions.length, 9);
    assert.equal(new Set(questions.map(q => q.sceneId)).size, 9);
    assert.equal(questions.filter(q => q.sceneId <= 5).length, 3);
    assert.equal(questions.filter(q => q.sceneId >= 6 && q.sceneId <= 10).length, 3);
    assert.equal(questions.filter(q => q.sceneId >= 11).length, 3);
    assert.ok(questions.some(q => q.tricky));
    for (const q of questions) {
      assert.equal(q.options.length, 3);
      assert.equal(new Set(q.options).size, 3);
      const original = challengeQuestions[1][q.sceneId];
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
  assert.equal(seen.size, 16);
});
