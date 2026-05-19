
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Snowflake, RefreshCw } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// --- Types ---
type CrystalVariant = "ICE" | "SALT" | "MINERAL" | "OBSIDIAN";

interface VariantConfig {
  core: string;
  edge: string;
  liquid: string;
  irid: number;
}

const VARIANTS: Record<CrystalVariant, VariantConfig> = {
  ICE: { core: "#ffffff", edge: "#a2d2ff", liquid: "#050a1f", irid: 0.1 },
  SALT: { core: "#ffffff", edge: "#ffd97d", liquid: "#1a0f05", irid: 0.2 },
  MINERAL: { core: "#ffffff", edge: "#99ffcc", liquid: "#051a10", irid: 0.3 },
  OBSIDIAN: { core: "#c0c0c0", edge: "#404040", liquid: "#050505", irid: 0.05 },
};

// --- Shaders ---

const simVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const simFragmentShader = `
  uniform sampler2D uCurrent;
  uniform vec2 uRes;
  uniform float uTime;
  uniform vec2 uSeed;
  uniform bool uIsSeeding;
  uniform float uGrowthProb;
  uniform bool uMelting;
  uniform float uBiasAngle;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 pixel = 1.0 / uRes;
    float current = texture2D(uCurrent, vUv).r;

    if (uIsSeeding) {
      if (distance(vUv, uSeed) < 0.005) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        return;
      }
    }

    if (uMelting) {
      gl_FragColor = vec4(max(0.0, current - 0.005), 0.0, 0.0, 1.0);
      return;
    }

    if (current >= 1.0) {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      return;
    }

    // Check 6 neighbors (hexagonal approximation)
    float neighbors = 0.0;
    for (int i = 0; i < 6; i++) {
      float angle = float(i) * 1.04719755; // 60 degrees
      vec2 offset = vec2(cos(angle), sin(angle)) * pixel;
      neighbors += texture2D(uCurrent, vUv + offset).r;
    }

    if (neighbors > 0.1) {
      float h = hash(vUv + uTime);
      
      // Enforce 6-fold symmetry by biasing growth along axes
      float localAngle = atan(vUv.y - uSeed.y, vUv.x - uSeed.x);
      float symmetryBias = pow(abs(cos(localAngle * 3.0)), 4.0); // 6 lobes
      
      // Swipe bias
      float swipeBias = 1.0;
      if (uBiasAngle > -10.0) {
        swipeBias = 0.5 + 1.5 * max(0.0, cos(localAngle - uBiasAngle));
      }

      float prob = uGrowthProb * (0.2 + 0.8 * symmetryBias) * swipeBias;
      
      if (h < prob) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      } else {
        gl_FragColor = vec4(current, 0.0, 0.0, 1.0);
      }
    } else {
      gl_FragColor = vec4(current, 0.0, 0.0, 1.0);
    }
  }
`;

const displayFragmentShader = `
  uniform sampler2D uSim;
  uniform float uTime;
  uniform vec3 uColorCore;
  uniform vec3 uColorEdge;
  uniform vec3 uColorLiquid;
  uniform float uIrid;
  varying vec2 vUv;

  void main() {
    float state = texture2D(uSim, vUv).r;
    
    // Liquid background with noise
    vec3 liquid = uColorLiquid;
    liquid += 0.02 * sin(vUv.x * 20.0 + uTime) * cos(vUv.y * 20.0 + uTime);
    
    // Crystal
    if (state > 0.01) {
      vec3 crystal = mix(uColorEdge, uColorCore, pow(state, 2.0));
      
      // Iridescent shimmer
      float irid = sin(vUv.x * 10.0 + vUv.y * 10.0 + uTime * 2.0) * uIrid;
      crystal += vec3(irid, -irid * 0.5, irid * 0.2);
      
      gl_FragColor = vec4(crystal, 1.0);
    } else {
      gl_FragColor = vec4(liquid, 1.0);
    }
  }
`;

// --- Component ---

