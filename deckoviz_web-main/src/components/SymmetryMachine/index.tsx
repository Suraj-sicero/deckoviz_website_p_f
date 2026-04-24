import React, { useEffect, useRef, useState } from 'react';
import { SymmetryEngine } from './SymmetryEngine';
import { SYMMETRY_DEFAULTS, SymmetryConfig } from './types';
import ControlPanel from '../creative-suite/shared/ControlPanel';
import { Activity, Camera, Maximize, Share2, Layers } from 'lucide-react';

const SymmetryMachine: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<SymmetryEngine | null>(null);
    const [config, setConfig] = useState<SymmetryConfig>(SYMMETRY_DEFAULTS);
    const [showUI, setShowUI] = useState(true);

    useEffect(() => {
        if (!containerRef.current) return;
        
        engineRef.current = new SymmetryEngine(containerRef.current);
        engineRef.current.animate();

        return () => {
            engineRef.current?.dispose();
        };
    }, []);

    const handleParamChange = (id: string, val: number) => {
        const newConfig = { ...config, [id]: val };
        setConfig(newConfig);
        engineRef.current?.update(newConfig);
    };

    const captureSnapshot = () => {
        const canvas = containerRef.current?.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = `symmetry-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans text-white">
            {/* Viewport */}
            <div ref={containerRef} className="absolute inset-0 z-0" />

            {/* UI Layer */}
            <div className={`relative z-10 w-full h-full p-12 flex flex-col justify-between pointer-events-none transition-all duration-1000 ${showUI ? 'opacity-100' : 'opacity-0 scale-105'}`}>
                
                <header className="flex justify-between items-start">
                    <div className="flex items-center space-x-6 pointer-events-auto">
                        <div className="p-4 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl">
                            <Activity className="w-8 h-8 text-indigo-400 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white/90 leading-none">Symmetry Machine</h1>
                            <p className="text-[10px] uppercase tracking-[0.5em] text-indigo-400 font-bold mt-3">Kaleidoscopic Geometry Synthesizer v1.0</p>
                        </div>
                    </div>

                    <div className="flex space-x-3 pointer-events-auto">
                        <button onClick={captureSnapshot} className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 transition-all">
                            <Camera size={20} />
                        </button>
                        <button onClick={() => setShowUI(false)} className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 transition-all">
                            <Maximize size={20} />
                        </button>
                    </div>
                </header>

                <main className="flex justify-between items-end">
                    <ControlPanel 
                        title="Geometry Engine"
                        description="Adjust the mathematical parameters of the kaleidoscope. Increasing sides creates higher-order radial symmetry."
                        parameters={[
                            { id: 'sides', label: 'Mirror Count', min: 2, max: 24, step: 1, value: config.sides },
                            { id: 'zoom', label: 'Spatial Zoom', min: 0.1, max: 5, step: 0.1, value: config.zoom },
                            { id: 'intensity', label: 'Pattern Depth', min: 0, max: 2, step: 0.1, value: config.intensity },
                            { id: 'colorShift', label: 'Chromatic Phase', min: 0, max: 10, step: 0.1, value: config.colorShift }
                        ]}
                        onParamChange={handleParamChange}
                        onReset={() => setConfig(SYMMETRY_DEFAULTS)}
                        accentColor="#818cf8"
                    />

                    <div className="flex flex-col space-y-6 pointer-events-auto max-w-sm">
                        <div className="bg-black/60 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-6">Simulation Status</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-white/40">
                                        <span>Frame Latency</span>
                                        <span className="text-indigo-400">0.8ms</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="w-4/5 h-full bg-indigo-500 shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
                                    </div>
                                    <p className="text-[11px] text-white/30 leading-relaxed font-light mt-4">
                                        Real-time polar coordinate remapping active. Radial symmetry detected at {config.sides} axes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-white/20">
                    <div className="flex items-center space-x-12">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            <span>Neural Symmetry Sync</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Layers className="w-4 h-4" />
                            <span>Layers: Multi-Phase</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-8">
                        <Share2 size={16} className="hover:text-white cursor-pointer transition-colors" />
                        <span>Core Build v1.0.42</span>
                    </div>
                </footer>
            </div>

            {!showUI && (
                <button 
                    onClick={() => setShowUI(true)}
                    className="absolute top-12 right-12 z-30 p-4 bg-white/5 hover:bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 transition-all text-white/40 shadow-2xl"
                >
                    <Maximize size={24} />
                </button>
            )}
        </div>
    );
};

export default SymmetryMachine;
