import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Settings, Sparkles, Download, RefreshCw, Play, Pause, Cloud } from 'lucide-react';
import { DreamRenderer } from './DreamRenderer';

const STYLES = ['Abstract', 'Cosmic', 'Organic', 'Cyberpunk', 'Liquid Surrealism'];

const AIDreamWorlds: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<DreamRenderer | null>(null);
    
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState(STYLES[0]);
    const [isGenerating, setIsGenerating] = useState(false);
    const generatingRef = useRef(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(0.005);
    const [showUI, setShowUI] = useState(true);

    const generateDream = useCallback(async (p: string, s: string) => {
        if (generatingRef.current) return;
        generatingRef.current = true;
        setIsGenerating(true);
        try {
            const response = await fetch('http://localhost:5000/api/dream/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: p, style: s }),
            });
            const data = await response.json();
            if (data.frames && rendererRef.current) {
                await rendererRef.current.loadFrames(data.frames);
            }
        } catch (err) {
            console.error("Dream Generation failed", err);
        } finally {
            generatingRef.current = false;
            setIsGenerating(false);
        }
    }, []);

    useEffect(() => {
        generateDream("nebula clouds in deep space", "Cosmic");
    }, [generateDream]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const gl = canvasRef.current.getContext('webgl2')!;
        rendererRef.current = new DreamRenderer(gl);

        let frameId: number;
        const render = (time: number) => {
            if (rendererRef.current && !isPaused) {
                rendererRef.current.render(time * 0.001, window.innerWidth, window.innerHeight, speed);
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
    }, [isPaused, speed]);


    const handleExport = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = 'ai-dream.png';
            link.href = canvasRef.current.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans">
            <canvas ref={canvasRef} className="w-full h-full" />

            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                        <Cloud className="w-6 h-6 text-sky-400 animate-bounce" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">AI Dream Worlds</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Endless Neural Interpolation</p>
                    </div>
                </div>

                {/* Interaction Box - Center Bottom */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 pointer-events-auto">
                    <div className="bg-black/60 backdrop-blur-2xl p-2 rounded-[2rem] border border-white/20 shadow-2xl flex items-center space-x-2">
                        <input 
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe your dream..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-white px-6 py-2 placeholder-gray-500"
                        />
                        <button 
                            onClick={() => generateDream(prompt, style)}
                            disabled={isGenerating}
                            className={`p-4 rounded-full transition-all ${isGenerating ? 'bg-gray-600' : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:scale-105'} text-white shadow-lg`}
                        >
                            {isGenerating ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
                        </button>
                    </div>
                </div>

                {/* Controls - Bottom */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6 pointer-events-auto bg-black/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/10 shadow-2xl overflow-x-auto max-w-[95vw]">
                    <div className="flex items-center space-x-2 px-2">
                        {STYLES.map((s) => (
                            <button
                                key={s}
                                onClick={() => setStyle(s)}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                                    style === s 
                                    ? 'bg-white text-black shadow-lg' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-6 bg-white/10 mx-2 flex-shrink-0" />

                    <div className="flex items-center space-x-1">
                        <button 
                            onClick={() => setIsPaused(!isPaused)}
                            className={`p-3 rounded-full transition-all ${isPaused ? 'bg-white text-black' : 'text-gray-400 hover:text-white bg-white/5'}`}
                        >
                            {isPaused ? <Play size={18} /> : <Pause size={18} />}
                        </button>

                        <div className="flex flex-col items-center px-2">
                            <span className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Speed</span>
                            <input 
                                type="range" min="0.001" max="0.02" step="0.001" 
                                value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}
                                className="w-20 accent-sky-500"
                            />
                        </div>

                        <button onClick={handleExport} className="p-3 text-emerald-400 hover:text-white bg-white/5 rounded-full transition-all">
                            <Download size={18} />
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

            {isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-6" />
                        <p className="text-white text-lg font-bold animate-pulse tracking-widest uppercase">Visualizing Dreams...</p>
                        <p className="text-gray-400 text-sm mt-2">Connecting to neural networks</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIDreamWorlds;
