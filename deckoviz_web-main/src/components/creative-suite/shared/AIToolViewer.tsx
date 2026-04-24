import React, { useState } from 'react';
import { Play, Pause, Maximize, Camera } from 'lucide-react';

interface AIToolViewerProps {
    title: string;
    subtitle: string;
    assetUrl: string; // Video or high-res image
    isStreaming?: boolean;
    overlayShaders?: string;
    onCapture?: () => void;
}

const AIToolViewer: React.FC<AIToolViewerProps> = ({
    title,
    subtitle,
    assetUrl,
    isStreaming = false,
    onCapture
}) => {
    const [isPlaying, setIsPlaying] = useState(true);

    return (
        <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
            {/* AI Asset Layer */}
            <div className="absolute inset-0 z-0">
                {assetUrl.endsWith('.mp4') ? (
                    <video 
                        src={assetUrl} 
                        autoPlay 
                        loop 
                        muted 
                        className="w-full h-full object-cover opacity-80"
                    />
                ) : (
                    <img 
                        src={assetUrl} 
                        alt={title}
                        className="w-full h-full object-cover opacity-80"
                    />
                )}
                {/* Visual Polish Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black opacity-40" />
            </div>

            {/* Viewport UI */}
            <div className="absolute top-10 right-10 flex space-x-3 z-10 pointer-events-auto">
                <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 transition-all text-white/60"
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button 
                    onClick={onCapture}
                    className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 transition-all text-white/60"
                >
                    <Camera size={20} />
                </button>
            </div>

            {/* Analysis Data (Mock) */}
            <div className="absolute bottom-10 left-10 z-10 text-left">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">AI Engine Latency: 42ms</span>
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tighter italic text-white/90 leading-none">{title}</h2>
                <p className="text-[10px] uppercase tracking-[0.6em] text-cyan-400 font-bold mt-4">{subtitle}</p>
            </div>
        </div>
    );
};

export default AIToolViewer;
