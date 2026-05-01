/**
 * SparkAtmosphere.ts
 * Uses @sparkjsdev/spark to its fullest:
 *   - SparkRenderer for GPU splat rendering
 *   - SplatMesh with constructSplats (procedural volumetric clouds, stars, fireflies, embers)
 *   - dyno GLSL shaders: wave-RGB coloring, radial warp, disintegrate, sin3D wave effects
 *   - onFrame animation for drifting, pulsing, and per-splat updates
 *   - textSplats for world name overlay
 */
import * as THREE from 'three';
import {
  SparkRenderer,
  SplatMesh,
  dyno,
  textSplats,
} from '@sparkjsdev/spark';
import { WorldSchema } from './types';

// ── Helper: theme-driven dyno GLSL world-modifier ────────────────────────────
function makeShaderModifier(schema: WorldSchema, animateT: ReturnType<typeof dyno.dynoFloat>) {
  return dyno.dynoBlock(
    { gsplat: dyno.Gsplat },
    { gsplat: dyno.Gsplat },
    ({ gsplat }: any) => {
      const d = new dyno.Dyno({
        inTypes: { gsplat: dyno.Gsplat, t: 'float', mode: 'int' },
        outTypes: { gsplat: dyno.Gsplat },
        globals: () => [
          dyno.unindent(`
            // Wave RGB: cycles colors through position
            vec3 waveRgb(vec3 pos, float t) {
              return vec3(
                0.55 + 0.45 * sin(pos.x * 4.0 + t),
                0.55 + 0.45 * sin(pos.y * 5.0 + t * 1.3),
                0.55 + 0.45 * cos(pos.z * 6.0 + t * 0.9)
              );
            }
            // Radial warp: pulsing outward distortion
            vec3 radialWarp(vec3 pos, float t) {
              float r = length(pos);
              float newR = r * (1.0 + 0.08 * sin(r * 12.0 + t * 2.5));
              return r < 0.001 ? pos : pos * (newR / r);
            }
            // Sin3D wave motion
            vec4 sin3DWave(vec3 p, float t) {
              float m = exp(-2.0 * length(sin(p * 4.0 + t * 2.0))) * 4.0;
              return vec4(m) + 0.2;
            }
            // Ember upward drift
            vec3 emberDrift(vec3 pos, float t) {
              pos.y += mod(t * 6.0 + pos.x * 3.14 + pos.z, 40.0) - 20.0;
              pos.x += sin(t * 1.5 + pos.z * 0.8) * 0.5;
              return pos;
            }
            // Firefly float
            vec3 fireflyFloat(vec3 pos, float t) {
              pos.y += sin(t * 2.0 + pos.x * 2.5) * 0.8;
              pos.x += cos(t * 1.8 + pos.z * 2.0) * 0.6;
              return pos;
            }
            // Snow fall
            vec3 snowFall(vec3 pos, float t) {
              pos.y = mod(pos.y - t * 5.0 + 30.0, 60.0) - 30.0;
              pos.x += sin(t * 0.5 + pos.z) * 0.3;
              return pos;
            }
          `),
        ],
        statements: ({ inputs, outputs }: any) => dyno.unindentLines(`
          ${outputs.gsplat} = ${inputs.gsplat};
          vec3 p = ${inputs.gsplat}.center;

          // mode 1 = lava embers: waveRGB + radialWarp + upward drift
          if (${inputs.mode} == 1) {
            ${outputs.gsplat}.center = emberDrift(radialWarp(p, ${inputs.t}), ${inputs.t});
            ${outputs.gsplat}.rgba.rgb *= waveRgb(p, ${inputs.t}) * vec3(1.8, 0.4, 0.1);
          }
          // mode 2 = forest fireflies: sin3D color + float
          else if (${inputs.mode} == 2) {
            ${outputs.gsplat}.center = fireflyFloat(p, ${inputs.t});
            vec4 w = sin3DWave(p, ${inputs.t});
            ${outputs.gsplat}.rgba.rgb *= vec3(w.x * 0.4, w.y * 1.5, w.z * 0.4);
          }
          // mode 3 = snow: fall + waveRgb blue
          else if (${inputs.mode} == 3) {
            ${outputs.gsplat}.center = snowFall(p, ${inputs.t});
            ${outputs.gsplat}.rgba.rgb = vec3(0.85, 0.92, 1.0);
          }
          // mode 4 = stars: subtle waveRGB pulse
          else if (${inputs.mode} == 4) {
            ${outputs.gsplat}.rgba.rgb *= 0.7 + 0.3 * sin(${inputs.t} + p.x * 3.0);
          }
          // mode 5 = cloud drift: subtle sin3D + wave coloring
          else if (${inputs.mode} == 5) {
            vec4 w = sin3DWave(p * 0.1, ${inputs.t} * 0.3);
            ${outputs.gsplat}.rgba.rgb = mix(${inputs.gsplat}.rgba.rgb, ${inputs.gsplat}.rgba.rgb * waveRgb(p * 0.05, ${inputs.t} * 0.2), 0.15);
            ${outputs.gsplat}.rgba.a   = clamp(${inputs.gsplat}.rgba.a * (0.85 + 0.15 * w.x), 0.0, 1.0);
          }
        `),
      });

      gsplat = d.apply({ gsplat, t: animateT, mode: dyno.dynoInt(schema.terrain === 'lava' ? 1 : schema.terrain === 'forest' ? 2 : schema.terrain === 'snow' ? 3 : schema.sky.mood === 'night_stars' ? 4 : 5) }).gsplat;
      return { gsplat };
    }
  );
}

