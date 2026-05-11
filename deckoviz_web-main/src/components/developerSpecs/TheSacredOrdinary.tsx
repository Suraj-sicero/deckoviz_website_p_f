"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Heart
} from "lucide-react";

const TheSacredOrdinary: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [items, setItems] = useState<Array<{id: number, thing: string, sacredness: number}>>([
    { id: 1, thing: "The first sip of coffee in the morning.", sacredness: 8 },
    { id: 2, thing: "The way the light hits the floor at 4 PM.", sacredness: 7 },
    { id: 3, thing: "Folding clean laundry.", sacredness: 5 }
  ]);
  const [newThing, setNewThing] = useState("");
  const [newSacredness, setNewSacredness] = useState(5);

  const addItem = () => {
    if (!newThing) return;
    setItems([...items, { id: items.length + 1, thing: newThing, sacredness: newSacredness }]);
    setNewThing("");
    setNewSacredness(5);
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-stone-900/30 border border-yellow-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Sun size={32} className="text-yellow-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Storytelling / Gratitude / Present Tense Living</span>
              <h1 className="text-4xl font-bold">The Sacred Ordinary</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Find the sacred in the ordinary. List the small, everyday moments that bring you joy or peace and rate their sacredness.
          </p>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Heart size={16} className="text-yellow-400 flex-shrink-0" />
                  <span className="text-sm text-white font-serif">
                    {item.thing}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Sacredness:</span>
                  <span className="text-xs font-bold text-yellow-300">{item.sacredness}/10</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Add Ordinary Moment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">The Moment</label>
                <input 
                  type="text" 
                  value={newThing} 
                  onChange={(e) => setNewThing(e.target.value)}
                  placeholder="What is an ordinary moment that feels sacred?"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Sacredness ({newSacredness}/10)</label>
                <div className="flex space-x-2">
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={newSacredness} 
                    onChange={(e) => setNewSacredness(Number(e.target.value))}
                    className="flex-1 h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-yellow-500 mt-3"
                  />
                  <button 
                    onClick={addItem}
                    disabled={!newThing}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm font-bold text-white disabled:opacity-50 self-center"
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

export default TheSacredOrdinary;
