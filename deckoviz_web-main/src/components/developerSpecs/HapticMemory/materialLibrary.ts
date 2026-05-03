
export interface HapticMaterial {
  id: string;
  name: string;
  description: string;
  emotion: 'warm' | 'cold' | 'neutral' | 'melancholic' | 'comforting';
  config: {
    color: string;
    emissive: string;
    emissiveIntensity: number;
    roughness: number;
    metalness: number;
    displacementScale: number;
    normalScale: number;
    transmission?: number;
    thickness?: number;
  }
}

export const MATERIAL_LIBRARY: HapticMaterial[] = [
  {
    id: 'linen',
    name: "Old Sun-Bleached Linen",
    description: "Coarse threads, worn soft by decades of washing. Smells of lavender and dust.",
    emotion: 'comforting',
    config: { 
      color: "#e8e4d8", 
      emissive: "#222222",
      emissiveIntensity: 0.1,
      roughness: 0.9, 
      metalness: 0.0, 
      displacementScale: 0.5,
      normalScale: 0.8 
    }
  },
  {
    id: 'slate',
    name: "Polished River Slate",
    description: "Impossibly smooth and cold. A surface that remembers the weight of a thousand years of water.",
    emotion: 'cold',
    config: { 
      color: "#2c2e30", 
      emissive: "#001122",
      emissiveIntensity: 0.4,
      roughness: 0.15, 
      metalness: 0.4, 
      displacementScale: 0.2,
      normalScale: 1.5 
    }
  },
  {
    id: 'pine',
    name: "Weathered Mountain Pine",
    description: "Deep fissures filled with hardened sap. Sharp, silvered edges that catch the low sun.",
    emotion: 'melancholic',
    config: { 
      color: "#8a7e72", 
      emissive: "#221100",
      emissiveIntensity: 0.2,
      roughness: 0.95, 
      metalness: 0.0, 
      displacementScale: 1.5,
      normalScale: 2.5 
    }
  },
  {
    id: 'velvet',
    name: "Crushed Midnight Velvet",
    description: "Dense, absorbing light and sound alike. A tactile memory of a heavy winter coat.",
    emotion: 'warm',
    config: { 
      color: "#1a0f2e", 
      emissive: "#0a001a",
      emissiveIntensity: 0.5,
      roughness: 0.85, 
      metalness: 0.0, 
      displacementScale: 0.3,
      normalScale: 0.5 
    }
  },
  {
    id: 'obsidian',
    name: "Volcanic Glass (Obsidian)",
    description: "A surface of absolute black, fracturing light into razor-sharp reflections.",
    emotion: 'neutral',
    config: { 
      color: "#050505", 
      emissive: "#000000",
      emissiveIntensity: 0.0,
      roughness: 0.05, 
      metalness: 0.9, 
      displacementScale: 0.1,
      normalScale: 0.2,
      transmission: 0.5,
      thickness: 2.0
    }
  }
];
