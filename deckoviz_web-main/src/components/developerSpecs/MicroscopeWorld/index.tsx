"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

const MATERIALS = [
  { id: 0, name: "Biological Tissue", color: "#e88" },
  { id: 1, name: "Crystal Matrix", color: "#8be" },
  { id: 2, name: "Pollen Grain", color: "#eb4" },
  { id: 3, name: "Metal Alloy", color: "#999" },
  { id: 4, name: "Ocean Water", color: "#48b" },
];

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uZoom;
  uniform int uMaterial;
  uniform vec2 uResolution;

  varying vec2 vUv;

  // --- Noise Functions ---
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                   dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
               mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                   dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  }

  float voronoi(vec2 p) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float md = 8.0;
    for (int j = -1; j <= 1; j++) {
      for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 o = hash(n + g);
        o = 0.5 + 0.5 * sin(uTime * 0.2 + 6.2831 * o);
        vec2 r = g + o - f;
        float d = dot(r, r);
        if (d < md) md = d;
      }
    }
    return sqrt(md);
  }

  void main() {
    vec2 uv = (vUv - 0.5) * (uResolution / min(uResolution.x, uResolution.y));
    
    float zoom = uZoom;
    float scale = exp(-mod(zoom, 1.0));
    
    // Layers for infinite zoom
    float val = 0.0;
    float opacity = 0.0;
    
    for(int i = 0; i < 3; i++) {
      float layerScale = pow(10.0, float(i)) * scale;
      float layerVal = 0.0;
      
      if (uMaterial == 0) { // Biological
        layerVal = 1.0 - voronoi(uv * 5.0 * layerScale);
      } else if (uMaterial == 1) { // Crystal
        layerVal = abs(noise(uv * 10.0 * layerScale));
      } else if (uMaterial == 2) { // Pollen
        layerVal = step(0.4, 1.0 - voronoi(uv * 8.0 * layerScale));
      } else if (uMaterial == 3) { // Metal
        layerVal = noise(uv * 20.0 * layerScale);
      } else { // Ocean
        layerVal = noise(uv * 6.0 * layerScale + uTime * 0.1);
      }
      
      float layerAlpha = smoothstep(0.0, 0.5, 1.0 - abs(float(i) - mod(zoom, 3.0)));
      val += layerVal * layerAlpha;
    }

    vec3 color = vec3(0.0);
    if (uMaterial == 0) color = vec3(0.9, 0.4, 0.5) * val;
    else if (uMaterial == 1) color = vec3(0.4, 0.7, 0.9) * val;
    else if (uMaterial == 2) color = vec3(0.9, 0.8, 0.2) * val;
    else if (uMaterial == 3) color = vec3(0.6, 0.6, 0.6) + val * 0.2;
    else color = vec3(0.2, 0.5, 0.8) * val;

    // Microscope Frame (Circular Vignette)
    float dist = length(vUv - 0.5);
    float mask = smoothstep(0.48, 0.45, dist);
    float vignette = smoothstep(0.5, 0.3, dist);
    
    color *= vignette;
    color = mix(vec3(0.02), color, mask);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const MicroscopeWorld: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);

  const uniforms = useRef({
    uTime: { value: 0 },
    uZoom: { value: 0 },
    uMaterial: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    const materialObj = new THREE.ShaderMaterial({
      uniforms: uniforms.current,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });
    
    const mesh = new THREE.Mesh(geometry, materialObj);
    scene.add(mesh);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.current.uResolution.value.set(width, height);
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();

    let lastTime = 0;
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        uniforms.current.uTime.value += delta * 0.001;
        uniforms.current.uZoom.value += delta * 0.0005;
        setZoomLevel(uniforms.current.uZoom.value);
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [isPaused]);

  useEffect(() => {
    uniforms.current.uMaterial.value = material.id;
  }, [material]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Lab UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none p-12 pb-40 flex flex-col justify-between">
        
        {/* Top Section */}
        <div className="flex justify-between items-start pointer-events-auto">
          <div>
            <h1 className="text-4xl font-black text-white/90 tracking-tighter uppercase">Microscope World</h1>
            <p className="text-xs text-emerald-400/60 uppercase tracking-[0.4em] mt-2">Active Scanning • Scale: 10^-{Math.floor(zoomLevel)}m</p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md"
            >
              {isPaused ? "Resume Zoom" : "Pause Motion"}
            </button>
            <button 
              onClick={() => window.history.back()}
              className="p-2 rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition-all backdrop-blur-md"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        {/* Center Grid (Targeting) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-[500px] h-[500px] border border-white/20 rounded-full relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/20" />
            <div className="absolute left-1/2 top-0 w-px h-full bg-white/20" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end pointer-events-auto">
          <div className="flex gap-2">
            {MATERIALS.map(m => (
              <button
                key={m.id}
                onClick={() => setMaterial(m)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${material.id === m.id ? 'bg-white text-black' : 'bg-white/5 border border-white/10 text-white/40 hover:bg-white/10'}`}
              >
                {m.name}
              </button>
            ))}
          </div>

          <div className="text-right">
            <div className="text-[10px] text-white/20 uppercase tracking-[0.5em] mb-2">Structure Analysis</div>
            <div className="text-2xl text-white font-mono">
              LEVEL_{Math.floor(zoomLevel % 100).toString().padStart(3, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Scratched Lens Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.05] bg-[url('/images/lens-texture.png')] mix-blend-screen" />
    </div>
  );
};

export default MicroscopeWorld;
