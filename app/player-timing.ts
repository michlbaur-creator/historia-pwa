/** Readable sections of the approved text; never rewrite or drop words. */
export function readingSections(text: string): string[] {
  const sections: string[] = [];
  let current = '';
  for (const word of text.match(/\S+\s*/g) ?? []) {
    if (current && current.length + word.length > 115) {
      sections.push(current);
      current = '';
    }
    current += word;
    if (current.length >= 45 && /[.!?;:][“”»)]?\s*$/.test(current)) {
      sections.push(current);
      current = '';
    }
  }
  if (current) sections.push(current);
  return sections;
}

// No word-level timestamps exist. Distribute reading sections over the actual
// recording duration, weighting punctuation pauses. Audio time is the only clock.
export function readingSectionAt(
  sections: string[],
  elapsed: number,
  duration: number,
): string {
  if (!sections.length) return '';
  const weights = sections.map(
    (text) =>
      (text.match(/\S+/g)?.length ?? 0) +
      (text.match(/[.!?;:]/g)?.length ?? 0) * 1.5,
  );
  const target =
    Math.max(0, Math.min(1, duration > 0 ? elapsed / duration : 0)) *
    weights.reduce((a, b) => a + b, 0);
  let passed = 0;
  for (let i = 0; i < sections.length; i++) {
    passed += weights[i];
    if (target < passed) return sections[i];
  }
  return sections[sections.length - 1];
}

export function videoPosition(
  elapsed: number,
  startsAt: number,
  duration: number,
  hold: boolean,
) {
  const position = Math.max(0, elapsed - startsAt);
  if (!(duration > 0) || !Number.isFinite(duration))
    return { time: 0, finished: false };
  return hold
    ? {
        time: Math.min(position, Math.max(0, duration - 0.001)),
        finished: position >= duration,
      }
    : { time: position % duration, finished: false };
}
