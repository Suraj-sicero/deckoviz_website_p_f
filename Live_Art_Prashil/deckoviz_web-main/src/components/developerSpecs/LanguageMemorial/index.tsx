"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Users, Info, ChevronRight, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const LANGUAGES = [
  {
    name: "Eyak",
    lastSpeaker: "Marie Smith Jones",
    date: "2008",
    phrase: "A song of the cedar and the river.",
    location: "Cordova, Alaska",
    coords: "60.5428° N, 145.7572° W",
    color: "#cbd5e1",
    desc: "A Na-Dené language once spoken at the mouth of the Copper River."
  },
  {
    name: "Ubykh",
    lastSpeaker: "Tevfik Esenç",
    date: "1992",
    phrase: "The wind carries the mountain's breath.",
    location: "Hacıosman, Turkey",
    coords: "40.3800° N, 27.9500° E",
    color: "#94a3b8",
    desc: "Famous for its 84 consonants, one of the most complex phonemic inventories."
  },
  {
    name: "Bo",
    lastSpeaker: "Boa Sr",
    date: "2010",
    phrase: "The sea remains after the fire.",
    location: "Andaman Islands, India",
    coords: "12.6100° N, 92.8300° E",
    color: "#475569",
    desc: "One of the world's oldest continuous cultures, lasting over 65,000 years."
  }
];

const GLYPHS = ["シ", "ム", "キ", "ハ", "ヌ", "ヲ", "ル", "𐎀", "𐎁", "𐎂", "𐎃", "𐎄"];

const createParticle = (width: number, height: number): Particle => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 0.2,
  vy: (Math.random() - 0.5) * 0.2,
  size: 8 + Math.random() * 20,
  alpha: Math.random() * 0.5,
  char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
  rotation: Math.random() * Math.PI * 2,
  rv: (Math.random() - 0.5) * 0.01
});

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  char: string;
  rotation: number;
  rv: number;
}

const LanguageMemorial: React.FC = () => {
    const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);

  // Randomize start on mount
  useEffect(() => {
    setIndex(Math.floor(Math.random() * LANGUAGES.length));
  }, []);

  // Slow Auto-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % LANGUAGES.length);
    }, 15000); // Cycle every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const current = LANGUAGES[index];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from({ length: 120 }, () => createParticle(canvas.width, canvas.height));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const animate = () => {
      frameRef.current++;
      const t = frameRef.current;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Spectral Waveform (Bottom)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 10) {
        const h = Math.sin(t * 0.02 + i * 0.01) * 20 * Math.sin(t * 0.005);
        ctx.moveTo(i, canvas.height - 100);
        ctx.lineTo(i, canvas.height - 100 - h);
      }
      ctx.stroke();

      // Particles
      particlesRef.current.forEach(p => {
        p.x += p.vx + Math.sin(t * 0.005 + p.y * 0.01) * 0.1;
        p.y += p.vy;
        p.rotation += p.rv;

        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `${p.size}px serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * (0.2 + Math.sin(t * 0.01 + p.x) * 0.1)})`;
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden font-serif selection:bg-white/20">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-black" />

      {/* Memorial HUD */}
      <div className="absolute inset-0 z-30 pointer-events-none p-16 flex flex-col justify-between">
        {/* Top: Memorial Designation */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1"
          >
            <div className="flex items-center gap-4">
               <div className="w-10 h-px bg-white/40" />
               <h1 className="text-xl font-light text-white tracking-[0.8em] uppercase">Language Memorial</h1>
            </div>
            <p className="text-[9px] text-white/50 uppercase tracking-[0.5em] pl-14 italic">Spectral Preservation Protocol // Unit 0.4</p>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-end">
                <span className="text-[9px] text-white/40 uppercase font-bold tracking-[0.3em]">Total Preservation</span>
                <span className="text-white font-mono text-lg">0003_ENTRIES</span>
             </div>
             
          </div>
        </div>

        {/* Bottom Section: Narrative Telemetry */}
        <div className="flex justify-between items-end">
          {/* Main Content */}
          <div className="max-w-2xl space-y-12">
            <div className="relative">
              <AnimatePresence>
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="space-y-6 pointer-events-auto"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-white/60">
                      <MapPin size={14} className="text-blue-400" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em]">{current.coords}</span>
                    </div>
                    <h2 className="text-8xl font-light text-white tracking-tighter uppercase">{current.name}</h2>
                  </div>

                  <p className="text-3xl text-white/80 font-light leading-relaxed italic border-l-2 border-white/20 pl-10">
                    "{current.phrase}"
                  </p>

                  <div className="grid grid-cols-2 gap-8 pt-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/40">
                        <Users size={12} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Last Speaker</span>
                      </div>
                      <p className="text-white font-light uppercase tracking-widest text-sm">{current.lastSpeaker}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/40">
                        <Calendar size={12} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Extinction</span>
                      </div>
                      <p className="text-white font-light uppercase tracking-widest text-sm">{current.date} C.E.</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Language Switcher */}
            <div className="flex gap-8 pointer-events-auto pt-8 items-center">
              <div className="flex gap-4">
                {LANGUAGES.map((l, i) => (
                  <button
                    key={l.name}
                    onClick={() => setIndex(i)}
                    className={`flex flex-col gap-2 group transition-all ${index === i ? 'opacity-100' : 'opacity-20 hover:opacity-50'}`}
                  >
                    <div className={`h-1 transition-all duration-700 ${index === i ? 'w-12 bg-white' : 'w-4 bg-white/20 group-hover:w-8'}`} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white">{l.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="h-px w-24 bg-white/10" />

              <button 
                onClick={() => setIndex(prev => (prev + 1) % LANGUAGES.length)}
                className="flex items-center gap-4 group opacity-40 hover:opacity-100 transition-all"
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-white">Explore Next</span>
                <div className="p-2 rounded-full border border-white/20 group-hover:border-white/60 transition-all">
                  <ChevronRight size={14} className="text-white" />
                </div>
              </button>
            </div>
          </div>

          {/* Side Info */}
          <motion.div 
            key={`${current.name}-desc`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-80 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl space-y-6"
          >
            <div className="flex items-center gap-2 text-white/40">
              <Info size={14} className="text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Linguistic Context</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed italic">
              {current.desc}
            </p>
            <div className="h-px bg-white/10" />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                 <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Preservation Level</span>
                 <span className="text-emerald-400 text-[10px] font-mono font-bold tracking-widest">STATIC_ARCHIVE</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full bg-white/60" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2 }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_350px_rgba(0,0,0,1)]" />
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      <div className="absolute bottom-400 left-1/2 -translate-x-1/2 z-20 text-[9px] font-mono text-white/10 tracking-[1.5em] uppercase">
        Echoes of the Unspoken // Memory Core 0x4F
      </div>
    
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

export default LanguageMemorial;