const SymmetryCrystals: React.FC = () => {
    const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [variant, setVariant] = useState<CrystalVariant>("ICE");
  const [isMelting, setIsMelting] = useState(false);

  // Three.js refs
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rtA = useRef<THREE.WebGLRenderTarget | null>(null);
  const rtB = useRef<THREE.WebGLRenderTarget | null>(null);
  const simMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const displayMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  
  const mouseRef = useRef({ x: 0.5, y: 0.5, seeding: false, biasAngle: -100 });
  const lastInactivityRef = useRef(Date.now());

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const res = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Setup Render Targets
    const createRT = () => new THREE.WebGLRenderTarget(res.x, res.y, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    });
    rtA.current = createRT();
    rtB.current = createRT();

    // Simulation Material
    const simMaterial = new THREE.ShaderMaterial({
      vertexShader: simVertexShader,
      fragmentShader: simFragmentShader,
      uniforms: {
        uCurrent: { value: null },
        uRes: { value: res },
        uTime: { value: 0 },
        uSeed: { value: new THREE.Vector2(0.5, 0.5) },
        uIsSeeding: { value: false },
        uGrowthProb: { value: 0.15 },
        uMelting: { value: false },
        uBiasAngle: { value: -100 },
      }
    });
    simMaterialRef.current = simMaterial;

    // Display Material
    const displayMaterial = new THREE.ShaderMaterial({
      vertexShader: simVertexShader,
      fragmentShader: displayFragmentShader,
      uniforms: {
        uSim: { value: null },
        uTime: { value: 0 },
        uColorCore: { value: new THREE.Color(VARIANTS.ICE.core) },
        uColorEdge: { value: new THREE.Color(VARIANTS.ICE.edge) },
        uColorLiquid: { value: new THREE.Color(VARIANTS.ICE.liquid) },
        uIrid: { value: VARIANTS.ICE.irid },
      }
    });
    displayMaterialRef.current = displayMaterial;

    const plane = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(plane, simMaterial);
    scene.add(mesh);

    let frame = 0;

    const animate = (time: number) => {
      requestAnimationFrame(animate);
      frame++;

      const currentRT = frame % 2 === 0 ? rtA.current : rtB.current;
      const nextRT = frame % 2 === 0 ? rtB.current : rtA.current;

      // Update Uniforms
      simMaterial.uniforms.uCurrent.value = currentRT?.texture;
      simMaterial.uniforms.uTime.value = time * 0.001;
      simMaterial.uniforms.uSeed.value.set(mouseRef.current.x, mouseRef.current.y);
      simMaterial.uniforms.uIsSeeding.value = mouseRef.current.seeding;
      simMaterial.uniforms.uMelting.value = isMelting;
      simMaterial.uniforms.uBiasAngle.value = mouseRef.current.biasAngle;

      // Accelerate growth
      simMaterial.uniforms.uGrowthProb.value = 0.15;

      // 1. Simulation Step
      mesh.material = simMaterial;
      renderer.setRenderTarget(nextRT);
      renderer.render(scene, camera);

      // 2. Display Step
      displayMaterial.uniforms.uSim.value = nextRT?.texture;
      displayMaterial.uniforms.uTime.value = time * 0.001;
      mesh.material = displayMaterial;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      // Monitor coverage (every 10 frames)
      if (frame % 10 === 0) {
        const pixelData = new Float32Array(4);
        renderer.readRenderTargetPixels(nextRT!, res.x / 2, res.y / 2, 1, 1, pixelData);
        // Approximation: check a few points or just let it run. 
        // For real coverage, we'd need a reduction, but we'll estimate by time or a central probe.
        if (frame > 200 && !isMelting) {
           // Auto-melt after some time
           // setCoverage(c => c + 0.01);
        }
      }

      // Inactivity check
      if (Date.now() - lastInactivityRef.current > 20000) {
        mouseRef.current.x = Math.random();
        mouseRef.current.y = Math.random();
        mouseRef.current.seeding = true;
        setTimeout(() => { mouseRef.current.seeding = false; }, 100);
        lastInactivityRef.current = Date.now();
      }
    };

    animate(0);

    return () => {
      renderer.dispose();
      rtA.current?.dispose();
      rtB.current?.dispose();
    };
  }, [isMelting]);

  useEffect(() => {
    if (displayMaterialRef.current) {
      const v = VARIANTS[variant];
      displayMaterialRef.current.uniforms.uColorCore.value.set(v.core);
      displayMaterialRef.current.uniforms.uColorEdge.value.set(v.edge);
      displayMaterialRef.current.uniforms.uColorLiquid.value.set(v.liquid);
      displayMaterialRef.current.uniforms.uIrid.value = v.irid;
    }
  }, [variant]);

  const handlePointerDown = (e: React.PointerEvent) => {
    mouseRef.current.x = e.clientX / window.innerWidth;
    mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    mouseRef.current.seeding = true;
    lastInactivityRef.current = Date.now();
  };

  const handlePointerUp = () => {
    mouseRef.current.seeding = false;
    mouseRef.current.biasAngle = -100;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (mouseRef.current.seeding) {
      const dx = (e.clientX / window.innerWidth) - mouseRef.current.x;
      const dy = (1.0 - e.clientY / window.innerHeight) - mouseRef.current.y;
      if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
        mouseRef.current.biasAngle = Math.atan2(dy, dx);
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-black overflow-hidden cursor-crosshair touch-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Interface */}
      <div className="absolute bottom-400 left-1/2 -translate-x-1/2 flex items-center space-x-4 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl z-20">
        {(Object.keys(VARIANTS) as CrystalVariant[]).map((v) => (
          <button
            key={v}
            onClick={(e) => {
              e.stopPropagation();
              setVariant(v);
            }}
            className={`px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
              variant === v ? "bg-white text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            {v}
          </button>
        ))}
        <div className="w-px h-6 bg-white/10 mx-2" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMelting(!isMelting);
          }}
          className={`p-2 rounded-xl transition-all ${isMelting ? 'bg-red-500/20 text-red-400' : 'text-gray-400 hover:text-white'}`}
        >
          <RefreshCw size={18} className={isMelting ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Visual Overlays */}
      <div className="absolute top-10 left-10 pointer-events-none">
        <h1 className="text-white text-xl font-light tracking-[0.3em] uppercase opacity-60 flex items-center gap-3">
          <Snowflake size={20} className="text-blue-300" />
          Supercooled Symmetry
        </h1>
      </div>

      <div className="absolute inset-0 pointer-events-none border-[40px] border-black/20 mix-blend-overlay" />
    
      {/* ALWAYS VISIBLE EXIT BUTTON */}
      <div className="absolute top-8 right-24 pointer-events-auto z-[9999]">
        <button 
          onClick={() => {
            if (typeof navigate !== 'undefined') {
              navigate('/experimental-art-modes');
            } else {
              window.location.href = '/experimental-art-modes';
            }
          }}
          className="p-3.5 bg-black/20 hover:bg-rose-500/20 backdrop-blur-xl rounded-2xl border border-white/10 text-white/70 hover:text-rose-400 transition-all shadow-xl flex items-center justify-center"
          title="Exit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
</div>
  );
};

export default SymmetryCrystals;
