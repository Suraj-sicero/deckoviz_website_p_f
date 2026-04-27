export type CosmicMode = 'nebula' | 'orbits' | 'blackhole' | 'meteors' | 'starbirth';

export interface CosmicConfig {
    mode: CosmicMode;
    speed: number;
    intensity: number;
    density: number;
    bloomStrength: number;
    driftEnabled: boolean;
}

export const MODE_DEFAULTS: Record<CosmicMode, CosmicConfig> = {
    nebula: {
        mode: 'nebula',
        speed: 0.2,
        intensity: 0.8,
        density: 0.5,
        bloomStrength: 1.5,
        driftEnabled: true
    },
    orbits: {
        mode: 'orbits',
        speed: 1.0,
        intensity: 0.6,
        density: 0.4,
        bloomStrength: 0.8,
        driftEnabled: true
    },
    blackhole: {
        mode: 'blackhole',
        speed: 0.5,
        intensity: 1.0,
        density: 0.7,
        bloomStrength: 2.0,
        driftEnabled: false
    },
    meteors: {
        mode: 'meteors',
        speed: 2.0,
        intensity: 0.5,
        density: 0.8,
        bloomStrength: 1.2,
        driftEnabled: true
    },
    starbirth: {
        mode: 'starbirth',
        speed: 0.8,
        intensity: 1.0,
        density: 0.9,
        bloomStrength: 2.5,
        driftEnabled: false
    }
};
