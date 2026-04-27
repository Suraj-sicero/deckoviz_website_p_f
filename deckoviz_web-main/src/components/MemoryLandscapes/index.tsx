import React, { useEffect, useRef, useState } from 'react';
import { WorldEngine } from './WorldEngine';
import { SceneParser } from './SceneParser';
import { SceneConfig, PRESETS } from './types';
import { 
    Send, 
    Sparkles, 
    Camera, 
    RotateCcw, 
    Download, 
    Wind, 
    CloudRain, 
    CloudFog, 
    Sun,
    MessageSquare,
    Layers,
    Share2
} from 'lucide-react';

const MemoryLandscapes: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<WorldEngine | null>(null);
    
    const [inputText, setInputText] = useState('');
    const [currentConfig, setCurrentConfig] = useState<SceneConfig>(PRESETS['Childhood Memory']);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showUI, setShowUI] = useState(true);

    useEffect(() => {
        if (!containerRef.current) return;
        
        engineRef.current = new WorldEngine(containerRef.current);
        engineRef.current.updateScene(currentConfig);
        engineRef.current.animate();

        return () => {
            engineRef.current?.dispose();
        };
    }, []);

    const handleGenerate = () => {
        if (!inputText.trim()) return;
        setIsGenerating(true);
        
        // Simulation of processing
        setTimeout(() => {
            const newConfig = SceneParser.parse(inputText);
            setCurrentConfig(newConfig);
            engineRef.current?.updateScene(newConfig);
            setIsGenerating(false);
        }, 1500);
    };

    const handlePreset = (name: string) => {
        const config = PRESETS[name];
        setCurrentConfig(config);
        engineRef.current?.updateScene(config);
    };

    const captureScreenshot = () => {
        const canvas = containerRef.current?.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = `memory-landscape-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-[#050505] overflow-hidden font-sans">
            {/* 3D Canvas Container */}
            <div ref={containerRef} className="absolute inset-0 z-0" />

            {/* UI Overlay */}
            <div className={`relative z-10 w-full h-full flex flex-col justify-between p-8 pointer-events-none transition-opacity duration-700 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                
                {/* Header */}
                <header className="flex justify-between items-start">
                    <div className="flex items-center space-x-4 pointer-events-auto">
                        <div className="p-3 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl">
                            <Wind className="w-8 h-8 text-indigo-400 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Memory Landscapes</h1>
                            <p className="text-[10px] text-indigo-300/60 uppercase tracking-[0.4em] font-bold">Emotional Spatial Synthesis</p>
                        </div>
                    </div>

                    <div className="flex space-x-2 pointer-events-auto">
                        <button onClick={captureScreenshot} className="p-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 transition-all text-emerald-400">
                            <Camera size={20} />
                        </button>
                        <button onClick={() => setShowUI(false)} className="p-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 transition-all text-white">
                            <Layers size={20} />
                        </button>
                    </div>
                </header>

                {/* Main Interaction Area */}
                <main className="flex flex-col items-center space-y-8 w-full max-w-2xl mx-auto mb-12">
                    
                    {/* Prompt Box */}
                    <div className="w-full pointer-events-auto group">
                        <div className="relative flex items-center p-2 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl focus-within:border-indigo-500/50 transition-all">
                            <div className="pl-6 pr-4">
                                <MessageSquare className="w-5 h-5 text-indigo-400" />
                            </div>
                            <input 
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                placeholder="Describe a memory or a mood..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-white/30 py-4 text-sm"
                            />
                            <button 
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className={`p-4 rounded-full transition-all ${isGenerating ? 'bg-indigo-500/50 cursor-wait' : 'bg-gradient-to-tr from-indigo-600 to-purple-600 hover:scale-105 active:scale-95'} text-white shadow-xl`}
                            >
                                {isGenerating ? <RotateCcw className="animate-spin" size={20} /> : <Send size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Presets & Controls */}
                    <div className="flex flex-wrap justify-center gap-3 pointer-events-auto">
                        {Object.keys(PRESETS).map((p) => (
                            <button
                                key={p}
                                onClick={() => handlePreset(p)}
                                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                                    currentConfig.emotion === PRESETS[p].emotion 
                                    ? 'bg-white text-black border-white' 
                                    : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </main>

                {/* Footer Info */}
                <footer className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-white/20">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                            <span>Neural Interpretation Active</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                {currentConfig.weather === 'rain' && <CloudRain size={12} />}
                                {currentConfig.weather === 'fog' && <CloudFog size={12} />}
                                {currentConfig.weather === 'clear' && <Sun size={12} />}
                                <span>{currentConfig.weather}</span>
                            </div>
                            <span>/</span>
                            <span>{currentConfig.environment}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Share2 size={14} className="hover:text-white cursor-pointer transition-colors" />
                        <span>Build 0.9.2</span>
                    </div>
                </footer>
            </div>

            {/* Generator Overlay */}
            {isGenerating && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 mb-6">
                            <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
                            <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin" />
                            <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-indigo-400 animate-pulse" />
                        </div>
                        <h2 className="text-xl font-bold text-white uppercase tracking-[0.5em] animate-pulse">Synthesizing World...</h2>
                        <p className="text-indigo-300/40 text-[10px] mt-4 uppercase tracking-widest">Mapping semantics to geometry</p>
                    </div>
                </div>
            )}

            {!showUI && (
                <button 
                    onClick={() => setShowUI(true)}
                    className="absolute top-8 right-8 z-30 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 transition-all text-white"
                >
                    <Layers size={20} />
                </button>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes drift {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                ::-webkit-scrollbar { display: none; }
            `}} />
        </div>
    );
};

export default MemoryLandscapes;
