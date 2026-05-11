"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, BookOpen, PenTool, RefreshCw, ArrowRight, Play
} from "lucide-react";

const MythologyEngine: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [hero, setHero] = useState("");
  const [quest, setQuest] = useState("");
  const [world, setWorld] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [myth, setMyth] = useState("");

  const generateMyth = () => {
    if (!hero || !quest || !world) return;
    
    setIsGenerating(true);
    setMyth("");
    
    // Simulate API call
    setTimeout(() => {
      const generatedMyth = `In the ancient records of ${world}, it is written that ${hero} would arise in the time of great need. Their path was not one of ease, but of trial, bound by the sacred vow to ${quest}. Through the shadows and the light, their story became the foundation upon which the future was built.`;
      setMyth(generatedMyth);
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 to-stone-900/30 border border-purple-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Zap size={32} className="text-purple-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Creative / Storytelling / World Building</span>
              <h1 className="text-4xl font-bold">Mythology Engine</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Construct the foundational myths of your world. Input the core elements to generate a mythic structure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-black/40 border border-white/5">
              <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <PenTool size={14} /> The Hero
              </label>
              <input 
                type="text" 
                value={hero} 
                onChange={(e) => setHero(e.target.value)}
                placeholder="e.g., The Last Archivist"
                className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
              />
            </div>

            <div className="p-6 rounded-xl bg-black/40 border border-white/5">
              <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <Zap size={14} /> The Quest
              </label>
              <input 
                type="text" 
                value={quest} 
                onChange={(e) => setQuest(e.target.value)}
                placeholder="e.g., Recover the lost sun"
                className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
              />
            </div>

            <div className="p-6 rounded-xl bg-black/40 border border-white/5">
              <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                <BookOpen size={14} /> The World
              </label>
              <input 
                type="text" 
                value={world} 
                onChange={(e) => setWorld(e.target.value)}
                placeholder="e.g., The Obsidian Waste"
                className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end mb-8">
            <button 
              onClick={generateMyth}
              disabled={!hero || !quest || !world || isGenerating}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-purple-500 hover:bg-purple-600 text-black transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>Generating... <RefreshCw size={18} className="animate-spin" /></>
              ) : (
                <>Generate Myth <Play size={18} /></>
              )}
            </button>
          </div>

          <AnimatePresence>
            {myth && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-8 rounded-xl bg-black/60 border border-purple-500/20"
              >
                <h3 className="text-sm font-semibold text-purple-400 mb-4 uppercase tracking-wider">Generated Myth</h3>
                <p className="text-xl font-serif text-white/90 leading-relaxed">
                  {myth}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MythologyEngine;
