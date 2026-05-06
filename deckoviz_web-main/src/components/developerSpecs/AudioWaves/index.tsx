import React, { useRef, useState, useEffect } from 'react';
import { Settings, Play, Pause, Mic, Music, Upload } from 'lucide-react';
import { AudioAnalyzer } from './AudioAnalyzer';
import { WaveSimulation } from './WaveSimulation';

const PRESETS = {
    Ethereal: {
        color1: [0.5, 0.2, 1.0], // Violet
        color2: [0.0, 0.8, 1.0], // Cyan
        intensity: 0.8,
        patternMode: 0
    },
    Inferno: {
        color1: [1.0, 0.2, 0.0], // Red
        color2: [1.0, 0.8, 0.0], // Yellow
        intensity: 1.2,
        patternMode: 1
    },
    Matrix: {
        color1: [0.0, 1.0, 0.2], // Green
        color2: [0.0, 0.4, 0.1], // Dark Green
        intensity: 0.9,
        patternMode: 2
    },
    Ocean: {
        color1: [0.0, 0.2, 0.8], // Deep Blue
        color2: [0.4, 1.0, 0.8], // Aquamarine
        intensity: 1.0,
        patternMode: 3
    }
};

const AudioWaves: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const analyzerRef = useRef<AudioAnalyzer | null>(null);
    const simulationRef = useRef<WaveSimulation | null>(null);
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMic, setIsMic] = useState(false);
    const [currentPreset, setCurrentPreset] = useState<keyof typeof PRESETS>('Ethereal');
    const [showUI, setShowUI] = useState(true);
    const [fileName, setFileName] = useState<string | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const gl = canvasRef.current.getContext('webgl2')!;
        simulationRef.current = new WaveSimulation(gl);
        analyzerRef.current = new AudioAnalyzer();

        let frameId: number;
        const render = (time: number) => {
            if (analyzerRef.current && simulationRef.current) {
                const bands = analyzerRef.current.update();
                simulationRef.current.params.bass = bands.bass;
                simulationRef.current.params.mid = bands.mid;
                simulationRef.current.params.treble = bands.treble;
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

    const handlePlayPause = () => {
        if (!audioRef.current || !analyzerRef.current) return;
        
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            analyzerRef.current.resume();
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && audioRef.current && analyzerRef.current) {
            const url = URL.createObjectURL(file);
            audioRef.current.src = url;
            setFileName(file.name);
            setIsMic(false);
            
            // Re-init analyzer source if needed
            analyzerRef.current.initFile(audioRef.current);
            handlePlayPause();
        }
    };

    const handleMicToggle = async () => {
        if (!analyzerRef.current) return;
        
        if (!isMic) {
            try {
                await analyzerRef.current.initMic();
                setIsMic(true);
                if (audioRef.current) audioRef.current.pause();
                setIsPlaying(false);
            } catch (err) {
                console.error("Mic access denied", err);
            }
        } else {
            analyzerRef.current.stopMic();
            setIsMic(false);
            // Restore file source if it exists
            if (audioRef.current && audioRef.current.src) {
                analyzerRef.current.initFile(audioRef.current);
            }
        }
    };

    const handlePresetChange = (preset: keyof typeof PRESETS) => {
        setCurrentPreset(preset);
        if (simulationRef.current) {
            Object.assign(simulationRef.current.params, PRESETS[preset]);
        }
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans">
            <canvas ref={canvasRef} className="w-full h-full" />
            
            <audio ref={audioRef} crossOrigin="anonymous" hidden />

            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                        <Music className="w-6 h-6 text-pink-400 animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Light Waves</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Audio-Reactive Visualization</p>
                    </div>
                </div>

                {/* Controls - Bottom */}
                <div className="absolute bottom-400 left-1/2 -translate-x-1/2 flex items-center space-x-4 pointer-events-auto bg-black/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/10 shadow-2xl overflow-x-auto max-w-[95vw]">
                    
                    <div className="flex items-center space-x-1">
                        <button 
                            onClick={handlePlayPause}
                            disabled={isMic || !audioRef.current?.src}
                            className={`p-3 rounded-full transition-all ${isPlaying ? 'bg-white text-black' : 'text-gray-400 hover:text-white bg-white/5'}`}
                        >
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>

                        <button 
                            onClick={handleMicToggle}
                            className={`p-3 rounded-full transition-all ${isMic ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-white bg-white/5'}`}
                        >
                            <Mic size={20} />
                        </button>

                        <div className="flex flex-col items-center">
                            <span className="text-[8px] text-gray-500 uppercase mb-1">Sensitivity</span>
                            <input 
                                type="range" min="0.1" max="2" step="0.1" 
                                value={simulationRef.current?.params.intensity || 0.8}
                                className="w-24 accent-pink-500"
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    if(simulationRef.current) simulationRef.current.params.intensity = val;
                                }}
                            />
                        </div>

                        <div className="w-px h-6 bg-white/10 mx-2 flex-shrink-0" />

                        <label className="flex items-center space-x-2 px-4 py-2 bg-pink-500/20 hover:bg-pink-500/40 text-pink-400 rounded-full cursor-pointer transition-all border border-pink-500/30 group">
                            <Upload size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest">Import MP3</span>
                            <input type="file" accept="audio/*" className="hidden" onChange={handleFileUpload} />
                        </label>
                    </div>

                    <div className="w-px h-6 bg-white/10 mx-2 flex-shrink-0" />

                    <div className="flex items-center space-x-2">
                        {Object.keys(PRESETS).map((p) => (
                            <button
                                key={p}
                                onClick={() => handlePresetChange(p as keyof typeof PRESETS)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                                    currentPreset === p 
                                    ? 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white scale-105 shadow-lg' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    {fileName && (
                        <div className="ml-4 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 max-w-[150px] truncate">
                            <span className="text-[10px] text-gray-400 truncate block">{fileName}</span>
                        </div>
                    )}
                </div>

                {/* Settings Toggle */}
                <button 
                    onClick={() => setShowUI(!showUI)}
                    className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 pointer-events-auto hover:bg-white/20 transition-all"
                >
                    <Settings className="w-6 h-6 text-white" />
                </button>
            </div>
        </div>
    );
};

export default AudioWaves;
