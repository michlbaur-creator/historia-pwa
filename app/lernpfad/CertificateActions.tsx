'use client';
import { useEffect, useState } from 'react';
import type {
  LearningPathDefinition,
  LearningProgress,
} from '../data/learningPath';

export default function CertificateActions({
  path,
  saved,
  name,
  date,
}: {
  path: LearningPathDefinition;
  saved: LearningProgress;
  name: string;
  date: string;
}) {
  const [pdf, setPdf] = useState<{
    file: File;
    url: string;
    shareable: boolean;
  } | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | undefined;
    queueMicrotask(() => {
      if (!cancelled) {
        setPdf(null);
        setError('');
      }
    });
    import('./certificatePdf')
      .then(({ createCertificatePdf }) => {
        if (cancelled) return;
        const blob = createCertificatePdf(path, saved, name, date);
        const file = new File([blob], `Historia-Urkunde-${path.id}.pdf`, {
          type: 'application/pdf',
        });
        objectUrl = URL.createObjectURL(blob);
        let shareable = false;
        try {
          shareable = Boolean(navigator.canShare?.({ files: [file] }));
        } catch {
          /* PDF link remains available. */
        }
        setPdf({ file, url: objectUrl, shareable });
      })
      .catch(() => {
        if (!cancelled)
          setError(
            'Die PDF konnte nicht erstellt werden. Du kannst weiterhin den Browserdruck verwenden.',
          );
      });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [path, saved, name, date]);
  async function share() {
    if (!pdf) return;
    try {
      await navigator.share({
        files: [pdf.file],
        title: `Historia – ${path.title}`,
      });
    } catch (e) {
      if (!(e instanceof Error && e.name === 'AbortError'))
        setError(
          'Teilen ist hier nicht verfügbar. Öffne die PDF und nutze dort das Teilen- oder Druckmenü.',
        );
    }
  }
  return (
    <div className="lp-certificate-actions">
      <div className="lp-actions">
        <button onClick={() => window.print()}>Urkunde drucken</button>
        {pdf ? (
          <>
            <a
              className="lp-path-link"
              href={pdf.url}
              target="_blank"
              rel="noopener"
            >
              PDF öffnen / sichern
            </a>
            {pdf.shareable && (
              <button className="lp-primary" onClick={share}>
                PDF teilen / drucken
              </button>
            )}
          </>
        ) : (
          !error && <output>PDF wird vorbereitet …</output>
        )}
      </div>
      <p className="unit-note">
        iPhone / iPad: „PDF teilen / drucken“ wählen und im Teilen-Menü
        „Drucken“ oder „In Dateien sichern“ nutzen. Alternativ die PDF öffnen
        und dort das Teilen-Menü verwenden.
      </p>
      {error && (
        <output className="lp-notice">
          {error}
        </output>
      )}
    </div>
  );
}
