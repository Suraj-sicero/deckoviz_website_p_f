export interface DataPoint {
    [key: string]: any;
}

export interface NormalizedPoint {
    id: string;
    original: DataPoint;
    mapped: {
        x: number;
        y: number;
        size: number;
        color: number;
        motion: number;
        opacity: number;
    };
}

export type VisMode = 'particles' | 'radial' | 'waves' | 'network' | 'terrain';

export interface MappingConfig {
    xField: string;
    yField: string;
    sizeField: string;
    colorField: string;
    motionField: string;
}

export interface ColorPalette {
    name: string;
    colors: string[];
}

export const PALETTES: ColorPalette[] = [
    {
        name: 'Neon',
        colors: ['#00f2ff', '#00ff9d', '#7000ff', '#ff006a', '#fbff00']
    },
    {
        name: 'Ocean',
        colors: ['#0061ff', '#60efff', '#00ffb7', '#0026ff', '#00e1ff']
    },
    {
        name: 'Volcano',
        colors: ['#ff4d4d', '#ff944d', '#ffdb4d', '#ff2e2e', '#ffd000']
    },
    {
        name: 'Monochrome',
        colors: ['#ffffff', '#cccccc', '#999999', '#666666', '#333333']
    },
    {
        name: 'Pastel',
        colors: ['#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea']
    }
];

export const PRELOADED_DATASETS = {
    'Weather': [
        { temp: 22, humidity: 45, wind: 12, pressure: 1013, day: 1 },
        { temp: 24, humidity: 40, wind: 15, pressure: 1012, day: 2 },
        { temp: 19, humidity: 60, wind: 8, pressure: 1015, day: 3 },
        { temp: 21, humidity: 55, wind: 10, pressure: 1014, day: 4 },
        { temp: 26, humidity: 35, wind: 18, pressure: 1010, day: 5 },
        { temp: 28, humidity: 30, wind: 20, pressure: 1008, day: 6 },
        { temp: 23, humidity: 50, wind: 14, pressure: 1011, day: 7 },
    ],
    'Productivity': [
        { hours: 8, focus: 0.9, coffee: 3, output: 85, day: 1 },
        { hours: 6, focus: 0.7, coffee: 2, output: 60, day: 2 },
        { hours: 9, focus: 0.85, coffee: 4, output: 92, day: 3 },
        { hours: 7, focus: 0.6, coffee: 1, output: 45, day: 4 },
        { hours: 5, focus: 0.4, coffee: 0, output: 30, day: 5 },
        { hours: 10, focus: 0.95, coffee: 5, output: 100, day: 6 },
        { hours: 8, focus: 0.8, coffee: 3, output: 78, day: 7 },
    ],
    'Mood': [
        { happiness: 8, energy: 9, stress: 2, social: 10, day: 1 },
        { happiness: 6, energy: 5, stress: 5, social: 4, day: 2 },
        { happiness: 9, energy: 8, stress: 1, social: 8, day: 3 },
        { happiness: 4, energy: 3, stress: 8, social: 2, day: 4 },
        { happiness: 7, energy: 6, stress: 4, social: 6, day: 5 },
        { happiness: 10, energy: 10, stress: 0, social: 10, day: 6 },
        { happiness: 8, energy: 7, stress: 3, social: 5, day: 7 },
    ]
};
