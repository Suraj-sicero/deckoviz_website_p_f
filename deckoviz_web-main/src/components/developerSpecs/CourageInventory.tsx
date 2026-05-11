"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Zap
} from "lucide-react";

const CourageInventory: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [items, setItems] = useState<Array<{id: number, action: string, fearLevel: number, status: 'pending' | 'done'}>>([
    { id: 1, action: "Having the difficult conversation with Sarah.", fearLevel: 8, status: 'pending' },
    { id: 2, action: "Submitting my writing to the competition.", fearLevel: 6, status: 'pending' },
    { id: 3, action: "Saying no to the extra project.", fearLevel: 7, status: 'done' }
  ]);
  const [newAction, setNewAction] = useState("");
  const [newFearLevel, setNewFearLevel] = useState(5);

  const addItem = () => {
    if (!newAction) return;
    setItems([...items, { id: items.length + 1, action: newAction, fearLevel: newFearLevel, status: 'pending' }]);
    setNewAction("");
    setNewFearLevel(5);
  };

  const toggleStatus = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, status: item.status === 'pending' ? 'done' : 'pending' } : item));
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 to-stone-900/30 border border-orange-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Shield size={32} className="text-orange-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Psychological / Courage / Action</span>
              <h1 className="text-4xl font-bold">Courage Inventory</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            List the actions that require courage in your life. Map your fear landscape and track your progress.
          </p>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div 
                key={item.id}
                className={`p-4 rounded-lg bg-black/40 border transition-colors flex items-center justify-between ${
                  item.status === 'done' ? "border-emerald-500/20 opacity-50" : "border-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleStatus(item.id)}
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      item.status === 'done' ? "bg-emerald-500 border-emerald-500" : "border-gray-500"
                    }`}
                  >
                    {item.status === 'done' && <span className="text-black text-xs">✓</span>}
                  </button>
                  <span className={`text-sm ${item.status === 'done' ? "line-through text-gray-500" : "text-white"}`}>
                    {item.action}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Fear Level:</span>
                  <span className={`text-xs font-bold ${
                    item.fearLevel > 7 ? "text-red-400" :
                    item.fearLevel > 4 ? "text-yellow-400" :
                    "text-emerald-400"
                  }`}>{item.fearLevel}/10</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Add Courage Item</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Action</label>
                <input 
                  type="text" 
                  value={newAction} 
                  onChange={(e) => setNewAction(e.target.value)}
                  placeholder="What requires courage?"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Fear Level ({newFearLevel}/10)</label>
                <div className="flex space-x-2">
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={newFearLevel} 
                    onChange={(e) => setNewFearLevel(Number(e.target.value))}
                    className="flex-1 h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-orange-500 mt-3"
                  />
                  <button 
                    onClick={addItem}
                    disabled={!newAction}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm font-bold text-white disabled:opacity-50 self-center"
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

export default CourageInventory;
