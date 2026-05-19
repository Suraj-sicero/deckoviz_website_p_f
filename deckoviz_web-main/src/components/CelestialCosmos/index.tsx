import React, { useEffect, useRef, useState } from 'react';
import { CelestialEngine } from './CelestialEngine';
import { CosmicMode, CosmicConfig, MODE_DEFAULTS } from './types';
import { useNavigate } from 'react-router-dom';
import { 
    Cloud, 
    Orbit, 
    Circle, 
    Zap, 
    Sun, 
    Settings, 
    Play, 
    Maximize, 
    Camera, 
    Layers,
    Activity,
    Info
} from 'lucide-react';

const CelestialCosmos: React.FC = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<CelestialEngine | null>(null);
    const [config, setConfig] = useState<CosmicConfig>(MODE_DEFAULTS.nebula);
    const [showUI, setShowUI] = useState(true);
    const [activeTab, setActiveTab] = useState<'mode' | 'settings'>('mode');

    useEffect(() => {
        if (!containerRef.current) return;
        
        engineRef.current = new CelestialEngine(containerRef.current);
        engineRef.current.updateMode(config);
        engineRef.current.animate();

        return () => {
            engineRef.current?.dispose();
        };
    }, []);

    const updateMode = (mode: CosmicMode) => {
        const newConfig = { ...MODE_DEFAULTS[mode] };
        setConfig(newConfig);
        engineRef.current?.updateMode(newConfig);
    };

    const updateParam = (key: keyof CosmicConfig, val: any) => {
        const newConfig = { ...config, [key]: val };
        setConfig(newConfig);
        if (key === 'mode') {
            engineRef.current?.updateMode(newConfig);
        } else {
            engineRef.current?.setParams(newConfig);
        }
    };

    const captureFrame = () => {
        const canvas = containerRef.current?.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = `celestial-${config.mode}-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-[#020205] overflow-hidden font-sans text-white">
            {/* Engine Viewport */}
            <div ref={containerRef} className="absolute inset-0 z-0" />

            {/* Background Narrative Layers */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-radial from-indigo-500/10 via-transparent to-transparent animate-pulse" />
            </div>

            {/* UI Layer */}
            <div className={`relative z-20 w-full h-full p-8 flex flex-col justify-between pointer-events-none transition-all duration-1000 ${showUI ? 'opacity-100' : 'opacity-0 scale-105'}`}>
                
                {/* Header Section */}
                <header className="flex justify-between items-start">
                    <div className="flex items-center space-x-4 pointer-events-auto">
                        <div className="p-4 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                            <Activity className="w-10 h-10 text-indigo-400 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Celestial & Cosmic</h1>
                            <p className="text-[10px] uppercase tracking-[0.5em] text-indigo-300 font-bold mt-2">Deep Space Observation Protocol v4.0</p>
                        </div>
                    </div>

                    <div className="flex space-x-2 pointer-events-auto">
                        <button onClick={captureFrame} className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 transition-all text-indigo-400">
                            <Camera size={20} />
                        </button>
                        <button onClick={() => setShowUI(false)} className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 transition-all">
                            <Maximize size={20} />
                        </button>
                    </div>
                </header>

                {/* Main Content & Controls */}
                <main className="flex justify-between items-end">
                    
                    {/* Left: Mode Selection */}
                    <div className="flex flex-col space-y-6 pointer-events-auto">
                        <div className="bg-black/60 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl w-72">
                            <div className="flex space-x-4 mb-8">
                                <button 
                                    onClick={() => setActiveTab('mode')}
                                    className={`text-[10px] font-bold uppercase tracking-widest pb-2 border-b-2 transition-all ${activeTab === 'mode' ? 'border-indigo-500 text-white' : 'border-transparent text-white/30'}`}
                                >
                                    Experience
                                </button>
                                <button 
                                    onClick={() => setActiveTab('settings')}
                                    className={`text-[10px] font-bold uppercase tracking-widest pb-2 border-b-2 transition-all ${activeTab === 'settings' ? 'border-indigo-500 text-white' : 'border-transparent text-white/30'}`}
                                >
                                    Calibration
                                </button>
                            </div>

                            {activeTab === 'mode' ? (
                                <div className="space-y-3">
                                    {(['nebula', 'orbits', 'blackhole', 'meteors', 'starbirth'] as CosmicMode[]).map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => updateMode(m)}
                                            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all border ${
                                                config.mode === m 
                                                ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)]' 
                                                : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{m}</span>
                                            {m === 'nebula' && <Cloud size={14} />}
                                            {m === 'orbits' && <Orbit size={14} />}
                                            {m === 'blackhole' && <Circle size={14} />}
                                            {m === 'meteors' && <Zap size={14} />}
                                            {m === 'starbirth' && <Sun size={14} />}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-8 py-2">
                                    {[
                                        { label: 'Intensity', key: 'intensity', min: 0, max: 2 },
                                        { label: 'Flow Speed', key: 'speed', min: 0.1, max: 5 },
                                        { label: 'Density', key: 'density', min: 0, max: 1 },
                                        { label: 'Bloom', key: 'bloomStrength', min: 0, max: 5 }
                                    ].map((param) => (
                                        <div key={param.key} className="space-y-4">
                                            <div className="flex justify-between items-center text-[9px] uppercase tracking-widest font-bold text-white/40">
                                                <span>{param.label}</span>
                                                <span className="text-indigo-400">{(config as any)[param.key].toFixed(2)}</span>
                                            </div>
                                            <input 
                                                type="range" min={param.min} max={param.max} step="0.01"
                                                value={(config as any)[param.key]}
                                                onChange={(e) => updateParam(param.key as any, parseFloat(e.target.value))}
                                                className="w-full accent-indigo-500 bg-white/10 h-1 rounded-full outline-none"
                                            />
                                        </div>
                                    ))}
                                    <button 
                                        onClick={() => updateParam('driftEnabled', !config.driftEnabled)}
                                        className={`w-full py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${config.driftEnabled ? 'bg-indigo-500 text-white' : 'bg-white/5 text-white/30'}`}
                                    >
                                        Auto Camera Drift: {config.driftEnabled ? 'ON' : 'OFF'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Mode Description */}
                    <div className="flex flex-col space-y-6 pointer-events-auto max-w-sm">
                        <div className="bg-black/60 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Info size={100} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-4">Observation Data</h3>
                                <p className="text-sm text-white/60 leading-relaxed font-light">
                                    {config.mode === 'nebula' && "Volumetric noise synthesis simulating gaseous nebulae. These massive clouds of interstellar dust and gas are the stellar nurseries where new stars are born."}
                                    {config.mode === 'orbits' && "Real-time gravity simulation showing planetary alignment and orbital trajectories. Observe the harmonious dance of celestial bodies governed by Newtonian physics."}
                                    {config.mode === 'blackhole' && "Simulating the intense gravitational lensing effect of a supermassive black hole. Watch as light bends around the event horizon, forming a brilliant accretion disk."}
                                    {config.mode === 'meteors' && "Fast-moving debris trails entering the atmosphere. These cosmic nomads create brilliant streak patterns as they burn up in high-velocity transit."}
                                    {config.mode === 'starbirth' && "Visualizing the collapse of molecular clouds into a stellar core. Witness the high-energy contraction phase leading to nuclear fusion and star formation."}
                                </p>
                                <div className="mt-8 flex items-center space-x-3 text-indigo-400">
                                    <div className="w-12 h-1 bg-indigo-500 rounded-full" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Spectral Analysis Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer Controls Overlay */}
                <footer className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-white/20">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>System Stable</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Layers className="w-4 h-4" />
                            <span>Mode: {config.mode}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Settings className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                        <span>Build v4.11.0.X</span>
                    </div>
                </footer>
            </div>

            {/* Toggle Overlay Hint */}
            {!showUI && (
                <button 
                    onClick={() => setShowUI(true)}
                    className="absolute top-8 right-8 z-30 p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 transition-all text-white"
                >
                    <Settings size={20} />
                </button>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                input[type='range'] {
                    -webkit-appearance: none;
                    height: 4px;
                    border-radius: 2px;
                }
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #6366f1;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
                }
                .bg-gradient-radial {
                    background-image: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
                }
            `}} />
        
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

export default CelestialCosmos;
