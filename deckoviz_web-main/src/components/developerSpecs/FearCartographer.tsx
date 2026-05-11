"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Globe
} from "lucide-react";

const FearCartographer: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [fears, setFears] = useState<Array<{id: number, fear: string, category: string, intensity: number}>>([
    { id: 1, fear: "Not having enough for retirement.", category: "Financial", intensity: 7 },
    { id: 2, fear: "Public speaking at the upcoming conference.", category: "Social", intensity: 8 },
    { id: 3, fear: "The work not meaning anything in the long run.", category: "Existential", intensity: 6 }
  ]);
  const [newFear, setNewFear] = useState("");
  const [newCategory, setNewCategory] = useState("Financial");
  const [newIntensity, setNewIntensity] = useState(5);

  const categories = ["Financial", "Social", "Existential", "Relational", "Health"];

  const addFear = () => {
    if (!newFear) return;
    setFears([...fears, { id: fears.length + 1, fear: newFear, category: newCategory, intensity: newIntensity }]);
    setNewFear("");
    setNewIntensity(5);
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
              <Globe size={32} className="text-red-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Psychological / Storytelling / Courageous Living</span>
              <h1 className="text-4xl font-bold">The Fear Cartographer</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Map your actual fear landscape. Categorize your operational fears and rate their intensity to better understand their influence.
          </p>

          <div className="space-y-4 mb-8">
            {fears.map((fear) => (
              <div 
                key={fear.id}
                className="p-4 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-red-400 uppercase w-20">{fear.category}</span>
                  <span className="text-sm text-white font-serif">{fear.fear}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Intensity:</span>
                  <span className={`text-xs font-bold ${
                    fear.intensity > 7 ? "text-red-400" :
                    fear.intensity > 4 ? "text-yellow-400" :
                    "text-emerald-400"
                  }`}>{fear.intensity}/10</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Add Fear to Map</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Category</label>
                <select 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">The Fear</label>
                <input 
                  type="text" 
                  value={newFear} 
                  onChange={(e) => setNewFear(e.target.value)}
                  placeholder="What is the fear?"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Intensity ({newIntensity}/10)</label>
                <div className="flex space-x-2">
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={newIntensity} 
                    onChange={(e) => setNewIntensity(Number(e.target.value))}
                    className="flex-1 h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-red-500 mt-3"
                  />
                  <button 
                    onClick={addFear}
                    disabled={!newFear}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-bold text-white disabled:opacity-50 self-center"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FearCartographer;
