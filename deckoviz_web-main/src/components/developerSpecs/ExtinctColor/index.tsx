"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Globe, Beaker, Info, ChevronRight, ChevronLeft, Pause, Play, X, Layers, Droplets } from "lucide-react";

const PIGMENTS = [
  {
    name: "Tyrian Purple",
    color: "#4a042d",
    extraction: "Murex Trunculus (Sea Snails)",
    civilisation: "Phoenician Empire",
    period: "c. 1500 BCE",
    status: "EXTINCT_PROCESS",
    narrative: "Extracted with immense labor from thousands of sea snails. It was so rare that it was reserved exclusively for imperial royalty. The process involved fermenting the glands of the snails for weeks."
  },
  {
    name: "Han Purple",
    color: "#4b307d",
    extraction: "Barium Copper Silicate",
    civilisation: "Han Dynasty",
    period: "c. 1000 BCE",
    status: "SYNTHETIC_ORIGIN",
    narrative: "One of the first synthetic pigments, created by combining barium and copper. It was primarily used on the terracotta army to represent high-ranking status."
  },
  {
    name: "Maya Blue",
    color: "#4e96c4",
    extraction: "Indigo + Palygorskite Clay",
    civilisation: "Mayan Culture",
    period: "c. 800 CE",
    status: "STRUCTURAL_HYBRID",
    narrative: "A remarkably resilient hybrid of indigo and palygorskite clay, surviving centuries of tropical humidity and rainfall through complex molecular bonding."
  },
  {
    name: "Dragon’s Blood",
    color: "#7a0117",
    extraction: "Dracaena Cinnabari (Resin)",
    civilisation: "Medieval Europe",
    period: "c. 1st Century CE",
    status: "ORGANIC_RESIN",
    narrative: "A bright red resin obtained from the Dracaena tree. In medieval times, it was believed to be the actual blood of dragons, often used in alchemical scripts."
  },
  {
    name: "Verdigris",
    color: "#3d9c97",
    extraction: "Copper + Acetic Acid",
    civilisation: "Greco-Roman",
    period: "c. 5th Century BCE",
    status: "CHEMICAL_CORROSION",
    narrative: "The natural green patina formed on copper. Artists collected the pigment by suspending copper plates over fermenting wine for long durations."
  }
];

const PigmentReconstruction: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const current = PIGMENTS[index];

  // Procedural Pigment Swirl Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      frame++;
      ctx.fillStyle = current.color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create "Paint Wash" layers
      for (let i = 0; i < 3; i++) {
        const t = frame * 0.005 + i * 2;
        ctx.save();
        ctx.globalAlpha = 0.15;
        ctx.globalCompositeOperation = "overlay";
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(t * 0.1);
        
        ctx.beginPath();
        for (let j = 0; j < 360; j += 45) {
          const r = 400 + Math.sin(t + j) * 100;
          const x = Math.cos(j * Math.PI / 180) * r;
          const y = Math.sin(j * Math.PI / 180) * r;
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [current.color]);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % PIGMENTS.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <div className="relative w-full h-screen overflow-hidden font-serif selection:bg-white/20">
      {/* Dynamic Pigment Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Overlays for Texture */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_400px_rgba(0,0,0,0.9)]" />

      {/* Main HUD */}
      <div className="absolute inset-0 z-30 pointer-events-none p-16 flex flex-col justify-between">
        
        {/* Top Section */}
        <div className="flex justify-between items-start pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1"
          >
            <div className="flex items-center gap-4">
               <div className="w-12 h-px bg-white/40" />
               <h1 className="text-xl font-light text-white tracking-[0.6em] uppercase">Pigment Reconstruction</h1>
            </div>
            <p className="text-[9px] text-white/40 uppercase tracking-[0.4em] pl-16 italic">Historical Archive // Unit 0.9</p>
          </motion.div>

          <div className="flex gap-4">
             <div className="px-6 py-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl flex flex-col items-end">
                <span className="text-[9px] text-white/30 uppercase font-bold tracking-[0.3em]">Era Placement</span>
                <span className="text-white font-mono text-xs uppercase">{current.period}</span>
             </div>
             <button 
              onClick={() => window.history.back()}
              className="p-5 rounded-full bg-black/40 border border-white/10 text-white/40 hover:text-white hover:bg-black/60 transition-all backdrop-blur-xl group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex justify-between items-end">
          {/* Main Text */}
          <div className="max-w-3xl space-y-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="space-y-6 pointer-events-auto"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-white/50">
                    <Globe size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.5em]">{current.civilisation}</span>
                  </div>
                  <h2 className="text-9xl font-light text-white tracking-tighter uppercase leading-none">{current.name}</h2>
                </div>

                <p className="text-3xl text-white/80 font-light leading-relaxed italic border-l-2 border-white/20 pl-12">
                  "{current.narrative}"
                </p>

                <div className="grid grid-cols-2 gap-12 pt-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-white/30">
                      <Beaker size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Chemical Origin</span>
                    </div>
                    <p className="text-white font-light uppercase tracking-[0.2em] text-sm">{current.extraction}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-white/30">
                      <Droplets size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Archive Status</span>
                    </div>
                    <p className="text-emerald-400 font-mono font-bold tracking-widest text-xs">{current.status}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center gap-10 pointer-events-auto pt-12">
               <div className="flex gap-4">
                  <button 
                    onClick={() => setIndex(prev => (prev - 1 + PIGMENTS.length) % PIGMENTS.length)}
                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => setIndex(prev => (prev + 1) % PIGMENTS.length)}
                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
               </div>
               
               <div className="h-px w-32 bg-white/10" />

               <button 
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="flex items-center gap-4 group opacity-40 hover:opacity-100 transition-all"
               >
                 <div className="p-3 rounded-full border border-white/20">
                   {isAutoPlay ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white" />}
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white">
                   {isAutoPlay ? "Pause Archive" : "Resume Archive"}
                 </span>
               </button>
            </div>
          </div>

          {/* Quick Swatch Panel */}
          <div className="flex flex-col gap-6 pointer-events-auto">
             {PIGMENTS.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setIndex(i)}
                  className={`group relative flex items-center gap-6 transition-all ${index === i ? 'opacity-100' : 'opacity-20 hover:opacity-50'}`}
                >
                  <div className={`text-right transition-all duration-700 ${index === i ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                    <div className="text-[8px] text-white/40 uppercase font-bold tracking-widest">{p.period}</div>
                    <div className="text-xs text-white uppercase font-light tracking-[0.2em]">{p.name}</div>
                  </div>
                  <div 
                    className={`w-12 h-12 rounded-2xl border transition-all duration-700 rotate-45 ${index === i ? 'border-white scale-110 shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'border-white/10'}`}
                    style={{ backgroundColor: p.color }}
                  />
                </button>
             ))}
          </div>
        </div>
      </div>

      {/* Progress Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-40">
        <motion.div 
          key={index}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 15, ease: "linear" }}
          className="h-full bg-white/30 origin-left"
        />
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 text-[9px] font-mono text-white/10 tracking-[2em] uppercase">
        Memory Fragment // Reconstruction 0xCF
      </div>
    </div>
  );
};

export default PigmentReconstruction;
