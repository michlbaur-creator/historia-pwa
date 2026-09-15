# Historia – Übergabe für den nächsten Chat

Stand: 14. September 2026. Die App ist laut Michael im Prinzip fertig. Künftige Arbeiten sind gezielte Änderungen, kein neuer Gesamtentwurf.

## Zuerst lesen und prüfen

- Gemeinsames Projektgedächtnis: `/Users/michaelbaur/Documents/GitHub/mibaso-wissen/apps/historia.md`. Dessen ältere datierte Abschnitte sind Entwicklungsgeschichte; neuere Aussagen und dieses Protokoll ersetzen widersprüchliche Altstände.
- Eigenständiges Historia-Repository im aktuellen Arbeitsverzeichnis: `/Users/michaelbaur/.codex/worktrees/eed6/Zeitreise-PWA/App/Historia`.
- Origin: `https://github.com/michlbaur-creator/historia-pwa.git`, Branch `main`.
- Nicht mit dem übergeordneten Repository `zeitreise-pwa` verwechseln! Dessen unversionierte Historia- und Austauschdateien nicht pauschal hinzufügen, entfernen oder committen.
- Vor jeder Arbeit tatsächlichen Pfad, Git-Status und Remote prüfen. Der im alten Steckbrief genannte Documents-Pfad ist nicht der hier zuletzt verwendete Checkout.

## Abgeschlossener Stand

- Drei vollständige Episoden mit jeweils 16 Szenen, Karten, Bildern, vorhandenen Videos, Sprecheraufnahmen, Entdecken und Szenenquizzen.
- Eigene Abschluss-Challenge je Episode mit neun anspruchsvolleren Fragen; anschließend Übergang zur nächsten Episode.
- `/hyper-challenge/`: 18 gemischte Fragen, sechs je Episode; Konfetti, optional einschaltbare und probehörbare Fanfare sowie druckbare A4-Urkunde mit optionalem Namen und tatsächlichem Ergebnis.
- Letzter geprüfter Commit: `63655ab` – „Historia Hyper-Challenge mit Fanfare und druckbarer Urkunde“. Michael hat selbst gepusht. Anschließender Push-Trockenlauf meldete „Everything up-to-date“. Das bestätigt den Git-Abgleich, nicht eine erneute Live-Deployment-Prüfung.
- Historia-Checkout bei Übergabe sauber; dieses neue Protokoll ist die einzige neu hinzugefügte Datei.
- Hauptadresse: `https://historia.mibaso.de`, Veröffentlichung über GitHub Pages. Letzte lokale Vorschau: `http://127.0.0.1:3001/hyper-challenge` (Serververfügbarkeit neu prüfen).

## Unbedingt erhalten

- Heller warmer Sand-/Braungrund, filigrane bläuliche Schrift, kein schweres Bold-Redesign. Header ohne eigenen Rahmen; kompakte Knöpfe „Große Zeitreise“ und „Anfang“.
- Farbige Zeitstrahlkreise; orangefarbener Startknopf. Fortschrittsbalken innerhalb der kompakten Navigation unter dem Bild.
- Natürlich wirkende, geografisch korrekte und unverzerrte Karten. Klar getrennte Länder; in Episode 2/3 genau zwei markante nummerierte Punkte passend zu Entdecken 1/2. Keine unlesbar kleinen Zusätze, keine Konturen um Ortsnamen, Jahreszahlen nicht pauschal in Großbuchstaben. Linien/Pfeile sparsam und zurückhaltend wie Episode 1, keine bedeutungslosen gestrichelten Verbindungen.
- Höherer handyfreundlicher Bildausschnitt; vorhandene Bildunterschriften und genehmigte Texte erhalten.
- Beim Öffnen ist „Entdecken“ aktiv. Danach gewählten Reiter beim Szenenwechsel erhalten.
- In allen Episoden startet „Weiter“ bzw. Wischen nach links die nächste Szene samt Sprecher automatisch. Rückwärts und Zeitstrahlwahl bleiben manuell. Kein selbsttätiger Wechsel zur nächsten Szene am Szenenende.
- Dauerhaftes Audioelement im Player erhalten: kein szenenabhängiger React-Key. Wiedergabe innerhalb der Nutzeraktion starten; Pause-Zustand erst bei echtem Start. Ältere Play-Fehler dürfen neueren Start nicht zurücksetzen.
- Kartenflug-/Überblendung erhalten; reduzierte Bewegung respektieren. Videos stumm, mit Sprecher synchron, während Kartenphase pausiert. Bestehende szenenspezifische Loop-/Standbildregeln nicht pauschal ändern.
- E2/E3-Sprechertexte sind freigegeben, umgangssprachlich und mit „du“ formuliert; sensible Geschichte respektvoll. Keine eigenmächtige Umschreibung oder neue Sprecheraufnahme.
- Meldung über abfallenden Sprecherton wurde von Michael zurückgenommen: Aufnahmeproblem einzelner letzter Szenen, kein bestätigter Playerfehler. Keine Lautstärke-„Reparatur“ nötig.

