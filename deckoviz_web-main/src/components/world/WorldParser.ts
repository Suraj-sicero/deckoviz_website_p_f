import { WorldSchema } from './types';

// ─── THEME PRESETS ─────────────────────────────────────────────────────────────
const PRESETS: Record<string, Partial<WorldSchema>> = {
  island: {
    terrain: 'island',
    sky: { mood: 'clear_day', horizonColor: 0xffc8e8, zenithColor: 0x5ab4f0, entities: [] },
    features: { water: true, grass: true, island: true, pathways: false, houses: false, npc: { count: 0, color: 0xffdbac } },
    lighting: {
      ambientColor: 0xfff5cc, ambientIntensity: 0.9,
      dirColor: 0xffffff, dirIntensity: 2.0,
      pointLights: [],
    },
    fog: { color: 0xd4eeff, density: 0.002 },
    particles: 'none',
    palette: { ground: 0x5dc94a, groundEmissive: 0x000000, rock: 0x7a90b8, path: 0xd4c08a, accent: 0x1a8fbf },
  },
  lava: {
    terrain: 'lava',
    sky: { mood: 'dramatic_red', horizonColor: 0x991100, zenithColor: 0x220000, entities: [] },
    features: { water: false, grass: false, island: false, pathways: false, houses: false, npc: { count: 0, color: 0xff6600 } },
    lighting: {
      ambientColor: 0xff2200, ambientIntensity: 0.4,
      dirColor: 0xff6600, dirIntensity: 1.2,
      pointLights: [
        { color: 0xff4400, intensity: 800, x: 80, y: 5, z: 80 },
        { color: 0xff2200, intensity: 600, x: -80, y: 3, z: -80 },
      ],
    },
    fog: { color: 0x330000, density: 0.008 },
    particles: 'embers',
    palette: { ground: 0x1a0500, groundEmissive: 0x220000, rock: 0x1a0800, path: 0x332211, accent: 0xff3300 },
  },
  forest: {
    terrain: 'forest',
    sky: { mood: 'clear_day', horizonColor: 0xffd6f0, zenithColor: 0x4da8e8, entities: [] },
    features: { water: false, grass: true, island: false, pathways: false, houses: false, npc: { count: 0, color: 0xffdbac } },
    lighting: {
      ambientColor: 0xccffcc, ambientIntensity: 0.8,
      dirColor: 0xffffff, dirIntensity: 1.5,
      pointLights: [],
    },
    fog: { color: 0xd0ead0, density: 0.004 },
    particles: 'fireflies',
    palette: { ground: 0x6abf50, groundEmissive: 0x000000, rock: 0x7a90b8, path: 0xc8a870, accent: 0x55dd55 },
  },
  desert: {
    terrain: 'desert',
    sky: { mood: 'clear_day', horizonColor: 0xeeaa55, zenithColor: 0x3399ee, entities: [] },
    lighting: {
      ambientColor: 0xffee88, ambientIntensity: 0.7,
      dirColor: 0xffffff, dirIntensity: 2.0,
      pointLights: [],
    },
    fog: { color: 0xddaa55, density: 0.003 },
    particles: 'dust',
    palette: { ground: 0xcc9944, groundEmissive: 0x000000, rock: 0xaa7733, path: 0xddbb88, accent: 0xffaa44 },
    features: { water: false, grass: false, island: false, pathways: false, houses: false, npc: { count: 0, color: 0xffdbac } },
  },
  city: {
    terrain: 'city',
    sky: { mood: 'twilight_purple', horizonColor: 0x330044, zenithColor: 0x000011, entities: [] },
    features: { water: false, grass: false, island: false, pathways: true, houses: false, npc: { count: 0, color: 0xffdbac } },
    lighting: {
      ambientColor: 0x220033, ambientIntensity: 0.3,
      dirColor: 0x4400ff, dirIntensity: 0.5,
      pointLights: [
        { color: 0xff00ff, intensity: 300, x: 80, y: 40, z: 80 },
        { color: 0x00ffff, intensity: 300, x: -80, y: 40, z: -80 },
      ],
    },
    fog: { color: 0x110022, density: 0.006 },
    particles: 'dust',
    palette: { ground: 0x111118, groundEmissive: 0x000000, rock: 0x222233, path: 0x333344, accent: 0xff00ff },
  },
  snow: {
    terrain: 'snow',
    sky: { mood: 'storm', horizonColor: 0x667788, zenithColor: 0x334455, entities: [] },
    features: { water: false, grass: false, island: false, pathways: false, houses: false, npc: { count: 0, color: 0xffdbac } },
    lighting: {
      ambientColor: 0x8899aa, ambientIntensity: 0.5,
      dirColor: 0xaabbcc, dirIntensity: 0.8,
      pointLights: [],
    },
    fog: { color: 0x99aacc, density: 0.008 },
    particles: 'snow',
    palette: { ground: 0xddeeff, groundEmissive: 0x000000, rock: 0xaabbcc, path: 0xccddee, accent: 0x88aaff },
  },
  space: {
    terrain: 'space',
    sky: { mood: 'night_stars', horizonColor: 0x000011, zenithColor: 0x000000, entities: [] },
    features: { water: false, grass: false, island: false, pathways: false, houses: false, npc: { count: 0, color: 0x88ffff } },
    lighting: {
      ambientColor: 0x111133, ambientIntensity: 0.3,
      dirColor: 0xaaaaff, dirIntensity: 0.8,
      pointLights: [{ color: 0x4444ff, intensity: 500, x: 0, y: 50, z: 0 }],
    },
    fog: { color: 0x000011, density: 0.003 },
    particles: 'none',
    palette: { ground: 0x111122, groundEmissive: 0x000011, rock: 0x222233, path: 0x333344, accent: 0x4444ff },
  },
};

