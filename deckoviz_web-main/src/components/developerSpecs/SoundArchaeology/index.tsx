"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Mic, Radio, Activity, History, Globe, X, Music } from "lucide-react";

const CULTURES = [
  { 
    id: "cave", 
    name: "Paleolithic Cave", 
    period: "c. 20,000 BCE", 
    color: "#8a5a44", 
    rt60: "4.2s", 
    desc: "Low-frequency resonance and chaotic reflections from uneven rock surfaces. Deep abyssal reverb." 
  },
  { 
    id: "egypt", 
    name: "Ancient Temple", 
    period: "c. 2,500 BCE", 
    color: "#d4af37", 
    rt60: "2.8s", 
    desc: "Sharp, high-frequency reflections from polished limestone. Ceremonial acoustic clarity." 
  },
  { 
    id: "indus", 
    name: "Indus Plaza", 
    period: "c. 3,000 BCE", 
    color: "#c2410c", 
    rt60: "1.2s", 
    desc: "Diffused acoustic signatures from brickwork and dense urban structures. Warm, mid-range presence." 
  },
  { 
    id: "mayan", 
    name: "Mayan Pyramid", 
    period: "c. 600 CE", 
    color: "#166534", 
    rt60: "3.5s", 
    desc: "Complex flutter echoes and jungle-diffused sonic textures. Mathematical acoustic alignment." 
  },
];

const SoundArchaeology: React.FC = () => {
  const [culture, setCulture] = useState(CULTURES[0]);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const sceneRef = useRef<THREE.Scene | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const terrainRef = useRef<THREE.Mesh | null>(null);

  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      analyserRef.current = analyser;
      setIsAnalysing(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
      // Fallback: Use mock data logic in the animate loop if analyser is null
      setIsAnalysing(true);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#050505");
    scene.fog = new THREE.FogExp2("#050505", 0.05);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create Spectral Terrain
    const geometry = new THREE.PlaneGeometry(20, 20, 40, 40);
    geometry.rotateX(-Math.PI / 2);
    
    const material = new THREE.MeshStandardMaterial({
      color: culture.color,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      emissive: culture.color,
      emissiveIntensity: 0.5
    });

    const mesh = new THREE.Mesh(geometry, material);
    terrainRef.current = mesh;
    scene.add(mesh);

    const amb = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(amb);

    const point = new THREE.PointLight(culture.color, 10, 50);
    point.position.set(0, 10, 0);
    scene.add(point);

    let frame = 0;
    const animate = () => {
      frame++;
      requestAnimationFrame(animate);

      const dataArray = new Uint8Array(analyserRef.current?.frequencyBinCount || 64);
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
      } else {
        // Mock data
        for (let i = 0; i < 64; i++) dataArray[i] = Math.sin(frame * 0.05 + i) * 50 + 50;
      }

      // Update Terrain Vertices
      const positions = geometry.attributes.position.array as Float32Array;
      for (let i = positions.length - 1; i >= 123; i -= 3) {
        positions[i] = positions[i - 123]; // Shift rows back
      }

      for (let i = 0; i < 41; i++) {
        const val = dataArray[i % 64] / 20;
        positions[i * 3 + 1] = val; // Set front row height
      }
      geometry.attributes.position.needsUpdate = true;

      if (terrainRef.current) {
        terrainRef.current.rotation.y += 0.001;
      }

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
      renderer.dispose();
    };
  }, [culture]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden font-mono selection:bg-orange-500/30">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Interface HUD */}
      <div className="absolute inset-0 z-30 pointer-events-none p-12 pb-40 flex flex-col justify-between">
        
        {/* Top: Header & Culture Selector */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl pointer-events-auto">
               <Radio className="w-8 h-8 text-orange-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Sound Archaeology</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <p className="text-[10px] text-white/40 uppercase tracking-[0.5em]">Sonic Spectrum Decoder V4.2</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             <div className="flex gap-2">
                {CULTURES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCulture(c)}
                    className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${culture.id === c.id ? 'bg-orange-500 border-orange-400 text-black shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}
                  >
                    {c.name}
                  </button>
                ))}
             </div>
             <button 
              onClick={() => window.history.back()}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all backdrop-blur-xl group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Center: Play Button */}
        {!isAnalysing && (
          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-auto">
             <button 
              onClick={startAudio}
              className="group relative px-12 py-6 bg-orange-500 rounded-full flex items-center gap-4 hover:scale-105 transition-transform"
             >
                <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-20" />
                <Mic className="text-black" size={24} />
                <span className="text-black font-black uppercase tracking-widest text-sm">Exhume Sonic Artifacts</span>
             </button>
          </div>
        )}

        {/* Bottom Section */}
        <div className="flex justify-between items-end">
          {/* Telemetry Card */}
          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 w-[28rem] pointer-events-auto">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3 text-orange-400">
                  <Activity size={18} className="animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Spectral Feedback</span>
               </div>
               <span className="text-xs font-mono text-white/60">ACTIVE_SIGNAL</span>
            </div>
            
            <div className="h-20 w-full relative overflow-hidden bg-black/40 rounded-xl border border-white/5 flex items-end gap-1 p-2">
               {Array.from({ length: 20 }).map((_, i) => (
                 <motion.div 
                  key={i}
                  animate={{ height: isAnalysing ? `${Math.random() * 100}%` : '10%' }}
                  className="flex-1 bg-orange-500/40 rounded-t-sm"
                 />
               ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Reverb RT60</span>
                  <p className="text-white font-bold">{culture.rt60}</p>
               </div>
               <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Sample Depth</span>
                  <p className="text-white font-bold">24-bit / 96kHz</p>
               </div>
            </div>
          </div>

          {/* Narrative Info */}
          <motion.div 
            key={culture.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[32rem] p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                 <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">{culture.name}</h2>
                 <p className="text-[10px] text-orange-400 uppercase tracking-widest">{culture.period}</p>
              </div>
              <History className="text-white/10" size={40} />
            </div>
            
            <p className="text-white/60 text-xs leading-relaxed italic font-light">
              {culture.desc}
            </p>

            <div className="h-px bg-white/10" />

            <div className="flex justify-between items-center text-[8px] font-bold text-white/20 tracking-widest uppercase">
               <div className="flex items-center gap-2">
                 <Globe size={12} />
                 <span>Global Archive Active</span>
               </div>
               <div className="flex items-center gap-2">
                 <Music size={12} />
                 <span>Acoustic Profile Verified</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_350px_rgba(0,0,0,0.95)]" />
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen" />
      <div className="absolute bottom-400 right-12 z-30 text-[8px] text-white/5 tracking-[2em] uppercase pointer-events-none">
        Sonic Excavation // Unit 0x01
      </div>
    </div>
  );
};

export default SoundArchaeology;
