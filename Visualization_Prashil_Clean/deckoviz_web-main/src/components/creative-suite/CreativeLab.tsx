import React, { useState } from 'react';
import ToolSwitcher from './shared/ToolSwitcher';
import { 
    Grid, 
    Star, 
    Zap, 
    Droplets, 
    Cloud, 
    Building, 
    Bug, 
    Sparkles,
    Activity,
    Wind,
    Waves
} from 'lucide-react';

// This is a simplified main wrapper to demonstrate the architectural flow
const CreativeLab: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeTool, setActiveTool] = useState('celestial');

    const tools = [
        { id: 'celestial', label: 'Celestial Cosmos', icon: <Star size={18} />, category: 'ai' as const },
        { id: 'materials', label: 'Material Sims', icon: <Zap size={18} />, category: 'ai' as const },
        { id: 'fluid', label: 'Fluid Dreams', icon: <Droplets size={18} />, category: 'ai' as const },
        { id: 'architecture', label: 'Dream Arch', icon: <Building size={18} />, category: 'interactive' as const },
        { id: 'organisms', label: 'Organism Sim', icon: <Bug size={18} />, category: 'interactive' as const },
        { id: 'ritual', label: 'Ambient Ritual', icon: <Sparkles size={18} />, category: 'ai' as const },
        { id: 'galaxy', label: 'Particle Galaxy', icon: <Activity size={18} />, category: 'interactive' as const },
        { id: 'nature', label: 'Generative Nature', icon: <Wind size={18} />, category: 'interactive' as const },
        { id: 'ocean', label: 'Ocean Schools', icon: <Waves size={18} />, category: 'interactive' as const }
    ];

    return (
        <div className="relative w-full h-full bg-black overflow-hidden">
            {/* Tool Viewport Rendering Area */}
            <div className="absolute inset-0 z-0">
                {children}
            </div>

            {/* Global Tool Switcher */}
            <ToolSwitcher 
                activeToolId={activeTool}
                onToolSelect={(id) => {
                    setActiveTool(id);
                    // In a real app, this would use window.location or a router
                    window.location.href = `/developer-specs/${id.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
                }}
                tools={tools}
            />

            {/* Global Branding Overlay */}
            <div className="absolute top-10 left-10 z-50 pointer-events-none opacity-20">
                <div className="flex items-center space-x-3">
                    <Grid size={24} className="text-white" />
                    <span className="text-xs font-black uppercase tracking-[0.8em] text-white">Deckoviz Lab</span>
                </div>
            </div>
        </div>
    );
};

export default CreativeLab;
