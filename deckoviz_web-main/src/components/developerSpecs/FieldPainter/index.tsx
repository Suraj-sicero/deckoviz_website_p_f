"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { } from "framer-motion";

interface Charge {
  id: string;
  x: number;
  y: number;
  q: number; // magnitude
}

const FieldPainter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [charges, setCharges] = useState<Charge[]>([]);
  const [draggedChargeId, setDraggedChargeId] = useState<string | null>(null);
  const [showEquipotentials, setShowEquipotentials] = useState(true);
  
  const chargesRef = useRef<Charge[]>([]);
  chargesRef.current = charges;

  const calculateField = useCallback((x: number, y: number) => {
    let ex = 0;
    let ey = 0;
    
    for (const charge of chargesRef.current) {
      const dx = x - charge.x;
      const dy = y - charge.y;
      const d2 = dx * dx + dy * dy;
      const d = Math.sqrt(d2);
      
      if (d < 5) continue; // avoid singularity
      
      const force = charge.q / (d2 * d); // q / r^2 * (vector / r)
      ex += force * dx;
      ey += force * dy;
    }
    
    return { ex, ey };
  }, []);

  const calculatePotential = useCallback((x: number, y: number) => {
    let v = 0;
    for (const charge of chargesRef.current) {
      const dx = x - charge.x;
      const dy = y - charge.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 5) continue;
      v += charge.q / d;
    }
    return v;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Draw Equipotentials (Heatmap-like)
    if (showEquipotentials) {
      const step = 20;
      for (let x = 0; x < canvas.width; x += step) {
        for (let y = 0; y < canvas.height; y += step) {
          const v = calculatePotential(x, y);
          const alpha = Math.min(Math.abs(v) * 0.05, 0.1);
          ctx.fillStyle = v > 0 ? `rgba(251, 191, 36, ${alpha})` : `rgba(59, 130, 246, ${alpha})`;
          ctx.fillRect(x, y, step, step);
        }
      }
    }

    // 2. Trace Field Lines
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";
    
    for (const charge of chargesRef.current) {
      if (charge.q <= 0) continue; // Trace from positive charges

      const numLines = Math.abs(charge.q) * 12;
      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2;
        let cx = charge.x + Math.cos(angle) * 10;
        let cy = charge.y + Math.sin(angle) * 10;
        
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.strokeStyle = "rgba(251, 191, 36, 0.4)"; // Gold glow
        
        for (let step = 0; step < 200; step++) {
          const f = calculateField(cx, cy);
          const mag = Math.sqrt(f.ex * f.ex + f.ey * f.ey);
          if (mag === 0) break;
          
          cx += (f.ex / mag) * 5;
          cy += (f.ey / mag) * 5;
          
          ctx.lineTo(cx, cy);
          
          // Termination checks
          if (cx < 0 || cx > canvas.width || cy < 0 || cy > canvas.height) break;
          
          let hitNegative = false;
          for (const other of chargesRef.current) {
            if (other.q < 0) {
              const dx = cx - other.x;
              const dy = cy - other.y;
              if (dx * dx + dy * dy < 100) {
                hitNegative = true;
                break;
              }
            }
          }
          if (hitNegative) break;
        }
        ctx.stroke();
      }
    }

    // 3. Draw Charges
    for (const charge of chargesRef.current) {
      const gradient = ctx.createRadialGradient(charge.x, charge.y, 0, charge.x, charge.y, 15);
      if (charge.q > 0) {
        gradient.addColorStop(0, "#fbbf24");
        gradient.addColorStop(1, "transparent");
      } else {
        gradient.addColorStop(0, "#3b82f6");
        gradient.addColorStop(1, "transparent");
      }
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(charge.x, charge.y, 15, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = "white";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(charge.q > 0 ? "+" : "-", charge.x, charge.y);
    }

    requestAnimationFrame(draw);
  }, [calculateField, calculatePotential, showEquipotentials]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    const animId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [draw]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check for drag
    const hit = charges.find(c => Math.sqrt((c.x - x) ** 2 + (c.y - y) ** 2) < 20);
    if (hit) {
      setDraggedChargeId(hit.id);
      return;
    }
    
    // Add new charge
    const q = e.button === 0 ? 10 : -10; // Left click +, Right click -
    const newCharge: Charge = {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
      q
    };
    setCharges([...charges, newCharge]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedChargeId || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCharges(prev => prev.map(c => c.id === draggedChargeId ? { ...c, x, y } : c));
  };

  const handleMouseUp = () => {
    setDraggedChargeId(null);
  };

  const clearCharges = () => setCharges([]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-[#050508] overflow-hidden flex flex-col items-center justify-center cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* UI Controls */}
      <div className="absolute top-8 left-8 z-10 flex flex-col gap-4">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-2">Electromagnetic Field Painter</h2>
          <p className="text-xs text-gray-400 mb-4">Left-click: Positive | Right-click: Negative | Drag to move</p>
          
          <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowEquipotentials(!showEquipotentials); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${showEquipotentials ? 'bg-violet-600 text-white' : 'bg-white/10 text-gray-400'}`}
            >
              Equipotentials
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); clearCharges(); }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Preset configurations */}
      <div className="absolute bottom-400 right-8 z-10 flex flex-wrap justify-end max-w-md gap-2">
        {[
          { label: "Dipole", config: [{ x: 400, y: 300, q: 10 }, { x: 600, y: 300, q: -10 }] },
          { label: "Quadrupole", config: [{ x: 400, y: 200, q: 10 }, { x: 600, y: 200, q: -10 }, { x: 400, y: 400, q: -10 }, { x: 600, y: 400, q: 10 }] },
          { label: "Phone", config: [
            { x: 500, y: 200, q: 5 }, { x: 500, y: 400, q: -5 },
            { x: 450, y: 300, q: 2 }, { x: 550, y: 300, q: -2 }
          ] },
          { label: "Human", config: [
            { x: 500, y: 150, q: 10 }, // head
            { x: 500, y: 300, q: 15 }, // torso
            { x: 450, y: 500, q: -5 }, // leg L
            { x: 550, y: 500, q: -5 }, // leg R
            { x: 400, y: 250, q: 5 },  // arm L
            { x: 600, y: 250, q: 5 }   // arm R
          ] },
          { label: "Coffee Cup", config: [
            { x: 450, y: 350, q: 10 }, { x: 550, y: 350, q: 10 },
            { x: 500, y: 450, q: -10 },
            { x: 500, y: 250, q: 5 }, { x: 500, y: 200, q: 5 } // steam
          ] }
        ].map(preset => (
          <button
            key={preset.label}
            onClick={(e) => {
              e.stopPropagation();
              const width = containerRef.current?.clientWidth || 1000;
              const height = containerRef.current?.clientHeight || 600;
              const scaledConfig = preset.config.map(c => ({
                ...c,
                id: Math.random().toString(36).substr(2, 9),
                x: (c.x / 1000) * width,
                y: (c.y / 600) * height
              }));
              setCharges(scaledConfig);
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all backdrop-blur-md"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); window.history.back(); }}
        className="absolute top-8 right-8 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-md group"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:scale-110 transition-transform">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
};

export default FieldPainter;
