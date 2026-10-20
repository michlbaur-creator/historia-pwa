import { test } from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { loadTS, loadEpisodes } from './load-scenes.mjs';
const { learningPaths, emptyProgress, readProgress, recordResult } =
  await loadTS('../app/data/learningPath.ts');
const episodes = await loadEpisodes();
test('Four chronological paths, five stations, forty unchanged original questions', async () => {
  assert.equal(learningPaths.length, 4);
  assert.equal(new Set(learningPaths.map((p) => p.key)).size, 4);
  for (const p of learningPaths) {
    assert.match(p.key, /^historia-lernpfad-/);
    assert.equal(p.stations.length, 5);
    let previous = 0;
    for (const s of p.stations) {
      assert.equal(s.quizzes.length, 2);
      for (const scene of s.scenes) {
        assert.ok(scene.id > previous);
        previous = scene.id;
        assert.deepEqual(
          scene,
          episodes[p.episode - 1].find((x) => x.id === scene.id),
        );
        for (const media of [
          scene.audio,
          scene.mapImage,
          scene.mainImage,
          scene.video,
          ...(scene.imageSequence ?? []).map((x) => x.src),
        ].filter(Boolean)) {
          await access(
            new URL('../public' + media.split('?')[0], import.meta.url),
          );
        }
      }
      for (const q of s.quizzes)
        assert.ok(
          s.scenes.some((scene) =>
            scene.quiz.some(
              (original) =>
                original.question === q.question &&
                JSON.stringify(original.options) ===
                  JSON.stringify(q.answers) &&
                original.correctIndex === q.correctAnswer &&
                original.explanation === q.explanation,
            ),
          ),
        );
    }
  }
});
test('Zero score completes station, retries retain best and never duplicate points', () => {
  const stations = learningPaths[0].stations;
  let p = emptyProgress(stations);
  p = recordResult(p, 0, 0, '2026-10-20', stations);
  assert.equal(p.scores[0], 0);
  p = recordResult(p, 0, 2, '2026-10-20', stations);
  p = recordResult(p, 0, 1, '2026-10-21', stations);
  assert.equal(p.scores[0], 2);
  for (let i = 1; i < 5; i++) p = recordResult(p, i, 2, '2026-10-20', stations);
  assert.equal(
    p.scores.reduce((a, b) => a + b),
    10,
  );
  assert.equal(p.completedAt, '2026-10-20');
  assert.deepEqual(readProgress(JSON.stringify(p), stations), p);
  assert.deepEqual(recordResult(p, 8, 2, '2026-10-20', stations), p);
});
test('Corrupt progress recovers safely, and each path starts independently', () => {
  for (const p of learningPaths) {
    assert.deepEqual(
      readProgress('bad', p.stations),
      emptyProgress(p.stations),
    );
    assert.deepEqual(
      readProgress('{"scores":[9,-1,"2",null,1.5]}', p.stations).scores,
      [null, null, null, null, null],
    );
  }
});
