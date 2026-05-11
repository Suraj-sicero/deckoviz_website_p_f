"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Scissors
} from "lucide-react";

const AvoidedConversation: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [items, setItems] = useState<Array<{id: number, who: string, what: string, why: string}>>([
    { id: 1, who: "My Manager", what: "Discussing burnout and workload.", why: "Fear of being seen as incompetent." },
    { id: 2, who: "My Partner", what: "Talking about future financial goals.", why: "Fear of conflict or disagreement." }
  ]);
  const [newWho, setNewWho] = useState("");
  const [newWhat, setNewWhat] = useState("");
  const [newWhy, setNewWhy] = useState("");

  const addItem = () => {
    if (!newWho || !newWhat || !newWhy) return;
    setItems([...items, { id: items.length + 1, who: newWho, what: newWhat, why: newWhy }]);
    setNewWho("");
    setNewWhat("");
    setNewWhy("");
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-rose-500/10 to-stone-900/30 border border-rose-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <FileText size={32} className="text-rose-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Storytelling / Relational / Courage</span>
              <h1 className="text-4xl font-bold">Avoided Conversations</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Map the conversations you are avoiding. Identify who they are with, what they are about, and the underlying fear stopping you.
          </p>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-lg bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between"
              >
                <div className="flex flex-col mb-2 md:mb-0">
                  <span className="text-xs font-semibold text-rose-400 uppercase">{item.who}</span>
                  <span className="text-sm text-white font-serif mt-1">"{item.what}"</span>
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-semibold">Why avoided:</span> {item.why}
                </div>
              </div>
            ))}
          </div>

          {/* Add Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Add Avoided Conversation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">With Whom?</label>
                <input 
                  type="text" 
                  value={newWho} 
                  onChange={(e) => setNewWho(e.target.value)}
                  placeholder="e.g., My sibling"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">What is it about?</label>
                <input 
                  type="text" 
                  value={newWhat} 
                  onChange={(e) => setNewWhat(e.target.value)}
                  placeholder="e.g., The distribution of assets"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs text-gray-500 mb-1">Why are you avoiding it?</label>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    value={newWhy} 
                    onChange={(e) => setNewWhy(e.target.value)}
                    placeholder="e.g., Fear of causing a rift"
                    className="flex-1 bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                  />
                  <button 
                    onClick={addItem}
                    disabled={!newWho || !newWhat || !newWhy}
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-600 rounded-lg text-sm font-bold text-white disabled:opacity-50"
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

export default AvoidedConversation;
