'use client';
import { useEffect, useRef, useState } from 'react';
import { Fanfare } from './fanfare';

export function useFanfare() {
  const player = useRef<Fanfare | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState('');
  const request = useRef(0);
  useEffect(() => () => { request.current++; player.current?.dispose(); player.current = null; }, []);
  async function play(grand = false) {
    const current = ++request.current;
    setError('');
    const ok = await (player.current ??= new Fanfare()).play(grand);
    if (current === request.current && !ok) setError('Der Festklang konnte nicht starten. Bitte noch einmal auf „Probehören“ tippen.');
  }
  function stop() { request.current++; player.current?.stop(); }
  function toggle() {
    setEnabled(!enabled);
    if (enabled) { stop(); setError(''); } else void play();
  }
  return { enabled, error, play, stop, toggle };
}
