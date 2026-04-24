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
        color1: '#001a1a',
        color2: '#004d4d',
        particleCount: 200,
        fogDensity: 0.05,
        motionStyle: 'flow'
    },
    romance: {
        mode: 'romance',
        intensity: 0.8,
        speed: 0.5,
        color1: '#1a0500',
        color2: '#4d1a00',
        particleCount: 150,
        fogDensity: 0.08,
        motionStyle: 'pulse'
    },
    gratitude: {
        mode: 'gratitude',
        intensity: 0.6,
        speed: 0.3,
        color1: '#1a001a',
        color2: '#4d004d',
        particleCount: 100,
        fogDensity: 0.04,
        motionStyle: 'pulse'
    },
    morning: {
        mode: 'morning',
        intensity: 1.0,
        speed: 0.8,
        color1: '#4d3300',
        color2: '#ffcc00',
        particleCount: 300,
        fogDensity: 0.02,
        motionStyle: 'rising'
    },
    sleep: {
        mode: 'sleep',
        intensity: 0.3,
        speed: 0.1,
        color1: '#000000',
        color2: '#000510',
        particleCount: 50,
        fogDensity: 0.1,
        motionStyle: 'drifting'
    },
    rainy: {
        mode: 'rainy',
        intensity: 0.7,
        speed: 1.2,
        color1: '#050510',
        color2: '#101020',
        particleCount: 1000,
        fogDensity: 0.15,
        motionStyle: 'rain'
    }
};
