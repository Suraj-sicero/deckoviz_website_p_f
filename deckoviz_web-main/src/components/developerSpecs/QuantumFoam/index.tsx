"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { 
  Atom, Activity, Scan, Layers, Zap, 
  RefreshCw, Maximize2, Info, Compass, ShieldCheck
} from "lucide-react";

// --- Shaders ---

const foamVertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;
  uniform vec2 uMouse;
  
  // Simplex 3D Noise
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Multi-octave displacement
    float noise = 0.0;
    noise += snoise(vec3(pos.xy * 0.1, uTime * 0.2)) * 2.0;
    noise += snoise(vec3(pos.xy * 0.2, uTime * 0.4)) * 1.0;
    noise += snoise(vec3(pos.xy * 0.4, uTime * 0.6)) * 0.5;
    
    // Mouse distortion
    float d = distance(pos.xy, uMouse * 20.0);
    float mouseStrength = exp(-d * 0.1) * 5.0;
    noise += mouseStrength * snoise(vec3(pos.xy * 0.8, uTime * 2.0));
    
    pos.z += noise;
    vElevation = noise;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const foamFragmentShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;
  uniform vec4 uParticles[10]; 
  
  void main() {
    // Base color based on elevation
    vec3 colorLow = vec3(0.01, 0.02, 0.05); // Deep space
    vec3 colorHigh = vec3(0.05, 0.1, 0.2); // Energy peak
    
    vec3 color = mix(colorLow, colorHigh, smoothstep(-2.0, 3.0, vElevation));
    
    // Iridescence/Vacuum Glow
    float edge = 1.0 - dot(vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, 1.0)); // Placeholder for actual normal
    color += vec3(0.1, 0.2, 0.4) * pow(clamp(vElevation * 0.2, 0.0, 1.0), 2.0);
    
    // Grid lines
    float grid = abs(sin(vUv.x * 100.0) * sin(vUv.y * 100.0));
    grid = pow(grid, 50.0);
    color += grid * 0.05 * vec3(0.4, 0.8, 1.0);
    
    // Particle highlights
    for(int i = 0; i < 10; i++) {
        vec2 pPos = uParticles[i].xy;
        float pLife = uParticles[i].z;
        if(pLife > 0.0) {
            float d = distance(vUv * 2.0 - 1.0, pPos);
            float glow = exp(-d * 30.0) * pLife;
            color += vec3(glow) * vec3(0.5, 0.8, 1.0);
        }
    }
    
    // Vignette
    float dist = distance(vUv, vec2(0.5));
    color *= smoothstep(0.8, 0.2, dist);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// --- Logic ---

interface VirtualParticle {
  id: number;
  pairId: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const QuantumFoam: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [metrics, setMetrics] = useState({ planck: 1.616, energy: 0.84, fluctuation: 0.92 });
  const particlesRef = useRef<VirtualParticle[]>([]);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

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
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#020205");

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -15, 12);
    camera.lookAt(0, 5, 0);

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, 0.4, 0.85
    );
    composer.addPass(bloomPass);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: mouseRef.current },
      uParticles: { value: new Float32Array(40).fill(0) }
    };

    const geometry = new THREE.PlaneGeometry(60, 60, 128, 128);
    const material = new THREE.ShaderMaterial({
      vertexShader: foamVertexShader,
      fragmentShader: foamFragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Particle Spawning
    const spawnPair = () => {
      if (particlesRef.current.length >= 10) return;
      const px = (Math.random() - 0.5) * 2;
      const py = (Math.random() - 0.5) * 2;
      const life = 1.0 + Math.random() * 0.5;
      const pairId = Math.random();
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.005 + Math.random() * 0.01;

      particlesRef.current.push(
        { id: Math.random(), pairId, x: px, y: py, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, life, maxLife: life },
        { id: Math.random(), pairId, x: px, y: py, vx: -Math.cos(angle)*speed, vy: -Math.sin(angle)*speed, life, maxLife: life }
      );
    };
    const interval = setInterval(spawnPair, 1200);

    // Animation
    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      const dt = 0.016;
      uniforms.uTime.value = time * 0.001;
      uniforms.uMouse.value.lerp(mouseRef.current, 0.1);

      // Update Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life -= 0.015;
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }
        const t = 1.0 - (p.life / p.maxLife);
        if (t < 0.5) { p.x += p.vx; p.y += p.vy; }
        else { p.x -= p.vx * 1.5; p.y -= p.vy * 1.5; }
      }

      const pData = new Float32Array(40).fill(0);
      particlesRef.current.slice(0, 10).forEach((p, i) => {
        pData[i * 4] = p.x;
        pData[i * 4 + 1] = p.y;
        pData[i * 4 + 2] = p.life;
        pData[i * 4 + 3] = p.pairId;
      });
      uniforms.uParticles.value = pData;

      // Dynamic metrics
      if (Math.random() > 0.9) {
        setMetrics({
            planck: 1.616 + (Math.random() - 0.5) * 0.001,
            energy: 0.8 + Math.random() * 0.1,
            fluctuation: 0.9 + Math.random() * 0.05
        });
      }

      composer.render();
    };
    animate(0);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", handlePointerMove);
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020205] overflow-hidden selection:bg-cyan-500/30">
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
              <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 flex items-center justify-center backdrop-blur-xl">
                 <Atom className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-t-2 border-cyan-400 rounded-full animate-spin duration-[4000ms]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Quantum Foam</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                <p className="text-[10px] text-cyan-400/60 uppercase tracking-[0.6em]">Sub-Perceptual Fluctuation Monitor // v.2.4</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             <button 
               onClick={toggleFullscreen}
               className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl"
             >
               <Maximize2 size={16} />
             </button>
             <button onClick={() => window.location.reload()} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl">
                <RefreshCw size={16} />
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
              <Scan size={80} />
            </div>
            
            <div className="flex items-center gap-3 text-cyan-400 border-b border-white/10 pb-4">
               <Layers size={18} className="animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Vacuum Energy Telemetry</span>
            </div>
            
            <div className="space-y-5">
              {[
                { label: "Planck Length", val: `${metrics.planck.toFixed(3)} ℓP`, icon: <Compass size={12} /> },
                { label: "Energy Density", val: `${metrics.energy.toFixed(2)} eV/λ`, icon: <Zap size={12} /> },
                { label: "Fluctuation Rate", val: `${(metrics.fluctuation * 100).toFixed(1)}%`, icon: <Activity size={12} /> }
              ].map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-2 text-white/40">
                      {m.icon}
                      <span>{m.label}</span>
                    </div>
                    <span className="text-white">{m.val}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: `${(m.label === 'Fluctuation Rate' ? metrics.fluctuation : 0.8) * 100}%` }}
                      className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-3 text-[10px] text-white/20 uppercase font-bold tracking-widest border-t border-white/5">
              <ShieldCheck size={14} className="text-cyan-500/40" />
              <span>Zero-Point Field Stabilized</span>
            </div>
          </motion.div>

          {/* Right Data Block */}
          <div className="flex flex-col gap-4">
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl flex gap-12 w-[30rem] relative overflow-hidden">
               <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Info size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Theoretical Note</span>
                  </div>
                  <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-wider">
                    Quantum fluctuations are temporary changes in the amount of energy in a point in space.
                  </p>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" 
                    />
                  </div>
               </div>
               <div className="w-px h-full bg-white/10" />
               <div className="flex-1 space-y-2">
                  <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Domain</span>
                  <p className="text-2xl text-white font-black italic">SUB_ATOM</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Effects */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
};

export default QuantumFoam;
