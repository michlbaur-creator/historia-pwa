// Reuse an audio context unlocked by an explicit tap. No connection to narration.
// All scheduled notes can be stopped, including while resume() is still pending.
export class Fanfare {
  private context: AudioContext | null = null;
  private sources: OscillatorNode[] = [];
  private output: GainNode | null = null;
  private request = 0;
  constructor(private readonly createContext = () => new AudioContext()) {}

  stop() {
    this.request++;
    for (const source of this.sources) {
      try { source.stop(); } catch { /* Already finished. */ }
      source.disconnect();
    }
    this.sources = [];
    this.output?.disconnect();
    this.output = null;
  }

  async play(grand = false): Promise<boolean> {
    this.stop();
    const request = this.request;
    try {
      const context = this.context ??= this.createContext();
      await context.resume();
      if (request !== this.request) return false;
      if (context.state !== 'running') return false;
      const output = context.createGain();
      output.gain.value = 0.28;
      output.connect(context.destination);
      this.output = output;
      const origin = context.currentTime + 0.035;
      const tone = (frequency: number, offset: number, duration: number, drum = false) => {
        const oscillator = context.createOscillator();
        const envelope = context.createGain();
        const filter = context.createBiquadFilter();
        const start = origin + offset;
        oscillator.type = drum ? 'sine' : 'sawtooth';
        oscillator.frequency.setValueAtTime(drum ? frequency * 1.7 : frequency, start);
        if (drum) oscillator.frequency.exponentialRampToValueAtTime(frequency, start + 0.12);
        filter.type = 'lowpass';
        filter.frequency.value = drum ? 350 : 2200;
        envelope.gain.setValueAtTime(0, start);
        envelope.gain.linearRampToValueAtTime(drum ? 0.7 : 0.22, start + (drum ? 0.008 : 0.035));
        envelope.gain.exponentialRampToValueAtTime(0.001, start + duration);
        oscillator.connect(filter); filter.connect(envelope); envelope.connect(output);
        this.sources.push(oscillator);
        oscillator.onended = () => { oscillator.disconnect(); filter.disconnect(); envelope.disconnect(); };
        oscillator.start(start); oscillator.stop(start + duration + 0.02);
      };
      if (grand) {
        [0, 0.18, 0.36, 0.54, 0.72, 0.9, 1.08, 1.26].forEach((t, i) => tone(i % 2 ? 98 : 65.41, t, 0.45, true));
        [392, 392, 523.25, 659.25, 587.33, 659.25, 783.99].forEach((f, i) => tone(f, 1.4 + i * 0.3, 0.48));
        [261.63, 329.63, 392, 523.25].forEach(f => tone(f, 3.6, 1.8));
        tone(65.41, 3.6, 1.8, true);
      } else {
        [261.63, 329.63, 392, 523.25].forEach((f, i) => tone(f, i * 0.2, 0.65));
      }
      return true;
    } catch {
      if (request === this.request) this.stop();
      return false;
    }
  }

  dispose() {
    this.stop();
    void this.context?.close().catch(() => {});
    this.context = null;
  }
}
