import { historiaScenes, type HistoriaScene } from '../data';
import { historiaEpisode2Scenes } from '../episode2-data';
import { historiaEpisode3Scenes } from '../episode3-data';
export type LearningScene = HistoriaScene;
export type LearningStation = {
  id: number;
  title: string;
  sceneIds: number[];
  task: string;
  scenes: HistoriaScene[];
  quizzes: {
    question: string;
    answers: readonly string[];
    correctAnswer: number;
    explanation: string;
  }[];
};
export const episodes = [
  historiaScenes,
  historiaEpisode2Scenes,
  historiaEpisode3Scenes,
];
function stations(
  episode: number,
  groups: [string, number[], string, [number, number][]][],
): LearningStation[] {
  return groups.map(([title, sceneIds, task, questions], id) => ({
    id,
    title,
    sceneIds,
    task,
    scenes: sceneIds.map((n) => episodes[episode - 1].find((s) => s.id === n)!),
    quizzes: questions.map(([n, q]) => {
      const original = episodes[episode - 1].find((s) => s.id === n)!.quiz[q];
      return {
        question: original.question,
        answers: original.options,
        correctAnswer: original.correctIndex,
        explanation: original.explanation,
      };
    }),
  }));
}
export const learningPaths = [
  {
    id: 'antike',
    href: '/lernpfad-antike/',
    key: 'historia-lernpfad-antike-v1',
    title: 'Macht und Mitbestimmung in der Antike',
    subtitle: 'Vom Pharao zur römischen Kaiserzeit',
    episode: 1 as const,
    duration: '40',
    intro:
      'Wer entscheidet – und wie wird Herrschaft organisiert und begründet?',
    opening:
      'Ein Mensch entscheidet für ein ganzes Land. Was braucht er dafür? Notiere zwei Vermutungen.',
    assignment:
      'Vergleiche auf Papier Ägypten, Athen und Rom unter Augustus: Wer entscheidet? Wer ist ausgeschlossen? Wodurch wird Macht gesichert? Nutze für jede Gesellschaft einen Beleg aus den Szenen. Erkläre anschließend, warum Ämter und Senat allein noch keine Mitbestimmung garantieren.',
    discussion:
      'Woran erkennst du den Unterschied zwischen sichtbaren Herrschaftsformen und tatsächlicher Macht?',
    conclusion:
      'Du hast Organisation, Recht und Mitbestimmung in antiken Gesellschaften verglichen.',
    extension:
      'Vergleiche das Perserreich mit Qin Shihuangdis China (Episode 1, Szene 10): Welche gemeinsamen Mittel halten große Reiche zusammen, welchen Preis nennt die China-Szene?',
    extensionScene: 10,
    stations: stations(1, [
      [
        'Ein Staat am Nil',
        [1, 2],
        'Achte auf Land, Abgaben und Arbeit: Wie wird königliche Macht sichtbar?',
        [
          [1, 1],
          [2, 1],
        ],
      ],
      [
        'Recht und gesellschaftlicher Rang',
        [3],
        'Für wen gilt welches Recht? Unterscheide öffentliches Recht und gleiche Rechte.',
        [
          [3, 0],
          [3, 1],
        ],
      ],
      [
        'Ein Großreich organisieren',
        [5],
        'Wie verbinden Straßen, Provinzen und Berichte ein großes Reich?',
        [
          [5, 0],
          [5, 1],
        ],
      ],
      [
        'Mitbestimmen in Athen',
        [7],
        'Wer darf entscheiden – und wer bleibt ausgeschlossen?',
        [
          [7, 0],
          [7, 1],
        ],
      ],
      [
        'Vom Bürgerkrieg zur Kaiserzeit',
        [12, 13, 14],
        'Verfolge den Machtwechsel von Caesar über Octavian zu Augustus. Was bleibt nur auf dem Papier?',
        [
          [12, 1],
          [14, 1],
        ],
      ],
    ]),
  },
  {
    id: 'mittelalter',
    href: '/lernpfad-mittelalter/',
    key: 'historia-lernpfad-mittelalter-v1',
    title: 'Glaube und Herrschaft im Mittelalter',
    subtitle: 'Gemeinschaften, Kaiser und Konflikte · 622–1453',
    episode: 2 as const,
    duration: '40',
    intro:
      'Wie verbinden sich religiöse Gemeinschaften, politische Herrschaft und militärische Macht?',
    opening:
      'Welche Verbindung könnte zwischen einer Krönung und religiöser Autorität bestehen? Notiere eine Vermutung.',
    assignment:
      'Vergleiche das Kalifenreich, Karls Herrschaft und Ottos Kaiserreich. Notiere zu jedem Beispiel, wie religiöse Gemeinschaften oder Amtsträger und politische Organisation zusammenwirken. Erkläre mit einem weiteren Beispiel aus den Kreuzzügen oder Konstantinopel, warum Religion allein einen Konflikt nicht erklärt.',
    discussion:
      'Welche Rolle spielen neben Religion auch Verwaltung, Land und die Lage wichtiger Städte?',
    conclusion:
      'Du hast Beziehungen zwischen Glauben, politischer Ordnung und Konflikten untersucht.',
    extension:
      'Untersuche die Wikinger (Episode 2, Szene 3): Welche Verbindungen entstehen neben Eroberung auch durch Handel und Siedlung?',
    extensionScene: 3,
    stations: stations(2, [
      [
        'Gemeinschaft und Kalifenreich',
        [1],
        'Wie wird aus einer religiösen Gemeinschaft ein politisches Großreich?',
        [
          [1, 0],
          [1, 1],
        ],
      ],
      [
        'Karl und die Kaiserkrone',
        [2],
        'Achte auf Papst, Grafen, Bischöfe und Bildung: Wer trägt Karls Herrschaft?',
        [
          [2, 0],
          [2, 1],
        ],
      ],
      [
        'Otto und die Bischöfe',
        [4],
        'Vergleiche Ottos Herrschaft mit Karl: Welche Rolle spielen Sieg und Krönung?',
        [
          [4, 0],
          [4, 1],
        ],
      ],
      [
        'Kreuzzüge und ihre Folgen',
        [5],
        'Halte Aufruf, Eroberung und Folgen für die Menschen auseinander.',
        [
          [5, 0],
          [5, 1],
        ],
      ],
      [
        'Konstantinopel 1453',
        [9],
        'Welche militärischen Mittel und welche geografische Lage werden wichtig?',
        [
          [9, 0],
          [9, 1],
        ],
      ],
    ]),
  },
  {
    id: 'rechte',
    href: '/lernpfad-rechte/',
    key: 'historia-lernpfad-rechte-v1',
    title: 'Herrschaft hinterfragen – Rechte erkämpfen',
    subtitle: 'Reformation, Aufklärung und Revolution · 1517–1815',
    episode: 2 as const,
    duration: '40',
    intro:
      'Wie werden religiöse und politische Autoritäten infrage gestellt – und für wen gelten neue Rechte?',
    opening:
      'Was bedeutet es, wenn ein Herrscher seine Macht begründen muss? Halte eine Idee fest.',
    assignment:
      'Zeichne eine Tabelle mit Versailles, Aufklärung und Revolutionen. Notiere: Wer beansprucht Macht? Wie wird sie begründet oder kritisiert? Welche Grenzen der Freiheit zeigen die Szenen? Erkläre mit zwei konkreten Beispielen, warum ein Freiheitsversprechen noch keine gleiche Freiheit für alle bedeutet.',
    discussion:
      'Welche Unterschiede bestehen zwischen einem neuen politischen Ideal und seiner Umsetzung?',
    conclusion:
      'Du hast Veränderungen von Autorität und die Grenzen neuer Freiheitsrechte verglichen.',
    extension:
      'Gehe zu Episode 3, Szene 2 (1848). Vergleiche die Forderungen nach Verfassung und Mitbestimmung mit den Ideen der Aufklärung.',
    extensionScene: 2,
    extensionEpisode: 3,
    stations: stations(2, [
      [
        'Autorität wird bestritten',
        [11],
        'Achte auf Buchdruck und Fürsten: Wie verbreitet und schützt sich Kritik?',
        [
          [11, 0],
          [11, 1],
        ],
      ],
      [
        'Glaubensstreit und Machtpolitik',
        [12],
        'Warum ist der Fenstersturz ein Startsignal, aber nicht die einzige Kriegsursache?',
        [
          [12, 0],
          [12, 1],
        ],
      ],
      [
        'Herrschaft in Versailles',
        [13],
        'Wie bindet Ludwig XIV. den Adel – und wer trägt die Kosten?',
        [
          [13, 0],
          [13, 1],
        ],
      ],
      [
        'Vernunft und überprüfbare Belege',
        [14],
        'Wie verändern neue Denkweisen den Blick auf Natur und Politik?',
        [
          [14, 0],
          [14, 1],
        ],
      ],
      [
        'Revolutionen und ihre Grenzen',
        [15, 16],
        'Vergleiche Freiheitsversprechen mit Ausschlüssen, Krieg und neuer Kaisermacht.',
        [
          [15, 1],
          [16, 1],
        ],
      ],
    ]),
  },
  {
    id: 'demokratie',
    href: '/lernpfad-demokratie/',
    key: 'historia-lernpfad-demokratie-v1',
    title: 'Demokratie unter Druck',
    subtitle: 'Weimar, NS-Diktatur, Weltkrieg und Holocaust · 1919–1945',
    episode: 3 as const,
    duration: '40',
    intro:
      'Wie wird eine Demokratie geschwächt und beseitigt – und welche Folgen hat die nationalsozialistische Herrschaft?',
    opening:
      'Welche Rechte und Regeln schützen Menschen in einer Demokratie? Notiere zwei Gedanken.',
    assignment:
      'Erstelle eine zeitliche Erklärung von Weimar bis zur NS-Diktatur: Krise der Republik → Ernennung Hitlers → Beseitigung von Rechten und Kontrolle. Belege jeden Schritt mit einer Szene und benenne verantwortliche Akteure. Erläutere anschließend anhand der letzten beiden Stationen den Unterschied zwischen Krieg und systematischer Verfolgung und Ermordung. Stelle keine zwangsläufige Entwicklung dar.',
    discussion:
      'Welche Entscheidungen und Handlungen zeigen, dass das Ende der Demokratie kein unausweichlicher Automatismus war?',
    conclusion:
      'Du hast den Abbau der Demokratie und die Folgen nationalsozialistischer Herrschaft untersucht.',
    extension:
      'Untersuche Episode 3, Szene 18: Welchen Weg zur Zusammenarbeit wählen sechs westeuropäische Staaten nach zwei Weltkriegen?',
    extensionScene: 18,
    teacherNote:
      'Diese Einheit behandelt Entrechtung, Krieg und den Holocaust. Mit der Lehrkraft bearbeiten; Vorwissen, Altersangemessenheit und Gesprächsbedarf vorab klären. Die kurze Einheit ersetzt keine vertiefte Behandlung. Kein Wettbewerb und keine spielerischen Jubel-Effekte.',
    stations: stations(3, [
      [
        'Eine Republik unter Druck',
        [9],
        'Unterscheide demokratische Neuerungen und politische sowie wirtschaftliche Belastungen.',
        [
          [9, 0],
          [9, 1],
        ],
      ],
      [
        'Die Ernennung im Januar 1933',
        [10],
        'Wer trifft welche Entscheidung? Warum ist „direkt zum Kanzler gewählt“ falsch?',
        [
          [10, 0],
          [10, 1],
        ],
      ],
      [
        'Demokratie wird beseitigt',
        [11],
        'Benenne Schritte gegen Rechte, Parteien und unabhängige Kontrolle.',
        [
          [11, 0],
          [11, 1],
        ],
      ],
      [
        'Der Zweite Weltkrieg',
        [12],
        'Achte auf den deutschen Überfall, die Kriegsausweitung und die Opfer.',
        [
          [12, 0],
          [12, 1],
        ],
      ],
      [
        'Der Holocaust',
        [13],
        'Halte fest, wer verfolgt und ermordet wird und wie der systematische Massenmord organisiert wird.',
        [
          [13, 0],
          [13, 1],
        ],
      ],
    ]),
  },
];
export type LearningPathDefinition = (typeof learningPaths)[number];
const learningStations = learningPaths[0].stations;
export type LearningProgress = {
  scores: (number | null)[];
  completedAt: string | null;
};
export function emptyProgress(
  stations: LearningStation[] = learningStations,
): LearningProgress {
  return { scores: stations.map(() => null), completedAt: null };
}
export function readProgress(
  raw: string | null,
  stations: LearningStation[] = learningStations,
): LearningProgress {
  try {
    const value = JSON.parse(raw ?? 'null');
    if (!value || !Array.isArray(value.scores)) return emptyProgress(stations);
    const scores = stations.map((s, i) =>
      Number.isInteger(value.scores[i]) &&
      value.scores[i] >= 0 &&
      value.scores[i] <= s.quizzes.length
        ? value.scores[i]
        : null,
    );
    return {
      scores,
      completedAt:
        scores.every((s) => s !== null) &&
        typeof value.completedAt === 'string' &&
        /^\d{4}-\d{2}-\d{2}$/.test(value.completedAt) &&
        Number.isFinite(Date.parse(value.completedAt))
          ? value.completedAt
          : null,
    };
  } catch {
    return emptyProgress(stations);
  }
}
export function recordResult(
  progress: LearningProgress,
  station: number,
  score: number,
  date: string,
  stations: LearningStation[] = learningStations,
): LearningProgress {
  if (
    !stations[station] ||
    !Number.isInteger(score) ||
    score < 0 ||
    score > stations[station].quizzes.length
  )
    return progress;
  const scores = progress.scores.map((old, i) =>
    i === station ? Math.max(old ?? 0, score) : old,
  );
  return {
    scores,
    completedAt: scores.every((s) => s !== null)
      ? (progress.completedAt ?? date)
      : null,
  };
}
