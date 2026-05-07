import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { SparkRenderer, SplatMesh } from '@sparkjsdev/spark';
import { parsePrompt } from './WorldParser';
import { WorldBuilder, sampleTerrainHeight } from './WorldBuilder';
import { buildSparkAtmosphere } from './SparkAtmosphere';
import type { MarbleWorldResult } from '../../lib/generateWorld';

interface WorldSceneProps {
  textureUrl: string;
  prompt: string;
  marbleWorld?: MarbleWorldResult | null;
}

const PLAYER_HEIGHT = 3;
const MOVE_SPEED    = 40;
const GRAVITY       = 60;

const WorldScene: React.FC<WorldSceneProps> = ({ textureUrl, prompt, marbleWorld }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef  = useRef<PointerLockControls | null>(null);
  const requestRef   = useRef<number>();
  const isLockedRef  = useRef(false);
  const [error,   setError]   = useState<string | null>(null);
  const [splatLoading, setSplatLoading] = useState(!!marbleWorld?.spzUrls?.['500k']);

  useEffect(() => {
    if (!containerRef.current) return;
    setError(null);

    // ── SCENE ────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111122);
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, PLAYER_HEIGHT, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type    = THREE.PCFShadowMap;
    renderer.toneMapping       = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.4;
    containerRef.current.appendChild(renderer.domElement);

    // ── BUILD PROCEDURAL WORLD ────────────────────────────────────────────────
    let updatables: Function[] = [];
    let colliders:  THREE.Mesh[] = [];
    let schema: ReturnType<typeof parsePrompt>;

    try {
      schema = parsePrompt(prompt);
      const builder = new WorldBuilder(scene, schema);
      builder.build();
      updatables = builder.getUpdatables();
      colliders  = builder.getColliders();
      // Spark procedural atmosphere (clouds, embers, stars, fireflies, textSplats)
      buildSparkAtmosphere(scene, renderer, schema, prompt, updatables);
    } catch (err: any) {
      console.error('[WorldScene] Build failed:', err);
      setError(String(err?.message || err));
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
      return;
    }

    // ── MARBLE GAUSSIAN SPLAT WORLD (real .spz) ───────────────────────────────
    let marbleSplat: SplatMesh | null = null;
    if (marbleWorld?.spzUrls) {
      try {
        // SparkRenderer must be added for SplatMesh to render
        const spark = new SparkRenderer({ renderer });
        scene.add(spark);

        const spzUrl =
          marbleWorld.spzUrls['500k'] ||
          marbleWorld.spzUrls['100k'] ||
          marbleWorld.spzUrls['full_res'];

        if (spzUrl) {
          marbleSplat = new SplatMesh({ url: spzUrl });
          // Marble worlds are positioned at world origin, scale up and ground them
          marbleSplat.scale.setScalar(40);
          marbleSplat.position.set(0, -5, 0);
          marbleSplat.quaternion.set(1, 0, 0, 0);
          scene.add(marbleSplat);
          setSplatLoading(false);
          console.log('[WorldScene] Marble splat loaded from:', spzUrl);
        }
      } catch (e) {
        console.warn('[WorldScene] Marble splat load error:', e);
        setSplatLoading(false);
      }
    }

    // ── PANORAMA SKYBOX (thumbnail or pano) ───────────────────────────────────
    const skyUrl = marbleWorld?.panoUrl || textureUrl;
    let skyGeo: THREE.SphereGeometry | null = null;
    let skyMat: THREE.MeshBasicMaterial | null = null;
    let skyTex: THREE.Texture | null = null;
    if (skyUrl) {
      skyTex = new THREE.TextureLoader().load(skyUrl, () => setSplatLoading(false));
      skyTex.colorSpace = THREE.SRGBColorSpace;
      skyGeo = new THREE.SphereGeometry(940, 60, 40);
      skyGeo.scale(-1, 1, 1);
      const opacity = marbleWorld?.panoUrl ? 0.9 : 0.45;
      skyMat = new THREE.MeshBasicMaterial({ map: skyTex, transparent: true, opacity, depthWrite: false });
      scene.add(new THREE.Mesh(skyGeo, skyMat));
    }

    // ── CONTROLS ─────────────────────────────────────────────────────────────
    const controls = new PointerLockControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.addEventListener('lock',   () => { isLockedRef.current = true; });
    controls.addEventListener('unlock', () => { isLockedRef.current = false; });

    const keys: Record<string, boolean> = {};
    const onKeyDown = (e: KeyboardEvent) => { keys[e.code] = true; };
    const onKeyUp   = (e: KeyboardEvent) => { keys[e.code] = false; };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup',   onKeyUp);

    // ── COLLISION ─────────────────────────────────────────────────────────────
    const raycasterDown = new THREE.Raycaster();
    const raycasterFwd  = new THREE.Raycaster();
    let velocityY = 0;

    function resolveCollisions(pos: THREE.Vector3): THREE.Vector3 {
      const r = pos.clone();
      const terrainH = sampleTerrainHeight(r.x, r.z, schema!.terrain) - 5 + PLAYER_HEIGHT;
      if (r.y < terrainH) { r.y = terrainH; velocityY = 0; }
      raycasterDown.set(new THREE.Vector3(r.x, r.y + 50, r.z), new THREE.Vector3(0, -1, 0));
      const dh = raycasterDown.intersectObjects(colliders, true);
      if (dh.length > 0 && dh[0].distance < 50 + PLAYER_HEIGHT) {
        const sy = r.y + 50 - dh[0].distance + PLAYER_HEIGHT;
        if (sy > r.y) { r.y = sy; velocityY = 0; }
      }
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir); dir.y = 0; dir.normalize();
      raycasterFwd.set(new THREE.Vector3(r.x, r.y, r.z), dir);
      const fh = raycasterFwd.intersectObjects(colliders, true);
      if (fh.length > 0 && fh[0].distance < 3) { r.x = camera.position.x; r.z = camera.position.z; }
      return r;
    }

    // ── ANIMATION LOOP ────────────────────────────────────────────────────────
    let prev = performance.now();
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      const now   = performance.now();
      const delta = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      if (isLockedRef.current) {
        const vel = new THREE.Vector3();
        if (keys['KeyW'] || keys['ArrowUp'])    vel.z -= MOVE_SPEED;
        if (keys['KeyS'] || keys['ArrowDown'])  vel.z += MOVE_SPEED;
        if (keys['KeyA'] || keys['ArrowLeft'])  vel.x -= MOVE_SPEED;
        if (keys['KeyD'] || keys['ArrowRight']) vel.x += MOVE_SPEED;
        vel.multiplyScalar(delta);
        controls.moveRight(vel.x);
        controls.moveForward(-vel.z);
        velocityY -= GRAVITY * delta;
        camera.position.y += velocityY * delta;
        camera.position.copy(resolveCollisions(camera.position.clone()));
        camera.position.x = THREE.MathUtils.clamp(camera.position.x, -400, 400);
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, -400, 400);
      }

      updatables.forEach(fn => fn(now / 1000, delta));
      renderer.render(scene, camera);
    };
    animate();

    // ── RESIZE ────────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── CLEANUP ───────────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('resize',  onResize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup',   onKeyUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (containerRef.current?.contains(renderer.domElement))
        containerRef.current.removeChild(renderer.domElement);
      scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
          else obj.material.dispose();
        }
      });
      skyGeo?.dispose(); skyMat?.dispose(); skyTex?.dispose();
      renderer.dispose();
    };
  }, [prompt, textureUrl, marbleWorld]);

  const handleClick = () => controlsRef.current?.lock();

  if (error) return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="bg-red-950/80 border border-red-500/30 rounded-2xl p-8 max-w-lg text-center">
        <p className="text-red-400 text-lg font-bold mb-2">World Generation Error</p>
        <p className="text-red-300/70 text-sm font-mono break-all">{error}</p>
        <button onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all">
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-screen overflow-hidden cursor-crosshair bg-black"
         onClick={handleClick} ref={containerRef} tabIndex={0}>

      {/* Splat loading indicator */}
      {splatLoading && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2
                        bg-black/60 backdrop-blur-sm border border-violet-500/30 px-4 py-2 rounded-full">
          <span className="w-3 h-3 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-violet-300 text-xs font-mono">Loading Marble Gaussian Splats…</span>
        </div>
      )}

      {/* Marble badge (if real world loaded) */}
      {marbleWorld && !splatLoading && (
        <a href={marbleWorld.marbleUrl || '#'} target="_blank" rel="noreferrer"
           className="absolute top-6 right-6 z-30 flex items-center gap-2
                      bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full
                      text-white/60 text-xs hover:text-white hover:border-white/30 transition-all">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Marble World · View on platform ↗
        </a>
      )}

      {/* HUD */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none select-none">
        <p className="text-white/50 text-xs tracking-widest uppercase font-mono">
          Click to explore · WASD to move · ESC to exit
        </p>
      </div>

      {/* Caption (from Marble AI) */}
      {marbleWorld?.caption && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none select-none max-w-2xl px-6">
          <p className="text-white/60 text-sm italic">{marbleWorld.caption}</p>
        </div>
      )}
      {!marbleWorld?.caption && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none">
          <p className="text-white/50 text-sm italic">"{prompt}"</p>
        </div>
      )}

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-4 h-px bg-white/40" />
        <div className="h-4 w-px bg-white/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)' }} />
    </div>
  );
};

export default WorldScene;
