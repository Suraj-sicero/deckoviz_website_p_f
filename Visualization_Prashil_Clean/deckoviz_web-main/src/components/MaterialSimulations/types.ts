export type MaterialType = 'metal' | 'glass' | 'fabric' | 'crystal' | 'lava' | 'sand';

export interface MaterialConfig {
    type: MaterialType;
    intensity: number;
    speed: number;
    roughness: number;
    metalness: number;
    color: string;
    bloomStrength: number;
}

export const MATERIAL_DEFAULTS: Record<MaterialType, MaterialConfig> = {
    metal: {
        type: 'metal',
        intensity: 0.8,
        speed: 1.0,
        roughness: 0.1,
        metalness: 1.0,
        color: '#ffffff',
        bloomStrength: 0.5
    },
    glass: {
        type: 'glass',
        intensity: 1.2,
        speed: 0.5,
        roughness: 0.05,
        metalness: 0.0,
        color: '#aaffff',
        bloomStrength: 0.8
    },
    fabric: {
        type: 'fabric',
        intensity: 0.5,
        speed: 1.2,
        roughness: 0.9,
        metalness: 0.0,
        color: '#ff55aa',
        bloomStrength: 0.2
    },
    crystal: {
        type: 'crystal',
        intensity: 1.5,
        speed: 0.3,
        roughness: 0.1,
        metalness: 0.2,
        color: '#ff00ff',
        bloomStrength: 1.2
    },
    lava: {
        type: 'lava',
        intensity: 1.0,
        speed: 0.8,
        roughness: 0.8,
        metalness: 0.1,
        color: '#ff4400',
        bloomStrength: 2.0
    },
    sand: {
        type: 'sand',
        intensity: 0.6,
        speed: 2.0,
        roughness: 1.0,
        metalness: 0.5,
        color: '#ffcc88',
        bloomStrength: 0.3
    }
};
