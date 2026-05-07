"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CloudRain, CloudSnow, Wind, CloudLightning, 
  Download, Thermometer, CloudFog, Settings, 
  X, Maximize2, RefreshCw, Zap, Droplets, Wind as WindIcon, Gauge
} from "lucide-react";

const WEATHER_MODES = [
  { 
    id: "rain", 
    name: "Torrential Rain", 
    icon: <CloudRain />, 
    color: "#60a5fa", 
    bg: "#082f49", 
    desc: "High-intensity precipitation with atmospheric scattering.",
    stats: { temp: "14°C", pressure: "998 hPa", humidity: "92%" }
  },
  { 
    id: "snow", 
    name: "Arctic Blizzard", 
    icon: <CloudSnow />, 
    color: "#ffffff", 
    bg: "#0f172a", 
    desc: "Crystalline particle simulation in sub-zero conditions.",
    stats: { temp: "-12°C", pressure: "1012 hPa", humidity: "45%" }
  },
  { 
    id: "sand", 
    name: "Windy Sand", 
    icon: <Wind />, 
    color: "#fbbf24", 
    bg: "#451a03", 
    desc: "Aeolian transport of particulate matter in arid environments.",
    stats: { temp: "38°C", pressure: "1005 hPa", humidity: "12%" }
  },
  { 
    id: "storm", 
    name: "Supercell Storm", 
    icon: <CloudLightning />, 
    color: "#a78bfa", 
    bg: "#1e1b4b", 
    desc: "Electromagnetic discharge within a high-energy cell.",
    stats: { temp: "22°C", pressure: "985 hPa", humidity: "98%" }
  },
  { 
    id: "fog", 
    name: "Foggy Mist", 
    icon: <CloudFog />, 
    color: "#94a3b8", 
    bg: "#0f172a", 
    desc: "Low-level stratus cloud formation with zero visibility.",
    stats: { temp: "8°C", pressure: "1025 hPa", humidity: "100%" }
  },
];

