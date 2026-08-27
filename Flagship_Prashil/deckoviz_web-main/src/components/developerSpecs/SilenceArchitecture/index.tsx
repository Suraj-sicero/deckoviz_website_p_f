"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Shield, Box, Share2, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface SilenceEvent {
  id: string;
  pos: THREE.Vector3;
  duration: number;
  context: 'post-loud' | 'post-soft';
  freq: 'high' | 'low';
  mesh: THREE.Mesh | THREE.Group;
  startTime: number;
}

const SilenceArchitecture: React.FC = () => {
    const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [eventCount, setEventCount] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const eventsRef = useRef<SilenceEvent[]>([]);
  const scannerRef = useRef<THREE.Mesh | null>(null);
  const reactorRef = useRef<THREE.Mesh | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const isListeningRef = useRef(false);
  const silenceRef = useRef({ 
    active: false, 
    start: 0, 
    preRms: 0, 
    preFreq: 0 
  });

  // --- Audio Logic ---
  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) {
        console.error("AudioContext not supported");
        return;
      }
      const ctx = new AudioContextClass();
      
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      setIsListening(true);
      isListeningRef.current = true;
      setShowTutorial(false);
    } catch (err) {
      console.error("Mic access denied", err);
    }
  };

  const stopListening = useCallback(() => {
    setIsListening(false);
    isListeningRef.current = false;
    
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    analyserRef.current = null;
    setShowTutorial(true);
  }, []);

  const createArchitecturalVoid = useCallback((event: Omit<SilenceEvent, 'mesh' | 'pos'>) => {
    if (!sceneRef.current) return;

    const group = new THREE.Group();
    const color = event.freq === 'high' ? new THREE.Color("#4fd1c5") : new THREE.Color("#f6ad55");
    const height = Math.min(Math.log(event.duration) * 2, 15);
    
    let geometry: THREE.BufferGeometry;
    let material: THREE.Material;

    if (event.context === 'post-loud') {
      // Monolith Structure
      geometry = new THREE.BoxGeometry(1, height, 1);
      material = new THREE.MeshStandardMaterial({ 
        color: 0x111111, 
        emissive: color, 
        emissiveIntensity: 1.5,
        metalness: 0.9,
        roughness: 0.1,
        wireframe: Math.random() > 0.7
      });
    } else {
      // Floating Sphere / Node
      geometry = new THREE.IcosahedronGeometry(height * 0.2, 1);
      material = new THREE.MeshStandardMaterial({ 
        color: 0x050505, 
        emissive: color, 
        emissiveIntensity: 2,
        transparent: true,
        opacity: 0.8,
        wireframe: true
      });
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = event.context === 'post-loud' ? height / 2 - 10 : (Math.random() - 0.5) * 10;
    group.add(mesh);

    // Random position on the timeline
    const x = (Math.random() - 0.5) * 60;
    const z = (Math.random() - 0.5) * 40;
    group.position.set(x, 0, z);
    
    // Animation entrance
    group.scale.set(0.01, 0.01, 0.01);
    sceneRef.current.add(group);
    
    eventsRef.current.push({ ...event, mesh: group, pos: group.position.clone() });
    setEventCount(prev => prev + 1);
  }, []);

  // --- Three.js Setup ---
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#020205");
    scene.fog = new THREE.FogExp2("#020205", 0.03);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 40);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      powerPreference: "high-performance"
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Post Processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, 0.4, 0.85
    );
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // Grid Floor
    const grid = new THREE.GridHelper(200, 50, 0x4fd1c5, 0x0a0a15);
    grid.position.y = -10;
    scene.add(grid);

    // Scanner Beam
    const scanGeo = new THREE.BoxGeometry(200, 0.1, 0.1);
    const scanMat = new THREE.MeshBasicMaterial({ color: 0x4fd1c5, transparent: true, opacity: 0.2 });
    const scanner = new THREE.Mesh(scanGeo, scanMat);
    scanner.position.y = -9.9;
    scene.add(scanner);
    scannerRef.current = scanner;

    // Central Reactor (Real-time feedback)
    const reactorGeo = new THREE.IcosahedronGeometry(5, 2);
    const reactorMat = new THREE.MeshStandardMaterial({ 
      color: 0x4fd1c5, 
      emissive: 0x4fd1c5, 
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const reactor = new THREE.Mesh(reactorGeo, reactorMat);
    scene.add(reactor);
    reactorRef.current = reactor;

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(amb);

    const spot = new THREE.PointLight(0x4fd1c5, 1, 100);
    spot.position.set(0, 20, 0);
    scene.add(spot);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const animate = (time: number) => {
      requestAnimationFrame(animate);
      
      const t = time * 0.001;

      // Update Scanner
      if (scannerRef.current) {
        scannerRef.current.position.z = Math.sin(t * 0.5) * 50;
      }

      // Process Audio
      let rms = 0;
      if (isListeningRef.current && analyserRef.current) {
        const dataArray = new Float32Array(analyserRef.current.fftSize);
        analyserRef.current.getFloatTimeDomainData(dataArray);
        
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i] * dataArray[i];
        rms = Math.sqrt(sum / dataArray.length);
        
        const freqArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(freqArray);
        let avgFreq = 0;
        for (let i = 0; i < freqArray.length; i++) avgFreq += freqArray[i];
        avgFreq /= freqArray.length;

        const threshold = 0.005;
        const now = Date.now();
        const isSilent = rms < threshold;

        if (isSilent && !silenceRef.current.active) {
          silenceRef.current = { active: true, start: now, preRms: rms, preFreq: avgFreq };
        } else if (!isSilent && silenceRef.current.active) {
          const duration = now - silenceRef.current.start;
          if (duration >= 100) {
            createArchitecturalVoid({
              id: Math.random().toString(),
              duration,
              context: silenceRef.current.preRms > 0.03 ? 'post-loud' : 'post-soft',
              freq: silenceRef.current.preFreq > 80 ? 'high' : 'low',
              startTime: now
            });
          }
          silenceRef.current.active = false;
        }
      }

      // Sync Reactor to Audio
      if (reactorRef.current) {
        const scale = 1 + rms * 15;
        reactorRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
        (reactorRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + rms * 10;
        reactorRef.current.rotation.y += 0.005 + rms * 0.1;
      }

      // Animate Voids
      eventsRef.current.forEach(ev => {
        if (ev.mesh.scale.x < 1) {
          ev.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
        }
        ev.mesh.rotation.y += 0.01;
        
        // Floating motion
        if (ev.context === 'post-soft') {
          ev.mesh.position.y = ev.pos.y + Math.sin(t + ev.startTime) * 0.5;
        }
      });

      composer.render();
    };
    animate(0);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      composer.dispose();
    };
  }, [createArchitecturalVoid]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020205] overflow-hidden font-mono selection:bg-cyan-500/30">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Cinematic HUD */}
      <div className="absolute inset-0 z-10 pointer-events-none p-12 pb-40 flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 flex items-center justify-center backdrop-blur-xl">
                 <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-t-2 border-cyan-400 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Silence Architecture</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                <p className="text-[10px] text-cyan-400/60 uppercase tracking-[0.6em]">Acoustic Void Mapping // v.2.04 Gold</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             {isListening && (
               <button 
                 onClick={stopListening}
                 className="px-8 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all backdrop-blur-xl"
               >
                 Terminate Capture
               </button>
             )}
             <div className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl flex flex-col items-end">
                <span className="text-[10px] text-white/30 uppercase font-bold tracking-[0.3em]">System Entropy</span>
                <span className="text-cyan-400 text-sm font-bold">{isListening ? "SIGNAL_ACTIVE" : "IDLE_STANDBY"}</span>
             </div>
             
          </div>
        </div>

        {/* Center Prompt */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="self-center p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl text-center max-w-lg pointer-events-auto"
            >
              <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-8 border border-cyan-500/20">
                <Shield className="text-cyan-400 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Neural Silence Translation</h2>
              <p className="text-white/40 leading-relaxed mb-8 text-sm">
                This engine maps the architectural structure of silence. 
                <br /><br />
                <span className="text-cyan-400 font-bold italic">Speak, stop, and observe.</span> 
                <br />
                The absence of sound will be translated into 3D monoliths and geometric voids in the digital aether.
              </p>
              <button 
                onClick={startListening}
                className="w-full py-5 rounded-2xl bg-cyan-500 text-black font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)]"
              >
                Engage Capture
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Telemetry */}
        <div className="flex justify-between items-end">
          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 w-80">
            <div className="flex items-center gap-3 text-cyan-400">
               <Box size={18} className="animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Structure Log</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <span className="text-[10px] text-white/30 uppercase">Detected Voids</span>
                <span className="text-3xl text-white font-black">{eventCount}</span>
              </div>
              <div className="text-[10px] text-white/20 italic leading-relaxed">
                "Silence is not the absence of sound, but the presence of architecture."
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-end">
            <div className="flex gap-4 pointer-events-auto">
               <button 
                onClick={() => {
                  eventsRef.current.forEach(e => sceneRef.current?.remove(e.mesh));
                  eventsRef.current = [];
                  setEventCount(0);
                }}
                className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:bg-white/10 hover:text-white transition-all"
              >
                Reset Voids
              </button>
              <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <Share2 size={16} />
              </button>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl flex gap-12 w-[32rem]">
               <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Activity size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Acoustic Load</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: isListening ? "65%" : "0%" }} 
                      className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
                    />
                  </div>
                  <p className="text-xs text-white/40">Spectral analysis nominal</p>
               </div>
               <div className="w-px h-full bg-white/10" />
               <div className="flex-1 space-y-2">
                  <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Translation Engine</span>
                  <p className="text-xl text-white font-black">ACTIVE_FORM</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Effects */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,0.95)]" />
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen" />
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.03] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent bg-[length:100%_4px]" />
    
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

export default SilenceArchitecture;
