import React, { useRef, useState, useEffect } from 'react';
import { Settings, RefreshCw, Play, Pause, Camera, Layers, Zap, Maximize2 } from 'lucide-react';
import { FractalSimulation } from './FractalSimulation';

const FRACTALS = ['Mandelbrot', 'Julia', 'Burning Ship', 'Multibrot'];
const MODES = ['Normal', 'Kaleidoscope', 'Sacred', 'Psychedelic', 'Organic'];
const PALETTES = ['Neon', 'Cosmic', 'Pastel', 'Psychedelic'];

const FractalWorlds: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const simulationRef = useRef<FractalSimulation | null>(null);
    
    // UI State
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
    const [autoZoom, setAutoZoom] = useState(false);
    const [currentFractal, setCurrentFractal] = useState(0);
    const [currentMode, setCurrentMode] = useState(0);
    const [currentPalette, setCurrentPalette] = useState(0);
    const [stats, setStats] = useState({ zoom: 1, iterations: 150 });
    const [juliaX, setJuliaX] = useState(0.355);
    const [juliaY, setJuliaY] = useState(0.355);
    const [power, setPower] = useState(2.0);

    useEffect(() => {
        if (!canvasRef.current) return;
        const gl = canvasRef.current.getContext('webgl2')!;
        simulationRef.current = new FractalSimulation(gl);

        let frameId: number;
        const render = (time: number) => {
            if (simulationRef.current) {
                const sim = simulationRef.current;
                
                // Auto zoom logic
                if (autoZoom) {
                    sim.params.zoom *= 0.995;
                    setStats(prev => ({ ...prev, zoom: 1/sim.params.zoom }));
                }

                sim.render(time * 0.001, window.innerWidth, window.innerHeight);
            }
            frameId = requestAnimationFrame(render);
        };
        frameId = requestAnimationFrame(render);

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [autoZoom]);

    const handleWheel = (e: React.WheelEvent) => {
        if (!simulationRef.current || autoZoom) return;
        const sim = simulationRef.current;
        
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 2 - 1;
        const y = 1 - (e.clientY - rect.top) / rect.height * 2;
        const aspect = rect.width / rect.height;
        
        const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;
        const oldZoom = sim.params.zoom;
        const newZoom = oldZoom * zoomFactor;
        
        sim.params.center[0] += x * aspect * (oldZoom - newZoom);
        sim.params.center[1] += y * (oldZoom - newZoom);
        sim.params.zoom = newZoom;
        
        sim.params.iterations = Math.min(1000, Math.max(50, 150 - Math.log(newZoom) * 40));
        setStats({ zoom: 1/newZoom, iterations: Math.floor(sim.params.iterations) });
    };

    const [isDragging, setIsDragging] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging || !simulationRef.current || autoZoom) return;
        const sim = simulationRef.current;
        const rect = canvasRef.current!.getBoundingClientRect();
        const aspect = rect.width / rect.height;
        
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        
        sim.params.center[0] -= (dx / rect.width * 2) * aspect * sim.params.zoom;
        sim.params.center[1] += (dy / rect.height * 2) * sim.params.zoom;
        
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const resetView = () => {
        if (simulationRef.current) {
            simulationRef.current.params.center = [currentFractal === 1 ? 0 : -0.5, 0.0];
            simulationRef.current.params.zoom = 1.5;
            simulationRef.current.params.iterations = 150;
            setStats({ zoom: 1, iterations: 150 });
        }
    };

    const exportImage = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = `fractal-${FRACTALS[currentFractal].toLowerCase()}.png`;
            link.href = canvasRef.current.toDataURL('image/png');
            link.click();
        }
    };

    const handleFractalChange = (idx: number) => {
        setCurrentFractal(idx);
        if (simulationRef.current) {
            simulationRef.current.params.fractalType = idx;
            resetView();
        }
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans cursor-crosshair select-none">
            <canvas 
                ref={canvasRef} 
                className="w-full h-full touch-none"
                onWheel={handleWheel}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={() => setIsDragging(false)}
                onPointerLeave={() => setIsDragging(false)}
            />

            {/* UI Overlay */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                
                {/* Header */}
                <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
                        <Zap className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Infinite Fractal Worlds</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Procedural Mathematical Explorer</p>
                    </div>
                </div>

                {/* Right Panel - Parameters */}
                <div className="absolute top-8 right-32 w-64 space-y-4 pointer-events-auto">
                    <div className="p-6 bg-black/60 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl space-y-6">
                        {/* Fractal Selector */}
                        <div className="space-y-3">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center">
                                <Layers size={14} className="mr-2" /> Fractal Engine
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {FRACTALS.map((f, i) => (
                                    <button 
                                        key={f}
                                        onClick={() => handleFractalChange(i)}
                                        className={`px-3 py-2 rounded-xl text-[10px] font-medium transition-all ${currentFractal === i ? 'bg-emerald-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mode Selector */}
                        <div className="space-y-3">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center">
                                <RefreshCw size={14} className="mr-2" /> Symmetry Mode
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {MODES.map((m, i) => (
                                    <button 
                                        key={m}
                                        onClick={() => { setCurrentMode(i); if(simulationRef.current) simulationRef.current.params.mode = i; }}
                                        className={`px-3 py-1.5 rounded-full text-[9px] font-medium transition-all ${currentMode === i ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Julia Params */}
                        {currentFractal === 1 && (
                            <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-500">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest">Complex Parameter</label>
                                <div className="space-y-2">
                                    <input 
                                        type="range" min="-1" max="1" step="0.001" value={juliaX}
                                        className="w-full accent-blue-500"
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            setJuliaX(val);
                                            if(simulationRef.current) simulationRef.current.params.juliaParam[0] = val;
                                        }}
                                    />
                                    <input 
                                        type="range" min="-1" max="1" step="0.001" value={juliaY}
                                        className="w-full accent-blue-500"
                                        onChange={(e) => {
                                            const val = parseFloat(e.target.value);
                                            setJuliaY(val);
                                            if(simulationRef.current) simulationRef.current.params.juliaParam[1] = val;
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Multibrot Power */}
                        {currentFractal === 3 && (
                            <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-500">
                                <label className="text-[10px] text-gray-500 uppercase tracking-widest flex justify-between">
                                    Power <span>{power.toFixed(1)}</span>
                                </label>
                                <input 
                                    type="range" min="1" max="10" step="0.1" value={power}
                                    className="w-full accent-purple-500"
                                    onChange={(e) => {
                                        const val = parseFloat(e.target.value);
                                        setPower(val);
                                        if(simulationRef.current) simulationRef.current.params.power = val;
                                    }}
                                />
                            </div>
                        )}

                        {/* Iterations */}
                        <div className="space-y-3">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest flex justify-between">
                                Detail <span>{stats.iterations}</span>
                            </label>
                            <input 
                                type="range" min="50" max="1000" step="10" value={stats.iterations}
                                className="w-full accent-emerald-500"
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    setStats(s => ({ ...s, iterations: val }));
                                    if(simulationRef.current) simulationRef.current.params.iterations = val;
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Left Panel - Status */}
                <div className="absolute bottom-400 left-8 space-y-4 pointer-events-auto">
                    <div className="p-6 bg-black/60 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl space-y-4">
                        <div className="flex items-center space-x-6">
                            <div className="text-[10px] font-mono">
                                <span className="text-gray-500 block mb-1">ZOOM LEVEL</span>
                                <span className="text-emerald-400 text-lg font-bold">{stats.zoom.toExponential(2)}</span>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <button 
                                onClick={() => setAutoZoom(!autoZoom)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${autoZoom ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                            >
                                {autoZoom ? <Pause size={16} /> : <Play size={16} />}
                                <span className="text-[10px] font-bold uppercase tracking-widest">{autoZoom ? 'Stop Cruise' : 'Auto Cruise'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Center - Palettes & Actions */}
                <div className="absolute bottom-400 left-1/2 -translate-x-1/2 flex items-center space-x-4 pointer-events-auto bg-black/40 backdrop-blur-xl p-3 rounded-[2rem] border border-white/10 shadow-2xl">
                    <div className="flex items-center space-x-2 px-2">
                        {PALETTES.map((p, i) => (
                            <button 
                                key={p}
                                onClick={() => { setCurrentPalette(i); if(simulationRef.current) simulationRef.current.params.palette = i; }}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${currentPalette === i ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                style={{ 
                                    background: i === 0 ? 'linear-gradient(45deg, #ff00ff, #00ffff)' :
                                               i === 1 ? 'linear-gradient(45deg, #1e3a8a, #9333ea)' :
                                               i === 2 ? 'linear-gradient(45deg, #fecaca, #bfdbfe)' :
                                               'linear-gradient(45deg, #facc15, #ef4444)'
                                }}
                            />
                        ))}
                    </div>

                    <div className="w-px h-6 bg-white/10 mx-2" />

                    <button onClick={resetView} className="p-3 text-gray-400 hover:text-white bg-white/5 rounded-full transition-all" title="Reset View">
                        <RefreshCw size={18} />
                    </button>
                    
                    <button onClick={exportImage} className="p-3 text-emerald-400 hover:text-emerald-300 bg-white/5 rounded-full transition-all" title="Export Image">
                        <Camera size={18} />
                    </button>
                </div>

                {/* Settings & Fullscreen Toggles */}
                <div className="absolute top-8 right-8 z-50 flex gap-3 pointer-events-auto">
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
            </div>
        </div>
    );
};

export default FractalWorlds;
