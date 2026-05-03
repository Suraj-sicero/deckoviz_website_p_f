"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Info, ChevronRight, X, Maximize2, RefreshCw } from "lucide-react";

const EVENTS = [
  { id: "red_giant", name: "Red Giant Sunset", color: "#f87171", bg: "#450a0a", years: "4.2M", desc: "Thermal expansion of a dying solar core." },
  { id: "neutron_star", name: "Neutron Star Death", color: "#60a5fa", bg: "#1e3a8a", years: "12.8M", desc: "Collapse of massive stellar material into a singularity." },
  { id: "white_dwarf", name: "White Dwarf Fade", color: "#fefce8", bg: "#1e1b4b", years: "0.5M", desc: "The final cooling phase of a low-mass star." },
  { id: "pulsar", name: "Pulsar Beam", color: "#a78bfa", bg: "#2e1065", years: "8.4M", desc: "Highly magnetized, rotating neutron star emissions." },
  { id: "magnetar", name: "Magnetar Flare", color: "#ec4899", bg: "#500724", years: "15.2M", desc: "Extreme magnetic field burst across the cosmos." },
];

const LastLight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [event, setEvent] = useState(EVENTS[0]);
  const [progress, setProgress] = useState(0);
  const [showInfo, setShowInfo] = useState(true);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const stateRef = useRef({ event, progress });

  useEffect(() => {
    stateRef.current = { event, progress };
  }, [event, progress]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      powerPreference: "high-performance" 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Post-Processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, 0.4, 0.85
    );
    composer.addPass(bloomPass);

    // Starfield (Points with Motion)
    const starCount = 3000;
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starVel = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 2000;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      starPos[i * 3 + 2] = Math.random() * -2000;
      starVel[i] = Math.random() * 5 + 2;
    }
    
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 1.5, 
      transparent: true, 
      opacity: 0.8,
      sizeAttenuation: true 
    });
    const stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);

    // Photon (Glow Sphere)
    const photonGeom = new THREE.SphereGeometry(2, 32, 32);
    const photonMat = new THREE.MeshBasicMaterial({ color: event.color });
    const photon = new THREE.Mesh(photonGeom, photonMat);
    scene.add(photon);

    // Nebula Clouds
    const nebulaCount = 15;
    const nebulaGroup = new THREE.Group();
    const loader = new THREE.TextureLoader();
    const nebulaTexture = loader.load("https://threejs.org/examples/textures/lensflare/lensflare0.png");
    
    for (let i = 0; i < nebulaCount; i++) {
      const spriteMat = new THREE.SpriteMaterial({
        map: nebulaTexture,
        color: new THREE.Color(event.bg).lerp(new THREE.Color(event.color), 0.2),
        transparent: true,
        opacity: 0.05,
        blending: THREE.AdditiveBlending
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 500,
        (Math.random() - 1) * 1000
      );
      sprite.scale.set(300, 300, 1);
      nebulaGroup.add(sprite);
    }
    scene.add(nebulaGroup);

    const duration = 90000;
    const startTime = performance.now();

    const animate = () => {
      const time = performance.now();
      const p = Math.min((time - startTime) / duration, 1);
      setProgress(p);

      // Star Motion
      const positions = starGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        positions[i * 3 + 2] += starVel[i] * (1 + p * 20); // Warp speed
        if (positions[i * 3 + 2] > 200) {
          positions[i * 3 + 2] = -1800;
        }
      }
      starGeom.attributes.position.needsUpdate = true;

      // Photon Evolution
      photon.position.z = 1000 - p * 1200;
      photon.position.x = Math.sin(time * 0.001) * 2;
      photon.position.y = Math.cos(time * 0.001) * 2;
      
      const targetColor = new THREE.Color(stateRef.current.event.color);
      photon.material.color.lerp(targetColor, 0.05);
      
      // Nebula Pulse
      nebulaGroup.children.forEach((n, i) => {
        n.position.z += 0.5;
        if (n.position.z > 200) n.position.z = -800;
        (n as THREE.Sprite).material.opacity = 0.05 + Math.sin(time * 0.0005 + i) * 0.02;
      });

      composer.render();
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      composer.dispose();
    };
  }, [event.id, event.bg, event.color]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden font-mono selection:bg-white/20">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Cinematic HUD Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none p-12 pb-40 flex flex-col justify-between">
        
        {/* Top Section: System Status */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h1 className="text-2xl font-black text-white tracking-[0.2em] uppercase">The Last Light</h1>
            </div>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] pl-5">Cosmological Finality v4.8 // {event.name}</p>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Spectral Signature</span>
              <div className="flex gap-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [4, 12, 6, 16, 4][i % 5] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                    className="w-1 bg-white/20"
                  />
                ))}
              </div>
            </div>
            <button 
              onClick={toggleFullscreen}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl group"
            >
              <Maximize2 size={20} />
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl group"
            >
              <RefreshCw size={20} />
            </button>
            <button 
              onClick={() => window.history.back()}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Center: Info Card */}
        <AnimatePresence>
          {showInfo && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="self-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl max-w-sm pointer-events-auto relative group"
            >
              <button onClick={() => setShowInfo(false)} className="absolute top-4 right-4 text-white/20 hover:text-white">
                <X size={14} />
              </button>
              <div className="flex items-center gap-3 text-white/60 mb-4">
                <Info size={16} className="text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-widest">Scientific Overview</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
              <p className="text-sm text-white/50 leading-relaxed font-serif italic mb-6">"{event.desc}"</p>
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-white/20 uppercase font-bold">Magnitude</span>
                  <p className="text-white text-xs font-mono">1.42e34 W</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-white/20 uppercase font-bold">Frequency</span>
                  <p className="text-white text-xs font-mono">240.5 THz</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Section: Telemetry */}
        <div className="flex justify-between items-end pointer-events-auto">
          {/* Controls */}
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl space-y-6 w-80">
            <div className="flex items-center gap-2 text-white/60 mb-4">
              <Zap size={14} className="text-yellow-400" />
              <span className="text-xs font-bold uppercase tracking-widest">Origin Parameters</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {EVENTS.map(e => (
                <button
                  key={e.id}
                  onClick={() => setEvent(e)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${event.id === e.id ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5 border border-transparent'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${event.id === e.id ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>{e.name}</span>
                  </div>
                  <ChevronRight size={14} className={`text-white/20 ${event.id === e.id ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Telemetry Display */}
          <div className="text-right space-y-4">
            <div className="space-y-1">
              <span className="text-xs text-white/30 uppercase font-bold tracking-[0.4em]">Temporal Displacement</span>
              <div className="text-7xl font-black text-white tracking-tighter tabular-nums">
                {Math.floor(progress * 1000000).toLocaleString()}
                <span className="text-2xl ml-2 text-white/20 uppercase tracking-normal font-bold">Years</span>
              </div>
            </div>
            <div className="flex justify-end gap-12 items-center">
               <div className="flex flex-col">
                  <span className="text-[10px] text-white/20 uppercase font-bold">Relative Velocity</span>
                  <span className="text-white text-lg font-mono tracking-tighter">0.999c</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] text-white/20 uppercase font-bold">Redshift (z)</span>
                  <span className="text-white text-lg font-mono tracking-tighter">{(progress * 8.4).toFixed(3)}</span>
               </div>
               <div className="h-10 w-px bg-white/10" />
               <div className="flex flex-col">
                  <span className="text-[10px] text-white/20 uppercase font-bold">Luminosity</span>
                  <span className="text-white text-lg font-mono tracking-tighter">{((1 - progress) * 100).toFixed(1)}%</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrival Fade */}
      <AnimatePresence>
        {progress > 0.99 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="absolute inset-0 z-50 pointer-events-none"
            style={{ backgroundColor: event.color }}
          />
        )}
      </AnimatePresence>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />
      <div className="absolute bottom-400 left-1/2 -translate-x-1/2 z-20 text-[10px] font-mono text-white/10 tracking-[1em] uppercase">
        Observed Event Horizon // Static Timeframe
      </div>
    </div>
  );
};

export default LastLight;
