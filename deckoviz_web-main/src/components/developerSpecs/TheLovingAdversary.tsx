"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Scale
} from "lucide-react";

const TheLovingAdversary: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [myPosition, setMyPosition] = useState("");
  const [opposingPosition, setOpposingPosition] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSteelMan = () => {
    if (!myPosition) return;
    setIsGenerating(true);
    setOpposingPosition("");
    
    // Simulate API call
    setTimeout(() => {
      const steelMan = `Steel-Manned Version of the Opposing View:\n\nWhile your position focuses on the importance of individual agency and self-reliance, the strongest counter-argument suggests that systemic factors and shared environments play a far greater role in determining outcomes than we often admit. This view argues that without a robust collective safety net, individual efforts are often neutralized by structural disadvantages, making collective responsibility the primary driver of a just society.`;
      setOpposingPosition(steelMan);
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 to-stone-900/30 border border-amber-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Scale size={32} className="text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Creative / Intellectual / Steel-Manning Practice</span>
              <h1 className="text-4xl font-bold">The Loving Adversary</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Practice steel-manning: taking a position you genuinely disagree with and constructing the strongest, most honest, most intellectually serious version of that position.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                My Position
              </label>
              <textarea 
                value={myPosition} 
                onChange={(e) => setMyPosition(e.target.value)}
                placeholder="State your position clearly and honestly..."
                className="w-full bg-stone-800 border border-white/10 rounded-lg p-3 text-white text-sm min-h-[200px]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                Their Strongest Position (Steel-Man)
              </label>
              <div className="w-full bg-stone-900/50 border border-white/5 rounded-lg p-3 text-white text-sm min-h-[200px] relative">
                <AnimatePresence>
                  {isGenerating ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-2">
                        <RefreshCw size={16} className="animate-spin text-amber-400" />
                        <span>Constructing argument...</span>
                      </div>
                    </motion.div>
                  ) : opposingPosition ? (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="whitespace-pre-wrap text-gray-300"
                    >
                      {opposingPosition}
                    </motion.p>
                  ) : (
                    <div className="text-gray-600 flex flex-col items-center justify-center h-full">
                      <Scale size={24} className="mb-2 opacity-30" />
                      <p>The strongest version of the opposing view will appear here.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={generateSteelMan}
              disabled={!myPosition || isGenerating}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20_rgba(245,158,11,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>Processing... <RefreshCw size={18} className="animate-spin" /></>
              ) : (
                <>Steel-Man Position <Play size={18} /></>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TheLovingAdversary;
