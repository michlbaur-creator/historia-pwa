/* oxlint-disable next/no-html-link-for-pages -- Historia uses full page navigation because client navigation failed in the static export. */
'use client';
import { useEffect, useState } from 'react';

import {
  learningPaths,
  readProgress,
  type LearningProgress,
} from '../data/learningPath';
import { SiteFooter } from '../components/SiteFooter';
import '../lernpfad/learning-path.css';
import QuietEntry from '../components/QuietEntry';
export default function LearningPaths() {
  const [progress, setProgress] = useState<LearningProgress[] | null>(null);
  useEffect(() => {
    queueMicrotask(() => {
      try {
        setProgress(
          learningPaths.map((p) =>
            readProgress(localStorage.getItem(p.key), p.stations),
          ),
        );
      } catch {
        /* Learning remains available without storage. */
      }
    });
  }, []);
  return (
    <main className="lp-shell">
      <header className="lp-header">
        <a href="/">◷ Historia</a>
        <a href="/entdecken/">Frei entdecken →</a>
      </header>
      <section className="lp-hero">
        <div>
          <p className="lp-kicker">
            Vergangenheit verstehen · vier Unterrichtseinheiten
          </p>
          <h1>Historia im Unterricht</h1>
          <p>
            Wähle deine Unterrichtseinheit: erst vermuten, dann entdecken,
            selbst erklären und gemeinsam besprechen. Dein Lernpass hält fest,
            was du schon geschafft hast.
          </p>
        </div>
        <div className="lp-pass-mark" aria-hidden="true">
          <span>◷</span>
          <strong>40 Min.</strong>
          <small>Richtwert zur Erprobung</small>
        </div>
      </section>
      <p className="unit-note">
        Vier ausgewählte Themen in zeitlicher Reihenfolge. Die vollständige
        Reise mit allen 52 Szenen bleibt unter „Frei entdecken“ erreichbar.
      </p>
      <QuietEntry />
      <p className="unit-note">
        Alle Einheiten: 5 Stationen · 10 Quizfragen · eine eigene Denkaufgabe.
        Allein oder zu zweit, mit Heft oder Papier.
      </p>
      <div className="lp-path-grid">
        {learningPaths.map((p, i) => {
          const saved = progress?.[i];
          const completed = saved?.scores.filter((s) => s !== null).length ?? 0;
          const points =
            saved?.scores.reduce<number>((sum, s) => sum + (s ?? 0), 0) ?? 0;
          return (
            <section className="lp-card lp-path-card" key={p.id}>
              <p className="lp-kicker">
                Lernpfad {i + 1} · Episode {p.episode}
              </p>
              <h2>{p.title}</h2>
              <strong>{p.subtitle}</strong>
              <p>{p.intro}</p>
              <p className="unit-chips">
                <span>5 Stationen</span>
                <span>≈ {p.duration} Minuten</span>
              </p>
              <div className="lp-overview-score">
                {saved
                  ? `${points}/10 Wissenspunkte · ${completed}/5 Stationen`
                  : 'Dein eigener Lernpass'}
                <progress
                  aria-label={`Wissenspunkte: ${p.title}`}
                  max={10}
                  value={points}
                />
              </div>
              <a className="lp-path-link" href={p.href}>
                {completed === 5
                  ? 'Einheit & Lernpass ansehen'
                  : completed
                    ? 'Fortsetzen'
                    : 'Lernpfad starten'}{' '}
                →
              </a>
            </section>
          );
        })}
      </div>
      <SiteFooter />
    </main>
  );
}
