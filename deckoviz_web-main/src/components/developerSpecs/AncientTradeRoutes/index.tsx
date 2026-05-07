
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Compass } from "lucide-react";
import { TRADE_NODES, TRADE_ROUTES, Node, Route } from "./tradeData";

// --- Constants & Helpers ---

const START_YEAR = -3000;
const END_YEAR = 1500;

const CATEGORY_COLORS = {
  spice: "#d97706", // Amber
  metal: "#94a3b8", // Silver/Slate
  textile: "#e11d48", // Rose/Red
  food: "#166534", // Green
};

// Simple Equirectangular Projection
const project = (lat: number, lng: number, width: number, height: number) => {
  const x = ((lng + 180) * width) / 360;
  const y = ((90 - lat) * height) / 180;
  return { x, y };
};

// --- Particle Class ---

class TradeParticle {
  path: { x: number; y: number }[];
  progress: number;
  speed: number;
  color: string;
  size: number;

  constructor(path: { x: number; y: number }[], color: string, volume: number) {
    this.path = path;
    this.progress = Math.random();
    this.speed = 0.0005 + Math.random() * 0.001 * volume;
    this.color = color;
    this.size = 1 + Math.random() * 2 * volume;
  }

  update() {
    this.progress += this.speed;
    if (this.progress > 1) this.progress = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const pointIdx = Math.floor(this.progress * (this.path.length - 1));
    const nextIdx = Math.min(pointIdx + 1, this.path.length - 1);
    const p1 = this.path[pointIdx];
    const p2 = this.path[nextIdx];
    const segmentT = (this.progress * (this.path.length - 1)) % 1;

    const x = p1.x + (p2.x - p1.x) * segmentT;
    const y = p1.y + (p2.y - p1.y) * segmentT;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Slight glow
    ctx.shadowBlur = 4;
    ctx.shadowColor = this.color;
  }
}

// --- Main Component ---

