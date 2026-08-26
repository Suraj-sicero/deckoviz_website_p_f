"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Thermometer, Droplet, Microscope, Zap, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const SUBSTANCES = [
  { id: "sourdough", name: "Sourdough Starter", bg: "#fef3c7", colors: ["#d97706", "#92400e"], ph: 4.2, temp: 24, bubbleRate: 0.08 },
  { id: "wine", name: "Red Wine Must", bg: "#450a0a", colors: ["#991b1b", "#dc2626"], ph: 3.5, temp: 18, bubbleRate: 0.04 },
  { id: "kimchi", name: "Kimchi Ferment", bg: "#7c2d12", colors: ["#ea580c", "#9a3412"], ph: 3.8, temp: 12, bubbleRate: 0.05 },
  { id: "kombucha", name: "Kombucha SCOBY", bg: "#fdf4ff", colors: ["#d946ef", "#a21caf"], ph: 3.2, temp: 22, bubbleRate: 0.02 },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: "yeast" | "bacillus" | "bubble" | "phage";
  color: string;
  age: number;
  targetSize: number;
  rotation: number;
  rv: number;
  focus: number; // 0 to 1 for depth of field
}

const FermentingWorld: React.FC = () => {
    const navigate = useNavigate();
  const [substance, setSubstance] = useState(SUBSTANCES[0]);
  const [isInjecting, setIsInjecting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);

  const createParticle = useCallback((x: number, y: number, type?: Particle["type"]): Particle => {
    const t = type || (Math.random() > 0.4 ? "bacillus" : Math.random() > 0.5 ? "yeast" : "phage");
    const size = t === "yeast" ? 4 + Math.random() * 6 : t === "bacillus" ? 2 + Math.random() * 3 : 2;
    return {
      x, y,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: 0,
      targetSize: size,
      type: t,
      color: substance.colors[Math.floor(Math.random() * substance.colors.length)],
      age: 0,
      rotation: Math.random() * Math.PI * 2,
      rv: (Math.random() - 0.5) * 0.05,
      focus: Math.random()
    };
  }, [substance]);

  const initParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      newParticles.push(createParticle(Math.random() * 800, Math.random() * 800));
    }
    particlesRef.current = newParticles;
  }, [createParticle]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    frameRef.current++;
    const t = frameRef.current;

    // Background with slight trail
    ctx.fillStyle = substance.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vignette / Shadow
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.height * 0.6);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0,0.15)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((p, i) => {
      // Growth
      if (p.size < p.targetSize) p.size += 0.1;
      
      // Brownian Motion + Flow
      p.vx += (Math.random() - 0.5) * 0.02 + Math.sin(t * 0.01 + p.y * 0.01) * 0.005;
      p.vy += (Math.random() - 0.5) * 0.02 + Math.cos(t * 0.01 + p.x * 0.01) * 0.005;
      p.vx *= 0.99; p.vy *= 0.99;
      p.x += p.vx; p.y += p.vy;
      p.rotation += p.rv;
      p.age += 0.01;

      // Wrap
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Depth of Field Effect
      const blur = Math.abs(p.focus - 0.5) * 4;
      ctx.filter = `blur(${blur}px)`;
      ctx.globalAlpha = 0.3 + p.focus * 0.7;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      if (p.type === "bubble") {
        p.vy -= 0.02;
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.stroke();
        if (p.y < -20) particlesRef.current.splice(i, 1);
      } else if (p.type === "yeast") {
        // Yeast with budding
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        // Bud
        if (p.age > 5) {
          ctx.beginPath();
          ctx.arc(p.size * 0.6, 0, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
        // Nucleus
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === "bacillus") {
        // Bacillus (Rod)
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.roundRect(-p.size, -p.size/2, p.size * 2.5, p.size, p.size/2);
        ctx.fill();
        // Flagella
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(-p.size, 0);
        ctx.quadraticCurveTo(-p.size * 2, Math.sin(t * 0.1 + i) * 5, -p.size * 3, Math.sin(t * 0.1 + i) * 2);
        ctx.stroke();
      } else if (p.type === "phage") {
        // Phage (Virus)
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.beginPath();
        for(let j=0; j<6; j++) {
          const ang = (j/6) * Math.PI * 2;
          ctx.lineTo(Math.cos(ang) * p.size, Math.sin(ang) * p.size);
        }
        ctx.fill();
      }

      ctx.restore();
      ctx.filter = "none";
      ctx.globalAlpha = 1.0;
    });

    // Division
    if (t % 120 === 0 && particlesRef.current.length < 150) {
      const parent = particlesRef.current[Math.floor(Math.random() * particlesRef.current.length)];
      if (parent.type !== "bubble" && parent.age > 10) {
        parent.age = 0;
        particlesRef.current.push(createParticle(parent.x, parent.y, parent.type));
      }
    }

    // Bubbles
    if (Math.random() < substance.bubbleRate) {
      particlesRef.current.push({
        ...createParticle(Math.random() * canvas.width, canvas.height + 10, "bubble"),
        vy: -0.8
      });
    }

    requestAnimationFrame(draw);
  }, [substance, createParticle]);

  useEffect(() => {
    initParticles();
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    const animId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [draw, initParticles]);

  const handleInoculate = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for(let i=0; i<5; i++) {
      particlesRef.current.push(createParticle(x + (Math.random()-0.5)*20, y + (Math.random()-0.5)*20));
    }
    setIsInjecting(true);
    setTimeout(() => setIsInjecting(false), 500);
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#0c0a09] overflow-hidden select-none cursor-crosshair font-mono"
      onMouseDown={handleInoculate}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Lab Console UI */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col p-12 pb-40 justify-between">
        {/* Header */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <Microscope className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-widest uppercase">Fermenting World</h1>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <p className="text-[10px] text-white/40 uppercase tracking-[0.4em]">Live Microbiological Stream // {substance.name}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-1 items-end">
                <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Colony Count</span>
                <span className="text-white font-mono text-lg">{particlesRef.current.filter(p => p.type !== 'bubble').length} CFU</span>
             </div>
             
          </div>
        </div>

        {/* Center: Action Indicator */}
        <div className="flex justify-center items-center h-20">
          <AnimatePresence>
            {isInjecting && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="px-6 py-2 rounded-full bg-blue-500/20 border border-blue-500/40 backdrop-blur-xl text-blue-400 text-[10px] font-bold tracking-[0.4em] uppercase"
              >
                Inoculating Culture...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Controls */}
        <div className="flex justify-between items-end pointer-events-auto">
          {/* Bio-Metrics */}
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl grid grid-cols-2 gap-8 w-96">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/40">
                <Activity size={14} className="text-blue-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Stability</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-400"
                  animate={{ width: "94%" }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: 'mirror' }}
                />
              </div>
              <p className="text-xs text-white font-mono">94.82%</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/40">
                <Thermometer size={14} className="text-orange-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Temperature</span>
              </div>
              <p className="text-2xl text-white font-mono">{substance.temp}°C</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/40">
                <Droplet size={14} className="text-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest">pH Balance</span>
              </div>
              <p className="text-2xl text-white font-mono">{substance.ph}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/40">
                <Zap size={14} className="text-yellow-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Metabolism</span>
              </div>
              <div className="flex gap-1 items-end h-6">
                {[4, 8, 12, 6, 14, 10].map((h, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ height: [h, h*0.5, h*1.2, h] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i*0.1 }}
                    className="w-1 bg-yellow-400/40 rounded-full" 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Substance Switcher */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              {SUBSTANCES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSubstance(s)}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${substance.id === s.id ? 'bg-white text-black shadow-2xl' : 'bg-white/5 border border-white/10 text-white/40 hover:bg-white/10'}`}
                >
                  {s.name}
                </button>
              ))}
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-center">
              <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold italic">
                Click Viewport to Inoculate Colony
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Microscope Lens Artifacts */}
      <div className="absolute inset-0 z-20 pointer-events-none rounded-full shadow-[0_0_0_9999px_#0c0a09,inset_0_0_300px_rgba(0,0,0,0.95)] mx-auto my-auto w-[85vw] h-[85vw] border-[60px] border-white/5 mix-blend-screen opacity-50" />
      <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-tr from-blue-500/5 to-red-500/5 mix-blend-overlay" />
      <div className="absolute inset-0 z-5 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    
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

export default FermentingWorld;
;
