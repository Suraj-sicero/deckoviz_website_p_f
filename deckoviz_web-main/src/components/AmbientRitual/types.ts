export type RitualMode = 'focus' | 'romance' | 'gratitude' | 'morning' | 'sleep' | 'rainy';

export interface RitualConfig {
    mode: RitualMode;
    intensity: number;
    speed: number;
    color1: string;
    color2: string;
    particleCount: number;
    fogDensity: number;
    motionStyle: 'flow' | 'pulse' | 'rising' | 'drifting' | 'rain';
}

export const RITUAL_PRESETS: Record<RitualMode, RitualConfig> = {
    focus: {
        mode: 'focus',
        intensity: 0.5,
        speed: 0.2,
        color1: '#021010',
        color2: '#0d2d2d',
        particleCount: 200,
        fogDensity: 0.05,
        motionStyle: 'flow'
    },
    romance: {
        mode: 'romance',
        intensity: 0.8,
        speed: 0.5,
        color1: '#1a0505',
        color2: '#4a1a1a',
        particleCount: 150,
        fogDensity: 0.08,
        motionStyle: 'pulse'
    },
    gratitude: {
        mode: 'gratitude',
        intensity: 0.6,
        speed: 0.3,
        color1: '#1a0a2e',
        color2: '#4c1d95',
        particleCount: 100,
        fogDensity: 0.04,
        motionStyle: 'pulse'
    },
    morning: {
        mode: 'morning',
        intensity: 1.0,
        speed: 0.8,
        color1: '#451a03',
        color2: '#d97706',
        particleCount: 300,
        fogDensity: 0.02,
        motionStyle: 'rising'
    },
    sleep: {
        mode: 'sleep',
        intensity: 0.3,
        speed: 0.1,
        color1: '#020617',
        color2: '#1e1b4b',
        particleCount: 50,
        fogDensity: 0.1,
        motionStyle: 'drifting'
    },
    rainy: {
        mode: 'rainy',
        intensity: 0.7,
        speed: 1.2,
        color1: '#0f172a',
        color2: '#1e293b',
        particleCount: 1000,
        fogDensity: 0.15,
        motionStyle: 'rain'
    }
};
