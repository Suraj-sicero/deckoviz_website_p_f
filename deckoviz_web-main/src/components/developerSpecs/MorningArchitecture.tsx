"use client";

import React, { useState, useEffect } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, Wind, Home, BookOpen, Clock, Sparkles, 
  ArrowRight, Play, Pause, RefreshCw, Zap
} from "lucide-react";

const MorningArchitecture: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'awakening' | 'alignment' | 'focus' | 'launch'>('idle');
  const [duration, setDuration] = useState(20); // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [soundscape, setSoundscape] = useState('birds');

  const intentions = [
    "Today, I will focus on completion.",
    "Today, I will practice patience.",
    "Today, I will create without judgment.",
    "Today, I will be present with others."
  ];
  const [currentIntention, setCurrentIntention] = useState("");

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setPhase('launch');
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  // Phase management
  useEffect(() => {
    if (!isActive) return;

    const totalSeconds = duration * 60;
    const percentage = (timeLeft / totalSeconds) * 100;

    if (percentage > 80) {
      setPhase('awakening');
    } else if (percentage > 50) {
      setPhase('alignment');
      if (!currentIntention) {
        setCurrentIntention(intentions[Math.floor(Math.random() * intentions.length)]);
      }
    } else if (percentage > 10) {
      setPhase('focus');
    } else {
      setPhase('launch');
    }
  }, [timeLeft, isActive, duration]);

  const startRitual = () => {
    setIsActive(true);
    setTimeLeft(duration * 60);
    setPhase('awakening');
    setCurrentIntention("");
  };

  const stopRitual = () => {
    setIsActive(false);
    setPhase('idle');
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getBackgroundStyle = () => {
    switch (phase) {
      case 'awakening':
        return "bg-gradient-to-br from-amber-900/20 to-stone-900";
      case 'alignment':
        return "bg-gradient-to-br from-yellow-800/20 to-stone-800";
      case 'focus':
        return "bg-gradient-to-br from-sky-900/20 to-stone-900";
      case 'launch':
        return "bg-gradient-to-br from-blue-900/30 to-black";
      default:
        return "bg-[#050505]";
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundStyle()} text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000`}>
      {phase === 'idle' && <PixelatedBackground variant={variant} />}

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-8">
          <a href="/deckoviz-storytelling" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowRight size={16} className="transform rotate-180" /> Back to Storytelling
          </a>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'idle' ? (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-orange-900/30 border border-yellow-500/20 backdrop-blur-md"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/5">
                  <Sun size={32} className="text-yellow-400" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Mood-Setting / Morning</span>
                  <h1 className="text-4xl font-bold">The Morning Architecture</h1>
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Design your awakening. This practice guides you from sleep to high-agency focus through a controlled sensory sequence.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-xl bg-black/40 border border-white/5">
                  <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                    <Clock size={16} /> Duration
                  </label>
                  <select 
                    value={duration} 
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white"
                  >
                    <option value={1}>1 Minute (Test)</option>
                    <option value={20}>20 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                  </select>
                </div>

                <div className="p-6 rounded-xl bg-black/40 border border-white/5">
                  <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                    <Wind size={16} /> Soundscape
                  </label>
                  <select 
                    value={soundscape} 
                    onChange={(e) => setSoundscape(e.target.value)}
                    className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white"
                  >
                    <option value="birds">Morning Birds</option>
                    <option value="ambient">Warm Ambient</option>
                    <option value="focus">Focus Beats</option>
                    <option value="silence">Silence</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={startRitual}
                  className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-yellow-500 hover:bg-yellow-600 text-black transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(245,158,11,0.3)]"
                >
                  Begin Awakening <Play size={18} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              {/* Light Source Simulation */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-[500px] h-[500px] bg-yellow-300 rounded-full blur-3xl -z-10"
              />

              <div className="absolute top-0 right-0 p-4 text-sm text-gray-500">
                {formatTime(timeLeft)} | Phase: <span className="capitalize text-yellow-400">{phase}</span>
              </div>

              <div className="max-w-2xl mx-auto mt-20">
                {phase === 'awakening' && (
                  <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-light text-yellow-200 mb-4"
                  >
                    Gently Waking...
                  </motion.h2>
                )}

                {phase === 'alignment' && (
                  <div>
                    <motion.h2 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-2xl font-light text-yellow-200 mb-4"
                    >
                      Setting Intention
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-3xl font-serif text-white/80 leading-relaxed"
                    >
                      "{currentIntention}"
                    </motion.p>
                  </div>
                )}

                {phase === 'focus' && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-light text-gray-300"
                  >
                    Sharpening focus. Ready for the day.
                  </motion.p>
                )}

                {phase === 'launch' && (
                  <div className="text-center">
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-4xl font-bold text-white mb-8"
                    >
                      You are ready.
                    </motion.p>
                    <button 
                      onClick={stopRitual}
                      className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-sm"
                    >
                      <RefreshCw size={14} /> Reset
                    </button>
                  </div>
                )}
              </div>

              {phase !== 'launch' && (
                <div className="mt-auto pt-20 flex space-x-4">
                  <button 
                    onClick={() => setIsActive(!isActive)}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {isActive ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button 
                    onClick={stopRitual}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MorningArchitecture;