const DEFAULT: WorldSchema = {
  terrain: 'generic',
  sky: { mood: 'clear_day', horizonColor: 0xffc8e8, zenithColor: 0x5ab4f0, entities: [] },
  features: { water: false, grass: false, island: false, pathways: false, houses: false, npc: { count: 0, color: 0xffdbac } },
  objects: ['rocks'],
  lighting: {
    ambientColor: 0xfff0cc, ambientIntensity: 0.8,
    dirColor: 0xffffff, dirIntensity: 1.5,
    pointLights: [],
  },
  fog: { color: 0xd4eeff, density: 0.003 },
  particles: 'none',
  palette: { ground: 0x6abf50, groundEmissive: 0x000000, rock: 0x7a90b8, path: 0xd4c08a, accent: 0x5ab4f0 },
};

// ─── PARSER ───────────────────────────────────────────────────────────────────
export function parsePrompt(prompt: string): WorldSchema {
  const lower = prompt.toLowerCase();
  const schema: WorldSchema = JSON.parse(JSON.stringify(DEFAULT));

  // ── 1. DETECT PRIMARY TERRAIN / BIOME ─────────────────────────────────────
  if (/island|surrounded by water|archipelago/.test(lower)) {
    Object.assign(schema, JSON.parse(JSON.stringify(PRESETS.island)));
  } else if (/lava|volcano|volcanic|magma|molten/.test(lower)) {
    Object.assign(schema, JSON.parse(JSON.stringify(PRESETS.lava)));
  } else if (/forest|jungle|rainforest/.test(lower)) {
    Object.assign(schema, JSON.parse(JSON.stringify(PRESETS.forest)));
  } else if (/desert|sand|dune|sahara/.test(lower)) {
    Object.assign(schema, JSON.parse(JSON.stringify(PRESETS.desert)));
  } else if (/city|cyberpunk|urban|neon|metropolis/.test(lower)) {
    Object.assign(schema, JSON.parse(JSON.stringify(PRESETS.city)));
  } else if (/snow|ice|arctic|frozen|winter/.test(lower)) {
    Object.assign(schema, JSON.parse(JSON.stringify(PRESETS.snow)));
  } else if (/space|galaxy|cosmic|asteroid|nebula/.test(lower)) {
    Object.assign(schema, JSON.parse(JSON.stringify(PRESETS.space)));
  }

  // ── 2. SKY OVERRIDES ──────────────────────────────────────────────────────
  if (/clear sky|sunny|bright day|daylight|daytime/.test(lower)) {
    schema.sky.mood = 'clear_day';
    schema.sky.horizonColor = 0xffc8e8;   // painted pink horizon
    schema.sky.zenithColor  = 0x5ab4f0;   // sky blue zenith
  }
  if (/sunset|dusk|golden hour/.test(lower)) {
    schema.sky.mood = 'sunset';
    schema.sky.horizonColor = 0xff7733;
    schema.sky.zenithColor  = 0x220055;
  }
  if (/night|midnight|dark sky/.test(lower)) {
    schema.sky.mood = 'night_stars';
    schema.sky.horizonColor = 0x000022;
    schema.sky.zenithColor  = 0x000000;
  }
  if (/dragon|dragons/.test(lower)) schema.sky.entities.push('dragons');
  if (/bird|birds|eagle/.test(lower)) schema.sky.entities.push('birds');
  if (/cloud|clouds/.test(lower)) schema.sky.entities.push('clouds');

  // ── 3. FEATURE FLAGS ──────────────────────────────────────────────────────
  if (/water|ocean|sea|river|lake|surrounded by water/.test(lower)) {
    schema.features.water = true;
  }
  if (/island/.test(lower)) {
    schema.features.island = true;
    schema.features.water  = true;
  }
  if (/grass|meadow|field|lawn/.test(lower)) {
    schema.features.grass = true;
  }
  if (/path|road|bridge|walkway|trail/.test(lower)) {
    schema.features.pathways = true;
  }
  if (/house|houses|home|homes|cottage|cabin|hut|building|villa/.test(lower)) {
    schema.features.houses = true;
  }

  // ── 4. POPULATION / NPC COUNT ─────────────────────────────────────────────
  if (/very less population|very few people|few people|almost empty|deserted/.test(lower)) {
    schema.features.npc.count = 3;
  } else if (/less population|few population|small crowd/.test(lower)) {
    schema.features.npc.count = 5;
  } else if (/population|people|crowd|humans|npc|walking|pedestrian/.test(lower)) {
    schema.features.npc.count = 15;
  } else if (/empty|no one|abandoned|uninhabited/.test(lower)) {
    schema.features.npc.count = 0;
  }

  // ── 5. OBJECTS ────────────────────────────────────────────────────────────
  schema.objects = [];
  if (/rock|stone|boulder|cliff|mountain/.test(lower)) schema.objects.push('rocks');
  if (/tree|trees|palm|pine|oak|forest|jungle/.test(lower)) schema.objects.push('trees');
  if (/ruin|ancient|temple|monument/.test(lower)) schema.objects.push('ruins');
  if (/pillar|column|obelisk/.test(lower)) schema.objects.push('pillars');
  if (/crystal|gem|shard/.test(lower)) schema.objects.push('crystals');
  if (/mushroom/.test(lower)) schema.objects.push('mushrooms');

  // Island always has trees
  if (schema.features.island && !schema.objects.includes('trees')) schema.objects.push('trees');
  // Always have at least rocks if nothing
  if (schema.objects.length === 0) schema.objects.push('rocks');

  return schema;
}
