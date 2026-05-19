"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const SUBJECTS = [
  { id: "apple", name: "Apple", color: "#4ade80", decayColor: "#451a03" },
  { id: "sunflower", name: "Sunflower", color: "#fbbf24", decayColor: "#78350f" },
  { id: "leaf", name: "Oak Leaf", color: "#22c55e", decayColor: "#92400e" },
  { id: "peony", name: "Peony", color: "#f472b6", decayColor: "#831843" },
  { id: "mushroom", name: "Mushroom", color: "#fca5a5", decayColor: "#71717a" },
];

const DecayBloom: React.FC = () => {
    const navigate = useNavigate();
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [speed] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 0.1 * speed) % 100);
    }, 90); // ~90 seconds for full loop at speed 1
    return () => clearInterval(interval);
  }, [speed]);

  const phase = useMemo(() => {
    if (progress < 20) return "GROWTH";
    if (progress < 40) return "PEAK";
    if (progress < 80) return "DECAY";
    if (progress < 90) return "REST";
    return "REGROWTH";
  }, [progress]);

  const getVisualState = () => {
    let scale = 1;
    let saturation = 100;
    let brightness = 100;
    let blur = 0;


    if (phase === "GROWTH") {
      const p = progress / 20;
      scale = 0.2 + p * 0.8;
      saturation = p * 100;
      brightness = 50 + p * 50;
    } else if (phase === "PEAK") {
      scale = 1 + Math.sin(progress * 0.5) * 0.02; // breathing
    } else if (phase === "DECAY") {
      const p = (progress - 40) / 40;
      scale = 1 - p * 0.2;
      saturation = 100 - p * 80;
      brightness = 100 - p * 40;
      blur = p * 5;
      // Lerp color manually or use filter
    } else if (phase === "REST") {
      scale = 0.8;
      saturation = 10;
      brightness = 40;
      blur = 8;
    } else if (phase === "REGROWTH") {
      const p = (progress - 90) / 10;
      scale = 0.8 * (1 - p) + 0.2 * p;
      saturation = 10 * (1 - p);
      brightness = 40 * (1 - p) + 50 * p;
    }

    return { scale, saturation, brightness, blur };
  };

  const visuals = getVisualState();

  return (
    <div className="relative w-full h-screen bg-[#fcfcfc] overflow-hidden flex flex-col items-center justify-center font-serif">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 z-0 opacity-30" 
           style={{ background: `radial-gradient(circle at center, ${subject.color}22 0%, transparent 70%)` }} />

      {/* Main Subject Container */}
      <motion.div 
        className="relative z-10 w-96 h-96 flex items-center justify-center"
        animate={{ 
          scale: visuals.scale,
          filter: `saturate(${visuals.saturation}%) brightness(${visuals.brightness}%) blur(${visuals.blur}px)`
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={subject.color} />
              <stop offset="100%" stopColor={subject.decayColor} stopOpacity="0.8" />
            </radialGradient>
          </defs>
          
          {/* Abstract Subject Shape */}
          <motion.path 
            d={subject.id === "apple" ? "M50,15 C20,15 15,40 15,60 C15,85 35,90 50,90 C65,90 85,85 85,60 C85,40 80,15 50,15" :
               subject.id === "sunflower" ? "M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0 M50,10 L50,90 M10,50 L90,50" :
               "M50,10 L90,50 L50,90 L10,50 Z"} 
            fill="url(#grad)"
            animate={{ d: phase === "DECAY" ? 
              (subject.id === "apple" ? "M50,25 C30,25 25,45 25,65 C25,85 40,88 50,88 C60,88 75,85 75,65 C75,45 70,25 50,25" : "M50,10 L90,50 L50,90 L10,50 Z") 
              : undefined 
            }}
          />
          
          {/* Stem/Details */}
          <line x1="50" y1="5" x2="50" y2="20" stroke="#3d2b1f" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none p-16 flex flex-col justify-between items-center text-center">
        
        <div>
          <h1 className="text-4xl text-black/80 font-light tracking-tighter italic">Decay & Bloom</h1>
          <p className="text-[10px] text-black/20 uppercase tracking-[0.6em] mt-3">The Perpetual Lifecycle of {subject.name}</p>
        </div>

        <div className="w-full max-w-xs space-y-8 pointer-events-auto">
          {/* Progress Bar */}
          <div className="relative h-[1px] bg-black/5 overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-black/40 origin-left"
              style={{ scaleX: progress / 100 }}
            />
          </div>
          
          <div className="flex justify-center gap-1">
            {SUBJECTS.map(s => (
              <button
                key={s.id}
                onClick={() => { setSubject(s); setProgress(0); }}
                className={`w-2.5 h-2.5 rounded-full border border-black/10 transition-all ${subject.id === s.id ? 'bg-black/40 scale-125' : 'bg-transparent hover:bg-black/5'}`}
                title={s.name}
              />
            ))}
          </div>

          <div className="text-[10px] text-black/20 uppercase tracking-[0.4em] italic">
            Phase: {phase}
          </div>
        </div>
      </div>

      

      {/* Film Grain */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />
    
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

export default DecayBloom;
