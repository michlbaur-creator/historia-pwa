import styles from './challenge.module.css';

export default function Certificate({ name, score, rank, date }: { name: string; score: number; rank: string; date: string }) {
  return <section className={styles.certificate} aria-label="Deine druckbare Urkunde">
    <p className={styles.certificateBrand}>HISTORIA</p>
    <p className={styles.eyebrow}>Drei Episoden · Eine große Zeitreise</p>
    <h2>Urkunde</h2>
    <p>für</p>
    <p className={styles.certificateName}>{name.trim() || '________________________'}</p>
    <p>Du hast die Historia Hyper-Challenge abgeschlossen:</p>
    <p className={styles.certificateScore}>{score} von 18 Fragen richtig</p>
    <p className={styles.certificateRank}>{rank}</p>
    <div className={styles.certificateEras}>
      <span>Ⅰ · Die klassische Welt</span>
      <span>Ⅱ · Kaiser, Kreuzfahrer und Revolutionäre</span>
      <span>Ⅲ · Nationen, Weltkriege und Gegenwart</span>
    </div>
    <p>Von den Pharaonen bis in die Gegenwart –<br />du hast Zusammenhänge entdeckt und dein Wissen auf die Probe gestellt.</p>
    <div className={styles.certificateSign}><span>{date}<br />Datum</span><span>Historia · Michael Baur<br />historia.mibaso.de</span></div>
    <small>Persönliche Quiz-Urkunde · kein amtlicher Bildungsnachweis</small>
  </section>;
}
