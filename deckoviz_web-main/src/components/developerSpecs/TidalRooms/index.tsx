"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

const LOCATIONS = [
  { name: "Goa, India", lat: 15.2993, lon: 74.1240, offset: 0 },
  { name: "Malibu, CA", lat: 34.0259, lon: -118.7798, offset: 5 },
  { name: "Tokyo Bay, JP", lat: 35.5398, lon: 139.7876, offset: 9 },
];

const TidalRooms: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [tideInfo, setTideInfo] = useState({ height: 1.5, status: "Rising" });
  
  // Three.js Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const wallGroupRef = useRef<THREE.Group | null>(null);
  const lightRef = useRef<THREE.RectAreaLight | null>(null);

  // Mock Tide Calculation (Sine wave based on time and location offset)
  const calculateTide = useCallback(() => {
    const now = Date.now() / 1000; // seconds
    const period = 12 * 3600; // 12 hour cycle
    const phase = (now / period) * Math.PI * 2 + selectedLocation.offset;
    const height = (Math.sin(phase) + 1) / 2; // 0 to 1
    const rawHeight = height * 2.5; // 0m to 2.5m
    const isRising = Math.cos(phase) > 0;
    
    return {
      normalized: height,
      raw: rawHeight.toFixed(2),
      status: isRising ? "Rising" : "Falling"
    };
  }, [selectedLocation]);

  useEffect(() => {
    const update = () => {
      const tide = calculateTide();
      setTideInfo({ height: parseFloat(tide.raw), status: tide.status });
      
      if (wallGroupRef.current) {
        // Subtle expansion/contraction (1-3%)
        const scale = 1 + tide.normalized * 0.03;
        wallGroupRef.current.scale.set(scale, scale, scale);
      }
      
      if (sceneRef.current) {
        // Lighting transition
        // Low tide: Cool Blue (#b0c4de), High tide: Warm Gold (#ffd700)
        const lowColor = new THREE.Color("#b0c4de");
        const highColor = new THREE.Color("#ffd700");
        const currentColor = lowColor.clone().lerp(highColor, tide.normalized);
        sceneRef.current.background = new THREE.Color("#050505").lerp(currentColor, 0.05);
      }
    };

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [calculateTide]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Three.js Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#050505");

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // --- Room Geometry ---
    const wallGroup = new THREE.Group();
    wallGroupRef.current = wallGroup;
    scene.add(wallGroup);

    const floorGeo = new THREE.PlaneGeometry(10, 10);
    const floorMat = new THREE.MeshStandardMaterial({ color: "#222", roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    wallGroup.add(floor);

    const wallMat = new THREE.MeshStandardMaterial({ color: "#111", roughness: 0.9 });
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), wallMat);
    backWall.position.z = -5;
    wallGroup.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -5;
    wallGroup.add(leftWall);

    // Window (simulated with a bright plane outside)
    const windowGeo = new THREE.PlaneGeometry(6, 4);
    const windowMat = new THREE.MeshBasicMaterial({ 
      color: "#333",
    });
    const windowMesh = new THREE.Mesh(windowGeo, windowMat);
    windowMesh.position.set(2, 0.5, -4.9);
    wallGroup.add(windowMesh);

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(amb);

    const spot = new THREE.SpotLight(0xffffff, 1);
    spot.position.set(5, 5, 5);
    scene.add(spot);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden font-serif"
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Overlay UI */}
      <div className="absolute inset-0 z-10 pointer-events-none p-12 flex flex-col justify-between">
        
        {/* Top Section */}
        <div className="flex justify-between items-start pointer-events-auto">
          <div>
            <h1 className="text-3xl text-white/90 tracking-tighter">Tidal Breathing Rooms</h1>
            <p className="text-xs text-white/30 uppercase tracking-[0.4em] mt-2">v.1.04 Experimental Habitat</p>
          </div>
          
          <select 
            value={selectedLocation.name}
            onChange={(e) => {
              const loc = LOCATIONS.find(l => l.name === e.target.value);
              if (loc) setSelectedLocation(loc);
            }}
            className="bg-white/5 border border-white/10 text-white/70 text-xs px-4 py-2 rounded-full outline-none focus:border-white/30 transition-all cursor-pointer backdrop-blur-md"
          >
            {LOCATIONS.map(loc => (
              <option key={loc.name} value={loc.name} className="bg-[#111]">{loc.name}</option>
            ))}
          </select>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end">
          <div className="text-white/40 text-sm italic tracking-widest">
            {selectedLocation.name} — {tideInfo.status}
            <div className="text-4xl text-white font-light not-italic mt-2">
              {tideInfo.height}m
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-[10px] text-white/20 uppercase tracking-[0.5em] mb-4">Architecture In Sync</div>
            <button 
              onClick={() => window.history.back()}
              className="pointer-events-auto text-white/40 hover:text-white transition-all text-xs uppercase tracking-widest border-b border-white/10 pb-1"
            >
              Close Experience
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] bg-white mix-blend-overlay" />
    </div>
  );
};

export default TidalRooms;
