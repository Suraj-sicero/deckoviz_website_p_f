"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ShieldAlert, Activity, Target, X, Radio, Terminal, Cpu, Maximize2, RefreshCw } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const SIGNAL_TYPES = [
  { id: "RADIO", name: "Terrestrial Radio", freq: "104.2 MHz", strength: 88, origin: "Sector 01-A // Earth" },
  { id: "SONAR", name: "Oceanic Sonar", freq: "40 kHz", strength: 64, origin: "Mariana Abyss // Submarine" },
  { id: "DEEP_SPACE", name: "Cosmic Pulsar", freq: "1420 MHz", strength: 12, origin: "M87 Galaxy // Unknown" },
  { id: "SEISMIC", name: "Tectonic Pulse", freq: "0.5 Hz", strength: 92, origin: "San Andreas // Subsurface" },
  { id: "RADAR", name: "Military Radar", freq: "9.5 GHz", strength: 75, origin: "Norfolk Naval Base" },
  { id: "ENCRYPTED", name: "Shadow Stream", freq: "???", strength: 5, origin: "Classified // Proxy-7" },
];

const SignalInterception: React.FC = () => {
    const navigate = useNavigate();
  const [type, setType] = useState(SIGNAL_TYPES[0]);
  const [isIntercepting, setIsIntercepting] = useState(false);
  const [decryptionProgress, setDecryptionProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const sceneRef = useRef<THREE.Scene | null>(null);
  const globeRef = useRef<THREE.Group | null>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Decryption Simulation
  useEffect(() => {
    if (isIntercepting) {
      const interval = setInterval(() => {
        setDecryptionProgress(prev => (prev + Math.random() * 2) % 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isIntercepting]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#000804");

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Intelligence Sphere
    const globe = new THREE.Group();
    globeRef.current = globe;
    scene.add(globe);

    // Inner Grid Sphere
    const sphereGeom = new THREE.SphereGeometry(6, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({ 
      color: "#00ff88", 
      wireframe: true, 
      transparent: true, 
      opacity: 0.1 
    });
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    globe.add(sphere);

    // Polar Rings
    for (let i = 0; i < 3; i++) {
      const ringGeom = new THREE.TorusGeometry(8 + i * 2, 0.05, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: "#00ff88", transparent: true, opacity: 0.2 });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2;
      globe.add(ring);
    }

    // Interception Pings
    const pingGeom = new THREE.IcosahedronGeometry(0.3, 1);
    const pings: THREE.Mesh[] = [];
    for (let i = 0; i < 20; i++) {
      const pingMat = new THREE.MeshBasicMaterial({ color: "#00ff88" });
      const ping = new THREE.Mesh(pingGeom, pingMat);
      const radius = 6 + Math.random() * 4;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      ping.position.set(
        radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(theta)
      );
      globe.add(ping);
      pings.push(ping);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      globe.rotation.x += 0.001;

      pings.forEach((p, i) => {
        p.scale.setScalar(1 + Math.sin(Date.now() * 0.01 + i) * 0.5);
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#000804] overflow-hidden font-mono selection:bg-[#00ff88]/30">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />

      {/* CRT Scanline Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(0,255,136,0.05),rgba(0,0,0,0.02),rgba(0,255,136,0.05))] bg-[length:100%_4px,3px_100%] opacity-40" />
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_200px_rgba(0,255,136,0.15)]" />

      {/* Intelligence HUD */}
      <div className="absolute inset-0 z-30 pointer-events-none p-12 pb-40 flex flex-col justify-between">
        
        {/* Top: Branding & Decryption Progress */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#00ff88]/5 border border-[#00ff88]/20 flex items-center justify-center backdrop-blur-xl pointer-events-auto shadow-[0_0_30px_rgba(0,255,136,0.1)]">
               <ShieldAlert className="w-8 h-8 text-[#00ff88] animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#00ff88] tracking-widest uppercase italic">Signal Intel Console</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
                <p className="text-[10px] text-[#00ff88]/40 uppercase tracking-[0.5em]">Restricted Access // Level 05 Authorization</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             <div className="p-6 rounded-2xl bg-black/40 border border-[#00ff88]/20 backdrop-blur-xl space-y-2 w-64">
                <div className="flex justify-between items-center text-[10px] font-bold text-[#00ff88]/60 uppercase tracking-widest">
                   <span>Cipher Decryption</span>
                   <span>{Math.floor(decryptionProgress)}%</span>
                </div>
                <div className="h-1 w-full bg-[#00ff88]/10 rounded-full overflow-hidden">
                   <motion.div 
                    animate={{ width: `${decryptionProgress}%` }}
                    className="h-full bg-[#00ff88] shadow-[0_0_15px_#00ff88]"
                   />
                </div>
             </div>
             <button 
               onClick={toggleFullscreen}
               className="p-5 rounded-2xl bg-[#00ff88]/5 border border-[#00ff88]/20 text-[#00ff88]/40 hover:text-[#00ff88] hover:bg-[#00ff88]/10 transition-all backdrop-blur-xl group"
             >
               <Maximize2 size={20} />
             </button>
             <button 
               onClick={() => window.location.reload()}
               className="p-5 rounded-2xl bg-[#00ff88]/5 border border-[#00ff88]/20 text-[#00ff88]/40 hover:text-[#00ff88] hover:bg-[#00ff88]/10 transition-all backdrop-blur-xl group"
             >
               <RefreshCw size={20} />
             </button>
             
          </div>
        </div>

        {/* Center: Intercept Overlay */}
        {!isIntercepting && (
          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-auto">
             <button 
              onClick={() => setIsIntercepting(true)}
              className="group relative px-12 py-6 bg-[#00ff88] rounded-xl flex items-center gap-4 hover:scale-105 transition-all shadow-[0_0_40px_rgba(0,255,136,0.3)]"
             >
                <Target className="text-black" size={24} />
                <span className="text-black font-black uppercase tracking-[0.3em] text-sm">Initiate Interception</span>
             </button>
          </div>
        )}

        {/* Bottom Section */}
        <div className="flex justify-between items-end">
          {/* Telemetry Deck */}
          <div className="p-10 rounded-[3rem] bg-black/40 border border-[#00ff88]/20 backdrop-blur-3xl space-y-8 w-[32rem] pointer-events-auto">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3 text-[#00ff88]">
                  <Activity size={20} className="animate-pulse" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.4em]">Signal Telemetry</span>
               </div>
               <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88]/20" />
               </div>
            </div>
            
            <div className="space-y-4">
               {SIGNAL_TYPES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setType(s)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${type.id === s.id ? 'bg-[#00ff88]/10 border-[#00ff88]/40 text-[#00ff88]' : 'bg-transparent border-white/5 text-white/20 hover:text-white/40'}`}
                  >
                    <div className="flex items-center gap-4">
                       <Radio size={14} />
                       <span className="text-[10px] font-bold uppercase tracking-widest">{s.name}</span>
                    </div>
                    <span className="text-[10px] font-mono">{s.freq}</span>
                  </button>
               ))}
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
               <div className="space-y-1">
                  <span className="text-[8px] text-[#00ff88]/30 uppercase font-bold tracking-widest">Signal Origin</span>
                  <p className="text-white text-xs font-mono truncate">{type.origin}</p>
               </div>
               <div className="space-y-1 text-right">
                  <span className="text-[8px] text-[#00ff88]/30 uppercase font-bold tracking-widest">Strength</span>
                  <p className="text-[#00ff88] font-bold font-mono">{type.strength}%</p>
               </div>
            </div>
          </div>

          {/* Hex Decryption Stream */}
          <div className="w-[30rem] p-8 rounded-[2.5rem] bg-black/60 border border-[#00ff88]/20 backdrop-blur-3xl overflow-hidden pointer-events-auto">
             <div className="flex items-center gap-3 text-[#00ff88]/40 mb-6">
                <Terminal size={14} />
                <span className="text-[9px] font-bold uppercase tracking-widest">Cipher Stream // Live</span>
             </div>
             <div className="space-y-1 font-mono text-[9px] text-[#00ff88]/40 h-40 overflow-hidden leading-tight">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-[#00ff88]/10">0x{Math.floor(Math.random()*1000).toString(16).toUpperCase()}</span>
                    <span className={i % 3 === 0 ? 'text-[#00ff88]' : ''}>
                      {Array.from({ length: 8 }).map(() => Math.floor(Math.random()*16).toString(16).toUpperCase()).join(' ')}
                    </span>
                    <span className="opacity-10">[ DECRYPTING... ]</span>
                  </div>
                ))}
             </div>
             <div className="mt-6 pt-6 border-t border-[#00ff88]/10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                   <div className="p-2 rounded bg-[#00ff88]/10">
                      <Cpu size={14} className="text-[#00ff88]" />
                   </div>
                   <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">Neural Processing Active</span>
                </div>
                <Maximize2 size={14} className="text-[#00ff88]/20" />
             </div>
          </div>
        </div>
      </div>

      {/* Static Overlays */}
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen" />
      <div className="absolute bottom-400 right-12 z-30 text-[8px] text-[#00ff88]/10 tracking-[2.5em] uppercase pointer-events-none">
        Sigma Intelligence // Fragment 0xAA
      </div>
    
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

export default SignalInterception;
