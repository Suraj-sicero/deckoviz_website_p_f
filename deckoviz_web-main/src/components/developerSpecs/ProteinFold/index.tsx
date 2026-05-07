"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Activity, Atom, X, Maximize2, RefreshCw } from "lucide-react";

const PROTEINS = [
  { 
    id: "insulin", 
    name: "Insulin", 
    type: "Hormonal Core", 
    color: "#60a5fa", 
    sequence: "MET-ALA-GLY-VAL-LEU-ISO-THR-CYS-ASP",
    desc: "A peptide hormone produced by beta cells of the pancreatic islets. Regulates metabolism by promoting glucose absorption."
  },
  { 
    id: "collagen", 
    name: "Collagen", 
    type: "Triple Helix", 
    color: "#f87171", 
    sequence: "GLY-PRO-HYP-GLY-ALA-VAL-GLY-LEU-PRO",
    desc: "The main structural protein in the extracellular matrix. Known for high tensile strength and fiber formation."
  },
  { 
    id: "keratin", 
    name: "Keratin", 
    type: "Intermediate Filament", 
    color: "#fbbf24", 
    sequence: "CYS-GLU-SER-LEU-PHE-ASP-VAL-GLY-ALA",
    desc: "Key structural material making up hair, nails, and the outer layer of skin. Rich in sulfur-containing cysteine."
  },
  { 
    id: "antibody", 
    name: "Antibody", 
    type: "Immunoglobulin G", 
    color: "#a855f7", 
    sequence: "THR-VAL-ALA-PRO-SER-VAL-PHE-ISO-PHE",
    desc: "Y-shaped protein used by the immune system to identify and neutralize foreign objects such as bacteria and viruses."
  },
  { 
    id: "haemoglobin", 
    name: "Haemoglobin", 
    type: "Globular Quaternary", 
    color: "#10b981", 
    sequence: "VAL-HIS-LEU-THR-PRO-GLU-GLU-LYS-SER",
    desc: "Iron-containing oxygen-transport metalloprotein in the red blood cells. Facilitates gaseous exchange."
  },
];