## Technische Orientierung

- Vinext/React, statischer Pages-Export; `app/HistoriaPlayer.tsx` ist der gemeinsame Player.
- Szenendaten: `app/data.ts`, `app/episode2-data.ts`, `app/episode3-data.ts`.
- Gemeinsame Challenge-Logik/Styles und Fragenpool: `app/episode-1/challenge/`; Hyper-Einstieg: `app/hyper-challenge/`.
- Medien unter `public/assets/historia/`; vorhandene Assets zuerst wiederverwenden.
- Export: `scripts/prepare-pages.mjs`; neue Routen müssen als Pages-Unterverzeichnis mit `index.html` funktionieren. Normale HTML-Navigation zwischen Episoden beibehalten (frühere Probleme mit clientseitigen Links).
- Letzter dokumentierter Service-Worker-Cache: `historia-v40`. Bei tatsächlich ausgelieferten Änderungen Cache-/Assetrevisionen prüfen; früher zeigten Vorschau und Handy wiederholt alte Karten.
- Prüfen: `pnpm exec tsc --noEmit`, `node --test scripts/challenge.test.mjs`, gezielter Linter, `pnpm build` und `pnpm pages:prepare`.
- Letzte Feature-Prüfung: TypeScript, gezielter Linter, 14 Tests und Pages-Build bestanden. Kein neuer Testlauf nur für diese Dokumentation.
- Offen bleibt die ausdrückliche Bestätigung einer echten iPad-Hörprobe der neuen Fanfare und eines realen Urkundenausdrucks. Nicht als bereits verifiziert ausgeben.

## Git-Zugang und Veröffentlichungen

- GitHub CLI dauerhaft unter `/Users/michaelbaur/.local/bin/gh` installiert.
- Aktives Konto `michlbaur-creator`, Anmeldung im macOS-Schlüsselbund bestätigt. GitHub-HTTPS nutzt den global eingerichteten gh-Credential-Helper; gilt auch für Zeitreise.
- Niemals Tokens ausgeben, ins Repository schreiben oder aus dem Schlüsselbund extrahieren. Keine Bildschirmsperre deaktivieren.
- Commit/Push nach Nutzerauftrag möglich, wenn Mac und Zugang verfügbar sind. Nach Neustart kann Entsperren nötig sein.
- Änderungen gezielt prüfen und stagen, keine pauschalen Commits fremder Dateien. Veröffentlichung nach Sichtprüfung/Freigabe. Dieses Übergabeprotokoll wurde noch nicht committed oder gepusht.

## Großes Finale in zwei Blöcken (lokale Vorschau, 14. September 2026)

- Die Hyper-Challenge enthält weiterhin dieselben 18 gemischten Fragen, jetzt in zwei Blöcken mit je neun Fragen. Erst 9/9 in Block 1 schaltet über ein Zwischenergebnis Block 2 frei.
- Bei weniger als 9/9 lässt sich der jeweilige Block mit seinen bisherigen Fragen wiederholen. Beim Wiederholen von Block 2 bleiben die neun richtigen Antworten aus Block 1 innerhalb der laufenden Runde erhalten. Ein Neuladen startet wie bisher eine neue Runde.
- Gestaltung, Fragenpool, Episoden-Challenges, Konfetti, optionale Fanfare und Druckurkunde bleiben erhalten. Nach Block 2 zeigt die Urkunde das tatsächliche Ergebnis; für Historia-Champion können nur die zweiten neun Fragen erneut versucht werden. Der Bestwert des Blockmodus verwendet einen getrennten Speicherschlüssel v2; frühere Werte werden nicht gelöscht.
- Cache `historia-v41`. TypeScript, gezielter Linter, alle 16 Tests und Produktions-Build mit Pages-Export bestanden. Lokal vorbereitet, noch nicht veröffentlicht; Sichtprüfung durch Michael steht aus.

## Kompaktes Finale und Episode-3-Zweitbilder – 14. September 2026

- Der Finale-Kopf ist gekürzt, die Fanfare steht am Ergebnis. Während einer Runde zeigt die Treppe nur die neun Fragen des aktiven Blocks; das Gesamtergebnis zeigt wieder alle 18. In der lokalen Ansicht mit 744 × 1100 CSS-Pixeln lag der Weiter-Button nach einer Antwort vollständig sichtbar bei y=788–837. Keine Änderung an Quizlösungen oder Sprechertexten.
- Drei neue, mit Built-in Imagegen erzeugte historische Rekonstruktionen ergänzen Episode 3: Szene 2 Paulskirche 1848, Szene 13 Accra/Ghana 1957 und Szene 15 Berliner Grenzöffnung 1989. JPEGs unter `public/assets/historia/episode3/secondary/`, exakte Prompts in `docs/episode3-zweitbilder-prompts.md`. Vorhandene Hauptbilder und Videos bleiben erhalten; die Zweitbilder nutzen die bestehende Überblendung in der zweiten Szenenhälfte.
- Cache `historia-v42`. Nutzer hat Einbau und Veröffentlichung ausdrücklich beauftragt.

