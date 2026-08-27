export type TerrainType = 'island' | 'lava' | 'forest' | 'underwater' | 'city' | 'desert' | 'snow' | 'space' | 'canyon' | 'generic';
export type ParticleType = 'embers' | 'dust' | 'bubbles' | 'snow' | 'fireflies' | 'rain' | 'none';
export type SkyMood = 'clear_day' | 'sunset' | 'dramatic_red' | 'deep_forest' | 'night_stars' | 'storm' | 'underwater_blue' | 'twilight_violet';

export interface NpcConfig {
  count: number;
  color: number;
}

export interface WorldSchema {
  terrain: TerrainType;
  sky: {
    mood: SkyMood;
    horizonColor: number;
    zenithColor: number;
    entities: string[];        // dragons, birds, ships, clouds
  };
  features: {
    water: boolean;            // surrounding water plane
    grass: boolean;            // grass patches on terrain
    island: boolean;           // circular island shape
    pathways: boolean;
    houses: boolean;           // spawn house geometry
    npc: NpcConfig;            // humanoid NPCs
  };
  objects: string[];           // rocks, trees, pillars, ruins, crystals, buildings
  lighting: {
    ambientColor: number;
    ambientIntensity: number;
    dirColor: number;
    dirIntensity: number;
    pointLights: Array<{ color: number; intensity: number; x: number; y: number; z: number }>;
  };
  fog: {
    color: number;
    density: number;
  };
  particles: ParticleType;
  palette: {
    ground: number;
    groundEmissive: number;
    rock: number;
    path: number;
    accent: number;
  };
}
