# Episode 3 – ergänzte Bilder und Karten, 15. September 2026

Sprecheraufnahmen, Sprechertexte, Szenenzahl und Quizantworten bleiben unverändert.

- Szene 8: vergrößerte Russlandkarte, zusätzlich Lenin zwischen Revolution und Stalinismus.
- Szene 10: zusätzliche Rekonstruktion der politischen Verhandlungen vor der Ernennung.
- Szene 12: vier datierte Kartenstufen (1939, 1940, 1941, 1942), anschließend die beiden vorhandenen Bilder. Die Fortschaltung folgt der Sprecheraufnahme und pausiert mit ihr. Kurze Überblendungen statt unabhängig laufender SVG-Animation.
- Szene 14: vergrößerte Luftbrückenkarte; ab 64 % der Aufnahme bis zum Ende Deutschlandkarte (rund 20 Sekunden). Die vorhandene Luftbrückenaufnahme bleibt davor erhalten.
- Szene 15: vergrößerte Kubakarte und zusätzlicher Raketenabzug.
- Szene 16: historische Gandhi-Aufnahme zuerst, dann bestehende Bilder zu Indien und Ghana.
- Szene 17: genau drei Motive in der Reihenfolge China, Korea, Vietnam.

Kartensequenzen sind mit `kind: 'map'` gekennzeichnet. Auf Karten entfallen die dunkle Fotoblende und Fotobeschriftung, damit die Karte vollständig lesbar ist. Karten füllen weiterhin die komplette 16:9-Medienfläche ohne geografische Verzerrung. Die manuelle Kartenansicht bleibt erhalten.

## Bildquellen

Sechs KI-Rekonstruktionen: Original- und Korrekturprompts in `episode3-zusatzbilder-20260915-prompts.json`. Die Darstellungen sind keine historischen Fotografien.

Gandhi: **Gandhi during the Salt March**, 1930, unbekannter Fotograf, Quelle gandhiserve.org, über [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Gandhi_during_the_Salt_March.jpg). Dort als gemeinfrei (PD-India) ausgewiesen. Unveränderte historische Originalaufnahme; Anzeige mit dem bestehenden bildfüllenden Zuschnitt des Players.

## Kartenquellen und Vereinfachung

Geografische Grundlage: vorhandener Natural-Earth-Atlas 1:50m. Reproduzierbarer Generator: `scripts/build-episode3-map-additions.mjs`. Dieser verändert ausschließlich die acht neu hinzugefügten Karten.

- [USHMM: German Wartime Expansion](https://encyclopedia.ushmm.org/content/en/article/german-wartime-expansion)
- [USHMM: German Occupation Maps](https://encyclopedia.ushmm.org/content/en/gallery/german-occupation-maps)
- [Haus der Geschichte: Besatzungszonen](https://www.hdg.de/lemo/bestand/objekt/karte-besatzungszonen.html)

Die Kriegskarten zeigen schematische Angriffsrichtungen, keine maßstabsgetreuen Frontverläufe. Moderne Staatsgrenzen werden auf diesen Karten ausgeblendet. Großbritannien und Moskau werden ausdrücklich nicht als erobert dargestellt; die Beteiligung der Verbündeten auf dem Balkan wird benannt. Die innerdeutsche Grenze und das Saarland sind vereinfacht. Berlins Viersektorenstatus und West-Berlins Sonderstatus werden ausdrücklich erläutert. Die Luftbrücken- und Kubawege sind als schematisch beschriftet.
