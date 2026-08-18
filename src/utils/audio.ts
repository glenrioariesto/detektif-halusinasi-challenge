// Web Audio API Sound & Background Music Engine for Detektif Halusinasi
// 100% Offline-First, Lightweight, Zero-CDN dependency

let audioCtx: AudioContext | null = null;
let bgmGainNode: GainNode | null = null;
let bgmTimer: number | null = null;
let isBgmRunning = false;

// Persisted mute state
let isMuted = false;
try {
  isMuted = localStorage.getItem('detektif_audio_muted') === 'true';
} catch {
  isMuted = false;
}

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtxClass) return null;
  
  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new AudioCtxClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

export const getIsMuted = (): boolean => isMuted;

export const setMuted = (muted: boolean): boolean => {
  isMuted = muted;
  try {
    localStorage.setItem('detektif_audio_muted', muted ? 'true' : 'false');
  } catch {}

  if (bgmGainNode && audioCtx) {
    bgmGainNode.gain.setValueAtTime(isMuted ? 0 : 0.05, audioCtx.currentTime);
  }
  return isMuted;
};

export const toggleMute = (): boolean => {
  return setMuted(!isMuted);
};

// Procedural Ambient Cyber-Detective Investigation Music Engine
export const startBGM = () => {
  if (isBgmRunning) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  isBgmRunning = true;

  // Master BGM gain
  bgmGainNode = ctx.createGain();
  bgmGainNode.gain.setValueAtTime(isMuted ? 0 : 0.05, ctx.currentTime);
  bgmGainNode.connect(ctx.destination);

  // Minor investigation chord progression (Dm, Bb, F, C) frequencies (Hz)
  const chords = [
    [146.83, 220.00, 261.63, 349.23], // Dm (D3, A3, C4, F4)
    [116.54, 174.61, 233.08, 293.66], // Bb (Bb2, F3, Bb3, D4)
    [130.81, 196.00, 261.63, 329.63], // C (C3, G3, C4, E4)
    [110.00, 164.81, 220.00, 261.63], // Am (A2, E3, A3, C4)
  ];

  let chordIndex = 0;

  const playAmbientAtmosphere = () => {
    if (!isBgmRunning || !audioCtx || !bgmGainNode) return;

    try {
      const now = audioCtx.currentTime;
      const chord = chords[chordIndex % chords.length];
      chordIndex++;

      // 1. Warm ambient pad drone with lowpass filter
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, now);
      filter.Q.setValueAtTime(1.5, now);
      filter.connect(bgmGainNode);

      chord.forEach((freq, i) => {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const padGain = audioCtx.createGain();

        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Slow soft swell
        padGain.gain.setValueAtTime(0, now);
        padGain.gain.linearRampToValueAtTime(0.04 / (i + 1), now + 1.2);
        padGain.gain.exponentialRampToValueAtTime(0.001, now + 4.8);

        osc.connect(padGain);
        padGain.connect(filter);

        osc.start(now);
        osc.stop(now + 5.0);
      });

      // 2. Subtle Detective Sub-bass pulse
      const subOsc = audioCtx.createOscillator();
      const subGain = audioCtx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(chord[0] / 2, now); // Low fundamental
      subGain.gain.setValueAtTime(0.06, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      subOsc.connect(subGain);
      subGain.connect(bgmGainNode);
      subOsc.start(now);
      subOsc.stop(now + 2.4);

      // 3. Gentle Cyber Radar Ping / Bell
      const pingOsc = audioCtx.createOscillator();
      const pingGain = audioCtx.createGain();
      pingOsc.type = 'sine';
      // Pick random harmonic note
      const pingNotes = [587.33, 659.25, 880.00, 1046.50]; // D5, E5, A5, C6
      const pingFreq = pingNotes[Math.floor(Math.random() * pingNotes.length)];
      pingOsc.frequency.setValueAtTime(pingFreq, now + 1.0);

      pingGain.gain.setValueAtTime(0, now);
      pingGain.gain.setValueAtTime(0.025, now + 1.0);
      pingGain.gain.exponentialRampToValueAtTime(0.0005, now + 2.8);

      pingOsc.connect(pingGain);
      pingGain.connect(bgmGainNode);
      pingOsc.start(now + 1.0);
      pingOsc.stop(now + 3.0);

    } catch (err) {
      console.warn("BGM ambient loop tick error", err);
    }
  };

  // Run first chord immediately
  playAmbientAtmosphere();
  // Loop smoothly every 4.6 seconds
  bgmTimer = window.setInterval(playAmbientAtmosphere, 4600);
};

export const stopBGM = () => {
  isBgmRunning = false;
  if (bgmTimer !== null) {
    clearInterval(bgmTimer);
    bgmTimer = null;
  }
  if (bgmGainNode && audioCtx) {
    bgmGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  }
};

// Sound Effects for game interactions
export const playSynthesizerNote = (type: 'success' | 'fail' | 'btn' | 'unlock') => {
  if (isMuted) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'success') {
      // Sweet double ascending notes
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12); // E5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'unlock') {
      // Majestic ascending perfect chord
      osc.type = 'sine';
      osc.frequency.setValueAtTime(392.00, ctx.currentTime); // G4
      osc.frequency.setValueAtTime(523.25, ctx.currentTime + 0.1); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3); // G5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    } else if (type === 'fail') {
      // Small descending buzz
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220.00, ctx.currentTime); // A3
      osc.frequency.exponentialRampToValueAtTime(130.81, ctx.currentTime + 0.25); // C3
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.26);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'btn') {
      // Short crisp click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }
  } catch {
    // Audio synthesis fallback
  }
};
