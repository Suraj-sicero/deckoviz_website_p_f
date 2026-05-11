"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Archive
} from "lucide-react";

const GratitudeArchaeologist: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [items, setItems] = useState<Array<{id: number, thing: string, depth: string}>>([
    { id: 1, thing: "The kindness of a stranger on the train in 2018.", depth: "Deep (Years ago)" },
    { id: 2, thing: "The warm bowl of soup I had yesterday.", depth: "Surface (Recent)" }
  ]);
  const [newThing, setNewThing] = useState("");
  const [newDepth, setNewDepth] = useState("Surface (Recent)");

  const addItem = () => {
    if (!newThing) return;
    setItems([...items, { id: items.length + 1, thing: newThing, depth: newDepth }]);
    setNewThing("");
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-lime-500/10 to-stone-900/30 border border-lime-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Heart size={32} className="text-lime-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-lime-400 uppercase tracking-wider">Storytelling / Gratitude / Reflection</span>
              <h1 className="text-4xl font-bold">Gratitude Archaeologist</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Dig up moments of gratitude from different layers of your life. Record things from the surface (recent) to the deep (years ago).
          </p>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Heart size={16} className="text-lime-400 flex-shrink-0" />
                  <span className="text-sm text-white font-serif">
                    {item.thing}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Layer:</span>
                  <span className="text-xs font-bold text-lime-300">{item.depth}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Record Gratitude</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">The Moment/Thing</label>
                <input 
                  type="text" 
                  value={newThing} 
                  onChange={(e) => setNewThing(e.target.value)}
                  placeholder="What are you grateful for?"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Layer/Depth</label>
                <div className="flex space-x-2">
                  <select 
                    value={newDepth} 
                    onChange={(e) => setNewDepth(e.target.value)}
                    className="flex-1 bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                  >
                    <option value="Surface (Recent)">Surface (Recent)</option>
                    <option value="Middle (Months ago)">Middle (Months ago)</option>
                    <option value="Deep (Years ago)">Deep (Years ago)</option>
                  </select>
                  <button 
                    onClick={addItem}
                    disabled={!newThing}
                    className="px-4 py-2 bg-lime-500 hover:bg-lime-600 rounded-lg text-sm font-bold text-black disabled:opacity-50 self-center"
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

export default GratitudeArchaeologist;
