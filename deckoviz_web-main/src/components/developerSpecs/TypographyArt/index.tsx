import React, { useRef, useState, useEffect } from 'react';
import { Settings, Type, Wand2, Zap } from 'lucide-react';
import { TypographyRenderer } from './TypographyRenderer';
import { useNavigate } from 'react-router-dom';

const TypographyArt: React.FC = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<TypographyRenderer | null>(null);
    const [text, setText] = useState('DECKOVIZ');
    const [showUI, setShowUI] = useState(true);
    const [color, setColor] = useState('#00ccff');

    useEffect(() => {
        if (!canvasRef.current) return;
        const gl = canvasRef.current.getContext('webgl2', { preserveDrawingBuffer: true, alpha: false })!;
        rendererRef.current = new TypographyRenderer(gl);

        let frameId: number;
        const render = (time: number) => {
            if (rendererRef.current) {
                rendererRef.current.render(time * 0.001, window.innerWidth, window.innerHeight);
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

    useEffect(() => {
        if (rendererRef.current) {
            rendererRef.current.updateText(text);
        }
    }, [text]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toUpperCase();
        setText(val);
        if (rendererRef.current) {
            rendererRef.current.updateText(val);
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (rendererRef.current) {
            rendererRef.current.params.mouse = [
                e.clientX / window.innerWidth,
                1.0 - e.clientY / window.innerHeight
            ];
        }
    };

    const hexToRgb = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return [r, g, b];
    };

    const handleColorChange = (hex: string) => {
        setColor(hex);
        if (rendererRef.current) {
            rendererRef.current.params.color = hexToRgb(hex);
        }
    };

    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            }
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans select-none" onPointerMove={handlePointerMove}>
            <canvas ref={canvasRef} className="w-full h-full touch-none" />

            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                        <Type className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Typography Art</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">SDF Deformation System</p>
                    </div>
                </div>

                {/* Input Console - Center Bottom */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 pointer-events-auto">
                    <div className="bg-black/60 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col space-y-4">
                        <div className="relative">
                            <input 
                                type="text"
                                value={text}
                                onChange={handleTextChange}
                                maxLength={20}
                                placeholder="TYPE SOMETHING..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-xl font-black tracking-widest focus:ring-2 focus:ring-cyan-500 transition-all placeholder-white/20 uppercase"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500/50">
                                <Wand2 size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls - Bottom */}
                <div className="absolute bottom-400 left-1/2 -translate-x-1/2 flex items-center space-x-6 pointer-events-auto bg-black/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 text-white/50">
                            <Type size={14} />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Font Family</span>
                        </div>
                        <select 
                            onChange={(e) => {
                                if (rendererRef.current) {
                                    rendererRef.current.params.font = e.target.value;
                                    rendererRef.current.updateText(text);
                                }
                            }}
                            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[10px] text-white font-bold uppercase tracking-widest outline-none hover:bg-white/10 transition-all pointer-events-auto"
                        >
                            <option value="Inter, sans-serif" className="bg-zinc-900">Modern Sans</option>
                            <option value="'Playfair Display', serif" className="bg-zinc-900">Elegant Serif</option>
                            <option value="'JetBrains Mono', monospace" className="bg-zinc-900">Tech Mono</option>
                        </select>
                    </div>

                    <div className="w-px h-10 bg-white/10" />

                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 text-white/50">
                            <Zap size={14} />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Warp Strength</span>
                        </div>
                        <input 
                            type="range" min="0" max="2" step="0.1" 
                            defaultValue="0.5"
                            onChange={(e) => rendererRef.current && (rendererRef.current.params.strength = parseFloat(e.target.value))}
                            className="w-32 accent-cyan-500"
                        />
                    </div>

                    <div className="w-px h-10 bg-white/10" />

                    <div className="flex space-x-3">
                        {['#00ccff', '#ff0066', '#00ffaa', '#ffcc00', '#ffffff'].map(c => (
                            <button
                                key={c}
                                onClick={() => handleColorChange(c)}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${color === c ? 'border-white scale-125' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>

                    <div className="w-px h-10 bg-white/10" />

                        <button onClick={() => {
                            const colors = ['#00ccff', '#ff0066', '#00ffaa', '#ffcc00', '#ffffff'];
                            const randomColor = colors[Math.floor(Math.random() * colors.length)];
                            handleColorChange(randomColor);
                            if (rendererRef.current) {
                                rendererRef.current.params.strength = Math.random() * 2;
                                rendererRef.current.updateText(text);
                            }
                        }} className="p-4 text-violet-400 hover:text-white bg-white/5 rounded-full transition-all group">
                            <Wand2 size={20} className="group-hover:rotate-12 transition-transform" />
                        </button>
                </div>

                {/* Settings Toggle */}
                <button 
                    onClick={() => setShowUI(!showUI)}
                    className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 pointer-events-auto hover:bg-white/20 transition-all"
                >
                    <Settings className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Mouse Cursor Follower */}
            <div ref={cursorRef} className="fixed top-0 left-0 w-8 h-8 bg-cyan-500/20 rounded-full border border-cyan-500/50 pointer-events-none mix-blend-screen z-50 transition-transform duration-75" />

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
                    background: #00ccff;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(0, 204, 255, 0.5);
                }
                @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.5); }
                    100% { transform: translate(-50%, -50%) scale(1); }
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

export default TypographyArt;
