import React, { useRef, useState } from 'react';
import { useParticleSimulation } from './useParticleSimulation';
import { Settings, RefreshCw, Download, Zap, Eye, EyeOff, MousePointer2, ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';

const PRESETS = {
    Galaxy: {
        color1: [0.2, 0.4, 1.0], // Deep Blue
        color2: [0.8, 0.3, 1.0], // Purple
        force: 0.15,
        damping: 0.97
    },
    Fire: {
        color1: [1.0, 0.3, 0.0], // Orange
        color2: [1.0, 1.0, 0.2], // Yellow
        force: 0.2,
        damping: 0.95
    },
    Neon: {
        color1: [0.0, 1.0, 1.0], // Cyan
        color2: [1.0, 0.0, 1.0], // Magenta
        force: 0.1,
        damping: 0.98
    },
    Monochrome: {
        color1: [0.2, 0.2, 0.2], // Dark Grey
        color2: [1.0, 1.0, 1.0], // White
        force: 0.15,
        damping: 0.96
    }
};

const ParticleGalaxy: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [particleCount] = useState(150000);
    const systemRef = useParticleSimulation(canvasRef, particleCount);
    const [currentPreset, setCurrentPreset] = useState<keyof typeof PRESETS>('Galaxy');
    const [isAttract, setIsAttract] = useState(true);
    const [showTrails, setShowTrails] = useState(true);
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

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!systemRef.current) return;
        const system = systemRef.current;
        const aspect = window.innerWidth / window.innerHeight;
        const x = (e.clientX / window.innerWidth * 2 - 1) * aspect / system.params.zoom;
        const y = (1 - e.clientY / window.innerHeight * 2) / system.params.zoom;
        system.params.mouse = [x, y];
    };

    const handlePointerDown = () => {
        if (!systemRef.current) return;
        systemRef.current.params.mouseDown = 1;
    };

    const handlePointerUp = () => {
        if (!systemRef.current) return;
        systemRef.current.params.mouseDown = 0;
    };

    const handlePresetChange = (preset: keyof typeof PRESETS) => {
        setCurrentPreset(preset);
        if (systemRef.current) {
            Object.assign(systemRef.current.params, PRESETS[preset]);
        }
    };

    const toggleMode = () => {
        setIsAttract(!isAttract);
        if (systemRef.current) {
            systemRef.current.params.mode = isAttract ? -1 : 1;
        }
    };

    const toggleTrails = () => {
        setShowTrails(!showTrails);
        if (systemRef.current) {
            systemRef.current.params.trails = !showTrails;
        }
    };

    const handleReset = () => {
        if (systemRef.current) {
            systemRef.current.initBuffers();
        }
    };

    const handleZoom = (delta: number) => {
        if (systemRef.current) {
            systemRef.current.params.zoom = Math.max(0.1, Math.min(5, systemRef.current.params.zoom + delta));
        }
    };

    const handleExport = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = 'particle-galaxy.png';
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
                onPointerUp={handlePointerUp}
                onWheel={(e) => handleZoom(e.deltaY * -0.001)}
            />

            {/* UI Overlay */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                        <Zap className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Particle Galaxy</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">GPU Instanced Simulation</p>
                    </div>
                </div>

                {/* Controls - Bottom */}
                <div className="absolute bottom-400 left-1/2 -translate-x-1/2 flex items-center space-x-4 pointer-events-auto bg-black/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/10 shadow-2xl overflow-x-auto max-w-[95vw]">
                    <div className="flex items-center space-x-2 px-2">
                        {Object.keys(PRESETS).map((p) => (
                            <button
                                key={p}
                                onClick={() => handlePresetChange(p as keyof typeof PRESETS)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                                    currentPreset === p 
                                    ? 'bg-white text-black scale-105 shadow-lg' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                    
                    <div className="w-px h-6 bg-white/10 mx-2 flex-shrink-0" />

                    <div className="flex items-center space-x-1">
                        <button 
                            onClick={toggleMode}
                            className={`p-2.5 rounded-xl transition-all ${isAttract ? 'text-blue-400 bg-blue-500/10' : 'text-red-400 bg-red-500/10'}`}
                            title={isAttract ? "Attract Mode" : "Repel Mode"}
                        >
                            <MousePointer2 className={`w-5 h-5 ${!isAttract ? 'rotate-180' : ''} transition-transform`} />
                        </button>

                        <button 
                            onClick={toggleTrails}
                            className={`p-2.5 rounded-xl transition-all ${showTrails ? 'text-green-400 bg-green-500/10' : 'text-gray-500 bg-white/5'}`}
                            title="Toggle Trails"
                        >
                            {showTrails ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>

                        <button 
                            onClick={handleReset}
                            className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                            title="Reset Particles"
                        >
                            <RefreshCw className="w-5 h-5" />
                        </button>

                        <button 
                            onClick={handleExport}
                            className="p-2.5 text-purple-400 hover:text-purple-300 hover:bg-white/5 rounded-xl transition-colors"
                            title="Export Frame"
                        >
                            <Download className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="w-px h-6 bg-white/10 mx-2 flex-shrink-0" />

                    <div className="flex items-center space-x-1">
                        <button onClick={() => handleZoom(0.1)} className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl"><ZoomIn size={18} /></button>
                        <button onClick={() => handleZoom(-0.1)} className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl"><ZoomOut size={18} /></button>
                    </div>
                </div>

                {/* Info Toggle */}
                <div className="absolute top-8 right-8 flex gap-3 pointer-events-auto">
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
                        <Settings className="w-6 h-6 text-white" />
                    </button>
                    <button 
                        onClick={() => window.history.back()}
                        className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-xl"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ParticleGalaxy;
