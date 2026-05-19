"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Users, BookOpen, PenTool, RefreshCw, ArrowRight, Play, FileText
} from "lucide-react";

const CharacterWitness: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [witnesses, setWitnesses] = useState<Array<{name: string, relationship: string, statement: string}>>([
    { name: "Sarah", relationship: "Childhood Friend", statement: "They are the kind of person who stops to help a stranger in the rain, even when they're late." },
    { name: "David", relationship: "Former Colleague", statement: "Under pressure, they remain calm and focused. They always give credit where it's due." }
  ]);
  const [newName, setNewName] = useState("");
  const [newRelationship, setNewRelationship] = useState("");
  const [newStatement, setNewStatement] = useState("");

  const addWitness = () => {
    if (!newName || !newRelationship || !newStatement) return;
    setWitnesses([...witnesses, { name: newName, relationship: newRelationship, statement: newStatement }]);
    setNewName("");
    setNewRelationship("");
    setNewStatement("");
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
              <Users size={32} className="text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Storytelling / Identity / Reflection</span>
              <h1 className="text-4xl font-bold">The Character Witness</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Document statements from those who know your true character. Build a collection of testimonies that reflect who you are.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {witnesses.map((witness, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-amber-400">{witness.name}</span>
                  <span className="text-xs text-gray-500">{witness.relationship}</span>
                </div>
                <p className="text-sm font-serif text-gray-300 leading-relaxed">
                  "{witness.statement}"
                </p>
              </div>
            ))}
          </div>

          {/* Add Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Add Witness Statement</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <label className="block text-xs text-gray-500 mb-1">Relationship</label>
                <input 
                  type="text" 
                  value={newRelationship} 
                  onChange={(e) => setNewRelationship(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs text-gray-500 mb-1">Statement</label>
                <div className="flex space-x-2">
                  <textarea 
                    value={newStatement} 
                    onChange={(e) => setNewStatement(e.target.value)}
                    placeholder="What would this person say about you?"
                    className="flex-1 bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm min-h-[60px]"
                  />
                  <button 
                    onClick={addWitness}
                    disabled={!newName || !newRelationship || !newStatement}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-sm font-bold text-black self-end disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
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

export default CharacterWitness;
