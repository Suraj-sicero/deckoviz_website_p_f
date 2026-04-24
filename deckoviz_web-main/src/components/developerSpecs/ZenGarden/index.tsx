import React, { useRef, useState, useEffect } from 'react';
import { Settings, Download, Wind, Trash2 } from 'lucide-react';
import { ZenRenderer } from './ZenRenderer';

const ZenGarden: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<ZenRenderer | null>(null);
    
    const [brushSize, setBrushSize] = useState(0.05);
    const [spacing, setSpacing] = useState(1.0);
    const [depth, setDepth] = useState(0.6);
    const [showUI, setShowUI] = useState(true);

    useEffect(() => {
        if (!canvasRef.current) return;
        const gl = canvasRef.current.getContext('webgl2', { antialias: true })!;
        // Ensure float textures are supported
        gl.getExtension('EXT_color_buffer_float');
        
        rendererRef.current = new ZenRenderer(gl);

        let frameId: number;
        const render = () => {
            if (rendererRef.current) {
                rendererRef.current.update();
                rendererRef.current.render(window.innerWidth, window.innerHeight);
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

    const handlePointerDown = (e: React.PointerEvent) => {
        if (rendererRef.current) {
            const rect = canvasRef.current!.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            rendererRef.current.params.isDrawing = true;
            rendererRef.current.params.mouse = [x, y];
            rendererRef.current.params.prevMouse = [x, y];
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (rendererRef.current?.params.isDrawing) {
            const rect = canvasRef.current!.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            rendererRef.current.params.mouse = [x, y];
        }
    };

    const handlePointerUp = () => {
        if (rendererRef.current) {
            rendererRef.current.params.isDrawing = false;
        }
    };

    const handleReset = () => {
        rendererRef.current?.reset();
    };

    const handleExport = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = 'zen-garden.png';
            link.href = canvasRef.current.toDataURL();
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-[#1a1a1a] overflow-hidden font-sans select-none">
            <canvas 
                ref={canvasRef} 
                className="w-full h-full touch-none cursor-crosshair"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            />

            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="absolute top-12 left-12 flex items-center space-x-5 pointer-events-auto">
                    <div className="p-4 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
                        <Wind className="w-8 h-8 text-orange-200/60" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-light text-white/90 tracking-[0.2em] uppercase">Zen Garden</h1>
                        <p className="text-[10px] text-orange-200/40 uppercase tracking-[0.4em] mt-1">Digital Meditation Tool</p>
                    </div>
                </div>

                {/* Brush Console - Right */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col space-y-6 pointer-events-auto">
                    <div className="bg-black/40 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/5 shadow-2xl w-72 space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Rake Width</span>
                                <span className="text-[10px] text-orange-200/60 font-mono">{Math.round(brushSize * 100)}</span>
                            </div>
                            <input 
                                type="range" min="0.01" max="0.15" step="0.005" 
                                value={brushSize} 
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    setBrushSize(val);
                                    if(rendererRef.current) rendererRef.current.params.brushSize = val;
                                }}
                                className="w-full accent-orange-200/50"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Groove Spacing</span>
                                <span className="text-[10px] text-orange-200/60 font-mono">{spacing.toFixed(1)}</span>
                            </div>
                            <input 
                                type="range" min="0.5" max="3.0" step="0.1" 
                                value={spacing} 
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    setSpacing(val);
                                    if(rendererRef.current) rendererRef.current.params.spacing = val;
                                }}
                                className="w-full accent-orange-200/50"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Rake Depth</span>
                                <span className="text-[10px] text-orange-200/60 font-mono">{Math.round(depth * 100)}%</span>
                            </div>
                            <input 
                                type="range" min="0.1" max="1.0" step="0.05" 
                                value={depth} 
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    setDepth(val);
                                    if(rendererRef.current) rendererRef.current.params.depth = val;
                                }}
                                className="w-full accent-orange-200/50"
                            />
                        </div>
                    </div>

                    <button 
                        onClick={handleReset}
                        className="flex items-center justify-center space-x-3 p-6 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all group"
                    >
                        <Trash2 size={20} className="group-hover:rotate-12 transition-transform" />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Clear Garden</span>
                    </button>
                </div>

                {/* Footer Controls */}
                <div className="absolute bottom-12 left-12 flex items-center space-x-6 pointer-events-auto">
                    <button onClick={handleExport} className="p-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-white/40 hover:text-white transition-all">
                        <Download size={20} />
                    </button>
                    <div className="w-px h-8 bg-white/10" />
                    <p className="text-[9px] text-white/20 uppercase tracking-[0.3em]">Drag to rake sand • Breathe slowly</p>
                </div>

                {/* Settings Toggle */}
                <button 
                    onClick={() => setShowUI(!showUI)}
                    className="absolute top-12 right-12 p-4 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 pointer-events-auto hover:bg-white/10 transition-all"
                >
                    <Settings className="w-6 h-6 text-white/40" />
                </button>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                input[type='range'] {
                    -webkit-appearance: none;
                    background: rgba(255, 255, 255, 0.05);
                    height: 2px;
                    border-radius: 1px;
                }
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(254, 215, 170, 0.6);
                    cursor: pointer;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 0 15px rgba(0,0,0,0.5);
                }
            `}} />
        </div>
    );
};

export default ZenGarden;
