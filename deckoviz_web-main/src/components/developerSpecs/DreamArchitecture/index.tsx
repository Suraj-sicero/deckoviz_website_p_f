"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, RefreshCw, Layers, Box, Cpu, Zap, Camera, Eye, X, Info } from "lucide-react";

const STYLES = [
  { 
    id: "brutalist", 
    name: "Brutalist", 
    color: "#ff6b00", 
    desc: "Procedural generation of monolithic concrete structures characterized by massive forms and repetitive block modules. Emphasizes weight and structural honesty.",
    fog: "#050505",
    light: "#ffaa44"
  },
  { 
    id: "gothic", 
    name: "Gothic", 
    color: "#00d1ff", 
    desc: "Synthesizing 'Escher-style' vertical paradoxes. Intersecting archways and gravity-defying pillars that create an endless upward spiral.",
    fog: "#000810",
    light: "#00d1ff"
  },
  { 
    id: "floating", 
    name: "Floating", 
    color: "#fb7185", 
    desc: "Anti-gravity spatial synthesis. Detached architectural elements suspended in a vacuum, forming impossible connections between disjointed volumes.",
    fog: "#080005",
    light: "#fb7185"
  },
  { 
    id: "organic", 
    name: "Organic", 
    color: "#10b981", 
    desc: "Biomorphic growth algorithms. Simulating architectural structures that behave like living corals or bone lattices.",
    fog: "#000a05",
    light: "#10b981"
  }
];