const ProteinFold: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [protein, setProtein] = useState(PROTEINS[0]);
  const [progress, setProgress] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [sequenceIndex, setSequenceIndex] = useState(0);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  const generateTargetPoints = (id: string) => {
    const pts = [];
    const count = 60;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      if (id === "insulin") {
        pts.push(new THREE.Vector3(Math.sin(t * 12) * 2.5, t * 6 - 3, Math.cos(t * 12) * 1.5));
      } else if (id === "collagen") {
        const angle = t * Math.PI * 8;
        pts.push(new THREE.Vector3(Math.cos(angle) * 0.8, t * 10 - 5, Math.sin(angle) * 0.8));
      } else if (id === "keratin") {
        pts.push(new THREE.Vector3(Math.cos(t * 40) * 0.3, t * 12 - 6, Math.sin(t * 40) * 0.3));
      } else if (id === "antibody") {
        if (t < 0.4) pts.push(new THREE.Vector3(0, t * 10 - 5, 0));
        else if (t < 0.7) pts.push(new THREE.Vector3((t - 0.4) * 8, -1 + (t - 0.4) * 12, 0));
        else pts.push(new THREE.Vector3(-(t - 0.7) * 8, 2.6 + (t - 0.7) * 12, 0));
      } else { // Haemoglobin
        const r = 4;
        const theta = t * Math.PI * 2 * 6;
        const phi = Math.acos(2 * t - 1);
        pts.push(new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)));
      }
    }
    return pts;
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#020205");

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const amb = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(amb);

    const point = new THREE.PointLight(protein.color, 2, 50);
    point.position.set(5, 5, 5);
    scene.add(point);

    const blueLight = new THREE.PointLight("#60a5fa", 1, 50);
    blueLight.position.set(-10, -5, 5);
    scene.add(blueLight);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.005;
        meshRef.current.rotation.x += 0.002;
        // Thermal Jitter
        meshRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.1;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, [protein.color]);

  useEffect(() => {
    if (!sceneRef.current) return;
    
    const targetPoints = generateTargetPoints(protein.id);
    const startPoints = targetPoints.map((_, i) => new THREE.Vector3(0, (i / 59) * 12 - 6, 0));
    
    const material = new THREE.MeshStandardMaterial({ 
      color: protein.color, 
      emissive: protein.color, 
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false
    });

    let currentMesh: THREE.Mesh | null = null;

    const updateFold = (p: number) => {
      const pts = startPoints.map((v, i) => v.clone().lerp(targetPoints[i], p));
      const curve = new THREE.CatmullRomCurve3(pts);
      const geometry = new THREE.TubeGeometry(curve, 100, 0.15, 12, false);
      
      if (currentMesh) {
        sceneRef.current?.remove(currentMesh);
        currentMesh.geometry.dispose();
      }
      
      currentMesh = new THREE.Mesh(geometry, material);
      meshRef.current = currentMesh;
      sceneRef.current?.add(currentMesh);

      setProgress(p);
      setEnergy(100 - p * 85 + Math.random() * 2);
      setSequenceIndex(Math.floor(p * 20));
    };

    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const p = Math.min((timestamp - start) / 4000, 1);
      updateFold(p);
      if (p < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);

    return () => {
      if (currentMesh) sceneRef.current?.remove(currentMesh);
    };
  }, [protein]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020205] overflow-hidden font-mono selection:bg-blue-500/30">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Synthesis HUD */}
      <div className="absolute inset-0 z-30 pointer-events-none p-12 pb-40 flex flex-col justify-between">
        {/* Top: Branding & Sequence */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl group pointer-events-auto cursor-pointer">
               <Atom className="w-8 h-8 text-blue-400 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Protein Fold Theatre</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <p className="text-[10px] text-blue-400/60 uppercase tracking-[0.5em]">Structural Synthesis V2.8 // Active</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             <div className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl flex flex-col items-end">
                <span className="text-[9px] text-white/30 uppercase font-bold tracking-[0.3em]">Atomic Stability</span>
                <span className="text-emerald-400 text-sm font-bold font-mono">NOMINAL_99.8%</span>
             </div>
             <button 
               onClick={toggleFullscreen}
               className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl group"
             >
               <Maximize2 size={20} />
             </button>
             <button 
               onClick={() => window.location.reload()}
               className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl group"
             >
               <RefreshCw size={20} />
             </button>
             <button 
               onClick={() => window.history.back()}
               className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all backdrop-blur-xl group"
             >
               <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
             </button>
          </div>
        </div>

        {/* Center: Sequence Scroller */}
        <div className="absolute top-1/4 right-12 w-48 space-y-4">
           <div className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Sequence Decryptor</div>
           <div className="space-y-1 h-32 overflow-hidden relative">
              {protein.sequence.split('-').map((s, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    opacity: i <= sequenceIndex ? 1 : 0.1,
                    x: i <= sequenceIndex ? 0 : 10
                  }}
                  className={`text-xs font-bold ${i <= sequenceIndex ? 'text-blue-400' : 'text-white/20'}`}
                >
                  {i === sequenceIndex && "> "} {s}
                </motion.div>
              ))}
              <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-[#020205] to-transparent" />
           </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end">
          {/* Controls & Energy Plot */}
          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 w-[28rem] pointer-events-auto">
            <div className="flex items-center justify-between text-blue-400">
               <div className="flex items-center gap-3">
                  <Activity size={18} className="animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Thermodynamic State</span>
               </div>
               <span className="text-xs font-mono">{Math.round(energy)} kJ/mol</span>
            </div>
            
            <div className="h-24 w-full relative overflow-hidden bg-black/40 rounded-xl border border-white/5">
               <svg className="w-full h-full">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress }}
                    d="M 0 20 L 50 40 L 100 30 L 150 60 L 200 40 L 250 80 L 300 20"
                    fill="none"
                    stroke={protein.color}
                    strokeWidth="1.5"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-scan" />
               </svg>
            </div>

            <div className="flex gap-2">
              {PROTEINS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setProtein(p)}
                  className={`flex-1 py-3 rounded-xl text-[8px] font-bold uppercase tracking-widest transition-all ${protein.id === p.id ? 'bg-blue-500 text-black shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-white/5 border border-white/10 text-white/40 hover:bg-white/10'}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Synthesis Stats */}
          <motion.div 
            key={protein.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[32rem] p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                 <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">{protein.name}</h2>
                 <p className="text-[10px] text-blue-400 uppercase tracking-widest">{protein.type}</p>
              </div>
              <div className="text-right">
                 <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Folding Completion</span>
                 <p className="text-4xl text-white font-black">{Math.round(progress * 100)}%</p>
              </div>
            </div>
            
            <p className="text-white/60 text-xs leading-relaxed italic font-light">
              {protein.desc}
            </p>

            <div className="h-px bg-white/10" />

            <div className="grid grid-cols-3 gap-6">
               <div className="space-y-1">
                  <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">H-Bonds</span>
                  <p className="text-white font-bold text-xs">{(progress * 242).toFixed(0)} ACTIVE</p>
               </div>
               <div className="space-y-1">
                  <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Entropics</span>
                  <p className="text-white font-bold text-xs">{(100 - progress * 40).toFixed(1)}%</p>
               </div>
               <div className="space-y-1">
                  <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Synthesis</span>
                  <p className="text-emerald-400 font-bold text-xs italic">SECURE</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_350px_rgba(0,0,0,0.95)]" />
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen" />
      <div className="absolute bottom-400 right-12 z-30 text-[8px] text-white/5 tracking-[1.5em] uppercase pointer-events-none">
        Structural Archive // Core Link 0x2A
      </div>
    </div>
  );
};

export default ProteinFold;
