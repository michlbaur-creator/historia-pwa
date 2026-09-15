import type { HistoriaScene } from './data';

const episode3Asset = '/assets/historia/episode3';

// Complementary motifs use the existing second-half crossfade, as in Episode 2.
const secondaryMedia: Record<
  number,
  Pick<
    HistoriaScene,
    'secondaryImage' | 'secondaryImageTitle' | 'secondaryImageSubtitle'
  >
> = {
  2: {
    secondaryImage: `${episode3Asset}/secondary/scene02.jpg`,
    secondaryImageTitle: 'Ein Parlament in der Paulskirche',
    secondaryImageSubtitle:
      '1848 beraten Abgeordnete in Frankfurt über Freiheit und Einheit.',
  },
  13: {
    secondaryImage: `${episode3Asset}/secondary/scene13.jpg`,
    secondaryImageTitle: 'Ghana wird unabhängig',
    secondaryImageSubtitle:
      '1957 entsteht ein neuer Staat – weitere Länder Afrikas folgen.',
  },
  15: {
    secondaryImage: `${episode3Asset}/secondary/scene15.jpg`,
    secondaryImageTitle: 'Die Mauer öffnet sich',
    secondaryImageSubtitle:
      '1989 begegnen sich Menschen an der geöffneten Grenze in Berlin.',
  },
};

const videoMedia: Record<
  number,
  Pick<HistoriaScene, 'video' | 'videoPlayback'>
> = {
  1: {
    video: `${episode3Asset}/main/S1.mp4`,
    videoPlayback: 'hold',
  },
  6: {
    video: `${episode3Asset}/main/S6.mp4`,
    videoPlayback: 'hold',
  },
  12: {
    video: `${episode3Asset}/main/S12.mp4`,
    videoPlayback: 'hold',
  },
  16: {
    video: `${episode3Asset}/main/S16.mp4`,
    videoPlayback: 'hold',
  },
};