## Kartensteuerung und Hammurabi-Bild – 14. September 2026

- Gemeinsamer Player: automatische Kartenphase fünf statt vier Sekunden. Manueller Karten-/Bildwechsel ist animationsfrei und bleibt unabhängig von Sprecherfortschritt aktiv, bis erneut umgeschaltet oder eine Szene neu gestartet wird. SVG-Karten werden beim manuellen Öffnen ohne `#play` geladen.
- Hammurabi-Hauptbild ist auf dem Server intakt; der gemeldete iPad-Ladefehler konnte nicht eindeutig reproduziert werden. Unverändertes Bild wird unter `scene03-v2.jpg` frisch geladen. Service Worker speichert nur erfolgreiche Antworten und liefert offline keine HTML-Startseite als Ersatz für fehlende Bilder. Cache `historia-v43`.
- Hannibal (Episode 1, Szene 11) spielt sein vorhandenes Video einmal ab und hält auf dem letzten Frame. Im Browser bei 10,005 Sekunden mit `ended=true`, `paused=true`, `loop=false` bestätigt.
- TypeScript, Produktions-Build, Pages-Export, 16 Quiztests und vier Offline-Medientests erfolgreich. Der Player-Linter meldet acht bereits im Ausgangsstand vorhandene Hinweise (Hook-Abhängigkeit, Medienuntertitel, Status-Element und bewusste HTML-Navigation); keine zusätzlichen Lintbefunde durch diese Änderung.

## Erweiterte Bildfolge und 19 Szenen in Episode 3 – lokale Vorschau, 14. September 2026

- Episode 2, Szene 12 beginnt nun mit einer neuen Rekonstruktion des Prager Fenstersturzes. Danach folgen das vorhandene Kriegsfolgenbild und das vorhandene Bild der Friedensverhandlungen als zeitlich geordnete Drei-Bild-Folge.
- Episode 3 umfasst lokal 19 Szenen. Die frühere gemeinsame Italien-/Deutschland-Szene wurde in „Italien wird geeint“ und „Bismarck und die Gründung des Deutschen Reichs“ geteilt. Die frühere Kalter-Krieg-Szene wurde in „Kalter Krieg und Berliner Luftbrücke“ und „Die Kubakrise bringt die Welt an den Abgrund“ geteilt. Die frühere EWG-/Wiedervereinigungs-Szene wurde in „Westeuropa wächst wirtschaftlich zusammen“ und „Friedliche Revolution und Wiedervereinigung“ geteilt.
- Vierzehn neu erzeugte 16:9-Bilder ergänzen die Bildfolge: Prager Fenstersturz sowie in Episode 3 Italien, Bismarck, Sarajevo, Weimarer Wahl, Abbau der Demokratie, Kriegsflucht, Holocaust-Deportation, Kubakrise, Römische Verträge, New York 2001, Finanzkrise 2008, Pandemie 2020 und Flucht aus der Ukraine 2022. Die Gegenwartsszene verwendet ihr vorhandenes Video für Vernetzung und anschließend vier einzeln montierte Themenbilder.
- Der gemeinsame Player unterstützt nun beliebig viele zeitgesteuerte Bilder und den Wechsel von einem Startbild in ein vorhandenes Video. Dadurch beginnt die Erste-Weltkrieg-Szene mit Sarajevo und wechselt anschließend in den vorhandenen Clip; die späteren zusätzlichen Bilder blenden ohne neue Bedienlogik ein. Bestehende Zwei-Bild-Szenen verwenden weiterhin denselben ruhigen Übergang.
- Sechs neue Karten trennen Italien/Bismarck, Luftbrücke/Kubakrise und EWG/Wiedervereinigung. Jede Karte besitzt weiterhin genau zwei nummerierte Orte. Der Challenge-Pool folgt der neuen 19er-Nummerierung; Episode 3 zieht je drei Fragen aus den Szenen 1–6, 7–12 und 13–19. Die Hyper-Challenge bleibt bei 18 Fragen mit sechs je Episode.
- Für Italien, Bismarck, Luftbrücke, Kubakrise, EWG und Wiedervereinigung sind neue Sprechertexte eingebaut. Die vorhandenen Aufnahmen bleiben unverändert an den inhaltlich unveränderten Quellszenen. Für die sechs neu geschriebenen/geteilten Szenen wird bis zu neuen Aufnahmen der vorhandene technische Timer verwendet; keine alte, abweichende Tonspur wird wiederverwendet.
- Cache `historia-v44`. TypeScript, 16 Challenge-Tests, vier Offline-Medientests, Produktions-Build und Pages-Export bestehen. Noch nicht veröffentlicht; die lokale Vorschau wartet auf Michaels Sichtprüfung.

