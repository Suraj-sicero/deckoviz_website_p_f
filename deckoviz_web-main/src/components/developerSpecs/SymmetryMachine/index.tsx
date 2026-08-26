import React, { useRef, useState, useEffect } from 'react';
import { Settings, Trash2, Shield, Layout, Save } from 'lucide-react';
import { SymmetryEngine, SymmetryMode } from './SymmetryEngine';
import { useNavigate } from 'react-router-dom';

const SymmetryMachine: React.FC = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bgCanvasRef = useRef<HTMLCanvasElement>(null); // Persistent layer
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState<{x: number, y: number}[]>([]);
    const [segments, setSegments] = useState(8);
    const [mode, setMode] = useState<SymmetryMode>('radial');
    const [brushSize, setBrushSize] = useState(4);
    const [color, setColor] = useState('#00ffff');
    const [rainbow, setRainbow] = useState(true);
    const [showUI, setShowUI] = useState(true);

    useEffect(() => {
        const resize = () => {
            if (canvasRef.current && bgCanvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                bgCanvasRef.current.width = window.innerWidth;
                bgCanvasRef.current.height = window.innerHeight;
                clearCanvas();
            }
        };
        window.addEventListener('resize', resize);
        resize();
        return () => window.removeEventListener('resize', resize);
    }, []);

    const clearCanvas = () => {
        const ctx = bgCanvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        }
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDrawing(true);
        const p = { x: e.clientX, y: e.clientY };
        setPoints([p]);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDrawing) return;
        const p = { x: e.clientX, y: e.clientY };
        const newPoints = [...points, p];
        setPoints(newPoints);

        const ctx = bgCanvasRef.current?.getContext('2d');
        if (ctx) {
            SymmetryEngine.draw({
                ctx,
                width: window.innerWidth,
                height: window.innerHeight,
                points: newPoints,
                mode,
                segments,
                color,
                brushSize,
                rainbow
            });
        }
    };

    const handlePointerUp = () => {
        setIsDrawing(false);
        setPoints([]);
    };

    const handleSave = () => {
        if (bgCanvasRef.current) {
            const link = document.createElement('a');
            link.download = 'mandala-art.png';
            link.href = bgCanvasRef.current.toDataURL();
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-[#050505] overflow-hidden font-sans select-none">
            {/* Background Canvas (Drawing Layer) */}
            <canvas 
                ref={bgCanvasRef} 
                className="absolute inset-0 w-full h-full"
            />
            
            {/* Interaction Canvas (Events) */}
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            />

            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="absolute top-10 left-10 flex items-center space-x-4 pointer-events-auto">
                    <div className="p-3 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl">
                        <Shield className="w-8 h-8 text-cyan-400 animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Symmetry Machine</h1>
                        <p className="text-[10px] text-cyan-400/60 uppercase tracking-[0.5em] mt-1 font-bold">Mathematical Mandala Art</p>
                    </div>
                </div>

                {/* Left Sidebar - Modes */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col space-y-4 pointer-events-auto">
                    {(['radial', 'mirror', 'kaleidoscope', 'rotational'] as SymmetryMode[]).map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
                                mode === m 
                                ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]' 
                                : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10'
                            }`}
                            title={m.toUpperCase()}
                        >
                            <Layout size={24} />
                        </button>
                    ))}
                </div>

                {/* Right Sidebar - Tools */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col space-y-4 pointer-events-auto">
                    <div className="bg-black/60 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl w-64 space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                                <span>Segments</span>
                                <span className="text-cyan-400">{segments}</span>
                            </div>
                            <input 
                                type="range" min="2" max="32" step="1" 
                                value={segments} onChange={(e) => setSegments(parseInt(e.target.value))}
                                className="w-full accent-cyan-500"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                                <span>Brush Size</span>
                                <span className="text-cyan-400">{brushSize}px</span>
                            </div>
                            <input 
                                type="range" min="1" max="20" step="1" 
                                value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))}
                                className="w-full accent-cyan-500"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                                <span>Color Mode</span>
                            </div>
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => setRainbow(!rainbow)}
                                    className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${rainbow ? 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500 border-white text-white' : 'bg-white/5 border-white/10 text-gray-400'}`}
                                >
                                    Rainbow
                                </button>
                                {!rainbow && (
                                    <input 
                                        type="color" 
                                        value={color} 
                                        onChange={(e) => setColor(e.target.value)}
                                        className="w-12 h-10 bg-transparent border-none cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={clearCanvas}
                        className="flex items-center justify-center space-x-3 p-5 bg-red-500/10 backdrop-blur-xl rounded-[2rem] border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all group"
                    >
                        <Trash2 size={20} className="group-hover:rotate-12 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Clear</span>
                    </button>
                </div>

                {/* Footer Controls */}
                <div className="absolute bottom-400 left-1/2 -translate-x-1/2 flex items-center space-x-6 pointer-events-auto">
                    <button onClick={handleSave} className="flex items-center space-x-3 px-8 py-4 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-cyan-500/20">
                        <Save size={18} />
                        <span>Export Art</span>
                    </button>
                    <div className="w-px h-10 bg-white/10" />
                    <p className="text-[9px] text-gray-500 uppercase tracking-[0.4em] font-medium">Mathematical Harmony • Pure Symmetry</p>
                </div>

                {/* Settings Toggle */}
                <button 
                    onClick={() => setShowUI(!showUI)}
                    className="absolute top-10 right-10 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 pointer-events-auto hover:bg-white/10 transition-all"
                >
                    <Settings className="w-6 h-6 text-white/50" />
                </button>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                input[type='range'] {
                    -webkit-appearance: none;
                    background: rgba(255, 255, 255, 0.05);
                    height: 4px;
                    border-radius: 2px;
                }
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #06b6d4;
                    cursor: pointer;
                    box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
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

export default SymmetryMachine;
