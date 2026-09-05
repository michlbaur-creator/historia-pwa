export type HistoriaDiscovery = {
  label: string;
  title: string;
  text: string;
};

export type HistoriaQuiz = {
  question: string;
  options: [string, string, string];
  correctIndex: 0 | 1 | 2;
  explanation: string;
};

export type HistoriaLearning = {
  discoveries: [HistoriaDiscovery, HistoriaDiscovery];
  quiz: [HistoriaQuiz, HistoriaQuiz];
};

export const historiaLearning: Record<number, HistoriaLearning> = {
  1: {
    discoveries: [
      {
        label: 'Karte lesen',
        title: 'Der Nil zeigt nach Norden',
        text: 'Oberägypten liegt im Süden, Unterägypten am Delta im Norden. Die Namen folgen also nicht der üblichen Blickrichtung einer Karte, sondern dem Lauf und Gefälle des Nils.',
      },
      {
        label: 'Macht erkennen',
        title: 'Mehr als nur eine Krone',
        text: 'Mit der Vereinigung kontrolliert der Pharao Land, Abgaben und Soldaten. Aus zwei Herrschaftsgebieten wird ein mächtiger Staat.',
      },
    ],
    quiz: [
      {
        question: 'Wo liegt Oberägypten auf der Karte?',
        options: ['Im Süden', 'Am Delta im Norden', 'In Mesopotamien'],
        correctIndex: 0,
        explanation: 'Oberägypten liegt im Süden; der Nil fließt von dort Richtung Norden.',
      },
      {
        question: 'Was kontrolliert der Pharao im vereinigten Ägypten?',
        options: ['Nur die Tempel', 'Land, Abgaben und Soldaten', 'Nur den Handel am Delta'],
        correctIndex: 1,
        explanation: 'Die Kontrolle über Land, Abgaben und Soldaten macht die neue Königsherrschaft stark.',
      },
    ],
  },
  2: {
    discoveries: [
      {
        label: 'Ort finden',
        title: 'Gizeh liegt nahe Memphis',
        text: 'Die Große Pyramide entsteht bei Gizeh, nahe der damaligen Hauptstadt Memphis. Die Karte macht diese räumliche Nähe sichtbar.',
      },
      {
        label: 'Bauwerk verstehen',
        title: 'Planung wird zu Macht',
        text: 'Fachwissen, Planung und die Arbeit vieler Menschen ermöglichen den Bau. Die Pyramide ist Grabmal und weithin sichtbares Zeichen königlicher Macht zugleich.',
      },
    ],
    quiz: [
      {
        question: 'Was machte den Bau der Großen Pyramide möglich?',
        options: ['Planung, Fachwissen und viele Arbeitskräfte', 'Ein einziges Baujahr', 'Nur die Arbeit des Pharaos'],
        correctIndex: 0,
        explanation: 'Das Großprojekt brauchte Planung, Fachwissen und die Arbeit vieler Menschen.',
      },
      {
        question: 'Welche doppelte Bedeutung hatte die Große Pyramide?',
        options: ['Marktplatz und Hafen', 'Festung und Straße', 'Grabmal und Zeichen der Macht'],
        correctIndex: 2,
        explanation: 'Sie war Grabmal des Königs und zugleich ein weithin sichtbares Machtsymbol.',
      },
    ],
  },
  3: {
    discoveries: [
      {
        label: 'Textspur',
        title: 'Recht wird sichtbar',
        text: 'Hammurabi lässt Rechtssätze zu Besitz, Handel, Familie und Strafen auf einer großen Stele festhalten und öffentlich zeigen.',
      },
      {
        label: 'Genau hinsehen',
        title: 'Gleichheit sieht anders aus',
        text: 'Die Sammlung ist berühmt, aber vor diesem Recht sind längst nicht alle gleich. Der gesellschaftliche Rang zählt kräftig mit.',
      },
    ],
    quiz: [
      {
        question: 'Worauf ließ Hammurabi Rechtssätze festhalten?',
        options: ['Auf einer großen Stele', 'Auf einer Königsstraße', 'Auf den Stadtmauern von Athen'],
        correctIndex: 0,
        explanation: 'Die Rechtssätze wurden auf einer großen, öffentlich sichtbaren Stele festgehalten.',
      },
      {
        question: 'Waren vor Hammurabis Recht alle Menschen gleich?',
        options: ['Ja, ohne Ausnahme', 'Nein, der Rang spielte eine Rolle', 'Nur Händler waren gleich'],
        correctIndex: 1,
        explanation: 'Der Rang eines Menschen beeinflusste, wie das Recht angewandt wurde.',
      },
    ],
  },
  4: {
    discoveries: [
      {
        label: 'Auf der Karte',
        title: 'Zwei Heere bei Kadesch',
        text: 'Die Marschrouten führen Ramses II. und Muwatalli II. nach Kadesch. Dort gerät Ramses mit seinem Heer beinahe in eine Falle.',
      },
      {
        label: 'Folge erkennen',
        title: 'Vom Schlachtfeld zum Vertrag',
        text: 'Einen klaren Sieger gibt es nicht. Jahre später schließen beide Mächte einen Friedensvertrag – nach dem Schlachtengetöse übernimmt die Diplomatie.',
      },
    ],
    quiz: [
      {
        question: 'Wie endet die Schlacht bei Kadesch?',
        options: ['Mit einem klaren Sieg Ramses’', 'Ohne klaren Sieger', 'Mit der Eroberung Babylons'],
        correctIndex: 1,
        explanation: 'Ramses schlägt sich frei, aber einen eindeutigen Sieger gibt es nicht.',
      },
      {
        question: 'Was schließen beide Mächte Jahre später?',
        options: ['Einen Friedensvertrag', 'Den Attischen Seebund', 'Ein neues Perserreich'],
        correctIndex: 0,
        explanation: 'Ägypter und Hethiter beenden ihren Konflikt später mit einem Friedensvertrag.',
      },
    ],
  },
  5: {
    discoveries: [
      {
        label: 'Reich verfolgen',
        title: 'Von Babylon bis Kleinasien',
        text: 'Kyros II. erobert Babylon, seine Nachfolger erweitern das Perserreich. Die Königsstraße verbindet Susa mit Kleinasien.',
      },
      {
        label: 'Herrschaft verstehen',
        title: 'Organisation hält das Reich zusammen',
        text: 'Dareios I. teilt das Reich in Provinzen, sichert Straßen und lässt Beamte berichten. Bei dieser Größe reicht eine Krone allein eben nicht.',
      },
    ],
    quiz: [
      {
        question: 'Welche Stadt erobert Kyros II.?',
        options: ['Rom', 'Babylon', 'Athen'],
        correctIndex: 1,
        explanation: 'Mit der Eroberung Babylons wächst das Perserreich unter Kyros II. weiter.',
      },
      {
        question: 'Wie organisiert Dareios I. das große Reich?',
        options: ['Durch Provinzen, Straßen und Berichte', 'Nur durch seine Flotte', 'Durch die Auflösung aller Verwaltungen'],
        correctIndex: 0,
        explanation: 'Provinzen, gesicherte Straßen und berichtende Beamte verbinden Zentrum und Reich.',
      },
    ],
  },
  6: {
    discoveries: [
      {
        label: 'Feldzüge ordnen',
        title: 'Zwei persische Angriffe',
        text: '490 v. Chr. scheitert Dareios’ Heer bei Marathon. Zehn Jahre später führt Xerxes eine neue Invasion; Athen wird dabei besetzt.',
      },
      {
        label: 'Wendepunkt',
        title: 'Die Enge von Salamis',
        text: 'Themistokles lockt die persische Flotte in eine enge Meerenge. Dort ist Beweglichkeit wichtiger als Größe – der Feldzug kippt.',
      },
    ],
    quiz: [
      {
        question: 'Wo scheitert Dareios’ Heer 490 v. Chr.?',
        options: ['Bei Marathon', 'Bei Zama', 'Bei Actium'],
        correctIndex: 0,
        explanation: 'Der erste hier gezeigte persische Angriff scheitert bei Marathon.',
      },
      {
        question: 'Warum wird die Meerenge bei Salamis entscheidend?',
        options: ['Dort zählen Größe und Masse noch mehr', 'Dort kann keine Flotte fahren', 'Dort zählt Beweglichkeit mehr als Größe'],
        correctIndex: 2,
        explanation: 'In der engen Meerenge kann die beweglichere griechische Flotte ihren Vorteil nutzen.',
      },
    ],
  },
  7: {
    discoveries: [
      {
        label: 'Politik prüfen',
        title: 'Abstimmen – aber nicht alle',
        text: 'Freie männliche Bürger stimmen über Krieg, Geld und Politik ab. Frauen, Sklaven und Zugewanderte bleiben ausgeschlossen.',
      },
      {
        label: 'Macht erkennen',
        title: 'Flotte, Akropolis, Seebund',
        text: 'Unter Perikles baut Athen seine Flotte und die Akropolis aus. Der Attische Seebund finanziert Athens Vorrang in der Ägäis.',
      },
    ],
    quiz: [
      {
        question: 'Wer darf in Athen in der Volksversammlung abstimmen?',
        options: ['Alle Einwohner', 'Freie männliche Bürger', 'Nur die Soldaten Spartas'],
        correctIndex: 1,
        explanation: 'Die Beteiligung ist bemerkenswert, bleibt aber auf freie männliche Bürger begrenzt.',
      },
      {
        question: 'Was baut Athen unter Perikles aus?',
        options: ['Flotte und Akropolis', 'Königsstraße und Pyramide', 'Nur seine Landarmee'],
        correctIndex: 0,
        explanation: 'Flotte und Akropolis stehen für Athens politische und kulturelle Macht.',
      },
    ],
  },
  8: {
    discoveries: [
      {
        label: 'Kräfte vergleichen',
        title: 'Meer gegen Land',
        text: 'Athen beherrscht das Meer, Sparta ist an Land überlegen. Der Krieg zieht sich mit Feldzügen, Seuchen und wechselnden Bündnissen fast drei Jahrzehnte hin.',
      },
      {
        label: 'Entscheidung',
        title: 'Der Hafen wird blockiert',
        text: 'Nach der verheerenden Sizilienexpedition blockiert Spartas Feldherr Lysander zuletzt den Hafen. 404 v. Chr. kapituliert Athen.',
      },
    ],
    quiz: [
      {
        question: 'Welche Stärke hat Athen im Peloponnesischen Krieg?',
        options: ['Die Überlegenheit zur See', 'Die Überlegenheit an Land', 'Die Kontrolle über Persien'],
        correctIndex: 0,
        explanation: 'Athen beherrscht das Meer, während Sparta an Land stärker ist.',
      },
      {
        question: 'Was führt 404 v. Chr. zur Kapitulation Athens?',
        options: ['Alexanders Einmarsch', 'Lysanders Blockade des Hafens', 'Ein Sieg bei Marathon'],
        correctIndex: 1,
        explanation: 'Spartas Feldherr Lysander blockiert den Hafen; Athen kapituliert.',
      },
    ],
  },
  9: {
    discoveries: [
      {
        label: 'Route verfolgen',
        title: 'Vom Mittelmeer bis nach Osten',
        text: 'Alexanders Heer zieht über Issos und Gaugamela nach Babylon und weiter nach Osten. In wenigen Jahren erobert er das Perserreich.',
      },
      {
        label: 'Folge erkennen',
        title: 'Ein Reich ohne Alexander',
        text: 'Alexander stirbt 323 v. Chr. in Babylon, erst 32 Jahre alt. Seine Feldherren teilen das riesige Reich unter sich auf.',
      },
    ],
    quiz: [
      {
        question: 'Wen besiegt Alexander bei der Eroberung des Perserreichs?',
        options: ['Dareios III.', 'Hammurabi', 'Augustus'],
        correctIndex: 0,
        explanation: 'Alexander besiegt den Perserkönig Dareios III.',
      },
      {
        question: 'Was geschieht nach Alexanders Tod?',
        options: ['Das Reich bleibt dauerhaft vereint', 'Seine Feldherren teilen das Reich', 'Rom übernimmt es sofort vollständig'],
        correctIndex: 1,
        explanation: 'Das riesige Reich überlebt Alexander nicht lange und wird unter seinen Feldherren aufgeteilt.',
      },
    ],
  },
  10: {
    discoveries: [
      {
        label: 'Einheit sehen',
        title: 'Sieben Reiche werden eines',
        text: '221 v. Chr. besiegt der König von Qin seine letzten Rivalen und nennt sich Qin Shihuangdi, Erster Kaiser.',
      },
      {
        label: 'Preis der Ordnung',
        title: 'Vereinheitlicht und streng',
        text: 'Schriftzeichen, Maße, Münzen und Verwaltung werden vereinheitlicht; Straßen verbinden das Reich. Zwangsarbeit und harte Strafen sichern diese Ordnung.',
      },
    ],
    quiz: [
      {
        question: 'Was lässt Qin Shihuangdi vereinheitlichen?',
        options: ['Schriftzeichen, Maße, Münzen und Verwaltung', 'Nur die Kleidung', 'Die griechischen Stadtstaaten'],
        correctIndex: 0,
        explanation: 'Die gemeinsamen Standards und die Verwaltung sollen das geeinte Reich zusammenhalten.',
      },
      {
        question: 'Welchen hohen Preis nennt der Sprechertext?',
        options: ['Den Bau einer Flotte', 'Zwangsarbeit und harte Strafen', 'Den Verlust aller Straßen'],
        correctIndex: 1,
        explanation: 'Die neue Einheit wird mit Zwangsarbeit und harten Strafen durchgesetzt.',
      },
    ],
  },
  11: {
    discoveries: [
      {
        label: 'Route verfolgen',
        title: 'Der Weg über die Alpen',
        text: 'Hannibals Heer zieht mit einigen Elefanten von Spanien über die Alpen nach Italien – ein überraschend unbequemer Angriffsweg.',
      },
      {
        label: 'Strategie erkennen',
        title: 'Rom greift anderswo an',
        text: 'Hannibal siegt mehrfach, bezwingt Rom aber nicht. Rom greift Karthagos Machtbasis an; 202 v. Chr. besiegt Scipio Hannibal bei Zama.',
      },
    ],
    quiz: [
      {
        question: 'Welchen Weg nimmt Hannibal nach Italien?',
        options: ['Über die Alpen', 'Über den Indus', 'Durch die Meerenge von Salamis'],
        correctIndex: 0,
        explanation: 'Hannibals Heer zieht von Spanien über die Alpen nach Italien.',
      },
      {
        question: 'Wer besiegt Hannibal 202 v. Chr. bei Zama?',
        options: ['Leonidas', 'Scipio', 'Lysander'],
        correctIndex: 1,
        explanation: 'Scipio besiegt Hannibal bei Zama; Rom wird zur führenden Macht im westlichen Mittelmeer.',
      },
    ],
  },
  12: {
    discoveries: [
      {
        label: 'Grenze überschreiten',
        title: 'Der Rubikon als Entscheidung',
        text: '49 v. Chr. überschreitet Caesar mit seiner Legion den Rubikon, die Grenze zu Italien, und beginnt den Bürgerkrieg gegen Pompeius.',
      },
      {
        label: 'Folge erkennen',
        title: 'Mord rettet die Republik nicht',
        text: 'Caesar wird Diktator auf Lebenszeit und am 15. März 44 v. Chr. ermordet. Doch statt Ruhe folgt der nächste Bürgerkrieg.',
      },
    ],
    quiz: [
      {
        question: 'Was löst Caesars Überschreiten des Rubikon aus?',
        options: ['Den Bürgerkrieg gegen Pompeius', 'Den Bau der Großen Pyramide', 'Die Schlacht bei Salamis'],
        correctIndex: 0,
        explanation: 'Mit dem Grenzübertritt beginnt Caesar den Bürgerkrieg gegen Pompeius.',
      },
      {
        question: 'Was geschieht nach Caesars Ermordung?',
        options: ['Die Republik ist dauerhaft gerettet', 'Der nächste Bürgerkrieg beginnt', 'Caesar wird Augustus'],
        correctIndex: 1,
        explanation: 'Die Ermordung beendet die Machtkämpfe nicht; ein weiterer Bürgerkrieg folgt.',
      },
    ],
  },
  13: {
    discoveries: [
      {
        label: 'Machtbereiche',
        title: 'Zwei Seiten bei Actium',
        text: '31 v. Chr. treffen Octavians Flotte und das Bündnis von Marcus Antonius und Kleopatra bei Actium aufeinander.',
      },
      {
        label: 'Folgen',
        title: 'Ägypten wird römisch',
        text: 'Octavian gewinnt. Antonius und Kleopatra fliehen und sterben im folgenden Jahr; Ägypten wird römische Provinz.',
      },
    ],
    quiz: [
      {
        question: 'Wer gewinnt die Seeschlacht bei Actium?',
        options: ['Octavians Seite', 'Hannibals Seite', 'Das Heer Alexanders'],
        correctIndex: 0,
        explanation: 'Octavians Sieg entscheidet den Machtkampf in der römischen Welt.',
      },
      {
        question: 'Was wird nach der Niederlage von Antonius und Kleopatra aus Ägypten?',
        options: ['Ein griechischer Stadtstaat', 'Eine römische Provinz', 'Teil des Perserreichs'],
        correctIndex: 1,
        explanation: 'Nach ihrem Tod wird Ägypten als Provinz in die römische Herrschaft eingegliedert.',
      },
    ],
  },
  14: {
    discoveries: [
      {
        label: 'Fassade prüfen',
        title: 'Republik auf dem Papier',
        text: 'Ämter, Senat und Republik bleiben formal bestehen. Augustus bündelt in der Praxis jedoch die entscheidende Macht.',
      },
      {
        label: 'Neue Ordnung',
        title: 'Vom Bürgerkrieg zur Kaiserzeit',
        text: 'Augustus kontrolliert Heer, Provinzen und Politik. Nach Jahrzehnten der Bürgerkriege beginnt eine lange Phase relativer Stabilität.',
      },
    ],
    quiz: [
      {
        question: 'Welche Macht bündelt Augustus in der Praxis?',
        options: ['Macht über Heer, Provinzen und Politik', 'Nur die Aufsicht über Tempel', 'Nur den Handel in Ägypten'],
        correctIndex: 0,
        explanation: 'Die entscheidende Macht über Heer, Provinzen und Politik liegt bei Augustus.',
      },
      {
        question: 'Was bleibt unter Augustus auf dem Papier bestehen?',
        options: ['Das Perserreich', 'Republik, Ämter und Senat', 'Der Attische Seebund'],
        correctIndex: 1,
        explanation: 'Die republikanischen Formen bleiben bestehen, obwohl Augustus tatsächlich allein herrscht.',
      },
    ],
  },
  15: {
    discoveries: [
      {
        label: 'Ausbreitung lesen',
        title: 'Punkte und Wege statt Fläche',
        text: 'Missionare wie Paulus gründen Gemeinden rund um das Mittelmeer. Die Karte zeigt deshalb einzelne Orte und Wege, keine geschlossene Glaubensfläche.',
      },
      {
        label: 'Wendepunkt',
        title: 'Freie Religionsausübung',
        text: '313 sichern Konstantin und Licinius Christen freie Religionsausübung zu. Konstantin fördert die Kirche; die Bewegung wird zum Machtfaktor.',
      },
    ],
    quiz: [
      {
        question: 'Wie zeigt die Karte die frühe Ausbreitung des Christentums?',
        options: ['Als geschlossene Fläche', 'Als Punkte und Wege', 'Nur als Grenze Judäas'],
        correctIndex: 1,
        explanation: 'Gemeinden entstehen an einzelnen Orten und werden durch Missionswege verbunden.',
      },
      {
        question: 'Was sichern Konstantin und Licinius Christen 313 zu?',
        options: ['Freie Religionsausübung', 'Die Herrschaft über Rom', 'Die Auflösung aller Gemeinden'],
        correctIndex: 0,
        explanation: 'Die zugesicherte freie Religionsausübung markiert einen wichtigen politischen Wandel.',
      },
    ],
  },
  16: {
    discoveries: [
      {
        label: 'Bewegungen sehen',
        title: 'Grenzen werden durchlässig',
        text: 'Germanische Gruppen ziehen über die Grenzen, gründen eigene Reiche und dienen zugleich in römischen Heeren. Auch die Hunnen unter Attila greifen an.',
      },
      {
        label: 'Das Ende einordnen',
        title: 'Westrom endet, Rom nicht',
        text: '476 setzt Odoaker Romulus Augustulus ab. Das weströmische Kaisertum endet, während das Reich im Osten mit Konstantinopel noch fast tausend Jahre besteht.',
      },
    ],
    quiz: [
      {
        question: 'Wer setzt 476 Romulus Augustulus ab?',
        options: ['Odoaker', 'Attila', 'Konstantin'],
        correctIndex: 0,
        explanation: 'Odoaker setzt den jungen Kaiser ab; damit endet das weströmische Kaisertum.',
      },
      {
        question: 'Was besteht nach dem Ende Westroms weiter?',
        options: ['Das Reich im Osten mit Konstantinopel', 'Das Reich Alexanders', 'Der Peloponnesische Bund'],
        correctIndex: 0,
        explanation: 'Das Oströmische Reich mit Konstantinopel besteht noch fast tausend Jahre weiter.',
      },
    ],
  },
};
