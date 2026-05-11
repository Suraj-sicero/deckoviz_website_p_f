"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Archive
} from "lucide-react";

const AncestorTable: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [ancestors, setAncestors] = useState<Array<{name: string, relation: string, trait: string, story: string}>>([
    { name: "Eleanor", relation: "Grandmother", trait: "Resilience", story: "Built a home from scratch after the fire." },
    { name: "Arthur", relation: "Great Uncle", trait: "Curiosity", story: "Traveled the seas and collected maps." }
  ]);
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState("");
  const [newTrait, setNewTrait] = useState("");
  const [newStory, setNewStory] = useState("");

  const addAncestor = () => {
    if (!newName || !newRelation || !newTrait || !newStory) return;
    setAncestors([...ancestors, { name: newName, relation: newRelation, trait: newTrait, story: newStory }]);
    setNewName("");
    setNewRelation("");
    setNewTrait("");
    setNewStory("");
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-stone-500/10 to-stone-900/30 border border-stone-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Users size={32} className="text-stone-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Creative / Storytelling / Lineage</span>
              <h1 className="text-4xl font-bold">The Ancestor Table</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Record the traits and stories of those who came before you. Build a table of lineage and legacy.
          </p>

          {/* Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase bg-white/5 text-stone-400">
                <tr>
                  <th className="px-6 py-3 rounded-tl-lg">Name</th>
                  <th className="px-6 py-3">Relation</th>
                  <th className="px-6 py-3">Key Trait</th>
                  <th className="px-6 py-3 rounded-tr-lg">Story</th>
                </tr>
              </thead>
              <tbody>
                {ancestors.map((ancestor, idx) => (
                  <tr key={idx} className="bg-black/20 border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">{ancestor.name}</td>
                    <td className="px-6 py-4">{ancestor.relation}</td>
                    <td className="px-6 py-4 text-stone-300">{ancestor.trait}</td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{ancestor.story}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Add Ancestor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Relation</label>
                <input 
                  type="text" 
                  value={newRelation} 
                  onChange={(e) => setNewRelation(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Key Trait</label>
                <input 
                  type="text" 
                  value={newTrait} 
                  onChange={(e) => setNewTrait(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Story</label>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    value={newStory} 
                    onChange={(e) => setNewStory(e.target.value)}
                    className="flex-1 bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                  />
                  <button 
                    onClick={addAncestor}
                    disabled={!newName || !newRelation || !newTrait || !newStory}
                    className="px-4 py-2 bg-stone-500 hover:bg-stone-600 rounded-lg text-sm font-bold disabled:opacity-50"
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

export default AncestorTable;
