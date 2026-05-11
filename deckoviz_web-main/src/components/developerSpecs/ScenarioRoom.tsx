"use client";

import React, { useState } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sliders, BookOpen, PenTool, RefreshCw, ArrowRight, Play, Shield
} from "lucide-react";

const ScenarioRoom: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [scenario, setScenario] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const [newChoice, setNewChoice] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState("");

  const addChoice = () => {
    if (!newChoice) return;
    setChoices([...choices, newChoice]);
    setNewChoice("");
  };

  const runSimulation = () => {
    if (!scenario || choices.length === 0) return;
    setIsSimulating(true);
    setResult("");
    
    // Simulate API call
    setTimeout(() => {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      setResult(`Based on the scenario "${scenario}", choosing to "${randomChoice}" leads to a cascade of events that shifts the balance of power. The immediate outcome is uncertain, but the path is now set.`);
      setIsSimulating(false);
    }, 2000);
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gray-500/10 to-stone-900/30 border border-gray-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Sliders size={32} className="text-gray-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Storytelling / Simulation / Strategy</span>
              <h1 className="text-4xl font-bold">The Scenario Room</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Test scenarios and explore outcomes. Define a situation and the choices available to see a simulated projection.
          </p>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-1">The Scenario:</label>
              <textarea 
                value={scenario} 
                onChange={(e) => setScenario(e.target.value)}
                placeholder="Describe the situation or problem..."
                className="w-full bg-stone-800 border border-white/10 rounded-lg p-3 text-white text-sm min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-1">Choices / Options:</label>
              <div className="flex space-x-2 mb-2">
                <input 
                  type="text" 
                  value={newChoice} 
                  onChange={(e) => setNewChoice(e.target.value)}
                  placeholder="Add a possible choice..."
                  className="flex-1 bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                />
                <button 
                  onClick={addChoice}
                  disabled={!newChoice}
                  className="px-4 py-2 bg-stone-600 hover:bg-stone-700 rounded-lg text-sm font-bold disabled:opacity-50"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1">
                {choices.map((choice, idx) => (
                  <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="text-gray-600">•</span> {choice}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end mb-8">
            <button 
              onClick={runSimulation}
              disabled={!scenario || choices.length === 0 || isSimulating}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-gray-500 hover:bg-gray-600 text-white transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(100,116,139,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSimulating ? (
                <>Simulating... <RefreshCw size={18} className="animate-spin" /></>
              ) : (
                <>Run Simulation <Play size={18} /></>
              )}
            </button>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-8 rounded-xl bg-black/60 border border-gray-500/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={16} className="text-gray-400" />
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Simulation Result</h3>
                </div>
                <p className="text-lg font-serif text-white/90 leading-relaxed">
                  {result}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ScenarioRoom;