## Bild-, Karten- und Szenenkorrekturen – lokale Vorschau, 15. September 2026

- Episode 2, Szene 12 führt den Prager Fenstersturz nur noch einmal in einer ausdrücklich bereinigten Drei-Bild-Folge. Die alten separaten Zweitbildfelder dieser Szene sind entfernt, damit kein zusätzlicher Fallback dieselbe Sequenz erweitert.
- Episode 3, Szene 6 verwendet eine neue Berliner-Konferenz-Rekonstruktion ohne afrikanische Delegierte am Verhandlungstisch und entspricht damit dem Sprechertext. Szene 7 zeigt nach Sarajevo zusätzlich Stellungskrieg und Bunker. Szene 8 ergänzt nach der Revolution ein eigenes Stalinismusbild.
- Die Karten von Szene 8 und 9 sind innerhalb ihres unveränderten 16:9-Rahmens gleichmäßig vergrößert; Datum und Markierungen bleiben sichtbar. Alle folgenden SVG-Karten wurden technisch auf 1672 × 941 bzw. ein gleich proportioniertes ViewBox-Format geprüft. Eine neue Köln-Berlin-Karte begleitet die Machtübergabe 1933.
- Die bisherige Weimar-Szene endet nun 1932 und beginnt wie gewünscht mit dem Wahlbild; das Inflations-/Krisenbild folgt. Die Ernennung Hitlers zum Reichskanzler ist eine neue Szene 10 mit eigenem zurückhaltendem Bild, Sprechertext, Karte, Entdecken-Inhalten und Quiz. Episode 3 umfasst dadurch 20 Szenen; Challenge-Nummerierung und Zeitgruppen wurden angepasst.
- Die letzte Szene 20 beginnt mit einem neuen Motiv zu Hafen-, Kabel- und Datennetzen. Das bisherige wiederkehrende Eingangsmotiv samt zugehörigem Startvideo ist aus der sichtbaren Abfolge entfernt; die vier vorhandenen Gegenwartsbilder folgen weiter zeitlich geordnet.
- Cache `historia-v45`. TypeScript, gezielter Linter, 16 automatisierte Challenge-/Medientests, Produktions-Build und Pages-Export bestehen. Noch nicht veröffentlicht. Die Browser-Sichtprüfung konnte wegen des gesperrten Macs nicht abgeschlossen werden.

## Sprecheraufnahmen für die erweiterten Episode-3-Szenen – 15. September 2026

- Die vorhandenen Aufnahmen aus `Austausch/Episode3/SprechertexteE3/neue Sprechertexte` sind den neun bisher stummen Szenen 4, 5, 9, 10, 14, 15, 18, 19 und 20 zugeordnet. Damit besitzen alle 20 Szenen von Episode 3 eine Sprecheraufnahme.
- Die ursprünglichen Aufnahmen der unveränderten Quellszenen bleiben unverändert. Die neuen Dateien liegen getrennt unter `public/assets/historia/episode3/SprechertexteE3/neue/`, damit keine ältere, inhaltlich abweichende Tonspur überschrieben wird.
- Cache `historia-v46`.

## Ruhigere Karten- und Medienübergänge – 15. September 2026

- Die automatische Karte bleibt in allen drei Episoden sechs statt fünf Sekunden sichtbar. Der bisherige räumliche Kartenflug ist durch eine kurze, zurückhaltende Überblendung mit minimaler Vergrößerung ersetzt; manuell geöffnete Karten bleiben weiterhin animationsfrei stehen.
- Der Kartenabruf bleibt während Start und Übergang stabil und wird für die Animation nicht mehr mit einer Fragment-URL neu geladen. Dadurch entfällt das sichtbare Aufflackern vor dem Effekt.
- Bildfolgen laden alle Motive der aktuellen Szene bereits während der Kartenphase. Neue Bilder und Videos blenden innerhalb von 0,65 Sekunden über das vollständig sichtbare Vorgängermedium, sodass der Bühnenhintergrund während des Wechsels nicht durchscheint.
- Cache `historia-v47`. TypeScript, 20 Challenge-/Medientests und Produktions-Build mit Pages-Export bestanden. Die Vorschau wurde mit der gebauten Episode 3 geprüft: Karte nach fünf Sekunden noch sichtbar, stabiler unveränderter Kartenpfad, alle fünf Gegenwartsbilder vor dem ersten Wechsel vollständig geladen und geschlossene Bildüberblendung ohne leeren Zwischenzustand.
