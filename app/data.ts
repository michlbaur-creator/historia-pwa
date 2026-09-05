import { historiaLearning, type HistoriaDiscovery, type HistoriaQuiz } from './learning';

export type HistoriaScene = {
  id: number;
  shortTitle: string;
  title: string;
  date: string;
  place: string;
  people: string;
  imageTitle?: string;
  imageSubtitle?: string;
  duration: number;
  narration: string;
  mainImage: string;
  mapImage: string;
  video?: string;
  videoPlayback?: 'loop' | 'hold';
  audio: string;
  discoveries: [HistoriaDiscovery, HistoriaDiscovery];
  quiz: [HistoriaQuiz, HistoriaQuiz];
};

const asset = '/assets/historia/episode1';

const media = (id: number) => ({
  audio: `${asset}/audio/scene${String(id).padStart(2, '0')}.m4a`,
  ...historiaLearning[id],
});

export const historiaScenes: HistoriaScene[] = [
  {
    id: 1,
    shortTitle: 'Narmer',
    title: 'Narmer und das vereinigte Ägypten',
    date: 'um 3100 v. Chr.',
    place: 'Niltal',
    people: 'Narmer',
    imageTitle: 'Narmer am Nil',
    imageSubtitle: 'Aus zwei Herrschaftsgebieten entsteht ein Staat.',
    duration: 40,
    narration:
      'Unsere Reise beginnt am Nil, um 3100 vor Christus. Auf der Karte liegt Oberägypten im Süden – der Nil fließt eben Richtung Norden – und Unterägypten am Delta. König Narmer steht am Anfang ihrer Vereinigung. Aus zwei Herrschaftsgebieten wird ein mächtiger Staat. Der Pharao kontrolliert Land, Abgaben und Soldaten. So beginnt eine Königsherrschaft, die Ägypten erstaunliche dreitausend Jahre prägen wird.',
    mainImage: `${asset}/main/scene01.jpg`,
    mapImage: `${asset}/maps/scene01.jpg`,
    ...media(1),
  },
  {
    id: 2,
    shortTitle: 'Cheops',
    title: 'Cheops und die Große Pyramide',
    date: 'um 2600 v. Chr.',
    place: 'Gizeh',
    people: 'Cheops',
    duration: 37,
    narration:
      'Fünf Jahrhunderte später führt dich die Karte nach Gizeh, nahe der damaligen Hauptstadt Memphis. Pharao Cheops lässt hier die Große Pyramide errichten – ein Bauprojekt, bei dem ein guter Kalender sicher nicht genügt. Planung, Fachwissen und die Arbeit vieler Menschen machen sie möglich. Nach vielen Jahren ragt das höchste Bauwerk seiner Zeit über dem Niltal auf: Grabmal des Königs und weithin sichtbares Zeichen seiner Macht.',
    mainImage: `${asset}/main/scene02.jpg`,
    mapImage: `${asset}/maps/scene02.jpg`,
    video: `${asset}/videos/scene02.mp4`,
    ...media(2),
  },
  {
    id: 3,
    shortTitle: 'Hammurabi',
    title: 'Hammurabi und das Recht von Babylon',
    date: 'um 1750 v. Chr.',
    place: 'Babylon',
    people: 'Hammurabi',
    duration: 35,
    narration:
      'Jetzt springt die Karte nach Mesopotamien, in das Reich von Babylon um 1750 vor Christus. König Hammurabi lässt Rechtssätze auf einer großen Stele festhalten: zu Besitz, Handel, Familie und Strafen. Gleich sind vor diesem Recht allerdings längst nicht alle; der Rang zählt kräftig mit. Hammurabi hat die Gesetze nicht erfunden. Doch seine öffentlich sichtbare Sammlung wird zu einer der bekanntesten der Antike.',
    mainImage: `${asset}/main/scene03.jpg`,
    mapImage: `${asset}/maps/scene03.jpg`,
    ...media(3),
  },
  {
    id: 4,
    shortTitle: 'Kadesch',
    title: 'Ramses II. in der Schlacht bei Kadesch',
    date: '1274 v. Chr.',
    place: 'Kadesch am Orontes',
    people: 'Ramses II. und Muwatalli II.',
    duration: 38,
    narration:
      '1274 vor Christus ziehen Ramses der Zweite und Hethiterkönig Muwatalli bei Kadesch gegeneinander. Die Karte zeigt dir ihre Marschrouten. Ramses gerät mit seinem Heer beinahe in eine Falle, schlägt sich aber frei. Einen klaren Sieger gibt es nicht – zu Hause lässt er sich trotzdem entsprechend feiern. Jahre später schließen beide Mächte einen Friedensvertrag. Großes Schlachtengetöse, am Ende also doch Diplomatie.',
    mainImage: `${asset}/main/scene04.jpg`,
    mapImage: `${asset}/maps/scene04.jpg`,
    video: `${asset}/videos/scene04.mp4`,
    ...media(4),
  },
  {
    id: 5,
    shortTitle: 'Persien',
    title: 'Kyros und Dareios formen das Perserreich',
    date: '6. Jahrhundert v. Chr.',
    place: 'Vorderer Orient',
    people: 'Kyros II. und Dareios I.',
    duration: 36,
    narration:
      'Im 6. Jahrhundert vor Christus wächst im Vorderen Orient ein Reich von erstaunlicher Größe. Kyros der Zweite erobert Babylon; seine Nachfolger erweitern das Perserreich weiter. Dareios der Erste teilt es in Provinzen, lässt Straßen sichern und Beamte berichten. Auf der Karte zieht sich die Königsstraße von Susa bis nach Kleinasien. Wer so weit herrscht, braucht eben mehr als eine Krone – vor allem Organisation.',
    mainImage: `${asset}/main/scene05.jpg`,
    mapImage: `${asset}/maps/scene05.jpg`,
    ...media(5),
  },
  {
    id: 6,
    shortTitle: 'Salamis',
    title: 'Marathon, Thermopylen und Salamis',
    date: '490–480 v. Chr.',
    place: 'Griechenland und Ägäis',
    people: 'Dareios I., Xerxes I., Leonidas und Themistokles',
    duration: 40,
    narration:
      'Nun prallen Persien und die griechischen Stadtstaaten aufeinander. 490 vor Christus scheitert Dareios Heer bei Marathon. Zehn Jahre später führt Xerxes eine neue Invasion: Leonidas fällt mit seinen Spartanern an den Thermopylen, Athen wird besetzt. Doch bei Salamis lockt Themistokles die persische Flotte in eine enge Meerenge. Dort zählt Größe plötzlich weniger als Beweglichkeit – und der Feldzug kippt zugunsten der Griechen.',
    mainImage: `${asset}/main/scene06.jpg`,
    mapImage: `${asset}/maps/scene06.jpg`,
    video: `${asset}/videos/scene06.mp4`,
    ...media(6),
  },
  {
    id: 7,
    shortTitle: 'Perikles',
    title: 'Athen unter Perikles',
    date: 'um 450 v. Chr.',
    place: 'Athen und Ägäis',
    people: 'Perikles',
    duration: 36,
    narration:
      'Um 450 vor Christus ist Athen auf dem Höhepunkt seiner Macht. Unter Perikles baut die Stadt ihre Flotte und die Akropolis aus. In der Volksversammlung stimmen freie männliche Bürger über Krieg, Geld und Politik ab. Das ist bemerkenswert demokratisch – allerdings nur für einen begrenzten Teil der Bevölkerung. Frauen, Sklaven und Zugewanderte bleiben ausgeschlossen, während der attische Seebund Athens Vorrang finanziert.',
    mainImage: `${asset}/main/scene07.jpg`,
    mapImage: `${asset}/maps/scene07.jpg`,
    ...media(7),
  },
  {
    id: 8,
    shortTitle: 'Sparta',
    title: 'Athen gegen Sparta',
    date: '431–404 v. Chr.',
    place: 'Griechenland',
    people: 'Perikles, Lysander und die Bündnispartner',
    duration: 46,
    narration:
      '431 vor Christus beginnt der Peloponnesische Krieg. Auf der Karte stehen sich der von Athen geführte Seebund und Spartas Bündnis gegenüber. Athen beherrscht das Meer, Sparta ist an Land überlegen. Fast drei Jahrzehnte folgen Feldzüge, Seuchen, wechselnde Bündnisse und eine verheerende Expedition nach Sizilien. Zuletzt blockiert Spartas Feldherr Lysander den Hafen. 404 kapituliert Athen. Sieger ist Sparta – erschöpft sind am Ende allerdings fast alle.',
    mainImage: `${asset}/main/scene08.jpg`,
    mapImage: `${asset}/maps/scene08.jpg`,
    ...media(8),
  },
  {
    id: 9,
    shortTitle: 'Alexander',
    title: 'Alexander erobert das Perserreich',
    date: '334–323 v. Chr.',
    place: 'Vom Mittelmeer bis zum Indus',
    people: 'Alexander der Große und Dareios III.',
    duration: 49,
    narration:
      '334 vor Christus setzt Alexander von Makedonien nach Asien über. Die Karte folgt seinem Heer über Issos und Gaugamela bis nach Babylon und weiter nach Osten. Alexander besiegt Dareios den Dritten und erobert das Perserreich in wenigen Jahren. Doch 323 stirbt er in Babylon, erst 32 Jahre alt. Sein riesiges Reich überlebt ihn nicht lange: Alexanders Feldherren teilen es unter sich auf.',
    mainImage: `${asset}/main/scene09.jpg`,
    mapImage: `${asset}/maps/scene09.jpg`,
    video: `${asset}/videos/scene09.mp4`,
    videoPlayback: 'hold',
    ...media(9),
  },
  {
    id: 10,
    shortTitle: 'Qin',
    title: 'Qin Shihuangdi vereinigt China',
    date: '221 v. Chr.',
    place: 'China',
    people: 'Qin Shihuangdi',
    duration: 39,
    narration:
      '221 vor Christus besiegt der König von Qin seine letzten Rivalen und nennt sich Qin Shihuangdi, Erster Kaiser. Die Karte zeigt, wie sieben Reiche unter einer Herrschaft zusammenrücken. Schriftzeichen, Maße, Münzen und Verwaltung werden vereinheitlicht; Straßen verbinden das Reich. Der Preis ist hoch: Zwangsarbeit und harte Strafen sichern die Ordnung. Einheit gibt es nun – gemütlich wird sie nicht.',
    mainImage: `${asset}/main/scene10.jpg`,
    mapImage: `${asset}/maps/scene10.jpg`,
    ...media(10),
  },
  {
    id: 11,
    shortTitle: 'Hannibal',
    title: 'Hannibal gegen Rom',
    date: '218–202 v. Chr.',
    place: 'Westliches Mittelmeer',
    people: 'Hannibal und Scipio Africanus',
    duration: 58,
    narration:
      '218 vor Christus nimmt Hannibal den überraschend unbequemen Weg nach Italien: über die Alpen. Auf der Karte ziehen sein Heer und einige Elefanten von Spanien über die Alpen nach Italien. Er schlägt Rom mehrfach, kann die Stadt aber nicht bezwingen. Rom greift stattdessen Karthagos Machtbasis an. 202 besiegt Scipio Hannibal bei Zama. Nach drei Punischen Kriegen ist Karthago zerstört – und Rom beherrscht das westliche Mittelmeer.',
    mainImage: `${asset}/main/scene11.jpg`,
    mapImage: `${asset}/maps/scene11.jpg`,
    ...media(11),
  },
  {
    id: 12,
    shortTitle: 'Caesar',
    title: 'Caesar überschreitet den Rubikon',
    date: '49–44 v. Chr.',
    place: 'Rom und Mittelmeerraum',
    people: 'Gaius Julius Caesar, Pompeius und der Senat',
    duration: 39,
    narration:
      '49 vor Christus steht Caesar mit seiner Legion am Rubikon, der Grenze zu Italien. Er überschreitet den Fluss und beginnt den Bürgerkrieg gegen Pompeius. Caesar siegt und lässt sich zum Diktator auf Lebenszeit ernennen. Vielen Senatoren wird das eindeutig zu viel. Am 15. März 44 vor Christus ermorden sie ihn bei einer Senatssitzung. Die Republik ist damit keineswegs gerettet – der nächste Bürgerkrieg wartet schon.',
    mainImage: `${asset}/main/scene12.jpg`,
    mapImage: `${asset}/maps/scene12.jpg`,
    ...media(12),
  },
  {
    id: 13,
    shortTitle: 'Kleopatra',
    title: 'Kleopatra und der Kampf um Rom',
    date: '31–30 v. Chr.',
    place: 'Actium und Alexandria',
    people: 'Kleopatra VII., Marcus Antonius und Octavian',
    duration: 38,
    narration:
      '31 vor Christus treffen bei Actium die Flotten Octavians und des Bündnisses von Marcus Antonius und Kleopatra aufeinander. Die Karte zeigt ihre geteilten Machtbereiche im östlichen Mittelmeer. Octavians Seite gewinnt; Antonius und Kleopatra fliehen nach Ägypten und sterben im folgenden Jahr. Ägypten wird römische Provinz. Octavian beherrscht nun die römische Welt – und aus dem jungen Erben Caesars wird bald Augustus.',
    mainImage: `${asset}/main/scene13.jpg`,
    mapImage: `${asset}/maps/scene13.jpg`,
    ...media(13),
  },
  {
    id: 14,
    shortTitle: 'Augustus',
    title: 'Augustus gründet die Kaiserzeit',
    date: '27 v. Chr.–14 n. Chr.',
    place: 'Römisches Reich',
    people: 'Augustus',
    duration: 39,
    narration:
      '27 vor Christus verleiht der Senat Octavian den Ehrennamen Augustus. Auf dem Papier bleiben Republik, Ämter und Senat bestehen. In der Praxis bündelt Augustus jedoch die entscheidende Macht über Heer, Provinzen und Politik. Das ist Alleinherrschaft mit republikanischer Verpackung – geschickt gemacht. Nach Jahrzehnten der Bürgerkriege beginnt eine lange Phase relativer Stabilität, und Rom tritt in die Kaiserzeit ein.',
    mainImage: `${asset}/main/scene14.jpg`,
    mapImage: `${asset}/maps/scene14.jpg`,
    ...media(14),
  },
  {
    id: 15,
    shortTitle: 'Christentum',
    title: 'Vom Wirken Jesu zu Kaiser Konstantin',
    date: '1.–frühes 4. Jahrhundert',
    place: 'Judäa und Römisches Reich',
    people: 'Jesus, Paulus und Konstantin',
    duration: 53,
    narration:
      'Im 1. Jahrhundert wirkt Jesus in der römischen Provinz Judäa und wird gekreuzigt. Seine Anhänger verkünden seine Auferstehung. Missionare wie Paulus gründen Gemeinden rund um das Mittelmeer. Die Karte zeigt Punkte und Wege, keine geschlossene Glaubensfläche. Trotz zeitweiser Verfolgungen wächst das Christentum. 313 sichern Konstantin und Licinius Christen freie Religionsausübung zu. Konstantin fördert die Kirche – aus einer kleinen Bewegung ist nun ein Machtfaktor geworden.',
    mainImage: `${asset}/main/scene15.jpg`,
    mapImage: `${asset}/maps/scene15.jpg`,
    ...media(15),
  },
  {
    id: 16,
    shortTitle: 'Westrom',
    title: 'Das Ende des Weströmischen Reiches',
    date: '395–476',
    place: 'Westrom',
    people: 'Odoaker und Romulus Augustulus',
    duration: 43,
    narration:
      'Im 5. Jahrhundert verliert Westrom die Kontrolle. Germanische Gruppen ziehen über die Grenzen, gründen eigene Reiche und dienen zugleich in römischen Heeren. Unter Attila greifen auch die Hunnen an. Kaiser wechseln, Feldherren ringen um Macht, Steuern und Soldaten fehlen. 476 setzt Odoaker den jungen Romulus Augustulus ab. Das Weströmische Kaisertum endet – Rom selbst natürlich nicht. Im Osten besteht das Reich mit Konstantinopel noch fast tausend Jahre.',
    mainImage: `${asset}/main/scene16.jpg`,
    mapImage: `${asset}/maps/scene16.jpg`,
    ...media(16),
  },
];