const WeatherSimulations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentMode, setCurrentMode] = useState(WEATHER_MODES[0]);
  const [intensity, setIntensity] = useState(0.6);
  const [wind, setWind] = useState(0.3);
  const [showUI, setShowUI] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

  // Refs for animation loop access
  const stateRef = useRef({ currentMode, intensity, wind });
  useEffect(() => {
    stateRef.current = { currentMode, intensity, wind };
  }, [currentMode, intensity, wind]);

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
    if (!canvasRef.current) return;

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Post-Processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5, 0.4, 0.85
    );
    composer.addPass(bloomPass);

    // --- WEATHER OBJECTS ---
    
    // 2. Particle System with Custom Shader
    const particleCount = 8000; // Reduced for performance
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const randoms = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      velocities[i] = Math.random() * 0.5 + 0.5;
      randoms[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));
    geometry.setAttribute('random', new THREE.BufferAttribute(randoms, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(currentMode.color) },
        uIntensity: { value: intensity },
        uMode: { value: 0 }, // 0: Rain, 1: Snow, 2: Sand, 3: Storm
        uWind: { value: wind },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uIntensity;
        uniform float uWind;
        uniform float uMode;
        attribute float velocity;
        attribute float random;
        varying float vAlpha;

        void main() {
          vec3 pos = position;
          float speed = velocity * (0.5 + uIntensity);
          
          // Movement logic
          if (uMode == 0.0 || uMode == 3.0) { // Rain/Storm
            pos.y -= mod(uTime * 20.0 * speed + random * 40.0, 40.0);
            pos.x += uWind * 5.0;
          } else if (uMode == 1.0) { // Snow
            pos.y -= mod(uTime * 1.5 * speed + random * 40.0, 40.0);
            pos.x += sin(uTime + random * 10.0) * 0.5 + uWind * 2.0;
          } else { // Sand
            pos.x += mod(uTime * 15.0 * speed + random * 40.0, 40.0) - 20.0;
            pos.y += sin(uTime * 2.0 + random * 10.0) * 0.2;
            pos.x += uWind * 10.0;
          }

          // Wrap around logic in shader for performance
          pos = mod(pos + 20.0, 40.0) - 20.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // Size based on mode (Rain is long streaks, Snow is soft dots)
          float size = 1.5;
          if (uMode == 0.0 || uMode == 3.0) size = 3.0;
          if (uMode == 1.0) size = 4.0; // Reduced from 6.0
          
          gl_PointSize = size * (300.0 / -mvPosition.z) * (0.4 + uIntensity * 0.6);
          gl_Position = projectionMatrix * mvPosition;
          
          // Fade based on distance and life
          vAlpha = smoothstep(-20.0, -2.0, mvPosition.z) * 0.5;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uMode;
        varying float vAlpha;

        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.0;
          
          if (uMode == 0.0 || uMode == 3.0) { // Rain streaks
            strength = 1.0 - smoothstep(0.0, 0.15, abs(gl_PointCoord.x - 0.5));
            strength *= 1.0 - smoothstep(0.0, 0.5, abs(gl_PointCoord.y - 0.5));
          } else { // Circular particles
            strength = 0.04 / d;
            strength = pow(strength, 1.2); // Sharper falloff for snow
          }
          
          gl_FragColor = vec4(uColor, strength * vAlpha);
        }
      `
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Lightning Flash
    const flashLight = new THREE.PointLight(0xffffff, 0, 100);
    flashLight.position.set(0, 10, 0);
    scene.add(flashLight);

    // --- ANIMATION LOOP ---
    let flashTimer = 0;
    const animate = (time: number) => {
      const { currentMode: mode, intensity: inst, wind: wnd } = stateRef.current;

      // Update Uniforms
      material.uniforms.uTime.value = time * 0.001;
      material.uniforms.uIntensity.value = inst;
      material.uniforms.uWind.value = wnd;
      material.uniforms.uColor.value.lerp(new THREE.Color(mode.color), 0.05);
      
      const modeIdx = WEATHER_MODES.findIndex(m => m.id === mode.id);
      material.uniforms.uMode.value = modeIdx;

      // Adjusted Fog Density for readability
      const fogDensity = mode.id === 'fog' ? 0.2 : (mode.id === 'snow' ? 0.08 : 0.03 + inst * 0.07);
      scene.fog = new THREE.FogExp2(mode.bg, fogDensity);
      renderer.setClearColor(mode.bg);

      // Lightning Logic
      if (mode.id === 'storm') {
        if (Math.random() > 0.993) {
          flashLight.intensity = 50 + Math.random() * 50;
          flashTimer = 10;
        }
        if (flashTimer > 0) {
          flashTimer--;
          flashLight.intensity *= 0.8;
        } else {
          flashLight.intensity = 0;
        }
      } else {
        flashLight.intensity = 0;
      }

      // Reduced camera motion to prevent motion sickness during lag
      camera.position.x = Math.sin(Date.now() * 0.0003) * 0.3;
      camera.position.y = Math.cos(Date.now() * 0.0003) * 0.3;
      camera.lookAt(0, 0, 0);

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
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [currentMode.id]); // Re-init core if mode changes drastically

  const handleExport = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `weather-${currentMode.id}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden font-mono selection:bg-white/20">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Cinematic HUD Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none p-12 pb-32 flex flex-col justify-between">
        
        {/* Top Section: System Status */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1 pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <h1 className="text-2xl font-black text-white tracking-[0.2em] uppercase transition-all duration-500 drop-shadow-lg" style={{ color: currentMode.color }}>Weather Simulations</h1>
            </div>
            <p className="text-[10px] text-white/50 uppercase tracking-[0.4em] pl-5 drop-shadow-md">Atmospheric Research Unit v9.2 // {currentMode.name}</p>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             {/* Mode Selector Mini Hub */}
             <div className="p-1.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-3xl flex gap-1 shadow-2xl">
                {WEATHER_MODES.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setCurrentMode(mode)}
                    className={`p-3 rounded-xl transition-all duration-300 ${currentMode.id === mode.id ? 'bg-white/20 text-white shadow-lg' : 'text-white/30 hover:text-white/60 hover:bg-white/5'}`}
                    title={mode.name}
                  >
                    {React.cloneElement(mode.icon as React.ReactElement, { size: 18 })}
                  </button>
                ))}
             </div>

            <button 
              onClick={toggleFullscreen}
              className="p-4 rounded-2xl bg-black/60 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-3xl shadow-2xl"
            >
              <Maximize2 size={20} />
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="p-4 rounded-2xl bg-black/60 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-3xl shadow-2xl"
            >
              <RefreshCw size={20} />
            </button>
            <button 
              onClick={() => window.history.back()}
              className="p-4 rounded-2xl bg-black/60 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-3xl shadow-2xl group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Center: Info Card */}
        <AnimatePresence>
          {showInfo && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              className="self-center p-8 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-3xl max-w-sm pointer-events-auto relative overflow-hidden group shadow-2xl"
            >
               <div className="absolute top-0 left-0 w-full h-1 opacity-70" style={{ backgroundColor: currentMode.color }} />
              <button onClick={() => setShowInfo(false)} className="absolute top-4 right-4 text-white/20 hover:text-white">
                <X size={14} />
              </button>
              <div className="flex items-center gap-3 text-white/60 mb-4">
                <Gauge size={16} className="text-sky-400" />
                <span className="text-xs font-bold uppercase tracking-widest">Environment Analytics</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{currentMode.name}</h3>
              <p className="text-sm text-white/60 leading-relaxed font-serif italic mb-6">"{currentMode.desc}"</p>
              
              <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-white/30 uppercase font-bold">Temp</span>
                  <p className="text-white text-xs font-mono">{currentMode.stats.temp}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-white/30 uppercase font-bold">Pressure</span>
                  <p className="text-white text-xs font-mono">{currentMode.stats.pressure}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-white/30 uppercase font-bold">Humidity</span>
                  <p className="text-white text-xs font-mono">{currentMode.stats.humidity}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Section: Telemetry & Controls */}
        <div className="flex justify-between items-end pointer-events-auto">
          {/* Controls Panel */}
          <div className="p-8 rounded-[2.5rem] bg-black/60 border border-white/10 backdrop-blur-3xl space-y-8 w-96 shadow-2xl">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Settings size={16} className="text-white/40" />
                  <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Simulation Parameters</span>
               </div>
               <button onClick={handleExport} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all">
                  <Download size={16} />
               </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Droplets size={12} className="text-sky-400" />
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Precipitation Density</span>
                  </div>
                  <span className="text-xs font-mono text-white">{Math.round(intensity * 100)}%</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.01" 
                  value={intensity}
                  onChange={(e) => setIntensity(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <WindIcon size={12} className="text-emerald-400" />
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Wind Velocity (km/h)</span>
                  </div>
                  <span className="text-xs font-mono text-white">{Math.round(wind * 120)} km/h</span>
                </div>
                <input 
                  type="range" min="-1" max="1" step="0.01" 
                  value={wind}
                  onChange={(e) => setWind(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-white/20 font-bold uppercase tracking-widest">
              <span>Status: Optimal</span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                    className="w-1 h-1 rounded-full bg-sky-500"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Large Telemetry Display */}
          <div className="text-right space-y-4">
            <div className="space-y-1">
              <span className="text-xs text-white/30 uppercase font-bold tracking-[0.4em]">Atmospheric Turbulence</span>
              <div className="text-8xl font-black text-white tracking-tighter tabular-nums flex items-end justify-end">
                {Math.abs(Math.round(wind * intensity * 100))}
                <span className="text-2xl ml-2 mb-3 text-white/20 uppercase tracking-normal font-bold">Grade</span>
              </div>
            </div>
            
            <div className="flex justify-end gap-12 items-center">
               <div className="flex flex-col">
                  <span className="text-[10px] text-white/20 uppercase font-bold">Visibility</span>
                  <span className="text-white text-lg font-mono tracking-tighter">{((1 - (currentMode.id === 'fog' ? 0.9 : intensity * 0.5)) * 10).toFixed(1)} km</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] text-white/20 uppercase font-bold">Scatter (λ)</span>
                  <span className="text-white text-lg font-mono tracking-tighter">{(intensity * 4.2).toFixed(2)}</span>
               </div>
               <div className="h-10 w-px bg-white/10" />
               <div className="flex flex-col">
                  <span className="text-[10px] text-white/20 uppercase font-bold">Stochastic Flow</span>
                  <span className="text-white text-lg font-mono tracking-tighter">Active</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 text-[10px] font-mono text-white/10 tracking-[1.5em] uppercase whitespace-nowrap">
        Atmospheric Simulation Matrix // Real-time Telemetry
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          border: 2px solid black;
        }
      `}} />
    </div>
  );
};

export default WeatherSimulations;
