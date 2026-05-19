import React, { useEffect, useRef, useState } from 'react';
import { SimulationEngine } from './SimulationEngine';
import { OrganismType, OrganismConfig, ORGANISM_DEFAULTS } from './types';
import { useNavigate } from 'react-router-dom';
import { 
    Bug, 
    Waves, 
    Zap, 
    Ghost, 
    Settings, 
    Maximize, 
    Camera, 
    RotateCcw,
    Activity,
    Layers,
    Info,
    Move,
    UserPlus,
    Share2,
    Eye
} from 'lucide-react';

const OrganismSim: React.FC = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<SimulationEngine | null>(null);
    const [config, setConfig] = useState<OrganismConfig>(ORGANISM_DEFAULTS.insect);
    const [showUI, setShowUI] = useState(true);
    const [activeTab, setActiveTab] = useState<'creature' | 'behavior'>('creature');

    useEffect(() => {
        if (!containerRef.current) return;
        
        engineRef.current = new SimulationEngine(containerRef.current);
        engineRef.current.updateConfig(config);
        engineRef.current.animate();

        return () => {
            engineRef.current?.dispose();
        };
    }, []);

    const updateType = (type: OrganismType) => {
        const newConfig = { ...ORGANISM_DEFAULTS[type] };
        setConfig(newConfig);
        engineRef.current?.updateConfig(newConfig);
    };

    const updateParam = (key: keyof OrganismConfig, val: any) => {
        const newConfig = { ...config, [key]: val };
        setConfig(newConfig);
        if (key === 'type' || key === 'population' || key === 'environment') {
            engineRef.current?.updateConfig(newConfig);
        } else {
            engineRef.current?.setParams(newConfig);
        }
    };

    const captureFrame = () => {
        const canvas = containerRef.current?.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = `organism-sim-${config.type}-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans text-white/80">
            {/* Viewport */}
            <div ref={containerRef} className="absolute inset-0 z-0" />

            {/* UI Layer */}
            <div className={`relative z-10 w-full h-full p-10 flex flex-col justify-between pointer-events-none transition-all duration-1000 ${showUI ? 'opacity-100' : 'opacity-0 scale-105'}`}>
                
                {/* Header Section */}
                <header className="flex justify-between items-start">
                    <div className="flex items-center space-x-5 pointer-events-auto">
                        <div className="p-4 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl">
                            <Activity className="w-8 h-8 text-emerald-400 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Organism Simulation</h1>
                            <p className="text-[10px] uppercase tracking-[0.5em] text-emerald-400 font-bold mt-2">Artificial Life Engine v3.1</p>
                        </div>
                    </div>

                    <div className="flex space-x-3 pointer-events-auto">
                        <button onClick={captureFrame} className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 transition-all text-emerald-400">
                            <Camera size={20} />
                        </button>
                        <button onClick={() => setShowUI(false)} className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 transition-all">
                            <Eye size={20} />
                        </button>
                    </div>
                </header>

                {/* Main UI Panels */}
                <main className="flex justify-between items-end">
                    
                    {/* Left: Creature Selection */}
                    <div className="flex flex-col space-y-6 pointer-events-auto">
                        <div className="bg-black/60 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl w-80">
                            <div className="flex space-x-6 mb-8 border-b border-white/5 pb-4">
                                <button 
                                    onClick={() => setActiveTab('creature')}
                                    className={`text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'creature' ? 'text-emerald-400' : 'text-white/30 hover:text-white'}`}
                                >
                                    Ecosystem
                                </button>
                                <button 
                                    onClick={() => setActiveTab('behavior')}
                                    className={`text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'behavior' ? 'text-emerald-400' : 'text-white/30 hover:text-white'}`}
                                >
                                    Genetics
                                </button>
                            </div>

                            {activeTab === 'creature' ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {(['insect', 'fish', 'jellyfish', 'alien'] as OrganismType[]).map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => updateType(t)}
                                            className={`flex flex-col items-center justify-center p-6 rounded-[2rem] transition-all border ${
                                                config.type === t 
                                                ? 'bg-emerald-600 border-emerald-400 text-white shadow-[0_0_40px_rgba(52,211,153,0.2)]' 
                                                : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            {t === 'insect' && <Bug size={24} className="mb-2" />}
                                            {t === 'fish' && <Waves size={24} className="mb-2" />}
                                            {t === 'jellyfish' && <Ghost size={24} className="mb-2" />}
                                            {t === 'alien' && <Zap size={24} className="mb-2" />}
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{t}</span>
                                        </button>
                                    ))}
                                    <div className="col-span-2 mt-4 space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest font-bold text-white/40 block px-2">Environment</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {(['ocean', 'space', 'forest'] as const).map(env => (
                                                <button 
                                                    key={env}
                                                    onClick={() => updateParam('environment', env)}
                                                    className={`py-2 rounded-lg text-[8px] font-bold uppercase tracking-widest transition-all ${config.environment === env ? 'bg-white/20 text-white' : 'bg-white/5 text-white/20'}`}
                                                >
                                                    {env}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8 py-4">
                                    {[
                                        { label: 'Population', key: 'population', min: 10, max: 2000, step: 10 },
                                        { label: 'Base Speed', key: 'speed', min: 0.1, max: 5, step: 0.1 },
                                        { label: 'Cohesion', key: 'cohesion', min: 0, max: 3, step: 0.1 },
                                        { label: 'Separation', key: 'separation', min: 0, max: 3, step: 0.1 },
                                        { label: 'Alignment', key: 'alignment', min: 0, max: 3, step: 0.1 },
                                        { label: 'Mutation/Noise', key: 'randomness', min: 0, max: 2, step: 0.1 }
                                    ].map((param) => (
                                        <div key={param.key} className="space-y-4">
                                            <div className="flex justify-between items-center text-[9px] uppercase tracking-widest font-bold text-white/40">
                                                <span>{param.label}</span>
                                                <span className="text-emerald-400">{(config as any)[param.key]}</span>
                                            </div>
                                            <input 
                                                type="range" min={param.min} max={param.max} step={param.step}
                                                value={(config as any)[param.key]}
                                                onChange={(e) => updateParam(param.key as any, parseFloat(e.target.value))}
                                                className="w-full accent-emerald-500 bg-white/10 h-1 rounded-full outline-none"
                                            />
                                        </div>
                                    ))}
                                    <div className="pt-4">
                                        <label className="text-[9px] uppercase tracking-widest font-bold text-white/40 mb-4 block">Bioluminescence</label>
                                        <input 
                                            type="color" 
                                            value={config.color} 
                                            onChange={(e) => updateParam('color', e.target.value)}
                                            className="w-full h-10 rounded-xl bg-white/5 border-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Species Info */}
                    <div className="flex flex-col space-y-6 pointer-events-auto max-w-sm">
                        <div className="bg-black/60 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Bug size={200} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-6 flex items-center">
                                    <Info className="mr-3 text-emerald-400" size={20} />
                                    Observations
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed font-light mb-8">
                                    {config.type === 'insect' && "High-frequency swarming behavior using optimized Boids heuristics. Observe the rapid alignment and separation patterns within the colony."}
                                    {config.type === 'fish' && "Fluid schooling dynamics. This species exhibits strong cohesion and social alignment, resulting in graceful, unified collective motion."}
                                    {config.type === 'jellyfish' && "Slow-drifting rhythmic organisms. These creatures utilize a pulsing vertex displacement model for propulsion and vertical navigation."}
                                    {config.type === 'alien' && "Stochastic bioluminescent entities with non-standard locomotion. These organisms thrive in high-randomness environments with high energy emission."}
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1 h-px bg-white/10" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">Lifeform Count: {config.population}</span>
                                    <div className="flex-1 h-px bg-white/10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer Status Bar */}
                <footer className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-white/20">
                    <div className="flex items-center space-x-10">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Neural Ecosystem Synchronized</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Layers className="w-4 h-4" />
                            <span>Simulation Target: 60 FPS</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Share2 size={16} className="hover:text-white cursor-pointer transition-colors" />
                        <span>Core Build v3.8.1.X</span>
                    </div>
                </footer>
            </div>

            {/* UI Toggle */}
            {!showUI && (
                <button 
                    onClick={() => setShowUI(true)}
                    className="absolute top-10 right-10 z-30 p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 transition-all text-white shadow-2xl"
                >
                    <Maximize size={24} />
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
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #10b981;
                    cursor: pointer;
                    box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
                }
                ::-webkit-scrollbar { display: none; }
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

export default OrganismSim;
