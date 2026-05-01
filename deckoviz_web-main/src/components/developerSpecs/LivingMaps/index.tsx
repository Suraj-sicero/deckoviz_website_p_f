"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Activity, Compass, Wind, Droplets, Mountain } from "lucide-react";

// --- Advanced Noise Implementation ---
class Noise {
  p: number[];
  constructor() {
    this.p = new Array(512);
    const permutation = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
      190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
      77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
      135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
      223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
      251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
      138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
    for (let i=0; i < 256 ; i++) this.p[256+i] = this.p[i] = permutation[i];
  }
  fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
  lerp(t: number, a: number, b: number) { return a + t * (b - a); }
  grad(hash: number, x: number, y: number, z: number) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }
  perlin(x: number, y: number, z: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = this.fade(x);
    const v = this.fade(y);
    const w = this.fade(z);
    const A = this.p[X]+Y, AA = this.p[A]+Z, AB = this.p[A+1]+Z;
    const B = this.p[X+1]+Y, BA = this.p[B]+Z, BB = this.p[B+1]+Z;

    return this.lerp(w, this.lerp(v, this.lerp(u, this.grad(this.p[AA  ], x  , y  , z   ),
                                                 this.grad(this.p[BA  ], x-1, y  , z   )),
                                     this.lerp(u, this.grad(this.p[AB  ], x  , y-1, z   ),
                                                 this.grad(this.p[BB  ], x-1, y-1, z   ))),
                         this.lerp(v, this.lerp(u, this.grad(this.p[AA+1], x  , y  , z-1 ),
                                                 this.grad(this.p[BA+1], x-1, y  , z-1 )),
                                     this.lerp(u, this.grad(this.p[AB+1], x  , y-1, z-1 ),
                                                 this.grad(this.p[BB+1], x-1, y-1, z-1 ))));
  }
}

const noise = new Noise();

const BIOMES = [
  { level: 0.0, color: "#1a365d", name: "Abyss" },
  { level: 0.2, color: "#2b6cb0", name: "Depths" },
  { level: 0.4, color: "#4299e1", name: "Shallows" },
  { level: 0.5, color: "#ecc94b", name: "Shore" },
  { level: 0.55, color: "#68d391", name: "Meadow" },
  { level: 0.7, color: "#38a169", name: "Forest" },
  { level: 0.85, color: "#718096", name: "Tundra" },
  { level: 0.95, color: "#ffffff", name: "Peak" },
];

