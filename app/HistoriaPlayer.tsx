'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  ExternalLink,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { historiaScenes } from './data';
import styles from './historia.module.css';

type Tab = 'text' | 'discover' | 'quiz';

const timelineColors = [
  '#c96d4d',
  '#d5a13d',
  '#68a6b8',
  '#70917c',
  '#bc705e',
  '#8f75a2',
  '#4f8493',
  '#d28a48',
  '#7f9c65',
  '#b9758b',
  '#4f9087',
  '#7185ad',
  '#c98254',
  '#9877a2',
  '#6098ac',
  '#557d88',
];

function formatTime(value: number) {
  const seconds = Math.max(0, Math.floor(value));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

export default function HistoriaPlayer() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showMap, setShowMap] = useState(true);
  const [tab, setTab] = useState<Tab>('text');
  const [audioDuration, setAudioDuration] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [quizSelection, setQuizSelection] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const scene = historiaScenes[sceneIndex];

  const image = showMap ? scene.mapImage : scene.mainImage;
  const activeDuration = audioDuration || scene.duration;
  const progress = Math.min(100, (elapsed / activeDuration) * 100);
  const imageTitle = scene.imageTitle ?? scene.people;
  const imageSubtitle = scene.imageSubtitle ?? scene.place;
  const activeQuiz = scene.quiz[quizQuestion];
  const quizIsCorrect = quizSelection === activeQuiz.correctIndex;
  const timelineProgress = useMemo(
    () =>
      ((sceneIndex + elapsed / activeDuration) / historiaScenes.length) * 100,
    [activeDuration, elapsed, sceneIndex],
  );

  useEffect(() => {
    if (!playing) return;
    void audioRef.current?.play().catch(() => setPlaying(false));
  }, [playing, scene.id]);

  useEffect(() => {
    const current = timelineRef.current?.querySelector<HTMLElement>(
      "[aria-current='step']",
    );
    current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [sceneIndex]);

  function selectScene(index: number) {
    audioRef.current?.pause();
    setSceneIndex(index);
    setElapsed(0);
    setAudioDuration(0);
    setShowMap(true);
    setPlaying(false);
    setQuizQuestion(0);
    setQuizSelection(null);
  }

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      if (audio.ended) audio.currentTime = 0;
      void audio.play();
    } else {
      audio.pause();
    }
  }

  function finishAudio() {
    if (sceneIndex < historiaScenes.length - 1) {
      setElapsed(0);
      setAudioDuration(0);
      setShowMap(true);
      setQuizQuestion(0);
      setQuizSelection(null);
      setSceneIndex((index) => index + 1);
      setPlaying(true);
      return;
    }
    setPlaying(false);
    setElapsed(activeDuration);
  }

  function stepScene(direction: -1 | 1) {
    selectScene(
      Math.max(0, Math.min(historiaScenes.length - 1, sceneIndex + direction)),
    );
  }

  function startSwipe(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'touch') return;
    swipeStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function finishSwipe(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'touch' || swipeStartX.current === null) return;
    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (distance < -48 && sceneIndex < historiaScenes.length - 1) {
      stepScene(1);
    }
  }

  return (
    <main className={styles.shell}>
      <audio
        key={scene.audio}
        ref={audioRef}
        src={scene.audio}
        preload="metadata"
        onLoadedMetadata={(event) => {
          if (Number.isFinite(event.currentTarget.duration)) {
            setAudioDuration(event.currentTarget.duration);
          }
        }}
        onTimeUpdate={(event) => {
          const current = event.currentTarget.currentTime;
          setElapsed(current);
          if (current >= 4) setShowMap(false);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={finishAudio}
      >
        <track
          kind="captions"
          src={`/assets/historia/episode1/captions/scene${String(scene.id).padStart(2, '0')}.vtt`}
          srcLang="de"
          label="Deutsch"
          default
        />
      </audio>
      <header className={styles.header}>
        <div className={styles.brandLockup}>
          <span className={styles.brandMark} aria-hidden="true">
            <Clock3 strokeWidth={2} />
          </span>
          <div>
            <h1>Historia</h1>
            <p className={styles.subtitle}>
              Episode 1 · Pharaonen Griechen und Cäsaren
            </p>
          </div>
        </div>
        <nav className={styles.headerActions} aria-label="Direktnavigation">
          <a href="https://evo.mibaso.de">
            Evo <ExternalLink aria-hidden="true" />
          </a>
          <button type="button" onClick={() => selectScene(0)}>
            <RotateCcw aria-hidden="true" /> Anfang
          </button>
        </nav>
      </header>

      <section
        className={styles.timelineCard}
        aria-label="Zeitstrahl der Episode"
      >
        <div className={styles.timelineScale} aria-hidden="true">
          <span>3100 v. Chr.</span>
          <span>1500 v. Chr.</span>
          <span>500 v. Chr.</span>
          <span>1</span>
          <span>476 n. Chr.</span>
        </div>
        <div className={styles.timelineViewport} ref={timelineRef}>
          <div className={styles.timelineRail}>
            <div
              className={styles.timelineFill}
              style={{ width: `${timelineProgress}%` }}
            />
            {historiaScenes.map((item, index) => (
              <button
                className={`${styles.milestone} ${index < sceneIndex ? styles.past : ''}`}
                key={item.id}
                style={
                  {
                    '--milestone-color': timelineColors[index],
                  } as CSSProperties
                }
                onClick={() => selectScene(index)}
                aria-current={index === sceneIndex ? 'step' : undefined}
                aria-label={`Szene ${item.id}: ${item.title}`}
              >
                <span className={styles.dot}>{item.id}</span>
                <span className={styles.milestoneLabel}>{item.shortTitle}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sceneHeading}>
        <h2>{scene.title}</h2>
      </section>

      <section className={styles.player}>
        <div
          className={styles.imageStage}
          onPointerDown={startSwipe}
          onPointerUp={finishSwipe}
          onPointerCancel={() => {
            swipeStartX.current = null;
          }}
        >
          <Image
            key={image}
            src={image}
            alt={
              showMap
                ? `Karte zu ${scene.title}`
                : `Historische Bildszene: ${scene.title}`
            }
            fill
            priority={sceneIndex === 0}
            sizes="(max-width: 980px) 100vw, 1120px"
            className={styles.sceneImage}
          />
          <div className={styles.imageShade} />
          <div className={styles.imageCaption}>
            <div>
              <strong>{imageTitle}</strong>
              <span>{imageSubtitle}</span>
            </div>
          </div>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.previousControl}
            onClick={() => stepScene(-1)}
            disabled={sceneIndex === 0}
            aria-label="Vorherige Szene"
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            className={styles.primaryControl}
            onClick={togglePlayback}
            aria-label={playing ? 'Pause' : 'Abspielen'}
          >
            {playing ? (
              <>
                <Pause aria-hidden="true" /> Pause
              </>
            ) : (
              <>
                <Play aria-hidden="true" /> Szene starten
              </>
            )}
          </button>
          <button
            className={styles.mapControl}
            onClick={() => setShowMap((value) => !value)}
          >
            {showMap ? 'Hauptbild' : 'Karte'}
          </button>
          <div className={styles.progressGroup}>
            <div
              className={styles.progressTrack}
              aria-label="Fortschritt der Szene"
            >
              <div style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.time}>
              {formatTime(elapsed)} / {formatTime(activeDuration)}
            </span>
          </div>
          <button
            className={styles.nextControl}
            onClick={() => stepScene(1)}
            disabled={sceneIndex === historiaScenes.length - 1}
          >
            Weiter <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </section>

      <nav className={styles.episodeNav} aria-label="Episoden">
        <button className={styles.episodeActive}>Episode 1</button>
        <button disabled>Episode 2</button>
        <button disabled>Episode 3</button>
      </nav>

      <section className={styles.contentCard}>
        <div className={styles.tabs} role="tablist" aria-label="Szeneninhalte">
          <button
            role="tab"
            aria-selected={tab === 'text'}
            onClick={() => setTab('text')}
          >
            Sprechertext
          </button>
          <button
            role="tab"
            aria-selected={tab === 'discover'}
            onClick={() => setTab('discover')}
          >
            Entdecken
          </button>
          <button
            role="tab"
            aria-selected={tab === 'quiz'}
            onClick={() => setTab('quiz')}
          >
            Quiz
          </button>
        </div>
        <div className={styles.tabPanel} role="tabpanel">
          {tab === 'text' && (
            <p className={styles.narration}>{scene.narration}</p>
          )}
          {tab === 'discover' && (
            <div className={styles.discoveryGrid}>
              {scene.discoveries.map((discovery, index) => (
                <article className={styles.discoveryCard} key={discovery.title}>
                  <span className={styles.discoveryNumber}>{index + 1}</span>
                  <div>
                    <small>{discovery.label}</small>
                    <h3>{discovery.title}</h3>
                    <p>{discovery.text}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
          {tab === 'quiz' && (
            <div className={styles.quizPanel}>
              <div className={styles.quizHeading}>
                <span>
                  Frage {quizQuestion + 1} von {scene.quiz.length}
                </span>
                <i aria-hidden="true">
                  {scene.quiz.map((_, index) => (
                    <b
                      className={index === quizQuestion ? styles.quizDotActive : ''}
                      key={index}
                    />
                  ))}
                </i>
              </div>
              <h3>{activeQuiz.question}</h3>
              <div className={styles.quizOptions}>
                {activeQuiz.options.map((option, index) => {
                  const selected = quizSelection === index;
                  const correct = selected && index === activeQuiz.correctIndex;
                  const wrong = selected && index !== activeQuiz.correctIndex;
                  return (
                    <button
                      className={`${selected ? styles.quizSelected : ''} ${correct ? styles.quizCorrect : ''} ${wrong ? styles.quizWrong : ''}`}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setQuizSelection(index)}
                      key={option}
                    >
                      <span>{String.fromCharCode(65 + index)}</span>
                      {option}
                    </button>
                  );
                })}
              </div>
              {quizSelection !== null && (
                <output
                  className={`${styles.quizFeedback} ${quizIsCorrect ? styles.quizFeedbackCorrect : styles.quizFeedbackWrong}`}
                >
                  <strong>{quizIsCorrect ? 'Richtig.' : 'Noch nicht ganz.'}</strong>
                  <span>
                    {quizIsCorrect
                      ? activeQuiz.explanation
                      : 'Schau noch einmal in den Sprechertext und versuche es erneut.'}
                  </span>
                </output>
              )}
              {quizIsCorrect && quizQuestion < scene.quiz.length - 1 && (
                <button
                  className={styles.quizNext}
                  type="button"
                  onClick={() => {
                    setQuizQuestion((value) => value + 1);
                    setQuizSelection(null);
                  }}
                >
                  Nächste Frage <ArrowRight aria-hidden="true" />
                </button>
              )}
              {quizIsCorrect && quizQuestion === scene.quiz.length - 1 && (
                <p className={styles.quizComplete}>Beide Fragen geschafft.</p>
              )}
            </div>
          )}
        </div>
      </section>

      <footer className={styles.footer}>
        <a href="https://mibaso.de">⌂ Alle Mibaso-Apps</a>
        <span>
          <Link href="/ueber">Über mich</Link> ·{' '}
          <Link href="/impressum">Impressum &amp; Datenschutz</Link>
        </span>
        <small>
          © 2026 Michael Baur · Kontakt:{' '}
          <a href="mailto:mibaur@me.com">mibaur@me.com</a>
        </small>
      </footer>
    </main>
  );
}
