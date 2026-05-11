"use client";

import React, { useState, useEffect, useRef } from "react";
import PixelatedBackground from "./PixelatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Moon, Wind, Home, BookOpen, Clock, Sparkles, 
  ArrowRight, Play, Pause, RefreshCw, Settings, Music
} from "lucide-react";

const NightlyRitual: React.FC = () => {
  const [variant, setVariant] = useState<'glacial' | 'volcano' | 'forest' | 'nebula'>('nebula');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'deactivation' | 'settling' | 'deepening' | 'completion'>('idle');
  const [duration, setDuration] = useState(20); // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [journalEnabled, setJournalEnabled] = useState(true);
  const [soundscape, setSoundscape] = useState('ambient.mp3');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const prompts = [
    "What can you leave unfinished tonight?",
    "What is one thing that went well today?",
    "What are you grateful for in this moment?",
    "What can you let go of before sleep?"
  ];
  const [currentPrompt, setCurrentPrompt] = useState("");

  const closingLines = [
    "The day is complete.",
    "You did enough.",
    "Rest is not a reward.",
    "Tomorrow is another day."
  ];
  const [currentClosing, setCurrentClosing] = useState("");

  const soundOptions = [
    { name: "Ambient 1", file: "ambient.mp3" },
    { name: "Ambient 2", file: "ambient2.mp3" },
    { name: "Ambient 3", file: "ambient3.mp3" },
    { name: "Ambient 4", file: "ambient4.mp3" },
    { name: "Ambient 5", file: "ambient5.mp3" },
    { name: "Ambient 6", file: "ambient6.mp3" },
    { name: "Ambient 7", file: "ambient7.mp3" },
    { name: "Ambient 8", file: "ambient8.mp3" },
  ];

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setPhase('completion');
      setCurrentClosing(closingLines[Math.floor(Math.random() * closingLines.length)]);
      if (audioRef.current) audioRef.current.pause();
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  // Phase management based on time left
  useEffect(() => {
    if (!isActive) return;

    const totalSeconds = duration * 60;
    const percentage = (timeLeft / totalSeconds) * 100;

    if (percentage > 75) {
      setPhase('deactivation');
    } else if (percentage > 40) {
      setPhase('settling');
      if (journalEnabled && !currentPrompt && percentage < 70) {
        setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
      }
    } else if (percentage > 10) {
      setPhase('deepening');
      setCurrentPrompt(""); // Fade out prompt
    } else {
      setPhase('completion');
    }
  }, [timeLeft, isActive, duration, journalEnabled]);

  // Audio control
  useEffect(() => {
    if (isActive) {
      if (audioRef.current) {
        audioRef.current.src = `/sounds/${soundscape}`;
        audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [isActive, soundscape]);

  const startRitual = () => {
    setIsActive(true);
    setTimeLeft(duration * 60);
    setPhase('deactivation');
    setCurrentPrompt("");
    setCurrentClosing("");
  };

  const stopRitual = () => {
    setIsActive(false);
    setPhase('idle');
    setTimeLeft(duration * 60);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getBackgroundStyle = () => {
    switch (phase) {
      case 'deactivation':
        return "bg-gradient-to-br from-amber-950 to-stone-900";
      case 'settling':
        return "bg-gradient-to-br from-orange-950 to-stone-950";
      case 'deepening':
        return "bg-gradient-to-br from-red-950 to-black";
      case 'completion':
        return "bg-black";
      default:
        return "bg-[#050505]";
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundStyle()} text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000`}>
      {phase === 'idle' && <PixelatedBackground variant={variant} />}

      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop />

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
              className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 to-purple-900/30 border border-amber-500/20 backdrop-blur-md"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/5">
                  <Moon size={32} className="text-amber-400" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Mood-Setting / Evening</span>
                  <h1 className="text-4xl font-bold">The Nightly Ritual</h1>
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Configure your ceremonial wind-down experience. The ritual will guide your nervous system from activated to settled.
              </p>

              {/* Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                    <option value={60}>60 Minutes</option>
                  </select>
                </div>

                <div className="p-6 rounded-xl bg-black/40 border border-white/5">
                  <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                    <Music size={16} /> Soundscape
                  </label>
                  <select 
                    value={soundscape} 
                    onChange={(e) => setSoundscape(e.target.value)}
                    className="w-full bg-stone-800 border border-white/10 rounded-lg p-2 text-white"
                  >
                    {soundOptions.map((option) => (
                      <option key={option.file} value={option.file}>{option.name}</option>
                    ))}
                  </select>
                </div>

                <div className="p-6 rounded-xl bg-black/40 border border-white/5">
                  <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                    <BookOpen size={16} /> Journal Prompt
                  </label>
                  <div className="flex items-center space-x-4 mt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={journalEnabled} 
                        onChange={(e) => setJournalEnabled(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-amber-500 rounded bg-stone-800 border-white/10"
                      />
                      <span>Enable random prompt</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={startRitual}
                  className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-amber-500 hover:bg-amber-600 text-black transition-all duration-300 transform hover:scale-105 shadow-[0_4px_20px_rgba(245,158,11,0.3)]"
                >
                  Begin Ritual <Play size={18} />
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
              {/* Breathing Guide */}
              {phase !== 'completion' && (
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.4, 0.1]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute w-[300px] h-[300px] bg-amber-500 rounded-full blur-3xl -z-10"
                />
              )}

              {/* HUD */}
              <div className="absolute top-0 right-0 p-6 text-sm text-gray-300 bg-black/50 rounded-bl-xl border-l border-b border-white/10">
                <span className="font-mono text-lg text-white">{formatTime(timeLeft)}</span>
                <span className="mx-2">|</span>
                <span className="capitalize text-amber-400 font-semibold">{phase}</span>
              </div>

              {/* Content */}
              <div className="max-w-3xl mx-auto mt-20">
                {phase === 'deactivation' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h2 className="text-5xl font-bold text-white mb-4">
                      Decompressing...
                    </h2>
                    <p className="text-xl text-gray-300 font-light">
                      Let go of the day's momentum. Breathe out.
                    </p>
                  </motion.div>
                )}

                {phase === 'settling' && (
                  <div>
                    <motion.h2 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-3xl font-light text-amber-200 mb-6"
                    >
                      Settling In
                    </motion.h2>
                    {currentPrompt && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-serif text-white leading-relaxed"
                      >
                        "{currentPrompt}"
                      </motion.p>
                    )}
                  </div>
                )}

                {phase === 'deepening' && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-light text-gray-200"
                  >
                    Focus on your breath. Let the world fade away.
                  </motion.p>
                )}

                {phase === 'completion' && (
                  <div className="text-center">
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2 }}
                      className="text-5xl font-serif font-light text-white mb-8"
                    >
                      {currentClosing}
                    </motion.p>
                    <button 
                      onClick={stopRitual}
                      className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm text-white"
                    >
                      <RefreshCw size={14} /> Return
                    </button>
                  </div>
                )}
              </div>

              {/* Controls */}
              {phase !== 'completion' && (
                <div className="mt-auto pt-20 flex space-x-4">
                  <button 
                    onClick={() => setIsActive(!isActive)}
                    className="p-4 rounded-full bg-black/50 border border-white/10 hover:bg-white/10 transition-colors text-white"
                  >
                    {isActive ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <button 
                    onClick={stopRitual}
                    className="p-4 rounded-full bg-black/50 border border-white/10 hover:bg-white/10 transition-colors text-white"
                  >
                    <RefreshCw size={24} />
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

export default NightlyRitual;
