"use client";

import React, { useEffect, useRef, useState } from 'react';
import { RitualEngine } from './RitualEngine';
import { RitualMode, RitualConfig, RITUAL_PRESETS } from './types';
import { 
    Focus, 
    Heart, 
    Sun, 
    Moon, 
    CloudRain, 
    Sparkles, 
    Settings, 
    Maximize, 
    Camera, 
    Play, 
    Pause,
    Volume2,
    VolumeX,
    Clock,
    Share2,
    Eye
} from 'lucide-react';

const AmbientRitual: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<RitualEngine | null>(null);
    const [config, setConfig] = useState<RitualConfig>(RITUAL_PRESETS.focus);
    const [showUI, setShowUI] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1500); // 25 mins for Focus

    useEffect(() => {
        if (!containerRef.current) return;
        
        engineRef.current = new RitualEngine(containerRef.current);
        engineRef.current.updateMode(config);
        engineRef.current.animate();

        return () => {
            engineRef.current?.dispose();
        };
    }, []);

    useEffect(() => {
        let timer: any;
        if (isPlaying && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    const updateMode = (mode: RitualMode) => {
        const newConfig = { ...RITUAL_PRESETS[mode] };
        setConfig(newConfig);
        engineRef.current?.updateMode(newConfig);
        
        // Context-aware timer defaults
        const times: Record<RitualMode, number> = {
            focus: 1500,     // 25m
            gratitude: 600,  // 10m
            morning: 1800,   // 30m
            sleep: 28800,    // 8h
            rainy: 3600,     // 1h
            romance: 3600    // 1h
        };
        setTimeLeft(times[mode]);
    };

    const updateParam = (key: keyof RitualConfig, val: any) => {
        const newConfig = { ...config, [key]: val };
        setConfig(newConfig);
        if (key === 'mode') {
            engineRef.current?.updateMode(newConfig);
        } else {
            engineRef.current?.setParams(newConfig);
        }
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        
        if (h > 0) {
            return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
        }
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const captureSnapshot = () => {
        const canvas = containerRef.current?.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = `ritual-${config.mode}-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans text-white/80">
            {/* Immersive Viewport */}
            <div ref={containerRef} className="absolute inset-0 z-0" />

            {/* Breathing Guide Layer */}
            {config.mode === 'gratitude' && isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-64 h-64 border border-white/5 rounded-full flex items-center justify-center animate-[ping_4s_infinite]">
                        <div className="w-48 h-48 border border-white/10 rounded-full flex items-center justify-center animate-[ping_4s_infinite_1s]">
                             <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Inhale • Hold • Exhale</span>
                        </div>
                    </div>
                </div>
            )}

            {/* UI Overlay */}
            <div className={`relative z-20 w-full h-full p-8 pb-32 flex flex-col justify-between pointer-events-none transition-all duration-1000 ${showUI ? 'opacity-100' : 'opacity-0 scale-105'}`}>
                
                {/* Header Section */}
                <header className="flex justify-between items-start">
                    <div className="flex items-center space-x-6 pointer-events-auto">
                        <div className="p-4 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl">
                            <Sparkles className="w-8 h-8 text-white animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-light tracking-tighter uppercase italic text-white/90">Ritual & Ambient</h1>
                            <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold mt-2">Intentional Environment Synthesis</p>
                        </div>
                    </div>

                    <div className="flex space-x-3 pointer-events-auto">
                        <button onClick={captureSnapshot} className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 transition-all">
                            <Camera size={20} />
                        </button>
                        <button onClick={() => setShowUI(false)} className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 transition-all">
                            <Eye size={20} />
                        </button>
                    </div>
                </header>

                {/* Main Dashboard */}
                <main className="flex justify-between items-end w-full">
                    
                    {/* Left: Mode Selection */}
                    <div className="flex flex-col space-y-6 pointer-events-auto">
                        <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl w-80">
                            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 mb-8 px-4">Select Ritual</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {(['focus', 'romance', 'gratitude', 'morning', 'sleep', 'rainy'] as RitualMode[]).map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => updateMode(m)}
                                        className={`flex flex-col items-center justify-center p-6 rounded-[2rem] transition-all border ${
                                            config.mode === m 
                                            ? 'bg-white/30 border-white/50 text-white shadow-xl scale-105' 
                                            : 'bg-white/10 border-white/10 text-white/40 hover:bg-white/20 hover:text-white/80'
                                        }`}
                                    >
                                        {m === 'focus' && <Focus size={20} className="mb-2" />}
                                        {m === 'romance' && <Heart size={20} className="mb-2" />}
                                        {m === 'gratitude' && <Sparkles size={20} className="mb-2" />}
                                        {m === 'morning' && <Sun size={20} className="mb-2" />}
                                        {m === 'sleep' && <Moon size={20} className="mb-2" />}
                                        {m === 'rainy' && <CloudRain size={20} className="mb-2" />}
                                        <span className="text-[9px] font-bold uppercase tracking-widest">{m}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center: Playback / Timer Controls */}
                    <div className="flex flex-col items-center pointer-events-auto mb-6">
                        <div className="flex items-center space-x-8 bg-white/5 backdrop-blur-3xl px-12 py-6 rounded-full border border-white/10 shadow-2xl">
                            <button onClick={() => setIsMuted(!isMuted)} className="text-white/40 hover:text-white transition-colors">
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                            <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center border border-white/20 transition-all transform hover:scale-110 active:scale-95"
                            >
                                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                            </button>
                            <div className="flex flex-col items-center min-w-[60px]">
                                <Clock size={20} className="text-white/20 mb-1" />
                                <span className="text-xl font-light tracking-widest tabular-nums">{formatTime(timeLeft)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Intensity & Calibration */}
                    <div className="flex flex-col space-y-6 pointer-events-auto">
                        <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl w-80">
                            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 mb-8 px-4">Calibration</h2>
                            <div className="space-y-8 py-2">
                                {[
                                    { label: 'Ambient Motion', key: 'speed', min: 0, max: 2 },
                                    { label: 'System Intensity', key: 'intensity', min: 0, max: 2 },
                                    { label: 'Atmospheric Fog', key: 'fogDensity', min: 0, max: 0.2 }
                                ].map((param) => (
                                    <div key={param.key} className="space-y-4 px-4">
                                        <div className="flex justify-between items-center text-[8px] uppercase tracking-[0.3em] font-bold text-white/30">
                                            <span>{param.label}</span>
                                            <span>{(config as any)[param.key].toFixed(2)}</span>
                                        </div>
                                        <input 
                                            type="range" min={param.min} max={param.max} step="0.01"
                                            value={(config as any)[param.key]}
                                            onChange={(e) => updateParam(param.key as any, parseFloat(e.target.value))}
                                            className="w-full accent-white/40 bg-white/5 h-1 rounded-full outline-none appearance-none cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer Status Bar */}
                <footer className="flex justify-between items-center text-[9px] uppercase tracking-[0.4em] font-bold text-white/20">
                    <div className="flex items-center space-x-12">
                        <div className="flex items-center space-x-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                            <span>System {isPlaying ? 'Active' : 'Standby'}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Settings className="w-3 h-3" />
                            <span>Session ID: {config.mode.toUpperCase()}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-8">
                        <Share2 size={14} className="hover:text-white cursor-pointer transition-colors" />
                        <span>Core Build v4.2.0</span>
                    </div>
                </footer>
            </div>

            {/* Toggle UI Hint */}
            {!showUI && (
                <button 
                    onClick={() => setShowUI(true)}
                    className="absolute top-12 right-12 z-30 p-4 bg-white/5 hover:bg-white/10 backdrop-blur-3xl rounded-2xl border border-white/10 transition-all text-white/40"
                >
                    <Maximize size={24} />
                </button>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.05); }
                }
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
                }
                ::-webkit-scrollbar { display: none; }
            `}} />
        </div>
    );
};

export default AmbientRitual;
