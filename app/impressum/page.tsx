import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../info.module.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Impressum & Datenschutz | Historia',
};

export default function Impressum() {
  return (
    <main className={styles.shell}>
      <article className={styles.page}>
        <Link href="/">← Zurück zu Historia</Link>
        <p className={styles.eyebrow}>Rechtliches</p>
        <h1>Impressum &amp; Datenschutz</h1>
        <section>
          <h2>Angaben gemäß § 5 DDG</h2>
          <address>
            Michael Baur
            <br />
            Nordeckerweg 22E
            <br />
            35085 Ebsdorfergrund
            <br />
            Deutschland
          </address>
          <p>
            E-Mail: <a href="mailto:mibaur@me.com">mibaur@me.com</a>
          </p>
        </section>
        <section>
          <h2>Verantwortlich für den Inhalt</h2>
          <p>
            Verantwortlich nach § 18 Abs. 2 MStV: Michael Baur, Anschrift wie
            oben.
          </p>
          <p>Dies ist eine private, nicht-kommerzielle Website.</p>
        </section>
        <section>
          <h2>Datenschutz</h2>
          <p>
            Historia ist eine Web-App ohne Nutzerkonto, Tracking oder Werbung.
            Die App selbst übermittelt keine persönlichen Lern- oder
            Nutzungsdaten an den Betreiber.
          </p>
          <p>
            Für die Offline-Nutzung kann dein Browser Bilder und Programmdateien
            auf deinem Gerät speichern. Du kannst diese Daten durch Löschen der
            Browser- oder App-Daten entfernen.
          </p>
          <p>
            Beim Aufruf verarbeitet der Hosting-Dienst technisch notwendige
            Verbindungsdaten, beispielsweise IP-Adresse und Zeitpunkt des
            Abrufs, um die Website auszuliefern und sicher zu betreiben.
          </p>
        </section>
        <section>
          <h2>Transparenzhinweis zu KI-Inhalten</h2>
          <p>
            Teile der Texte, Grafiken und Illustrationen wurden mit
            Unterstützung generativer KI erstellt und anschließend redaktionell
            geprüft.
          </p>
        </section>
        <section>
          <h2>Haftung für Inhalte und Links</h2>
          <p>
            Die Inhalte wurden mit großer Sorgfalt erstellt. Eine Gewähr für
            Vollständigkeit, Richtigkeit und Aktualität kann dennoch nicht
            übernommen werden. Für verlinkte externe Seiten sind ausschließlich
            deren Betreiber verantwortlich.
          </p>
        </section>
        <p>© 2026 Michael Baur · Historia</p>
      </article>
    </main>
  );
}
