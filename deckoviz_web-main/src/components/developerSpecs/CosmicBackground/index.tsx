
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Layers, Volume2 } from "lucide-react";

// --- Shaders ---

const cmbVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const cmbFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform bool uShowMask;
  uniform bool uShowColdSpot;
  
  // High-performance procedural CMB noise (mimicking SMICA)
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
  }
  
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    for (int i = 0; i < 8; ++i) {
      v += a * noise(p);
      p = p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Spherical mapping for noise
    float phi = atan(vPosition.z, vPosition.x);
    float theta = acos(vPosition.y / length(vPosition));
    vec2 polar = vec2(phi, theta);
    
    float n = fbm(polar * 4.0);
    
    // Planck False-Color Palette
    // Blue (cold) -> Black (avg) -> Red (hot)
    vec3 cold = vec3(0.1, 0.2, 0.5);
    vec3 avg = vec3(0.01, 0.01, 0.02);
    vec3 hot = vec3(0.8, 0.4, 0.2);
    
    vec3 color;
    if (n < 0.5) {
      color = mix(cold, avg, n * 2.0);
    } else {
      color = mix(avg, hot, (n - 0.5) * 2.0);
    }

    // Galactic Plane Mask Overlay
    if (uShowMask) {
      float galactic = smoothstep(0.1, 0.05, abs(vUv.y - 0.5));
      color = mix(color, vec3(0.0), galactic * 0.7);
    }

    // Cold Spot Highlight
    if (uShowColdSpot) {
      float dist = distance(vUv, vec2(0.6, 0.3));
      if (dist < 0.02) color = mix(color, vec3(0.0, 1.0, 1.0), 0.5);
    }

    // Subtle grain
    float grain = hash(vUv + uTime) * 0.05;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;

// --- Component ---

const CosmicBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showOverlays, setShowOverlays] = useState(false);
  const [showColdSpot, setShowColdSpot] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [coords, setCoords] = useState<{ ra: string, dec: string, temp: string } | null>(null);

  // Three.js Refs
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const uniformsRef = useRef<Record<string, THREE.IUniform> | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 0.01;
    controls.maxDistance = 0.5;
    controls.rotateSpeed = -0.25; // Invert rotation for "inside-out" feel
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // --- Sphere Geometry ---
    const geometry = new THREE.SphereGeometry(10, 64, 64);
    const uniforms = {
      uTime: { value: 0 },
      uShowMask: { value: false },
      uShowColdSpot: { value: false },
    };
    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      vertexShader: cmbVertexShader,
      fragmentShader: cmbFragmentShader,
      uniforms,
      side: THREE.BackSide,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Animation Loop
    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      
      // Extremely slow mechanical drift
      sphere.rotation.y += 0.0003;
      sphere.rotation.x += 0.0001;
      
      uniforms.uTime.value = time * 0.001;
      controls.update();
      renderer.render(scene, camera);
    };
    animate(0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.uShowMask.value = showOverlays;
      uniformsRef.current.uShowColdSpot.value = showColdSpot;
    }
  }, [showOverlays, showColdSpot]);

  const handleLongPress = () => {
    // Generate dummy celestial coordinates
    const ra = (Math.random() * 24).toFixed(2);
    const dec = (Math.random() * 180 - 90).toFixed(2);
    const temp = (Math.random() * 400 - 200).toFixed(1);
    setCoords({ ra, dec, temp });
    setTimeout(() => setCoords(null), 3000);
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-black overflow-hidden cursor-crosshair select-none"
      onMouseDown={() => {
        const timer = setTimeout(() => handleLongPress(), 800);
        const clear = () => { clearTimeout(timer); window.removeEventListener('mouseup', clear); };
        window.addEventListener('mouseup', clear);
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Atmospheric HUD */}
      <div className="absolute top-10 left-10 z-40 pointer-events-none">
        <h1 className="text-xl font-light text-white/40 tracking-[0.5em] uppercase">
          Planck SMICA Observer
        </h1>
        <p className="text-[10px] text-white/20 mt-2 font-mono tracking-widest">
          380,000 YEARS POST-SINGULARITY / 2.725 K
        </p>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-400 left-1/2 -translate-x-1/2 z-40 flex items-center space-x-6 p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
        <button 
          onClick={() => setShowOverlays(!showOverlays)}
          className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all ${showOverlays ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
        >
          <Layers size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Galactic Plane</span>
        </button>
        <button 
          onClick={() => setShowColdSpot(!showColdSpot)}
          className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all ${showColdSpot ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
        >
          <Compass size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Cold Spot</span>
        </button>
        <div className="w-px h-4 bg-white/10" />
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 text-white/40 hover:text-white"
        >
          {isMuted ? <Volume2 className="opacity-30" size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* Telemetry Display */}
      <AnimatePresence>
        {coords && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center pointer-events-none"
          >
            <div className="font-mono text-[10px] text-cyan-400/80 space-y-1 bg-black/40 p-4 rounded-xl backdrop-blur-md border border-cyan-400/20">
              <p>R.A. {coords.ra}H / DEC. {coords.dec}°</p>
              <p>ΔT: {coords.temp} μK</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aesthetic Grain Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-soft-light bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
      
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />

      {/* Interaction Instruction */}
      <div className="absolute bottom-400 right-10 text-[9px] text-white/20 uppercase tracking-[0.2em] font-light">
        Drag to navigate / Long press to probe temperature
      </div>
    </div>
  );
};

export default CosmicBackground;
