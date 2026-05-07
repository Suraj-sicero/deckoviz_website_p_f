
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Moon, ShieldCheck, Plus, X } from "lucide-react";
import { analyzeDream, DreamData } from "./dreamEngine";
import { Sigil } from "./Sigil";

const STORAGE_KEY = "deckoviz_dream_constellation";

const DreamTaxonomy: React.FC = () => {
  const [dreams, setDreams] = useState<DreamData[]>([]);
  const [inputText, setInputText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedDream, setSelectedDream] = useState<DreamData | null>(null);
  
  // Physics State
  const [positions, setPositions] = useState<Record<string, { x: number, y: number }>>({});
  const requestRef = useRef<number>();

  // Load Dreams
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setDreams(JSON.parse(saved));
    }
  }, []);

  // Save Dreams
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
  }, [dreams]);

  // Physics Simulation (Manual Force-Directed + Drift)
  useEffect(() => {
    const simulate = () => {
      setPositions(prev => {
        const next = { ...prev };
        
        
        // 1. Repulsion & Movement
        for (let i = 0; i < dreams.length; i++) {
          const d1 = dreams[i];
          if (!next[d1.id]) next[d1.id] = { x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 };
          
          let fx = 0, fy = 0;
          
          // Attraction to center (weighted by age)
          const age = (Date.now() - d1.timestamp) / (1000 * 60 * 60 * 24); // age in days
          const targetDist = age * 20; // older dreams drift out
          
          const distToCenter = Math.sqrt(next[d1.id].x**2 + next[d1.id].y**2);
          const centerForce = (distToCenter - targetDist) * 0.01;
          const angle = Math.atan2(next[d1.id].y, next[d1.id].x);
          
          fx -= Math.cos(angle) * centerForce;
          fy -= Math.sin(angle) * centerForce;

          // Repulsion from others
          for (let j = 0; j < dreams.length; j++) {
            if (i === j) continue;
            const d2 = dreams[j];
            if (!next[d2.id]) continue;

            const dx = next[d1.id].x - next[d2.id].x;
            const dy = next[d1.id].y - next[d2.id].y;
            const dSq = dx*dx + dy*dy + 0.1;
            if (dSq < 400) {
              fx += (dx / dSq) * 2;
              fy += (dy / dSq) * 2;
            }
          }

          next[d1.id].x += fx;
          next[d1.id].y += fy;
          
          // Slow orbital drift
          const orbitAngle = angle + 0.001 / (age + 1);
          const r = Math.sqrt(next[d1.id].x**2 + next[d1.id].y**2);
          next[d1.id].x = Math.cos(orbitAngle) * r;
          next[d1.id].y = Math.sin(orbitAngle) * r;
        }
        return next;
      });
      requestRef.current = requestAnimationFrame(simulate);
    };

    requestRef.current = requestAnimationFrame(simulate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [dreams]);

  const addDream = () => {
    if (inputText.length < 10) return;
    const analysis = analyzeDream(inputText);
    const newDream: DreamData = {
      id: Math.random().toString(36).substr(2, 9),
      text: inputText,
      timestamp: Date.now(),
      ...analysis,
      sigilData: {}
    };
    setDreams([newDream, ...dreams]);
    setInputText("");
    setShowInput(false);
  };

  return (
    <div className="relative w-full h-screen bg-[#050508] overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,30,60,0.15)_0%,transparent_70%)]" />
      
      {/* Constellation Canvas */}
      <div className="relative w-full h-full flex items-center justify-center">
        {dreams.map((dream) => {
          const pos = positions[dream.id] || { x: 0, y: 0 };
          const age = (Date.now() - dream.timestamp) / (1000 * 60 * 60 * 24);
          const opacity = Math.max(0.1, 1 - age / 30); // Fades over 30 days

          return (
            <motion.div
              key={dream.id}
              className="absolute cursor-pointer"
              style={{ 
                left: `calc(50% + ${pos.x}px)`, 
                top: `calc(50% + ${pos.y}px)`,
                opacity: opacity
              }}
              onClick={() => setSelectedDream(dream)}
              whileHover={{ scale: 1.2, opacity: 1 }}
            >
              <Sigil dream={dream} size={30 + dream.intensity * 20} />
            </motion.div>
          );
        })}
        
        {/* Soft Connections (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
           {/* For performance, we only draw a few strong connections */}
           {dreams.slice(0, 20).map((d1, i) => {
             const p1 = positions[d1.id];
             if (!p1) return null;
             return dreams.slice(i + 1, i + 5).map(d2 => {
               const p2 = positions[d2.id];
               if (!p2) return null;
               const dist = Math.sqrt((p1.x-p2.x)**2 + (p1.y-p2.y)**2);
               if (dist < 100) {
                 return (
                   <line 
                    key={`${d1.id}-${d2.id}`}
                    x1={`calc(50% + ${p1.x}px)`} y1={`calc(50% + ${p1.y}px)`}
                    x2={`calc(50% + ${p2.x}px)`} y2={`calc(50% + ${p2.y}px)`}
                    stroke="white" strokeWidth="0.5" strokeOpacity={0.05}
                   />
                 );
               }
               return null;
             });
           })}
        </svg>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowInput(true)}
        className="absolute bottom-400 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all group"
      >
        <Plus className="group-hover:rotate-90 transition-transform" />
      </button>

      {/* Privacy Disclaimer */}
      <div className="absolute bottom-400 left-1/2 -translate-x-1/2 text-[9px] text-gray-600 uppercase tracking-widest flex items-center space-x-2">
        <ShieldCheck size={10} />
        <span>Your dreams remain on this device</span>
      </div>

      {/* Title */}
      <div className="absolute top-10 left-10 pointer-events-none">
        <h1 className="text-xl font-light text-white tracking-[0.3em] uppercase flex items-center gap-3">
          <Moon size={18} className="text-violet-400" />
          The Dream Taxonomy
        </h1>
      </div>

      {/* Input Modal */}
      <AnimatePresence>
        {showInput && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <div className="w-full max-w-lg bg-[#0a0a0f] border border-white/10 p-10 rounded-2xl relative">
              <button onClick={() => setShowInput(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white">
                <X size={20} />
              </button>
              <h2 className="text-2xl font-light text-white mb-6 uppercase tracking-widest">Archive a Dream</h2>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Briefly describe the vision... (50-300 chars)"
                className="w-full h-40 bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-violet-500/50 transition-all mb-6 resize-none"
                maxLength={300}
              />
              <button
                onClick={addDream}
                disabled={inputText.length < 10}
                className="w-full py-4 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 disabled:opacity-30 transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles size={18} />
                <span>ETCH INTO CONSTELLATION</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedDream && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none p-12"
          >
            <div className="max-w-xl text-center pointer-events-auto">
              <div className="mb-8 flex justify-center">
                 <Sigil dream={selectedDream} size={100} />
              </div>
              <p className="text-2xl font-light text-white leading-relaxed italic mb-8">
                "{selectedDream.text}"
              </p>
              <div className="flex items-center justify-center space-x-6 text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                <span>{selectedDream.category}</span>
                <span className="w-1 h-1 rounded-full bg-gray-800" />
                <span>{selectedDream.emotion}</span>
                <span className="w-1 h-1 rounded-full bg-gray-800" />
                <span>{new Date(selectedDream.timestamp).toLocaleDateString()}</span>
              </div>
              <button 
                onClick={() => setSelectedDream(null)}
                className="mt-12 px-8 py-3 rounded-full border border-white/10 text-[10px] text-gray-400 hover:bg-white/5 transition-all"
              >
                RETURN TO ARCHIVE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side HUD */}
      <div className="absolute top-10 right-10 flex flex-col items-end text-[10px] text-gray-600 uppercase tracking-widest pointer-events-none">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-violet-500" />
          <span>Pattern Emergence Active</span>
        </div>
        <span>{dreams.length} Symbolic Entries</span>
      </div>
    </div>
  );
};

export default DreamTaxonomy;