const episode3Scenes: HistoriaScene[] = [
  {
    id: 1,
    shortTitle: 'Industrie',
    title: 'Dampf treibt die Industrialisierung an',
    date: '18.–19. Jahrhundert',
    place: 'Großbritannien und Westeuropa',
    people: 'James Watt, Unternehmer und Fabrikarbeiter',
    imageTitle: 'Maschinen verändern die Arbeit',
    imageSubtitle: 'Dampf, Fabriken und Eisenbahnen beschleunigen den Alltag.',
    duration: 32,
    narration:
      'Wir schreiben das späte 18. Jahrhundert und landen in Großbritannien. Hier bringen verbesserte Dampfmaschinen, etwa die von James Watt, Pumpen und Fabriken ordentlich auf Touren. Textilien entstehen in Massen, Eisenbahnen befördern Menschen und Waren immer schneller. Städte wachsen, die Produktion boomt. Für viele Arbeiter bedeutet das allerdings lange Tage und wenig Lohn. Die Maschine macht Tempo – den Feierabend erfindet sie leider nicht gleich mit.',
    mapImage: `${episode3Asset}/maps/scene01.svg?v=20260910a`,
    mapConcept:
      'Natürliche Karte Großbritanniens und Westeuropas. Punkt 1 zeigt Manchester als frühes Fabrikzentrum, Punkt 2 die Strecke Stockton–Darlington von 1825. Wenige Linien verdeutlichen die Ausbreitung von Industrie und Eisenbahn auf den Kontinent.',
    mapDetails: [
      '1 · Manchester · Fabrikstadt',
      '2 · Stockton–Darlington · Eisenbahn 1825',
      'Ausbreitung der Industrialisierung nach Westeuropa',
    ],
    imageConcept:
      'Helle, fotorealistische Fabrikszene mit dampfbetriebenen Maschinen, erwachsenen Arbeitern und einer frühen Eisenbahn im Hintergrund; keine düstere Katastropheninszenierung.',
    discoveries: [
      {
        label: 'Antrieb verstehen',
        title: 'Manchester und die Fabriken',
        text: 'Manchester wächst im 19. Jahrhundert zu einem Zentrum der Textilindustrie. Maschinen bündeln viele Arbeitsschritte in Fabriken; Arbeitszeit und Arbeitstempo werden nun stärker von Unternehmern und Uhren bestimmt.',
      },
      {
        label: 'Tempo erleben',
        title: 'Die Eisenbahn beginnt',
        text: '1825 fährt auf der Strecke Stockton–Darlington eine öffentliche Eisenbahn mit Dampflokomotiven. Das neue Verkehrsmittel verbilligt Transporte und verändert Entfernungen grundlegend.',
      },
    ],
    quiz: [
      {
        question: 'Wo beginnt die Industrialisierung besonders früh?',
        options: ['In Großbritannien', 'Im Römischen Reich', 'Im Inkareich'],
        correctIndex: 0,
        explanation:
          'Großbritannien verfügt früh über Kapital, Rohstoffe, Märkte und technische Neuerungen für die Industrialisierung.',
      },
      {
        question: 'Welche wichtige Folge haben Fabriken und Eisenbahnen?',
        options: [
          'Produktion und Transport werden schneller',
          'Städte verlieren ihre Einwohner',
          'Handarbeit verschwindet sofort vollständig',
        ],
        correctIndex: 0,
        explanation:
          'Maschinen steigern die Produktion, während Eisenbahnen Menschen, Rohstoffe und Waren schneller befördern.',
      },
    ],
  },
  {
    id: 2,
    shortTitle: '1848',
    title: 'Europa revoltiert',
    date: '1848–1849',
    place: 'Paris, Wien, Berlin und Frankfurt',
    people: 'Revolutionäre, Fürsten und Abgeordnete',
    imageTitle: 'Freiheit auf den Barrikaden',
    imageSubtitle:
      'Bürger verlangen Rechte, Verfassungen und nationale Einheit.',
    duration: 31,
    narration:
      'Wir schreiben das Jahr 1848 – und in Europa liegt Aufruhr in der Luft. In Paris, Wien, Berlin und vielen weiteren Städten gehen Menschen auf die Straße. Sie fordern Verfassungen, Pressefreiheit und politische Mitbestimmung. In der Frankfurter Paulskirche berät erstmals ein gesamtdeutsches Parlament. Fürsten und Militär schlagen die Revolutionen zwar nieder. Ihre Ideen bleiben trotzdem unterwegs – Gedanken lassen sich eben deutlich schlechter verhaften als Menschen.',
    mapImage: `${episode3Asset}/maps/scene02.svg?v=20260910a`,
    mapConcept:
      'Natürliche Europakarte mit Punkt 1 Paris für den Revolutionsbeginn im Februar 1848 und Punkt 2 Frankfurt für die Nationalversammlung. Wenige ruhige Pfeile deuten die Ausbreitung an; zusätzliche kleinteilige Ortsbeschriftungen entfallen.',
    mapDetails: [
      '1 · Paris · Februarrevolution 1848',
      '2 · Frankfurt · Nationalversammlung',
      'Weitere Erhebungen in Wien, Berlin, Prag und Norditalien',
    ],
    imageConcept:
      'Eine breite, nicht heroische Straßenszene mit Barrikade und Flugblättern; im Hintergrund blendet die Frankfurter Paulskirche mit beratenden Abgeordneten ein.',
    discoveries: [
      {
        label: 'Auftakt',
        title: 'Die Revolution in Paris',
        text: 'Im Februar 1848 stürzen Demonstranten die französische Julimonarchie. Die Nachricht verbreitet sich rasch und ermutigt Proteste in vielen Teilen Europas.',
      },
      {
        label: 'Parlament',
        title: 'Die Paulskirche in Frankfurt',
        text: 'Ab Mai 1848 beraten Abgeordnete in der Frankfurter Paulskirche über Grundrechte und einen deutschen Nationalstaat. Ihre Verfassung setzt sich damals nicht durch, bleibt aber politisch bedeutsam.',
      },
    ],
    quiz: [
      {
        question: 'Was fordern viele Revolutionäre von 1848?',
        options: [
          'Verfassungen und politische Mitbestimmung',
          'Die Rückkehr zum Feudalismus',
          'Die Abschaffung aller Parlamente',
        ],
        correctIndex: 0,
        explanation:
          'Verfassungen, Grundrechte, Pressefreiheit und nationale Einheit gehören zu den zentralen Forderungen.',
      },
      {
        question: 'Warum bleibt 1848 trotz des Scheiterns bedeutsam?',
        options: [
          'Viele Forderungen wirken langfristig weiter',
          'Alle europäischen Monarchien enden sofort',
          'Europa bildet einen gemeinsamen Staat',
        ],
        correctIndex: 0,
        explanation:
          'Grundrechte, Verfassungen und nationale Einheit bleiben politische Ziele späterer Bewegungen.',
      },
    ],
  },
  {
    id: 3,
    shortTitle: 'Bürgerkrieg',
    title: 'Der Amerikanische Bürgerkrieg',
    date: '1861–1865',
    place: 'Vereinigte Staaten von Amerika',
    people: 'Abraham Lincoln, Union und Konföderation',
    imageTitle: 'Ein Land zerreißt',
    imageSubtitle:
      'Union, Sklaverei und Freiheit werden auf dem Schlachtfeld entschieden.',
    duration: 33,
    narration:
      'Jetzt springen wir ins Jahr 1861. Elf Südstaaten verlassen die Vereinigten Staaten, weil sie ihre Ordnung und damit die Versklavung von Millionen Menschen bewahren wollen. Präsident Abraham Lincoln kämpft für den Erhalt der Union und macht die Abschaffung der Sklaverei zum Kriegsziel. 1865 kapituliert der Süden, kurz darauf wird Lincoln ermordet. Die ehemaligen Sklaven sind nun frei – wirklich gleichberechtigt sind sie leider noch lange nicht.',
    mapImage: `${episode3Asset}/maps/scene03.svg?v=20260910a`,
    mapConcept:
      'Natürliche Karte der Vereinigten Staaten mit den ungefähren Flächen von Union und Konföderation. Punkt 1 zeigt Fort Sumter und den Kriegsbeginn 1861, Punkt 2 Appomattox und die Kapitulation 1865.',
    mapDetails: [
      '1 · Fort Sumter · Kriegsbeginn 1861',
      '2 · Appomattox · Kapitulation 1865',
      'Union und Konföderation als zeitbezogene Flächen',
    ],
    imageConcept:
      'Zurückhaltende historische Szene mit Lincoln, erwachsenen Soldaten beider Seiten und befreiten Familien; keine drastische Schlachtdarstellung.',
    discoveries: [
      {
        label: 'Kriegsbeginn',
        title: 'Fort Sumter 1861',
        text: 'Der Angriff konföderierter Truppen auf Fort Sumter im Hafen von Charleston eröffnet im April 1861 den Bürgerkrieg. Hinter dem Konflikt steht vor allem die Zukunft der Sklaverei.',
      },
      {
        label: 'Kriegsende',
        title: 'Appomattox 1865',
        text: 'Im April 1865 kapituliert General Robert E. Lee bei Appomattox Court House vor Ulysses S. Grant. Weitere Verbände folgen; die Union bleibt erhalten und die Sklaverei wird verfassungsrechtlich abgeschafft.',
      },
    ],
    quiz: [
      {
        question: 'Welcher Konflikt steht im Zentrum des Bürgerkriegs?',
        options: [
          'Die Zukunft der Sklaverei',
          'Die Kaiserkrönung in Rom',
          'Der Bau der ersten Pyramide',
        ],
        correctIndex: 0,
        explanation:
          'Die Südstaaten verteidigten eine Gesellschaft und Wirtschaft, die wesentlich auf Sklaverei beruhte.',
      },
      {
        question: 'Was erreicht der Sieg der Nordstaaten?',
        options: [
          'Erhalt der Union und Verbot der Sklaverei',
          'Sofortige vollständige Gleichberechtigung',
          'Auflösung der Vereinigten Staaten',
        ],
        correctIndex: 0,
        explanation:
          'Die Union bleibt bestehen und die Sklaverei endet rechtlich; Rassismus und Ungleichheit bleiben jedoch bestehen.',
      },
    ],
  },
  {
    id: 4,
    shortTitle: 'Nationalstaaten',
    title: 'Italien und Deutschland werden geeint',
    date: '1859–1871',
    place: 'Italien, Deutschland und Frankreich',
    people: 'Cavour, Garibaldi und Otto von Bismarck',
    imageTitle: 'Neue Staaten auf alten Landkarten',
    imageSubtitle: 'Diplomatie, Volksbewegungen und Kriege ordnen Europa neu.',
    duration: 34,
    narration:
      'Bleiben wir im 19. Jahrhundert. Viele Menschen wollen aus den italienischen und deutschen Einzelstaaten jeweils einen Nationalstaat machen. In Italien verbinden Cavour und Garibaldi Diplomatie, Aufstände und Krieg; 1861 entsteht das Königreich Italien. Preußens Ministerpräsident Otto von Bismarck führt drei Kriege. 1871 wird der preußische König in Versailles zum deutschen Kaiser ausgerufen. Zwei neue Staaten stehen auf der Karte – besonders friedlich war die Bauanleitung allerdings nicht.',
    mapConcept:
      'Natürliche Europakarte mit den schrittweisen Einigungen Italiens und Deutschlands. Punkt 1 zeigt Turin und die italienische Staatsgründung 1861, Punkt 2 Versailles und die deutsche Kaiserproklamation 1871.',
    mapDetails: [
      '1 · Turin · Königreich Italien 1861',
      '2 · Versailles · Deutsches Kaiserreich 1871',
      'Schrittweise Einigungen ohne moderne Rückprojektion',
    ],
    imageConcept:
      'Geteilte historische Szene: italienische Freiwillige um Garibaldi und eine nüchterne Kaiserproklamation in Versailles; keine triumphale Heldenpose.',
    discoveries: [
      {
        label: 'Italien',
        title: 'Turin 1861',
        text: 'Im März 1861 tritt in Turin das erste gesamtitalienische Parlament zusammen und Viktor Emanuel II. wird König von Italien. Venetien und Rom kommen erst später hinzu.',
      },
      {
        label: 'Deutschland',
        title: 'Versailles 1871',
        text: 'Während des Krieges gegen Frankreich wird Wilhelm I. im Januar 1871 im Schloss Versailles zum deutschen Kaiser ausgerufen. Das neue Reich entsteht unter preußischer Führung.',
      },
    ],
    quiz: [
      {
        question:
          'Welche Mittel prägen die Einigung Italiens und Deutschlands?',
        options: [
          'Diplomatie, politische Bewegungen und Kriege',
          'Nur friedliche Volksabstimmungen',
          'Eine gemeinsame Kolonialregierung',
        ],
        correctIndex: 0,
        explanation:
          'Beide Einigungen verbinden politische Bewegungen mit Diplomatie und militärischen Konflikten.',
      },
      {
        question: 'Wo wird 1871 der deutsche Kaiser ausgerufen?',
        options: ['In Versailles', 'In Rom', 'In Moskau'],
        correctIndex: 0,
        explanation:
          'Die Kaiserproklamation findet im Schloss Versailles während des Krieges gegen Frankreich statt.',
      },
    ],
  },
  {
    id: 5,
    shortTitle: 'Imperialismus',
    title: 'Europäische Mächte teilen die Welt',
    date: '1880er Jahre–1914',
    place: 'Afrika, Asien und Europa',
    people: 'Kolonialmächte und die beherrschten Gesellschaften',
    imageTitle: 'Grenzen mit dem Lineal',
    imageSubtitle: 'Koloniale Herrschaft verbindet Ausbeutung mit Gewalt.',
    duration: 33,
    narration:
      'Jetzt wird die Weltkarte plötzlich ziemlich bunt – allerdings nicht freiwillig. Im späten 19. Jahrhundert erobern europäische Mächte große Teile Afrikas und Asiens. Auf der Berliner Konferenz 1884 und 1885 verhandeln sie über Afrika; Afrikaner sitzen nicht mit am Tisch. Es geht um Rohstoffe, Märkte, Macht und rassistische Überlegenheitsvorstellungen. Koloniale Grenzen zerschneiden bestehende Gesellschaften, während Wettrüsten und Konkurrenz auch die Spannungen in Europa verschärfen.',
    mapConcept:
      'Natürliche Weltkarte mit grob zeitbezogenen Kolonialräumen vor 1914. Punkt 1 zeigt Berlin und die Kongokonferenz 1884/85, Punkt 2 Beijing und den Boxerkrieg 1900 als Beispiel imperialer Eingriffe in Asien.',
    mapDetails: [
      '1 · Berlin · Kongokonferenz 1884/85',
      '2 · Beijing · ausländische Intervention 1900',
      'Kolonialräume nur vereinfacht und zeitbezogen',
    ],
    imageConcept:
      'Europäische Diplomaten an einem Kartentisch werden mit einer kolonial beherrschten Hafen- und Handelsszene verbunden; die betroffenen Menschen bleiben als handelnde Personen sichtbar.',
    discoveries: [
      {
        label: 'Aufteilung',
        title: 'Die Berliner Konferenz',
        text: '1884 und 1885 beraten europäische Staaten sowie die USA und das Osmanische Reich in Berlin über Regeln kolonialer Ansprüche. Vertreter afrikanischer Gesellschaften sind nicht beteiligt.',
      },
      {
        label: 'Eingriff in Asien',
        title: 'Beijing 1900',
        text: 'Beim Boxerkrieg greifen mehrere ausländische Mächte militärisch in China ein und besetzen Beijing. Das zeigt, dass imperialer Druck weit über die formalen Kolonien hinausreicht.',
      },
    ],
    quiz: [
      {
        question: 'Wer fehlt bei der Berliner Konferenz am Verhandlungstisch?',
        options: [
          'Vertreter afrikanischer Gesellschaften',
          'Europäische Diplomaten',
          'Das Deutsche Reich',
        ],
        correctIndex: 0,
        explanation:
          'Europäische Mächte verhandeln über Afrika, ohne afrikanische Gesellschaften gleichberechtigt zu beteiligen.',
      },
      {
        question: 'Welche Folge hat der Imperialismus in Europa?',
        options: [
          'Die Rivalität der Großmächte verschärft sich',
          'Alle Armeen werden abgeschafft',
          'Nationalstaaten verlieren jedes Interesse an Macht',
        ],
        correctIndex: 0,
        explanation:
          'Koloniale Konkurrenz und Wettrüsten verstärken die Spannungen zwischen den europäischen Großmächten.',
      },
    ],
  },
  {
    id: 6,
    shortTitle: 'Erster Weltkrieg',
    title: 'Europa stürzt in den Ersten Weltkrieg',
    date: '1914–1918',
    place: 'Europa und weltweite Kriegsschauplätze',
    people: 'Franz Ferdinand, Regierungen und Millionen Soldaten',
    imageTitle: 'Vom Attentat zum Weltkrieg',
    imageSubtitle:
      'Bündnisse und Mobilmachungen setzen eine Kettenreaktion in Gang.',
    duration: 35,
    narration:
      'Wir schreiben den 28. Juni 1914. In Sarajevo ermordet ein serbischer Nationalist den österreichischen Thronfolger Franz Ferdinand. Was nun folgt, ist eine politische Kettenreaktion aus Ultimaten, Bündnissen und Mobilmachungen. Aus der Krise wird erst ein europäischer Krieg, dann ein Weltkrieg. An der Westfront stecken die Armeen in Schützengräben fest. 1918 endet der Krieg: Vier Kaiserreiche sind zerbrochen und Millionen Menschen tot.',
    mapConcept:
      'Natürliche Europakarte mit den Bündnissystemen von 1914 und wenigen Hauptfronten. Punkt 1 zeigt Sarajevo und das Attentat, Punkt 2 Compiègne und den Waffenstillstand 1918.',
    mapDetails: [
      '1 · Sarajevo · Attentat 1914',
      '2 · Compiègne · Waffenstillstand 1918',
      'Westfront, Ostfront und wichtige Bündnisse',
    ],
    imageConcept:
      'Eine sachliche Montage aus Sarajevo, Schützengraben und Unterzeichnung des Waffenstillstands; keine drastischen Verwundungen und keine heroische Kriegsästhetik.',
    discoveries: [
      {
        label: 'Auslöser',
        title: 'Sarajevo 1914',
        text: 'Das Attentat löst die Julikrise aus. Der Krieg entsteht jedoch nicht automatisch durch einen einzelnen Schuss, sondern durch politische Entscheidungen, Bündnisse, Aufrüstung und gegenseitiges Misstrauen.',
      },
      {
        label: 'Waffenstillstand',
        title: 'Compiègne 1918',
        text: 'Am 11. November 1918 tritt der Waffenstillstand von Compiègne in Kraft. Die Kämpfe enden; Friedensverträge und neue Grenzen werden erst anschließend ausgehandelt.',
      },
    ],
    quiz: [
      {
        question: 'Warum führt das Attentat von Sarajevo zum großen Krieg?',
        options: [
          'Bündnisse und politische Entscheidungen erzeugen eine Kettenreaktion',
          'Alle Staaten hatten denselben Herrscher',
          'Der Krieg war nach einem Tag beendet',
        ],
        correctIndex: 0,
        explanation:
          'Ultimaten, Bündniszusagen und Mobilmachungen weiten die Krise Schritt für Schritt aus.',
      },
      {
        question: 'Was kennzeichnet die Westfront besonders?',
        options: [
          'Ein langer Stellungskrieg',
          'Ausschließlich Seeschlachten',
          'Kämpfe ohne moderne Waffen',
        ],
        correctIndex: 0,
        explanation:
          'Große Teile der Westfront erstarren in einem verlustreichen System aus Schützengräben.',
      },
    ],
  },
  {
    id: 7,
    shortTitle: 'Revolution',
    title: 'Lenin, Revolution und Stalins Aufstieg',
    date: '1917–1928',
    place: 'Russland und Sowjetunion',
    people: 'Lenin, Trotzki und Stalin',
    imageTitle: 'Die alte Ordnung fällt',
    imageSubtitle: 'Aus Revolution und Bürgerkrieg entsteht die Sowjetunion.',
    duration: 34,
    narration:
      'Wir springen ins Jahr 1917. Russland ist vom Krieg erschöpft, und zuerst stürzt der Zar. Im Oktober übernehmen Lenins Bolschewiki in Petrograd die Macht. Ihr Versprechen lautet Frieden, Land und Brot. Statt Ruhe folgt allerdings ein blutiger Bürgerkrieg. 1922 entsteht die Sowjetunion. Nach Lenins Tod drängt Stalin seine Rivalen beiseite und errichtet eine Diktatur – mit Terror, Zwang, Hunger und Millionen Opfern.',
    mapConcept:
      'Natürliche Karte des Russischen Reiches und der frühen Sowjetunion. Punkt 1 zeigt Petrograd und die Oktoberrevolution 1917, Punkt 2 Moskau und Stalins Machtzentrum ab den 1920er Jahren.',
    mapDetails: [
      '1 · Petrograd · Oktoberrevolution 1917',
      '2 · Moskau · Machtzentrum der Sowjetunion',
      'Bürgerkriegsräume nur vereinfacht',
    ],
    imageConcept:
      'Revolutionäre Menge vor Regierungsgebäuden blendet in einen nüchternen Parteiapparat unter Stalin über; keine propagandistische Heldenästhetik.',
    discoveries: [
      {
        label: 'Machtwechsel',
        title: 'Petrograd 1917',
        text: 'Im November 1917 nach heutiger Zeitrechnung stürzen die Bolschewiki in Petrograd die provisorische Regierung. Ihre Macht müssen sie anschließend in einem langen Bürgerkrieg behaupten.',
      },
      {
        label: 'Diktatur',
        title: 'Stalins Machtzentrum Moskau',
        text: 'Nach Lenins Tod 1924 verdrängt Stalin seine Rivalen. Partei, Geheimpolizei und Personenkult sichern seine Herrschaft; Zwangskollektivierung und Terror treffen Millionen Menschen.',
      },
    ],
    quiz: [
      {
        question: 'Wer übernimmt im Oktober 1917 die Macht?',
        options: [
          'Lenins Bolschewiki',
          'Die französische Nationalversammlung',
          'Die NATO',
        ],
        correctIndex: 0,
        explanation:
          'Die Bolschewiki stürzen die provisorische Regierung und errichten schrittweise ihre Alleinherrschaft.',
      },
      {
        question: 'Wie sichert Stalin seine Herrschaft?',
        options: [
          'Durch Partei, Terror und Personenkult',
          'Durch freie Wahlen mit wechselnden Regierungen',
          'Durch die Auflösung der Sowjetunion',
        ],
        correctIndex: 0,
        explanation:
          'Stalin beseitigt Rivalen und stützt seine Diktatur auf den Parteiapparat, Gewalt und einen ausgeprägten Personenkult.',
      },
    ],
  },
  {
    id: 8,
    shortTitle: 'Weimar',
    title: 'Die Weimarer Republik unter Druck',
    date: '1919–1933',
    place: 'Deutschland und Europa',
    people: 'Demokraten, Gegner der Republik und die Bevölkerung',
    imageTitle: 'Demokratie in der Krise',
    imageSubtitle:
      'Vertrag, Inflation und Arbeitslosigkeit belasten die Republik.',
    duration: 34,
    narration:
      'Wir schreiben das Jahr 1919. Deutschland bekommt eine demokratische Verfassung, aber einen gemütlichen Start erlebt die neue Republik ganz sicher nicht. Niederlage, Versailler Vertrag und politische Gewalt belasten sie schwer. 1923 wird das Geld durch die Inflation beinahe wertlos. Danach beruhigt sich die Lage kurz, bis die Weltwirtschaftskrise Massenarbeitslosigkeit bringt. 1933 ernennt Präsident Hindenburg Adolf Hitler zum Reichskanzler – und die Demokratie wird von innen zerstört.',
    mapConcept:
      'Natürliche Karte Deutschlands und seiner Nachbarn nach 1919. Punkt 1 zeigt Versailles und den Friedensvertrag, Punkt 2 Berlin und die Ernennung Hitlers zum Reichskanzler 1933.',
    mapDetails: [
      '1 · Versailles · Friedensvertrag 1919',
      '2 · Berlin · Machtübergabe 1933',
      'Deutschland mit den zeitbezogenen Grenzen der Weimarer Republik',
    ],
    imageConcept:
      'Eine Berliner Straßenszene verbindet demokratische Wahlplakate, Inflationsgeld und eine Arbeitslosenschlange; Hitler bleibt klein und nicht heroisch dargestellt.',
    discoveries: [
      {
        label: 'Friedensordnung',
        title: 'Versailles 1919',
        text: 'Der Versailler Vertrag legt Deutschland Gebietsverluste, Abrüstung und Reparationspflichten auf. Rechte Gegner nutzen ihn gezielt, um die demokratische Republik als angeblich verräterisch anzugreifen.',
      },
      {
        label: 'Machtübergabe',
        title: 'Berlin 1933',
        text: 'Am 30. Januar 1933 ernennt Reichspräsident Paul von Hindenburg Hitler zum Reichskanzler. Konservative Politiker glauben, ihn kontrollieren zu können – eine folgenschwere Fehleinschätzung.',
      },
    ],
    quiz: [
      {
        question: 'Welche Krise stärkt ab 1929 radikale Parteien besonders?',
        options: [
          'Die Weltwirtschaftskrise',
          'Die Industrialisierung Englands',
          'Die Kubakrise',
        ],
        correctIndex: 0,
        explanation:
          'Massenarbeitslosigkeit und soziale Not untergraben das Vertrauen in die demokratischen Parteien.',
      },
      {
        question: 'Wie gelangt Hitler 1933 zunächst an die Regierung?',
        options: [
          'Hindenburg ernennt ihn zum Reichskanzler',
          'Er gewinnt einen Bürgerkrieg',
          'Er wird vom Völkerbund eingesetzt',
        ],
        correctIndex: 0,
        explanation:
          'Die Macht wird Hitler von konservativen Eliten übertragen; danach beseitigt er die Demokratie systematisch.',
      },
    ],
  },
  {
    id: 9,
    shortTitle: 'NS-Diktatur',
    title: 'Hitler errichtet die nationalsozialistische Diktatur',
    date: '1933–1939',
    place: 'Deutschland und Europa',
    people: 'Adolf Hitler, NSDAP und ihre Gegner',
    imageTitle: 'Eine Diktatur entsteht',
    imageSubtitle:
      'Terror, Propaganda und Ausgrenzung beseitigen Freiheit und Recht.',
    duration: 34,
    narration:
      'Und jetzt kommen wir zu einem sehr düsteren Kapitel. 1933 beginnen Hitler und die Nationalsozialisten, Demokratie und Rechtsstaat zu beseitigen. Parteien und Gewerkschaften werden verboten, Gegner verfolgt, Medien kontrolliert. Die Nürnberger Gesetze von 1935 entrechten Juden; Rassismus wird staatliche Politik. Hitler rüstet auf und bereitet den Krieg vor. Viele Deutsche unterstützen das Regime, passen sich an oder schauen weg – andere leisten unter hohem Risiko Widerstand.',
    mapConcept:
      'Natürliche Deutschlandkarte mit den politischen Veränderungen bis 1939. Punkt 1 zeigt Berlin und das Ermächtigungsgesetz 1933, Punkt 2 Nürnberg und die rassistischen Gesetze von 1935.',
    mapDetails: [
      '1 · Berlin · Ermächtigungsgesetz 1933',
      '2 · Nürnberg · Rassengesetze 1935',
      'Expansion bis 1939 nur zeitbezogen und klar getrennt',
    ],
    imageConcept:
      'Nüchterne Straßenszene mit entfernten demokratischen Plakaten, kontrollierter Presse und sichtbarer Ausgrenzung; Hitler nur als kleines Propagandabild, keine Monumentalinszenierung.',
    discoveries: [
      {
        label: 'Diktatur aufbauen',
        title: 'Berlin 1933',
        text: 'Mit dem Ermächtigungsgesetz kann die Regierung Gesetze ohne Parlament beschließen. Terror gegen Gegner und die Ausschaltung der Länder machen aus der Republik rasch eine Diktatur.',
      },
      {
        label: 'Ausgrenzung',
        title: 'Die Nürnberger Gesetze',
        text: '1935 entziehen die Nürnberger Gesetze jüdischen Deutschen zentrale Bürgerrechte und verbieten Ehen mit als deutschblütig bezeichneten Menschen. Verfolgung wird damit systematisch in staatliches Recht gegossen.',
      },
    ],
    quiz: [
      {
        question: 'Wozu dient das Ermächtigungsgesetz von 1933?',
        options: [
          'Es ermöglicht Regieren ohne parlamentarische Zustimmung',
          'Es führt freie Gewerkschaften ein',
          'Es beendet die Aufrüstung',
        ],
        correctIndex: 0,
        explanation:
          'Das Gesetz wird zu einem zentralen Werkzeug für die Ausschaltung der parlamentarischen Demokratie.',
      },
      {
        question: 'Was bewirken die Nürnberger Gesetze?',
        options: [
          'Sie entrechten jüdische Menschen',
          'Sie stellen alle Bürger rechtlich gleich',
          'Sie gründen den Völkerbund',
        ],
        correctIndex: 0,
        explanation:
          'Die Gesetze machen die antisemitische Ausgrenzung zu staatlichem Recht.',
      },
    ],
  },
  {
    id: 10,
    shortTitle: 'Weltkrieg',
    title: 'Der Zweite Weltkrieg',
    date: '1939–1945',
    place: 'Europa und weltweite Kriegsschauplätze',
    people: 'Hitler, Churchill, Roosevelt und Stalin',
    imageTitle: 'Ein Krieg um die Welt',
    imageSubtitle:
      'Angriff, Besatzung und totale Mobilisierung verwüsten ganze Kontinente.',
    duration: 35,
    narration:
      'Wir schreiben den 1. September 1939. Deutschland überfällt Polen und entfesselt damit in Europa den Zweiten Weltkrieg. Hitler erobert zunächst große Gebiete, kann Großbritannien aber nicht bezwingen und greift 1941 die Sowjetunion an. Nach Japans Angriff auf Pearl Harbor treten auch die USA in den Krieg ein. Churchill, Roosevelt und Stalin verbünden sich gegen Hitler. 1945 kapitulieren Deutschland und später Japan. Mehr als 60 Millionen Menschen sind tot.',
    mapConcept:
      'Natürliche Weltkarte mit den Achsenmächten und Alliierten sowie wenigen datierten Frontbewegungen. Punkt 1 zeigt Warschau und den deutschen Angriff 1939, Punkt 2 Berlin und die Kapitulation 1945.',
    mapDetails: [
      '1 · Warschau · deutscher Überfall 1939',
      '2 · Berlin · Kriegsende in Europa 1945',
      'Wichtige Fronten in Europa, Nordafrika und im Pazifik',
    ],
    imageConcept:
      'Sachliche Montage aus zerstörter europäischer Stadt, alliierten Planungen und heimkehrenden Zivilisten; keine heroische Kampfszene und keine drastischen Opferbilder.',
    discoveries: [
      {
        label: 'Kriegsbeginn',
        title: 'Warschau 1939',
        text: 'Der deutsche Überfall auf Polen beginnt am 1. September 1939. Großbritannien und Frankreich erklären Deutschland daraufhin den Krieg; Polen wird zugleich von der Sowjetunion von Osten angegriffen.',
      },
      {
        label: 'Kriegsende',
        title: 'Berlin 1945',
        text: 'Nach der Einnahme Berlins kapituliert die deutsche Wehrmacht im Mai 1945 bedingungslos. In Asien endet der Krieg erst im September nach den Atombombenabwürfen und Japans Kapitulation.',
      },
    ],
    quiz: [
      {
        question: 'Welches Ereignis beginnt 1939 den Krieg in Europa?',
        options: [
          'Der deutsche Überfall auf Polen',
          'Die Berliner Blockade',
          'Die Kubakrise',
        ],
        correctIndex: 0,
        explanation:
          'Mit dem Angriff auf Polen beginnt der von Deutschland entfesselte Krieg in Europa.',
      },
      {
        question:
          'Welche Staaten bilden den Kern der späteren großen Allianz gegen Hitler?',
        options: [
          'Großbritannien, USA und Sowjetunion',
          'Deutschland, Italien und Japan',
          'Spanien, Portugal und Schweden',
        ],
        correctIndex: 0,
        explanation:
          'Churchill, Roosevelt und Stalin führen die wichtigsten Mächte der Anti-Hitler-Koalition.',
      },
    ],
  },
  {
    id: 11,
    shortTitle: 'Holocaust',
    title: 'Der Holocaust',
    date: '1941–1945',
    place: 'Das besetzte Europa',
    people: 'Jüdische Opfer, Verfolgte, Täter und Helfer',
    imageTitle: 'Verfolgung wird Massenmord',
    imageSubtitle:
      'Das nationalsozialistische Deutschland ermordet Europas Juden.',
    duration: 34,
    narration:
      'Jetzt kommen wir zum dunkelsten Kapitel dieser Episode. Hier gibt es nichts schönzureden. Das nationalsozialistische Deutschland macht aus Verfolgung systematischen Massenmord. Einsatzgruppen erschießen jüdische Familien, Deportationszüge bringen Menschen in Ghettos, Konzentrations- und Vernichtungslager. In Auschwitz-Birkenau und anderen Lagern werden Millionen ermordet. Etwa sechs Millionen Juden fallen dem Holocaust zum Opfer. Auch Sinti und Roma sowie weitere verfolgte Gruppen werden getötet.',
    mapConcept:
      'Zurückhaltende Europakarte mit Deportationswegen und ausgewählten Tatorten. Punkt 1 zeigt Babyn Jar bei Kyiv als Ort der Massenerschießungen 1941, Punkt 2 Auschwitz-Birkenau als größtes deutsches Vernichtungs- und Konzentrationslager.',
    mapDetails: [
      '1 · Babyn Jar · Massenerschießungen 1941',
      '2 · Auschwitz-Birkenau · Vernichtungslager',
      'Deportationswege ohne dekorative Animation',
    ],
    imageConcept:
      'Würdige, nicht drastische Szene mit verlassenen persönlichen Gegenständen, Deportationslisten und Bahnrampe in großer Distanz; keine Täterinszenierung und keine erfundenen Einzelschicksale.',
    discoveries: [
      {
        label: 'Massenerschießungen',
        title: 'Babyn Jar 1941',
        text: 'In der Schlucht Babyn Jar bei Kyiv erschießen deutsche Einheiten Ende September 1941 innerhalb von zwei Tagen mehr als 33.000 jüdische Menschen. Weitere Opfergruppen folgen.',
      },
      {
        label: 'Vernichtungslager',
        title: 'Auschwitz-Birkenau',
        text: 'Auschwitz-Birkenau wird zum größten nationalsozialistischen Konzentrations- und Vernichtungslager. Die meisten dorthin deportierten Juden werden unmittelbar nach ihrer Ankunft ermordet.',
      },
    ],
    quiz: [
      {
        question: 'Was bezeichnet der Begriff Holocaust?',
        options: [
          'Den systematischen Mord an etwa sechs Millionen europäischen Juden',
          'Nur eine einzelne Schlacht',
          'Die Teilung Deutschlands nach 1945',
        ],
        correctIndex: 0,
        explanation:
          'Der Holocaust ist die systematische Verfolgung und Ermordung der europäischen Juden durch das nationalsozialistische Deutschland und seine Helfer.',
      },
      {
        question: 'Wo finden nationalsozialistische Massenmorde statt?',
        options: [
          'Bei Erschießungen und in Vernichtungslagern',
          'Nur in einer einzigen Stadt',
          'Ausschließlich nach dem Krieg',
        ],
        correctIndex: 0,
        explanation:
          'Die Täter morden an vielen Orten: bei Massenerschießungen, in Ghettos und in eigens errichteten Vernichtungslagern.',
      },
    ],
  },
  {
    id: 12,
    shortTitle: 'Kalter Krieg',
    title: 'Supermächte im Kalten Krieg',
    date: '1945–1962',
    place: 'Berlin, Europa und Kuba',
    people: 'Truman, Stalin, Kennedy und Chruschtschow',
    imageTitle: 'Die Welt am atomaren Abgrund',
    imageSubtitle:
      'USA und Sowjetunion ringen um Macht, ohne direkt Krieg zu führen.',
    duration: 34,
    narration:
      'Nach 1945 ist der große Krieg vorbei – friedlich wird die Welt trotzdem nicht. Die USA und die Sowjetunion werden zu rivalisierenden Supermächten, Europa und Deutschland teilen sich in zwei Machtblöcke. 1948 lässt Stalin West-Berlin blockieren; die Westmächte versorgen die Stadt aus der Luft. Beide Seiten rüsten atomar auf. 1962 bringen sowjetische Raketen auf Kuba die Welt beinahe in einen Atomkrieg. Kennedy und Chruschtschow lenken schließlich ein.',
    mapConcept:
      'Natürliche Nordatlantik- und Europakarte mit den Machtblöcken. Punkt 1 zeigt West-Berlin und die Luftbrücke 1948/49, Punkt 2 Kuba und die Raketenkrise 1962.',
    mapDetails: [
      '1 · West-Berlin · Blockade und Luftbrücke 1948/49',
      '2 · Kuba · Raketenkrise 1962',
      'NATO und Warschauer Pakt als zeitbezogene Flächen',
    ],
    imageConcept:
      'Ein Rosinenbomber über West-Berlin blendet in eine angespannte Lagebesprechung während der Kubakrise über; keine explodierenden Atomwaffen.',
    discoveries: [
      {
        label: 'Blockade',
        title: 'West-Berlin 1948',
        text: 'Die Sowjetunion sperrt die Land- und Wasserwege nach West-Berlin. Die westlichen Alliierten reagieren mit einer fast einjährigen Luftbrücke und vermeiden so eine direkte militärische Konfrontation.',
      },
      {
        label: 'Atomkrise',
        title: 'Kuba 1962',
        text: 'Sowjetische Atomraketen auf Kuba bedrohen unmittelbar die USA. Nach gefährlichen Tagen vereinbaren beide Seiten einen Rückzug und richten später bessere direkte Kommunikationswege ein.',
      },
    ],
    quiz: [
      {
        question: 'Wie reagieren die Westmächte auf die Berlin-Blockade?',
        options: [
          'Mit einer Luftbrücke',
          'Mit der Aufgabe Berlins',
          'Mit einem Angriff auf Moskau',
        ],
        correctIndex: 0,
        explanation:
          'Flugzeuge versorgen West-Berlin fast ein Jahr lang mit Lebensmitteln, Kohle und anderen Gütern.',
      },
      {
        question: 'Warum ist die Kubakrise besonders gefährlich?',
        options: [
          'Die Supermächte stehen kurz vor einem Atomkrieg',
          'Sie beendet sofort den Kalten Krieg',
          'Es gibt damals noch keine Atomwaffen',
        ],
        correctIndex: 0,
        explanation:
          'Atomraketen und militärische Alarmbereitschaft bringen USA und Sowjetunion einer direkten Konfrontation sehr nahe.',
      },
    ],
  },
  {
    id: 13,
    shortTitle: 'Unabhängigkeit',
    title: 'Kolonialreiche zerfallen',
    date: '1947–1975',
    place: 'Asien und Afrika',
    people: 'Gandhi, Unabhängigkeitsbewegungen und Kolonialmächte',
    imageTitle: 'Neue Staaten entstehen',
    imageSubtitle:
      'Unabhängigkeit beendet politische Herrschaft, nicht alle Abhängigkeiten.',
    duration: 34,
    narration:
      'Nach dem Zweiten Weltkrieg sagen immer mehr Menschen der europäischen Kolonialherrschaft: Jetzt reicht es. Indien wird 1947 unabhängig. Gandhis gewaltloser Widerstand prägt die Bewegung, doch die Teilung in Indien und Pakistan führt zu Flucht und Gewalt. Auch in Afrika entstehen neue Staaten: Ghana wird 1957 unabhängig, 1960 folgen gleich siebzehn weitere. Die Kolonialherrschaft endet – wirtschaftliche Abhängigkeiten und ziemlich willkürlich gezogene Grenzen bleiben allerdings häufig bestehen.',
    mapConcept:
      'Natürliche Weltkarte mit zeitlich gestaffelten Unabhängigkeiten. Punkt 1 zeigt Neu-Delhi und Indiens Unabhängigkeit 1947, Punkt 2 Accra und Ghanas Unabhängigkeit 1957.',
    mapDetails: [
      '1 · Neu-Delhi · Unabhängigkeit Indiens 1947',
      '2 · Accra · Unabhängigkeit Ghanas 1957',
      'Dekolonisierung in Asien und Afrika bis 1975',
    ],
    imageConcept:
      'Feiernde erwachsene Menschen bei Unabhängigkeitszeremonien in Indien und Ghana, verbunden mit Karten und neuen Flaggen; keine erfundenen Porträts der berühmten Akteure.',
    discoveries: [
      {
        label: 'Südasien',
        title: 'Indien wird unabhängig',
        text: 'Am 15. August 1947 endet die britische Kolonialherrschaft in Indien. Gleichzeitig entstehen Indien und Pakistan; die Teilung löst gewaltige Fluchtbewegungen und religiöse Gewalt aus.',
      },
      {
        label: 'Westafrika',
        title: 'Ghana 1957',
        text: 'Ghana wird 1957 als erstes Land südlich der Sahara in der Nachkriegszeit unabhängig von einer europäischen Kolonialmacht. Der Erfolg stärkt weitere afrikanische Unabhängigkeitsbewegungen.',
      },
    ],
    quiz: [
      {
        question: 'Was begleitet die Unabhängigkeit Indiens 1947?',
        options: [
          'Die Teilung in Indien und Pakistan',
          'Der Beitritt zum Römischen Reich',
          'Die Gründung der Europäischen Gemeinschaft',
        ],
        correctIndex: 0,
        explanation:
          'Die britische Kolonie wird in zwei Staaten geteilt; Flucht und Gewalt begleiten diesen Prozess.',
      },
      {
        question:
          'Was bleibt nach dem Ende der Kolonialherrschaft häufig bestehen?',
        options: [
          'Wirtschaftliche Abhängigkeiten und problematische Grenzen',
          'Die direkte Herrschaft aller europäischen Gouverneure',
          'Eine einzige Regierung für Afrika und Asien',
        ],
        correctIndex: 0,
        explanation:
          'Politische Unabhängigkeit beseitigt nicht automatisch wirtschaftliche Abhängigkeiten oder kolonial gezogene Grenzen.',
      },
    ],
  },
  {
    id: 14,
    shortTitle: 'Asien',
    title: 'China, Korea und Vietnam',
    date: '1949–1975',
    place: 'Ost- und Südostasien',
    people: 'Mao Zedong und die beteiligten Großmächte',
    imageTitle: 'Der Kalte Krieg wird heiß',
    imageSubtitle: 'Revolution und Stellvertreterkriege verändern Asien.',
    duration: 35,
    narration:
      'Wir schreiben das Jahr 1949. Nach dem kommunistischen Sieg im Bürgerkrieg ruft Mao Zedong die Volksrepublik China aus. Seine Kampagnen verändern das Land radikal und kosten Millionen Menschen das Leben. Gleich nebenan kämpfen ab 1950 Nord- und Südkorea mit ausländischer Hilfe. In Vietnam scheitern erst Frankreich und dann die USA. 1975 siegt der kommunistische Norden – der Kalte Krieg ist in Asien also alles andere als kalt.',
    mapConcept:
      'Natürliche Ostasienkarte mit den Teilungen Koreas und Vietnams. Punkt 1 zeigt Beijing und die Gründung der Volksrepublik 1949, Punkt 2 Saigon und das Kriegsende 1975. Korea erscheint ohne zusätzliche Nummer.',
    mapDetails: [
      '1 · Beijing · Volksrepublik China 1949',
      '2 · Saigon · Kriegsende 1975',
      'Geteiltes Korea und geteiltes Vietnam',
    ],
    imageConcept:
      'Beijing 1949 blendet in eine erschöpfte vietnamesische Stadt 1975 über; politische Symbole sparsam, keine propagandistische Darstellung und keine drastische Gewalt.',
    discoveries: [
      {
        label: 'China',
        title: 'Beijing 1949',
        text: 'Am 1. Oktober 1949 ruft Mao Zedong in Beijing die Volksrepublik China aus. Die unterlegene nationalistische Regierung zieht sich nach Taiwan zurück; der Konflikt bleibt ungelöst.',
      },
      {
        label: 'Vietnam',
        title: 'Saigon 1975',
        text: 'Mit der Einnahme Saigons durch nordvietnamesische Truppen endet 1975 der Vietnamkrieg. Das Land wird unter kommunistischer Führung vereinigt; Millionen Menschen waren zuvor getötet, verletzt oder vertrieben worden.',
      },
    ],
    quiz: [
      {
        question: 'Wer gründet 1949 die Volksrepublik China?',
        options: ['Mao Zedong', 'Abraham Lincoln', 'Michail Gorbatschow'],
        correctIndex: 0,
        explanation:
          'Nach dem Sieg der Kommunisten im chinesischen Bürgerkrieg ruft Mao die Volksrepublik aus.',
      },
      {
        question: 'Warum gelten Korea und Vietnam als Stellvertreterkriege?',
        options: [
          'Die Supermächte unterstützen gegnerische Seiten',
          'Dort kämpfen nur europäische Ritter',
          'Beide Kriege finden ohne ausländische Beteiligung statt',
        ],
        correctIndex: 0,
        explanation:
          'USA, Sowjetunion und China unterstützen jeweils unterschiedliche Seiten, ohne einen direkten großen Krieg gegeneinander zu führen.',
      },
    ],
  },
  {
    id: 15,
    shortTitle: 'Europa',
    title: 'Europa wächst zusammen und die Mauer fällt',
    date: '1957–1991',
    place: 'Westeuropa, Berlin und Sowjetunion',
    people: 'Europäische Regierungen und Michail Gorbatschow',
    imageTitle: 'Grenzen verlieren ihre Härte',
    imageSubtitle:
      'Zusammenarbeit im Westen und Reformen im Osten verändern Europa.',
    duration: 35,
    narration:
      'Jetzt versucht Europa, Streit einmal anders zu lösen. 1957 gründen sechs Staaten in Rom die Europäische Wirtschaftsgemeinschaft. Gemeinsame Regeln und Handel sollen Wohlstand fördern und neue Kriege verhindern. Der Kontinent bleibt trotzdem geteilt, sichtbar vor allem an der Berliner Mauer. In den 1980er Jahren reformiert Michail Gorbatschow die Sowjetunion. 1989 fällt die Mauer, 1990 wird Deutschland vereinigt, 1991 zerfällt die Sowjetunion. Der Kalte Krieg ist vorbei.',
    mapConcept:
      'Natürliche Europakarte mit der Erweiterung der europäischen Gemeinschaft und der Blockteilung. Punkt 1 zeigt Rom und die Verträge von 1957, Punkt 2 Berlin und den Mauerfall 1989.',
    mapDetails: [
      '1 · Rom · Gründungsverträge 1957',
      '2 · Berlin · Mauerfall 1989',
      'Europäische Gemeinschaft und Ost-West-Teilung',
    ],
    imageConcept:
      'Unterzeichnung der Römischen Verträge blendet in eine freudige, aber dokumentarische Szene an der geöffneten Berliner Mauer über; ausschließlich erwachsene anonyme Personen im Vordergrund.',
    discoveries: [
      {
        label: 'Zusammenarbeit',
        title: 'Die Römischen Verträge',
        text: 'Belgien, Frankreich, Italien, Luxemburg, die Niederlande und die Bundesrepublik Deutschland gründen 1957 die Europäische Wirtschaftsgemeinschaft. Aus ihr entwickelt sich später die Europäische Union.',
      },
      {
        label: 'Teilung überwinden',
        title: 'Der Mauerfall 1989',
        text: 'Friedliche Proteste, Ausreisewellen und Reformen in der Sowjetunion setzen die DDR-Führung unter Druck. Am 9. November 1989 werden die Berliner Grenzübergänge geöffnet.',
      },
    ],
    quiz: [
      {
        question:
          'Welches Ziel verfolgt die europäische Zusammenarbeit nach 1945?',
        options: [
          'Wohlstand fördern und neue Kriege verhindern',
          'Die Kolonialreiche wiederherstellen',
          'Europa in zwei neue Kaiserreiche teilen',
        ],
        correctIndex: 0,
        explanation:
          'Wirtschaftliche und politische Zusammenarbeit soll Interessen verbinden und Konflikte friedlich lösen.',
      },
      {
        question: 'Welche Entwicklung erleichtert den Mauerfall?',
        options: [
          'Proteste und Gorbatschows Reformpolitik',
          'Der Bau weiterer Grenzanlagen',
          'Die Rückkehr Napoleons',
        ],
        correctIndex: 0,
        explanation:
          'Friedliche Proteste in der DDR treffen auf eine Sowjetunion, die militärisches Eingreifen nicht mehr erzwingt.',
      },
    ],
  },
  {
    id: 16,
    shortTitle: 'Gegenwart',
    title: 'Die vernetzte Gegenwart',
    date: '1991–heute',
    place: 'Die global vernetzte Welt',
    people: 'Staaten, Unternehmen und Milliarden vernetzte Menschen',
    imageTitle: 'Die Welt rückt zusammen',
    imageSubtitle:
      'Daten, Waren und Krisen überschreiten Grenzen in hoher Geschwindigkeit.',
    duration: 36,
    narration:
      'Und damit sind wir fast in deiner Gegenwart angekommen. Seit 1991 verbinden Internet, Handel und weltweite Lieferketten Menschen und Märkte immer enger. Die Anschläge vom 11. September 2001 führen zu neuen Kriegen, 2008 erschüttert eine Finanzkrise die Weltwirtschaft. Ab 2020 zeigt die Corona-Pandemie, wie schnell sich auch Krisen verbreiten. 2022 beginnt Russlands Großangriff auf die Ukraine. Vernetzung schafft Möglichkeiten – leider warten ihre Probleme selten ordentlich an Grenzen.',
    mapConcept:
      'Natürliche Weltkarte mit wenigen Netzwerk- und Konfliktlinien. Punkt 1 zeigt New York und die Anschläge von 2001, Punkt 2 Kyiv und den russischen Großangriff von 2022. Globale Daten- und Handelsverbindungen bleiben zurückhaltend.',
    mapDetails: [
      '1 · New York · Anschläge 2001',
      '2 · Kyiv · russischer Großangriff 2022',
      'Globale Daten-, Handels- und Liefernetze',
    ],
    imageConcept:
      'Helle, sachliche Gegenwartsmontage mit Unterseekabeln, Containerschiff, Videokonferenz und einer entfernten beschädigten Stadt; keine erfundenen politischen Porträts.',
    discoveries: [
      {
        label: 'Einschnitt',
        title: 'New York 2001',
        text: 'Die Terroranschläge vom 11. September 2001 töten fast 3.000 Menschen. Die USA beginnen daraufhin Kriege in Afghanistan und später im Irak; Sicherheitspolitik und Überwachung verändern sich weltweit.',
      },
      {
        label: 'Krieg in Europa',
        title: 'Kyiv 2022',
        text: 'Am 24. Februar 2022 beginnt Russland seinen großangelegten Angriff auf die Ukraine. Der Krieg zerstört Städte, vertreibt Millionen Menschen und verändert die europäische Sicherheitsordnung.',
      },
    ],
    quiz: [
      {
        question:
          'Was macht Krisen der Gegenwart häufig besonders weitreichend?',
        options: [
          'Die enge globale Vernetzung',
          'Das Ende aller Handelswege',
          'Die vollständige politische Einheit der Welt',
        ],
        correctIndex: 0,
        explanation:
          'Lieferketten, Finanzmärkte, Reisen und digitale Netze übertragen Folgen schnell über viele Grenzen hinweg.',
      },
      {
        question: 'Welches Ereignis beginnt am 24. Februar 2022?',
        options: [
          'Russlands großangelegter Angriff auf die Ukraine',
          'Der Fall der Berliner Mauer',
          'Die Gründung der Europäischen Wirtschaftsgemeinschaft',
        ],
        correctIndex: 0,
        explanation:
          'Russland weitet seinen seit 2014 bestehenden Krieg gegen die Ukraine 2022 zu einem großangelegten Angriff aus.',
      },
    ],
  },
];

