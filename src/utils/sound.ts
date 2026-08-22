// Procedural sound synthesizer and Authentic Vietnamese Folk Music Audio Engine
class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public bgmEnabled: boolean = false;
  private bgmAudio: HTMLAudioElement | null = null;
  private synthInterval: any = null;

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Rolling dice rattle sound
  playDiceRoll() {
    const ctx = this.getContext();
    if (!ctx) return;

    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const audioCtx = this.getContext();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150 + Math.random() * 200, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      }, i * 45);
    }
  }

  // Money coin chimes
  playMoneyGain() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        const audioCtx = this.getContext();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      }, idx * 60);
    });
  }

  // Payment / deduction sound
  playMoneyPay() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }

  // Property bought fanfare
  playBuyProperty() {
    const ctx = this.getContext();
    if (!ctx) return;

    const chords = [440, 554.37, 659.25, 880];
    chords.forEach((freq, i) => {
      setTimeout(() => {
        const audioCtx = this.getContext();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }, i * 50);
    });
  }

  // Card draw sound
  playCardDraw() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  }

  // Police siren sound when caught and sent to jail
  playPoliceSiren() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';

    // 2-tone siren wail
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.linearRampToValueAtTime(950, now + 0.25);
    osc.frequency.linearRampToValueAtTime(650, now + 0.5);
    osc.frequency.linearRampToValueAtTime(950, now + 0.75);
    osc.frequency.linearRampToValueAtTime(600, now + 1.0);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.1);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.1);
  }

  // Heavy iron prison bars slamming sound
  playJailSlam() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Low heavy impact thud
    const oscLow = ctx.createOscillator();
    const gainLow = ctx.createGain();
    oscLow.type = 'sine';
    oscLow.frequency.setValueAtTime(140, now);
    oscLow.frequency.exponentialRampToValueAtTime(30, now + 0.4);
    gainLow.gain.setValueAtTime(0.3, now);
    gainLow.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    oscLow.connect(gainLow);
    gainLow.connect(ctx.destination);
    oscLow.start(now);
    oscLow.stop(now + 0.4);

    // 2. High metallic iron gate clash
    const oscMetal = ctx.createOscillator();
    const gainMetal = ctx.createGain();
    oscMetal.type = 'square';
    oscMetal.frequency.setValueAtTime(520, now);
    oscMetal.frequency.exponentialRampToValueAtTime(180, now + 0.3);
    gainMetal.gain.setValueAtTime(0.15, now);
    gainMetal.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    oscMetal.connect(gainMetal);
    gainMetal.connect(ctx.destination);
    oscMetal.start(now);
    oscMetal.stop(now + 0.35);
  }

  // ================= AUTHENTIC VIETNAMESE FOLK BGM ENGINE =================
  toggleBgm(): boolean {
    this.bgmEnabled = !this.bgmEnabled;
    if (this.bgmEnabled) {
      this.startVietnameseBgm();
    } else {
      this.stopVietnameseBgm();
    }
    return this.bgmEnabled;
  }

  private startVietnameseBgm() {
    if (typeof window === 'undefined') return;

    // 1. Try playing authentic traditional Vietnamese / Asian folk acoustic recording (Bamboo Flute & Zither)
    if (!this.bgmAudio) {
      this.bgmAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3');
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = 0.28;
    }

    const playPromise = this.bgmAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback to rich Vietnamese Pentatonic Đàn Tranh acoustic physical synthesizer
        this.startVietnameseFolkSynthesizer();
      });
    }
  }

  private stopVietnameseBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.bgmAudio.currentTime = 0;
    }
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  // Authentic Vietnamese Pentatonic (Hò, Xự, Xang, Xê, Cống - Lý Cây Đa / Trống Cơm melody) with Plucked String Resonator
  private startVietnameseFolkSynthesizer() {
    if (this.synthInterval) clearInterval(this.synthInterval);

    // Traditional Vietnamese Folk Scale (Lý Cây Bông / Trống Cơm motif with authentic slides)
    const melody: { freq: number; dur: number; bend?: number }[] = [
      { freq: 440.00, dur: 400, bend: 493.88 }, // A4 -> B4 (Vuốt / Luyến)
      { freq: 523.25, dur: 350 },               // C5
      { freq: 587.33, dur: 450, bend: 659.25 }, // D5 -> E5 (Nhấn ngón)
      { freq: 659.25, dur: 400 },               // E5
      { freq: 587.33, dur: 350 },               // D5
      { freq: 523.25, dur: 400, bend: 440.00 }, // C5 -> A4 (Đổ hột)
      { freq: 440.00, dur: 500 },               // A4
      { freq: 392.00, dur: 400, bend: 440.00 }, // G4 -> A4
      { freq: 523.25, dur: 600 },               // C5 ngân dài
      { freq: 587.33, dur: 350 },               // D5
      { freq: 659.25, dur: 500, bend: 783.99 }, // E5 -> G5
      { freq: 523.25, dur: 650 },               // C5 kết câu
    ];

    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.bgmEnabled) return;
      const ctx = this.getContext();
      if (!ctx) return;

      const current = melody[noteIndex % melody.length];
      const now = ctx.currentTime;

      // 1. Primary string pluck (Sine + Triangle blend for silk string acoustic warmth)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      // Fundamental frequency
      osc1.frequency.setValueAtTime(current.freq, now);
      osc2.frequency.setValueAtTime(current.freq * 2, now); // Overtone harmonic

      // Traditional Vietnamese pitch bend (Luyến / Ngân rung đặc trưng Đàn Tranh)
      if (current.bend) {
        osc1.frequency.exponentialRampToValueAtTime(current.bend, now + current.dur / 1000 * 0.7);
        osc2.frequency.exponentialRampToValueAtTime(current.bend * 2, now + current.dur / 1000 * 0.7);
      }

      // Warm acoustic lowpass filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.frequency.exponentialRampToValueAtTime(600, now + current.dur / 1000);

      // Plucked string envelope
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + current.dur / 1000 + 0.3);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + current.dur / 1000 + 0.35);
      osc2.stop(now + current.dur / 1000 + 0.35);

      noteIndex++;
      this.synthInterval = setTimeout(playNextNote, current.dur);
    };

    playNextNote();
  }
}

export const sounds = new SoundEngine();
