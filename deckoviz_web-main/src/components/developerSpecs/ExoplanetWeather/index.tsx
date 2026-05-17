"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { motion, AnimatePresence } from "framer-motion";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { 
  Wind, Thermometer, Droplets, Zap, 
  RefreshCw, Info, Scan, Maximize2, 
  ArrowLeft, Compass, Globe
} from "lucide-react";
import { EXOPLANETS, Exoplanet } from "./exoplanetData";

const ExoplanetWeather: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activePlanet, setActivePlanet] = useState<Exoplanet>(EXOPLANETS[0]);
  const [isLive, setIsLive] = useState(true);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#020205");

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 5, 20);

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8, 0.4, 0.85
    );
    composer.addPass(bloomPass);

    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // --- Planet & Atmosphere ---
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    // Host Star Light
    const starColor = activePlanet.starType === 'M' ? "#ff5500" : activePlanet.starType === 'B' ? "#55aaff" : "#ffffff";
    const light = new THREE.PointLight(starColor, 20, 100);
    light.position.set(20, 20, 20);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));

    // Planet Surface
    const surfaceGeo = new THREE.SphereGeometry(5, 64, 64);
    let surfaceMat: THREE.Material;

    if (activePlanet.surface === 'lava') {
      surfaceMat = new THREE.MeshStandardMaterial({ 
        color: "#220000", 
        emissive: "#ff2200", 
        emissiveIntensity: 0.5,
        roughness: 0.8,
        metalness: 0.2
      });
    } else if (activePlanet.surface === 'ocean') {
      surfaceMat = new THREE.MeshStandardMaterial({ 
        color: "#001133", 
        roughness: 0.1,
        metalness: 0.5
      });
    } else {
      surfaceMat = new THREE.MeshStandardMaterial({ 
        color: activePlanet.surface === 'gas' ? "#aa8866" : "#444444", 
        roughness: 0.9,
        metalness: 0.1
      });
    }

    const planet = new THREE.Mesh(surfaceGeo, surfaceMat);
    planetGroup.add(planet);

    // Atmosphere
    const atmoGeo = new THREE.SphereGeometry(5.2, 64, 64);
    const atmoMat = new THREE.MeshStandardMaterial({
      color: starColor,
      transparent: true,
      opacity: activePlanet.atmosphereThickness * 0.3,
      side: THREE.BackSide
    });
    const atmo = new THREE.Mesh(atmoGeo, atmoMat);
    planetGroup.add(atmo);

    // --- Particles (Weather) ---
    const partCount = 5000;
    const partGeo = new THREE.BufferGeometry();
    const partPos = new Float32Array(partCount * 3);
    const partVel = new Float32Array(partCount);

    for(let i=0; i<partCount; i++) {
      partPos[i*3] = (Math.random() - 0.5) * 30;
      partPos[i*3+1] = Math.random() * 30;
      partPos[i*3+2] = (Math.random() - 0.5) * 30;
      partVel[i] = 0.1 + Math.random() * 0.2;
    }

    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    const partMat = new THREE.PointsMaterial({
      color: activePlanet.precipitation === 'iron' ? "#ffaa00" : "#ffffff",
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // --- Animation ---
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();

      if (isLive) {
        const positions = partGeo.attributes.position.array as Float32Array;
        for(let i=0; i<partCount; i++) {
          positions[i*3+1] -= partVel[i] * (activePlanet.windSpeed / 1000);
          if (positions[i*3+1] < -15) positions[i*3+1] = 15;
        }
        partGeo.attributes.position.needsUpdate = true;
      }

      composer.render();
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activePlanet, isLive]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020205] overflow-hidden selection:bg-cyan-500/30">
      <canvas ref={canvasRef} className="block w-full h-full z-0" />

      {/* Cinematic HUD Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none p-12 pb-40 flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="flex justify-between items-start">
          <motion.div 
            key={activePlanet.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 flex items-center justify-center backdrop-blur-xl">
                 <Globe className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-t-2 border-cyan-400 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">{activePlanet.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                <p className="text-[10px] text-cyan-400/60 uppercase tracking-[0.6em]">Atmospheric Telemetry // Deep Space</p>
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

        {/* Bottom Data HUD */}
        <div className="flex justify-between items-end">
          {/* Left Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 w-96 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Scan size={80} />
            </div>
            
            <div className="flex items-center gap-3 text-cyan-400 border-b border-white/10 pb-4">
               <Compass size={18} className="animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Planetary Specs</span>
            </div>
            
            <div className="space-y-5">
              {[
                { label: "Surface Temp", val: `${activePlanet.temp}K`, icon: <Thermometer size={12} /> },
                { label: "Wind Velocity", val: `${activePlanet.windSpeed} km/h`, icon: <Wind size={12} /> },
                { label: "Atmosphere", val: activePlanet.composition.toUpperCase(), icon: <Droplets size={12} /> },
                { label: "Precipitation", val: activePlanet.precipitation.toUpperCase(), icon: <Zap size={12} /> }
              ].map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-2 text-white/40">
                      {m.icon}
                      <span>{m.label}</span>
                    </div>
                    <span className="text-white">{m.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Selector */}
          <div className="flex flex-col gap-4 pointer-events-auto items-end">
            <span className="text-[10px] text-white/20 uppercase font-black tracking-[0.5em] mb-2 mr-4">System Switcher</span>
            <div className="flex gap-2 p-2 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10">
              {EXOPLANETS.map(p => (
                <button
                  key={p.name}
                  onClick={() => setActivePlanet(p)}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activePlanet.name === p.name 
                    ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {p.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Screen Effects */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
};

export default ExoplanetWeather;