const italyScene: Partial<HistoriaScene> = {
  shortTitle: 'Italien',
  title: 'Italien wird geeint',
  date: '1859–1870',
  place: 'Turin, Sizilien und Rom',
  people: 'Cavour, Garibaldi und Viktor Emanuel II.',
  imageTitle: 'Ein Parlament für Italien',
  imageSubtitle:
    '1861 tritt in Turin das erste Parlament des neuen Königreichs zusammen.',
  duration: 41,
  narration:
    'Wir bleiben im 19. Jahrhundert und reisen nach Italien. Die Halbinsel besteht noch aus mehreren Staaten, doch die Bewegung des Risorgimento drängt auf Einheit. Ministerpräsident Cavour verbindet Diplomatie mit Krieg, Garibaldis Freiwillige erobern Sizilien und den Süden. 1861 entsteht das Königreich Italien unter Viktor Emanuel dem Zweiten. Vollständig ist es noch nicht: Venetien kommt 1866 hinzu, Rom 1870. Die Einheit wächst also Schritt für Schritt – und aus sehr verschiedenen politischen Kräften.',
  audio: `${episode3Asset}/SprechertexteE3/neue/4.m4a`,
  mainImage: `${episode3Asset}/secondary/scene04-italy.jpg`,
  mapImage: `${episode3Asset}/maps/scene04-italy.svg?v=20260914a`,
  mapConcept:
    'Italienkarte mit Turin als Ort der Staatsgründung 1861 und Rom als Abschluss der Einigung 1870.',
  mapDetails: [
    '1 · Turin · Königreich Italien 1861',
    '2 · Rom · Teil Italiens ab 1870',
    'Venetien kommt 1866 hinzu',
  ],
  discoveries: [
    {
      label: 'Staatsgründung',
      title: 'Turin 1861',
      text: 'Im März 1861 tritt in Turin das erste gesamtitalienische Parlament zusammen. Viktor Emanuel II. wird König von Italien; Venetien und Rom gehören noch nicht dazu.',
    },
    {
      label: 'Vollendung',
      title: 'Rom 1870',
      text: 'Als französische Truppen Rom im Krieg gegen Preußen nicht länger schützen, besetzen italienische Soldaten die Stadt. Rom wird Teil des Königreichs und später Hauptstadt.',
    },
  ],
  quiz: [
    {
      question: 'Wann entsteht das Königreich Italien?',
      options: ['1861', '1815', '1914'],
      correctIndex: 0,
      explanation:
        '1861 wird das Königreich Italien ausgerufen; Venetien und Rom folgen später.',
    },
    {
      question: 'Welche Kräfte tragen zur Einigung bei?',
      options: [
        'Diplomatie, Freiwilligenbewegung und Krieg',
        'Nur eine Entscheidung des Papstes',
        'Ausschließlich eine Volksabstimmung in Rom',
      ],
      correctIndex: 0,
      explanation:
        'Cavours Politik, Garibaldis Freiwillige und militärische Konflikte wirken zusammen.',
    },
  ],
};

