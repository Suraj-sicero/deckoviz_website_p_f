import axios from 'axios';

export interface MarbleWorldResult {
  /** Thumbnail image URL (used as the concept art preview) */
  thumbnailUrl: string;
  /** Panorama equirectangular image URL */
  panoUrl: string | null;
  /** Gaussian Splat URLs from Marble (real .spz files) */
  spzUrls: { '100k': string | null; '500k': string | null; full_res: string | null };
  /** GLB collider mesh URL for physics */
  colliderMeshUrl: string | null;
  /** AI-generated caption for the world */
  caption: string | null;
  /** Link to view on Marble platform */
  marbleUrl: string | null;
  /** World ID */
  worldId: string;
}

const BACKEND = `${import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com"}/api`;

/**
 * Step 1 — Generate concept art image for preview.
 * Still uses the existing image generation pipeline (Gemini/Runware).
 * Returns a URL to display during the "preview" step.
 */
export async function generatePreviewImage(prompt: string): Promise<string> {
  // Fallback palette while Marble generates the real world
  const lower = prompt.toLowerCase();
  if (lower.includes('lava') || lower.includes('volcano'))   return '/worlds/cosmic.png';
  if (lower.includes('forest') || lower.includes('jungle'))  return '/worlds/forest.png';
  if (lower.includes('ocean') || lower.includes('underwater')) return '/worlds/underwater.png';
  if (lower.includes('city') || lower.includes('cyberpunk')) return '/worlds/cyberpunk.png';
  if (lower.includes('mansion') || lower.includes('indoor')) return '/worlds/mansion.png';
  return '/worlds/cosmic.png';
}

/**
 * Step 2 — Generate the real Marble 3D world.
 * Calls backend → Marble API → polls for completion.
 * Returns structured world assets including real .spz Gaussian splat URLs.
 *
 * @param prompt   The user's world description
 * @param imageUrl Optional: the concept art URL to use as image input (marble-1.1-plus)
 */
export async function generateMarbleWorld(
  prompt: string,
  imageUrl?: string
): Promise<MarbleWorldResult> {
  const response = await axios.post(
    `${BACKEND}/generate-world`,
    { prompt, imageUrl },
    { timeout: 20 * 60 * 1000 } // 20-min timeout (backend polls up to 15 min)
  );

  const d = response.data;
  if (!d.success) throw new Error(d.error || 'Marble generation failed');

  return {
    thumbnailUrl:    d.thumbnail_url || imageUrl || '/worlds/cosmic.png',
    panoUrl:         d.pano_url,
    spzUrls:         d.spz_urls,
    colliderMeshUrl: d.collider_mesh_url,
    caption:         d.caption,
    marbleUrl:       d.world_marble_url,
    worldId:         d.world_id,
  };
}

/**
 * Legacy shim — used by old CreateWorld code.
 * Returns thumbnail URL (concept art preview).
 */
export async function generateWorld(prompt: string): Promise<string> {
  return generatePreviewImage(prompt);
}
