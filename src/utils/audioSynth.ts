/**
 * Web Audio API synthesizer for ambient lo-fi chord progressions.
 * 100% standalone, no external mp3 download dependencies, runs directly in browser.
 */

class LoFiAmbientSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;

  private chords = [
    // Dm9: D, F, A, C, E
    [146.83, 174.61, 220.0, 261.63, 329.63],
    // G13: G, B, D, F, E
    [196.0, 246.94, 293.66, 349.23, 329.63],
    // Cmaj9: C, E, G, B, D
    [130.81, 164.81, 196.0, 246.94, 293.66],
    // Am9: A, C, E, G, B
    [110.0, 130.81, 164.81, 196.0, 246.94]
  ];

  private currentChordIndex = 0;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playChord(frequencies: number[]) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    frequencies.forEach((freq) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Warm lo-fi lowpass filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Smooth attack & decay
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 3.5);
    });
  }

  public start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Play first chord immediately
    this.playChord(this.chords[this.currentChordIndex]);
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    // Loop through chill chords every 3.2s
    this.intervalId = window.setInterval(() => {
      this.playChord(this.chords[this.currentChordIndex]);
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
    }, 3200);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const lofiSynth = new LoFiAmbientSynth();
