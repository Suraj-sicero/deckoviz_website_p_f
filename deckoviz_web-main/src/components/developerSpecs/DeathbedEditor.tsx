"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Scissors, Check, Edit
} from "lucide-react";

const DeathbedEditor: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [paragraphs, setParagraphs] = useState<Array<{id: number, text: string, status: 'keep' | 'cut' | 'revise'}>>([
    { id: 1, text: "I spent ten years working in corporate finance, climbing the ladder and missing the sunsets.", status: 'revise' },
    { id: 2, text: "The summer in Italy when we had no money but ate like royalty and laughed until our ribs ached.", status: 'keep' },
    { id: 3, text: "The petty argument with my brother that lasted three years over a borrowed book.", status: 'cut' }
  ]);

  const setStatus = (id: number, status: 'keep' | 'cut' | 'revise') => {
    setParagraphs(paragraphs.map(p => p.id === id ? { ...p, status } : p));
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-stone-500/10 to-stone-900/30 border border-stone-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <FileText size={32} className="text-stone-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Creative / Storytelling / Perspective</span>
              <h1 className="text-4xl font-bold">The Deathbed Editor</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Review your life story from the perspective of the end. Decide what to keep, what to cut, and what needs revision.
          </p>

          <div className="space-y-6">
            {paragraphs.map((p) => (
              <div 
                key={p.id}
                className={`p-6 rounded-xl bg-black/40 border transition-colors ${
                  p.status === 'keep' ? "border-emerald-500/20" :
                  p.status === 'cut' ? "border-red-500/20 opacity-50" :
                  "border-yellow-500/20"
                }`}
              >
                <p className="text-lg font-serif text-white/90 mb-4">{p.text}</p>
                
                <div className="flex justify-end space-x-2">
                  <button 
                    onClick={() => setStatus(p.id, 'keep')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      p.status === 'keep' ? "bg-emerald-500 text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    <Check size={12} /> Keep
                  </button>
                  <button 
                    onClick={() => setStatus(p.id, 'cut')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      p.status === 'cut' ? "bg-red-500 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    <Scissors size={12} /> Cut
                  </button>
                  <button 
                    onClick={() => setStatus(p.id, 'revise')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      p.status === 'revise' ? "bg-yellow-500 text-black" : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    <Edit size={12} /> Revise
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DeathbedEditor;
