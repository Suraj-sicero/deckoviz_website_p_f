"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Users, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Sparkles
} from "lucide-react";

const InnerCouncil: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [parts, setParts] = useState<Array<{name: string, role: string, message: string}>>([
    { name: "The Critic", role: "Protection via perfection", message: "You must not make mistakes, or you will be rejected." },
    { name: "The Child", role: "Vulnerability and play", message: "I just want to explore and feel safe." },
    { name: "The Achiever", role: "Validation via action", message: "We must keep moving, keep doing, keep winning." }
  ]);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const addPart = () => {
    if (!newName || !newRole || !newMessage) return;
    setParts([...parts, { name: newName, role: newRole, message: newMessage }]);
    setNewName("");
    setNewRole("");
    setNewMessage("");
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
              <Users size={32} className="text-purple-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Creative / Psychological / Parts Work</span>
              <h1 className="text-4xl font-bold">The Inner Council</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Meet and map the parts of yourself. The inner critic, the inner child, the achiever—they all have a voice and a purpose.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {parts.map((part, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between min-h-[150px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-purple-400">{part.name}</span>
                    <span className="text-xs text-gray-600 truncate max-w-[100px]">{part.role}</span>
                  </div>
                  <p className="text-xs font-serif text-gray-300 leading-relaxed">
                    "{part.message}"
                  </p>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Active in current profile.
                </div>
              </div>
            ))}
          </div>

          {/* Add Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Add Council Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Part Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g., The Rebel"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Role/Purpose</label>
                <input 
                  type="text" 
                  value={newRole} 
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="e.g., Seeking freedom"
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs text-gray-500 mb-1">Core Message</label>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="What does this part say?"
                    className="flex-1 bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                  />
                  <button 
                    onClick={addPart}
                    disabled={!newName || !newRole || !newMessage}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm font-bold text-white disabled:opacity-50"
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

export default InnerCouncil;
