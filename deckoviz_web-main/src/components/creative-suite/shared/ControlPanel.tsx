import React from 'react';
import { Settings, Info, RefreshCw } from 'lucide-react';

interface Parameter {
    id: string;
    label: string;
    min: number;
    max: number;
    step: number;
    value: number;
}

interface ControlPanelProps {
    title: string;
    description: string;
    parameters: Parameter[];
    onParamChange: (id: string, value: number) => void;
    onReset?: () => void;
    accentColor?: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    title,
    description,
    parameters,
    onParamChange,
    onReset,
    accentColor = '#f43f5e'
}) => {
    return (
        <div className="bg-black/40 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl w-85 pointer-events-auto">
            <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                    <Settings className="w-5 h-5" style={{ color: accentColor }} />
                </div>
                <div>
                    <h3 className="text-xl font-bold tracking-tight text-white/90">{title}</h3>
                    <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">System Configuration</p>
                </div>
            </div>

            <div className="space-y-8 mb-10">
                {parameters.map((param) => (
                    <div key={param.id} className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
                            <span>{param.label}</span>
                            <span style={{ color: accentColor }}>{param.value.toFixed(2)}</span>
                        </div>
                        <input 
                            type="range" 
                            min={param.min} 
                            max={param.max} 
                            step={param.step}
                            value={param.value}
                            onChange={(e) => onParamChange(param.id, parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer outline-none transition-all"
                            style={{ accentColor: accentColor }}
                        />
                    </div>
                ))}
            </div>

            <div className="pt-6 border-t border-white/5">
                <div className="flex items-start space-x-3 mb-6">
                    <Info className="w-4 h-4 mt-0.5 text-white/20" />
                    <p className="text-[11px] text-white/40 leading-relaxed font-light">
                        {description}
                    </p>
                </div>

                {onReset && (
                    <button 
                        onClick={onReset}
                        className="w-full py-4 flex items-center justify-center space-x-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group"
                    >
                        <RefreshCw size={14} className="text-white/20 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Reset Simulation</span>
                    </button>
                )}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(0,0,0,0.5);
                }
            `}} />
        </div>
    );
};

export default ControlPanel;
