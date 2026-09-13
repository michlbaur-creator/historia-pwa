'use client';
/* oxlint-disable next/no-html-link-for-pages -- Full navigation is intentional for the static Vinext/Pages export, as in the shared player. */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, RotateCcw, Volume2, VolumeX, Landmark } from 'lucide-react';
import { historiaScenes, type HistoriaScene } from '../../data';
import { chooseQuestions, rankFor } from './questions';
import { challengeConfig, challengeBestKey } from './config';
import styles from './challenge.module.css';

export default function EpisodeChallenge({ episode = 1, scenes = historiaScenes }: { episode?: 1 | 2 | 3; scenes?: HistoriaScene[] }) {
  const config = challengeConfig[episode];
  const bestKey = challengeBestKey(episode);
  const [questions, setQuestions] = useState<ReturnType<typeof chooseQuestions>>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [best, setBest] = useState(0);
  const [sound, setSound] = useState(false);
  const lock = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const contextRef = useRef<AudioContext | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setQuestions(chooseQuestions(scenes, Math.random, episode));
      try {
        const stored = Number(localStorage.getItem(bestKey));
        if (Number.isInteger(stored) && stored >= 0 && stored <= 9) setBest(stored);
      } catch { /* The quiz also works without browser storage. */ }
    });
    return () => { cancelAnimationFrame(frame); void contextRef.current?.close(); };
  }, [scenes, episode, bestKey]);

  const score = answers.filter((answer, i) => answer === questions[i]?.correctIndex).length;
  const question = questions[index];
  const answered = answers.length > index;

  function answer(option: number) {
    if (lock.current || answered || finished) return;
    lock.current = true;
    setAnswers((previous) => [...previous, option]);
  }
  function next() {
    if (!answered) return;
    if (index === questions.length - 1) {
      setFinished(true);
      const nextBest = Math.max(best, score);
      setBest(nextBest);
      try { localStorage.setItem(bestKey, String(nextBest)); } catch { /* Optional. */ }
      if (score === 9 && sound) celebrate();
    } else {
      setIndex(index + 1);
      lock.current = false;
    }
    requestAnimationFrame(() => heading.current?.focus());
  }
  function reset() {
    setQuestions(chooseQuestions(scenes, Math.random, episode));
    setAnswers([]);
    setIndex(0);
    setFinished(false);
    lock.current = false;
    requestAnimationFrame(() => heading.current?.focus());
  }
  function celebrate() {
    try {
      const context = new AudioContext();
      void contextRef.current?.close();
      contextRef.current = context;
      void context.resume().then(() => {
        [261.63, 329.63, 392, 523.25].forEach((frequency, i) => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          const start = context.currentTime + i * 0.16;
          oscillator.type = 'triangle';
          oscillator.frequency.value = frequency;
          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(0.08, start + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.65);
          oscillator.connect(gain); gain.connect(context.destination);
          oscillator.start(start); oscillator.stop(start + 0.7);
        });
      }).catch(() => {});
    } catch { /* No audio support: keep the visual result. */ }
  }

  return <main className={styles.page}>
    <header className={styles.header}>
      <a href="/">HISTORIA</a><a href={episode === 1 ? '/' : `/episode-${episode}`}>Zur Episode {episode}</a>
    </header>
    <section className={styles.card} aria-labelledby="challenge-title">
      <div className={styles.topline}>
        <span>Episode {episode} · {config.theme}</span>
        <button onClick={() => setSound(!sound)} aria-pressed={sound} aria-label={sound ? 'Fanfare ausschalten' : 'Fanfare einschalten'}>
          {sound ? <Volume2 size={20} /> : <VolumeX size={20} />} Fanfare {sound ? 'an' : 'aus'}
        </button>
      </div>
      <div className={styles.titleRow}>
        <div className={styles.cubeStage} aria-hidden="true"><div className={styles.cube}>
          <span><Landmark size={30} /></span><span>{['Ⅰ', 'Ⅱ', 'Ⅲ'][episode - 1]}</span><span>✦</span>
        </div></div>
        <div><p className={styles.eyebrow}>Deine Episoden-Challenge</p><h1 id="challenge-title">{config.title}</h1></div>
      </div>
      <p>Neun knifflige Fragen aus deiner Reise. Lies genau – manchmal täuscht der erste Eindruck.</p>
      {!question ? <output>Deine Fragen werden zusammengestellt …</output> : <>
        <div className={styles.stairHead}><span>Deine Zeitstufen</span><span>{score} richtig · Bestwert {best}/9</span></div>
        <ol className={styles.stairs} aria-label="Quiztreppe mit neun Stufen">
          {questions.map((item, i) => {
            const done = answers.length > i;
            const correct = done && answers[i] === item.correctIndex;
            return <li key={item.sceneId} style={{ '--height': `${38 + i * 5}px` } as CSSProperties}
              className={done ? correct ? styles.correct : styles.wrong : i === index && !finished ? styles.current : ''}
              aria-current={i === index && !finished ? 'step' : undefined}
              aria-label={`Frage ${i + 1}: ${done ? correct ? 'richtig' : 'falsch' : 'noch offen'}`}>
              {i + 1}<span aria-hidden="true">{done ? correct ? '✓' : '×' : '·'}</span>
            </li>;
          })}
        </ol>
        {finished ? <div className={styles.result}>
          {score === 9 && <div className={styles.fireworks} aria-hidden="true">{Array.from({length: 16}, (_, i) => <i key={i} style={{ '--angle': `${i * 22.5}deg` } as CSSProperties} />)}</div>}
          <p className={styles.eyebrow}>Dein {config.badge} · {score} von 9</p>
          <h2 ref={heading} tabIndex={-1}>{rankFor(score)}</h2>
          <p>{score === 9 ? config.success : 'Jede Antwort bringt dich weiter. Mit einer neuen Fragenrunde kannst du deinen Bestwert verbessern.'}</p>
          <button className={styles.secondary} onClick={reset}><RotateCcw size={18} /> Noch einmal spielen</button>
        </div> : <div className={styles.question}>
          <p className={styles.eyebrow}>Frage {index + 1} von 9</p>
          <p className={styles.topic}>{question.topic}</p>
          <h2 tabIndex={-1} ref={heading}>{question.question}</h2>
          <div className={styles.options}>{question.options.map((option, i) => <button key={option}
            disabled={answered} onClick={() => answer(i)}
            className={answered && i === question.correctIndex ? styles.correct : answered && i === answers[index] ? styles.wrong : ''}>
            <span>{String.fromCharCode(65 + i)}</span><span>{option}</span>
            {answered && i === question.correctIndex && <span aria-label="Richtige Antwort">✓</span>}
          </button>)}</div>
          {answered && <output className={styles.feedback}>
            <p>{answers[index] === question.correctIndex ? 'Richtig!' : `Nicht ganz. Richtig ist: ${question.options[question.correctIndex]}`}</p>
            <p>{question.explanation}</p>
            <button className={styles.primary} onClick={next}>{index === 8 ? 'Ergebnis ansehen' : 'Nächste Frage'} <ArrowRight size={19} /></button>
          </output>}
        </div>}
      </>}
    </section>
    <section className={styles.bridge} aria-labelledby="next-episode">
      <p className={styles.eyebrow}>{config.bridgeLabel}</p>
      <h2 id="next-episode">{config.bridgeTitle}</h2>
      <p>{config.bridgeText}</p>
      <a className={styles.primary} href={config.href}>{config.action} <ArrowRight size={19} /></a>
      {!finished && <small>Du kannst auch ohne Quiz direkt weiterreisen.</small>}
    </section>
    <footer className={styles.footer}><a href="https://mibaso.de">⌂ Alle Mibaso-Apps</a><a href="/ueber">Über mich</a><a href="/impressum">Impressum &amp; Datenschutz</a></footer>
  </main>;
}
