/* oxlint-disable next/no-html-link-for-pages -- Historia uses full page navigation because client navigation failed in the static export. */
'use client';
import { useEffect, useState } from 'react';

import HistoriaPlayer from './HistoriaPlayer';
import QuietEntry from './components/QuietEntry';
import { SiteFooter } from './components/SiteFooter';
import './lernpfad/learning-path.css';
export default function Welcome() {
  const [legacy, setLegacy] = useState(false);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.has('start') || query.has('weiter'))
      queueMicrotask(() => setLegacy(true));
  }, []);
  if (legacy) return <HistoriaPlayer />;
  return (
    <main className="lp-shell welcome">
      <header className="lp-header">
        <a href="/">◷ Historia</a>
        <span>Klassische Weltgeschichte</span>
      </header>
      <section className="welcome-intro">
        <p className="lp-kicker">
          Vergangenheit verstehen. Fragen an die Gegenwart.
        </p>
        <h1>
          Deine Reise.
          <br />
          <em>Dein Weg.</em>
        </h1>
        <p>
          Von den Pharaonen bis zur vernetzten Gegenwart.
          <br />
          Wie möchtest du Geschichte erleben?
        </p>
      </section>
      <QuietEntry />
      <div className="lp-path-grid welcome-ways">
        <a className="welcome-way discover-way" href="/entdecken/">
          <span className="way-icon" aria-hidden="true">
            ◷
          </span>
          <p className="lp-kicker">Neugier gibt das Tempo vor</p>
          <h2>Historia entdecken</h2>
          <p>
            Folge den Episoden, sieh dir Filme an und entdecke die Hintergründe.
            Mit allen Quizzen und Funktionen von Historia.
          </p>
          <strong>
            Frei losreisen <span aria-hidden="true">↗</span>
          </strong>
        </a>
        <a className="welcome-way classroom-way" href="/lernpfade/">
          <span className="way-icon" aria-hidden="true">
            ✎
          </span>
          <p className="lp-kicker">Schritt für Schritt gemeinsam lernen</p>
          <h2>Historia im Unterricht</h2>
          <p>
            Eine Leitfrage, fünf Stationen und deine eigene Erklärung. Lernpfade
            mit Quiz, Lernpass und Urkunde begleiten dich.
          </p>
          <strong>
            Unterrichtseinheit wählen <span aria-hidden="true">↗</span>
          </strong>
        </a>
      </div>
      <SiteFooter />
    </main>
  );
}
