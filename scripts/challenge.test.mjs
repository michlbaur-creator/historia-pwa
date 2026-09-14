import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

async function moduleURL(url) {
  const source = await readFile(url, 'utf8');
  const { outputText } = ts.transpileModule(source, {
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
async function loadTS(path) {
  return import(await moduleURL(new URL(path, import.meta.url)));
}
const { chooseQuestions, chooseHyperQuestions, rankFor, hyperRankFor } =
  await loadTS('../app/episode-1/challenge/questions.ts');
const { challengeQuestions } = await loadTS(
  '../app/episode-1/challenge/question-bank.ts',
);
const { historiaLearning } = await loadTS('../app/learning.ts');
const scenes = Object.entries(historiaLearning).map(([id, data]) => ({
  id: Number(id),
  title: `Szene ${id}`,
  ...data,
}));
const { historiaEpisode2Scenes } = await loadTS('../app/episode2-data.ts');
const { historiaEpisode3Scenes } = await loadTS('../app/episode3-data.ts');
const { challengeConfig, challengeBestKey } = await loadTS(
  '../app/episode-1/challenge/config.ts',
);

function eraFor(episode, sceneId) {
  if (episode === 3) return sceneId <= 6 ? 1 : sceneId <= 12 ? 2 : 3;
  return sceneId <= 5 ? 1 : sceneId <= 10 ? 2 : 3;
}

for (const [episode, pool] of [
  [1, scenes],
  [2, historiaEpisode2Scenes],
  [3, historiaEpisode3Scenes],
]) {
  test(`Episode ${episode}: 1000 rounds use only this episode, all eras and intact solutions`, () => {
    const before = JSON.stringify(pool);
    const seen = new Set();
    for (let round = 0; round < 1000; round++) {
      const questions = chooseQuestions(pool, Math.random, episode);
      assert.equal(questions.length, 9);
      assert.equal(new Set(questions.map((q) => q.sceneId)).size, 9);
      assert.equal(
        questions.filter((q) => eraFor(episode, q.sceneId) === 1).length,
        3,
      );
      assert.equal(
        questions.filter((q) => eraFor(episode, q.sceneId) === 2).length,
        3,
      );
      assert.equal(
        questions.filter((q) => eraFor(episode, q.sceneId) === 3).length,
        3,
      );
      assert.ok(questions.some((q) => q.tricky));
      for (const q of questions) {
        const source = pool.find((s) => s.id === q.sceneId);
        assert.equal(q.topic, source.title);
        const original = challengeQuestions[episode][q.sceneId];
        assert.ok(original);
        assert.equal(q.question, original.question);
        assert.equal(q.options.length, 3);
        assert.equal(new Set(q.options).size, 3);
        assert.equal(
          q.options[q.correctIndex],
          original.options[original.correctIndex],
        );
        seen.add(q.explanation);
      }
    }
    assert.equal(seen.size, pool.length);
    assert.equal(JSON.stringify(pool), before);
  });
}
test('independent best scores and correct episode transitions', () => {
  assert.equal(new Set([1, 2, 3].map(challengeBestKey)).size, 3);
  assert.equal(challengeBestKey(1), 'historia-episode1-challenge-best-v2');
  assert.equal(challengeConfig[1].href, '/episode-2');
  assert.equal(challengeConfig[2].href, '/episode-3');
  assert.equal(challengeConfig[3].href, '/hyper-challenge/');
});

test('1000 rounds: nine distinct scenes, balanced eras, misconceptions and preserved answers', () => {
  for (let round = 0; round < 1000; round++) {
    const questions = chooseQuestions(scenes);
    assert.equal(questions.length, 9);
    assert.equal(new Set(questions.map((q) => q.sceneId)).size, 9);
    assert.equal(questions.filter((q) => q.sceneId <= 5).length, 3);
    assert.equal(
      questions.filter((q) => q.sceneId >= 6 && q.sceneId <= 10).length,
      3,
    );
    assert.equal(questions.filter((q) => q.sceneId >= 11).length, 3);
    assert.ok(questions.some((q) => q.tricky));
    for (const q of questions) {
      assert.equal(q.options.length, 3);
      assert.equal(new Set(q.options).size, 3);
      const original = challengeQuestions[1][q.sceneId];
      assert.equal(
        q.options[q.correctIndex],
        original.options[original.correctIndex],
      );
    }
  }
});
test('all score boundaries have the expected rank', () => {
  assert.deepEqual(
    Array.from({ length: 10 }, (_, score) => rankFor(score)),
    [
      'Zeitstarter',
      'Zeitstarter',
      'Zeitstarter',
      'Zeitstarter',
      'Zeitstarter',
      'Spurensucher',
      'Spurensucher',
      'Zeitkenner',
      'Zeitkenner',
      'Zeitmeister',
    ],
  );
});
test('does not mutate the scene data', () => {
  const before = JSON.stringify(scenes);
  chooseQuestions(scenes);
  assert.equal(JSON.stringify(scenes), before);
});
test('all source questions can be drawn over repeated rounds', () => {
  const seen = new Set();
  for (let i = 0; i < 1000; i++)
    chooseQuestions(scenes).forEach((q) => seen.add(q.explanation));
  assert.equal(seen.size, 16);
});

test('Hyper: 1000 rounds, six per episode, two per era, 18 unique questions with preserved solutions', () => {
  const pools = [scenes, historiaEpisode2Scenes, historiaEpisode3Scenes];
  const before = JSON.stringify(pools);
  const seen = new Set();
  for (let round = 0; round < 1000; round++) {
    const questions = chooseHyperQuestions(pools);
    assert.equal(questions.length, 18);
    assert.equal(
      new Set(questions.map((q) => `${q.episode}-${q.sceneId}`)).size,
      18,
    );
    for (const episode of [1, 2, 3]) {
      const subset = questions.filter((q) => q.episode === episode);
      assert.equal(subset.length, 6);
      assert.equal(
        subset.filter((q) => eraFor(episode, q.sceneId) === 1).length,
        2,
      );
      assert.equal(
        subset.filter((q) => eraFor(episode, q.sceneId) === 2).length,
        2,
      );
      assert.equal(
        subset.filter((q) => eraFor(episode, q.sceneId) === 3).length,
        2,
      );
      assert.ok(subset.some((q) => q.tricky));
    }
    for (const q of questions) {
      const original = challengeQuestions[q.episode][q.sceneId];
      assert.equal(
        q.options[q.correctIndex],
        original.options[original.correctIndex],
      );
      seen.add(`${q.episode}-${q.sceneId}`);
    }
  }
  assert.equal(seen.size, 51);
  assert.equal(JSON.stringify(pools), before);
});

test('Hyper ranks include honest participation results and reserve Champion for 18/18', () => {
  for (let score = 0; score <= 18; score++) {
    assert.equal(
      hyperRankFor(score),
      score === 18
        ? 'Historia-Champion'
        : score >= 14
          ? 'Zeitkenner'
          : score >= 10
            ? 'Spurensucher'
            : 'Zeitstarter',
    );
  }
});

const { Fanfare } = await loadTS('../app/episode-1/challenge/fanfare.ts');
function fakeContext() {
  const sources = [];
  const parameter = () => ({
    value: 0,
    setValueAtTime() {},
    linearRampToValueAtTime() {},
    exponentialRampToValueAtTime() {},
  });
  return {
    state: 'suspended',
    currentTime: 0,
    destination: {},
    sources,
    resumes: 0,
    closed: false,
    async resume() {
      this.resumes++;
      this.state = 'running';
    },
    async close() {
      this.closed = true;
      this.state = 'closed';
    },
    createGain: () => ({ gain: parameter(), connect() {}, disconnect() {} }),
    createBiquadFilter: () => ({
      frequency: parameter(),
      connect() {},
      disconnect() {},
    }),
    createOscillator() {
      const source = {
        frequency: parameter(),
        stopped: false,
        connect() {},
        disconnect() {},
        start() {},
        stop() {
          this.stopped = true;
        },
      };
      sources.push(source);
      return source;
    },
  };
}
test('Fanfare unlocks on play, reuses its context, and schedules drums and trumpets for the finale', async () => {
  const context = fakeContext();
  let creations = 0;
  const player = new Fanfare(() => {
    creations++;
    return context;
  });
  assert.equal(await player.play(), true);
  assert.equal(context.sources.length, 4);
  assert.equal(await player.play(true), true);
  assert.equal(context.sources.length, 24);
  assert.equal(creations, 1);
  assert.equal(context.resumes, 2);
  player.dispose();
  assert.ok(context.closed);
  assert.ok(context.sources.every((s) => s.stopped));
});
test('Muting while mobile audio resumes prevents any delayed sound', async () => {
  const context = fakeContext();
  let resume;
  context.resume = () =>
    new Promise((resolve) => {
      resume = () => {
        context.state = 'running';
        resolve();
      };
    });
  const player = new Fanfare(() => context);
  const playing = player.play(true);
  player.stop();
  resume();
  assert.equal(await playing, false);
  assert.equal(context.sources.length, 0);
  player.dispose();
});
test('Unsupported or blocked audio reports failure without crashing the quiz', async () => {
  const player = new Fanfare(() => {
    throw Error('Unsupported');
  });
  assert.equal(await player.play(), false);
  player.dispose();
});

test('Certificate renders the actual result, date and safely escaped name; blank names remain writable', async () => {
  const source = (
    await readFile(
      new URL('../app/episode-1/challenge/Certificate.tsx', import.meta.url),
      'utf8',
    )
  ).replace(
    "import styles from './challenge.module.css';",
    'const styles = new Proxy({}, { get: (_, key) => key });',
  );
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX },
  });
  const compiled = outputText.replace(
    'react/jsx-runtime',
    import.meta.resolve('react/jsx-runtime'),
  );
  const { default: Certificate } = await import(
    `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`
  );
  const html = renderToStaticMarkup(
    createElement(Certificate, {
      name: '<script>Test</script>',
      score: 13,
      rank: 'Spurensucher',
      date: '14.9.2026',
    }),
  );
  assert.match(html, /13 von 18 Fragen richtig/);
  assert.match(html, /Spurensucher/);
  assert.match(html, /14\.9\.2026/);
  assert.match(html, /&lt;script&gt;Test&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<script|<button|<input/);
  const blank = renderToStaticMarkup(
    createElement(Certificate, {
      name: '',
      score: 0,
      rank: 'Zeitstarter',
      date: '14.9.2026',
    }),
  );
  assert.match(blank, /________________________/);
  assert.match(blank, /0 von 18 Fragen richtig/);
});

