"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Split
} from "lucide-react";

const ParallelLives: React.FC = () => {
    const navigate = useNavigate();
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [pathA, setPathA] = useState<Array<{age: number, event: string}>>([
    { age: 18, event: "Went to university for engineering." },
    { age: 25, event: "Started working at a large tech company." }
  ]);
  const [pathB, setPathB] = useState<Array<{age: number, event: string}>>([
    { age: 18, event: "Traveled the world for a year." },
    { age: 25, event: "Started a small organic farm." }
  ]);
  const [newAge, setNewAge] = useState(30);
  const [newEvent, setNewEvent] = useState("");
  const [selectedPath, setSelectedPath] = useState<'A' | 'B'>('A');

  const addEvent = () => {
    if (!newEvent) return;
    const item = { age: newAge, event: newEvent };
    if (selectedPath === 'A') {
      setPathA([...pathA, item].sort((a, b) => a.age - b.age));
    } else {
      setPathB([...pathB, item].sort((a, b) => a.age - b.age));
    }
    setNewEvent("");
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-violet-500/10 to-stone-900/30 border border-violet-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Split size={32} className="text-violet-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Creative / Storytelling / Exploration</span>
              <h1 className="text-4xl font-bold">Parallel Lives</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Compare alternative life paths. Add events to either timeline to explore where different choices might have led.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Path A */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/5">
              <h3 className="text-sm font-semibold text-violet-400 mb-4 uppercase tracking-wider">Path A: The Conventional</h3>
              <div className="space-y-4">
                {pathA.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-sm">
                    <span className="font-mono text-gray-500">Age {item.age}</span>
                    <p className="text-gray-300">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Path B */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/5">
              <h3 className="text-sm font-semibold text-emerald-400 mb-4 uppercase tracking-wider">Path B: The Alternative</h3>
              <div className="space-y-4">
                {pathB.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-sm">
                    <span className="font-mono text-gray-500">Age {item.age}</span>
                    <p className="text-gray-300">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Input Form */}
          <div className="p-6 rounded-xl bg-black/40 border border-white/5 mb-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Add Event</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Path</label>
                <select 
                  value={selectedPath} 
                  onChange={(e) => setSelectedPath(e.target.value as 'A' | 'B')}
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                >
                  <option value="A">Path A</option>
                  <option value="B">Path B</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Age</label>
                <input 
                  type="number" 
                  value={newAge} 
                  onChange={(e) => setNewAge(Number(e.target.value))}
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Event</label>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    value={newEvent} 
                    onChange={(e) => setNewEvent(e.target.value)}
                    placeholder="Describe the event..."
                    className="flex-1 bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                  />
                  <button 
                    onClick={addEvent}
                    disabled={!newEvent}
                    className="px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-lg text-sm font-bold disabled:opacity-50"
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

export default ParallelLives;
