/**
 * Web Audio API synthesizer for the Emergency Sound Test feature.
 *
 * NOTE & SAFETY DISCLAIMER:
 * This audio is purely an application simulation and test sound.
 * It is NOT an official government emergency broadcast or civil defense siren.
 */

let audioCtx: AudioContext | null = null;
let osc1: OscillatorNode | null = null;
let osc2: OscillatorNode | null = null;
let gainNode: GainNode | null = null;
let intervalId: ReturnType<typeof setInterval> | null = null;
let cleanupTimer: ReturnType<typeof setTimeout> | null = null;
let isPlaying = false;

export function isAlertSoundPlaying(): boolean {
  return isPlaying;
}

export function startAlertSound(onStateChange?: (playing: boolean) => void): boolean {
  try {
    if (cleanupTimer) {
      clearTimeout(cleanupTimer);
      cleanupTimer = null;
    }

    if (isPlaying) {
      return true;
    }

    const AudioContextClass =
      typeof window !== 'undefined'
        ? window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        : null;

    if (!AudioContextClass) {
      console.warn('Web Audio API not supported in this browser environment.');
      return false;
    }

    if (!audioCtx || audioCtx.state === 'closed') {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch((err) => {
        console.warn('AudioContext resume prevented:', err);
      });
    }

    gainNode = audioCtx.createGain();
    const now = audioCtx.currentTime;
    gainNode.gain.setValueAtTime(0.18, now); // Safe, controlled volume
    gainNode.connect(audioCtx.destination);

    // Primary warning frequency: alternating between 880Hz and 660Hz pulses
    osc1 = audioCtx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(880, now);

    // Sub-tone for audible presence
    osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(440, now);

    osc1.connect(gainNode);
    osc2.connect(gainNode);

    osc1.start();
    osc2.start();
    isPlaying = true;

    let toggle = false;
    // Modulate alert tones rhythmically every 350ms
    intervalId = setInterval(() => {
      try {
        if (!audioCtx || !osc1 || !gainNode) return;
        const tickTime = audioCtx.currentTime;
        toggle = !toggle;
        const freq = toggle ? 880 : 660;
        osc1.frequency.setValueAtTime(freq, tickTime);
        // Soft pulsing gain envelope
        gainNode.gain.setValueAtTime(toggle ? 0.22 : 0.08, tickTime);
      } catch (e) {
        // Safe guard against audio ticks after teardown
      }
    }, 350);

    onStateChange?.(true);
    return true;
  } catch (err) {
    console.error('Failed to start alert sound:', err);
    isPlaying = false;
    onStateChange?.(false);
    return false;
  }
}

export function stopAlertSound(onStateChange?: (playing: boolean) => void): void {
  try {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    if (gainNode && audioCtx) {
      const now = audioCtx.currentTime;
      // Use linearRampToValueAtTime which never throws InvalidAccessError on zero
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0.00001, now + 0.05);
    }

    if (cleanupTimer) {
      clearTimeout(cleanupTimer);
    }

    cleanupTimer = setTimeout(() => {
      try {
        if (osc1) {
          osc1.stop();
          osc1.disconnect();
          osc1 = null;
        }
        if (osc2) {
          osc2.stop();
          osc2.disconnect();
          osc2 = null;
        }
        if (gainNode) {
          gainNode.disconnect();
          gainNode = null;
        }
      } catch (e) {
        // Safe ignore
      }
      cleanupTimer = null;
    }, 60);

    isPlaying = false;
    onStateChange?.(false);
  } catch (err) {
    console.error('Failed to stop alert sound:', err);
    isPlaying = false;
    onStateChange?.(false);
  }
}