const bismarckScene: HistoriaScene = {
  id: 5,
  shortTitle: 'Bismarck',
  title: 'Bismarck und die Gründung des Deutschen Reichs',
  date: '1862–1871',
  place: 'Preußen, Mitteleuropa und Versailles',
  people: 'Otto von Bismarck und Wilhelm I.',
  imageTitle: 'Kaiserproklamation in Versailles',
  imageSubtitle:
    '1871 entsteht ein deutscher Nationalstaat unter preußischer Führung.',
  duration: 43,
  narration:
    'Nördlich der Alpen verfolgt Preußens Ministerpräsident Otto von Bismarck einen anderen Weg zur nationalen Einheit. Konflikte mit Dänemark 1864, Österreich 1866 und Frankreich 1870 und 1871 stärken Preußens Führung. Während des Kriegs gegen Frankreich rufen deutsche Fürsten Wilhelm den Ersten im Schloss Versailles zum Kaiser aus. Das neue Deutsche Reich schließt Österreich aus und besitzt ein Parlament, doch Kaiser und Regierung behalten große Macht. Nationale Einheit und demokratische Mitbestimmung sind also nicht dasselbe.',
  audio: `${episode3Asset}/SprechertexteE3/neue/5.m4a`,
  mainImage: `${episode3Asset}/secondary/scene05-bismarck.jpg`,
  mapImage: `${episode3Asset}/maps/scene05-bismarck.svg?v=20260914a`,
  mapConcept:
    'Mitteleuropakarte mit Berlin als preußischem Machtzentrum und Versailles als Ort der Kaiserproklamation 1871.',
  mapDetails: [
    '1 · Berlin · preußisches Machtzentrum',
    '2 · Versailles · Kaiserproklamation 1871',
    'Deutsches Reich ohne Österreich',
  ],
  discoveries: [
    {
      label: 'Machtpolitik',
      title: 'Berlin und Preußen',
      text: 'Bismarck regiert seit 1862 als preußischer Ministerpräsident. Durch Diplomatie und drei Kriege stärkt er Preußens Vorrang unter den deutschen Staaten.',
    },
    {
      label: 'Reichsgründung',
      title: 'Versailles 1871',
      text: 'Am 18. Januar 1871 wird Wilhelm I. im Schloss Versailles zum deutschen Kaiser ausgerufen. Der Ort mitten im Krieg gegen Frankreich belastet das Verhältnis beider Staaten.',
    },
  ],
  quiz: [
    {
      question: 'Welcher Staat führt die deutsche Einigung an?',
      options: ['Preußen', 'Österreich', 'Frankreich'],
      correctIndex: 0,
      explanation:
        'Bismarcks Politik macht Preußen zur führenden Macht im neuen Deutschen Reich.',
    },
    {
      question: 'Was entsteht 1871?',
      options: [
        'Ein deutscher Nationalstaat ohne Österreich',
        'Eine gemeinsame Republik mit Frankreich',
        'Die Europäische Wirtschaftsgemeinschaft',
      ],
      correctIndex: 0,
      explanation:
        'Das Deutsche Reich wird unter preußischer Führung und ohne Österreich gegründet.',
    },
  ],
};

