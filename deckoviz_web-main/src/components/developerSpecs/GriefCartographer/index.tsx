
import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import {
  RefreshCw, Pause, Play, ShieldCheck, Wind,
  Activity, Info, Box, Layers, Zap, Heart,
  ArrowLeft, Share2, Scan, Maximize2
} from "lucide-react";
import { analyzeText, EmotionalState } from "./emotionEngine";

// --- GLSL Shaders ---

const terrainVertexShader = `
  varying vec2 vUv;
  varying float vHeight;
  uniform float uTime;
  uniform float uRoughness;
  uniform float uEvolution;

  // 2D Noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 g = a0.x  * vec2(x0.x,x12.x) + h.x  * vec2(x0.y,x12.y);
    float n = 130.0 * dot(m, g);
    return n;
  }

  void main() {
    vUv = uv;
    
    // Multi-layered noise
    float n1 = snoise(uv * 1.5 + uEvolution * 0.05) * 1.0;
    float n2 = snoise(uv * 4.0 + uEvolution * 0.1) * 0.4;
    float n3 = snoise(uv * 8.0 + uEvolution * 0.2) * 0.15;
    
    float height = n1 + n2 + n3;
    height *= uRoughness * 4.0;
    vHeight = height;
    
    vec3 pos = position;
    pos.z += height;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const terrainFragmentShader = `
  varying vec2 vUv;
  varying float vHeight;
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  uniform float uFogDensity;
  uniform vec3 uFogColor;
  uniform float uTime;

  void main() {
    // Base color from height
    float h = clamp(vHeight * 0.2 + 0.5, 0.0, 1.0);
    vec3 color = mix(uColorLow, uColorHigh, h);
    
    // Add subtle wave pattern
    float wave = sin(vUv.x * 20.0 + uTime * 2.0) * cos(vUv.y * 20.0 + uTime * 2.0) * 0.05;
    color += wave * (1.0 - h);
    
    // Simple top-down lighting
    color *= (0.7 + 0.3 * sin(vHeight * 3.0));
    
    // Edge glow based on height
    float edge = smoothstep(0.4, 1.0, h);
    color += edge * uColorHigh * 0.3;
    
    // Fog
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = exp2(-uFogDensity * uFogDensity * depth * depth * 1.442695);
    fogFactor = clamp(fogFactor, 0.0, 1.0);
    
    gl_FragColor = vec4(mix(uFogColor, color, fogFactor), 1.0);
  }
