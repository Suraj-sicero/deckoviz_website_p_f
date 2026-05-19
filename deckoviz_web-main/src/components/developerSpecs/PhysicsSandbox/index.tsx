import React, { useRef, useState, useEffect } from 'react';
import { Settings, Play, Pause, Box, MousePointer2, Grid, Trash2, Download, Eraser, Scissors, Hand } from 'lucide-react';
import { PhysicsEngine, Point } from './PhysicsEngine';
import { useNavigate } from 'react-router-dom';

type ToolType = 'grab' | 'spawn' | 'cloth' | 'eraser' | 'scissors';

const PhysicsSandbox: React.FC = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<PhysicsEngine | null>(null);
    
    const [tool, setTool] = useState<ToolType>('grab');
    const [isPaused, setIsPaused] = useState(false);
    const [showUI, setShowUI] = useState(true);
    const [gravity, setGravity] = useState(0.5);
    const [wind, setWind] = useState(0);

    // Interaction state
    const [isDragging, setIsDragging] = useState(false);
    const [draggedPoint, setDraggedPoint] = useState<Point | null>(null);
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (engineRef.current) {
                engineRef.current.width = canvas.width;
                engineRef.current.height = canvas.height;
            }
        };

        const engine = new PhysicsEngine(window.innerWidth, window.innerHeight);
        engine.createCloth(window.innerWidth / 2 - 150, 100, 20, 15, 15);
        engine.createSoftBody(window.innerWidth / 4, window.innerHeight / 2, 60, 20);
        engineRef.current = engine;

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        let frameId: number;
        const ctx = canvas.getContext('2d')!;

        const loop = () => {
            if (engineRef.current && !isPaused) {
                engineRef.current.update();
                
                // Handle Grabbed Point
                if (draggedPoint) {
                    draggedPoint.x = mousePos.current.x;
                    draggedPoint.y = mousePos.current.y;
                }
            }
            
            // Render
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (engineRef.current) {
                const { points, constraints, clothMeshes } = engineRef.current;

                // 1. Draw Cloth as Filled Mesh (Triangles)
                ctx.lineWidth = 1;
                for (const mesh of clothMeshes) {
                    for (let y = 0; y < mesh.rows - 1; y++) {
                        for (let x = 0; x < mesh.cols - 1; x++) {
                            const p1 = mesh.points[y][x];
                            const p2 = mesh.points[y][x+1];
                            const p3 = mesh.points[y+1][x];
                            const p4 = mesh.points[y+1][x+1];

                            // Check if constraints still exist (not teared)
                            const isTeared = constraints.some(c => 
                                c.teared && ((c.p1 === p1 && c.p2 === p2) || (c.p1 === p1 && c.p2 === p3))
                            );
                            if (isTeared) continue;

                            ctx.fillStyle = `hsla(230, 70%, ${40 + y * 2}%, 0.8)`;
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.lineTo(p4.x, p4.y);
                            ctx.lineTo(p3.x, p3.y);
                            ctx.closePath();
                            ctx.fill();
                            
                            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
                            ctx.stroke();
                        }
                    }
                }

                // 2. Draw Constraints (Links)
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                for (const c of constraints) {
                    if (c.teared || c.type === 'cloth') continue;
                    ctx.moveTo(c.p1.x, c.p1.y);
                    ctx.lineTo(c.p2.x, c.p2.y);
                }
                ctx.stroke();

                // 3. Draw All Points (Particles & Pins)
                for (const p of points) {
                    ctx.fillStyle = p.pinned ? '#ef4444' : p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.pinned ? 4 : 2.5, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Add a subtle glow to particles
                    if (!p.pinned) {
                        ctx.shadowBlur = 5;
                        ctx.shadowColor = p.color;
                        ctx.stroke();
                        ctx.shadowBlur = 0;
                    }
                }
                
                if (draggedPoint) {
                    ctx.strokeStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc(draggedPoint.x, draggedPoint.y, 8, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            frameId = requestAnimationFrame(loop);
        };
        frameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(frameId);
    }, [isPaused, draggedPoint]);

    const handlePointerDown = (e: React.PointerEvent) => {
        if (!engineRef.current) return;
        const x = e.clientX;
        const y = e.clientY;
        mousePos.current = { x, y };

        if (tool === 'grab') {
            // Find closest point to grab
            let closest: Point | null = null;
            let minDist = 30;
            for (const p of engineRef.current.points) {
                const d = Math.sqrt((p.x - x)**2 + (p.y - y)**2);
                if (d < minDist) {
                    minDist = d;
                    closest = p;
                }
            }
            if (closest) {
                setDraggedPoint(closest);
                setIsDragging(true);
            }
        } else if (tool === 'scissors') {
            setIsDragging(true);
        } else if (tool === 'spawn') {
            for (let i = 0; i < 5; i++) {
                engineRef.current.addPoint(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20, false, '#fbbf24');
            }
        } else if (tool === 'cloth') {
            engineRef.current.createCloth(x - 50, y, 10, 8, 12);
        } else if (tool === 'eraser') {
            const engine = engineRef.current;
            engine.points = engine.points.filter(p => Math.sqrt((p.x - x)**2 + (p.y - y)**2) > 40);
            engine.constraints = engine.constraints.filter(c => 
                engine.points.includes(c.p1) && engine.points.includes(c.p2)
            );
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
        
        if (tool === 'scissors' && isDragging && engineRef.current) {
            engineRef.current.constraints = engineRef.current.constraints.filter(c => {
                const dist = distToSegment(mousePos.current, c.p1, c.p2);
                return dist > 15;
            });
        }
    };

    const handlePointerUp = () => {
        setDraggedPoint(null);
        setIsDragging(false);
    };

    const distToSegment = (p: {x:number, y:number}, v: {x:number, y:number}, w: {x:number, y:number}) => {
        const l2 = (v.x - w.x)**2 + (v.y - w.y)**2;
        if (l2 === 0) return Math.sqrt((p.x - v.x)**2 + (p.y - v.y)**2);
        let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return Math.sqrt((p.x - (v.x + t * (w.x - v.x)))**2 + (p.y - (v.y + t * (w.y - v.y)))**2);
    }

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans select-none">
            <canvas 
                ref={canvasRef} 
                className="w-full h-full touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            />

            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
                        <Box className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Physics Playground</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Interactive PBD Sandbox</p>
                    </div>
                </div>

                {/* Toolbox - Right */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-3 pointer-events-auto">
                    {[
                        { id: 'grab', icon: <Hand size={20} />, label: 'Grab' },
                        { id: 'spawn', icon: <MousePointer2 size={20} />, label: 'Particles' },
                        { id: 'cloth', icon: <Grid size={20} />, label: 'Cloth' },
                        { id: 'scissors', icon: <Scissors size={20} />, label: 'Cut' },
                        { id: 'eraser', icon: <Eraser size={20} />, label: 'Erase' },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTool(t.id as ToolType)}
                            className={`p-4 rounded-2xl border transition-all duration-300 flex items-center space-x-3 ${
                                tool === t.id 
                                ? 'bg-white text-black border-white shadow-2xl scale-110' 
                                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                            }`}
                        >
                            {t.icon}
                            <span className="text-[10px] font-bold uppercase tracking-wider">{t.label}</span>
                        </button>
                    ))}
                </div>

                {/* Controls - Bottom */}
                <div className="absolute bottom-400 left-1/2 -translate-x-1/2 flex items-center space-x-8 pointer-events-auto bg-black/60 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <button 
                        onClick={() => setIsPaused(!isPaused)}
                        className={`p-4 rounded-full transition-all ${isPaused ? 'bg-white text-black' : 'text-gray-400 hover:text-white bg-white/10'}`}
                    >
                        {isPaused ? <Play size={24} /> : <Pause size={24} />}
                    </button>

                    <div className="w-px h-10 bg-white/10" />

                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between text-[8px] text-gray-500 uppercase tracking-widest font-bold">
                            <span>Gravity</span>
                            <span className="text-indigo-400">{gravity.toFixed(1)}</span>
                        </div>
                        <input 
                            type="range" min="-1" max="2" step="0.1" 
                            value={gravity}
                            onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setGravity(val);
                                if (engineRef.current) engineRef.current.params.gravity = val;
                            }}
                            className="w-32 accent-indigo-500"
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between text-[8px] text-gray-500 uppercase tracking-widest font-bold">
                            <span>Wind</span>
                            <span className="text-sky-400">{wind.toFixed(1)}</span>
                        </div>
                        <input 
                            type="range" min="-1" max="1" step="0.1" 
                            value={wind}
                            onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setWind(val);
                                if (engineRef.current) engineRef.current.params.wind = val;
                            }}
                            className="w-32 accent-sky-400"
                        />
                    </div>

                    <div className="w-px h-10 bg-white/10" />

                    <button onClick={() => engineRef.current?.clear()} className="p-4 text-gray-400 hover:text-red-400 bg-white/5 rounded-full transition-all">
                        <Trash2 size={20} />
                    </button>

                    <button 
                        onClick={() => {
                            if (canvasRef.current) {
                                const link = document.createElement('a');
                                link.download = 'physics-playground.png';
                                link.href = canvasRef.current.toDataURL('image/png');
                                link.click();
                            }
                        }} 
                        className="p-4 text-emerald-400 hover:text-emerald-300 bg-white/5 rounded-full transition-all"
                    >
                        <Download size={20} />
                    </button>
                </div>

                {/* Interaction Help */}
                <div className="absolute bottom-400 right-8 text-[10px] text-gray-500 uppercase tracking-[0.2em] italic font-medium">
                   Drag to interact • Tool active: {tool}
                </div>

                <button 
                    onClick={() => setShowUI(!showUI)}
                    className="absolute top-8 right-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 pointer-events-auto hover:bg-white/20 transition-all shadow-xl"
                >
                    <Settings className={`w-6 h-6 text-white transition-transform duration-500 ${showUI ? 'rotate-90' : ''}`} />
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
                    background: white;
                    cursor: pointer;
                    box-shadow: 0 0 15px rgba(255,255,255,0.3);
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

export default PhysicsSandbox;
