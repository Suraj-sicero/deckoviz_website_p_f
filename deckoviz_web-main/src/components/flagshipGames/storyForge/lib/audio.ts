/**
 * Adaptive ambient audio. WebAudio-based so we don't ship any large media files
 * for the prototype. Each genre runs a slow oscillator pad + filtered noise bed
 * + occasional accent tones. Volume + filter respond to game tension.
 */

import type { Genre } from "./genres";

type Mood = "calm" | "rising" | "twist" | "ending";

interface ActiveAudio {
  ctx: AudioContext;
  master: GainNode;
  layers: { node: AudioNode; gain: GainNode; stop?: () => void }[];
  mood: Mood;
}

let active: ActiveAudio | null = null;

const PAD_FREQS: Record<string, [number, number, number]> = {
  "dark-fable": [110, 138.59, 164.81],
  "space-opera": [82.41, 110, 164.81],
  "quiet-village": [146.83, 196, 246.94],
  "mythic-quest": [98, 130.81, 196],
  "urban-mystery": [123.47, 164.81, 220],
  "surreal-dream": [174.61, 233.08, 277.18],
  "childrens-wonder": [196, 261.63, 329.63],
};

export function startAmbient(genre: Genre, mood: Mood = "calm"): void {
  stopAmbient();
  try {
    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const master = ctx.createGain();
    master.gain.value = mood === "twist" ? 0.35 : 0.22;
    master.connect(ctx.destination);

    const layers: ActiveAudio["layers"] = [];
    const freqs = PAD_FREQS[genre.id] ?? [110, 165, 220];

    for (const f of freqs) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.22;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = mood === "twist" ? 1800 : 900;
      osc.connect(filter);
      filter.connect(g);
      g.connect(master);
      osc.start();
      layers.push({ node: osc, gain: g, stop: () => osc.stop() });
    }

    // breathing modulation
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start();
    layers.push({ node: lfo, gain: lfoGain, stop: () => lfo.stop() });

    active = { ctx, master, layers, mood };
  } catch (e) {
    // WebAudio may be blocked until user gesture; fail silently.
    active = null;
  }
}

export function setMood(mood: Mood): void {
  if (!active) return;
  const target =
    mood === "twist" ? 0.38 : mood === "ending" ? 0.3 : mood === "rising" ? 0.28 : 0.22;
  active.master.gain.linearRampToValueAtTime(target, active.ctx.currentTime + 1.2);
  active.mood = mood;
}

export function playSting(kind: "twist" | "vote" | "submit" | "ending" = "submit"): void {
  if (!active) return;
  const { ctx, master } = active;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.connect(g);
  g.connect(master);

  if (kind === "twist") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.6);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.4, now + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
    osc.start(now);
    osc.stop(now + 1.5);
  } else if (kind === "ending") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(330, now);
    osc.frequency.linearRampToValueAtTime(495, now + 1.8);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.35, now + 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
    osc.start(now);
    osc.stop(now + 3);
  } else if (kind === "vote") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    osc.start(now);
    osc.stop(now + 0.4);
  } else {
    osc.type = "sine";
    osc.frequency.setValueAtTime(523, now);
    osc.frequency.exponentialRampToValueAtTime(659, now + 0.2);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.14, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
    osc.start(now);
    osc.stop(now + 0.45);
  }
}

export function stopAmbient(): void {
  if (!active) return;
  try {
    for (const l of active.layers) l.stop?.();
    active.ctx.close();
  } catch {
    /* noop */
  }
  active = null;
}
