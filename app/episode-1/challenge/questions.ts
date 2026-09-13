import type { HistoriaScene } from '../../data';
import { challengeQuestions } from './question-bank';

export function chooseQuestions(scenes: HistoriaScene[], random = Math.random, episode: 1 | 2 | 3 = 1) {
  function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  const bank = challengeQuestions[episode];
  const groups = [scenes.filter(s => s.id <= 5), scenes.filter(s => s.id >= 6 && s.id <= 10), scenes.filter(s => s.id >= 11)];
  const selected = groups.flatMap(group => shuffle(group).slice(0, 3));
  // Include a fair misconception question, without duplicating any scene.
  if (!selected.some(scene => bank[scene.id].tricky)) {
    const candidate = shuffle(groups[0].filter(scene => bank[scene.id].tricky))[0];
    if (candidate) selected[0] = candidate;
  }
  return shuffle(selected).map(scene => {
    const quiz = bank[scene.id];
    const options = shuffle(quiz.options.map((text, i) => ({ text, correct: i === quiz.correctIndex })));
    return { ...quiz, sceneId: scene.id, topic: scene.title,
      options: options.map(option => option.text),
      correctIndex: options.findIndex(option => option.correct),
    };
  });
}

export function rankFor(score: number) {
  return score === 9 ? 'Zeitmeister' : score >= 7 ? 'Zeitkenner' : score >= 5 ? 'Spurensucher' : 'Zeitstarter';
}