const coldWarScene: Partial<HistoriaScene> = {
  shortTitle: 'Luftbrücke',
  title: 'Kalter Krieg und Berliner Luftbrücke',
  date: '1945–1949',
  place: 'Europa und Berlin',
  people: 'USA, Sowjetunion, Westallierte und Berliner Bevölkerung',
  imageTitle: 'Versorgung aus der Luft',
  imageSubtitle:
    'Die Westalliierten versorgen West-Berlin während der sowjetischen Blockade.',
  duration: 42,
  narration:
    'Nach 1945 zerfällt das Bündnis gegen Hitler. Die USA und die Sowjetunion stehen für gegensätzliche politische und wirtschaftliche Ordnungen; Europa teilt sich in zwei Machtblöcke. 1948 sperrt die Sowjetunion die Landwege nach West-Berlin. Die Westalliierten antworten mit einer Luftbrücke und bringen fast ein Jahr lang Lebensmittel und Kohle in die Stadt. Die Blockade scheitert, doch die Teilung vertieft sich. Aus Deutschland entstehen 1949 zwei Staaten – mitten in einem nun kalten Konflikt.',
  audio: `${episode3Asset}/SprechertexteE3/neue/14.m4a`,
  mapImage: `${episode3Asset}/maps/scene13-airlift.svg?v=20260914a`,
  mapConcept:
    'Europakarte mit den westlichen Besatzungszonen und West-Berlin sowie den Luftkorridoren während der Blockade.',
  mapDetails: [
    '1 · Frankfurt am Main · westliche Luftstützpunkte',
    '2 · West-Berlin · Versorgung 1948/49',
    'Luftkorridore durch die sowjetische Besatzungszone',
  ],
  discoveries: [
    {
      label: 'Konfrontation',
      title: 'Geteiltes Europa',
      text: 'Die USA und die Sowjetunion werden nach 1945 zu rivalisierenden Supermächten. Militärbündnisse, Aufrüstung und politische Kontrolle verfestigen die Teilung Europas.',
    },
    {
      label: 'Versorgung',
      title: 'West-Berlin 1948/49',
      text: 'Während der Blockade landen in kurzen Abständen Transportflugzeuge in West-Berlin. Sie bringen Lebensmittel, Kohle und andere Güter, bis die Sowjetunion die Sperre im Mai 1949 beendet.',
    },
  ],
  quiz: [
    {
      question: 'Warum entsteht 1948 die Berliner Luftbrücke?',
      options: [
        'Die Landwege nach West-Berlin sind blockiert',
        'Berlin soll nach Amerika verlegt werden',
        'Der Zweite Weltkrieg beginnt',
      ],
      correctIndex: 0,
      explanation:
        'Die Westalliierten versorgen West-Berlin aus der Luft, nachdem die Sowjetunion die Landwege sperrt.',
    },
    {
      question: 'Was kennzeichnet den Kalten Krieg?',
      options: [
        'Rivalität zweier Machtblöcke ohne direkten großen Krieg der Supermächte',
        'Vollständige weltweite Friedenszeit',
        'Ein Bündnis aller Staaten unter einer Regierung',
      ],
      correctIndex: 0,
      explanation:
        'USA und Sowjetunion vermeiden einen direkten großen Krieg, tragen ihre Rivalität aber weltweit aus.',
    },
  ],
};

