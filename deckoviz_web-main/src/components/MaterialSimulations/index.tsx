import React, { useEffect, useRef, useState } from 'react';
import { MaterialEngine } from './MaterialEngine';
import { MaterialType, MaterialConfig, MATERIAL_DEFAULTS } from './types';
import { 
    Droplets, 
    Wind, 
    Flame, 
    Box, 
    Sparkles, 
    Settings, 
    Maximize, 
    Camera, 
    RotateCcw,
    Activity,
    Layers,
    Info,
    Hexagon
} from 'lucide-react';

const MaterialSimulations: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<MaterialEngine | null>(null);
    const [config, setConfig] = useState<MaterialConfig>(MATERIAL_DEFAULTS.metal);
    const [showUI, setShowUI] = useState(true);
    const [activeTab, setActiveTab] = useState<'material' | 'settings'>('material');

    useEffect(() => {
        if (!containerRef.current) return;
        
        engineRef.current = new MaterialEngine(containerRef.current);
        engineRef.current.updateMaterial(config);
        engineRef.current.animate();

        return () => {
            engineRef.current?.dispose();
        };
    }, []);

    const updateMaterial = (type: MaterialType) => {
        const newConfig = { ...MATERIAL_DEFAULTS[type] };
        setConfig(newConfig);
        engineRef.current?.updateMaterial(newConfig);
    };

    const updateParam = (key: keyof MaterialConfig, val: any) => {
        const newConfig = { ...config, [key]: val };
        setConfig(newConfig);
        engineRef.current?.updateMaterial(newConfig);
    };

    const captureSnapshot = () => {
        const canvas = containerRef.current?.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = `material-${config.type}-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-[#050505] overflow-hidden font-sans text-white">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-transparent to-transparent" />
            </div>

            {/* Engine Viewport */}
            <div ref={containerRef} className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing" />

            {/* UI Overlay */}
            <div className={`relative z-20 w-full h-full p-10 flex flex-col justify-between pointer-events-none transition-all duration-1000 ${showUI ? 'opacity-100' : 'opacity-0 scale-105'}`}>
                
                {/* Header Section */}
                <header className="flex justify-between items-start">
                    <div className="flex items-center space-x-5 pointer-events-auto">
                        <div className="p-4 bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl">
                            <Activity className="w-8 h-8 text-rose-500 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Experimental Materials</h1>
                            <p className="text-[10px] uppercase tracking-[0.5em] text-rose-400 font-bold mt-2">Surface Simulation Lab v1.2</p>
                        </div>
                    </div>

                    <div className="flex space-x-3 pointer-events-auto">
                        <button onClick={captureSnapshot} className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 transition-all text-rose-400">
                            <Camera size={20} />
                        </button>
                        <button onClick={() => setShowUI(false)} className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 transition-all">
                            <Maximize size={20} />
                        </button>
                    </div>
                </header>

                {/* Main UI Panels */}
                <main className="flex justify-between items-end">
                    
                    {/* Left: Material Selection */}
                    <div className="flex flex-col space-y-6 pointer-events-auto">
                        <div className="bg-black/60 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl w-80">
                            <div className="flex space-x-6 mb-8 border-b border-white/5 pb-4">
                                <button 
                                    onClick={() => setActiveTab('material')}
                                    className={`text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'material' ? 'text-rose-500' : 'text-white/30 hover:text-white'}`}
                                >
                                    Materials
                                </button>
                                <button 
                                    onClick={() => setActiveTab('settings')}
                                    className={`text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'settings' ? 'text-rose-500' : 'text-white/30 hover:text-white'}`}
                                >
                                    Parameters
                                </button>
                            </div>

                            {activeTab === 'material' ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {(['metal', 'glass', 'fabric', 'crystal', 'lava', 'sand'] as MaterialType[]).map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => updateMaterial(m)}
                                            className={`flex flex-col items-center justify-center p-6 rounded-[2rem] transition-all border ${
                                                config.type === m 
                                                ? 'bg-rose-600 border-rose-400 text-white shadow-[0_0_40px_rgba(225,29,72,0.3)]' 
                                                : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            {m === 'metal' && <Droplets size={24} className="mb-2" />}
                                            {m === 'glass' && <Box size={24} className="mb-2" />}
                                            {m === 'fabric' && <Wind size={24} className="mb-2" />}
                                            {m === 'crystal' && <Hexagon size={24} className="mb-2" />}
                                            {m === 'lava' && <Flame size={24} className="mb-2" />}
                                            {m === 'sand' && <Sparkles size={24} className="mb-2" />}
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{m}</span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-8 py-4">
                                    {[
                                        { label: 'Deformation', key: 'intensity', min: 0, max: 3 },
                                        { label: 'Flow Speed', key: 'speed', min: 0.1, max: 4 },
                                        { label: 'Surface Rough', key: 'roughness', min: 0, max: 1 },
                                        { label: 'Bloom Glow', key: 'bloomStrength', min: 0, max: 4 }
                                    ].map((param) => (
                                        <div key={param.key} className="space-y-4">
                                            <div className="flex justify-between items-center text-[9px] uppercase tracking-widest font-bold text-white/40">
                                                <span>{param.label}</span>
                                                <span className="text-rose-400">{(config as any)[param.key].toFixed(2)}</span>
                                            </div>
                                            <input 
                                                type="range" min={param.min} max={param.max} step="0.01"
                                                value={(config as any)[param.key]}
                                                onChange={(e) => updateParam(param.key as any, parseFloat(e.target.value))}
                                                className="w-full accent-rose-500 bg-white/10 h-1 rounded-full outline-none"
                                            />
                                        </div>
                                    ))}
                                    <div className="pt-4">
                                        <label className="text-[9px] uppercase tracking-widest font-bold text-white/40 mb-4 block">Base Pigment</label>
                                        <input 
                                            type="color" 
                                            value={config.color} 
                                            onChange={(e) => updateParam('color', e.target.value)}
                                            className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Technical Info */}
                    <div className="flex flex-col space-y-6 pointer-events-auto max-w-sm">
                        <div className="bg-black/60 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Settings size={200} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-6 flex items-center">
                                    <Info className="mr-3 text-rose-500" size={20} />
                                    Analysis
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed font-light mb-8">
                                    {config.type === 'metal' && "Simulating low-viscosity liquid metal with high specular reflection and real-time Simplex noise deformation. Ideal for fluid metallic surfaces."}
                                    {config.type === 'glass' && "Refractive glass simulation using Fresnel equations. Includes surface distortion based on secondary noise layers to simulate melting states."}
                                    {config.type === 'fabric' && "Anisotropic lighting model combined with vertex displacement to simulate shimmering textile surfaces and soft-tissue motion."}
                                    {config.type === 'crystal' && "Hard-surface iridescent crystal simulation. Uses high-order Fresnel effects to simulate multi-spectral light splitting across facets."}
                                    {config.type === 'lava' && "Dual-layer emissive shader mapping dark crust formations over a flowing molten core. Includes temperature-based glow intensity."}
                                    {config.type === 'sand' && "Granular specular simulation mapping thousands of virtual micro-facets to simulate flowing metallic sand or mineral dust."}
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1 h-px bg-white/10" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-rose-400">Shader Engine Active</span>
                                    <div className="flex-1 h-px bg-white/10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer Info Bar */}
                <footer className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-white/20">
                    <div className="flex items-center space-x-10">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                            <span>Simulation Sync: High</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Layers className="w-4 h-4" />
                            <span>Material ID: {config.type.toUpperCase()}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Share2 size={16} className="hover:text-white cursor-pointer transition-colors" />
                        <span>Core Build v1.42.0</span>
                    </div>
                </footer>
            </div>

            {/* Toggle UI Hint */}
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
                    background: #f43f5e;
                    cursor: pointer;
                    box-shadow: 0 0 15px rgba(244, 63, 94, 0.5);
                }
                ::-webkit-scrollbar { display: none; }
            `}} />
        </div>
    );
};

// Simple Share icon replacement if lucide-react version is different
const Share2 = ({ size, className }: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
);

export default MaterialSimulations;
