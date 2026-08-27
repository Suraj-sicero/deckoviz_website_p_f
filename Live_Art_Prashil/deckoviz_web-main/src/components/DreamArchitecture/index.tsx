import React, { useEffect, useRef, useState } from 'react';
import { ArchEngine } from './ArchEngine';
import { ArchConfig, ArchStyle, ARCH_PRESETS } from './types';
import { 
    Building, 
    Columns, 
    Cloud, 
    Library, 
    Shapes, 
    Settings, 
    Maximize, 
    Camera, 
    RotateCcw,
    Activity,
    Layers,
    Info,
    RefreshCw,
    Share2,
    Eye
} from 'lucide-react';

const DreamArchitecture: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<ArchEngine | null>(null);
    const [config, setConfig] = useState<ArchConfig>(ARCH_PRESETS.brutalist);
    const [showUI, setShowUI] = useState(true);
    const [activeTab, setActiveTab] = useState<'style' | 'params'>('style');

    useEffect(() => {
        if (!containerRef.current) return;
        
        engineRef.current = new ArchEngine(containerRef.current);
        engineRef.current.updateScene(config);
        engineRef.current.animate();

        return () => {
            engineRef.current?.dispose();
        };
    }, []);

    const updateStyle = (style: ArchStyle) => {
        const newConfig = { ...ARCH_PRESETS[style] };
        setConfig(newConfig);
        engineRef.current?.updateScene(newConfig);
    };

    const updateParam = (key: keyof ArchConfig, val: any) => {
        const newConfig = { ...config, [key]: val };
        setConfig(newConfig);
        engineRef.current?.updateScene(newConfig);
    };

    const randomize = () => {
        const newSeed = Math.floor(Math.random() * 1000000);
        updateParam('seed', newSeed);
    };

    const captureSnapshot = () => {
        const canvas = containerRef.current?.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = `dream-arch-${config.style}-${config.seed}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-[#020205] overflow-hidden font-sans text-white">
            {/* Viewport */}
            <div ref={containerRef} className="absolute inset-0 z-0" />

            {/* UI Layer */}
            <div className={`relative z-10 w-full h-full p-10 flex flex-col justify-between pointer-events-none transition-all duration-1000 ${showUI ? 'opacity-100' : 'opacity-0 scale-105'}`}>
                
                {/* Header */}
                <header className="flex justify-between items-start">
                    <div className="flex items-center space-x-5 pointer-events-auto">
                        <div className="p-4 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl">
                            <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Dream Architecture</h1>
                            <p className="text-[10px] uppercase tracking-[0.5em] text-cyan-400 font-bold mt-2">Procedural Spatial Synthesizer v2.0</p>
                        </div>
                    </div>

                    <div className="flex space-x-3 pointer-events-auto">
                        <button onClick={captureSnapshot} className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 transition-all text-cyan-400">
                            <Camera size={20} />
                        </button>
                        <button onClick={() => setShowUI(false)} className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 transition-all">
                            <Eye size={20} />
                        </button>
                    </div>
                </header>

                {/* Main UI Panels */}
                <main className="flex justify-between items-end">
                    
                    {/* Left: Style & Generation */}
                    <div className="flex flex-col space-y-6 pointer-events-auto">
                        <div className="bg-black/60 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl w-80">
                            <div className="flex space-x-6 mb-8 border-b border-white/5 pb-4">
                                <button 
                                    onClick={() => setActiveTab('style')}
                                    className={`text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'style' ? 'text-cyan-400' : 'text-white/30 hover:text-white'}`}
                                >
                                    Style Presets
                                </button>
                                <button 
                                    onClick={() => setActiveTab('params')}
                                    className={`text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'params' ? 'text-cyan-400' : 'text-white/30 hover:text-white'}`}
                                >
                                    Geometry
                                </button>
                            </div>

                            {activeTab === 'style' ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {(['brutalist', 'gothic', 'floating', 'library', 'organic'] as ArchStyle[]).map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => updateStyle(s)}
                                            className={`flex flex-col items-center justify-center p-6 rounded-[2rem] transition-all border ${
                                                config.style === s 
                                                ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_40px_rgba(34,211,238,0.2)]' 
                                                : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            {s === 'brutalist' && <Building size={20} className="mb-2" />}
                                            {s === 'gothic' && <Columns size={20} className="mb-2" />}
                                            {s === 'floating' && <Cloud size={20} className="mb-2" />}
                                            {s === 'library' && <Library size={20} className="mb-2" />}
                                            {s === 'organic' && <Shapes size={20} className="mb-2" />}
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{s}</span>
                                        </button>
                                    ))}
                                    <button 
                                        onClick={randomize}
                                        className="col-span-2 mt-4 flex items-center justify-center space-x-3 p-5 bg-white/5 border border-white/5 rounded-[1.5rem] hover:bg-white/10 transition-all group"
                                    >
                                        <RefreshCw size={16} className="text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Re-Generate Seed</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-8 py-4">
                                    {[
                                        { label: 'Complexity', key: 'density', min: 0.1, max: 2 },
                                        { label: 'Scale Factor', key: 'scale', min: 0.5, max: 5 },
                                        { label: 'Elevation', key: 'height', min: 0.5, max: 10 },
                                        { label: 'Atmosphere', key: 'fogDensity', min: 0, max: 0.2 }
                                    ].map((param) => (
                                        <div key={param.key} className="space-y-4">
                                            <div className="flex justify-between items-center text-[9px] uppercase tracking-widest font-bold text-white/40">
                                                <span>{param.label}</span>
                                                <span className="text-cyan-400">{(config as any)[param.key].toFixed(2)}</span>
                                            </div>
                                            <input 
                                                type="range" min={param.min} max={param.max} step="0.01"
                                                value={(config as any)[param.key]}
                                                onChange={(e) => updateParam(param.key as any, parseFloat(e.target.value))}
                                                className="w-full accent-cyan-500 bg-white/10 h-1 rounded-full outline-none"
                                            />
                                        </div>
                                    ))}
                                    <div className="pt-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[9px] uppercase tracking-widest font-bold text-white/40 mb-2 block">Primary</label>
                                            <input type="color" value={config.color1} onChange={(e) => updateParam('color1', e.target.value)} className="w-full h-10 rounded-xl bg-white/5 border-none cursor-pointer" />
                                        </div>
                                        <div>
                                            <label className="text-[9px] uppercase tracking-widest font-bold text-white/40 mb-2 block">Atmosphere</label>
                                            <input type="color" value={config.color2} onChange={(e) => updateParam('color2', e.target.value)} className="w-full h-10 rounded-xl bg-white/5 border-none cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Style Info */}
                    <div className="flex flex-col space-y-6 pointer-events-auto max-w-sm">
                        <div className="bg-black/60 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Building size={200} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-6 flex items-center">
                                    <Info className="mr-3 text-cyan-400" size={20} />
                                    Synthesis
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed font-light mb-8">
                                    {config.style === 'brutalist' && "Procedural generation of monolithic concrete structures characterized by massive forms and repetitive block modules. Emphasizes weight and structural honesty."}
                                    {config.style === 'gothic' && "Algorithmically derived verticality and symmetry. Generating rhythmic pillars and pointed archways to create an atmosphere of ethereal transcendence."}
                                    {config.style === 'floating' && "Gravity-defying architectural islands suspended in a void. Structures are distributed using stochastic noise to ensure a balanced yet surreal composition."}
                                    {config.style === 'library' && "An infinite recursive corridor system. Generating repeating shelves and structural columns that extend into the fog of collective memory."}
                                    {config.style === 'organic' && "Flowing, curved forms inspired by natural biological patterns. Uses Torus Knot geometry to simulate complex, non-euclidean structural growth."}
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1 h-px bg-white/10" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-400">System Seed: {config.seed}</span>
                                    <div className="flex-1 h-px bg-white/10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer Info */}
                <footer className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-white/20">
                    <div className="flex items-center space-x-10">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                            <span>Neural Grid Active</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Layers className="w-4 h-4" />
                            <span>Structures Generated: {config.density * 100}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Share2 size={16} className="hover:text-white cursor-pointer transition-colors" />
                        <span>Core Build v2.8.5</span>
                    </div>
                </footer>
            </div>

            {/* Toggle UI */}
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
                    background: #22d3ee;
                    cursor: pointer;
                    box-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
                }
                ::-webkit-scrollbar { display: none; }
            `}} />
        </div>
    );
};

export default DreamArchitecture;