const DreamArchitecture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [style, setStyle] = useState(STYLES[0]);
  const [seed, setSeed] = useState(1234);
  const sceneRef = useRef<THREE.Scene | null>(null);

  const generateArchitecture = useCallback((scene: THREE.Scene, styleId: string) => {
    // Clear previous groups
    scene.children.filter(c => c.type === "Group").forEach(c => scene.remove(c));

    const material = new THREE.MeshStandardMaterial({ 
      color: "#888888", // Brighter for visibility
      roughness: 0.4,
      metalness: 0.3,
      emissive: new THREE.Color(style.color).multiplyScalar(0.05)
    });

    const createSegment = (z: number) => {
      const group = new THREE.Group();
      
      if (styleId === 'brutalist') {
        for (let i = 0; i < 8; i++) {
          const w = 4 + Math.random() * 8;
          const h = 10 + Math.random() * 20;
          const block = new THREE.Mesh(new THREE.BoxGeometry(w, h, 5), material);
          block.position.set((Math.random()-0.5)*20, (Math.random()-0.5)*10, (Math.random()-0.5)*5);
          group.add(block);
        }
      } else if (styleId === 'gothic') {
        // Impossible Pillars ( Escher-like)
        for (let i = 0; i < 6; i++) {
          const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 40, 8), material);
          pillar.position.set((Math.random()-0.5)*15, 0, (Math.random()-0.5)*10);
          pillar.rotation.x = Math.PI / 2 * Math.floor(Math.random() * 2);
          group.add(pillar);
          
          const arch = new THREE.Mesh(new THREE.TorusGeometry(5, 0.2, 8, 16, Math.PI), material);
          arch.position.copy(pillar.position);
          arch.rotation.y = Math.random() * Math.PI;
          group.add(arch);
        }
      } else if (styleId === 'floating') {
        for (let i = 0; i < 15; i++) {
          const geo = Math.random() > 0.5 ? new THREE.BoxGeometry(2,2,2) : new THREE.IcosahedronGeometry(2);
          const block = new THREE.Mesh(geo, material);
          block.position.set((Math.random()-0.5)*30, (Math.random()-0.5)*30, (Math.random()-0.5)*10);
          block.rotation.set(Math.random(), Math.random(), Math.random());
          group.add(block);
        }
      } else {
        for (let i = 0; i < 10; i++) {
          const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3((Math.random()-0.5)*20, -10, (Math.random()-0.5)*10),
            new THREE.Vector3((Math.random()-0.5)*20, (Math.random()-0.5)*10, (Math.random()-0.5)*10),
            new THREE.Vector3((Math.random()-0.5)*20, 10, (Math.random()-0.5)*10),
          ]);
          const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.5, 8, false), material);
          group.add(tube);
        }
      }

      group.position.z = z;
      return group;
    };

    for (let i = 0; i < 10; i++) {
      scene.add(createSegment(-i * 20));
    }
  }, [style, seed]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#020202");
    
    // Very subtle fog to allow visibility
    scene.fog = new THREE.FogExp2("#020202", 0.005);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    generateArchitecture(scene, style.id);

    // High intensity lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(amb);

    const sun = new THREE.DirectionalLight(0xffffff, 1.5);
    sun.position.set(10, 20, 10);
    scene.add(sun);

    const point = new THREE.PointLight(style.color, 10, 100);
    point.position.set(0, 0, 0);
    scene.add(point);

    // Spatial Grid
    const grid = new THREE.GridHelper(400, 40, style.color, "#111111");
    grid.position.y = -15;
    scene.add(grid);

    let moveZ = 0;
    let frame = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      frame++;
      
      moveZ -= 0.1;
      camera.position.z = moveZ + 20;
      
      // Infinite Loop
      if (camera.position.z < -100) {
        moveZ += 100;
        camera.position.z += 100;
      }

      // Spectral Camera Wobble
      camera.position.y = Math.sin(frame * 0.01) * 2;
      camera.position.x = Math.cos(frame * 0.005) * 2;
      camera.lookAt(0, 0, moveZ - 20);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, [style, seed, generateArchitecture]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020202] overflow-hidden font-mono selection:bg-cyan-500/30">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Interface Overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none p-12 flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl pointer-events-auto">
               <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Dream Architecture</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                <p className="text-[10px] text-white/40 uppercase tracking-[0.5em]">Procedural Spatial Synthesizer V2.0</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all backdrop-blur-xl">
               <Camera size={20} />
             </button>
             <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all backdrop-blur-xl">
               <Eye size={20} />
             </button>
             <button 
              onClick={() => window.history.back()}
              className="p-4 rounded-full bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all backdrop-blur-xl"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="flex justify-between items-end">
          {/* Style Controls */}
          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-8 w-80 pointer-events-auto">
            <div className="space-y-4">
               <div className="flex justify-between items-center text-[10px] text-white/20 font-bold uppercase tracking-widest">
                  <span>Style Presets</span>
                  <span>Geometry</span>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  {STYLES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s)}
                      className={`h-20 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all border ${style.id === s.id ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white'}`}
                    >
                      {s.id === 'brutalist' && <Layers size={18} />}
                      {s.id === 'gothic' && <Box size={18} />}
                      {s.id === 'floating' && <Box size={18} className="rotate-45" />}
                      {s.id === 'organic' && <Zap size={18} />}
                      <span className="text-[8px] font-bold uppercase tracking-tighter">{s.name}</span>
                    </button>
                  ))}
               </div>
            </div>

            <button 
              onClick={() => setSeed(Math.floor(Math.random() * 9999))}
              className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-3 group"
            >
              <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
              Re-generate Seed
            </button>
          </div>

          {/* Info & Telemetry */}
          <motion.div 
            key={style.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[32rem] p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6"
          >
            <div className="flex items-center gap-3 text-cyan-400">
               <Info size={18} className="animate-pulse" />
               <h2 className="text-xl font-bold uppercase tracking-[0.3em]">Synthesis</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed font-light italic">
              {style.desc}
            </p>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between items-center text-[10px] font-bold text-white/20 tracking-widest uppercase">
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 <span>Neural Grid Active</span>
               </div>
               <span>Structures: {seed % 100 + 40}</span>
               <span className="text-cyan-400">System Seed: {seed}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_350px_rgba(0,0,0,0.95)]" />
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen" />
      <div className="absolute bottom-8 right-12 z-30 text-[8px] text-white/5 tracking-[1.5em] uppercase pointer-events-none">
        Simulated Spatial Paradox // Memory Core 0xAE
      </div>
    </div>
  );
};

export default DreamArchitecture;
