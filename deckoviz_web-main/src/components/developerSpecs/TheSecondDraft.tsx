"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PenTool, BookOpen, RefreshCw, ArrowRight, Play, Sparkles
} from "lucide-react";

const TheSecondDraft: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [firstDraft, setFirstDraft] = useState("");
  const [secondDraft, setSecondDraft] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSecondDraft = () => {
    if (!firstDraft) return;
    setIsGenerating(true);
    setSecondDraft("");
    
    // Simulate API call
    setTimeout(() => {
      const reframed = `Reframed Version:\n\nInstead of seeing it as a series of failures, consider it the necessary preparation for what came next. The challenges weren't obstacles, but the very forge that shaped your resilience. You didn't lose time; you gained the specific wisdom required for your current chapter.`;
      setSecondDraft(reframed);
      setIsGenerating(false);
    }, 2000);
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-stone-900/30 border border-emerald-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <PenTool size={32} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Creative / Storytelling / Narrative Reframing</span>
              <h1 className="text-4xl font-bold">The Second Draft</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Every life is a first draft. Use this space to reframe a period of your life or a specific event to find the narrative that is most true rather than most habitual.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                First Draft (The Habitual Story)
              </label>
              <textarea 
                value={firstDraft} 
                onChange={(e) => setFirstDraft(e.target.value)}
                placeholder="Tell the story as you usually tell it, full of the accidents and flat characters..."
                className="w-full bg-stone-800 border border-white/10 rounded-lg p-3 text-white text-sm min-h-[250px] font-serif"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                Second Draft (The Reframed Story)
              </label>
              <div className="w-full bg-stone-900/50 border border-white/5 rounded-lg p-3 text-white text-sm min-h-[250px] font-serif relative">
                <AnimatePresence>
                  {isGenerating ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-2">
                        <RefreshCw size={16} className="animate-spin text-emerald-400" />
                        <span>Reframing...</span>
                      </div>
                    </motion.div>
                  ) : secondDraft ? (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="whitespace-pre-wrap"
                    >
                      {secondDraft}
                    </motion.p>
                  ) : (
                    <div className="text-gray-600 flex flex-col items-center justify-center h-full">
                      <Sparkles size={24} className="mb-2 opacity-30" />
                      <p>Your reframed story will appear here.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={generateSecondDraft}
              disabled={!firstDraft || isGenerating}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-emerald-500 hover:bg-emerald-600 text-black transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>Processing... <RefreshCw size={18} className="animate-spin" /></>
              ) : (
                <>Generate Second Draft <Play size={18} /></>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TheSecondDraft;
