"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { motion, AnimatePresence } from "framer-motion";
import { Hand, Fingerprint, ChevronLeft, ChevronRight, X } from "lucide-react";
import { MATERIAL_LIBRARY } from "./materialLibrary";
import { useNavigate } from 'react-router-dom';

const HapticMemory: React.FC = () => {
    const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const material = MATERIAL_LIBRARY[currentIdx];
  const [isTouching, setIsTouching] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const noiseTexRef = useRef<THREE.CanvasTexture | null>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);

  // --- Texture Generation ---
  const generateProceduralTexture = useCallback(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Create noise/grain
    const imgData = ctx.createImageData(size, size);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = 128 + Math.random() * 127;
      imgData.data[i] = v;
      imgData.data[i + 1] = v;
      imgData.data[i + 2] = v;
      imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  // --- Three.js Setup ---
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#020205");

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

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
      0.8, 0.4, 0.85
    );
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // --- Geometry & Material ---
    const noiseTex = generateProceduralTexture();
    noiseTexRef.current = noiseTex;

    const geometry = new THREE.IcosahedronGeometry(5, 64);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(material.config.color),
      roughness: material.config.roughness,
      metalness: material.config.metalness,
      emissive: new THREE.Color(material.config.emissive),
      emissiveIntensity: material.config.emissiveIntensity,
      normalMap: noiseTex,
      normalScale: new THREE.Vector2(material.config.normalScale, material.config.normalScale),
      displacementMap: noiseTex,
      displacementScale: material.config.displacementScale,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geometry, mat);
    scene.add(mesh);
    meshRef.current = mesh;

    // --- Lighting ---
    const ambient = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambient);

    const pLight = new THREE.PointLight(0xffffff, 2, 50);
    pLight.position.set(10, 10, 10);
    scene.add(pLight);
    lightRef.current = pLight;

    const rimLight = new THREE.PointLight(0xffffff, 1, 30);
    rimLight.position.set(-10, -5, -10);
    scene.add(rimLight);

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

      if (meshRef.current) {
        meshRef.current.rotation.y += 0.002;
        meshRef.current.rotation.x += 0.001;
        
        // Dynamic Displacement Pulse
        (meshRef.current.material as THREE.MeshStandardMaterial).displacementBias = Math.sin(t) * 0.1;
      }

      // Light orbit
      if (lightRef.current) {
        lightRef.current.position.x = Math.sin(t * 0.5) * 12;
        lightRef.current.position.y = Math.cos(t * 0.3) * 12;
      }

      composer.render();
    };
    animate(0);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      composer.dispose();
      noiseTex.dispose();
    };
  }, [generateProceduralTexture]); // Only re-run if texture logic changes

  // --- Material Sync ---
  useEffect(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.color.set(material.config.color);
    mat.emissive.set(material.config.emissive);
    mat.emissiveIntensity = material.config.emissiveIntensity;
    mat.roughness = material.config.roughness;
    mat.metalness = material.config.metalness;
    mat.normalScale.set(material.config.normalScale, material.config.normalScale);
    mat.displacementScale = material.config.displacementScale;
  }, [
    material.config.color,
    material.config.emissive,
    material.config.emissiveIntensity,
    material.config.roughness,
    material.config.metalness,
    material.config.normalScale,
    material.config.displacementScale
  ]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
    
    if (lightRef.current) {
      lightRef.current.position.set(x * 15, y * 15, 10);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#020205] overflow-hidden font-mono selection:bg-amber-500/30"
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsTouching(true)}
      onMouseUp={() => setIsTouching(false)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 cursor-none" />

      {/* Custom Cursor Overlay */}
      <motion.div 
        animate={{ 
          x: mousePos.x * (window.innerWidth / 2) + (window.innerWidth / 2),
          y: -mousePos.y * (window.innerHeight / 2) + (window.innerHeight / 2),
          scale: isTouching ? 1.5 : 1,
          opacity: 1
        }}
        className="fixed w-12 h-12 border border-amber-500/50 rounded-full pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm"
      >
        <div className="w-1 h-1 bg-amber-500 rounded-full" />
        {isTouching && <div className="absolute inset-0 border-2 border-amber-500 rounded-full animate-ping opacity-50" />}
      </motion.div>

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
              <div className="w-16 h-16 rounded-full border-2 border-amber-500/20 flex items-center justify-center backdrop-blur-xl">
                 <Hand className="w-8 h-8 text-amber-500 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-t-2 border-amber-500 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Haptic Memory</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <p className="text-[10px] text-amber-500/60 uppercase tracking-[0.6em]">Sensory Reconstruction // v.9.12</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
            
          </div>
        </div>

        {/* Center Prompt - Scanning Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
           <div className="w-[80vw] h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse" />
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end">
          
          {/* Material Inscription */}
          <AnimatePresence mode="wait">
            <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-xl pointer-events-auto"
            >
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] text-amber-500 font-bold uppercase tracking-widest">
                    {material.emotion} reconstruction
                  </span>
                  <div className="h-px w-24 bg-white/10" />
                </div>
                <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tight italic">
                    {material.name}
                </h2>
                <p className="text-lg text-white/40 leading-relaxed font-serif italic border-l-2 border-amber-500/30 pl-8">
                    "{material.description}"
                </p>
                
                <div className="mt-12 flex gap-8 items-center">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Roughness</span>
                      <div className="w-32 h-1 bg-white/5 mt-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${material.config.roughness * 100}%` }}
                          className="h-full bg-amber-500" 
                        />
                      </div>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Metalness</span>
                      <div className="w-32 h-1 bg-white/5 mt-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${material.config.metalness * 100}%` }}
                          className="h-full bg-cyan-400" 
                        />
                      </div>
                   </div>
                </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation & Metrics */}
          <div className="flex flex-col gap-8 items-end pointer-events-auto">
            
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 w-80">
              <div className="flex items-center gap-3 text-amber-500">
                 <Fingerprint size={18} className="animate-pulse" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Tactile Profile</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] text-white/40">
                  <span>DISPLACEMENT</span>
                  <span className="text-white font-mono">{(material.config.displacementScale * 10).toFixed(1)}Hk</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-white/40">
                  <span>REFLECTIVITY</span>
                  <span className="text-white font-mono">{((1 - material.config.roughness) * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-white/40">
                  <span>THERMAL_CONDUCT</span>
                  <span className="text-white font-mono">{material.emotion === 'cold' ? 'HIGH' : 'LOW'}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <button 
                onClick={() => setCurrentIdx(prev => (prev - 1 + MATERIAL_LIBRARY.length) % MATERIAL_LIBRARY.length)}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white hover:bg-white/10 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {MATERIAL_LIBRARY.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${currentIdx === i ? 'bg-amber-500 w-8 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-white/10'}`} 
                  />
                ))}
              </div>
              <button 
                onClick={() => setCurrentIdx(prev => (prev + 1) % MATERIAL_LIBRARY.length)}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white hover:bg-white/10 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Effects */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_400px_rgba(0,0,0,0.9)]" />
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      <div className="absolute bottom-400 left-1/2 -translate-x-1/2 z-20 text-[10px] font-mono text-white/10 tracking-[1em] uppercase">
        Observed Haptic Surface // Static Memory Reconstruction
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

export default HapticMemory;