// ── Procedural cloud layer ────────────────────────────────────────────────────
function buildClouds(schema: WorldSchema, animateT: ReturnType<typeof dyno.dynoFloat>): SplatMesh {
  const isStorm  = schema.sky.mood === 'storm';
  const isSunset = schema.sky.mood === 'sunset';
  const count    = isStorm ? 12000 : 7000;
  const col1     = new THREE.Color(isStorm ? 0x667788 : isSunset ? 0xffcc99 : 0xffffff);
  const col2     = new THREE.Color(isStorm ? 0x445566 : isSunset ? 0xff9966 : 0xdddddd);

  const mesh = new SplatMesh({
    maxSplats: count,
    constructSplats: (splats: any) => {
      const center = new THREE.Vector3();
      const scales = new THREE.Vector3(0.8, 0.4, 0.8);
      const quat   = new THREE.Quaternion();
      const color  = new THREE.Color();
      for (let i = 0; i < count; i++) {
        const seed = i * 0.12345;
        const rx = (Math.sin(seed * 12.9898) * 43758.5453) % 1;
        const ry = (Math.sin(seed * 78.233)  * 43758.5453) % 1;
        const rz = (Math.sin(seed * 37.719)  * 43758.5453) % 1;
        const x = (rx - 0.5) * 300;
        const y = Math.abs(ry - 0.5) * 20;
        const z = (rz - 0.5) * 300;
        color.copy(col2).lerp(col1, (y / 20));
        const opacity = isStorm ? 0.55 + Math.random() * 0.3 : 0.2 + Math.random() * 0.25;
        center.set(x, y, z);
        splats.pushSplat(center, scales, quat, opacity, color);
      }
    },
  });

  // Apply GLSL cloud shader
  mesh.objectModifier = makeShaderModifier(schema, animateT);
  mesh.updateGenerator();

  // Drift animation
  mesh.onFrame = ({ mesh: m, time }: any) => {
    m.packedSplats.forEachSplat((idx: number, center: THREE.Vector3, scales: THREE.Vector3, q: THREE.Quaternion, op: number, col: THREE.Color) => {
      center.x += Math.sin(time * 0.0002 + idx * 0.001) * 0.005;
      center.z -= 0.003;
      if (center.z < -200) center.z = 200;
      m.packedSplats.setSplat(idx, center, scales, q, op, col);
    });
    m.packedSplats.needsUpdate = true;
    m.needsUpdate = true;
  };

  return mesh;
}

// ── Procedural stars (night) ───────────────────────────────────────────────────
function buildStars(animateT: ReturnType<typeof dyno.dynoFloat>): SplatMesh {
  const count = 80000;
  const mesh = new SplatMesh({
    maxSplats: count,
    constructSplats: (splats: any) => {
      const center = new THREE.Vector3();
      const scales = new THREE.Vector3(0.012, 0.012, 0.012);
      const quat   = new THREE.Quaternion();
      const color  = new THREE.Color();
      for (let i = 0; i < count; i++) {
        center.set((Math.random()-0.5)*900, (Math.random()-0.5)*600, (Math.random()-0.5)*900);
        color.set(0.5+Math.random()*0.3, 0.5+Math.random()*0.2, 0.7+Math.random()*0.3);
        splats.pushSplat(center, scales, quat, 0.7+Math.random()*0.3, color);
      }
    },
  });

  // Star twinkle: mode 4 GLSL
  const starsSchema: Partial<WorldSchema> = { terrain: 'space', sky: { mood: 'night_stars', horizonColor: 0, zenithColor: 0, entities: [] } };
  mesh.objectModifier = makeShaderModifier(starsSchema as WorldSchema, animateT);
  mesh.updateGenerator();
  return mesh;
}

