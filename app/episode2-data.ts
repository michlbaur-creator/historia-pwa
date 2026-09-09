import type { HistoriaScene } from './data';

const episode2Asset = '/assets/historia/episode2';

const secondaryMedia: Record<
  number,
  Pick<
    HistoriaScene,
    'secondaryImage' | 'secondaryImageTitle' | 'secondaryImageSubtitle'
  >
> = {
  1: {
    secondaryImage: `${episode2Asset}/secondary/scene01.jpg`,
    secondaryImageTitle: 'Damaskus als Machtzentrum',
    secondaryImageSubtitle:
      'Verwaltung und Boten verbinden das weit gespannte Kalifenreich.',
  },
  2: {
    secondaryImage: `${episode2Asset}/secondary/scene02.jpg`,
    secondaryImageTitle: 'Aachen als Herrschaftszentrum',
    secondaryImageSubtitle:
      'Winterpfalz, Hof und Verwaltung bündeln politische Macht.',
  },
  4: {
    secondaryImage: `${episode2Asset}/secondary/scene04.jpg`,
    secondaryImageTitle: 'Kaiserkrönung in Rom',
    secondaryImageSubtitle:
      'Geistliche und weltliche Macht verbinden sich in einem politischen Ritual.',
  },
  7: {
    secondaryImage: `${episode2Asset}/secondary/scene07.jpg`,
    secondaryImageTitle: 'Nach der Pest',
    secondaryImageSubtitle:
      'Arbeitskräftemangel verändert Löhne und alte Abhängigkeiten.',
  },
  8: {
    secondaryImage: `${episode2Asset}/secondary/scene08.jpg`,
    secondaryImageTitle: 'Die Krönung in Reims',
    secondaryImageSubtitle:
      'Das öffentliche Ritual stärkt die Stellung Karls VII.',
  },
  10: {
    secondaryImage: `${episode2Asset}/secondary/scene10.jpg`,
    secondaryImageTitle: 'Tenochtitlan vor der Eroberung',
    secondaryImageSubtitle:
      'Die Spanier treffen auf eine große, dicht bewohnte Metropole.',
  },
  12: {
    secondaryImage: `${episode2Asset}/secondary/scene12.jpg`,
    secondaryImageTitle: 'Verhandeln statt kämpfen',
    secondaryImageSubtitle:
      'In Münster und Osnabrück entsteht der Westfälische Friede.',
  },
  15: {
    secondaryImage: `${episode2Asset}/secondary/scene15.jpg`,
    secondaryImageTitle: 'Französische Hilfe vor Yorktown',
    secondaryImageSubtitle:
      'Flotte, Soldaten und Nachschub entscheiden den Krieg mit.',
  },
};

const videoMedia: Record<
  number,
  Pick<HistoriaScene, 'video' | 'videoPlayback'>
> = {
  9: {
    video: `${episode2Asset}/Videos/S9.mp4`,
    videoPlayback: 'hold',
  },
  11: {
    video: `${episode2Asset}/Videos/S11.mp4`,
    videoPlayback: 'hold',
  },
};

