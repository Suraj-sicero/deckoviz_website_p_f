
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Flame, BookOpen, Volume2 } from "lucide-react";
import { FIRE_STORIES } from "./fireStories";
import { useNavigate } from 'react-router-dom';

// --- Shaders ---

const fireVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fireFragmentShader = `
  uniform float uTime;
  uniform vec2 uRes;
  uniform sampler2D uTextTexture;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
  }

  void main() {
    vec2 uv = vUv;
    
    // Upward heat propagation
    float heat = 0.0;
    vec2 noiseUv = uv * 3.0;
    noiseUv.y -= uTime * 0.8; // Upward velocity
    
    heat += noise(noiseUv) * 0.5;
    heat += noise(noiseUv * 2.0 + uTime * 0.2) * 0.25;
    heat += noise(noiseUv * 4.0 - uTime * 0.1) * 0.125;
    
    // Fire shape (tapering column)
    float mask = smoothstep(0.4, 0.5, uv.x) * smoothstep(0.6, 0.5, uv.x);
    mask *= (1.0 - uv.y); // Fade at top
    heat *= mask;

    // Text integration
    float text = texture2D(uTextTexture, uv).r;
    
    // Fire Colors
    vec3 red = vec3(0.5, 0.05, 0.0);
    vec3 orange = vec3(0.9, 0.4, 0.1);
    vec3 white = vec3(1.0, 0.9, 0.5);
    
    vec3 color;
    if (heat < 0.3) color = mix(vec3(0.0), red, heat * 3.33);
    else if (heat < 0.7) color = mix(red, orange, (heat - 0.3) * 2.5);
    else color = mix(orange, white, (heat - 0.7) * 3.33);

    // Make text glow in the heat
    if (text > 0.1) {
        color = mix(color, white, text * (0.5 + 0.5 * sin(uTime * 5.0)));
        color += white * 0.2 * text;
    }

    gl_FragColor = vec4(color, clamp(heat * 1.5 + text, 0.0, 1.0));
  }
`;

// --- Component ---

const OralHistoryFire: React.FC = () => {
    const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const activeFragmentsRef = useRef<{ id: string, text: string, y: number, opacity: number }[]>([]);
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Three.js Refs
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const uniformsRef = useRef<Record<string, THREE.IUniform> | null>(null);
  const textTextureRef = useRef<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Create Text Canvas Texture
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 1024;
    textCanvas.height = 1024;
    textCanvasRef.current = textCanvas;
    const textTexture = new THREE.CanvasTexture(textCanvas);
    textTextureRef.current = textTexture;

    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTextTexture: { value: textTexture },
    };
    uniformsRef.current = uniforms;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: fireVertexShader,
      fragmentShader: fireFragmentShader,
      uniforms,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Story Management
    let lastSpawn = 0;
    const updateText = (time: number) => {
      const ctx = textCanvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, 1024, 1024);
      ctx.fillStyle = 'white';
      ctx.font = '32px serif';
      ctx.textAlign = 'center';

      const prev = activeFragmentsRef.current;
      const next = prev.map(f => ({ ...f, y: f.y - 1.5, opacity: f.opacity - 0.002 }))
                      .filter(f => f.y > -100 && f.opacity > 0);
      
      // Spawn new
      if (time - lastSpawn > 4000 && next.length < 3) {
          const story = FIRE_STORIES[Math.floor(Math.random() * FIRE_STORIES.length)];
          next.push({ id: Math.random().toString(), text: story.text, y: 800, opacity: 1 });
          lastSpawn = time;
      }

      // Draw to texture
      next.forEach(f => {
          ctx.globalAlpha = f.opacity;
          ctx.fillText(f.text, 512, f.y);
      });

      activeFragmentsRef.current = next;

      textTexture.needsUpdate = true;
    };

    // Animation Loop
    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      updateText(time);
      uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
    };
    animate(0);

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      textTexture.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050000] overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Atmospheric HUD */}
      <div className="absolute top-10 left-10 z-40 pointer-events-none">
        <h1 className="text-xl font-light text-red-500/40 tracking-[0.6em] uppercase">
          Oral History Fire
        </h1>
        <div className="flex items-center space-x-3 mt-2">
           <Flame size={12} className="text-orange-500/50 animate-pulse" />
           <span className="text-[10px] text-white/10 font-mono tracking-widest uppercase">
             Transmitting Cultural Legacy
           </span>
        </div>
      </div>

      {/* Control Layer */}
      <div className="absolute bottom-400 left-1/2 -translate-x-1/2 z-40 flex items-center space-x-6 p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
        <button 
          onClick={() => setIsAudioActive(!isAudioActive)}
          className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all ${isAudioActive ? 'bg-orange-500 text-white' : 'text-white/40 hover:text-white'}`}
        >
          <Volume2 size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Atmosphere</span>
        </button>
        <div className="w-px h-4 bg-white/10" />
        <div className="flex items-center space-x-2 px-4 text-white/20 text-[9px] uppercase tracking-widest font-mono">
            <BookOpen size={14} />
            <span>Archive Active</span>
        </div>
      </div>

      {/* Narrative Legend */}
      <div className="absolute bottom-400 right-10 z-40 text-[9px] text-white/10 uppercase tracking-[0.3em] text-right leading-relaxed italic max-w-xs">
        "Voices from the past, etched in flame, rising as smoke."
      </div>

      {/* Screen Effects */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(150,50,0,0.1)_0%,transparent_70%)]" />
    
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

export default OralHistoryFire;
