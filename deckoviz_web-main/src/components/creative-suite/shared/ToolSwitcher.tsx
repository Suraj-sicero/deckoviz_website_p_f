import React from 'react';
import { 
    Grid, 
    Zap, 
    Activity, 
    Droplets, 
    Wind, 
    Cloud, 
    Star, 
    Box, 
    Heart, 
    Focus, 
    Sun, 
    Moon, 
    Sparkles,
    Columns,
    Building,
    Shapes,
    Bug,
    Waves
} from 'lucide-react';

interface Tool {
    id: string;
    label: string;
    icon: React.ReactNode;
    category: 'ai' | 'interactive';
}

interface ToolSwitcherProps {
    activeToolId: string;
    onToolSelect: (id: string) => void;
    tools: Tool[];
}

const ToolSwitcher: React.FC<ToolSwitcherProps> = ({
    activeToolId,
    onToolSelect,
    tools
}) => {
    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
            <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-3xl p-3 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="px-6 py-2 border-r border-white/10 flex items-center space-x-3 mr-2">
                    <Grid size={16} className="text-white/40" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Creative Lab</span>
                </div>
                
                <div className="flex space-x-1 pr-4">
                    {tools.map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => onToolSelect(tool.id)}
                            title={tool.label}
                            className={`p-4 rounded-2xl transition-all relative group ${
                                activeToolId === tool.id 
                                ? 'bg-white/10 text-white border border-white/20' 
                                : 'text-white/20 hover:bg-white/5 hover:text-white/60'
                            }`}
                        >
                            {tool.icon}
                            {activeToolId === tool.id && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
                            )}
                            
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 bg-black/90 backdrop-blur-xl rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl">
                                <span className="text-[10px] font-bold uppercase tracking-widest">{tool.label}</span>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black/90" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ToolSwitcher;
