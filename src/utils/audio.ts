// Sound and Background Music Engine for Detektif Halusinasi
import backsoundUrl from '../assets/backsound.mp3';

let audioCtx: AudioContext | null = null;
let bgmAudio: HTMLAudioElement | null = null;
let isBgmInitialized = false;

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

const getBgmAudio = (): HTMLAudioElement | null => {
  if (typeof window === 'undefined') return null;
  if (!bgmAudio) {
    bgmAudio = new Audio(backsoundUrl);
    bgmAudio.loop = true;
    bgmAudio.volume = 0.35;
    bgmAudio.muted = isMuted;
  }
  return bgmAudio;
};

export const getIsMuted = (): boolean => isMuted;

export const setMuted = (muted: boolean): boolean => {
  isMuted = muted;
  try {
    localStorage.setItem('detektif_audio_muted', muted ? 'true' : 'false');
  } catch {}

  const bgm = getBgmAudio();
  if (bgm) {
    bgm.muted = isMuted;
    if (!isMuted && bgm.paused) {
      bgm.play().catch(() => {});
    }
  }
  return isMuted;
};

export const toggleMute = (): boolean => {
  return setMuted(!isMuted);
};

export const startBGM = () => {
  const bgm = getBgmAudio();
  if (!bgm) return;

  bgm.muted = isMuted;
  if (bgm.paused && !isMuted) {
    bgm.play().catch((err) => {
      console.log('Autoplay policy waiting for user interaction:', err);
    });
  }
  isBgmInitialized = true;
};

export const stopBGM = () => {
  const bgm = getBgmAudio();
  if (bgm) {
    bgm.pause();
  }
};

// Also attach a one-time user interaction listener so audio plays immediately when user clicks anywhere
if (typeof window !== 'undefined') {
  const handleFirstInteraction = () => {
    if (!isMuted) {
      startBGM();
    }
    window.removeEventListener('click', handleFirstInteraction);
    window.removeEventListener('keydown', handleFirstInteraction);
    window.removeEventListener('touchstart', handleFirstInteraction);
  };
  window.addEventListener('click', handleFirstInteraction);
  window.addEventListener('keydown', handleFirstInteraction);
  window.addEventListener('touchstart', handleFirstInteraction);
}

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
