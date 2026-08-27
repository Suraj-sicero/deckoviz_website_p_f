"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, BookOpen, PenTool, RefreshCw, ArrowRight, Play
} from "lucide-react";

const StorySeed: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [character, setCharacter] = useState("");
  const [setting, setSetting] = useState("");
  const [conflict, setConflict] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [seed, setSeed] = useState("");

  const generateSeed = () => {
    if (!character || !setting || !conflict) return;
    
    setIsGenerating(true);
    setSeed("");
    
    // Simulate API call
    setTimeout(() => {
      const generatedSeed = `In the heart of ${setting}, ${character} stood at the precipice of change. The air was thick with the weight of ${conflict}, a tension that had been building for generations. It was a moment that would define everything that came after, a single breath before the plunge into the unknown.`;
      setSeed(generatedSeed);
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
              <Sparkles size={32} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Creative / Writing / Ideation</span>
              <h1 className="text-4xl font-bold">The Story Seed</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Plant the elements of your story and watch a seed paragraph grow. Input your core ideas to generate a starting point.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-black/40 border border-white/5">
              <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <PenTool size={14} /> Character
              </label>
              <input 
                type="text" 
                value={character} 
                onChange={(e) => setCharacter(e.target.value)}
                placeholder="e.g., A weary detective"
                className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
              />
            </div>

            <div className="p-6 rounded-xl bg-black/40 border border-white/5">
              <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <Sparkles size={14} /> Setting
              </label>
              <input 
                type="text" 
                value={setting} 
                onChange={(e) => setSetting(e.target.value)}
                placeholder="e.g., A floating city"
                className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
              />
            </div>

            <div className="p-6 rounded-xl bg-black/40 border border-white/5">
              <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <BookOpen size={14} /> Conflict
              </label>
              <input 
                type="text" 
                value={conflict} 
                onChange={(e) => setConflict(e.target.value)}
                placeholder="e.g., Forbidden knowledge"
                className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end mb-8">
            <button 
              onClick={generateSeed}
              disabled={!character || !setting || !conflict || isGenerating}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-emerald-500 hover:bg-emerald-600 text-black transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>Generating... <RefreshCw size={18} className="animate-spin" /></>
              ) : (
                <>Generate Seed <Play size={18} /></>
              )}
            </button>
          </div>

          <AnimatePresence>
            {seed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-8 rounded-xl bg-black/60 border border-emerald-500/20"
              >
                <h3 className="text-sm font-semibold text-emerald-400 mb-4 uppercase tracking-wider">Generated Seed</h3>
                <p className="text-xl font-serif text-white/90 leading-relaxed">
                  {seed}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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

export default StorySeed;
