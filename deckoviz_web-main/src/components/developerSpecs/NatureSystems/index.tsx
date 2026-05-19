import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Settings, RefreshCw, Leaf, Play, Pause, Download, Share2, Sprout } from 'lucide-react';
import { L_SYSTEM_PRESETS, LSystem } from './LSystem';
import { SpaceColonization, Node } from './SpaceColonization';
import { useNavigate } from 'react-router-dom';

interface Segment {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    thickness: number;
}


const NatureSystems: React.FC = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mode, setMode] = useState<'lsystem' | 'space'>('lsystem');
    const [preset, setPreset] = useState<keyof typeof L_SYSTEM_PRESETS>('Tree');
    const [iterations, setIterations] = useState(mode === 'lsystem' ? 4 : 20);
    const [growthRate, setGrowthRate] = useState(50);
    const [isGrowing, setIsGrowing] = useState(true);
    const [showUI, setShowUI] = useState(true);

    const lsystemRef = useRef<LSystem | null>(null);
    const spaceRef = useRef<SpaceColonization | null>(null);
    const growthIndexRef = useRef(0);
    const segmentsRef = useRef<(Segment | Node)[]>([]);



    const initSystem = useCallback(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        
        if (mode === 'lsystem') {
            const p = L_SYSTEM_PRESETS[preset];
            const ls = new LSystem(p.axiom, p.rules, p.angle);
            for(let i = 0; i < iterations; i++) ls.generate();
            lsystemRef.current = ls;
            segmentsRef.current = ls.getSegments(canvas.width / 2, canvas.height - 50, 10 - iterations, 0.8);
        } else {
            spaceRef.current = new SpaceColonization(canvas.width, canvas.height, 600);
            segmentsRef.current = [];
        }
        growthIndexRef.current = 0;
    }, [mode, preset, iterations]);

    useEffect(() => {
        initSystem();
    }, [initSystem]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')!;
        
        let frameId: number;
        const loop = () => {
            if (isGrowing) {
                if (mode === 'lsystem') {
                    growthIndexRef.current = Math.min(segmentsRef.current.length, growthIndexRef.current + growthRate / 10);
                } else if (spaceRef.current) {
                    spaceRef.current.grow();
                    segmentsRef.current = spaceRef.current.nodes;
                    growthIndexRef.current = segmentsRef.current.length;
                }
            }

            // Render
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.lineCap = 'round';
            if (mode === 'lsystem') {
                for (let i = 0; i < Math.floor(growthIndexRef.current); i++) {
                    const s = segmentsRef.current[i] as Segment;
                    ctx.strokeStyle = `rgba(100, 200, 100, ${0.4 + (i / segmentsRef.current.length) * 0.6})`;
                    ctx.lineWidth = s.thickness;
                    ctx.beginPath();
                    ctx.moveTo(s.x1, s.y1);
                    ctx.lineTo(s.x2, s.y2);
                    ctx.stroke();
                }
            } else {
                for (const item of segmentsRef.current) {
                    const node = item as Node;
                    if (node.parent) {
                        ctx.strokeStyle = '#8B4513';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(node.parent.x, node.parent.y);
                        ctx.lineTo(node.x, node.y);
                        ctx.stroke();
                    }
                }
            }

            frameId = requestAnimationFrame(loop);
        };
        frameId = requestAnimationFrame(loop);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initSystem();
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [isGrowing, mode, iterations, growthRate, initSystem]);

    const handleExportPNG = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = 'nature-system.png';
            link.href = canvasRef.current.toDataURL('image/png');
            link.click();
        }
    };

    const handleExportSVG = () => {
        if (!canvasRef.current) return;
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        
        let svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" style="background:#050505">`;
        if (mode === 'lsystem') {
            segmentsRef.current.forEach(item => {
                const s = item as Segment;
                svgContent += `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="green" stroke-width="${s.thickness}" stroke-linecap="round" />`;
            });
        } else {
            segmentsRef.current.forEach(item => {
                const node = item as Node;
                if(node.parent) {
                    svgContent += `<line x1="${node.parent.x}" y1="${node.parent.y}" x2="${node.x}" y2="${node.y}" stroke="brown" stroke-width="2" stroke-linecap="round" />`;
                }
            });
        }
        svgContent += `</svg>`;
        
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'nature-system.svg';
        link.click();
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans select-none">
            <canvas ref={canvasRef} className="w-full h-full touch-none" />

            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                        <Sprout className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Generative Nature</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Algorithmic Growth Simulation</p>
                    </div>
                </div>

                {/* Sidebar - Right */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4 pointer-events-auto">
                    <div className="bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl flex flex-col space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Growth Engine</h3>
                            <div className="flex bg-white/5 rounded-xl p-1">
                                <button 
                                    onClick={() => setMode('lsystem')}
                                    className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'lsystem' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                >
                                    L-System
                                </button>
                                <button 
                                    onClick={() => setMode('space')}
                                    className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'space' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Space Colon.
                                </button>
                            </div>
                        </div>

                        {mode === 'lsystem' && (
                            <div className="space-y-4">
                                <h3 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Species</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {(Object.keys(L_SYSTEM_PRESETS) as Array<keyof typeof L_SYSTEM_PRESETS>).map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setPreset(p)}
                                            className={`p-2 rounded-xl border transition-all ${preset === p ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-gray-400'}`}
                                        >
                                            <Leaf size={18} className="mx-auto" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <h3 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Parameters</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                                        <span>ITERATIONS</span>
                                        <span>{iterations}</span>
                                    </div>
                                    <input 
                                        type="range" min="1" max={mode === 'lsystem' ? 6 : 100} 
                                        value={iterations} onChange={(e) => setIterations(parseInt(e.target.value))}
                                        className="w-full accent-emerald-500" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                                        <span>GROWTH SPEED</span>
                                        <span>{growthRate}%</span>
                                    </div>
                                    <input 
                                        type="range" min="1" max="100" 
                                        value={growthRate} onChange={(e) => setGrowthRate(parseInt(e.target.value))}
                                        className="w-full accent-emerald-500" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-400 left-1/2 -translate-x-1/2 flex items-center space-x-6 pointer-events-auto bg-black/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <button 
                        onClick={() => setIsGrowing(!isGrowing)}
                        className={`p-4 rounded-full transition-all ${isGrowing ? 'bg-emerald-500 text-white shadow-emerald-500/50 shadow-lg animate-pulse' : 'bg-white/10 text-gray-400 hover:text-white'}`}
                    >
                        {isGrowing ? <Pause size={20} /> : <Play size={20} />}
                    </button>

                    <div className="w-px h-10 bg-white/10" />

                    <button onClick={initSystem} className="p-4 text-gray-400 hover:text-white bg-white/10 rounded-full transition-all">
                        <RefreshCw size={20} />
                    </button>

                    <div className="flex items-center space-x-2">
                        <button onClick={handleExportPNG} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center space-x-2">
                            <Download size={16} />
                            <span>PNG</span>
                        </button>
                        <button onClick={handleExportSVG} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center space-x-2">
                            <Share2 size={16} />
                            <span>SVG</span>
                        </button>
                    </div>
                </div>

                {/* Settings Toggle */}
                <button 
                    onClick={() => setShowUI(!showUI)}
                    className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 pointer-events-auto hover:bg-white/20 transition-all"
                >
                    <Settings className="w-6 h-6 text-white" />
                </button>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                input[type='range'] {
                    -webkit-appearance: none;
                    background: rgba(255, 255, 255, 0.1);
                    height: 4px;
                    border-radius: 2px;
                }
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #10b981;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
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

export default NatureSystems;
