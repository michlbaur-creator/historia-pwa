'use client';

import Image from 'next/image';
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
import { flushSync } from 'react-dom';
import { historiaScenes, type HistoriaScene } from './data';
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

type HistoriaPlayerProps = {
  scenes?: HistoriaScene[];
  episodeNumber?: 1 | 2 | 3;
  episodeTitle?: string;
  timelineLabels?: [string, string, string, string, string];
};

export default function HistoriaPlayer({
  scenes = historiaScenes,
  episodeNumber = 1,
  episodeTitle = 'Pharaonen Griechen und Cäsaren',
  timelineLabels = [
    '3100 v. Chr.',
    '1500 v. Chr.',
    '500 v. Chr.',
    '1',
    '476 n. Chr.',
  ],
}: HistoriaPlayerProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showMap, setShowMap] = useState(true);
  const [tab, setTab] = useState<Tab>('discover');
  const [audioDuration, setAudioDuration] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [quizSelection, setQuizSelection] = useState<number | null>(null);
  const [mapAnimationRun, setMapAnimationRun] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingAudioStartRef = useRef(false);
  const audioRequestRef = useRef(0);
  const [audioError, setAudioError] = useState('');
  const swipeStartX = useRef<number | null>(null);
  const scene = scenes[sceneIndex];

  const renderedMapImage =
    scene.mapImage?.includes('.svg') && mapAnimationRun > 0
      ? `${scene.mapImage}#play`
      : scene.mapImage;
  const activeDuration = audioDuration || scene.duration;
  const progress = Math.min(100, (elapsed / activeDuration) * 100);
  const sceneProgress = activeDuration > 0 ? elapsed / activeDuration : 0;
  const secondaryBlend =
    !showMap && scene.secondaryImage && !scene.video
      ? Math.min(1, Math.max(0, (sceneProgress - 0.54) / 0.12))
      : 0;
  const showingSecondary = secondaryBlend >= 0.5;
  const imageTitle = showingSecondary
    ? (scene.secondaryImageTitle ?? scene.imageTitle ?? scene.people)
    : (scene.imageTitle ?? scene.people);
  const imageSubtitle = showingSecondary
    ? (scene.secondaryImageSubtitle ?? scene.imageSubtitle ?? scene.place)
    : (scene.imageSubtitle ?? scene.place);
  const activeQuiz = scene.quiz[quizQuestion];
  const quizIsCorrect = quizSelection === activeQuiz.correctIndex;
  const timelineProgress = useMemo(
    () => ((sceneIndex + elapsed / activeDuration) / scenes.length) * 100,
    [activeDuration, elapsed, sceneIndex, scenes.length],
  );

  useEffect(() => {
    if (scene.audio || !playing) return;
    const interval = window.setInterval(() => {
      setElapsed((current) => {
        const next = Math.min(scene.duration, current + 0.1);
        if (next >= 4) setShowMap(false);
        if (next >= scene.duration) {
          window.clearInterval(interval);
          window.setTimeout(finishAudio, 0);
        }
        return next;
      });
    }, 100);
    return () => window.clearInterval(interval);
  }, [playing, scene.audio, scene.duration, scene.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (!playing || showMap) {
      video.pause();
      return;
    }
    if (scene.videoPlayback === 'hold' && video.ended) return;
    void video.play().catch(() => {
      // Das Hauptbild bleibt als Poster sichtbar, falls Video blockiert wird.
    });
  }, [playing, scene.id, scene.videoPlayback, showMap]);

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

  function selectScene(index: number, autoPlay = false) {
    const nextScene = scenes[index];
    audioRequestRef.current += 1;
    pendingAudioStartRef.current = false;
    audioRef.current?.pause();
    videoRef.current?.pause();
    pendingAudioStartRef.current = autoPlay;
    flushSync(() => {
      setSceneIndex(index);
      setElapsed(0);
      setAudioDuration(0);
      setShowMap(true);
      setPlaying(false);
      setAudioError('');
      setMapAnimationRun(autoPlay ? 1 : 0);
      setQuizQuestion(0);
      setQuizSelection(null);
    });

    // Keep the same media element (and its mobile playback permission), but
    // explicitly select the new source before play() in this user gesture.
    audioRef.current?.load();
    if (!autoPlay) return;

    if (!nextScene.audio) {
      pendingAudioStartRef.current = false;
      setPlaying(true);
      return;
    }

    const nextAudio = audioRef.current;
    if (!nextAudio) {
      pendingAudioStartRef.current = false;
      return;
    }

    startAudio(nextAudio);
  }

  function startAudio(audio: HTMLAudioElement) {
    const request = ++audioRequestRef.current;
    pendingAudioStartRef.current = true;
    setAudioError('');
    void audio.play().catch(() => {
      if (request !== audioRequestRef.current) return;
      pendingAudioStartRef.current = false;
      setPlaying(false);
      setAudioError('Der Ton konnte nicht starten. Bitte tippe auf „Szene starten“.');
    });
  }

  function togglePlayback() {
    const audio = audioRef.current;
    if (!scene.audio || !audio) {
      if (elapsed >= activeDuration) {
        setElapsed(0);
        setShowMap(true);
      }
      if (!playing) setMapAnimationRun((value) => value + 1);
      setPlaying((value) => !value);
      return;
    }
    if (audio.paused) {
      if (audio.ended) {
        audio.currentTime = 0;
        if (videoRef.current) videoRef.current.currentTime = 0;
      }
      setMapAnimationRun((value) => value + 1);
      startAudio(audio);
    } else {
      audioRequestRef.current += 1;
      pendingAudioStartRef.current = false;
      audio.pause();
    }
  }

  function finishAudio() {
    pendingAudioStartRef.current = false;
    setPlaying(false);
    setElapsed(activeDuration);
  }

  function stepScene(direction: -1 | 1) {
    selectScene(
      Math.max(0, Math.min(scenes.length - 1, sceneIndex + direction)),
      direction === 1,
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
    if (distance < -48 && sceneIndex < scenes.length - 1) {
      stepScene(1);
    } else if (distance > 48 && sceneIndex > 0) {
      stepScene(-1);
    }
  }

  return (
    <main className={styles.shell}>
        <audio
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
          onPlaying={(event) => {
            if (event.currentTarget.paused) return;
            pendingAudioStartRef.current = false;
            setPlaying(true);
          }}
          onPause={(event) => {
            if (event.currentTarget.paused && !event.currentTarget.ended && !pendingAudioStartRef.current) {
              setPlaying(false);
            }
          }}
          onError={() => {
            pendingAudioStartRef.current = false;
            setPlaying(false);
            setAudioError('Die Tondatei konnte nicht geladen werden. Bitte versuche es erneut.');
          }}
          onEnded={finishAudio}
        >
          {scene.caption && (
            <track
              kind="captions"
              src={scene.caption}
              srcLang="de"
              label="Deutsch"
              default
            />
          )}
        </audio>
      <header className={styles.header}>
        <div className={styles.brandLockup}>
          <span className={styles.brandMark} aria-hidden="true">
            <Clock3 strokeWidth={2} />
          </span>
          <div>
            <h1>Historia</h1>
            <p className={styles.subtitle}>
              Episode {episodeNumber} · {episodeTitle}
            </p>
            <p className={styles.seriesRelation}>
              Ein historischer Zoom in Episode 3 der Großen Zeitreise.
            </p>
          </div>
        </div>
        <nav className={styles.headerActions} aria-label="Direktnavigation">
          <a href="https://evo.mibaso.de/episode-3/?start=1">
            Große Zeitreise <ExternalLink aria-hidden="true" />
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
          {timelineLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className={styles.timelineViewport} ref={timelineRef}>
          <div className={styles.timelineRail}>
            <div
              className={styles.timelineFill}
              style={{ width: `${timelineProgress}%` }}
            />
            {scenes.map((item, index) => (
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
          className={`${styles.imageStage} ${!showMap && episodeNumber === 3 && scene.id <= 3 ? styles.mobileTallImageStage : ''}`}
          onPointerDown={startSwipe}
          onPointerUp={finishSwipe}
          onPointerCancel={() => {
            swipeStartX.current = null;
          }}
        >
          <div
            className={`${styles.visualLayer} ${styles.sceneVisualLayer} ${showMap ? styles.sceneVisualBehind : styles.sceneVisualActive}`}
            aria-hidden={showMap}
          >
            {scene.video ? (
              <video
                key={scene.video}
                ref={videoRef}
                src={scene.video}
                poster={scene.mainImage}
                preload="metadata"
                playsInline
                muted
                loop={scene.videoPlayback !== 'hold'}
                aria-hidden="true"
                className={styles.sceneVideo}
              />
            ) : scene.secondaryImage && scene.mainImage ? (
              <div className={styles.imageSequence}>
                <Image
                  src={scene.mainImage}
                  alt={`Historische Bildszene: ${scene.title}`}
                  fill
                  priority={sceneIndex === 0}
                  sizes="(max-width: 980px) 100vw, 1120px"
                  className={`${styles.sceneImage} ${styles.sequenceImage}`}
                  style={{
                    opacity: 1 - secondaryBlend,
                    transform: `scale(${1 + secondaryBlend * 0.012})`,
                  }}
                />
                <Image
                  src={scene.secondaryImage}
                  alt={`Zweite historische Bildszene: ${scene.title}`}
                  fill
                  sizes="(max-width: 980px) 100vw, 1120px"
                  className={`${styles.sceneImage} ${styles.sequenceImage}`}
                  style={{
                    opacity: secondaryBlend,
                    transform: `scale(${1.012 - secondaryBlend * 0.012})`,
                  }}
                />
              </div>
            ) : scene.mainImage ? (
              <Image
                src={scene.mainImage}
                alt={`Historische Bildszene: ${scene.title}`}
                fill
                priority={sceneIndex === 0}
                sizes="(max-width: 980px) 100vw, 1120px"
                className={styles.sceneImage}
              />
            ) : (
              <div className={`${styles.mediaDraft} ${styles.imageDraft}`}>
                <small>Hauptbild · Bildkonzept</small>
                <strong>{scene.people}</strong>
                <p>{scene.imageConcept}</p>
              </div>
            )}
          </div>

          <div
            className={`${styles.visualLayer} ${styles.mapVisualLayer} ${showMap ? styles.mapVisualActive : styles.mapVisualLeaving}`}
            aria-hidden={!showMap}
          >
            {renderedMapImage ? (
              <Image
                key={`${renderedMapImage}-${mapAnimationRun}`}
                src={renderedMapImage}
                alt={`Karte zu ${scene.title}`}
                fill
                priority={sceneIndex === 0}
                sizes="(max-width: 980px) 100vw, 1120px"
                className={styles.sceneImage}
              />
            ) : (
              <div className={`${styles.mediaDraft} ${styles.mapDraft}`}>
                <small>
                  {`Karte · ${scene.date}`}
                </small>
                <strong>{scene.place}</strong>
                <p>{scene.mapConcept}</p>
                {scene.mapDetails && (
                  <ul>
                    {scene.mapDetails.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div className={styles.imageShade} />
          <div className={styles.imageCaption}>
            <div>
              <strong>{imageTitle}</strong>
              <span>{imageSubtitle}</span>
            </div>
          </div>
        </div>

        {audioError && <p role="status">{audioError}</p>}
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
            disabled={sceneIndex === scenes.length - 1}
          >
            Weiter <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </section>

      <nav className={styles.episodeNav} aria-label="Episoden">
        {episodeNumber === 1 ? (
          <button
            className={styles.episodeActive}
            onClick={() => selectScene(0)}
          >
            Episode 1
          </button>
        ) : (
          <a href="/">Episode 1</a>
        )}
        {episodeNumber === 2 ? (
          <button
            className={styles.episodeActive}
            onClick={() => selectScene(0)}
          >
            Episode 2
          </button>
        ) : (
          <a href="/episode-2">Episode 2</a>
        )}
        {episodeNumber === 3 ? (
          <button
            className={styles.episodeActive}
            onClick={() => selectScene(0)}
          >
            Episode 3
          </button>
        ) : (
          <a href="/episode-3">Episode 3</a>
        )}
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
                      className={
                        index === quizQuestion ? styles.quizDotActive : ''
                      }
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
                  <strong>
                    {quizIsCorrect ? 'Richtig.' : 'Noch nicht ganz.'}
                  </strong>
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
        <nav className={styles.footerLinks} aria-label="Fußnavigation">
          <a href="/ueber">Über mich</a>
          <a href="/impressum">Impressum &amp; Datenschutz</a>
        </nav>
        <small>
          © 2026 Michael Baur · Kontakt:{' '}
          <a href="mailto:mibaur@me.com">mibaur@me.com</a>
        </small>
      </footer>
    </main>
  );
}