const cubaScene: HistoriaScene = {
  id: 14,
  shortTitle: 'Kubakrise',
  title: 'Die Kubakrise bringt die Welt an den Abgrund',
  date: 'Oktober 1962',
  place: 'Kuba, Washington und Moskau',
  people: 'John F. Kennedy, Nikita Chruschtschow und Fidel Castro',
  imageTitle: 'Dreizehn Tage unter höchster Spannung',
  imageSubtitle:
    'Kennedy und seine Berater prüfen Luftbilder sowjetischer Raketenstellungen.',
  duration: 42,
  narration:
    'Im Oktober 1962 entdecken amerikanische Aufklärungsflugzeuge sowjetische Atomraketen auf Kuba – nur wenige Flugminuten von den USA entfernt. Präsident Kennedy verhängt eine Seeblockade, die er Quarantäne nennt. Dreizehn Tage lang droht die Krise zu einem Atomkrieg zu eskalieren. Schließlich zieht die Sowjetunion ihre Raketen ab. Die USA versprechen, Kuba nicht anzugreifen, und entfernen später heimlich eigene Raketen aus der Türkei. Beide Seiten erkennen, wie knapp Abschreckung und Katastrophe beieinanderliegen.',
  audio: `${episode3Asset}/SprechertexteE3/neue/15.m4a`,
  mainImage: `${episode3Asset}/secondary/scene14-cuba.jpg`,
  mapImage: `${episode3Asset}/maps/scene14-cuba.svg?v=20260914a`,
  mapConcept:
    'Atlantikkarte mit Washington und Kuba, sowjetischem Transportweg und amerikanischem Sperrring.',
  mapDetails: [
    '1 · Washington · Krisenentscheidung',
    '2 · Kuba · sowjetische Raketenstellungen',
    'Seesperre und sowjetische Transportroute',
  ],
  discoveries: [
    {
      label: 'Entdeckung',
      title: 'Raketen auf Kuba',
      text: 'Luftbilder zeigen im Oktober 1962 den Aufbau sowjetischer Raketenstellungen. Ihre Nähe zu den USA verändert das militärische Gleichgewicht und löst die Krise aus.',
    },
    {
      label: 'Kompromiss',
      title: 'Washington und Moskau',
      text: 'Kennedy und Chruschtschow finden einen Ausweg: sowjetische Raketen verlassen Kuba, die USA versprechen keinen Angriff und bauen später ihre Jupiter-Raketen in der Türkei ab.',
    },
  ],
  quiz: [
    {
      question: 'Was löst die Kubakrise 1962 aus?',
      options: [
        'Sowjetische Atomraketen auf Kuba',
        'Die Berliner Luftbrücke',
        'Der Fall der Berliner Mauer',
      ],
      correctIndex: 0,
      explanation:
        'US-Luftbilder belegen den Aufbau sowjetischer Raketenstellungen auf Kuba.',
    },
    {
      question: 'Wie endet die unmittelbare Krise?',
      options: [
        'Mit einem ausgehandelten gegenseitigen Nachgeben',
        'Mit einem Atomkrieg',
        'Mit der Besetzung Moskaus',
      ],
      correctIndex: 0,
      explanation:
        'Beide Seiten machen Zusagen und ziehen gefährliche Waffen zurück.',
    },
  ],
};

