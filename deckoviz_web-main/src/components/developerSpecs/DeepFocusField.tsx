"use client";

import React, { useState, useEffect } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Clock, Wind, RefreshCw, ArrowRight, Play, Pause, Shield
} from "lucide-react";

const DeepFocusField: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins default
  const [distractions, setDistractions] = useState(0);
  const [soundscape, setSoundscape] = useState('binaural');

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      alert("Focus session complete!");
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    setDistractions(0);
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
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 to-stone-900/30 border border-blue-500/20 backdrop-blur-md"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5">
              <Zap size={32} className="text-blue-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Psychological / Focus / State Setting</span>
              <h1 className="text-4xl font-bold">Deep Focus Field</h1>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Create a dedicated field of attention. This practice helps you enter and maintain a state of deep focus.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Timer Display */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center min-h-[150px]">
              <span className="text-5xl font-mono font-bold text-white mb-2">
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Time Remaining</span>
            </div>

            {/* Soundscape Selector */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                  <Wind size={14} /> Soundscape
                </label>
                <select 
                  value={soundscape} 
                  onChange={(e) => setSoundscape(e.target.value)}
                  className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white text-sm"
                >
                  <option value="binaural">Binaural Beats</option>
                  <option value="pink">Pink Noise</option>
                  <option value="brown">Brown Noise</option>
                  <option value="silence">Absolute Silence</option>
                </select>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Simulated audio output.
              </div>
            </div>

            {/* Distraction Counter */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center min-h-[150px]">
              <span className="text-5xl font-mono font-bold text-amber-400 mb-2">
                {distractions}
              </span>
              <button 
                onClick={() => setDistractions(prev => prev + 1)}
                className="text-xs text-gray-400 hover:text-white uppercase tracking-wider border border-white/10 px-3 py-1 rounded-full transition-colors"
              >
                Log Distraction
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <Shield size={16} className="text-blue-400" /> Distraction shield active
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={resetTimer}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <RefreshCw size={20} />
              </button>
              <button 
                onClick={() => setIsActive(!isActive)}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-blue-500 hover:bg-blue-600 text-black transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(59,130,246,0.3)]"
              >
                {isActive ? (
                  <>Pause <Pause size={18} /></>
                ) : (
                  <>Begin Session <Play size={18} /></>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DeepFocusField;
