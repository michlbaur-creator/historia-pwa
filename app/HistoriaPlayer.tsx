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
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { historiaScenes } from './data';
import styles from './historia.module.css';

type Tab = 'text' | 'discover' | 'quiz';

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
  const timelineRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const scene = historiaScenes[sceneIndex];

  const image = showMap ? scene.mapImage : scene.mainImage;
  const progress = Math.min(100, (elapsed / scene.duration) * 100);
  const imageTitle = scene.imageTitle ?? scene.people;
  const imageSubtitle = scene.imageSubtitle ?? scene.place;
  const timelineProgress = useMemo(
    () =>
      ((sceneIndex + elapsed / scene.duration) / historiaScenes.length) * 100,
    [elapsed, scene.duration, sceneIndex],
  );

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setElapsed((current) => {
        const next = current + 0.1;
        if (next >= 4) setShowMap(false);
        if (next < scene.duration) return next;
        if (sceneIndex < historiaScenes.length - 1) {
          setSceneIndex((index) => index + 1);
          setShowMap(true);
          return 0;
        }
        setPlaying(false);
        return scene.duration;
      });
    }, 100);
    return () => window.clearInterval(timer);
  }, [playing, scene.duration, sceneIndex]);

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
    setSceneIndex(index);
    setElapsed(0);
    setShowMap(true);
    setPlaying(false);
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
            onClick={() => setPlaying((value) => !value)}
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
              {formatTime(elapsed)} / {formatTime(scene.duration)}
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
            <div className={styles.placeholder}>
              <strong>Entdecken folgt nach der Inhaltsfreigabe.</strong>
              <span>
                Der Bereich ist technisch getrennt vorangelegt; neue Inhalte
                wurden nicht erfunden.
              </span>
            </div>
          )}
          {tab === 'quiz' && (
            <div className={styles.placeholder}>
              <strong>Quiz folgt nach der Inhaltsfreigabe.</strong>
              <span>
                Fragen und Lösungen werden erst aus dem abgestimmten Material
                übernommen.
              </span>
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
