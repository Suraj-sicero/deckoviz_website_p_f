import React, { useRef, useState } from 'react';
import { useFluidSimulation } from './useFluidSimulation';
import { Settings, RefreshCw, Download, Play, Pause, Palette, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PRESETS = {
    Water: {
        DENSITY_DISSIPATION: 1.1,
        VELOCITY_DISSIPATION: 0.2,
        PRESSURE: 0.8,
        CURL: 30,
        SPLAT_RADIUS: 0.25,
        color: [0.1, 0.5, 1.0]
    },
    Oil: {
        DENSITY_DISSIPATION: 0.8,
        VELOCITY_DISSIPATION: 0.5,
        PRESSURE: 0.5,
        CURL: 50,
        SPLAT_RADIUS: 0.4,
        color: [1.0, 0.4, 0.0]
    },
    Smoke: {
        DENSITY_DISSIPATION: 2.0,
        VELOCITY_DISSIPATION: 1.0,
        PRESSURE: 0.1,
        CURL: 20,
        SPLAT_RADIUS: 0.3,
        color: [0.8, 0.8, 0.8]
    },
    Neon: {
        DENSITY_DISSIPATION: 0.5,
        VELOCITY_DISSIPATION: 0.1,
        PRESSURE: 0.9,
        CURL: 40,
        SPLAT_RADIUS: 0.2,
        color: [1.0, 0.0, 1.0]
    }
};

const FluidDreams: React.FC = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const simulationRef = useFluidSimulation(canvasRef);
    const [currentPreset, setCurrentPreset] = useState<keyof typeof PRESETS>('Water');
    const [isPaused, setIsPaused] = useState(false);
    const [showUI, setShowUI] = useState(true);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const lastPos = useRef({ x: 0, y: 0 });

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!simulationRef.current || !canvasRef.current) return;
        const sim = simulationRef.current;
        const rect = canvasRef.current.getBoundingClientRect();
        
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        
        const dx = (x - lastPos.current.x) * 5000;
        const dy = (y - lastPos.current.y) * 5000;
        
        lastPos.current = { x, y };

        const color = PRESETS[currentPreset].color as [number, number, number];
        sim.splat(x, y, dx, dy, color);
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        if (!simulationRef.current || !canvasRef.current) return;
        const sim = simulationRef.current;
        const rect = canvasRef.current.getBoundingClientRect();
        
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        
        lastPos.current = { x, y };

        // Burst of color
        const color = [Math.random(), Math.random(), Math.random()] as [number, number, number];
        for (let i = 0; i < 5; i++) {
            sim.splat(x, y, (Math.random() - 0.5) * 500, (Math.random() - 0.5) * 500, color);
        }
    };

    const handlePresetChange = (preset: keyof typeof PRESETS) => {
        setCurrentPreset(preset);
        if (simulationRef.current) {
            Object.assign(simulationRef.current.params, PRESETS[preset]);
        }
    };

    const handleReset = () => {
        if (simulationRef.current) {
            simulationRef.current.initFramebuffers();
        }
    };

    const handleExport = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = 'fluid-dreams.png';
            link.href = canvasRef.current.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans">
            <canvas 
                ref={canvasRef} 
                className="w-full h-full touch-none"
                onPointerMove={handlePointerMove}
                onPointerDown={handlePointerDown}
            />

            {/* UI Overlay */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                        <Palette className="w-6 h-6 text-violet-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Fluid Dreams</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Interactive Developer Spec</p>
                    </div>
                </div>

                {/* Controls - Bottom */}
                <div className="absolute bottom-400 left-1/2 -translate-x-1/2 flex items-center space-x-4 pointer-events-auto bg-black/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/10 shadow-2xl">
                    {Object.keys(PRESETS).map((p) => (
                        <button
                            key={p}
                            onClick={() => handlePresetChange(p as keyof typeof PRESETS)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                currentPreset === p 
                                ? 'bg-white text-black scale-105' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                    
                    <div className="w-px h-6 bg-white/10 mx-2" />

                    <button 
                        onClick={() => {
                            setIsPaused(!isPaused);
                            if (simulationRef.current) simulationRef.current.params.PAUSED = !isPaused;
                        }}
                        className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                    >
                        {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                    </button>

                    <button 
                        onClick={handleReset}
                        className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>

                    <button 
                        onClick={handleExport}
                        className="p-3 text-violet-400 hover:text-violet-300 hover:bg-white/5 rounded-full transition-colors"
                    >
                        <Download className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Always Visible Toggle & Fullscreen */}
            <div className="absolute top-8 right-8 z-30 flex gap-3 pointer-events-auto">
                <button 
                    onClick={toggleFullscreen}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-xl"
                >
                    <Maximize2 className="w-6 h-6 text-white" />
                </button>
                <button 
                    onClick={() => setShowUI(!showUI)}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-xl"
                >
                    <Settings className={`w-6 h-6 text-white transition-transform duration-500 ${showUI ? 'rotate-90' : ''}`} />
                </button>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                canvas {
                    image-rendering: pixelated;
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

export default FluidDreams;
