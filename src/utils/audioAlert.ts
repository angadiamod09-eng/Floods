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
let isPlaying = false;

export function isAlertSoundPlaying(): boolean {
  return isPlaying;
}

export function startAlertSound(onStateChange?: (playing: boolean) => void): boolean {
  try {
    if (isPlaying) {
      return true;
    }

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('Web Audio API not supported in this browser environment.');
      return false;
    }

    if (!audioCtx || audioCtx.state === 'closed') {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.18, audioCtx.currentTime); // Safe, controlled volume
    gainNode.connect(audioCtx.destination);

    // Primary warning frequency: alternating between 880Hz and 660Hz pulses
    osc1 = audioCtx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(880, audioCtx.currentTime);

    // Sub-tone for audible presence
    osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(440, audioCtx.currentTime);

    osc1.connect(gainNode);
    osc2.connect(gainNode);

    osc1.start();
    osc2.start();
    isPlaying = true;

    let toggle = false;
    // Modulate alert tones rhythmically every 350ms
    intervalId = setInterval(() => {
      if (!audioCtx || !osc1 || !gainNode) return;
      const now = audioCtx.currentTime;
      toggle = !toggle;
      const freq = toggle ? 880 : 660;
      osc1.frequency.setValueAtTime(freq, now);
      // Soft pulsing gain envelope
      gainNode.gain.setValueAtTime(toggle ? 0.22 : 0.08, now);
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
      // Gentle fade out to avoid clicks
      gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
    }

    setTimeout(() => {
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
        // Ignore node teardown errors
      }
    }, 60);

    isPlaying = false;
    onStateChange?.(false);
  } catch (err) {
    console.error('Failed to stop alert sound:', err);
    isPlaying = false;
    onStateChange?.(false);
  }
}
