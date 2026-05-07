"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, Activity, Wind, Shield, Trash2, Cpu } from "lucide-react";

interface Point {
  x: number;
  y: number;
  t: number;
  pressure: number;
}



const ParadoxMirror: React.FC = () => {
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [deviation, setDeviation] = useState(1.0);
  const [alignment, setAlignment] = useState(100);
  const [isSymmetric, setIsSymmetric] = useState(true);

  // Drawing State Refs for Performance
  const lastPointRef = useRef<Point | null>(null);

  const drawStroke = (
    ctx: CanvasRenderingContext2D, 
    p1: Point, 
    p2: Point, 
    type: 'WARM' | 'COOL'
  ) => {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (type === 'WARM') {
      ctx.lineWidth = 3 + p2.pressure * 10;
      ctx.strokeStyle = `rgba(255, 120, 50, ${0.8})`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#ff4d00";
      
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    } else {
      // Cool Alternative: Geometric/Glitchy
      const devX = (Math.random() - 0.5) * 10 * deviation;
      const devY = (Math.random() - 0.5) * 10 * deviation;
      
      let x1 = p1.x + devX;
      const y1 = p1.y + devY;
      let x2 = p2.x + devX;
      const y2 = p2.y + devY;

      if (isSymmetric) {
        x1 = ctx.canvas.width - x1;
        x2 = ctx.canvas.width - x2;
      }

      ctx.lineWidth = 1 + p2.pressure * 4;
      ctx.strokeStyle = "#00f2ff";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#00d1ff";

      // Digital Echo: Multiple lines for high deviation
      for (let i = 0; i < (deviation > 1.5 ? 3 : 1); i++) {
        const offset = i * 4 * deviation;
        ctx.moveTo(x1 + offset, y1 + offset);
        ctx.lineTo(x2 + offset, y2 + offset);
      }
    }

    ctx.stroke();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const rect = leftCanvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    lastPointRef.current = { 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top, 
      t: Date.now(),
      pressure: 0.5 
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !lastPointRef.current) return;
    const rect = leftCanvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      t: Date.now(),
      pressure: Math.min(1, Math.max(0, (Math.abs(e.movementX) + Math.abs(e.movementY)) / 20))
    };

    const lCtx = leftCanvasRef.current?.getContext("2d");
    const rCtx = rightCanvasRef.current?.getContext("2d");

    if (lCtx && rCtx) {
      drawStroke(lCtx, lastPointRef.current, currentPoint, 'WARM');
      // Mirror to right side
      drawStroke(rCtx, lastPointRef.current, currentPoint, 'COOL');
    }

    lastPointRef.current = currentPoint;
    setAlignment(Math.max(0, 100 - (deviation * 30)));
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
  };

  const clear = () => {
    const lCtx = leftCanvasRef.current?.getContext("2d");
    const rCtx = rightCanvasRef.current?.getContext("2d");
    if (lCtx) lCtx.clearRect(0, 0, lCtx.canvas.width, lCtx.canvas.height);
    if (rCtx) rCtx.clearRect(0, 0, rCtx.canvas.width, rCtx.canvas.height);
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && leftCanvasRef.current && rightCanvasRef.current) {
        const w = containerRef.current.clientWidth / 2;
        const h = containerRef.current.clientHeight;
        leftCanvasRef.current.width = w;
        leftCanvasRef.current.height = h;
        rightCanvasRef.current.width = w;
        rightCanvasRef.current.height = h;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020205] overflow-hidden flex font-mono selection:bg-orange-500/30">
      
      {/* Background Reality Grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:50px_50px]" />

      {/* Left Realm: Warm Reality */}
      <div className="relative w-1/2 h-full border-r border-white/10 overflow-hidden bg-gradient-to-br from-orange-500/[0.03] to-transparent">
        <canvas 
          ref={leftCanvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="absolute inset-0 z-10 cursor-crosshair"
        />
        <div className="absolute top-12 left-12 z-20 pointer-events-none">
           <div className="flex items-center gap-4 text-orange-400 mb-2">
              <Zap size={18} className="animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Source Origin</span>
           </div>
           <h2 className="text-4xl font-black text-white/90 tracking-tighter uppercase italic">Warm Reality</h2>
           <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] mt-2">Organic Entropy Node 0xFF</p>
        </div>
      </div>

      {/* Right Realm: Cool Alternative */}
      <div className="relative w-1/2 h-full overflow-hidden bg-gradient-to-bl from-cyan-500/[0.03] to-transparent">
        <canvas 
          ref={rightCanvasRef}
          className="absolute inset-0 z-10 pointer-events-none"
        />
        <div className="absolute top-12 right-12 z-20 pointer-events-none text-right">
           <div className="flex items-center gap-4 text-cyan-400 mb-2 justify-end">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Synthetic Echo</span>
              <Activity size={18} className="animate-pulse" />
           </div>
           <h2 className="text-4xl font-black text-white/90 tracking-tighter uppercase italic">Cool Alternative</h2>
           <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] mt-2">Algorithm-Mediated Interpretation</p>
        </div>
      </div>

      {/* Paradox Telemetry HUD */}
      <div className="absolute inset-x-0 bottom-400 z-50 flex justify-center pointer-events-none px-12">
        <div className="w-full max-w-6xl flex justify-between items-end">
          
          {/* Left Stats */}
          <div className="p-8 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-3xl space-y-6 w-80 pointer-events-auto">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white/40">
                   <Shield size={14} />
                   <span className="text-[9px] font-bold uppercase tracking-widest">Reality Sync</span>
                </div>
                <span className="text-xs font-mono text-cyan-400">{alignment}%</span>
             </div>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${alignment}%` }} className="h-full bg-gradient-to-r from-orange-500 to-cyan-500" />
             </div>
             <div className="flex justify-between items-center text-[8px] font-bold text-white/20 uppercase tracking-widest">
                <span>{deviation > 1.5 ? 'CRITICAL_DRIFT' : 'SYNC_STABLE'}</span>
                <span>CH: 01-ALPHA</span>
             </div>
          </div>

          {/* Center Console */}
          <div className="flex flex-col items-center gap-6 pointer-events-auto">
             <div className="flex gap-4 p-4 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-2xl">
                <button 
                  onClick={clear}
                  className="p-5 rounded-2xl bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all group"
                >
                  <Trash2 size={20} className="group-hover:rotate-12" />
                </button>
                <div className="h-10 w-px bg-white/10 self-center" />
                <button 
                  onClick={() => setIsSymmetric(!isSymmetric)}
                  className={`p-5 rounded-2xl transition-all ${isSymmetric ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-white/20'}`}
                >
                  <Wind size={20} />
                </button>
                <div className="flex flex-col justify-center px-4 space-y-2">
                   <div className="flex justify-between text-[8px] font-bold text-white/40 uppercase tracking-widest">
                      <span>Deviation Index</span>
                      <span>{deviation.toFixed(1)}</span>
                   </div>
                   <input 
                    type="range" min="0.1" max="3" step="0.1" 
                    value={deviation} 
                    onChange={(e) => setDeviation(parseFloat(e.target.value))}
                    className="w-48 accent-cyan-500"
                   />
                </div>
             </div>
             
             <button 
                onClick={() => window.history.back()}
                className="p-4 px-12 rounded-full bg-white/5 border border-white/10 text-white/20 hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.6em] backdrop-blur-md"
              >
                Collapse Paradox
              </button>
          </div>

          {/* Right Stats */}
          <div className="p-8 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-3xl space-y-6 w-80 pointer-events-auto">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white/40">
                   <Cpu size={14} />
                   <span className="text-[9px] font-bold uppercase tracking-widest">Processing Load</span>
                </div>
                <span className="text-xs font-mono text-white/60">0.04ms</span>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                   <p className="text-[8px] text-white/20 uppercase font-bold mb-1">Mode</p>
                   <p className="text-[10px] text-white font-bold">{deviation > 1 ? 'ABSTRACT' : 'MIRROR'}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                   <p className="text-[8px] text-white/20 uppercase font-bold mb-1">Signal</p>
                   <p className="text-[10px] text-cyan-400 font-bold font-mono">D_ECHO</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Overlays */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 z-20">
         <motion.div 
            className="w-full bg-white/40 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            animate={{ height: ["0%", "100%", "0%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
         />
      </div>
      <div className="absolute inset-0 z-30 pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,0.95)]" />
      <div className="absolute bottom-400 right-12 z-40 text-[8px] text-white/5 tracking-[2em] uppercase pointer-events-none">
        Reality Paradox // Node 0xCF
      </div>
    </div>
  );
};

export default ParadoxMirror;
