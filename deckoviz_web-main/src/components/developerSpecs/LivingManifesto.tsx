"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  FileText, BookOpen, PenTool, RefreshCw, ArrowRight, Play
} from "lucide-react";

const LivingManifesto: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [points, setPoints] = useState<string[]>([
    "I will prioritize depth over breadth in my relationships.",
    "I will speak the truth, even when it is uncomfortable.",
    "I will make space for creativity every single day."
  ]);
  const [newPoint, setNewPoint] = useState("");

  const addPoint = () => {
    if (!newPoint) return;
    setPoints([...points, newPoint]);
    setNewPoint("");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <PixelatedBackground variant={variant} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-8">
          <a href="/deckoviz-storytelling" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowRight size={16} className="transform rotate-180" /> Back to Storytelling
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-red-500/10 to-stone-900/30 border border-red-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <FileText size={32} className="text-red-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Storytelling / Identity / Purpose</span>
              <h1 className="text-4xl font-bold">The Living Manifesto</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Write the principles by which you want to live. This is a living document that evolves with you.
          </p>

          <div className="flex space-x-2 mb-8">
            <input 
              type="text" 
              value={newPoint} 
              onChange={(e) => setNewPoint(e.target.value)}
              placeholder="Add a new principle..."
              className="flex-1 bg-stone-800 border border-white/10 rounded-lg p-3 text-white text-sm"
            />
            <button 
              onClick={addPoint}
              disabled={!newPoint}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-bold text-white disabled:opacity-50 transition-colors"
            >
              Add Point
            </button>
          </div>

          <div className="space-y-4">
            {points.map((point, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-lg bg-black/40 border border-white/5 flex items-start gap-3"
              >
                <span className="text-red-500 font-bold">{idx + 1}.</span>
                <p className="text-sm font-serif text-white/90">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
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

export default LivingManifesto;
