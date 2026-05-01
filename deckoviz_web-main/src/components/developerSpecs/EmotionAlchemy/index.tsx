"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
  id: string;
  x: number;
  y: number;
  element: string;
  color: string;
  orbital: boolean;
}

interface Bond {
  from: string;
  to: string;
  type: "single" | "double";
}

const ELEMENTS: Record<string, { symbol: string; name: string; color: string }> = {
  joy: { symbol: "Au", name: "Euphoria", color: "#fbbf24" },
  fear: { symbol: "Fe", name: "Phobion", color: "#ef4444" },
  love: { symbol: "Lu", name: "Amorite", color: "#ec4899" },
  calm: { symbol: "Ca", name: "Serenitite", color: "#3b82f6" },
  memory: { symbol: "Me", name: "Mnemon", color: "#a855f7" },
  sorrow: { symbol: "So", name: "Lachrym", color: "#64748b" },
  anxiety: { symbol: "An", name: "Trepidon", color: "#10b981" },
};

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const EmotionAlchemy: React.FC = () => {
  const [input, setInput] = useState("");
  const [molecule, setMolecule] = useState<{ nodes: Node[]; bonds: Bond[]; name: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMolecule = (text: string) => {
    if (!text) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      const seed = hashString(text.toLowerCase());
      const rng = (s: number) => {
        const x = Math.sin(s) * 10000;
        return x - Math.floor(x);
      };

      const nodes: Node[] = [];
      const bonds: Bond[] = [];
      
      // Select primary element based on input keywords or hash
      const emotionKeys = Object.keys(ELEMENTS);
      const primaryKey = emotionKeys.find(k => text.toLowerCase().includes(k)) || emotionKeys[seed % emotionKeys.length];
      const primary = ELEMENTS[primaryKey];

      // Central node
      nodes.push({
        id: "root",
        x: 0,
        y: 0,
        element: primary.symbol,
        color: primary.color,
        orbital: true
      });

      // Branching logic (deterministic)
      const numBranches = 3 + (seed % 3);
      for (let i = 0; i < numBranches; i++) {
        const angle = (i / numBranches) * Math.PI * 2 + (rng(seed + i) * 0.5);
        const dist = 80 + (rng(seed * i) * 40);
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        
        const branchKey = emotionKeys[(seed + i * 7) % emotionKeys.length];
        const branchElem = ELEMENTS[branchKey];
        const branchId = `b_${i}`;
        
        nodes.push({
          id: branchId,
          x,
          y,
          element: branchElem.symbol,
          color: branchElem.color,
          orbital: rng(seed + i) > 0.5
        });
        
        bonds.push({ from: "root", to: branchId, type: rng(seed + i) > 0.8 ? "double" : "single" });

        // Sub-branches
        if (rng(seed + i + 10) > 0.4) {
          const subAngle = angle + (rng(seed + i + 20) - 0.5) * 1.5;
          const subDist = 60;
          const sx = x + Math.cos(subAngle) * subDist;
          const sy = y + Math.sin(subAngle) * subDist;
          const subId = `s_${i}`;
          
          nodes.push({
            id: subId,
            x: sx,
            y: sy,
            element: emotionKeys[(seed + i * 13) % emotionKeys.length].slice(0,1).toUpperCase() + "x",
            color: "#94a3b8",
            orbital: false
          });
          bonds.push({ from: branchId, to: subId, type: "single" });
        }
      }

      const chemicalName = `${primary.name}-${seed % 100} ${rng(seed) > 0.5 ? "Complex" : "Isotope"}`;
      setMolecule({ nodes, bonds, name: chemicalName });
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-6 font-mono">
      {/* Background Lab Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="relative z-10 w-full max-w-4xl bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase text-white/90">Emotion Alchemy Lab</h1>
            <p className="text-xs text-blue-400/60 mt-1 uppercase tracking-[0.3em]">Neural-Molecular Synthesizer v4.1</p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/20 uppercase tracking-widest">Status</div>
            <div className="text-xs text-emerald-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Ready for Synthesis
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="relative mb-12">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateMolecule(input)}
            placeholder="Enter an emotion or memory..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg outline-none focus:border-blue-500/50 transition-all placeholder:text-white/10"
          />
          <button 
            onClick={() => generateMolecule(input)}
            disabled={!input || isGenerating}
            className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-bold transition-all disabled:opacity-20"
          >
            {isGenerating ? "Synthesizing..." : "Generate"}
          </button>
        </div>

        {/* Visualization Area */}
        <div className="relative h-[400px] border border-white/5 rounded-2xl bg-black/40 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            {molecule ? (
              <motion.svg 
                key={molecule.name}
                viewBox="-200 -200 400 400" 
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
              >
                {/* Bonds */}
                {molecule.bonds.map((bond, i) => {
                  const fromNode = molecule.nodes.find(n => n.id === bond.from);
                  const toNode = molecule.nodes.find(n => n.id === bond.to);
                  if (!fromNode || !toNode) return null;
                  
                  return (
                    <motion.line 
                      key={`${bond.from}-${bond.to}`}
                      x1={fromNode.x} y1={fromNode.y}
                      x2={toNode.x} y2={toNode.y}
                      stroke="white"
                      strokeWidth={bond.type === "double" ? 4 : 1}
                      strokeOpacity={0.15}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                  );
                })}

                {/* Nodes */}
                {molecule.nodes.map((node, i) => (
                  <motion.g 
                    key={node.id} 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.05 }}
                  >
                    {/* Orbital */}
                    {node.orbital && (
                      <circle 
                        cx={node.x} cy={node.y} r={25} 
                        fill={node.color} fillOpacity={0.05}
                        className="animate-pulse"
                      />
                    )}
                    
                    <circle cx={node.x} cy={node.y} r={12} fill="#0a0a0c" stroke={node.color} strokeWidth={1} />
                    <text 
                      x={node.x} y={node.y} 
                      textAnchor="middle" dy=".3em" 
                      fontSize="8" fill="white" fontWeight="bold"
                    >
                      {node.element}
                    </text>
                  </motion.g>
                ))}
              </motion.svg>
            ) : (
              <div className="text-white/10 text-sm uppercase tracking-[0.5em] animate-pulse">
                Awaiting Input
              </div>
            )}
          </AnimatePresence>

          {molecule && (
            <div className="absolute bottom-6 left-6 text-left">
              <div className="text-[10px] text-white/20 uppercase tracking-widest mb-1">Synthesized Molecule</div>
              <div className="text-xl font-bold text-blue-400">{molecule.name}</div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-8 grid grid-cols-4 sm:grid-cols-7 gap-4">
          {Object.entries(ELEMENTS).map(([key, value]) => (
            <div key={key} className="text-center">
              <div 
                className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center text-[10px] font-bold border border-white/10"
                style={{ backgroundColor: `${value.color}20`, color: value.color }}
              >
                {value.symbol}
              </div>
              <div className="text-[8px] text-white/30 uppercase tracking-tighter">{value.name}</div>
            </div>
          ))}
        </div>

      </div>

      <button 
        onClick={() => window.history.back()}
        className="mt-12 px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all text-xs tracking-widest uppercase"
      >
        Exit Laboratory
      </button>
    </div>
  );
};

export default EmotionAlchemy;