const AncientTradeRoutes: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(-200);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Map Dimensions
  const [dims, setDims] = useState({ width: 1200, height: 600 });

  useEffect(() => {
    const updateDims = () => {
      if (containerRef.current) {
        setDims({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  // Filtered & Active Routes
  const activeRoutes = useMemo(() => {
    return TRADE_ROUTES.filter(r => {
      const isVisible = currentYear >= r.startYear && currentYear <= r.endYear;
      const passesFilter = !filter || r.category === filter;
      return isVisible && passesFilter;
    });
  }, [currentYear, filter]);

  // Particles State
  const particlesRef = useRef<TradeParticle[]>([]);

  useEffect(() => {
    const particles: TradeParticle[] = [];
    activeRoutes.forEach(route => {
      const pathPoints: { x: number; y: number }[] = [];
      route.nodes.forEach(nodeId => {
        const node = TRADE_NODES.find(n => n.id === nodeId);
        if (node) {
          pathPoints.push(project(node.lat, node.lng, dims.width, dims.height));
        }
      });

      if (pathPoints.length >= 2) {
        const count = Math.floor(route.volume * 50);
        for (let i = 0; i < count; i++) {
          particles.push(new TradeParticle(pathPoints, CATEGORY_COLORS[route.category], route.volume));
        }
      }
    });
    particlesRef.current = particles;
  }, [activeRoutes, dims]);

  // Animation Loop
  useEffect(() => {
    let animationId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      
      // Update year if playing
      if (isPlaying && time - lastTime > 80) {
        setCurrentYear(prev => {
          let next = prev + 1;
          if (next > END_YEAR) next = START_YEAR;
          return next;
        });
        lastTime = time;
      }

      // Draw Particles
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesRef.current.forEach(p => {
          p.update();
          p.draw(ctx);
        });
      }
    };

    animate(0);
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-[#e8d5b5] overflow-hidden font-serif select-none"
      style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
        backgroundColor: '#f4e4bc'
      }}
    >
      {/* Background Coastlines (Simplified) */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox={`0 0 ${dims.width} ${dims.height}`}>
        {/* Placeholder for coastlines - ideally a GeoJSON path */}
        <path 
          d={`M ${dims.width * 0.1} ${dims.height * 0.4} Q ${dims.width * 0.3} ${dims.height * 0.2} ${dims.width * 0.5} ${dims.height * 0.4} T ${dims.width * 0.9} ${dims.height * 0.5}`}
          fill="none" stroke="#8b5e3c" strokeWidth="2" strokeDasharray="5,5"
        />
      </svg>

      {/* Routes SVG */}
      <svg className="absolute inset-0 w-full h-full z-10" viewBox={`0 0 ${dims.width} ${dims.height}`}>
        <defs>
          <filter id="ink">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>

        <AnimatePresence>
          {activeRoutes.map(route => {
            const points = route.nodes.map(id => {
              const node = TRADE_NODES.find(n => n.id === id)!;
              return project(node.lat, node.lng, dims.width, dims.height);
            });

            const d = points.reduce((acc, p, i) => {
              return acc + (i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`);
            }, "");

            return (
              <motion.path
                key={route.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: selectedRoute?.id === route.id ? 0.8 : 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                d={d}
                fill="none"
                stroke={CATEGORY_COLORS[route.category]}
                strokeWidth={selectedRoute?.id === route.id ? 3 : 1.5}
                filter="url(#ink)"
                className="cursor-pointer pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRoute(route);
                  setSelectedNode(null);
                }}
              />
            );
          })}
        </AnimatePresence>

        {/* Nodes */}
        {TRADE_NODES.map(node => {
          const { x, y } = project(node.lat, node.lng, dims.width, dims.height);
          const isActive = activeRoutes.some(r => r.nodes.includes(node.id));
          
          if (!isActive) return null;

          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNode(node);
                setSelectedRoute(null);
              }}
            >
              <circle
                cx={x}
                cy={y}
                r={selectedNode?.id === node.id ? 6 : 3}
                fill="#8b4513"
                className="transition-all duration-500"
              />
              <motion.circle
                cx={x}
                cy={y}
                r={12}
                fill="none"
                stroke="#8b4513"
                strokeWidth="1"
                initial={{ scale: 0.5, opacity: 0.5 }}
                animate={{ scale: [0.5, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <text
                x={x + 10}
                y={y + 4}
                className="text-[10px] fill-[#5d4037] font-serif pointer-events-none"
              >
                {node.name}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Particles Canvas */}
      <canvas 
        ref={canvasRef}
        width={dims.width}
        height={dims.height}
        className="absolute inset-0 z-20 pointer-events-none mix-blend-multiply"
      />

      {/* UI Elements */}
      
      {/* Year Display */}
      <div className="absolute top-10 left-10 z-30 flex flex-col">
        <h1 className="text-3xl font-light text-[#5d4037] tracking-widest uppercase">
          {Math.abs(currentYear)} {currentYear < 0 ? 'BCE' : 'CE'}
        </h1>
        <div className="w-64 h-1 bg-[#8b5e3c]/20 mt-2 relative overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-[#8b5e3c]"
            animate={{ width: `${((currentYear - START_YEAR) / (END_YEAR - START_YEAR)) * 100}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-400 left-10 z-30 flex items-center space-x-6 p-4 rounded-xl bg-[#f4e4bc]/60 backdrop-blur-md border border-[#8b5e3c]/20">
        <button onClick={() => setIsPlaying(!isPlaying)} className="text-[#5d4037] hover:scale-110 transition-transform">
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        <div className="flex space-x-3">
          {(['spice', 'metal', 'textile', 'food'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(filter === cat ? null : cat)}
              className={`w-4 h-4 rounded-full border border-black/10 transition-all ${filter === cat ? 'scale-125 border-black/40 shadow-lg' : 'opacity-40'}`}
              style={{ backgroundColor: CATEGORY_COLORS[cat] }}
              title={cat.toUpperCase()}
            />
          ))}
        </div>

        <div className="text-[10px] text-[#8b5e3c] uppercase tracking-widest flex items-center gap-2">
          <Compass size={14} className="animate-pulse" />
          <span>Historical Trade Atlas</span>
        </div>
      </div>

      {/* Details Card */}
      <AnimatePresence>
        {(selectedRoute || selectedNode) && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-10 right-10 w-80 z-40 p-8 bg-[#fdf5e6] border-2 border-[#8b5e3c]/30 shadow-2xl rounded-sm"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
          >
            <button 
              onClick={() => { setSelectedRoute(null); setSelectedNode(null); }}
              className="absolute top-4 right-4 text-[#8b5e3c]"
            >
              ×
            </button>
            
            {selectedRoute && (
              <>
                <h2 className="text-xl font-bold text-[#5d4037] border-b border-[#8b5e3c]/20 pb-2 mb-4 uppercase tracking-tighter">
                  {selectedRoute.name}
                </h2>
                <div className="space-y-3 text-sm text-[#5d4037]/80 italic">
                  <p><span className="font-bold uppercase text-[10px] not-italic block mb-1">Active Era</span> {Math.abs(selectedRoute.startYear)} - {Math.abs(selectedRoute.endYear)} {selectedRoute.endYear < 0 ? 'BCE' : 'CE'}</p>
                  <p><span className="font-bold uppercase text-[10px] not-italic block mb-1">Primary Commodities</span> {selectedRoute.goods}</p>
                  <p><span className="font-bold uppercase text-[10px] not-italic block mb-1">Economic Volume</span> {(selectedRoute.volume * 100).toFixed(0)}% Capacity</p>
                </div>
              </>
            )}

            {selectedNode && (
              <>
                <h2 className="text-xl font-bold text-[#5d4037] border-b border-[#8b5e3c]/20 pb-2 mb-4 uppercase tracking-tighter">
                  {selectedNode.name}
                </h2>
                <div className="space-y-3 text-sm text-[#5d4037]/80 italic">
                  <p><span className="font-bold uppercase text-[10px] not-italic block mb-1">Peak Population</span> {selectedNode.peakPop}</p>
                  <p><span className="font-bold uppercase text-[10px] not-italic block mb-1">Historical Role</span> {selectedNode.role}</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(139,94,60,0.3)] border-[20px] border-[#8b5e3c]/5" />
    </div>
  );
};

export default AncientTradeRoutes;
