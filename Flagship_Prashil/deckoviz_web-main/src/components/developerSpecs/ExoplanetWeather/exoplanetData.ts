
export interface Exoplanet {
  name: string;
  starType: 'M' | 'G' | 'B'; // Red, Yellow, Blue
  temp: number; // Kelvin
  composition: 'methane' | 'iron' | 'silicates' | 'hydrogen';
  windSpeed: number; // km/h
  precipitation: 'glass' | 'iron' | 'methane' | 'none';
  surface: 'lava' | 'ocean' | 'gas' | 'rock';
  distance: number; // ly
  atmosphereThickness: number; // 0 to 1
}

export const EXOPLANETS: Exoplanet[] = [
  {
    name: "HD 189733b",
    starType: 'G',
    temp: 1200,
    composition: 'silicates',
    windSpeed: 7000,
    precipitation: 'glass',
    surface: 'gas',
    distance: 64,
    atmosphereThickness: 0.8
  },
  {
    name: "WASP-76b",
    starType: 'B',
    temp: 2400,
    composition: 'iron',
    windSpeed: 2000,
    precipitation: 'iron',
    surface: 'lava',
    distance: 640,
    atmosphereThickness: 0.9
  },
  {
    name: "GJ 1214b",
    starType: 'M',
    temp: 500,
    composition: 'methane',
    windSpeed: 400,
    precipitation: 'methane',
    surface: 'ocean',
    distance: 42,
    atmosphereThickness: 0.5
  },
  {
    name: "Trappist-1e",
    starType: 'M',
    temp: 250,
    composition: 'hydrogen',
    windSpeed: 100,
    precipitation: 'none',
    surface: 'rock',
    distance: 39,
    atmosphereThickness: 0.3
  }
];