const { hyperBlockState, retryHyperBlock } = await loadTS(
  '../app/episode-1/challenge/hyper-blocks.ts',
);
test('Hyper block gate requires all nine correct; an incomplete block never passes', () => {
  const questions = Array.from({ length: 18 }, () => ({ correctIndex: 1 }));
  assert.equal(hyperBlockState(questions, Array(8).fill(1), 8).passed, false);
  assert.equal(
    hyperBlockState(questions, [...Array(8).fill(1), 0], 8).passed,
    false,
  );
  assert.equal(hyperBlockState(questions, Array(9).fill(1), 8).passed, true);
  assert.deepEqual(retryHyperBlock([...Array(8).fill(1), 0], 8), {
    answers: [],
    index: 0,
  });
});
test('Repeated retries of block two preserve the first nine answers and allow 18/18', () => {
  const questions = Array.from({ length: 18 }, () => ({ correctIndex: 1 }));
  const failed = [...Array(9).fill(1), ...Array(8).fill(1), 0];
  const retry = retryHyperBlock(failed, 17);
  assert.deepEqual(retry, { answers: Array(9).fill(1), index: 9 });
  assert.equal(failed.length, 18);
  assert.equal(hyperBlockState(questions, retry.answers, 9).score, 0);
  assert.deepEqual(
    retryHyperBlock([...retry.answers, ...Array(9).fill(0)], 17),
    retry,
  );
  const completed = [...retry.answers, ...Array(9).fill(1)];
  assert.equal(hyperBlockState(questions, completed, 17).passed, true);
  assert.equal(
    hyperRankFor(
      completed.filter((answer, i) => answer === questions[i].correctIndex)
        .length,
    ),
    'Historia-Champion',
  );
});
