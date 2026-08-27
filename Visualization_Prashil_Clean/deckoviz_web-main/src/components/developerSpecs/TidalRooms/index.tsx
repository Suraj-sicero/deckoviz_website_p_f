"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Waves, Wind, Thermometer, Maximize2, 
  RefreshCw, Info, Compass, Anchor, MapPin
} from "lucide-react";

const LOCATIONS = [
  { name: "Goa, India", lat: 15.2993, lon: 74.1240, offset: 0, temp: "28°C", salinity: "35ppt" },
  { name: "Malibu, CA", lat: 34.0259, lon: -118.7798, offset: 5, temp: "16°C", salinity: "33ppt" },
  { name: "Tokyo Bay, JP", lat: 35.5398, lon: 139.7876, offset: 9, temp: "14°C", salinity: "32ppt" },
  { name: "Reykjavik, IS", lat: 64.1265, lon: -21.8174, offset: 2, temp: "4°C", salinity: "34ppt" },
];

const TidalRooms: React.FC = () => {
    const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [tideInfo, setTideInfo] = useState({ height: 1.5, status: "Rising", normalized: 0.5 });
  
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const roomGroupRef = useRef<THREE.Group | null>(null);
  const waterRef = useRef<THREE.Mesh | null>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const calculateTide = useCallback(() => {
    const now = Date.now() / 1000;
    const period = 12 * 3600; // 12 hour cycle
    const phase = (now / period) * Math.PI * 2 + selectedLocation.offset;
    const height = (Math.sin(phase) + 1) / 2; 
    const rawHeight = height * 4.2; 
    const isRising = Math.cos(phase) > 0;
    
    return {
      normalized: height,
      raw: rawHeight.toFixed(2),
      status: isRising ? "Rising" : "Falling"
    };
  }, [selectedLocation]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#020205");

    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 1.5, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Room Group
    const room = new THREE.Group();
    roomGroupRef.current = room;
    scene.add(room);

    // Architectural Interior
    const wallMat = new THREE.MeshStandardMaterial({ 
        color: "#1a1a1c", 
        roughness: 0.8, 
        metalness: 0.2,
        side: THREE.BackSide 
    });
    const roomGeo = new THREE.BoxGeometry(15, 8, 15);
    const roomMesh = new THREE.Mesh(roomGeo, wallMat);
    roomMesh.position.y = 3;
    room.add(roomMesh);

    // Water Surface
    const waterGeo = new THREE.PlaneGeometry(15, 15, 64, 64);
    const waterMat = new THREE.MeshStandardMaterial({
        color: "#0a2a3a",
        transparent: true,
        opacity: 0.6,
        roughness: 0.05,
        metalness: 0.9,
        flatShading: true
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -1;
    waterRef.current = water;
    scene.add(water);

    // Central Pillar (Abstract Sculpture)
    const pillarGeo = new THREE.CylinderGeometry(0.5, 0.5, 12, 32);
    const pillarMat = new THREE.MeshStandardMaterial({ color: "#222", roughness: 0.9 });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    room.add(pillar);

    // Lighting
    const amb = new THREE.AmbientLight("#fff", 0.1);
    scene.add(amb);

    const sun = new THREE.DirectionalLight("#ffd700", 2);
    sun.position.set(10, 10, 5);
    scene.add(sun);

    const fill = new THREE.PointLight("#00f", 0.5);
    fill.position.set(-5, 0, 0);
    scene.add(fill);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      
      const tide = calculateTide();
      setTideInfo({ height: parseFloat(tide.raw), status: tide.status, normalized: tide.normalized });
      
      // Tidal Breath: Room Expansion
      const scale = 1 + tide.normalized * 0.02;
      room.scale.set(scale, 1, scale);
      
      // Water Level & Waves
      water.position.y = -2 + tide.normalized * 2;
      const pos = water.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const wave = Math.sin(x * 0.5 + time * 0.001) * 0.1 + Math.cos(y * 0.5 + time * 0.0015) * 0.1;
          pos.setZ(i, wave * tide.normalized);
      }
      pos.needsUpdate = true;

      // Lighting transition
      sun.intensity = 0.5 + tide.normalized * 1.5;
      sun.color.lerp(new THREE.Color(tide.normalized > 0.5 ? "#ffd700" : "#4facfe"), 0.05);

      renderer.render(scene, camera);
    };
    animate(0);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, [calculateTide]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020205] overflow-hidden font-mono selection:bg-blue-500/30">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Cinematic HUD Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none p-12 pb-40 flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-blue-500/20 flex items-center justify-center backdrop-blur-xl">
                 <Waves className="w-8 h-8 text-blue-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-t-2 border-blue-400 rounded-full animate-spin" style={{ animationDuration: '5s' }} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Tidal Rooms</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <p className="text-[10px] text-blue-400/60 uppercase tracking-[0.6em]">Bioclimatic Architecture // Sync Active</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             <button 
               onClick={toggleFullscreen}
               className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl"
             >
               <Maximize2 size={16} />
             </button>
             <button onClick={() => window.location.reload()} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl">
                <RefreshCw size={16} />
             </button>
          </div>
        </div>

        {/* Bottom Telemetry HUD */}
        <div className="flex justify-between items-end">
          {/* Left Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 w-96 shadow-2xl"
          >
            <div className="flex items-center gap-3 text-blue-400">
               <Anchor size={18} className="animate-bounce" />
               <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Hydrological Telemetry</span>
            </div>
            
            <div className="space-y-5">
              {[
                { label: "Tide Level", val: `${tideInfo.height}m`, icon: <Waves size={12} />, progress: tideInfo.normalized },
                { label: "Ocean Temp", val: selectedLocation.temp, icon: <Thermometer size={12} />, progress: 0.6 },
                { label: "Salinity", val: selectedLocation.salinity, icon: <Compass size={12} />, progress: 0.8 }
              ].map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-2 text-white/40">
                      {m.icon}
                      <span>{m.label}</span>
                    </div>
                    <span className="text-white">{m.val}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: `${m.progress * 100}%` }}
                      className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-3 text-[10px] text-white/20 uppercase font-bold tracking-widest border-t border-white/5">
              <MapPin size={14} className="text-blue-500/40" />
              <span>Sensor Link: {selectedLocation.name}</span>
            </div>
          </motion.div>

          {/* Location Selector */}
          <div className="flex flex-col gap-6 items-end pointer-events-auto">
             <div className="flex gap-3">
               {LOCATIONS.map(loc => (
                 <button
                   key={loc.name}
                   onClick={() => setSelectedLocation(loc)}
                   className={`px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${selectedLocation.name === loc.name ? 'bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)]' : 'bg-white/5 border border-white/10 text-white/40 hover:bg-white/10'}`}
                 >
                   {loc.name.split(',')[0]}
                 </button>
               ))}
             </div>

             <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl flex gap-12 w-[30rem] relative overflow-hidden">
               <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Wind size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Current Status</span>
                  </div>
                  <p className="text-4xl text-white font-black tracking-tighter italic">{tideInfo.status.toUpperCase()}</p>
                  <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-widest">Architecture synchronizing with lunar gravity cycles.</p>
               </div>
               <div className="w-px h-full bg-white/10" />
               <div className="flex-1 space-y-2">
                  <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Tide Peak</span>
                  <p className="text-2xl text-white font-black">4.20M</p>
                  <div className="text-[10px] text-blue-400 font-bold italic tracking-widest mt-4">STABLE_FLOW</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Effects */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,0.8)]" />
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    
      {/* ALWAYS VISIBLE EXIT BUTTON */}
      <div className="absolute top-8 right-24 pointer-events-auto z-[9999]">
        <button 
          onClick={() => {
            if (typeof navigate !== 'undefined') {
              navigate('/experimental-art-modes');
            } else {
              window.location.href = '/experimental-art-modes';
            }
          }}
          className="p-3.5 bg-black/20 hover:bg-rose-500/20 backdrop-blur-xl rounded-2xl border border-white/10 text-white/70 hover:text-rose-400 transition-all shadow-xl flex items-center justify-center"
          title="Exit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
</div>
  );
};

export default TidalRooms;