const episode2Scenes: HistoriaScene[] = [
  {
    id: 1,
    shortTitle: 'Kalifenreich',
    title: 'Mohammed und das Kalifenreich',
    date: '622–750',
    place: 'Arabien, Vorderer Orient und Mittelmeerraum',
    people: 'Mohammed und die ersten Kalifen',
    imageTitle: 'Von Medina in drei Kontinente',
    imageSubtitle: 'Aus einer Glaubensgemeinschaft wird ein Großreich.',
    duration: 31,
    narration:
      '622 zieht Mohammed von Mekka nach Medina. Diese Hidschra beginnt die islamische Zeitrechnung. In Medina entsteht eine neue religiöse und politische Gemeinschaft. Nach Mohammeds Tod 632 einigen Kalifen große Teile Arabiens und erobern Syrien, Ägypten, Persien, Nordafrika und Spanien. Auf der Karte wächst das Reich erstaunlich schnell – regieren lässt sich so viel Gebiet allerdings nicht mit einem einzigen Kamelritt.',
    mapConcept:
      'Exakte physische Karte von der Iberischen Halbinsel bis zum Indus nach dem Prinzip der freigegebenen Karten. Punkt 1 zeigt Medina und die Hidschra 622, Punkt 2 Damaskus als Machtzentrum der Umayyaden. Die Ausbreitungsrichtungen sind als zeitlich getrennte, bewusst vereinfachte Pfeile dargestellt; keine scharf behaupteten Grenzen.',
    mapDetails: [
      '1 · Medina · Hidschra 622',
      '2 · Damaskus · Machtzentrum ab 661',
      'Ausbreitung unter den ersten Kalifen',
      'West- und Ostexpansion unter den Umayyaden',
    ],
    imageConcept:
      'Eine frühe Stadt- und Verwaltungsszene in Medina; Mohammed selbst wird aus Respekt nicht bildlich dargestellt. Boten und Karten deuten die spätere Ausbreitung an.',
    discoveries: [
      {
        label: 'Zeitpunkt verstehen',
        title: 'Medina und die Hidschra',
        text: 'Die Auswanderung Mohammeds von Mekka nach Medina heißt Hidschra. Sie markiert den Beginn der islamischen Zeitrechnung, nicht Mohammeds Geburt.',
      },
      {
        label: 'Ausbreitung verfolgen',
        title: 'Damaskus als Machtzentrum',
        text: 'Unter den Umayyaden wurde Damaskus zum politischen Zentrum. Von dort regierten Kalifen ein Reich, das sich in wenigen Generationen vom Atlantik bis zum Indus erstreckte.',
      },
    ],
    quiz: [
      {
        question: 'Welches Ereignis beginnt die islamische Zeitrechnung?',
        options: [
          'Die Hidschra nach Medina',
          'Die Eroberung Konstantinopels',
          'Die Krönung Karls des Großen',
        ],
        correctIndex: 0,
        explanation:
          'Die Hidschra von Mekka nach Medina im Jahr 622 ist der Ausgangspunkt der islamischen Zeitrechnung.',
      },
      {
        question: 'Was entstand unter Mohammeds Nachfolgern?',
        options: [
          'Nur eine Handelsstadt',
          'Ein weitreichendes Kalifenreich',
          'Das Heilige Römische Reich',
        ],
        correctIndex: 1,
        explanation:
          'Die ersten Kalifen verbanden religiöse Führung mit politischer Herrschaft und erweiterten das Reich stark.',
      },
    ],
  },
  {
    id: 2,
    shortTitle: 'Karl',
    title: 'Karl der Große wird Kaiser',
    date: '800',
    place: 'Rom und Frankenreich',
    people: 'Karl der Große und Papst Leo III.',
    imageTitle: 'Kaiserkrönung in Rom',
    imageSubtitle: 'Der Frankenkönig erhält eine neue, alte Würde.',
    duration: 29,
    narration:
      'Am Weihnachtstag des Jahres 800 krönt Papst Leo der Dritte den Frankenkönig Karl in Rom zum Kaiser. Karl herrscht bereits über große Teile West- und Mitteleuropas. Grafen, Bischöfe und königliche Boten halten das Reich zusammen; Klöster und Hofschulen fördern Bildung und Schrift. Nach Karls Tod wird sein Reich geteilt. Die Kaiseridee bleibt jedoch – politische Wiederverwertung kann sehr langlebig sein.',
    mapConcept:
      'Exakte physische Europakarte nach dem Prinzip von Szene 4. Die ungefähre Ausdehnung von Karls Reich ist weich markiert; Punkt 1 zeigt Aachen als politischen Mittelpunkt, Punkt 2 Rom und die Kaiserkrönung 800. Keine Reiseroute.',
    mapDetails: [
      'Ungefähres Frankenreich um 800',
      '1 · Aachen · Winterpfalz und politisches Zentrum',
      '2 · Rom · Kaiserkrönung 800',
    ],
    imageConcept:
      'Die Kaiserkrönung in Alt-St. Peter: Karl und Leo III. im Mittelpunkt, umgeben von Geistlichen und fränkischen Großen, feierlich, aber nicht überladen.',
    discoveries: [
      {
        label: 'Zentrum des Reiches',
        title: 'Aachen als Winterpfalz',
        text: 'Ab 794/795 nutzte Karl Aachen nahezu regelmäßig als Winterpfalz und machte die Stadt zum politischen Zentrum seines Reiches.',
      },
      {
        label: 'Macht verbinden',
        title: 'König und Papst',
        text: 'Die Krönung verbindet Karls militärisch errungene Herrschaft mit der religiösen Autorität des Papstes und belebt die weströmische Kaiseridee neu.',
      },
    ],
    quiz: [
      {
        question: 'Wer krönt Karl im Jahr 800 zum Kaiser?',
        options: ['Papst Leo III.', 'Sultan Mehmed II.', 'Otto I.'],
        correctIndex: 0,
        explanation: 'Papst Leo III. krönt Karl am Weihnachtstag 800 in Rom.',
      },
      {
        question: 'Was geschieht nach Karls Tod mit seinem Reich?',
        options: [
          'Es wird geteilt',
          'Es erobert China',
          'Es bleibt unverändert bis 1815',
        ],
        correctIndex: 0,
        explanation:
          'Karls Nachfolger teilen das Reich; die erneuerte Kaiseridee wirkt trotzdem weiter.',
      },
    ],
  },
  {
    id: 3,
    shortTitle: 'Wikinger',
    title: 'Die weiten Wege der Wikinger',
    date: '793–1066',
    place: 'Nordatlantik, Nordsee und Osteuropa',
    people: 'Wikingerfahrer und Knut der Große',
    imageTitle: 'Zwischen Überfall und Handel',
    imageSubtitle: 'Nordische Schiffe verbinden erstaunlich ferne Küsten.',
    duration: 31,
    narration:
      '793 überfallen nordische Seefahrer das Kloster Lindisfarne. Es folgen weitere Angriffe – aber die Wikinger rauben nicht nur. Sie handeln, siedeln und gründen Herrschaften. Ihre Schiffe erreichen Island, Grönland und Nordamerika; über russische Flüsse gelangen Händler bis Byzanz. Im 11. Jahrhundert regiert Knut der Große zeitweise England, Dänemark und Norwegen. Aus gefürchteten Fremden werden vielerorts Nachbarn mit ziemlich langen Reisewegen.',
    mapConcept:
      'Exakte physische Karte des Nordatlantiks und Europas nach dem Prinzip der freigegebenen Karten. Punkt 1 zeigt Lindisfarne und den Überfall 793, Punkt 2 die nordische Siedlung L’Anse aux Meadows um 1000. Zeitlich beschriftete Wege führen von Skandinavien westwärts über Island und Grönland bis Nordamerika sowie ostwärts über die Flüsse Osteuropas bis Byzanz.',
    mapDetails: [
      '1 · Lindisfarne · Überfall 793',
      '2 · L’Anse aux Meadows · nordische Siedlung um 1000',
      'Westweg über Island und Grönland',
      'Ostweg über die Flüsse bis Byzanz',
    ],
    imageConcept:
      'Ein nordisches Langschiff erreicht einen lebhaften Handelsplatz. Waren, Werkzeuge und Siedler zeigen mehr als nur den bekannten Überfall.',
    discoveries: [
      {
        label: 'Auftakt',
        title: 'Der Überfall auf Lindisfarne',
        text: '793 greifen nordische Seefahrer das Kloster Lindisfarne vor der englischen Küste an. Der Überfall gilt häufig als Beginn der Wikingerzeit, obwohl Kontakte zwischen Skandinavien und anderen Regionen schon vorher bestanden.',
      },
      {
        label: 'Archäologie',
        title: 'Nordamerika um das Jahr 1000',
        text: 'In L’Anse aux Meadows auf Neufundland belegen Gebäudereste eine nordische Siedlung um das Jahr 1000. Damit ist sicher: Europäische Seefahrer erreichten Nordamerika lange vor Kolumbus.',
      },
    ],
    quiz: [
      {
        question: 'Was taten Wikinger außer zu plündern?',
        options: [
          'Sie handelten und siedelten',
          'Sie bauten die Pyramiden',
          'Sie gründeten das Kalifenreich',
        ],
        correctIndex: 0,
        explanation:
          'Handel, Siedlung und Herrschaft gehörten ebenso zur Wikingerzeit wie Überfälle.',
      },
      {
        question: 'Welche Räume verbanden ihre Routen?',
        options: [
          'Nur Skandinavien und England',
          'Atlantik und Osteuropa',
          'Nur das Mittelmeer',
        ],
        correctIndex: 1,
        explanation:
          'Ihre Wege reichten westwärts über den Atlantik und ostwärts über Flüsse bis nach Byzanz.',
      },
    ],
  },
  {
    id: 4,
    shortTitle: 'Otto I.',
    title: 'Otto I. und das neue Kaiserreich',
    date: '962',
    place: 'Ostfrankenreich und Rom',
    people: 'Otto I. und Papst Johannes XII.',
    imageTitle: 'Ein Kaiser reist nach Rom',
    imageSubtitle: 'Aus königlicher Macht wird eine dauerhafte Reichsidee.',
    duration: 28,
    narration:
      '955 besiegt König Otto der Erste ungarische Reiter auf dem Lechfeld. Der Sieg stärkt seine Stellung im Ostfrankenreich. Sieben Jahre später krönt ihn Papst Johannes der Zwölf in Rom zum Kaiser. Otto stützt sich auf Herzöge und besonders auf Bischöfe, die zugleich wichtige Reichsaufgaben übernehmen. Aus diesem Herrschaftsverband entwickelt sich später das Heilige Römische Reich – mit vielen Fürsten und entsprechend vielen Meinungen.',
    mapConcept:
      'Exakte physische Europakarte im Stil von Episode 1. Die ungefähre Ausdehnung von Ottos Reich ist weich markiert; Punkt 1 zeigt das Lechfeld 955, Punkt 2 Rom und die Kaiserkrönung 962. Keine Reiseroute.',
    mapDetails: [
      'Ungefähres Reich Ottos I. um 962',
      '1 · Lechfeld 955',
      '2 · Rom 962',
    ],
    imageConcept:
      'Otto I. bei der Kaiserkrönung in Rom; Bischöfe und weltliche Große zeigen die beiden Stützen seiner Herrschaft.',
    discoveries: [
      {
        label: 'Vorgeschichte',
        title: 'Der Sieg auf dem Lechfeld',
        text: 'Ottos Sieg 955 beendet die großen ungarischen Raubzüge nach Westen und stärkt seinen Anspruch auf die Kaiserwürde.',
      },
      {
        label: 'Kaiseridee',
        title: 'Die Kaiserkrönung in Rom',
        text: 'Am 2. Februar 962 krönt Papst Johannes XII. Otto in Rom zum Kaiser. Damit verbindet Otto sein ostfränkisches Königtum dauerhaft mit der römischen Kaiseridee – ein wichtiger Ausgangspunkt des späteren Heiligen Römischen Reiches.',
      },
    ],
    quiz: [
      {
        question: 'Welcher Sieg stärkt Otto I. vor seiner Kaiserkrönung?',
        options: [
          'Der Sieg auf dem Lechfeld',
          'Der Sieg bei Waterloo',
          'Die Einnahme Jerusalems',
        ],
        correctIndex: 0,
        explanation:
          'Der Lechfeld-Sieg von 955 stärkt Ottos Königtum erheblich.',
      },
      {
        question: 'Auf wen stützt Otto seine Herrschaft besonders?',
        options: [
          'Nur auf Bauern',
          'Auf Herzöge und Bischöfe',
          'Auf mongolische Reiter',
        ],
        correctIndex: 1,
        explanation:
          'Herzöge und Bischöfe waren wichtige Träger der ottonischen Herrschaft.',
      },
    ],
  },
  {
    id: 5,
    shortTitle: 'Kreuzzüge',
    title: 'Kreuzfahrer ziehen nach Jerusalem',
    date: '1096–1291',
    place: 'Europa und östlicher Mittelmeerraum',
    people: 'Urban II., Saladin und Richard Löwenherz',
    imageTitle: 'Kampf um Jerusalem',
    imageSubtitle:
      'Religiöse Versprechen und Machtpolitik treiben lange Kriege an.',
    duration: 32,
    narration:
      '1095 ruft Papst Urban der Zweite zum Kreuzzug nach Jerusalem auf. Im folgenden Jahr ziehen Heere Richtung Osten; 1099 erobern Kreuzfahrer die Stadt und richten ein Blutbad an. Sie gründen mehrere Herrschaften. 1187 gewinnt Sultan Saladin Jerusalem zurück. Richard Löwenherz führt daraufhin den Dritten Kreuzzug, ohne die Stadt zu erobern. 1291 fällt der letzte große Kreuzfahrerstützpunkt. Zwei Jahrhunderte Krieg – eindeutig keine kurze Pilgerfahrt.',
    mapConcept:
      'Exakte physische Karte Europas und des östlichen Mittelmeerraums nach dem Prinzip von Szene 4. Punkt 1 zeigt Clermont und den Aufruf 1095, Punkt 2 Jerusalem und die Eroberung 1099. Geprüfte Hauptrouten des Ersten Kreuzzugs führen getrennt über Ungarn und Italien, treffen am Bosporus zusammen und verlaufen durch Anatolien und Syrien nach Jerusalem.',
    mapDetails: [
      '1 · Clermont · Aufruf 1095',
      '2 · Jerusalem · Eroberung 1099',
      'Hauptroute über Ungarn',
      'Hauptroute über Italien',
      'Gemeinsamer Zug durch Anatolien und Syrien',
    ],
    imageConcept:
      'Eine angespannte Begegnung vor Jerusalem mit christlichen und muslimischen Heeren; keine triumphale Siegerpose und keine drastische Gewalt.',
    discoveries: [
      {
        label: 'Ausgangspunkt',
        title: 'Der Aufruf in Clermont',
        text: '1095 ruft Papst Urban II. in Clermont zum bewaffneten Zug nach Jerusalem auf. Religiöse Ziele verbinden sich dabei mit politischen Interessen, Beutehoffnungen und persönlichem Ehrgeiz.',
      },
      {
        label: 'Folgen sehen',
        title: 'Jerusalem wechselt die Herrschaft',
        text: '1099 erobern Kreuzfahrer Jerusalem und richten ein Blutbad an. In den Kreuzzügen werden Muslime, Juden und auch Christen anderer Traditionen Opfer von Gewalt. 1187 gewinnt Saladin die Stadt zurück.',
      },
    ],
    quiz: [
      {
        question: 'Wer ruft 1095 zum Kreuzzug auf?',
        options: ['Papst Urban II.', 'Dschingis Khan', 'Ludwig XIV.'],
        correctIndex: 0,
        explanation:
          'Papst Urban II. ruft 1095 in Clermont zum bewaffneten Zug nach Jerusalem auf.',
      },
      {
        question: 'Wer gewinnt Jerusalem 1187 zurück?',
        options: ['Richard Löwenherz', 'Saladin', 'Karl der Große'],
        correctIndex: 1,
        explanation:
          'Sultan Saladin besiegt die Kreuzfahrer und gewinnt Jerusalem 1187 zurück.',
      },
    ],
  },
  {
    id: 6,
    shortTitle: 'Mongolen',
    title: 'Dschingis Khan einigt die Mongolen',
    date: '1206–1227',
    place: 'Mongolei und Eurasien',
    people: 'Dschingis Khan und seine Nachfolger',
    imageTitle: 'Das Reich der schnellen Reiter',
    imageSubtitle: 'Strenge Organisation trägt Eroberungen über Eurasien.',
    duration: 30,
    narration:
      '1206 wird Temüdschin zum Dschingis Khan ausgerufen. Er einigt mongolische Gruppen, ordnet das Heer in feste Einheiten und setzt auf bewegliche Reiter, Kundschafter und klare Befehle. Seine Feldzüge erobern große Teile Zentralasiens und Nordchinas; Städte, die Widerstand leisten, werden oft brutal zerstört. Nach seinem Tod erweitern seine Nachfolger das Reich weiter. Die Karte wird riesig – der Preis für viele Eroberte ebenfalls.',
    mapConcept:
      'Natürliche Eurasienkarte nach dem freigegebenen Muster der vorangegangenen Szenen. Die ungefähre Ausdehnung von Dschingis Khans Reich um 1227 ist weich markiert; Punkt 1 zeigt den Kuriltai am Onon 1206, Punkt 2 Zhongdu und die Einnahme 1215. Zwei zurückhaltende Feldzugspfeile führen nach Nordchina und Zentralasien.',
    mapDetails: [
      'Ungefähres Reich Dschingis Khans um 1227',
      '1 · Onon · Erhebung zum Großkhan 1206',
      '2 · Zhongdu · Einnahme 1215',
      'Feldzugsrichtungen nach Nordchina und Zentralasien',
    ],
    imageConcept:
      'Dschingis Khan vor einem beweglichen Reiterheer in offener Steppe; Boten, Ersatzpferde und geordnete Verbände betonen Organisation statt Heldenkult.',
    discoveries: [
      {
        label: 'Ausgangspunkt',
        title: 'Am Onon zum Großkhan',
        text: '1206 erhebt ein Kuriltai an den Quellen des Onon Temüdschin zum Dschingis Khan. Die geeinten Verbände organisiert er in festen Heeresabteilungen; Kundschafter, Signalgebung und mehrere Pferde je Kämpfer erhöhen ihre Beweglichkeit.',
      },
      {
        label: 'Eroberung',
        title: 'Zhongdu fällt 1215',
        text: 'Nach langen Kämpfen gegen die Jin-Dynastie nehmen mongolische Truppen 1215 deren Hauptstadt Zhongdu, das heutige Beijing, ein. Die Eroberung zeigt: Das bewegliche Reiterheer kann auch befestigte Städte bezwingen – für die Bevölkerung mit verheerenden Folgen.',
      },
    ],
    quiz: [
      {
        question: 'Wie hieß Dschingis Khan ursprünglich?',
        options: ['Temüdschin', 'Mehmed', 'Galilei'],
        correctIndex: 0,
        explanation: 'Temüdschin erhielt 1206 den Titel Dschingis Khan.',
      },
      {
        question: 'Was machte das mongolische Heer besonders wirksam?',
        options: [
          'Nur größere Burgen',
          'Beweglichkeit und klare Organisation',
          'Eine starke Mittelmeerflotte',
        ],
        correctIndex: 1,
        explanation:
          'Schnelle Reiterverbände, Aufklärung und klare Befehle ermöglichten weiträumige Feldzüge.',
      },
    ],
  },
  {
    id: 7,
    shortTitle: 'Pest',
    title: 'Der Schwarze Tod erreicht Europa',
    date: '1347–1353',
    place: 'Europa, Mittelmeerraum und Asien',
    people: 'Händler, Herrscher und Stadtbevölkerungen',
    imageTitle: 'Eine Krankheit reist mit',
    imageSubtitle: 'Handelswege verbinden Kontinente – auch für Erreger.',
    duration: 31,
    narration:
      'Ab 1347 erreicht die Pest über Handelswege europäische Häfen. Das Bakterium Yersinia pestis verbreitet sich schnell; Flöhe, Nagetiere und wahrscheinlich weitere Übertragungswege spielen eine Rolle. In wenigen Jahren stirbt ein großer Teil der Bevölkerung Europas, auch Nordafrika und Asien sind schwer betroffen. Arbeit wird knapp, Löhne und soziale Beziehungen verändern sich. Die eng vernetzte Welt zeigt ihre Schattenseite – ohne auch nur einen Flugplan zu besitzen.',
    mapConcept:
      'Natürliche Karte von Europa und dem Mittelmeerraum nach dem freigegebenen Muster. Punkt 1 zeigt Kaffa am Schwarzen Meer 1346, Punkt 2 Messina 1347. Farbige Pfeile verfolgen die Ausbreitung entlang der See- und Handelswege, ohne eine scheinpräzise Fläche zu behaupten.',
    mapDetails: [
      '1 · Kaffa · Pest im Schwarzmeerraum 1346',
      '2 · Messina · Ankunft auf Sizilien 1347',
      'Ausbreitung entlang der See- und Handelswege',
    ],
    imageConcept:
      'Ein mittelalterlicher Hafen mit ankommendem Handelsschiff und besorgten Menschen; Krankheit wird zurückhaltend und ohne drastische Leidensbilder gezeigt.',
    discoveries: [
      {
        label: 'Ausgangspunkt',
        title: 'Kaffa am Schwarzen Meer',
        text: '1346 erfasst die Pest das Umfeld der genuesischen Handelsstadt Kaffa auf der Krim. Die lange erzählte Geschichte von verseuchten Leichen als Waffe ist umstritten; sicher ist, dass sich die Krankheit über die Handelsnetze des Schwarzen Meeres weiter ausbreitet.',
      },
      {
        label: 'Ankunft',
        title: 'Messina 1347',
        text: '1347 erreicht die Pest den sizilianischen Hafen Messina. Von den eng verbundenen Mittelmeerhäfen breitet sie sich weiter nach West- und Nordeuropa aus. Schiffe befördern dabei nicht nur Waren und Menschen, sondern wahrscheinlich auch infizierte Nagetiere und Flöhe.',
      },
    ],
    quiz: [
      {
        question: 'Über welche Verbindungen erreicht die Pest viele Häfen?',
        options: ['Über Handelswege', 'Über Eisenbahnen', 'Über Pilgerflüge'],
        correctIndex: 0,
        explanation:
          'Fernhandel und Schifffahrt verbanden die betroffenen Regionen und beschleunigten die Ausbreitung.',
      },
      {
        question: 'Welche gesellschaftliche Folge nennt die Szene?',
        options: [
          'Arbeit wird knapper',
          'Alle Städte verschwinden',
          'Der Handel endet für immer',
        ],
        correctIndex: 0,
        explanation:
          'Durch den Bevölkerungsverlust fehlten Arbeitskräfte; das veränderte unter anderem Löhne und Abhängigkeiten.',
      },
    ],
  },
  {
    id: 8,
    shortTitle: 'Jeanne',
    title: 'Jeanne d’Arc im Hundertjährigen Krieg',
    date: '1337–1453',
    place: 'Frankreich und England',
    people: 'Jeanne d’Arc, Karl VII. und englische Könige',
    imageTitle: 'Eine junge Frau verändert den Krieg',
    imageSubtitle: 'Jeanne d’Arc wird zur Symbolfigur Frankreichs.',
    duration: 31,
    narration:
      'Seit 1337 kämpfen englische und französische Könige um Thronansprüche und Gebiete in Frankreich – mit langen Pausen, weshalb „Hundertjähriger Krieg“ fast schon ordentlich klingt. 1429 hilft Jeanne d’Arc, die Belagerung von Orléans zu brechen und Karl den Siebten krönen zu lassen. Sie wird gefangen genommen und 1431 hingerichtet. Frankreich gewinnt später fast alle umkämpften Gebiete zurück; Jeanne wird zur nationalen Symbolfigur.',
    mapConcept:
      'Natürliche Frankreichkarte nach dem freigegebenen Muster. Punkt 1 zeigt Orléans und das Ende der Belagerung 1429, Punkt 2 Reims und die Krönung Karls VII. im selben Jahr. Farbige Wege verbinden Chinon, Orléans und Reims; die spätere Gefangennahme und der Weg nach Rouen bleiben als gestrichelte Fortsetzung sichtbar.',
    mapDetails: [
      '1 · Orléans · Ende der Belagerung 1429',
      '2 · Reims · Krönung Karls VII. 1429',
      'Jeannes Weg von Chinon über Orléans nach Reims',
    ],
    imageConcept:
      'Jeanne d’Arc vor Orléans zwischen Soldaten und Stadtmauern, entschlossen, aber nicht als übernatürliche Heldin inszeniert.',
    discoveries: [
      {
        label: 'Wendepunkt',
        title: 'Orléans 1429',
        text: 'Im Mai 1429 trägt Jeanne d’Arc dazu bei, die englische Belagerung von Orléans zu beenden. Der Erfolg stärkt die französische Seite militärisch und psychologisch – aus einer bedrängten Lage wird wieder eine echte Chance.',
      },
      {
        label: 'Krönung',
        title: 'Karl VII. in Reims',
        text: 'Im Juli 1429 wird Karl VII. in der Kathedrale von Reims gekrönt. Jeanne erreicht damit ein zentrales Ziel ihrer Mission: Der bisher umstrittene Thronanwärter erhält am traditionellen Krönungsort sichtbar königliche Legitimität.',
      },
    ],
    quiz: [
      {
        question: 'Welche Stadt wird 1429 mit Jeannes Hilfe entsetzt?',
        options: ['Orléans', 'Rom', 'Wittenberg'],
        correctIndex: 0,
        explanation:
          'Das Ende der Belagerung von Orléans wird zum Wendepunkt für die französische Seite.',
      },
      {
        question: 'Warum ist der Name „Hundertjähriger Krieg“ vereinfacht?',
        options: [
          'Er dauerte länger und hatte Unterbrechungen',
          'Er dauerte nur zehn Jahre',
          'Er fand nur auf See statt',
        ],
        correctIndex: 0,
        explanation:
          'Der Konflikt erstreckte sich über 116 Jahre, allerdings nicht als ununterbrochener Krieg.',
      },
    ],
  },
  {
    id: 9,
    shortTitle: 'Konstantinopel',
    title: 'Mehmed II. erobert Konstantinopel',
    date: '1453',
    place: 'Bosporus',
    people: 'Sultan Mehmed II. und Kaiser Konstantin XI.',
    imageTitle: 'Das Ende von Byzanz',
    imageSubtitle: 'Kanonen und Blockade brechen die Mauern Konstantinopels.',
    duration: 29,
    narration:
      '1453 belagert der erst 21-jährige Sultan Mehmed der Zweite Konstantinopel. Große Kanonen beschießen die berühmten Mauern, osmanische Schiffe werden sogar über Land ins Goldene Horn gezogen. Nach fast zwei Monaten fällt die Stadt. Der letzte byzantinische Kaiser stirbt im Kampf. Mehmed macht Konstantinopel zur osmanischen Hauptstadt. Das Byzantinische Reich endet – die Stadt am Bosporus bleibt ein politischer und wirtschaftlicher Schlüsselort.',
    mapConcept:
      'Natürliche Karte des Bosporusraums nach dem freigegebenen Muster. Punkt 1 zeigt Edirne als Ausgangspunkt der osmanischen Belagerung, Punkt 2 Konstantinopel als Ziel und späteres Machtzentrum. Der Heeresweg und der über Land geführte Schiffsweg zum Goldenen Horn werden farblich getrennt.',
    mapDetails: [
      '1 · Edirne · Ausgangspunkt der Belagerung',
      '2 · Konstantinopel · Eroberung am 29. Mai 1453',
      'Heeresweg und Schiffsweg zum Goldenen Horn',
    ],
    imageConcept:
      'Mehmed II. beobachtet aus sicherer Entfernung die Belagerung; Mauern, Kanonen und Schiffe im Goldenen Horn bleiben räumlich klar lesbar.',
    discoveries: [
      {
        label: 'Vorbereitung',
        title: 'Von Edirne zur Belagerung',
        text: 'Edirne ist Mehmeds Ausgangspunkt für den Feldzug. Dort werden schwere Geschütze vorbereitet, die anschließend mühsam nach Konstantinopel gebracht werden. Vor den berühmten Landmauern verstärken sie den Druck auf die Verteidiger.',
      },
      {
        label: 'Eroberung',
        title: 'Konstantinopel fällt',
        text: 'Am 29. Mai 1453 fällt Konstantinopel nach fast zweimonatiger Belagerung. Mehmed macht die Stadt zur osmanischen Hauptstadt. Ihre Lage am Bosporus verbindet weiterhin Europa und Asien sowie Schwarzes Meer und Mittelmeer.',
      },
    ],
    quiz: [
      {
        question: 'Wer erobert Konstantinopel 1453?',
        options: ['Mehmed II.', 'Richard Löwenherz', 'George Washington'],
        correctIndex: 0,
        explanation:
          'Sultan Mehmed II. führt die erfolgreiche osmanische Belagerung.',
      },
      {
        question: 'Warum war Konstantinopel strategisch wichtig?',
        options: [
          'Wegen seiner Lage am Bosporus',
          'Wegen seiner Lage in Amerika',
          'Wegen seiner Kohleminen',
        ],
        correctIndex: 0,
        explanation:
          'Die Stadt lag an einer zentralen Meerenge und verband Handels- und Machträume.',
      },
    ],
  },
  {
    id: 10,
    shortTitle: 'Amerika',
    title: 'Kolumbus, Cortés und Pizarro',
    date: '1492–1533',
    place: 'Atlantik und Amerika',
    people: 'Kolumbus, Cortés, Pizarro und indigene Herrscher',
    imageTitle: 'Eroberung einer bewohnten Welt',
    imageSubtitle: 'Spanische Expeditionen treffen auf große Reiche Amerikas.',
    duration: 32,
    narration:
      '1492 erreicht Kolumbus im Auftrag Spaniens Inseln der Karibik und glaubt, einen Weg nach Asien gefunden zu haben. Für die dort lebenden Menschen beginnt eine Katastrophe: Eroberung, Zwangsarbeit und eingeschleppte Krankheiten zerstören Gemeinschaften. Cortés besiegt mit indigenen Verbündeten das Aztekenreich, Pizarro nutzt eine Krise im Inkareich. Europa entdeckt also keine leere Welt – es dringt gewaltsam in längst bewohnte Welten ein.',
    mapConcept:
      'Natürliche Atlantik- und Amerikakarte nach dem freigegebenen Muster. Punkt 1 zeigt Tenochtitlan und seine Eroberung 1521, Punkt 2 Cajamarca und die Gefangennahme Atahualpas 1532. Kolumbus’ Route in die Karibik und die beiden späteren Eroberungswege bleiben farblich getrennt.',
    mapDetails: [
      '1 · Tenochtitlan · Eroberung 1521',
      '2 · Cajamarca · Gefangennahme Atahualpas 1532',
      'Kolumbusroute 1492 und getrennte Eroberungswege',
    ],
    imageConcept:
      'Eine erste Begegnung in der Karibik mit klarer Distanz und Unsicherheit; keine leere Landschaft und keine triumphale Erobererpose.',
    discoveries: [
      {
        label: 'Bewohnte Welt',
        title: 'Tenochtitlan 1521',
        text: 'Tenochtitlan war eine der größten Städte ihrer Zeit – Amerika war keine leere Welt. Cortés eroberte die Stadt 1521 nicht mit wenigen Spaniern allein: Zahlreiche indigene Verbündete und eine Pockenepidemie waren entscheidend.',
      },
      {
        label: 'Innere Krise',
        title: 'Cajamarca 1532',
        text: 'Als Pizarro Cajamarca erreichte, hatte ein Bürgerkrieg das Inkareich geschwächt. Dort nahmen die Spanier Atahualpa gefangen. Auch diese Eroberung war kein einfacher Sieg einer kleinen Gruppe, sondern nutzte eine bestehende Krise aus.',
      },
    ],
    quiz: [
      {
        question: 'Was glaubte Kolumbus 1492 erreicht zu haben?',
        options: ['Einen Weg nach Asien', 'Australien', 'Das Mongolenreich'],
        correctIndex: 0,
        explanation:
          'Kolumbus hielt die Karibik zunächst für einen Teil der von ihm gesuchten Asienroute.',
      },
      {
        question: 'Was erleichterte die spanischen Eroberungen?',
        options: [
          'Lokale Bündnisse und eingeschleppte Krankheiten',
          'Eine völlig unbewohnte Landschaft',
          'Die Hilfe Napoleons',
        ],
        correctIndex: 0,
        explanation:
          'Indigene Verbündete, innere Konflikte und Krankheiten waren neben Waffentechnik entscheidend.',
      },
    ],
  },
  {
    id: 11,
    shortTitle: 'Luther',
    title: 'Luther und die Reformation',
    date: 'ab 1517',
    place: 'Wittenberg und Europa',
    people: 'Martin Luther, Fürsten und Kirchenvertreter',
    imageTitle: 'Ein Streit wird europaweit',
    imageSubtitle: 'Druckerpresse und Politik beschleunigen die Reformation.',
    duration: 30,
    narration:
      '1517 kritisiert Martin Luther den Ablasshandel. Seine Thesen verbreiten sich dank des Buchdrucks schnell. Luther stellt die Autorität des Papstes infrage und übersetzt die Bibel ins Deutsche. Einige Fürsten schützen ihn – aus Überzeugung, aber auch aus politischem Interesse. Weitere Reformbewegungen entstehen, die katholische Kirche reagiert mit eigenen Reformen. Europa wird konfessionell gespalten. Aus einer theologischen Debatte ist ein Machtkampf mit sehr großer Auflage geworden.',
    mapConcept:
      'Natürliche Mitteleuropakarte nach dem freigegebenen Muster. Punkt 1 zeigt Wittenberg als Ausgangspunkt der öffentlichen Auseinandersetzung 1517, Punkt 2 Worms und den Reichstag 1521. Die Reise nach Worms und der anschließende Weg zur Wartburg werden farblich getrennt.',
    mapDetails: [
      '1 · Wittenberg · Thesen und Druckschriften ab 1517',
      '2 · Worms · Reichstag und Wormser Edikt 1521',
      'Reiseweg nach Worms und Schutz auf der Wartburg',
    ],
    imageConcept:
      'Luther in einer Druckerwerkstatt mit Flugschriften; Setzer, Leser und ein Bote zeigen, wie der Buchdruck die Debatte verbreitet.',
    discoveries: [
      {
        label: 'Medienwirkung',
        title: 'Wittenberg ab 1517',
        text: 'Von Wittenberg aus verbreitet sich Luthers Kritik durch Flugschriften und gedruckte Texte. Der Buchdruck macht die theologischen Streitfragen für viel mehr Menschen erreichbar und vervielfacht ihre Wirkung.',
      },
      {
        label: 'Politik erkennen',
        title: 'Worms 1521',
        text: 'Auf dem Reichstag in Worms soll Luther seine Schriften widerrufen. Danach wird über ihn die Reichsacht verhängt. Friedrich der Weise lässt ihn auf der Wartburg schützen – ein Beispiel dafür, wie eng Glaubensstreit und Fürstenpolitik verbunden sind.',
      },
    ],
    quiz: [
      {
        question: 'Was kritisiert Luther 1517 besonders?',
        options: [
          'Den Ablasshandel',
          'Die Dampfmaschine',
          'Die Kaiserkrönung Karls',
        ],
        correctIndex: 0,
        explanation:
          'Die Kritik am Ablasshandel steht am Anfang des öffentlich sichtbaren Konflikts.',
      },
      {
        question: 'Welches Medium beschleunigt die Verbreitung seiner Ideen?',
        options: ['Der Buchdruck', 'Das Radio', 'Die Eisenbahn'],
        correctIndex: 0,
        explanation:
          'Gedruckte Flugschriften und Bücher verbreiteten Luthers Positionen in kurzer Zeit.',
      },
    ],
  },
  {
    id: 12,
    shortTitle: 'Dreißig Jahre',
    title: 'Der Dreißigjährige Krieg',
    date: '1618–1648',
    place: 'Mitteleuropa',
    people: 'Kaiser, Fürsten und europäische Mächte',
    imageTitle: 'Ein Krieg verwüstet Mitteleuropa',
    imageSubtitle:
      'Aus einem Konflikt im Reich wird ein europäischer Machtkampf.',
    duration: 31,
    narration:
      '1618 werfen protestantische Adelige in Prag kaiserliche Statthalter aus einem Fenster. Der berühmte Fenstersturz löst nicht allein den Krieg aus, wird aber sein Startsignal. Aus Religions- und Verfassungskonflikten im Reich entsteht ein europäischer Machtkampf. Heere ziehen jahrzehntelang durch Mitteleuropa, plündern Dörfer und verbreiten Hunger und Seuchen. 1648 beendet der Westfälische Friede den Krieg und ordnet das Verhältnis von Kaiser, Reichsständen und Nachbarn neu.',
    mapConcept:
      'Natürliche Mitteleuropakarte nach dem freigegebenen Muster. Punkt 1 zeigt Prag und den Fenstersturz 1618, Punkt 2 die Friedensorte Münster und Osnabrück 1648. Eine rote Linie führt durch wichtige Kriegsräume, eine gestrichelte grüne Fortsetzung zu den Verhandlungsorten.',
    mapDetails: [
      '1 · Prag · Fenstersturz 1618',
      '2 · Münster und Osnabrück · Westfälischer Friede 1648',
      'Kriegsräume und Weg zu den Friedensorten',
    ],
    imageConcept:
      'Ein erschöpftes Dorf nach dem Durchzug verschiedener Heere; Soldaten bleiben im Hintergrund, Zerstörung wird sichtbar, aber nicht drastisch gezeigt.',
    discoveries: [
      {
        label: 'Auftakt',
        title: 'Prag 1618',
        text: 'Der Prager Fenstersturz wird zum sichtbaren Startsignal des Krieges. Konfessionelle Gegensätze sind wichtig, doch ebenso geht es um die Rechte der Reichsstände, die Macht des Kaisers und die Interessen auswärtiger Staaten.',
      },
      {
        label: 'Frieden verstehen',
        title: 'Münster und Osnabrück 1648',
        text: 'Der Westfälische Friede wird in Münster und Osnabrück ausgehandelt. Er besteht aus mehreren Verträgen, beendet den Krieg im Reich und verändert das Verhältnis von Kaiser, Reichsständen und europäischen Nachbarn.',
      },
    ],
    quiz: [
      {
        question: 'Welches Ereignis gilt 1618 als Startsignal?',
        options: [
          'Der Prager Fenstersturz',
          'Die Boston Tea Party',
          'Die Schlacht bei Waterloo',
        ],
        correctIndex: 0,
        explanation:
          'Der Prager Fenstersturz wird zum sichtbaren Auftakt des langen Konflikts.',
      },
      {
        question: 'Was beendet den Krieg 1648?',
        options: [
          'Der Westfälische Friede',
          'Die Magna Carta',
          'Das Konzil von Nicäa',
        ],
        correctIndex: 0,
        explanation:
          'Die Friedensverträge von Münster und Osnabrück beenden den Dreißigjährigen Krieg.',
      },
    ],
  },
  {
    id: 13,
    shortTitle: 'Ludwig XIV.',
    title: 'Ludwig XIV. und Versailles',
    date: '1643–1715',
    place: 'Frankreich und Europa',
    people: 'Ludwig XIV.',
    imageTitle: 'Der Sonnenkönig inszeniert Macht',
    imageSubtitle:
      'Versailles wird Bühne, Regierungssitz und Kontrollinstrument.',
    duration: 29,
    narration:
      'Ludwig der Vierzehnte regiert Frankreich mehr als siebzig Jahre. Er lässt Versailles zum gewaltigen Hof ausbauen und bindet viele Adelige an seine Nähe. Minister und Beamte stärken die königliche Verwaltung, während Ludwigs Kriege Frankreichs Grenzen und Einfluss erweitern sollen. Die prachtvolle Selbstdarstellung trägt ihm den Namen Sonnenkönig ein. Doch Hof und Kriege kosten enorme Summen – selbst sehr heller Glanz wirft einen ziemlich langen Schatten.',
    mapConcept:
      'Präzise Europakarte nach dem freigegebenen Muster. Punkt 1 zeigt Versailles als Hof- und Regierungszentrum, Punkt 2 Straßburg als Beispiel für Ludwigs territoriale Expansion. Frankreich wird nur weich und ungefähr hervorgehoben.',
    mapDetails: [
      '1 · Versailles · Hof und Regierungszentrum',
      '2 · Straßburg · französische Besetzung 1681',
      'Ungefähre Ausdehnung Frankreichs unter Ludwig XIV.',
    ],
    imageConcept:
      'Ludwig XIV. im Spiegelsaal von Versailles, umgeben von Adeligen und Beamten; Pracht und politische Kontrolle werden zugleich sichtbar.',
    discoveries: [
      {
        label: 'Hof verstehen',
        title: 'Versailles bindet den Adel',
        text: 'Nähe zum König brachte Ämter und Ansehen. Das aufwendige Hofleben beschäftigte Adelige und machte sie stärker von königlicher Gunst abhängig.',
      },
      {
        label: 'Grenze erkennen',
        title: 'Straßburg 1681',
        text: 'Ludwig XIV. lässt Straßburg 1681 besetzen und erweitert damit Frankreichs Einfluss am Rhein. Doch auch seine Macht bleibt begrenzt: Kriege, Verwaltung und Hof benötigen enorme Summen, Beamte und Verhandlungen.',
      },
    ],
    quiz: [
      {
        question: 'Welche politische Funktion hatte Versailles?',
        options: [
          'Es band den Adel an den König',
          'Es war nur ein Bauernhof',
          'Es ersetzte alle französischen Städte',
        ],
        correctIndex: 0,
        explanation:
          'Der Hof bündelte Regierung, Selbstdarstellung und die Kontrolle über viele Adelige.',
      },
      {
        question: 'Welche Belastung nennt die Szene?',
        options: [
          'Hohe Kosten für Hof und Kriege',
          'Den Verlust aller Häfen',
          'Die Abschaffung der Verwaltung',
        ],
        correctIndex: 0,
        explanation:
          'Prachtentfaltung und lange Kriege beanspruchten die französischen Finanzen stark.',
      },
    ],
  },
  {
    id: 14,
    shortTitle: 'Aufklärung',
    title: 'Wissenschaft und Aufklärung',
    date: '17.–18. Jahrhundert',
    place: 'Europa und Atlantikraum',
    people: 'Galilei, Newton und Denker der Aufklärung',
    imageTitle: 'Beobachten, rechnen, widersprechen',
    imageSubtitle: 'Neue Methoden verändern Naturbild und Politik.',
    duration: 31,
    narration:
      'Im 17. Jahrhundert richten Galilei und andere Forscher neue Instrumente auf Himmel und Natur. Newton beschreibt Bewegung und Schwerkraft mit mathematischen Regeln. Experimente, Messungen und gelehrte Netzwerke verändern, wie Wissen begründet wird. Im 18. Jahrhundert fragen Aufklärer auch politisch nach Vernunft, Rechten und Gewaltenteilung. Überlieferte Autoritäten müssen nun häufiger Belege liefern – ein für Autoritäten ausgesprochen lästiger Trend mit großer Zukunft.',
    mapConcept:
      'Präzise Europakarte nach dem freigegebenen Muster. Punkt 1 zeigt London und Newtons Principia von 1687, Punkt 2 Paris als Zentrum der politischen Aufklärung. Eine gestrichelte Linie steht für Brief-, Druck- und Publikationswege.',
    mapDetails: [
      '1 · London · Newtons Principia 1687',
      '2 · Paris · politische Aufklärung im 18. Jahrhundert',
      'Brief-, Druck- und Publikationswege',
    ],
    imageConcept:
      'Eine helle Arbeitsstube mit Teleskop, Prisma, Büchern und Briefen; mehrere Forschende diskutieren Beobachtungen statt eines einsamen Genies.',
    discoveries: [
      {
        label: 'Methode erkennen',
        title: 'London 1687',
        text: 'Newtons Principia erscheint 1687 in London. Neue Wissenschaft entsteht nicht durch eine einzelne Erfindung: Instrumente, Experimente, Mathematik, Druck und Austausch wirken zusammen.',
      },
      {
        label: 'Politik weiterdenken',
        title: 'Paris im 18. Jahrhundert',
        text: 'In Paris und darüber hinaus streiten Aufklärer über Vernunft, Toleranz, Rechte und die Teilung staatlicher Macht. Viele ihrer Ideen bleiben zunächst auf privilegierte Gruppen begrenzt.',
      },
    ],
    quiz: [
      {
        question: 'Womit beschreibt Newton Bewegung und Schwerkraft?',
        options: [
          'Mit mathematischen Regeln',
          'Mit königlichen Befehlen',
          'Mit Landkarten allein',
        ],
        correctIndex: 0,
        explanation:
          'Newton formulierte Naturvorgänge in mathematischen Gesetzen.',
      },
      {
        question: 'Welche politische Idee gehört zur Aufklärung?',
        options: [
          'Gewaltenteilung',
          'Erbliche Leibeigenschaft als Naturgesetz',
          'Verbot jeder Kritik',
        ],
        correctIndex: 0,
        explanation:
          'Die Aufklärung diskutierte unter anderem Rechte, Toleranz und die Teilung staatlicher Macht.',
      },
    ],
  },
  {
    id: 15,
    shortTitle: 'Washington',
    title: 'Die amerikanische Revolution',
    date: '1775–1783',
    place: 'Dreizehn Kolonien in Nordamerika',
    people: 'George Washington und die Unabhängigkeitsbewegung',
    imageTitle: 'Kolonien lösen sich von Großbritannien',
    imageSubtitle:
      'Unabhängigkeit und republikanische Ordnung entstehen im Krieg.',
    duration: 31,
    narration:
      '1775 beginnt der Krieg zwischen Großbritannien und dreizehn nordamerikanischen Kolonien. Viele Kolonisten lehnen Steuern ohne politische Vertretung in London ab. 1776 erklärt der Kongress die Unabhängigkeit; George Washington führt die Armee. Französische Hilfe trägt entscheidend zum Sieg bei, 1783 erkennt Großbritannien die Vereinigten Staaten an. Freiheit wird zum großen Versprechen – für versklavte Menschen, Frauen und indigene Nationen wird es zunächst allerdings nur sehr begrenzt eingelöst.',
    mapConcept:
      'Die dreizehn Kolonien an der Atlantikküste; Boston, Philadelphia und Yorktown. Französische Hilfe kommt als Seeroute, Feldzüge nur mit wenigen Pfeilen.',
    mapDetails: [
      'Boston',
      'Philadelphia',
      'Yorktown',
      'Dreizehn Kolonien',
      'Französische Hilfe',
    ],
    imageConcept:
      'Washington mit Offizieren und zivilen Vertretern über einer Karte; Soldaten im Hintergrund, französische Unterstützung durch Schiffe angedeutet.',
    discoveries: [
      {
        label: 'Ursache verstehen',
        title: 'Steuern ohne Vertretung',
        text: 'Viele Kolonisten bestritten das Recht des Londoner Parlaments, sie zu besteuern, solange sie dort keine gewählten Abgeordneten hatten.',
      },
      {
        label: 'Widerspruch sehen',
        title: 'Freiheit mit Ausschlüssen',
        text: 'Die Unabhängigkeitserklärung formulierte allgemeine Rechte. Sklaverei blieb jedoch bestehen, und politische Beteiligung war stark begrenzt.',
      },
    ],
    quiz: [
      {
        question: 'Wer führt die amerikanische Kontinentalarmee?',
        options: ['George Washington', 'Ludwig XIV.', 'Martin Luther'],
        correctIndex: 0,
        explanation:
          'George Washington war Oberbefehlshaber der Armee und wurde später erster Präsident.',
      },
      {
        question: 'Welche Hilfe war für den Sieg entscheidend?',
        options: [
          'Französische Militär- und Finanzhilfe',
          'Mongolische Reiter',
          'Osmanische Kanonen vor Konstantinopel',
        ],
        correctIndex: 0,
        explanation:
          'Frankreich unterstützte die Aufständischen mit Geld, Soldaten und einer wichtigen Flotte.',
      },
    ],
  },
  {
    id: 16,
    shortTitle: 'Napoleon',
    title: 'Revolution und Napoleon',
    date: '1789–1815',
    place: 'Frankreich und Europa',
    people: 'Revolutionäre, Napoleon Bonaparte und europäische Gegner',
    imageTitle: 'Die alte Ordnung gerät ins Wanken',
    imageSubtitle:
      'Revolutionäre Ideen und napoleonische Kriege verändern Europa.',
    duration: 34,
    narration:
      '1789 stürzt die Französische Revolution die alte Ordnung. Die Nationalversammlung erklärt Menschen- und Bürgerrechte, 1792 wird die Monarchie abgeschafft. Es folgen Krieg, Terror und Machtkämpfe. 1799 übernimmt Napoleon Bonaparte die Regierung, krönt sich später zum Kaiser und beherrscht zeitweise große Teile Europas. Seine Feldzüge verbreiten Reformen, kosten aber unzählige Leben. 1815 wird Napoleon bei Waterloo endgültig besiegt. Die Herrscher kehren zurück – viele Ideen der Revolution bleiben.',
    mapConcept:
      'Frankreich 1789 und Napoleons wichtigste Feldzüge bis 1815. Europa bleibt als Grundkarte stabil; Ausdehnung zeitbezogen weich, Russland- und Waterloo-Route mit Pfeilen.',
    mapDetails: [
      'Paris',
      'Frankreich',
      'Europa um 1812',
      'Russlandfeldzug',
      'Waterloo',
    ],
    imageConcept:
      'Eine geteilte, ruhige Szene: links Nationalversammlung und Erklärung der Rechte, rechts Napoleon über einer Europakarte; kein Schlachtenpanorama.',
    discoveries: [
      {
        label: 'Revolution ordnen',
        title: 'Rechte und Terror',
        text: 'Die Revolution formulierte neue Rechte und beseitigte Privilegien. Zugleich radikalisierte sie sich, führte Krieg und ließ politische Gegner hinrichten.',
      },
      {
        label: 'Napoleon bewerten',
        title: 'Reformen durch Eroberung',
        text: 'Napoleon verbreitete Rechts- und Verwaltungsreformen, errichtete aber zugleich eine persönliche Herrschaft und führte verlustreiche Eroberungskriege.',
      },
    ],
    quiz: [
      {
        question: 'Was schafft Frankreich 1792 ab?',
        options: ['Die Monarchie', 'Den Buchdruck', 'Die Atlantikschifffahrt'],
        correctIndex: 0,
        explanation:
          '1792 wird Frankreich zur Republik und die Monarchie abgeschafft.',
      },
      {
        question: 'Wo wird Napoleon 1815 endgültig besiegt?',
        options: ['Bei Waterloo', 'Bei Zama', 'Auf dem Lechfeld'],
        correctIndex: 0,
        explanation:
          'Die Niederlage bei Waterloo beendet Napoleons Rückkehr an die Macht.',
      },
    ],
  },
];

export const historiaEpisode2Scenes: HistoriaScene[] = episode2Scenes.map(
  (scene) => ({
    ...scene,
    ...secondaryMedia[scene.id],
    ...videoMedia[scene.id],
    mainImage: `${episode2Asset}/main/scene${String(scene.id).padStart(2, '0')}.jpg`,
    mapImage: `${episode2Asset}/maps/scene${String(scene.id).padStart(2, '0')}.svg`,
  }),
);
