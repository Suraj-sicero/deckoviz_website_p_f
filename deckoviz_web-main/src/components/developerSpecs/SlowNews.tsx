"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Globe
} from "lucide-react";

const SlowNews: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [newsItem, setNewsItem] = useState("");
  const [reflection, setReflection] = useState("");
  const [isArchiving, setIsArchiving] = useState(false);

  const archiveReflection = () => {
    if (!newsItem || !reflection) return;
    setIsArchiving(true);
    setTimeout(() => {
      setIsArchiving(false);
      alert("Slow News reflection archived.");
      setNewsItem("");
      setReflection("");
    }, 1500);
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 to-stone-900/30 border border-blue-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Globe size={32} className="text-blue-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Storytelling / Presence / Reflection</span>
              <h1 className="text-4xl font-bold">Slow News</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Practice consuming news slowly. Write about a piece of news that caught your attention and reflect on its long-term impact rather than the immediate noise.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-1">The News Item:</label>
              <input 
                type="text" 
                value={newsItem} 
                onChange={(e) => setNewsItem(e.target.value)}
                placeholder="What happened? (e.g., A new space telescope image was released)"
                className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-1">Your Reflection:</label>
              <textarea 
                value={reflection} 
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Why does this matter in the long run? What does it say about us?"
                className="w-full bg-stone-800 border border-white/10 rounded-lg p-3 text-white text-sm min-h-[150px] font-serif"
              />
            </div>

            <div className="flex justify-end">
              <button 
                onClick={archiveReflection}
                disabled={!newsItem || !reflection || isArchiving}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isArchiving ? "Archiving..." : "Archive Reflection"} <Play size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SlowNews;
