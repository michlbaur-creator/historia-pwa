/* oxlint-disable next/no-html-link-for-pages -- Historia uses full page navigation because client navigation failed in the static export. */
export function SiteFooter() {
  return (
    <footer className="lp-footer">
      <a href="https://mibaso.de">⌂ Alle Mibaso-Apps</a>
      <p>
        <a href="/ueber/">Über mich</a> ·{' '}
        <a href="/impressum/">Impressum & Datenschutz</a>
      </p>
      <small>
        © 2026 Michael Baur · Kontakt:{' '}
        <a href="mailto:mibaur@me.com">mibaur@me.com</a>
      </small>
    </footer>
  );
}
