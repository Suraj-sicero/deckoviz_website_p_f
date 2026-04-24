import React, { useRef, useState, useEffect } from 'react';
import { Settings, CloudRain, CloudSnow, Wind, CloudLightning, Download, Thermometer, CloudFog } from 'lucide-react';
import { WeatherRenderer } from './WeatherRenderer';

const WEATHER_MODES = [
    { id: 0, name: 'Rain', icon: <CloudRain /> },
    { id: 1, name: 'Snow', icon: <CloudSnow /> },
    { id: 2, name: 'Windy Sand', icon: <Wind /> },
    { id: 3, name: 'Thunderstorm', icon: <CloudLightning /> },
    { id: 4, name: 'Foggy Mist', icon: <CloudFog /> },
];

const WeatherSimulations: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<WeatherRenderer | null>(null);
    const [currentMode, setCurrentMode] = useState(0);
    const [intensity, setIntensity] = useState(0.5);
    const [wind, setWind] = useState(0);
    const [showUI, setShowUI] = useState(true);

    useEffect(() => {
        if (!canvasRef.current) return;
        const gl = canvasRef.current.getContext('webgl2', { antialias: true })!;
        rendererRef.current = new WeatherRenderer(gl);

        let frameId: number;
        const render = () => {
            if (rendererRef.current) {
                rendererRef.current.update(16); // Approx 60fps
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

    const handleModeChange = (id: number) => {
        setCurrentMode(id);
        if (rendererRef.current) {
            rendererRef.current.params.type = id;
        }
    };

    const handleIntensityChange = (val: number) => {
        setIntensity(val);
        if (rendererRef.current) {
            rendererRef.current.params.intensity = val;
        }
    };

    const handleWindChange = (val: number) => {
        setWind(val);
        if (rendererRef.current) {
            rendererRef.current.params.wind = [val, 0];
        }
    };

    const handleExport = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = 'weather-snapshot.png';
            link.href = canvasRef.current.toDataURL();
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans select-none">
            <canvas ref={canvasRef} className="w-full h-full touch-none cursor-default" />

            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                        <Thermometer className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Weather Simulations</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Cinematic Atmospheric Environments</p>
                    </div>
                </div>

                {/* Weather Selector - Right */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4 pointer-events-auto">
                    {WEATHER_MODES.map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => handleModeChange(mode.id)}
                            className={`p-4 rounded-2xl border transition-all duration-500 group flex items-center space-x-4 ${
                                currentMode === mode.id 
                                ? 'bg-white text-black border-white shadow-2xl scale-110' 
                                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <span className="transition-transform group-hover:scale-110">{mode.icon}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">{mode.name}</span>
                        </button>
                    ))}
                </div>

                {/* Controls - Bottom */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-8 pointer-events-auto bg-black/40 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    
                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                            <span>Intensity</span>
                            <span className="text-sky-400">{Math.round(intensity * 100)}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="1" step="0.01" 
                            value={intensity}
                            onChange={(e) => handleIntensityChange(parseFloat(e.target.value))}
                            className="w-32 accent-sky-500"
                        />
                    </div>

                    <div className="w-px h-10 bg-white/10" />

                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                            <span>Wind</span>
                            <span className="text-emerald-400">{wind.toFixed(1)}</span>
                        </div>
                        <input 
                            type="range" min="-1" max="1" step="0.1" 
                            value={wind}
                            onChange={(e) => handleWindChange(parseFloat(e.target.value))}
                            className="w-32 accent-emerald-500"
                        />
                    </div>

                    <div className="w-px h-10 bg-white/10" />

                    <button onClick={handleExport} className="p-4 text-gray-400 hover:text-white bg-white/10 rounded-full transition-all">
                        <Download size={20} />
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
                    background: white;
                    cursor: pointer;
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
                }
            `}} />
        </div>
    );
};

export default WeatherSimulations;
