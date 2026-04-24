import React, { useState, useEffect, useMemo } from 'react';
import { 
    DataPoint, 
    VisMode, 
    MappingConfig, 
    NormalizedPoint, 
    PALETTES, 
    PRELOADED_DATASETS, 
    ColorPalette 
} from './types';
import { DataPipeline } from './DataPipeline';
import { LiveData } from './LiveData';
import ParticleFlow from './Visualizers/ParticleFlow';
import RadialMandala from './Visualizers/RadialMandala';
import WaveFlow from './Visualizers/WaveFlow';
import NetworkGraph from './Visualizers/NetworkGraph';
import { 
    Upload, 
    Database, 
    Settings, 
    Palette as PaletteIcon, 
    Activity, 
    Download, 
    Play, 
    RotateCcw,
    Layers,
    Share2,
    Eye
} from 'lucide-react';

const DataAsArt: React.FC = () => {
    // State
    const [rawData, setRawData] = useState<DataPoint[]>(PRELOADED_DATASETS['Weather']);
    const [mode, setMode] = useState<VisMode>('particles');
    const [palette, setPalette] = useState<ColorPalette>(PALETTES[0]);
    const [speed, setSpeed] = useState(1.0);
    const [showUI, setShowUI] = useState(true);
    const [config, setConfig] = useState<MappingConfig>({
        xField: 'day',
        yField: 'temp',
        sizeField: 'humidity',
        colorField: 'wind',
        motionField: 'pressure'
    });

    // Derived
    const availableFields = useMemo(() => {
        if (rawData.length === 0) return [];
        return Object.keys(rawData[0]);
    }, [rawData]);

    const normalizedData = useMemo(() => {
        return DataPipeline.normalize(rawData, config);
    }, [rawData, config]);

    // Handlers
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            try {
                if (file.name.endsWith('.json')) {
                    setRawData(JSON.parse(content));
                } else if (file.name.endsWith('.csv')) {
                    setRawData(DataPipeline.parseCSV(content));
                }
            } catch (err) {
                alert("Error parsing file. Ensure it's valid JSON or CSV.");
            }
        };
        reader.readAsText(file);
    };

    const exportImage = () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = `data-art-${mode}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden font-sans text-white select-none">
            {/* Visualizer Layer */}
            <div className="absolute inset-0 z-0">
                {mode === 'particles' && <ParticleFlow points={normalizedData} palette={palette} speed={speed} />}
                {mode === 'radial' && <RadialMandala points={normalizedData} palette={palette} speed={speed} />}
                {mode === 'waves' && <WaveFlow points={normalizedData} palette={palette} speed={speed} />}
                {mode === 'network' && <NetworkGraph points={normalizedData} palette={palette} speed={speed} />}
            </div>

            {/* UI Layer */}
            <div className={`relative z-10 p-8 flex flex-col justify-between h-full pointer-events-none transition-opacity duration-700 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <header className="flex justify-between items-start">
                    <div className="flex items-center space-x-4 pointer-events-auto">
                        <div className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/20 shadow-2xl">
                            <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Data As Art</h1>
                            <p className="text-[10px] uppercase tracking-[0.5em] text-cyan-400/60 font-bold">Generative Aesthetic Engine</p>
                        </div>
                    </div>

                    <div className="flex space-x-2 pointer-events-auto">
                        <button onClick={exportImage} className="p-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl border border-white/10 transition-all text-emerald-400">
                            <Download size={20} />
                        </button>
                        <button onClick={() => setShowUI(!showUI)} className="p-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl border border-white/10 transition-all">
                            <Eye size={20} />
                        </button>
                    </div>
                </header>

                {/* Main Control Center */}
                <main className="flex justify-between items-end">
                    {/* Left Panel: Mode & Palette */}
                    <div className="flex flex-col space-y-6 pointer-events-auto">
                        <section className="bg-black/60 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl w-64">
                            <div className="flex items-center space-x-3 mb-6 text-gray-400">
                                <Layers size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Visual Mode</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {(['particles', 'radial', 'waves', 'network'] as VisMode[]).map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => setMode(m)}
                                        className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                                            mode === m ? 'bg-cyan-500 border-cyan-400 text-white' : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'
                                        }`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="bg-black/60 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl w-64">
                            <div className="flex items-center space-x-3 mb-6 text-gray-400">
                                <PaletteIcon size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Color Palette</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {PALETTES.map((p) => (
                                    <button
                                        key={p.name}
                                        onClick={() => setPalette(p)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all p-0.5 ${
                                            palette.name === p.name ? 'border-white scale-110' : 'border-transparent opacity-40 hover:opacity-100'
                                        }`}
                                    >
                                        <div className="w-full h-full rounded-full overflow-hidden flex">
                                            {p.colors.slice(0, 3).map((c, i) => (
                                                <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                                            ))}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Panel: Mapping & Data */}
                    <div className="flex flex-col space-y-6 pointer-events-auto">
                        <section className="bg-black/60 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl w-80">
                            <div className="flex items-center space-x-3 mb-8 text-gray-400">
                                <Settings size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Dimension Mapping</span>
                            </div>
                            
                            <div className="space-y-6">
                                {Object.keys(config).map((key) => (
                                    <div key={key} className="flex flex-col space-y-2">
                                        <label className="text-[9px] text-gray-500 uppercase tracking-widest font-bold px-1">{key.replace('Field', '')}</label>
                                        <select 
                                            value={(config as any)[key]}
                                            onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:ring-1 focus:ring-cyan-500 outline-none"
                                        >
                                            {availableFields.map(f => <option key={f} value={f} className="bg-black">{f}</option>)}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-black/60 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl w-80">
                            <div className="flex items-center space-x-3 mb-6 text-gray-400">
                                <Database size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Dataset</span>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <div className="grid grid-cols-3 gap-2">
                                    {Object.keys(PRELOADED_DATASETS).map((key) => (
                                        <button
                                            key={key}
                                            onClick={() => setRawData((PRELOADED_DATASETS as any)[key])}
                                            className="py-2 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-gray-400 hover:text-white"
                                        >
                                            {key}
                                        </button>
                                    ))}
                                    <button
                                        onClick={async () => {
                                            const data = await LiveData.fetchWeather();
                                            if (data.length > 0) setRawData(data);
                                        }}
                                        className="py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-cyan-500/20 transition-all text-cyan-400"
                                    >
                                        Live Weather
                                    </button>
                                </div>
                                <label className="flex items-center justify-center space-x-2 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-[10px] font-bold uppercase tracking-widest text-cyan-400 cursor-pointer hover:bg-cyan-500/20 transition-all">
                                    <Upload size={14} />
                                    <span>Upload JSON/CSV</span>
                                    <input type="file" className="hidden" accept=".json,.csv" onChange={handleFileUpload} />
                                </label>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* Bottom Speed Overlay */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto transition-opacity duration-700 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-white/5 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 flex items-center space-x-6">
                    <Play className="w-4 h-4 text-cyan-400" />
                    <input 
                        type="range" min="0.1" max="5" step="0.1" 
                        value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}
                        className="w-32 accent-cyan-500"
                    />
                    <span className="text-[10px] font-mono text-cyan-400">{speed.toFixed(1)}x</span>
                </div>
            </div>

            {/* Eye Toggle Hint (Only when UI hidden) */}
            {!showUI && (
                <button 
                    onClick={() => setShowUI(true)}
                    className="absolute top-8 right-8 z-30 p-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl border border-white/10 transition-all"
                >
                    <Eye size={20} className="text-gray-500" />
                </button>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulse-soft {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                }
                input[type='range'] {
                    -webkit-appearance: none;
                    background: rgba(255, 255, 255, 0.1);
                    height: 2px;
                    border-radius: 1px;
                }
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #22d3ee;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
                }
            `}} />
        </div>
    );
};

export default DataAsArt;