const ewgScene: Partial<HistoriaScene> = {
  shortTitle: 'EWG',
  title: 'Westeuropa wächst wirtschaftlich zusammen',
  date: '1951–1957',
  place: 'Paris, Luxemburg und Rom',
  people:
    'Belgien, Bundesrepublik, Frankreich, Italien, Luxemburg und Niederlande',
  imageTitle: 'Die Verträge von Rom',
  imageSubtitle:
    'Sechs Staaten gründen 1957 die Europäische Wirtschaftsgemeinschaft.',
  duration: 41,
  narration:
    'Nach zwei Weltkriegen suchen sechs westeuropäische Staaten einen neuen Weg: Sie wollen wichtige Industrien und Märkte so eng verbinden, dass ein neuer Krieg schwieriger wird. 1951 entsteht die Gemeinschaft für Kohle und Stahl. Mit den Römischen Verträgen gründen Belgien, die Bundesrepublik Deutschland, Frankreich, Italien, Luxemburg und die Niederlande 1957 die Europäische Wirtschaftsgemeinschaft. Zölle sollen fallen, Handel und Zusammenarbeit wachsen. Daraus entwickelt sich später die Europäische Union – langsam, vertraglich und nicht ohne Streit.',
  audio: `${episode3Asset}/SprechertexteE3/neue/18.m4a`,
  mainImage: `${episode3Asset}/secondary/scene17-ewg.jpg`,
  secondaryImage: undefined,
  secondaryImageTitle: undefined,
  secondaryImageSubtitle: undefined,
  mapImage: `${episode3Asset}/maps/scene17-ewg.svg?v=20260914a`,
  mapConcept:
    'Europakarte mit den sechs EWG-Gründungsstaaten und den Vertragsorten Paris und Rom.',
  mapDetails: [
    '1 · Paris · Montanunion 1951',
    '2 · Rom · EWG-Verträge 1957',
    'Sechs Gründungsstaaten in Westeuropa',
  ],
  discoveries: [
    {
      label: 'Erster Schritt',
      title: 'Kohle und Stahl',
      text: 'Ab 1951 verwalten sechs Staaten Kohle- und Stahlmärkte gemeinsam. Gerade die für Krieg und Wiederaufbau wichtigen Industrien sollen nicht mehr rein national gegeneinander organisiert werden.',
    },
    {
      label: 'Gemeinsamer Markt',
      title: 'Rom 1957',
      text: 'Die Römischen Verträge schaffen die EWG. Die Mitgliedstaaten bauen Zölle ab und vereinbaren einen gemeinsamen Markt; daraus entwickelt sich später die Europäische Union.',
    },
  ],
  quiz: [
    {
      question: 'Was gründen sechs Staaten 1957?',
      options: [
        'Die Europäische Wirtschaftsgemeinschaft',
        'Den Warschauer Pakt',
        'Das Deutsche Kaiserreich',
      ],
      correctIndex: 0,
      explanation:
        'Die Römischen Verträge schaffen 1957 die Europäische Wirtschaftsgemeinschaft.',
    },
    {
      question: 'Welches Ziel verbindet die ersten Gemeinschaften?',
      options: [
        'Wirtschaftliche Zusammenarbeit und dauerhafter Frieden',
        'Neue Kolonien außerhalb Europas',
        'Die Abschaffung aller nationalen Regierungen',
      ],
      correctIndex: 0,
      explanation:
        'Gemeinsame Märkte sollen Wohlstand fördern und neue Kriege zwischen Mitgliedstaaten erschweren.',
    },
  ],
};

const reunificationScene: HistoriaScene = {
  id: 18,
  shortTitle: 'Einheit',
  title: 'Friedliche Revolution und Wiedervereinigung',
  date: '1985–1991',
  place: 'Leipzig, Berlin und Europa',
  people: 'DDR-Bürger, Michail Gorbatschow und deutsche Regierungen',
  imageTitle: 'Die Berliner Mauer öffnet sich',
  imageSubtitle:
    'Am 9. November 1989 fällt die Grenze – die staatliche Einheit folgt 1990.',
  duration: 43,
  narration:
    'In der Sowjetunion beginnt Michail Gorbatschow ab 1985 mit Reformen. In Polen, Ungarn und anderen Staaten gerät die kommunistische Herrschaft unter Druck. Auch in der DDR fordern immer mehr Menschen Freiheit und freie Wahlen. Friedliche Demonstrationen, besonders in Leipzig, wachsen Woche für Woche. Am 9. November 1989 öffnet sich überraschend die Berliner Mauer. Elf Monate später, am 3. Oktober 1990, wird Deutschland wiedervereinigt. 1991 zerfällt schließlich auch die Sowjetunion – Europas politische Karte verändert sich grundlegend.',
  audio: `${episode3Asset}/SprechertexteE3/neue/19.m4a`,
  mainImage: `${episode3Asset}/main/scene15.jpg`,
  secondaryImage: `${episode3Asset}/secondary/scene15.jpg`,
  secondaryImageTitle: 'Begegnung an der geöffneten Grenze',
  secondaryImageSubtitle:
    'Menschen aus Ost und West feiern gemeinsam am Brandenburger Tor.',
  mapImage: `${episode3Asset}/maps/scene18-reunification.svg?v=20260914a`,
  mapConcept:
    'Mitteleuropakarte mit Leipzig als Zentrum der Montagsdemonstrationen und Berlin als Ort von Mauerfall und staatlicher Einheit.',
  mapDetails: [
    '1 · Leipzig · Montagsdemonstrationen 1989',
    '2 · Berlin · Maueröffnung 1989',
    'Deutsche Wiedervereinigung 1990',
  ],
  discoveries: [
    {
      label: 'Friedliche Revolution',
      title: 'Leipzig 1989',
      text: 'Die Montagsdemonstrationen werden zu einem Zentrum der friedlichen Revolution. Trotz des Risikos staatlicher Gewalt fordern Zehntausende Reformen, Reisefreiheit und politische Rechte.',
    },
    {
      label: 'Zwei Daten',
      title: 'Berlin 1989 und 1990',
      text: 'Die Grenze öffnet sich am 9. November 1989. Die staatliche Wiedervereinigung folgt am 3. Oktober 1990 – Mauerfall und Einheit gehören zusammen, sind aber nicht dasselbe Ereignis.',
    },
  ],
  quiz: [
    {
      question: 'Was geschieht am 9. November 1989?',
      options: [
        'Die Berliner Mauer öffnet sich',
        'Die EWG wird gegründet',
        'Die Sowjetunion entsteht',
      ],
      correctIndex: 0,
      explanation:
        'Die Grenzübergänge in Berlin werden geöffnet; die staatliche Einheit folgt 1990.',
    },
    {
      question: 'Warum heißt der Umbruch in der DDR friedliche Revolution?',
      options: [
        'Massenproteste erzwingen Wandel weitgehend ohne Gewalt',
        'Eine ausländische Armee erobert Berlin',
        'Die DDR-Regierung verbietet alle Demonstrationen erfolgreich',
      ],
      correctIndex: 0,
      explanation:
        'Bürgerinnen und Bürger erreichen mit anhaltenden friedlichen Protesten tiefgreifenden politischen Wandel.',
    },
  ],
};

const weimarScene: Partial<HistoriaScene> = {
  shortTitle: 'Weimar',
  title: 'Die Weimarer Republik unter Druck',
  date: '1919–1932',
  place: 'Deutschland und Europa',
  people: 'Demokraten, Gegner der Republik und die Bevölkerung',
  imageTitle: 'Eine neue Demokratie',
  imageSubtitle: 'Frauen und Männer wählen 1919 die Nationalversammlung.',
  duration: 34,
  narration:
    'Wir schreiben das Jahr 1919. Deutschland bekommt eine demokratische Verfassung, und erstmals dürfen Frauen auf nationaler Ebene wählen. Doch einen ruhigen Start erlebt die Republik nicht: Niederlage, Versailler Vertrag und politische Gewalt belasten sie schwer. 1923 wird das Geld durch die Inflation beinahe wertlos. Danach stabilisiert sich die Lage für einige Jahre. Ab 1929 bringt die Weltwirtschaftskrise Massenarbeitslosigkeit und neue Not. Radikale Parteien gewinnen an Zustimmung, während demokratische Mehrheiten und das Vertrauen in den Staat zerbrechen.',
  audio: `${episode3Asset}/SprechertexteE3/neue/9.m4a`,
  mapConcept:
    'Karte Deutschlands und seiner Nachbarn nach 1919. Punkt 1 zeigt Versailles und den Friedensvertrag, Punkt 2 Berlin als Zentrum der demokratischen Republik und ihrer Krisen.',
  mapDetails: [
    '1 · Versailles · Friedensvertrag 1919',
    '2 · Berlin · Parlament und Regierung',
    'Deutschland in den Grenzen der Weimarer Republik',
  ],
  discoveries: [
    {
      label: 'Demokratischer Anfang',
      title: 'Wahlen 1919',
      text: 'Bei der Wahl zur Nationalversammlung dürfen erstmals alle Frauen und Männer ab 20 Jahren abstimmen. Die Weimarer Verfassung schafft eine parlamentarische Demokratie mit sozialen Grundrechten.',
    },
    {
      label: 'Krisen der Republik',
      title: 'Inflation und Arbeitslosigkeit',
      text: 'Die Inflation von 1923 vernichtet Ersparnisse. Ab 1929 verschärft die Weltwirtschaftskrise die Arbeitslosigkeit und stärkt Parteien, die die Demokratie beseitigen wollen.',
    },
  ],
  quiz: [
    {
      question: 'Welche Krise stärkt ab 1929 radikale Parteien besonders?',
      options: [
        'Die Weltwirtschaftskrise',
        'Die Industrialisierung Englands',
        'Die Kubakrise',
      ],
      correctIndex: 0,
      explanation:
        'Massenarbeitslosigkeit und soziale Not untergraben das Vertrauen in die demokratischen Parteien.',
    },
    {
      question: 'Welche Neuerung prägt die Wahl zur Nationalversammlung 1919?',
      options: [
        'Frauen und Männer dürfen auf nationaler Ebene wählen',
        'Nur ehemalige Soldaten dürfen wählen',
        'Der Reichskanzler wird direkt gewählt',
      ],
      correctIndex: 0,
      explanation:
        '1919 gilt bei einer nationalen Wahl erstmals das aktive und passive Wahlrecht für Frauen.',
    },
  ],
};

