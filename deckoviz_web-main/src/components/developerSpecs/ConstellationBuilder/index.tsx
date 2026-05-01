"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: string;
  x: number;
  y: number;
  mag: number;
}

interface Connection {
  from: string;
  to: string;
}

const TITLES = [
  "The Silent Harbinger", "Aurelion’s Veil", "The Weaver of Sands", 
  "The Eternal Sentinel", "Solara’s Whisper", "The Night’s Emissary",
  "The Celestial Voyager", "The Forgotten Guardian"
];

const MYTH_TEMPLATES = [
  "Forged in the fires of the First Dawn, this figure was cast into the heavens to watch over the mortals of the threshold. It is said that when the stars align in this specific grace, a new cycle of wisdom begins.",
  "Born from the tears of a goddess who mourned for a lost era, this constellation represents the bridge between the seen and the unseen. It remains a guiding light for those who wander in the silence of the great void.",
  "Legend tells of a great spirit that once walked the shifting plains of time. To preserve its essence, the ancient ones traced its path across the velvet sky, binding its memory to the eternal cold of the stars.",
];

const ConstellationBuilder: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [stars, setStars] = useState<Star[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedStarId, setSelectedStarId] = useState<string | null>(null);
  const [myth, setMyth] = useState<{ name: string; story: string } | null>(null);
  const [isMythVisible, setIsMythVisible] = useState(false);

  // Generate initial starfield
  useEffect(() => {
    const numStars = 150;
    const newStars: Star[] = [];
    for (let i = 0; i < numStars; i++) {
      newStars.push({
        id: `star_${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        mag: 0.5 + Math.random() * 1.5,
      });
    }
    setStars(newStars);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.beginPath();
    for (const conn of connections) {
      const s1 = stars.find(s => s.id === conn.from);
      const s2 = stars.find(s => s.id === conn.to);
      if (s1 && s2) {
        ctx.moveTo(s1.x * canvas.width / 100, s1.y * canvas.height / 100);
        ctx.lineTo(s2.x * canvas.width / 100, s2.y * canvas.height / 100);
      }
    }
    ctx.stroke();

    // Draw stars
    for (const star of stars) {
      const sx = star.x * canvas.width / 100;
      const sy = star.y * canvas.height / 100;
      
      const isSelected = selectedStarId === star.id;
      const isPart = connections.some(c => c.from === star.id || c.to === star.id);

      ctx.shadowBlur = isSelected ? 15 : 5;
      ctx.shadowColor = "white";
      ctx.fillStyle = isPart ? "white" : "rgba(255, 255, 255, 0.6)";
      ctx.beginPath();
      ctx.arc(sx, sy, isSelected ? 3 : star.mag, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [stars, connections, selectedStarId]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
        draw();
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  useEffect(() => { draw(); }, [draw]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Find nearest star
    const hit = stars.find(s => Math.sqrt((s.x - x) ** 2 + (s.y - y) ** 2) < 2);
    
    if (hit) {
      if (selectedStarId && selectedStarId !== hit.id) {
        // Create connection
        setConnections([...connections, { from: selectedStarId, to: hit.id }]);
        setSelectedStarId(hit.id);
      } else {
        setSelectedStarId(hit.id);
      }
    } else {
      setSelectedStarId(null);
    }
  };

  const generateMyth = () => {
    if (connections.length < 2) return;
    const seed = connections.length * 13;
    const name = TITLES[seed % TITLES.length];
    const story = MYTH_TEMPLATES[seed % MYTH_TEMPLATES.length];
    setMyth({ name, story });
    setIsMythVisible(true);
  };

  const reset = () => {
    setConnections([]);
    setSelectedStarId(null);
    setMyth(null);
    setIsMythVisible(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-[#020617] overflow-hidden flex flex-col items-center justify-center cursor-crosshair"
      onClick={handleCanvasClick}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* UI Controls */}
      <div className="absolute top-12 left-12 z-20 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl text-white/90 font-serif tracking-tighter">Constellation Mythology</h1>
          <p className="text-xs text-white/30 uppercase tracking-[0.4em] mt-2">Connect the stars to weave a story</p>
        </div>
        
        <div className="flex gap-2 pointer-events-auto">
          <button 
            onClick={(e) => { e.stopPropagation(); reset(); }}
            className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md"
          >
            Reset
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); generateMyth(); }}
            disabled={connections.length < 2}
            className="px-6 py-2 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-500 transition-all disabled:opacity-20"
          >
            Form Myth
          </button>
        </div>
      </div>

      {/* Mythology Card */}
      <AnimatePresence>
        {isMythVisible && myth && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute bottom-24 max-w-xl p-10 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-2xl shadow-2xl pointer-events-none"
          >
            <h2 className="text-5xl font-serif text-white mb-6 italic tracking-tight">{myth.name}</h2>
            <p className="text-lg text-white/60 leading-relaxed font-serif">
              {myth.story}
            </p>
            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
              <span className="text-[10px] text-white/20 uppercase tracking-[0.5em]">Celestial Record v2.0</span>
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Figure Silhouette (Faint) */}
      <AnimatePresence>
        {isMythVisible && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            className="absolute inset-0 z-5 pointer-events-none flex items-center justify-center"
          >
             <svg width="100%" height="100%" viewBox="0 0 100 100">
               <path d="M50,20 C30,40 30,60 50,80 C70,60 70,40 50,20" fill="white" />
             </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={(e) => { e.stopPropagation(); window.history.back(); }}
        className="absolute top-12 right-12 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all backdrop-blur-md group"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:scale-110 transition-transform">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>

      {/* Atmospheric Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-indigo-950/20 to-transparent" />
    </div>
  );
};

export default ConstellationBuilder;
