import React, { useRef, useState, useEffect } from 'react';
import { Settings, Camera, CameraOff, RefreshCw, Layers, Sparkles, Activity, Zap, Download } from 'lucide-react';
import { PoseTracker } from './PoseTracker';
import { MotionRenderer, MotionMode } from './MotionRenderer';

const MotionArt: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const trackerRef = useRef<PoseTracker | null>(null);
    const rendererRef = useRef<MotionRenderer | null>(null);
    
    const [mode, setMode] = useState<MotionMode>('trail');
    const [showPreview, setShowPreview] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [showUI, setShowUI] = useState(true);

    useEffect(() => {
        if (!canvasRef.current || !videoRef.current) return;
        
        const ctx = canvasRef.current.getContext('2d')!;
        rendererRef.current = new MotionRenderer(ctx);
        
        trackerRef.current = new PoseTracker((results) => {
            if (rendererRef.current && canvasRef.current) {
                rendererRef.current.render(results);
            }
        });

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                rendererRef.current?.setViewport(window.innerWidth, window.innerHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            trackerRef.current?.stop();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [error, setError] = useState<string | null>(null);

    const toggleCamera = async () => {
        setError(null);
        if (isActive) {
            trackerRef.current?.stop();
            setIsActive(false);
        } else {
            if (videoRef.current) {
                try {
                    await trackerRef.current?.start(videoRef.current);
                    setIsActive(true);
                } catch (err) {
                    console.error("Camera access failed", err);
                    setError("Camera access denied or failed to load AI models.");
                }
            }
        }
    };

    const handleExport = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = 'motion-art.png';
            link.href = canvasRef.current.toDataURL();
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans select-none">
            {/* Webcam hidden/preview */}
            <video 
                ref={videoRef} 
                className={`absolute top-4 right-4 w-48 h-36 rounded-2xl border-2 border-white/20 object-cover z-50 transition-opacity ${showPreview && isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                autoPlay 
                playsInline
                muted
            />

            {/* Main Art Canvas */}
            <canvas ref={canvasRef} className="w-full h-full" />

            {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-40">
                    <div className="text-center space-y-8 max-w-md px-6">
                        <div className="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto border border-cyan-500/50">
                            <Camera className="w-12 h-12 text-cyan-400" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Motion Art Engine</h2>
                            <p className="text-gray-400 text-sm">Your body is the brush. Grant camera access to begin your digital performance.</p>
                        </div>
                        <button 
                            onClick={toggleCamera}
                            className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-cyan-500/20"
                        >
                            Activate System
                        </button>
                        {error && <p className="text-red-500 text-xs font-bold uppercase animate-bounce">{error}</p>}
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Privacy: All processing happens locally on your device.</p>
                    </div>
                </div>
            )}

            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
                    <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                        <Activity className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight uppercase italic">Human Motion Art</h1>
                        <p className="text-xs text-cyan-400/60 uppercase tracking-widest font-bold">Neural Kinetic Performance</p>
                    </div>
                </div>

                {/* Mode Selector - Right */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4 pointer-events-auto">
                    {[
                        { id: 'trail', name: 'Fluid Trails', icon: <Layers /> },
                        { id: 'particles', name: 'Kinetics', icon: <Sparkles /> },
                        { id: 'skeleton', name: 'Stylized', icon: <Activity /> },
                        { id: 'energy', name: 'Aura', icon: <Zap /> },
                    ].map((m) => (
                        <button
                            key={m.id}
                            onClick={() => {
                                setMode(m.id as MotionMode);
                                if (rendererRef.current) rendererRef.current.params.mode = m.id as MotionMode;
                            }}
                            className={`p-4 rounded-2xl border transition-all duration-500 group flex items-center space-x-4 ${
                                mode === m.id 
                                ? 'bg-white text-black border-white shadow-2xl scale-110' 
                                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <span className="group-hover:scale-110 transition-transform">{m.icon}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">{m.name}</span>
                        </button>
                    ))}
                </div>

                {/* Controls - Bottom */}
                <div className="absolute bottom-400 left-1/2 -translate-x-1/2 flex items-center space-x-8 pointer-events-auto bg-black/40 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    
                    <button 
                        onClick={() => setShowPreview(!showPreview)}
                        className={`p-4 rounded-full transition-all ${showPreview ? 'bg-cyan-500 text-black' : 'bg-white/10 text-gray-400 hover:text-white'}`}
                    >
                        {showPreview ? <Camera size={20} /> : <CameraOff size={20} />}
                    </button>

                    <div className="w-px h-10 bg-white/10" />

                    <div className="flex flex-col space-y-2">
                        <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Intensity</span>
                        <input 
                            type="range" min="5" max="50" step="5" 
                            defaultValue="20"
                            onChange={(e) => {
                                if (rendererRef.current) {
                                    rendererRef.current.params.trailLength = parseInt(e.target.value);
                                    rendererRef.current.params.particleDensity = Math.floor(parseInt(e.target.value) / 4);
                                }
                            }}
                            className="w-32 accent-cyan-500"
                        />
                    </div>

                    <div className="w-px h-10 bg-white/10" />

                    <button onClick={handleExport} className="p-4 text-cyan-400 hover:text-white bg-white/10 rounded-full transition-all">
                        <Download size={20} />
                    </button>
                    
                    <button onClick={() => {
                        if (rendererRef.current) {
                            rendererRef.current.trails.clear();
                            rendererRef.current.particles = [];
                        }
                    }} className="p-4 text-red-400 hover:text-white bg-white/10 rounded-full transition-all">
                        <RefreshCw size={20} />
                    </button>
                </div>

                {/* Settings Toggle */}
                <button 
                    onClick={() => setShowUI(!showUI)}
                    className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 pointer-events-auto hover:bg-white/20 transition-all"
                >
                    <Settings className="w-6 h-6 text-white/50" />
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
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #22d3ee;
                    cursor: pointer;
                    box-shadow: 0 0 15px rgba(34, 211, 238, 0.3);
                }
            `}} />
        </div>
    );
};

export default MotionArt;