const chancellorAppointmentScene: HistoriaScene = {
  id: 10,
  shortTitle: 'Machtübergabe',
  title: 'Hitler wird zum Reichskanzler ernannt',
  date: 'Januar 1933',
  place: 'Köln und Berlin',
  people: 'Paul von Hindenburg, Adolf Hitler und konservative Politiker',
  imageTitle: 'Die Ernennung am 30. Januar 1933',
  imageSubtitle:
    'Reichspräsident Hindenburg überträgt Hitler das Amt des Reichskanzlers.',
  duration: 39,
  narration:
    'Anfang 1933 steckt die Weimarer Republik in einer schweren politischen Krise. Die NSDAP ist zwar die stärkste Partei, hat aber keine eigene Mehrheit, und bei der letzten Reichstagswahl sogar Stimmen verloren. Hinter den Kulissen verhandeln Hitler und konservative Politiker über eine neue Regierung. Franz von Papen glaubt, man könne Hitler im Amt einrahmen und kontrollieren. Reichspräsident Paul von Hindenburg lässt sich überzeugen und ernennt Hitler am 30. Januar 1933 zum Reichskanzler. Hitler wird also nicht direkt zum Kanzler gewählt. Konservative Eliten öffnen ihm den Weg zur Macht – eine folgenschwere Fehleinschätzung.',
  audio: `${episode3Asset}/SprechertexteE3/neue/10.m4a`,
  mainImage: `${episode3Asset}/secondary/scene10-appointment.jpg`,
  mapImage: `${episode3Asset}/maps/scene10-appointment.svg?v=20260915a`,
  mapConcept:
    'Deutschlandkarte mit Köln als Ort geheimer Koalitionsgespräche und Berlin als Ort der Ernennung zum Reichskanzler.',
  mapDetails: [
    '1 · Köln · Verhandlungen am 4. Januar 1933',
    '2 · Berlin · Ernennung am 30. Januar 1933',
    'Politische Machtübergabe ohne direkte Kanzlerwahl',
  ],
  discoveries: [
    {
      label: 'Verhandlungen',
      title: 'Köln, 4. Januar 1933',
      text: 'Hitler und Franz von Papen sprechen im Haus des Bankiers Kurt von Schröder über eine gemeinsame Regierung. Weitere Absprachen konservativer Eliten folgen.',
    },
    {
      label: 'Ernennung',
      title: 'Berlin, 30. Januar 1933',
      text: 'Hindenburg ernennt Hitler zum Reichskanzler. Die NSDAP besitzt keine eigene parlamentarische Mehrheit; konservative Politiker glauben dennoch, Hitler kontrollieren zu können.',
    },
  ],
  quiz: [
    {
      question: 'Wie gelangt Hitler am 30. Januar 1933 ins Amt?',
      options: [
        'Hindenburg ernennt ihn zum Reichskanzler',
        'Er wird direkt zum Reichskanzler gewählt',
        'Der Völkerbund setzt ihn ein',
      ],
      correctIndex: 0,
      explanation:
        'Reichspräsident Hindenburg ernennt Hitler; eine direkte Wahl zum Reichskanzler gibt es nicht.',
    },
    {
      question: 'Welche Fehleinschätzung begünstigt die Ernennung?',
      options: [
        'Konservative Politiker glauben, Hitler kontrollieren zu können',
        'Die NSDAP habe keine politischen Gegner',
        'Die Weltwirtschaftskrise sei bereits beendet',
      ],
      correctIndex: 0,
      explanation:
        'Papen und andere Konservative wollen Hitler für ihre Ziele nutzen und unterschätzen, wie schnell er ihre Kontrolle beseitigt.',
    },
  ],
};

type Episode3ScenePlan = {
  id: number;
  sourceId?: number;
  scene?: HistoriaScene;
  override?: Partial<HistoriaScene>;
  keepAudio?: boolean;
};

const episode3ScenePlan: Episode3ScenePlan[] = [
  { id: 1, sourceId: 1, keepAudio: true },
  { id: 2, sourceId: 2, keepAudio: true },
  { id: 3, sourceId: 3, keepAudio: true },
  { id: 4, sourceId: 4, override: italyScene },
  { id: 5, scene: bismarckScene },
  {
    id: 6,
    sourceId: 5,
    keepAudio: true,
    override: {
      mainImage: `${episode3Asset}/secondary/scene06-conference.jpg`,
      imageTitle: 'Die Berliner Konferenz 1884/85',
      imageSubtitle:
        'Europäische Mächte verhandeln über Afrika – ohne afrikanische Vertreter am Tisch.',
    },
  },
  {
    id: 7,
    sourceId: 6,
    keepAudio: true,
    override: {
      imageSequence: [
        {
          src: `${episode3Asset}/secondary/scene07-sarajevo.jpg`,
          at: 0,
          title: 'Das Attentat von Sarajevo',
          subtitle:
            'Die Ermordung Franz Ferdinands löst die Julikrise von 1914 aus.',
        },
        {
          src: `${episode3Asset}/secondary/scene07-bunker.jpg`,
          at: 0.68,
          title: 'Stellungskrieg an der Westfront',
          subtitle:
            'Schützengräben und Bunker prägen den zermürbenden Krieg.',
        },
      ],
      videoStartAt: 0.25,
    },
  },
  {
    id: 8,
    sourceId: 7,
    keepAudio: true,
    override: {
      imageSequence: [
        {
          src: `${episode3Asset}/main/scene07.jpg`,
          at: 0,
          title: 'Revolution in Russland',
          subtitle:
            '1917 übernehmen Lenins Bolschewiki in Petrograd die Macht.',
        },
        {
          src: `${episode3Asset}/secondary/scene08-stalinism.jpg`,
          at: 0.56,
          title: 'Stalinismus',
          subtitle:
            'Personenkult, Zwang und Terror prägen Stalins Diktatur.',
        },
      ],
    },
  },
  {
    id: 9,
    sourceId: 8,
    override: {
      ...weimarScene,
      imageSequence: [
        {
          src: `${episode3Asset}/secondary/scene09-weimar.jpg`,
          at: 0,
          title: 'Eine neue Demokratie',
          subtitle: 'Frauen und Männer wählen 1919 die Nationalversammlung.',
        },
        {
          src: `${episode3Asset}/main/scene08.jpg`,
          at: 0.55,
          title: 'Krise der Republik',
          subtitle:
            'Inflation und Arbeitslosigkeit belasten die Weimarer Republik.',
        },
      ],
    },
  },
  { id: 10, scene: chancellorAppointmentScene },
  {
    id: 11,
    sourceId: 9,
    keepAudio: true,
    override: {
      imageSequence: [
        {
          src: `${episode3Asset}/main/scene09.jpg`,
          at: 0,
          title: 'Propaganda und Ausgrenzung',
          subtitle:
            'Die Diktatur kontrolliert Öffentlichkeit und verfolgt Menschen.',
        },
        {
          src: `${episode3Asset}/secondary/scene10-dictatorship.jpg`,
          at: 0.56,
          title: 'Demokratische Kontrolle wird beseitigt',
          subtitle:
            'Politische Gegner werden überwacht, verhaftet und ausgeschaltet.',
        },
      ],
    },
  },
  {
    id: 12,
    sourceId: 10,
    keepAudio: true,
    override: {
      imageSequence: [
        {
          src: `${episode3Asset}/main/scene10.jpg`,
          at: 0,
          title: 'Europa in Trümmern',
          subtitle: 'Der Krieg zerstört Städte und Lebensgrundlagen.',
        },
        {
          src: `${episode3Asset}/secondary/scene11-war.jpg`,
          at: 0.55,
          title: 'Flucht und Vertreibung',
          subtitle:
            'Der Krieg zwingt Millionen Menschen, ihre Heimat zu verlassen.',
        },
      ],
    },
  },
  {
    id: 13,
    sourceId: 11,
    keepAudio: true,
    override: {
      imageSequence: [
        {
          src: `${episode3Asset}/main/scene11.jpg`,
          at: 0,
          title: 'Die Orte der Vernichtung',
          subtitle:
            'Leere Gleise erinnern an Deportation und millionenfachen Mord.',
        },
        {
          src: `${episode3Asset}/secondary/scene12-deportation.jpg`,
          at: 0.55,
          title: 'Deportation als Teil der Verfolgung',
          subtitle: 'Züge bringen verfolgte Menschen in Ghettos und Lager.',
        },
      ],
    },
  },
  { id: 14, sourceId: 12, override: coldWarScene },
  { id: 15, scene: { ...cubaScene, id: 15 } },
  { id: 16, sourceId: 13, keepAudio: true },
  { id: 17, sourceId: 14, keepAudio: true },
  { id: 18, sourceId: 15, override: ewgScene },
  { id: 19, scene: { ...reunificationScene, id: 19 } },
  {
    id: 20,
    sourceId: 16,
    override: {
      audio: `${episode3Asset}/SprechertexteE3/neue/20.m4a`,
      mainImage: undefined,
      imageTitle: 'Vernetzte Gegenwart',
      imageSubtitle:
        'Häfen, Datenkabel und digitale Systeme verbinden die Welt.',
      video: undefined,
      videoPlayback: undefined,
      imageSequence: [
        {
          src: `${episode3Asset}/secondary/scene20-networks.jpg`,
          at: 0,
          title: 'Vernetzte Gegenwart',
          subtitle:
            'Häfen, Datenkabel und digitale Systeme verbinden die Welt.',
        },
        {
          src: `${episode3Asset}/secondary/scene19-september11.jpg`,
          at: 0.22,
          title: 'New York nach den Anschlägen',
          subtitle:
            'Helfer versorgen Menschen in Lower Manhattan im September 2001.',
        },
        {
          src: `${episode3Asset}/secondary/scene19-financial-crisis.jpg`,
          at: 0.42,
          title: 'Die Finanzkrise 2008',
          subtitle:
            'Bankenkrise und Rezession treffen Unternehmen und Haushalte weltweit.',
        },
        {
          src: `${episode3Asset}/secondary/scene19-pandemic.jpg`,
          at: 0.61,
          title: 'Die Pandemie ab 2020',
          subtitle: 'Gesundheitsschutz prägt Alltag und öffentliche Räume.',
        },
        {
          src: `${episode3Asset}/secondary/scene19-ukraine.jpg`,
          at: 0.8,
          title: 'Flucht aus der Ukraine',
          subtitle:
            'Russlands Großangriff vertreibt ab 2022 Millionen Menschen.',
        },
      ],
      videoStartAt: undefined,
    },
  },
];

export const historiaEpisode3Scenes: HistoriaScene[] = episode3ScenePlan.map(
  (plan) => {
    if (plan.scene) return plan.scene;
    const sourceId = plan.sourceId as number;
    const source = episode3Scenes.find((scene) => scene.id === sourceId);
    if (!source) throw new Error(`Fehlende Episode-3-Quellszene ${sourceId}`);

    return {
      ...source,
      ...videoMedia[sourceId],
      ...secondaryMedia[sourceId],
      id: plan.id,
      mainImage: `${episode3Asset}/main/scene${String(sourceId).padStart(2, '0')}.jpg`,
      mapImage: `${episode3Asset}/maps/scene${String(sourceId).padStart(2, '0')}.svg?v=20260915b`,
      audio: plan.keepAudio
        ? `${episode3Asset}/SprechertexteE3/${sourceId}.m4a`
        : undefined,
      ...plan.override,
    };
  },
);
