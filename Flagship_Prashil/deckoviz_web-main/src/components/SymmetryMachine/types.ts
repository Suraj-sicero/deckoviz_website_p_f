export interface SymmetryConfig {
    sides: number;
    rotationSpeed: number;
    zoom: number;
    patternType: 'geometric' | 'organic' | 'abstract';
    colorShift: number;
    intensity: number;
}

export const SYMMETRY_DEFAULTS: SymmetryConfig = {
    sides: 8,
    rotationSpeed: 0.2,
    zoom: 1.0,
    patternType: 'geometric',
    colorShift: 0.5,
    intensity: 0.8
};
