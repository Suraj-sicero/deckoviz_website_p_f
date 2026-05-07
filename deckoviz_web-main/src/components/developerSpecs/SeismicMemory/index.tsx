
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { } from "lucide-react";

// --- Types ---
interface Quake {
  id: string;
  mag: number;
  place: string;
  time: number;
  depth: number;
  lat: number;
  lng: number;
}

// --- Constants ---
const POLL_INTERVAL = 300000; // 5 minutes

const getDepthColor = (depth: number) => {
  if (depth < 70) return "#ff4d00"; // Orange-Red
  if (depth < 300) return "#ffb700"; // Amber
  return "#4d4dff"; // Indigo
};

const project = (lat: number, lng: number, width: number, height: number) => {
  const x = ((lng + 180) * width) / 360;
  const y = ((90 - lat) * height) / 180;
  return { x, y };
};

// --- Component ---

const SeismicMemory: React.FC = () => {
  const [data, setData] = useState<{ recent: Quake[], major: Quake[] }>({ recent: [], major: [] });
  const [selectedQuake, setSelectedQuake] = useState<Quake | null>(null);
  const [filterMag, setFilterMag] = useState(1.0);
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "1y">("24h");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 1200, height: 600 });

  useEffect(() => {
    const fetchSeismic = async () => {
      try {
        const res = await fetch("/api/earthquakes");
        const json = await res.json();
        
        interface USGSFeature {
          id: string;
          properties: {
            mag: number;
            place: string;
            time: number;
          };
          geometry: {
            coordinates: [number, number, number];
          };
        }

        const mapFeature = (f: USGSFeature): Quake => ({
          id: f.id,
          mag: f.properties.mag,
          place: f.properties.place,
          time: f.properties.time,
          depth: f.geometry.coordinates[2],
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0]
        });

        setData({
          recent: json.recent.map(mapFeature),
          major: json.major.map(mapFeature)
        });
      } catch (e) {
        console.error("Seismic fetch failed", e);
      }
    };

    fetchSeismic();
    const interval = setInterval(fetchSeismic, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateDims = () => {
      if (containerRef.current) {
        setDims({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  // Waveform Animation Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const drawRipple = (quake: Quake, isMajor: boolean) => {
        const { x, y } = project(quake.lat, quake.lng, canvas.width, canvas.height);
        
        const rippleCount = 3;
        for (let i = 0; i < rippleCount; i++) {
          const t = (frame * 0.05 + i * 2) % 6;
          const radius = t * quake.mag * 5;
          const opacity = isMajor ? 0.05 : Math.max(0, (1 - t / 6) * 0.2);
          
          ctx.beginPath();
          ctx.strokeStyle = getDepthColor(quake.depth);
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 1;
          
          // Draw irregular circle with noise
          for (let angle = 0; angle < Math.PI * 2; angle += 0.2) {
            const noise = Math.sin(angle * 5 + frame * 0.1) * 2;
            const rx = x + (radius + noise) * Math.cos(angle);
            const ry = y + (radius + noise) * Math.sin(angle);
            if (angle === 0) ctx.moveTo(rx, ry);
            else ctx.lineTo(rx, ry);
          }
          ctx.closePath();
          ctx.stroke();
        }
      };

      data.recent.filter(q => q.mag >= filterMag).forEach(q => drawRipple(q, false));
      data.major.forEach(q => drawRipple(q, true));

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [data, filterMag]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050508] overflow-hidden font-mono">
      {/* Background Map SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox={`0 0 ${dims.width} ${dims.height}`}>
        <path 
          d="M 100 200 L 1100 200 M 100 400 L 1100 400" 
          stroke="#fff" strokeWidth="0.5" strokeDasharray="2,4" 
        />
        {/* Placeholder for a minimal map outline */}
        <text x="50%" y="50%" className="fill-white/5 text-[200px] text-center" style={{ textAnchor: 'middle' }}>EARTH</text>
      </svg>

      {/* Canvas for Waveforms */}
      <canvas 
        ref={canvasRef}
        width={dims.width}
        height={dims.height}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Interactive Layer (Circles) */}
      <svg className="absolute inset-0 w-full h-full z-20" viewBox={`0 0 ${dims.width} ${dims.height}`}>
        <AnimatePresence>
          {data.recent.filter(q => q.mag >= filterMag).map(q => {
            const { x, y } = project(q.lat, q.lng, dims.width, dims.height);
            const ageRatio = Math.max(0, 1 - (Date.now() - q.time) / (24 * 3600 * 1000));
            
            return (
              <motion.circle
                key={q.id}
                cx={x}
                cy={y}
                r={Math.log(q.mag + 1) * 8}
                fill={getDepthColor(q.depth)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: ageRatio * 0.8,
                  fill: selectedQuake?.id === q.id ? "#fff" : getDepthColor(q.depth)
                }}
                className="cursor-pointer"
                onClick={() => setSelectedQuake(q)}
              />
            );
          })}
        </AnimatePresence>

        {/* Major Quakes Memory */}
        {data.major.map(q => {
          const { x, y } = project(q.lat, q.lng, dims.width, dims.height);
          return (
            <motion.circle
              key={`major-${q.id}`}
              cx={x}
              cy={y}
              r={Math.log(q.mag + 1) * 4}
              fill={getDepthColor(q.depth)}
              animate={{ 
                opacity: [0.03, 0.08, 0.03],
              }}
              transition={{ duration: 10, repeat: Infinity, delay: Math.random() * 5 }}
            />
          );
        })}
      </svg>

      {/* HUD Overlay */}
      <div className="absolute bottom-400 left-10 z-40 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-[10px] text-gray-500 uppercase tracking-widest pointer-events-none">
        <div className="space-y-2">
          <div className="flex justify-between space-x-12">
            <span>ACTIVE EVENTS (24H)</span>
            <span className="text-orange-500">{data.recent.length}</span>
          </div>
          <div className="flex justify-between space-x-12">
            <span>SEISMIC MEMORY</span>
            <span className="text-blue-400">{data.major.length} SIGNIFICANT</span>
          </div>
          <div className="mt-4 pt-2 border-t border-white/10">
            <span className="text-white/30">MONITORING USGS REAL-TIME FEED...</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-10 right-10 z-40 flex flex-col items-end space-y-4">
        <div className="flex space-x-2 p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
          {(["24h", "1y"] as const).map(r => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold tracking-widest transition-all ${
                timeRange === r ? "bg-white text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
        
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col space-y-2">
          <span className="text-[10px] text-gray-400">MIN MAGNITUDE: {filterMag.toFixed(1)}</span>
          <input 
            type="range" min="1.0" max="7.0" step="0.1" 
            value={filterMag} 
            onChange={(e) => setFilterMag(parseFloat(e.target.value))}
            className="w-40 accent-orange-500"
          />
        </div>
      </div>

      {/* Details Card */}
      <AnimatePresence>
        {selectedQuake && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-10 left-10 w-80 z-40 p-8 bg-black/80 border border-white/10 backdrop-blur-2xl rounded-sm"
          >
            <button 
              onClick={() => setSelectedQuake(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white"
            >
              ×
            </button>
            <h2 className="text-xl font-light text-white mb-2 uppercase tracking-tighter">
              {selectedQuake.place}
            </h2>
            <div className="space-y-3 text-[11px] text-gray-400 uppercase tracking-widest">
              <div className="flex justify-between">
                <span>MAGNITUDE</span>
                <span className="text-orange-500 font-bold">{selectedQuake.mag}</span>
              </div>
              <div className="flex justify-between">
                <span>DEPTH</span>
                <span className="text-white">{selectedQuake.depth} KM</span>
              </div>
              <div className="flex justify-between">
                <span>TIME</span>
                <span className="text-white">{new Date(selectedQuake.time).toLocaleString()}</span>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-[9px] leading-relaxed italic text-gray-600">
                A localized release of accumulated strain energy within the crust.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
    </div>
  );
};

export default SeismicMemory;
