import type { HistoriaScene } from '../../data';

export function chooseQuestions(scenes: HistoriaScene[], random = Math.random, episode: 1 | 2 | 3 = 1) {
  function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  // Three distinct scenes from each era; at least one discovery question per era.
  return shuffle([
    scenes.filter((scene) => scene.id <= 5),
    scenes.filter((scene) => scene.id >= 6 && scene.id <= 10),
    scenes.filter((scene) => scene.id >= 11),
  ].flatMap((group) => shuffle(group).slice(0, 3).map((scene, index) => {
    const quizIndex = index === 0 ? 1 : Math.floor(random() * scene.quiz.length);
    const quiz = scene.quiz[quizIndex];
    // Only the standalone challenge wording changes; approved scene quizzes stay intact.
    const standalone: Record<string, string> = episode === 1 ? {
      '1-0': 'Wo liegt Oberägypten?',
      '4-1': 'Was schließen Ägypter und Hethiter Jahre nach der Schlacht bei Kadesch?',
      '10-1': 'Mit welchen Mitteln setzte Qin Shihuangdi die neue Ordnung durch?',
      '15-0': 'Wie lässt sich die frühe Ausbreitung christlicher Gemeinden darstellen?',
    } : episode === 2 ? {
      '3-1': 'Welche Räume verbanden die Routen der Wikinger?',
      '7-1': 'Welche gesellschaftliche Folge hatte die Pest im 14. Jahrhundert?',
      '11-1': 'Welches Medium beschleunigt die Verbreitung von Luthers Ideen?',
      '12-0': 'Welches Ereignis gilt 1618 als Startsignal des Dreißigjährigen Krieges?',
      '12-1': 'Was beendet den Dreißigjährigen Krieg 1648?',
      '13-1': 'Welche Belastung brachte die Herrschaft Ludwigs XIV. mit sich?',
      '15-1': 'Welche Hilfe war für den Sieg im amerikanischen Unabhängigkeitskrieg entscheidend?',
    } : {
      '3-0': 'Welcher Konflikt steht im Zentrum des amerikanischen Bürgerkriegs?',
      '6-1': 'Was kennzeichnet die Westfront im Ersten Weltkrieg besonders?',
      '7-0': 'Wer übernimmt im Oktober 1917 in Russland die Macht?',
      '15-1': 'Welche Entwicklung erleichtert 1989 den Fall der Berliner Mauer?',
    };
    const options = shuffle(quiz.options.map((text, i) => ({ text, correct: i === quiz.correctIndex })));
    return { ...quiz, question: standalone[`${scene.id}-${quizIndex}`] ?? quiz.question, sceneId: scene.id, topic: scene.title,
      options: options.map((option) => option.text),
      correctIndex: options.findIndex((option) => option.correct),
      discovery: index === 0,
    };
  })));
}

export function rankFor(score: number) {
  return score === 9 ? 'Zeitmeister' : score >= 7 ? 'Zeitkenner' : score >= 5 ? 'Spurensucher' : 'Zeitstarter';
}
