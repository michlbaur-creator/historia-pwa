export const challengeConfig = {
  1: {
    theme: 'Die klassische Welt', title: 'Von den Pharaonen bis Westrom', badge: 'Antike-Abzeichen',
    success: 'Alle neun richtig! Du hast die großen Wendepunkte der Antike im Blick.',
    bridgeLabel: 'Deine Reise geht weiter · Episode 2', bridgeTitle: 'Neue Reiche, neue Zeiten',
    bridgeText: 'Westrom ist Geschichte – aber die Welt bleibt in Bewegung. Im Osten besteht das Römische Reich weiter. In Episode 2 begegnest du der Ausbreitung des Islam, Karl dem Großen und den Wikingern. Später führen dich die Wege bis zur Französischen Revolution und zu Napoleon.',
    href: '/episode-2', action: 'Episode 2 beginnen',
  },
  2: {
    theme: 'Kaiser, Kreuzfahrer und Revolutionäre', title: 'Von der Hidschra bis Waterloo', badge: 'Reiche-und-Revolutionen-Abzeichen',
    success: 'Alle neun richtig! Du hast den Wandel von Reichen, Glauben und Macht gut im Blick.',
    bridgeLabel: 'Deine Reise geht weiter · Episode 3', bridgeTitle: 'Die Welt nimmt Fahrt auf',
    bridgeText: 'Napoleon ist besiegt – doch zurück auf Anfang geht es nicht. Für Episode 3 springen wir noch einmal etwas zurück: Fabriken und Dampfmaschinen verändern das Leben. Du erlebst Revolutionen, neue Nationalstaaten und die Weltkriege. Danach geht es weiter bis in unsere vernetzte Gegenwart.',
    href: '/episode-3', action: 'Episode 3 beginnen',
  },
  3: {
    theme: 'Nationen, Weltkriege und Gegenwart', title: 'Von der Industrialisierung bis heute', badge: 'Gegenwarts-Abzeichen',
    success: 'Alle neun richtig! Du erkennst wichtige Zusammenhänge auf dem Weg in unsere Gegenwart.',
    bridgeLabel: 'Drei Episoden · Deine Historia-Reise', bridgeTitle: 'In der Gegenwart angekommen',
    bridgeText: 'Von den Pharaonen bis heute: Du hast erlebt, wie Reiche entstehen, Menschen um Rechte kämpfen und Entscheidungen die Welt verändern. Unsere Reise endet hier – die Geschichte geht weiter. Welche Verbindung zwischen damals und heute ist dir besonders aufgefallen?',
    href: '/', action: 'Historia noch einmal entdecken',
  },
} as const;

export const challengeBestKey = (episode: 1 | 2 | 3) => `historia-episode${episode}-challenge-best-v2`;