// ── Lava embers ───────────────────────────────────────────────────────────────
function buildEmbers(animateT: ReturnType<typeof dyno.dynoFloat>): SplatMesh {
  const count = 3000;
  const mesh = new SplatMesh({
    maxSplats: count,
    constructSplats: (splats: any) => {
      const center = new THREE.Vector3();
      const scales = new THREE.Vector3(0.1, 0.1, 0.1);
      const quat   = new THREE.Quaternion();
      for (let i = 0; i < count; i++) {
        center.set((Math.random()-0.5)*250, Math.random()*40, (Math.random()-0.5)*250);
        const heat = new THREE.Color().setHSL(0.04 + Math.random()*0.04, 1, 0.5+Math.random()*0.3);
        splats.pushSplat(center, scales, quat, 0.6+Math.random()*0.4, heat);
      }
    },
  });
  mesh.objectModifier = makeShaderModifier({ terrain: 'lava' } as WorldSchema, animateT);
  mesh.updateGenerator();
  return mesh;
}

// ── Forest fireflies ──────────────────────────────────────────────────────────
function buildFireflies(animateT: ReturnType<typeof dyno.dynoFloat>): SplatMesh {
  const count = 1500;
  const mesh = new SplatMesh({
    maxSplats: count,
    constructSplats: (splats: any) => {
      const center = new THREE.Vector3();
      const scales = new THREE.Vector3(0.09, 0.09, 0.09);
      const quat   = new THREE.Quaternion();
      for (let i = 0; i < count; i++) {
        center.set((Math.random()-0.5)*180, 2+Math.random()*18, (Math.random()-0.5)*180);
        const color = new THREE.Color().setHSL(0.25+Math.random()*0.1, 1, 0.7);
        splats.pushSplat(center, scales, quat, 0.7+Math.random()*0.3, color);
      }
    },
  });
  mesh.objectModifier = makeShaderModifier({ terrain: 'forest' } as WorldSchema, animateT);
  mesh.updateGenerator();
  return mesh;
}

// ── Snow splats ───────────────────────────────────────────────────────────────
function buildSnow(animateT: ReturnType<typeof dyno.dynoFloat>): SplatMesh {
  const count = 4000;
  const mesh = new SplatMesh({
    maxSplats: count,
    constructSplats: (splats: any) => {
      const center = new THREE.Vector3();
      const scales = new THREE.Vector3(0.07, 0.07, 0.07);
      const quat   = new THREE.Quaternion();
      for (let i = 0; i < count; i++) {
        center.set((Math.random()-0.5)*200, 30+Math.random()*30, (Math.random()-0.5)*200);
        splats.pushSplat(center, scales, quat, 0.6+Math.random()*0.4, new THREE.Color(0xddeeff));
      }
    },
  });
  mesh.objectModifier = makeShaderModifier({ terrain: 'snow' } as WorldSchema, animateT);
  mesh.updateGenerator();
  return mesh;
}

// ── Prompt label using textSplats ─────────────────────────────────────────────
function buildPromptLabel(prompt: string): SplatMesh | null {
  try {
    const short = prompt.length > 42 ? prompt.slice(0, 42) + '…' : prompt;
    const label = textSplats({
      text: short,
      font: 'Arial',
      fontSize: 48,
      color: new THREE.Color(0xffffff),
    });
    label.scale.setScalar(0.004);
    label.position.set(-0.5, -5.5, -30);
    return label;
  } catch { return null; }
}

// ── Main export ───────────────────────────────────────────────────────────────
export function buildSparkAtmosphere(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  schema: WorldSchema,
  prompt: string,
  updatables: Function[]
): SparkRenderer | null {
  try {
    const spark = new SparkRenderer({ renderer });
    scene.add(spark);

    const animateT = dyno.dynoFloat(0);

    // Clouds (all themes except deep night)
    if (!['night_stars'].includes(schema.sky.mood) || schema.terrain === 'island') {
      const clouds = buildClouds(schema, animateT);
      clouds.position.set(0, 55, 0);
      scene.add(clouds);
    }

    // Stars (night / space / twilight)
    if (['night_stars','twilight_purple','space'].includes(schema.sky.mood) || schema.terrain === 'space') {
      const stars = buildStars(animateT);
      scene.add(stars);
    }

    // Theme-specific splat layers
    if (schema.terrain === 'lava') {
      const embers = buildEmbers(animateT);
      embers.position.set(0, 0, 0);
      scene.add(embers);
    }
    if (schema.terrain === 'forest' || schema.particles === 'fireflies') {
      const ff = buildFireflies(animateT);
      scene.add(ff);
    }
    if (schema.terrain === 'snow' || schema.particles === 'snow') {
      const snow = buildSnow(animateT);
      scene.add(snow);
    }

    // Prompt label (textSplats)
    const label = buildPromptLabel(prompt);
    if (label) scene.add(label);

    // Drive animateT from updatables
    updatables.push((t: number) => {
      animateT.value = t;
    });

    return spark;
  } catch (e) {
    console.warn('[SparkAtmosphere] Init failed:', e);
    return null;
  }
}