const LivingMaps: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Simulation State
  const [seed, setSeed] = useState(Math.random() * 1000);
  const [waterLevel, setWaterLevel] = useState(0.45);
  const [complexity, setComplexity] = useState(1.0);
  const [tectonicShift, setTectonicShift] = useState({ x: 0, y: 0 });
  const [isEvolving, setIsEvolving] = useState(true);
  const [currentEvent, setCurrentEvent] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [impacts, setImpacts] = useState<{x: number, y: number, r: number, alpha: number}[]>([]);

  const stateRef = useRef({ seed, waterLevel, complexity, tectonicShift, isEvolving, mousePos, impacts });

  useEffect(() => {
    stateRef.current = { seed, waterLevel, complexity, tectonicShift, isEvolving, mousePos, impacts };
  }, [seed, waterLevel, complexity, tectonicShift, isEvolving, mousePos, impacts]);

  const getHeight = useCallback((x: number, y: number) => {
    const { seed, complexity: comp, tectonicShift: ts, impacts } = stateRef.current;
    const scale = 0.003;
    let h = 0;
    let amp = 1;
    let freq = 1;
    
    // Multi-octave Perlin noise
    for (let i = 0; i < 6; i++) {
      h += noise.perlin((x + ts.x) * scale * freq + seed, (y + ts.y) * scale * freq + seed, 0) * amp;
      amp *= 0.45 * comp;
      freq *= 2.2;
    }

    // Add local impacts
    impacts.forEach(impact => {
      const dx = x - impact.x;
      const dy = y - impact.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < impact.r) {
        h += Math.sin(dist * 0.1) * impact.alpha * (1 - dist/impact.r);
      }
    });

    return Math.max(0, Math.min(1, (h + 0.8) / 1.6));
  }, []);

  const getBiomeColor = (h: number) => {
    for (let i = BIOMES.length - 1; i >= 0; i--) {
      if (h >= BIOMES[i].level) return BIOMES[i].color;
    }
    return BIOMES[0].color;
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const { waterLevel: wl, isEvolving } = stateRef.current;
    
    // Optimization: Draw grid based
    const step = 8;
    const width = canvas.width;
    const height = canvas.height;

    // Background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, height);

    for (let x = 0; x < width; x += step) {
      for (let y = 0; y < height; y += step) {
        const h = getHeight(x, y);
        const hRight = getHeight(x + step, y);
        const hDown = getHeight(x, y + step);
        
        // Calculate Hillshading (Slope based)
        const dx = (hRight - h) * 10;
        const dy = (hDown - h) * 10;
        const slope = Math.sqrt(dx*dx + dy*dy);
        const shade = Math.max(0, Math.min(1, 0.5 + (dx - dy) * 2));

        // Biome Color
        let color = getBiomeColor(h);
        
        // Water Handling
        if (h < wl) {
          ctx.fillStyle = `rgba(30, 58, 138, ${0.5 + h * 0.5})`;
        } else {
          // Add shading to the biome color
          ctx.fillStyle = color;
          ctx.globalAlpha = shade;
        }

        ctx.fillRect(x, y, step, step);
        ctx.globalAlpha = 1.0;

        // Contour Lines
        const contourLevels = [0.2, 0.4, 0.6, 0.8];
        contourLevels.forEach(lvl => {
          if ((h < lvl && hRight >= lvl) || (h >= lvl && hRight < lvl)) {
            ctx.fillStyle = "rgba(255,255,255,0.1)";
            ctx.fillRect(x + step - 1, y, 1, step);
          }
        });
      }
    }

    // Process Impacts
    if (isEvolving) {
      setImpacts(prev => prev.map(i => ({...i, r: i.r + 2, alpha: i.alpha * 0.98})).filter(i => i.alpha > 0.01));
      setTectonicShift(prev => ({ x: prev.x + 0.2, y: prev.y + 0.1 }));
    }

    requestAnimationFrame(draw);
  }, [getHeight]);

  useEffect(() => {
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
  }, [draw]);

  const handleImpact = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setImpacts(prev => [...prev, { x, y, r: 0, alpha: 0.3 }]);
    setCurrentEvent("METEOR IMPACT");
    setTimeout(() => setCurrentEvent(null), 3000);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-[#0f172a] overflow-hidden select-none cursor-crosshair"
      onMouseDown={handleImpact}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Modern UI Layout */}
      <div className="absolute inset-0 pointer-events-none flex flex-col p-12 justify-between">
        {/* Top Header */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3 text-white"
            >
              <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 backdrop-blur-md">
                <Compass className="w-6 h-6 text-blue-400 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Living Topography</h1>
                <p className="text-xs text-blue-400 font-medium uppercase tracking-[0.3em]">Real-time Geological Simulation</p>
              </div>
            </motion.div>
          </div>

          <div className="flex gap-4">
             <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Simulation Speed</span>
                  <span className="text-white font-mono text-lg">{isEvolving ? "1.0x" : "Paused"}</span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsEvolving(!isEvolving); }}
                  className="pointer-events-auto p-3 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                >
                  <Activity size={20} />
                </button>
             </div>
          </div>
        </div>

        {/* Center Event Notifications */}
        <div className="flex flex-col items-center gap-4">
          <AnimatePresence>
            {currentEvent && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="px-8 py-3 rounded-full bg-orange-500/20 border border-orange-500/40 backdrop-blur-2xl text-orange-400 text-sm font-bold tracking-[0.4em]"
              >
                {currentEvent}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-between items-end">
          {/* Legend Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl w-72"
          >
            <div className="flex items-center gap-2 mb-4">
              <Layers size={16} className="text-blue-400" />
              <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Stratigraphy</span>
            </div>
            <div className="space-y-3">
              {BIOMES.slice().reverse().map((biome, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="w-3 h-3 rounded-sm shadow-sm transition-transform group-hover:scale-125" style={{ backgroundColor: biome.color }} />
                  <span className="text-[10px] text-white/50 uppercase font-bold tracking-tighter w-12">{biome.level.toFixed(1)}</span>
                  <span className="text-xs text-white/80 font-medium">{biome.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Sliders */}
          <div className="flex gap-6 items-end">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl flex flex-col gap-6 pointer-events-auto min-w-[320px]">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-white/60">
                    <Droplets size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Hydrosphere</span>
                  </div>
                  <span className="text-xs font-mono text-blue-400">{Math.round(waterLevel * 100)}%</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.01" 
                  value={waterLevel} 
                  onChange={(e) => setWaterLevel(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-white/60">
                    <Mountain size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Morphology</span>
                  </div>
                  <span className="text-xs font-mono text-green-400">{complexity.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="0.5" max="2" step="0.01" 
                  value={complexity} 
                  onChange={(e) => setComplexity(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-500"
                />
              </div>

              <div className="pt-2 border-t border-white/5 flex gap-2">
                <button 
                  onClick={() => setSeed(Math.random() * 1000)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                >
                  Regenerate
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => window.history.back()}
              className="pointer-events-auto p-5 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-red-500/20 hover:border-red-500/40 transition-all backdrop-blur-xl group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Overlays */}
      <div className="absolute inset-0 pointer-events-none z-10 border-[32px] border-[#0f172a]" />
      <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-[10px] font-mono text-white/20 tracking-[0.8em] uppercase">
        Autonomous Geological Intelligence // Core v4.1.0
      </div>
    </div>
  );
};

// Simple X icon replacement
const X = ({size, className}: {size: number, className: string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

export default LivingMaps;
