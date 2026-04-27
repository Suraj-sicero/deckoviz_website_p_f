export type ArchStyle = 'brutalist' | 'gothic' | 'floating' | 'library' | 'organic';

export interface ArchConfig {
    style: ArchStyle;
    density: number;
    scale: number;
    height: number;
    randomness: number;
    fogDensity: number;
    color1: string;
    color2: string;
    seed: number;
}

export const ARCH_PRESETS: Record<ArchStyle, ArchConfig> = {
    brutalist: {
        style: 'brutalist',
        density: 0.6,
        scale: 1.5,
        height: 2.0,
        randomness: 0.2,
        fogDensity: 0.05,
        color1: '#434343',
        color2: '#000000',
        seed: 1234
    },
    gothic: {
        style: 'gothic',
        density: 0.8,
        scale: 1.0,
        height: 3.0,
        randomness: 0.1,
        fogDensity: 0.08,
        color1: '#2c3e50',
        color2: '#000000',
        seed: 5678
    },
    floating: {
        style: 'floating',
        density: 0.4,
        scale: 2.0,
        height: 1.5,
        randomness: 0.8,
        fogDensity: 0.02,
        color1: '#4facfe',
        color2: '#00f2fe',
        seed: 9012
    },
    library: {
        style: 'library',
        density: 0.9,
        scale: 1.0,
        height: 2.5,
        randomness: 0.0,
        fogDensity: 0.1,
        color1: '#4b3621',
        color2: '#1a1110',
        seed: 3456
    },
    organic: {
        style: 'organic',
        density: 0.5,
        scale: 1.2,
        height: 1.8,
        randomness: 0.4,
        fogDensity: 0.04,
        color1: '#ff9a9e',
        color2: '#fad0c4',
        seed: 7890
    }
};
