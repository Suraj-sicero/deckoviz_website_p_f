import React, { useRef, useState, useEffect } from 'react';
import { Settings, Palette, Image as ImageIcon, Wind, Sparkles, Sun, Moon, Clock } from 'lucide-react';
import { PaintingSimulation } from './PaintingSimulation';

const ARTWORKS = [
    { name: 'Cosmic Abstract', url: '/images/Gemini_Generated_Image_3gz8ov3gz8ov3gz8.jpeg' },
    { name: 'Mystic Garden', url: '/images/Gemini_Generated_Image_8hi6d38hi6d38hi6.jpeg' },
    { name: 'Ethereal Soul', url: '/images/Gemini_Generated_Image_bkxvxjbkxvxjbkxv.jpg' },
    { name: 'Fluid Dreams', url: '/images/Gemini_Generated_Image_bs0t6wbs0t6wbs0t.jpeg' },
];

const LivingPaintings: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const simulationRef = useRef<PaintingSimulation | null>(null);
    const [currentArtwork, setCurrentArtwork] = useState(ARTWORKS[0]);
    const [showUI, setShowUI] = useState(true);
    const [loading, setLoading] = useState(true);
    const [dayTime, setDayTime] = useState(0.0); // 0 (Day) -> 0.5 (Sunset) -> 1.0 (Night)

    useEffect(() => {
        if (!canvasRef.current) return;
        const gl = canvasRef.current.getContext('webgl2')!;
        const sim = new PaintingSimulation(gl);
        simulationRef.current = sim;

        let frameId: number;
        const render = (time: number) => {
            if (simulationRef.current) {
                // Auto-evolve time very slowly if not manually adjusted
                // setDayTime(prev => (prev + 0.0001) % 1.0); // We'll use a local ref or effect for this if we want it auto
                simulationRef.current.render(time * 0.001, window.innerWidth, window.innerHeight);
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
    }, []);

    // Auto-evolution effect
    useEffect(() => {
        const interval = setInterval(() => {
            setDayTime(prev => {
                const next = prev + 0.0005;
                if (simulationRef.current) simulationRef.current.params.dayTime = next % 1.0;
                return next % 1.0;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (simulationRef.current) {
            setLoading(true);
            simulationRef.current.loadTexture(currentArtwork.url).then(() => {
                setLoading(false);
            });
        }
    }, [currentArtwork]);

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans select-none">
            <canvas ref={canvasRef} className="w-full h-full" />

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-white text-sm font-medium animate-pulse tracking-widest uppercase">Breathing life into art...</p>
                    </div>
                </div>
            )}

            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
                        <ImageIcon className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Living Paintings</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Slow-Evolving Digital Canvas</p>
                    </div>
                </div>

                {/* Gallery - Right Side */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4 pointer-events-auto">
                    {ARTWORKS.map((art) => (
                        <button
                            key={art.name}
                            onClick={() => setCurrentArtwork(art)}
                            className={`group relative overflow-hidden rounded-2xl border transition-all duration-700 ${
                                currentArtwork.name === art.name 
                                ? 'w-48 h-28 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-105' 
                                : 'w-36 h-20 border-white/5 grayscale hover:grayscale-0 hover:border-white/20'
                            }`}
                        >
                            <img src={art.url} alt={art.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                                <span className="text-[10px] text-white font-bold tracking-wider truncate uppercase">{art.name}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Time Indicator - Top Right */}
                <div className="absolute top-8 right-32 px-6 py-3 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center space-x-3 pointer-events-auto">
                    {dayTime < 0.3 ? <Sun className="text-yellow-400 w-5 h-5" /> : 
                     dayTime < 0.7 ? <Clock className="text-orange-400 w-5 h-5" /> : 
                     <Moon className="text-blue-400 w-5 h-5" />}
                    <div className="flex flex-col">
                        <span className="text-[8px] text-gray-500 uppercase tracking-widest">Evolution Cycle</span>
                        <div className="w-32 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 via-orange-500 to-indigo-900 transition-all duration-500" style={{ width: `${dayTime * 100}%` }} />
                        </div>
                    </div>
                </div>

                {/* Controls - Bottom */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-8 pointer-events-auto bg-black/60 backdrop-blur-2xl px-10 py-6 rounded-[3rem] border border-white/10 shadow-2xl">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 text-white/40">
                            <Wind size={14} />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Warp</span>
                        </div>
                        <input 
                            type="range" min="0" max="3" step="0.1" 
                            defaultValue="1.0"
                            onChange={(e) => simulationRef.current && (simulationRef.current.params.warpStrength = parseFloat(e.target.value))}
                            className="w-32 accent-orange-500"
                        />
                    </div>

                    <div className="w-px h-10 bg-white/10" />

                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 text-white/40">
                            <Clock size={14} />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Drift</span>
                        </div>
                        <input 
                            type="range" min="0.01" max="0.2" step="0.01" 
                            defaultValue="0.05"
                            onChange={(e) => simulationRef.current && (simulationRef.current.params.motionSpeed = parseFloat(e.target.value))}
                            className="w-32 accent-blue-500"
                        />
                    </div>

                    <div className="w-px h-10 bg-white/10" />

                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 text-white/40">
                            <Sparkles size={14} />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Dust</span>
                        </div>
                        <input 
                            type="range" min="0" max="1" step="0.1" 
                            defaultValue="0.3"
                            onChange={(e) => simulationRef.current && (simulationRef.current.params.dustIntensity = parseFloat(e.target.value))}
                            className="w-32 accent-yellow-400"
                        />
                    </div>
                    
                    <div className="w-px h-10 bg-white/10" />

                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 text-white/40">
                            <Sun size={14} />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Time</span>
                        </div>
                        <input 
                            type="range" min="0" max="1" step="0.01" 
                            value={dayTime}
                            onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setDayTime(val);
                                if(simulationRef.current) simulationRef.current.params.dayTime = val;
                            }}
                            className="w-32 accent-orange-300"
                        />
                    </div>
                </div>

                {/* Settings Toggle */}
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
                    border: 2px solid currentColor;
                }
            `}} />
        </div>
    );
};

export default LivingPaintings;
