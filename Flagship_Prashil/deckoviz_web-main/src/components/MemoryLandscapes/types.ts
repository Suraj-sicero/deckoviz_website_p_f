export type EnvironmentType = 'forest' | 'city' | 'ocean' | 'abstract';
export type WeatherType = 'clear' | 'rain' | 'fog' | 'snow';
export type TimeOfDay = 'day' | 'night' | 'sunset' | 'dawn';

export interface SceneConfig {
    environment: EnvironmentType;
    weather: WeatherType;
    time: TimeOfDay;
    emotion: string;
    colors: string[];
    fogDensity: number;
    lightIntensity: number;
    terrainHeight: number;
    particleCount: number;
    motionSpeed: number;
}

export const PRESETS: { [key: string]: SceneConfig } = {
    'Childhood Memory': {
        environment: 'forest',
        weather: 'clear',
        time: 'day',
        emotion: 'nostalgic',
        colors: ['#ffecd2', '#fcb69f', '#ff9a9e'],
        fogDensity: 0.02,
        lightIntensity: 1.2,
        terrainHeight: 5,
        particleCount: 500,
        motionSpeed: 0.2
    },
    'Nostalgia': {
        environment: 'city',
        weather: 'fog',
        time: 'sunset',
        emotion: 'wistful',
        colors: ['#2c3e50', '#000000', '#e74c3c'],
        fogDensity: 0.08,
        lightIntensity: 0.6,
        terrainHeight: 2,
        particleCount: 200,
        motionSpeed: 0.1
    },
    'Dreamscape': {
        environment: 'abstract',
        weather: 'clear',
        time: 'night',
        emotion: 'surreal',
        colors: ['#4facfe', '#00f2fe', '#7028e4'],
        fogDensity: 0.05,
        lightIntensity: 0.8,
        terrainHeight: 10,
        particleCount: 1000,
        motionSpeed: 0.5
    },
    'Abstract Emotion': {
        environment: 'ocean',
        weather: 'rain',
        time: 'night',
        emotion: 'chaotic',
        colors: ['#1e3c72', '#2a5298', '#cfd9df'],
        fogDensity: 0.1,
        lightIntensity: 0.4,
        terrainHeight: 8,
        particleCount: 2000,
        motionSpeed: 0.8
    }
};
