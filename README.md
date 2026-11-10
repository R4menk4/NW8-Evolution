# NW 8 - Evolution

Statische Lernplattform für Naturwissenschaften, Jahrgang 8. Die Startseite enthält **Geschichte des Lebens erforschen** und als eigene zweite Kachel das **Birkenspanner-Spiel**.

## Lokal öffnen

Den vollständigen Ordner behalten und `index.html` im Browser öffnen. Ein Build, eine Installation oder ein Server sind zum Lernen nicht erforderlich. Alle Lernmaterialien sind enthalten; externe Quellenlinks benötigen Internet.

## Über GitHub Pages teilen

1. Ein GitHub-Repository anlegen, zum Beispiel `NW8-Evolution`.
2. Den **Inhalt dieses Ordners** in das Repository hochladen. `index.html` muss direkt auf der obersten Ebene liegen; auch `.nojekyll` mit hochladen.
3. Unter **Settings → Pages** die Veröffentlichung aus einem Branch wählen: **Deploy from a branch**, Branch **main**, Ordner **/ (root)**.
4. Nach erfolgreicher Veröffentlichung die von GitHub angezeigte Pages-Adresse mit den Schülerinnen und Schülern teilen.

Repository: https://github.com/R4menk4/NW8-Evolution. Die Website wird über GitHub Pages aus dem Branch `main` veröffentlicht. Alle internen Verweise sind relativ und funktionieren auch unter einer GitHub-Projektadresse mit Repository-Unterpfad.

## Struktur

- `index.html`, `styles.css`, `hub.js`: Übersicht mit Lernkacheln.
- `lernprogramme/geschichte-des-lebens/`: vollständiges erstes Lernprogramm mit eigenen Bildern, Aufgaben und Speicherung.
- `lernprogramme/birkenspanner/`: digitales Selektionsspiel mit drei Sekunden Jagdzeit und Diagramm für beide Farbformen.
- `.nojekyll`: unveränderte Auslieferung als statische Website.

Weitere Lernprogramme können eigene Ordner unter `lernprogramme/` und weitere Kacheln auf der Startseite erhalten. Für weitere Programme jeweils eigene Speicherkennungen verwenden.

## Lernstand und Abschluss

Das erste Programm umfasst neun Lernseiten und eine Abschlussseite. Jede Lernseite wird erst freigeschaltet, wenn alle Aufgaben der vorherigen Seite richtig geprüft wurden. Der endgültig gespeicherte Name und das Abschlussdatum können im Programm nicht verändert werden. Nach dem Abschluss lassen sich die vorherigen Seiten einzeln leeren und erneut bearbeiten; der Abschluss bleibt dabei erhalten.

Antworten und Abschlussdaten werden ausschließlich im jeweiligen Browserprofil gespeichert. Ein Screenshot wird von den Lernenden selbst über den vereinbarten Abgabeweg versendet. Es gibt keine automatische Übermittlung, kein Tracking und keine Benutzerverwaltung.

Beim Wechsel von einer lokalen Datei zur veröffentlichten Website wird ein bestehender Lernstand nicht automatisch übernommen. Auch andere Geräte, Browserprofile, das Löschen von Browserdaten oder ein Wechsel der Domain führen zu einem getrennten bzw. fehlenden Lernstand. Unter derselben GitHub-Pages-Domain müssen andere Lernprogramme unterschiedliche Speicherkennungen verwenden.

## Materialien

Das Projekt enthält ausschließlich die Schülerfassung. Arbeitsblattdateien, Prüfmodus, Testdateien und frühere Git-Verzeichnisse sind nicht enthalten. Die Illustrationen sind KI-generiert; Quellenhinweise befinden sich im Lernprogramm und in dessen Bildnachweisen.

Die GU-Fassung liegt separat unter https://r4menk4.github.io/NW8-Evolution-GU/ im Repository `NW8-Evolution-GU`.

## Birkenspanner – Station 3

Zielkurs: Naturwissenschaften, Jahrgang 8. Das Spiel schließt in der Lernlandkarte an Fossilien und das erste selbstständige Kapitel an; daraus folgt keine Aussage über den tatsächlichen Unterrichtsstand. Ausgangsmaterial ist die vorhandene Endfassung aus `03 Birkenspanner/Station_3_Birkenspanner`. Gestalterische Referenz der neuen Kachel ist diese Lernübersicht. Zielordner: `lernprogramme/birkenspanner/`.

Alle spielen gleichzeitig und vergleichen anschließend ihre Runden. Start: 8 helle und 8 dunkle Falter, 3 Sekunden Jagdzeit. Die nächsten 16 Falter entstehen entsprechend den Farbanteilen der Überlebenden. Ab Generation 4 wird die Rinde dunkler; Generationen 7–9 behandeln optional sauberere Luft. Ein direkter Klick auf eine andere Umweltphase startet eine neue Vergleichsreihe mit 8/8. Das Diagramm zeigt beide Farbformen. Die vereinbarte Schülerfassung enthält keinen zusätzlichen Abschnitt „Hintergrund, Modellregeln und Hinweise“.

Eigene Speicherung: `evolution-station3-birkenspanner-v2`. Lokale Dateistände werden nicht automatisch auf GitHub Pages übertragen. Ergebnisse lassen sich als Textdatei sichern. Links im Kopf- und Fußbereich führen zurück zur Übersicht. Spielgrafiken und Bildprompts liegen unter `lernprogramme/birkenspanner/assets/`. Fachlicher Hintergrund der Konzeption: Cook & Saccheri (2013), https://pmc.ncbi.nlm.nih.gov/articles/PMC3668657/.
