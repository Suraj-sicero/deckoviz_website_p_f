
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { 
  Compass, Clock, Sun, Moon, MapPin, 
  Activity, Zap, Info, Layers, Scan,
  Navigation, Wind, Thermometer, Maximize2
} from "lucide-react";
import { getSolarElevation, kelvinToRGB } from "./solarCalc";
import { useNavigate } from 'react-router-dom';

// --- Shader ---

const skyVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const skyFragmentShader = `
  uniform vec3 uBaseColor;
  uniform float uElevation;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

  void main() {
    vec3 col = uBaseColor;
    vec3 pos = normalize(vPosition);
    
    // 1. Vertical Gradient
    float topShift = smoothstep(-0.2, 0.8, pos.y);
    vec3 skyCol = mix(col * 0.4, col, topShift);
    
    // 2. Atmospheric Scattering (Horizon Haze)
    float horizon = 1.0 - smoothstep(-0.1, 0.4, pos.y);
    vec3 hazeCol = mix(skyCol, vec3(1.0, 0.8, 0.6), horizon * 0.4);
    
    // 3. Night Stars
    float nightMask = 1.0 - smoothstep(-10.0, 5.0, uElevation);
    float starNoise = hash(vUv * 1000.0);
    if (starNoise > 0.998) {
        skyCol += vec3(1.0) * nightMask * (1.0 - horizon);
    }

    col = mix(skyCol, hazeCol, horizon * 0.5);
    
    // 4. Night Fade (Total Darkness)
    float darkMask = smoothstep(-20.0, -5.0, uElevation);
    col = mix(vec3(0.01, 0.01, 0.02), col, darkMask);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const sunVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const sunFragmentShader = `
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float dist = distance(vUv, vec2(0.5));
    float glow = smoothstep(0.5, 0.2, dist);
    if (glow < 0.1) discard;
    gl_FragColor = vec4(uColor, glow);
  }
`;

// --- Component ---

const SkyChronometer: React.FC = () => {
    const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loc, setLoc] = useState({ lat: 40.7128, lng: -74.0060 }); // Default NYC
  const [elevation, setElevation] = useState(0);
  const [kelvin, setKelvin] = useState(6500);
  const [isLive, setIsLive] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Three.js Refs
  const uniformsRef = useRef<Record<string, THREE.IUniform> | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLive(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Post-Processing ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.0, 0.4, 0.85
    );
    composer.addPass(bloomPass);

    // --- Sky Dome ---
    const skyGeo = new THREE.SphereGeometry(1000, 64, 32);
    const uniforms = {
      uBaseColor: { value: new THREE.Color(1, 1, 1) },
      uElevation: { value: 0 },
      uTime: { value: 0 },
    };
    uniformsRef.current = uniforms;

    const skyMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: skyFragmentShader,
      uniforms,
      side: THREE.BackSide
    });
    scene.add(new THREE.Mesh(skyGeo, skyMat));

    // --- Sun ---
    const sunGeo = new THREE.CircleGeometry(40, 32);
    const sunMat = new THREE.ShaderMaterial({
      vertexShader: sunVertexShader,
      fragmentShader: sunFragmentShader,
      uniforms: { uColor: { value: new THREE.Color(1, 1, 1) } },
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // Update Loop
    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      const t = time * 0.001;

      const el = getSolarElevation(loc.lat, loc.lng);
      setElevation(el);

      // Elevation to Kelvin
      let k = 6500;
      if (el < -18) k = 1000;
      else if (el < 0) k = 1000 + (el + 18) * (1500 / 18);
      else if (el < 60) k = 2500 + (el / 60) * 4500;
      else k = 7000;
      setKelvin(k);

      const rgb = kelvinToRGB(k);
      uniforms.uBaseColor.value.setRGB(rgb[0], rgb[1], rgb[2]);
      uniforms.uElevation.value = el;
      uniforms.uTime.value = t;

      // Position Sun
      const rad = el * (Math.PI / 180);
      sun.position.set(0, Math.sin(rad) * 800, -Math.cos(rad) * 800);
      sun.lookAt(0, 0, 0);
      sunMat.uniforms.uColor.value.setRGB(rgb[0], rgb[1], rgb[2]).multiplyScalar(2.0);
      
      // Hide sun at night
      sun.visible = el > -5.0;

      // Camera Parallax
      camera.rotation.y = Math.sin(t * 0.1) * 0.05;
      camera.rotation.x = Math.cos(t * 0.1) * 0.02;

      composer.render();
    };
    animate(0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      composer.dispose();
    };
  }, [loc]);

  return (
    <div className="relative w-full h-screen bg-[#020205] overflow-hidden selection:bg-cyan-500/30">
      <canvas ref={canvasRef} className="block w-full h-full" />

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
              <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 flex items-center justify-center backdrop-blur-xl">
                 <Scan className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-t-2 border-cyan-400 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Sky Chronometer</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                <p className="text-[10px] text-cyan-400/60 uppercase tracking-[0.6em]">Celestial Tracking System // Active</p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col items-end gap-4">
             <div className="flex items-center gap-6 text-white/40">
                <button 
                  onClick={toggleFullscreen}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all pointer-events-auto"
                >
                  <Maximize2 size={14} />
                </button>
                <div className="flex items-center gap-2">
                   <Clock size={14} />
                   <span className="text-xl font-light text-white/80">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                   </span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col text-right">
                   <span className="text-[9px] uppercase font-bold tracking-widest">Chronos Mode</span>
                   <span className="text-xs text-cyan-400 font-bold">{isLive ? "GEOSYNC_LIVE" : "STATIC_RECOVERY"}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Solar Telemetry */}
        <div className="flex justify-between items-end">
          {/* Left Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 w-96 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 text-cyan-400">
              <Sun size={80} className="animate-spin-slow" />
            </div>
            
            <div className="flex items-center gap-3 text-cyan-400 border-b border-white/10 pb-4">
               <Layers size={18} className="animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Atmospheric Telemetry</span>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[9px] text-white/40 uppercase tracking-widest font-bold">
                  <Thermometer size={12} className="text-orange-500" />
                  Solar Temp
                </div>
                <div className="text-2xl font-black text-white">
                  {kelvin > 1000 ? `${Math.round(kelvin)} K` : "NOX"}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[9px] text-white/40 uppercase tracking-widest font-bold">
                  <Navigation size={12} className="text-blue-400" />
                  Elevation
                </div>
                <div className="text-2xl font-black text-white">{elevation.toFixed(2)}°</div>
              </div>
              <div className="col-span-2 space-y-2 pt-2">
                <div className="flex items-center gap-2 text-[9px] text-white/40 uppercase tracking-widest font-bold">
                  <MapPin size={12} className="text-cyan-400" />
                  Coordinates
                </div>
                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-cyan-100/80 uppercase tracking-wider">
                   {loc.lat.toFixed(4)}°N / {loc.lng.toFixed(4)}°W
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Status */}
          <div className="flex flex-col gap-6 items-end">
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl flex gap-12 w-[24rem] relative overflow-hidden">
               <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Zap size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Spectral Integrity</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: elevation > 0 ? "100%" : "20%" }} 
                      className={`h-full shadow-[0_0_10px_rgba(6,182,212,0.5)] ${elevation > 0 ? "bg-cyan-400" : "bg-orange-500"}`} 
                    />
                  </div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">
                     {elevation > 0 ? "Diurnal Phase Active" : "Nocturnal Recovery"}
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Effects */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen" />
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    
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

export default SkyChronometer;
