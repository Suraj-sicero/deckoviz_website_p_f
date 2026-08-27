import * as THREE from 'three';

export type OrganismType = 'insect' | 'fish' | 'jellyfish' | 'alien';

export interface OrganismConfig {
    type: OrganismType;
    population: number;
    speed: number;
    cohesion: number;
    alignment: number;
    separation: number;
    randomness: number;
    color: string;
    glowIntensity: number;
    environment: 'ocean' | 'space' | 'forest';
}

export const ORGANISM_DEFAULTS: Record<OrganismType, OrganismConfig> = {
    insect: {
        type: 'insect',
        population: 500,
        speed: 1.5,
        cohesion: 1.0,
        alignment: 1.0,
        separation: 1.5,
        randomness: 0.8,
        color: '#ffcc00',
        glowIntensity: 1.0,
        environment: 'forest'
    },
    fish: {
        type: 'fish',
        population: 300,
        speed: 1.0,
        cohesion: 1.2,
        alignment: 1.5,
        separation: 1.0,
        randomness: 0.3,
        color: '#00ccff',
        glowIntensity: 0.5,
        environment: 'ocean'
    },
    jellyfish: {
        type: 'jellyfish',
        population: 50,
        speed: 0.5,
        cohesion: 0.5,
        alignment: 0.2,
        separation: 2.0,
        randomness: 0.2,
        color: '#ff00ff',
        glowIntensity: 1.5,
        environment: 'ocean'
    },
    alien: {
        type: 'alien',
        population: 100,
        speed: 0.8,
        cohesion: 0.8,
        alignment: 0.5,
        separation: 1.2,
        randomness: 0.5,
        color: '#ccff00',
        glowIntensity: 2.0,
        environment: 'space'
    }
};

export interface Agent {
    id: number;
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    acceleration: THREE.Vector3;
    color: THREE.Color;
    size: number;
}