`;

// --- Component ---

const GriefCartographer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inputText, setInputText] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  interface CustomUniform extends THREE.IUniform {
    target?: number | THREE.Color;
  }

  // Refs for Three.js
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const uniformsRef = useRef<Record<string, CustomUniform>>({
    uTime: { value: 0 },
    uEvolution: { value: Math.random() * 100 },
    uRoughness: { value: 0.2 },
    uColorLow: { value: new THREE.Color("#0a0a1a") },
    uColorHigh: { value: new THREE.Color("#3a3a5a") },
    uFogDensity: { value: 0.05 },
    uFogColor: { value: new THREE.Color("#020205") },
  });

  const isPausedRef = useRef(isPaused);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const [emotionalState, setEmotionalState] = useState<EmotionalState>({
    intensity: 0.2,
    recency: 0.2,
    ambivalence: 0.1,
    gratitude: 0.3
  });

  const startCartography = () => {
    const state = analyzeText(inputText);
    setEmotionalState(state);
    setIsSimulating(true);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !isSimulating) return;

    // Initialize Scene
    const scene = new THREE.Scene();
    scene.background = uniformsRef.current.uFogColor.value;

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -10, 4);
    camera.lookAt(0, 5, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Post-Processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.6, 0.4, 0.85
    );
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // Terrain
    const geometry = new THREE.PlaneGeometry(30, 30, 200, 200);
    const material = new THREE.ShaderMaterial({
      vertexShader: terrainVertexShader,
      fragmentShader: terrainFragmentShader,
      uniforms: uniformsRef.current,
      side: THREE.DoubleSide,
    });
    const terrain = new THREE.Mesh(geometry, material);
    scene.add(terrain);

    // Weather particles (Emotional Atoms)
    const particleCount = 2000;
    const pGeometry = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pVelocities = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 40;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pPositions[i * 3 + 2] = Math.random() * 20;
      pVelocities[i] = 0.02 + Math.random() * 0.05;
    }
    pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMaterial = new THREE.PointsMaterial({
      color: "#4a90e2",
      size: 0.03,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeometry, pMaterial);
    scene.add(particles);

    // Update colors based on emotional state
    const updateColors = (state: EmotionalState) => {
      const g = state.gratitude;
      const i = state.intensity;
      const r = state.recency;

      // Roughness -> Intensity
      uniformsRef.current.uRoughness.target = 0.1 + i * 1.2;

      // Gratitude -> Warmth vs Cold
      const warmLow = new THREE.Color("#3d1a0a"); // Deep Amber
      const warmHigh = new THREE.Color("#f0a04b"); // Bright Gold
      const coldLow = new THREE.Color("#050515"); // Deep Void
      const coldHigh = new THREE.Color("#4a90e2"); // Electric Blue
      const painLow = new THREE.Color("#1a0505"); // Deep Red
      const painHigh = new THREE.Color("#8b0000"); // Blood Red

      let baseLow = coldLow.clone().lerp(warmLow, g);
      let baseHigh = coldHigh.clone().lerp(warmHigh, g);

      // Add pain if intensity is high and gratitude is low
      if (i > 0.6 && g < 0.4) {
        baseLow.lerp(painLow, (i - 0.6) * 2);
        baseHigh.lerp(painHigh, (i - 0.6) * 2);
      }

      uniformsRef.current.uColorLow.target = baseLow;
      uniformsRef.current.uColorHigh.target = baseHigh;

      // Recency -> Fog/Storm
      uniformsRef.current.uFogDensity.target = 0.01 + r * 0.12;
      pMaterial.opacity = 0.1 + r * 0.5;
      pMaterial.color.copy(baseHigh);
    };

    updateColors(emotionalState);

    // Animation loop
    let animationId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const lerpColor = (c1: THREE.Color, c2: THREE.Color, t: number) => c1.lerp(c2, t);

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      if (isPausedRef.current) return;

      const dt = 0.01;
      uniformsRef.current.uTime.value = time * 0.001;
      uniformsRef.current.uEvolution.value += 0.002 * (1.0 + emotionalState.recency);

      // Smooth updates
      const u = uniformsRef.current;
      if (u.uRoughness.target !== undefined) {
        u.uRoughness.value = lerp(u.uRoughness.value as number, u.uRoughness.target as number, dt);
        u.uFogDensity.value = lerp(u.uFogDensity.value as number, u.uFogDensity.target as number, dt);
        lerpColor(u.uColorLow.value as THREE.Color, u.uColorLow.target as THREE.Color, dt);
        lerpColor(u.uColorHigh.value as THREE.Color, u.uColorHigh.target as THREE.Color, dt);
      }

      // Ambivalence -> Shifting Light
      const lightShift = Math.sin(time * 0.001 * (1.0 + emotionalState.ambivalence)) * 0.2;
      uniformsRef.current.uColorHigh.value.offsetHSL(0, 0, lightShift * emotionalState.ambivalence);

      // Move particles (Atmospheric Flow)
      const positions = pGeometry.attributes.position.array as Float32Array;
      const speedMult = 1.0 + emotionalState.intensity * 2.0;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 2] -= pVelocities[i] * speedMult;
        // Add subtle horizontal drift
        positions[i * 3] += Math.sin(time * 0.001 + i) * 0.01;

        if (positions[i * 3 + 2] < 0) {
          positions[i * 3 + 2] = 20;
          positions[i * 3] = (Math.random() - 0.5) * 40;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
        }
      }
      pGeometry.attributes.position.needsUpdate = true;

      // Subtle camera sway
      camera.position.x = Math.sin(time * 0.0003) * 3;
      camera.position.y = -10 + Math.cos(time * 0.0002) * 1;
      camera.lookAt(0, 5, 0);

      composer.render();
    };

    animate(0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isSimulating, emotionalState]); // Re-init only when starting or changing state significantly

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020205] overflow-hidden selection:bg-violet-500/30">
      <AnimatePresence>
        {!isSimulating ? (
          <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,144,226,0.05)_0%,transparent_70%)]" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl text-center shadow-2xl relative overflow-hidden"
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/10 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/10 rounded-br-3xl" />

              <div className="w-20 h-20 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-8 border border-violet-500/20">
                <Wind className="text-violet-400 w-10 h-10 animate-pulse" />
              </div>

              <h1 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase italic">Grief Cartographer</h1>
              <p className="text-white/40 text-sm mb-10 leading-relaxed max-w-md mx-auto font-medium">
                Translate the architecture of your internal landscape into a living, GPU-accelerated simulation.
                <br /><span className="text-violet-400/60 text-[10px] uppercase tracking-widest mt-2 block">Neural Resonance Mapping // v.4.1</span>
              </p>

              <div className="relative group mb-8">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Describe what you carry..."
                  className="w-full h-40 bg-black/40 border border-white/10 rounded-3xl p-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500/40 transition-all resize-none font-medium leading-relaxed"
                />
                <div className="absolute bottom-4 right-6 text-[10px] text-white/20 uppercase tracking-widest pointer-events-none">
                  Secure Local Processing
                </div>
              </div>

              <button
                onClick={startCartography}
                className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center space-x-3"
              >
                <Zap size={18} />
                <span>Generate Landscape</span>
              </button>

              <div className="mt-10 flex items-center justify-center space-x-3 text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">
                <ShieldCheck size={14} className="text-violet-500" />
                <span>Privacy Encrypted Simulation</span>
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            <canvas ref={canvasRef} className="block w-full h-full z-0" />

            {/* Cinematic HUD Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none p-12 pb-40 flex flex-col justify-between">

              {/* Top Header */}
              <div className="flex justify-between items-start">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-6"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-violet-500/20 flex items-center justify-center backdrop-blur-xl">
                      <Scan className="w-8 h-8 text-violet-400 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 border-t-2 border-violet-400 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">Neural Landscape</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
                      <p className="text-[10px] text-violet-400/60 uppercase tracking-[0.6em]">Emotional Topology Capture // Active</p>
                    </div>
                  </div>
                </motion.div>

                <div className="flex gap-4 pointer-events-auto">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/10 transition-all group"
                  >
                    {isPaused ? <Play size={20} className="fill-white" /> : <Pause size={20} />}
                  </button>
                  <button
                    onClick={() => {
                      setIsSimulating(false);
                      setInputText("");
                    }}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/10 transition-all group"
                  >
                    <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/10 transition-all group"
                  >
                    <Maximize2 size={20} />
                  </button>
                  <button
                    onClick={() => setIsSimulating(false)}
                    className="p-3 px-6 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl flex items-center gap-3"
                  >
                    <ArrowLeft size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Exit Scan</span>
                  </button>
                </div>
              </div>

              {/* Bottom Telemetry HUD */}
              <div className="flex justify-between items-end">
                {/* Left Metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 w-96 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Activity size={80} />
                  </div>

                  <div className="flex items-center gap-3 text-violet-400 border-b border-white/10 pb-4">
                    <Layers size={18} className="animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Environmental Telemetry</span>
                  </div>

                  <div className="space-y-5">
                    {[
                      { label: "Turbulence", val: emotionalState.intensity, icon: <Zap size={12} /> },
                      { label: "Atmosphere", val: emotionalState.recency, icon: <Wind size={12} /> },
                      { label: "Ambivalence", val: emotionalState.ambivalence, icon: <Info size={12} /> },
                      { label: "Resonance", val: emotionalState.gratitude, icon: <Heart size={12} /> }
                    ].map((m, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.2em] font-bold">
                          <span className="flex items-center gap-2 text-white/40">{m.icon} {m.label}</span>
                          <span className="text-white">{(m.val * 100).toFixed(0)}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${m.val * 100}%` }}
                            className="h-full bg-violet-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Status */}
                <div className="flex flex-col gap-6 items-end">
                  <div className="flex gap-4 pointer-events-auto">
                    <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl">
                      <Share2 size={16} />
                    </button>
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl flex gap-12 w-[30rem] relative overflow-hidden">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2 text-violet-400">
                        <Box size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Neural Load</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: isPaused ? "0%" : "85%" }}
                          className="h-full bg-violet-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest">Topology: DYNAMIC_GEOMETRY</p>
                    </div>
                    <div className="w-px h-full bg-white/10" />
                    <div className="flex-1 space-y-2">
                      <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Simulation</span>
                      <p className="text-2xl text-white font-black italic">{isPaused ? "STANDBY" : "RENDER_LIVE"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen Overlay Effects */}
            <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
            <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GriefCartographer;
