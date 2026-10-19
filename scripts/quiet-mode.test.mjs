import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { loadEpisodes, loadTS } from './load-scenes.mjs';

const episodes = await loadEpisodes();
const { readingSections, readingSectionAt, videoPosition } = await loadTS(
  '../app/player-timing.ts',
);
const approvedHashes = JSON.parse(
  await readFile(
    new URL('./data/approved-scene-content-sha256.json', import.meta.url),
    'utf8',
  ),
);

test('All 104 questions retain every approved word, explanation and correct answer; narration is unchanged', () => {
  episodes.forEach((scenes, index) => {
    const canonical = scenes.map((s) => ({
      narration: s.narration,
      quiz: s.quiz.map((q) => ({
        question: q.question,
        options: [...q.options].sort(),
        answer: q.options[q.correctIndex],
        explanation: q.explanation,
      })),
    }));
    assert.equal(
      createHash('sha256').update(JSON.stringify(canonical)).digest('hex'),
      approvedHashes[index],
    );
  });
});
test('A, B and C differ by at most one correct answer in every episode', () => {
  episodes.forEach((scenes, index) => {
    const count = [0, 0, 0];
    scenes
      .flatMap((s) => s.quiz)
      .forEach((q) => {
        assert.equal(q.options.length, 3);
        count[q.correctIndex]++;
      });
    assert.equal(
      count.reduce((a, b) => a + b),
      [32, 32, 40][index],
    );
    assert.ok(Math.max(...count) - Math.min(...count) <= 1);
  });
});
test('Every reading section is short and together they contain the complete original text', () => {
  for (const scene of episodes.flat()) {
    const sections = readingSections(scene.narration);
    assert.equal(sections.join(''), scene.narration);
    assert.ok(sections.every((s) => s.trim().length > 0 && s.length <= 115));
    assert.equal(readingSectionAt(sections, 0, 60), sections[0]);
    assert.equal(readingSectionAt(sections, 60, 60), sections.at(-1));
    for (let t = 0; t <= 60; t += 0.25)
      assert.ok(sections.includes(readingSectionAt(sections, t, 60)));
  }
});
test('Pause, rewind and slow reading depend on media time, not wall time', () => {
  const sections = readingSections(episodes[0][0].narration);
  const first = readingSectionAt(sections, 4, 40);
  const later = readingSectionAt(sections, 30, 40);
  assert.notEqual(first, later);
  assert.equal(readingSectionAt(sections, 4, 40), first);
  // At rate .8, ten real seconds produce eight seconds of audio time.
  assert.equal(
    readingSectionAt(sections, 10 * 0.8, 40),
    readingSectionAt(sections, 8, 40),
  );
});
test('Video follows audio after map/intro, loops correctly, holds its last frame and rewinds', () => {
  assert.deepEqual(videoPosition(4, 6, 10, false), {
    time: 0,
    finished: false,
  });
  assert.deepEqual(videoPosition(12, 6, 10, false), {
    time: 6,
    finished: false,
  });
  assert.deepEqual(videoPosition(27, 6, 10, false), {
    time: 1,
    finished: false,
  });
  assert.deepEqual(videoPosition(27, 6, 10, true), {
    time: 9.999,
    finished: true,
  });
  assert.deepEqual(videoPosition(8, 6, 10, true), { time: 2, finished: false });
  assert.deepEqual(videoPosition(20, 15, 10, true), {
    time: 5,
    finished: false,
  });
  assert.deepEqual(videoPosition(8, 6, NaN, true), {
    time: 0,
    finished: false,
  });
});
