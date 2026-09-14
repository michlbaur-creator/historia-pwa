'use client';
/* oxlint-disable next/no-html-link-for-pages -- Full navigation is intentional for the static Vinext/Pages export, as in the shared player. */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, RotateCcw, Volume2, VolumeX, Landmark, Printer, Sparkles } from 'lucide-react';
import { historiaScenes, type HistoriaScene } from '../../data';
import { chooseQuestions, chooseHyperQuestions, rankFor, hyperRankFor } from './questions';
import { challengeConfig, challengeBestKey } from './config';
import { useFanfare } from './useFanfare';
import Certificate from './Certificate';
import { hyperBlockState, retryHyperBlock } from './hyper-blocks';
import styles from './challenge.module.css';

export default function EpisodeChallenge({ episode = 1, scenes = historiaScenes, hyperPools }: { episode?: 1 | 2 | 3; scenes?: HistoriaScene[]; hyperPools?: HistoriaScene[][] }) {
  const hyper = !!hyperPools;
  const total = hyper ? 18 : 9;
  const config = challengeConfig[episode];
  const bestKey = hyper ? 'historia-hyper-challenge-best-v2' : challengeBestKey(episode);
  const [questions, setQuestions] = useState<ReturnType<typeof chooseQuestions>>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [blockResult, setBlockResult] = useState(false);
  const [best, setBest] = useState(0);
  const sound = useFanfare();
  const [name, setName] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [celebration, setCelebration] = useState(0);
  const lock = useRef(false);
  const advanceLock = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setQuestions(hyperPools ? chooseHyperQuestions(hyperPools) : chooseQuestions(scenes, Math.random, episode));
      try {
        const stored = Number(localStorage.getItem(bestKey));
        if (Number.isInteger(stored) && stored >= 0 && stored <= total) setBest(stored);
      } catch { /* The quiz also works without browser storage. */ }
    });
    return () => cancelAnimationFrame(frame);
  }, [scenes, episode, bestKey, hyperPools, total]);

  const score = answers.filter((answer, i) => answer === questions[i]?.correctIndex).length;
  const block = hyperBlockState(questions, answers, index);
  const question = questions[index];
  const answered = answers.length > index;
  const rank = hyper ? hyperRankFor(score) : rankFor(score);

  function answer(option: number) {
    if (lock.current || answered || finished || blockResult) return;
    lock.current = true;
    advanceLock.current = false;
    setAnswers((previous) => [...previous, option]);
  }
  function next() {
    if (!answered || finished || blockResult || advanceLock.current) return;
    advanceLock.current = true;
    if (hyper && index === 8) {
      setBlockResult(true);
    } else if (index === questions.length - 1) {
      setFinished(true);
      setCompletionDate(new Date().toLocaleDateString('de-DE'));
      const nextBest = Math.max(best, score);
      setBest(nextBest);
      try { localStorage.setItem(bestKey, String(nextBest)); } catch { /* Optional. */ }
      if (hyper || score === total) {
        setCelebration(value => value + 1);
        if (sound.enabled) void sound.play(hyper);
      }
    } else {
      setIndex(index + 1);
      lock.current = false;
    }
    requestAnimationFrame(() => heading.current?.focus());
  }
  function continueBlock() {
    if (!blockResult || !block.passed) return;
    setBlockResult(false);
    setIndex(9);
    lock.current = false;
    advanceLock.current = false;
    requestAnimationFrame(() => heading.current?.focus());
  }
  function retryBlock() {
    sound.stop();
    const retry = retryHyperBlock(answers, index);
    setAnswers(retry.answers);
    setIndex(retry.index);
    setBlockResult(false);
    setFinished(false);
    setCompletionDate('');
    setCelebration(0);
    lock.current = false;
    advanceLock.current = false;
    requestAnimationFrame(() => heading.current?.focus());
  }
  function reset() {
    sound.stop();
    setQuestions(hyperPools ? chooseHyperQuestions(hyperPools) : chooseQuestions(scenes, Math.random, episode));
    setAnswers([]);
    setBlockResult(false);
    setIndex(0);
    setFinished(false);
    setCompletionDate('');
    setCelebration(0);
    lock.current = false;
    advanceLock.current = false;
    requestAnimationFrame(() => heading.current?.focus());
  }
  function celebrateAgain() {
    setCelebration(value => value + 1);
    if (sound.enabled) void sound.play(hyper);
  }

  return <main className={`${styles.page} ${hyper ? styles.hyperPage : ''} ${finished && hyper ? styles.printReady : ''}`}>
    {hyper && finished && celebration > 0 && <div key={celebration} className={styles.confetti} aria-hidden="true">
      {Array.from({ length: 110 }, (_, i) => <i key={i} style={{
        '--x': `${(i * 37) % 101}%`, '--delay': `${(i % 17) * 0.13}s`,
        '--drift': `${(i % 2 ? 1 : -1) * (30 + i % 90)}px`,
        '--turn': `${180 + i * 43}deg`, '--color': ['#c66944', '#d6a336', '#38839a', '#558970', '#9773ab'][i % 5],
      } as CSSProperties} />)}
    </div>}
    <header className={styles.header}>
      <a href="/">HISTORIA</a><a href={hyper ? '/episode-3/challenge/' : episode === 1 ? '/' : `/episode-${episode}`}>{hyper ? 'Zurück zu Episode 3' : `Zur Episode ${episode}`}</a>
    </header>
    <section className={styles.card} aria-labelledby="challenge-title">
      <div className={styles.topline}>
        <span>{hyper ? 'Das große Finale · Alle drei Episoden' : `Episode ${episode} · ${config.theme}`}</span>
        <div className={styles.soundControls}>
          <button onClick={sound.toggle} aria-pressed={sound.enabled}>
            {sound.enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            {sound.enabled ? 'Fanfare an · ausschalten' : 'Fanfare einschalten & probehören'}
          </button>
          {sound.enabled && <button onClick={() => void sound.play(hyper)}>Probehören</button>}
        </div>
      </div>
      {sound.error && <output>{sound.error}</output>}
      <p className={styles.soundHint}>{hyper ? 'Beim Abschluss feiern wir – mit Ton, wenn du die Fanfare einschaltest.' : 'Bei 9/9 erklingt die Fanfare, wenn du sie oben einschaltest.'}</p>
      <div className={styles.titleRow}>
        <div className={styles.cubeStage} aria-hidden="true"><div className={styles.cube}>
          <span><Landmark size={30} /></span><span>{hyper ? 'Ⅰ–Ⅲ' : ['Ⅰ', 'Ⅱ', 'Ⅲ'][episode - 1]}</span><span>✦</span>
        </div></div>
        <div><p className={styles.eyebrow}>{hyper ? 'Deine Historia Hyper-Challenge' : 'Deine Episoden-Challenge'}</p><h1 id="challenge-title">{hyper ? 'Einmal durch die Weltgeschichte' : config.title}</h1></div>
      </div>
      <p>{hyper ? '18 knifflige Fragen in zwei Blöcken mit je neun Fragen. Mit 9/9 in Block 1 schaltest du Block 2 frei. Dort bleibt Block 1 bei einer Wiederholung geschafft. Am Ende wartet deine persönliche Urkunde.' : 'Neun knifflige Fragen aus deiner Reise. Lies genau – manchmal täuscht der erste Eindruck.'}</p>
      {!question ? <output>Deine Fragen werden zusammengestellt …</output> : <>
        <div className={styles.stairHead}><span>{hyper ? `Block ${block.number} von 2${block.number === 2 ? ' · Block 1 geschafft ✓' : ''}` : 'Deine Zeitstufen'}</span><span>{score} richtig · Bestwert {best}/{total}</span></div>
        <ol className={`${styles.stairs} ${hyper ? styles.hyperStairs : ''}`} aria-label={`Quiztreppe mit ${total} Stufen`}>
          {questions.map((item, i) => {
            const done = answers.length > i;
            const correct = done && answers[i] === item.correctIndex;
            return <li key={`${item.episode}-${item.sceneId}`} style={{ '--height': `${38 + (i % 9) * 5}px` } as CSSProperties}
              className={done ? correct ? styles.correct : styles.wrong : i === index && !finished && !blockResult ? styles.current : ''}
              aria-current={i === index && !finished && !blockResult ? 'step' : undefined}
              aria-label={`Frage ${i + 1}: ${done ? correct ? 'richtig' : 'falsch' : 'noch offen'}`}>
              {i + 1}<span aria-hidden="true">{done ? correct ? '✓' : '×' : '·'}</span>
            </li>;
          })}
        </ol>
        {blockResult ? <div className={styles.result}>
          <p className={styles.eyebrow}>Block 1 · {block.score} von 9 richtig</p>
          <h2 ref={heading} tabIndex={-1}>{block.passed ? 'Block 1 geschafft!' : 'Noch einmal Block 1'}</h2>
          <p>{block.passed ? 'Deine ersten neun richtigen Antworten stehen fest. Weiter geht’s mit den restlichen neun Fragen.' : 'Mit neun richtigen Antworten öffnet sich Block 2. Du kannst die Fragen aus Block 1 jetzt noch einmal versuchen.'}</p>
          <div className={styles.actions}><button className={styles.primary} onClick={block.passed ? continueBlock : retryBlock}>{block.passed ? 'Block 2 beginnen' : 'Block 1 wiederholen'} <ArrowRight size={19} /></button></div>
        </div> : finished ? <div className={styles.result}>
          {!hyper && score === total && <div key={celebration} className={styles.fireworks} aria-hidden="true">{Array.from({length: 24}, (_, i) => <i key={i} style={{ '--angle': `${i * 15}deg` } as CSSProperties} />)}</div>}
          <p className={styles.eyebrow}>{hyper ? 'Dein großes Historia-Finale' : `Dein ${config.badge}`} · {score} von {total}</p>
          <h2 ref={heading} tabIndex={-1}>{rank}</h2>
          <p>{hyper ? (score === total ? 'Alle 18 richtig! Von der Antike bis in die Gegenwart: Du hast die Zusammenhänge im Blick. Das verdient einen großen Applaus!' : 'Geschafft! Du hast dich durch drei Episoden geknobelt. Feiere deinen Abschluss – und nimm die neu entdeckten Zusammenhänge mit.') : score === total ? config.success : 'Jede Antwort bringt dich weiter. Mit einer neuen Fragenrunde kannst du deinen Bestwert verbessern.'}</p>
          {hyper && score < total && <p>Block 1 bleibt mit 9/9 geschafft. Wiederhole nur die neun Fragen aus Block 2, um Historia-Champion zu werden.</p>}
          <div className={styles.actions}>
            {hyper && score < total ? <button className={styles.secondary} onClick={retryBlock}><RotateCcw size={18} /> Block 2 wiederholen</button> : <button className={styles.secondary} onClick={reset}><RotateCcw size={18} /> Noch einmal spielen</button>}
            {(hyper || score === total) && <button className={styles.primary} onClick={celebrateAgain}><Sparkles size={18} /> Noch einmal feiern</button>}
          </div>
        </div> : <div className={styles.question}>
          <p className={styles.eyebrow}>{hyper ? `Block ${block.number} · Frage ${index % 9 + 1} von 9` : `Frage ${index + 1} von ${total}`}</p>
          <p className={styles.topic}>{hyper ? `Episode ${question.episode} · ` : ''}{question.topic}</p>
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
            <div className={styles.actions}><button className={styles.primary} onClick={next}>{hyper && index === 8 ? 'Block 1 abschließen' : index === total - 1 ? 'Ergebnis ansehen' : 'Nächste Frage'} <ArrowRight size={19} /></button></div>
          </output>}
        </div>}
      </>}
    </section>
    {hyper && finished && <>
      <section className={styles.bridge} aria-labelledby="certificate-title">
        <p className={styles.eyebrow}>Zum Aufheben und Aufhängen</p>
        <h2 id="certificate-title">Deine persönliche Urkunde</h2>
        <label className={styles.nameLabel} htmlFor="certificate-name">Dein Name (freiwillig)</label>
        <input className={styles.nameInput} id="certificate-name" maxLength={60} autoComplete="off" value={name} onChange={event => setName(event.target.value)} placeholder="Oder später von Hand eintragen" />
        <small>Dein Name bleibt nur auf dieser Seite und wird nicht gespeichert oder übertragen. Beim Drucken erscheint ausschließlich die Urkunde.</small>
        <div className={styles.actions}><button className={styles.primary} onClick={() => { sound.stop(); window.print(); }}><Printer size={19} /> Urkunde drucken</button></div>
      </section>
      <Certificate name={name} score={score} rank={rank} date={completionDate} />
    </>}
    {!hyper && <section className={styles.bridge} aria-labelledby="next-episode">
      <p className={styles.eyebrow}>{config.bridgeLabel}</p>
      <h2 id="next-episode">{config.bridgeTitle}</h2>
      <p>{config.bridgeText}</p>
      <div className={styles.actions}><a className={styles.primary} href={config.href}>{config.action} <ArrowRight size={19} /></a></div>
      {!finished && <small>Du kannst auch ohne Quiz direkt weiterreisen.</small>}
      {episode !== 3 && <a className={styles.hyperLink} href="/hyper-challenge/">Alle Episoden mischen: zur Hyper-Challenge →</a>}
    </section>}
    <footer className={styles.footer}><a href="https://mibaso.de">⌂ Alle Mibaso-Apps</a><a href="/ueber">Über mich</a><a href="/impressum">Impressum &amp; Datenschutz</a></footer>
  </main>;
}
