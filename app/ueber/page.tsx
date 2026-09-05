import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../info.module.css';

export const dynamic = 'force-static';

export const metadata: Metadata = { title: 'Über mich | Historia' };

export default function Ueber() {
  return (
    <main className={styles.shell}>
      <article className={styles.page}>
        <Link href="/">← Zurück zu Historia</Link>
        <p className={styles.eyebrow}>Über mich</p>
        <h1>Hallo, ich bin Micha.</h1>
        <p className={styles.lead}>
          Pensionierter Biologie- und Chemielehrer, neugieriger Medienbastler –
          und immer noch gern auf Entdeckungsreise.
        </p>
        <p>
          Drei Jahrzehnte Unterricht haben mir gezeigt: Lernen funktioniert
          besonders gut, wenn Neugier, Bilder und eine gute Geschichte
          zusammenkommen.
        </p>
        <p>
          Historia erzählt klassische Weltgeschichte deshalb als schnelle
          chronologische Reise. Moderne KI-Werkzeuge unterstützen die
          Produktion; Auswahl, Texte und redaktionelle Entscheidungen bleiben
          meine Aufgabe.
        </p>
        <p>
          Fehler können trotzdem vorkommen. Hinweise und Rückmeldungen sind
          willkommen.
        </p>
        <a className={styles.contact} href="mailto:mibaur@me.com">
          Schreib mir: mibaur@me.com
        </a>
      </article>
    </main>
  );
}
