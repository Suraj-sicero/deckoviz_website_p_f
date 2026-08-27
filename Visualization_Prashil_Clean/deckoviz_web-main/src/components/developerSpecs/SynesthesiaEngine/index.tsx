
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Music, Hash, Volume2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// --- Constants ---
const FFT_SIZE = 512;

// --- Shaders ---

const synesthesiaVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const synesthesiaFragmentShader = `
  uniform sampler2D uAudioTexture;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uCentroid;
  uniform vec3 uBaseColor;
  varying vec2 vUv;

  // Simple noise
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    // Frequency mapping: x-axis maps to low -> high frequencies
    float audioVal = texture2D(uAudioTexture, vec2(vUv.x, 0.5)).r;
    
    // Add noise for fluid motion
    float n = noise(vUv * 3.0 + uTime * 0.2);
    float n2 = noise(vUv * 8.0 - uTime * 0.1);
    
    // Chromesthesia Color Logic
    float hue = vUv.x * 0.8 + n * 0.1 + uCentroid * 0.1;
    float saturation = 0.5 + uCentroid * 0.5;
    float brightness = audioVal * uIntensity * (0.8 + n2 * 0.4);
    
    // Vertical fade and layered structures
    float verticalFade = smoothstep(0.0, 0.5, vUv.y) * smoothstep(1.0, 0.5, vUv.y);
    float layer = abs(sin(vUv.y * 10.0 + uTime + audioVal * 5.0));
    brightness *= mix(0.5, 1.0, layer);
    
    vec3 color = hsv2rgb(vec3(hue, saturation, brightness));
    
    // Add base color for silence
    color = mix(uBaseColor, color, clamp(audioVal * 5.0, 0.0, 1.0));
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// --- Lexical Logic ---

interface FloatingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  hue: number;
  life: number;
}

// --- Main Component ---

const SynesthesiaEngine: React.FC = () => {
    const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"CHROMESTHESIA" | "LEXICAL" | "SEQUENCE">("CHROMESTHESIA");
  const [isActive, setIsActive] = useState(false);
  const [words, setWords] = useState<FloatingWord[]>([]);
  
  // Audio Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  
  // Three.js Refs
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const uniformsRef = useRef<Record<string, THREE.IUniform> | null>(null);
  const textureRef = useRef<THREE.DataTexture | null>(null);

  // Initialize Audio
  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = FFT_SIZE * 2;
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);
      
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(FFT_SIZE);
      setIsActive(true);

      if (mode === "LEXICAL") startSpeechRecognition();
    } catch (err) {
      console.error("Microphone access denied", err);
    }
  };

  // Lexical Mode: Speech Recognition
  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as unknown as { SpeechRecognition: typeof SpeechRecognition; webkitSpeechRecognition: typeof SpeechRecognition }).SpeechRecognition || 
                               (window as unknown as { SpeechRecognition: typeof SpeechRecognition; webkitSpeechRecognition: typeof SpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      const wordList = transcript.split(' ');
      const newWords = wordList.map((w: string) => ({
        id: Math.random(),
        text: w,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        hue: (w.length * 40) % 360,
        life: 5.0
      }));
      setWords(prev => [...prev, ...newWords].slice(-20));
    };

    recognition.start();
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // --- Three.js Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Audio Texture
    const audioData = new Uint8Array(FFT_SIZE);
    const texture = new THREE.DataTexture(audioData, FFT_SIZE, 1, THREE.RedFormat);
    textureRef.current = texture;

    // Shader Material
    const uniforms = {
      uAudioTexture: { value: texture },
      uTime: { value: 0 },
      uIntensity: { value: 1.0 },
      uCentroid: { value: 0.5 },
      uBaseColor: { value: new THREE.Color("#050a0a") },
    };
    uniformsRef.current = uniforms;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: synesthesiaVertexShader,
      fragmentShader: synesthesiaFragmentShader,
      uniforms
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation Loop
    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);

      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        
        // Calculate Spectral Centroid (simplified)
        let total = 0;
        let weightedSum = 0;
        for (let i = 0; i < FFT_SIZE; i++) {
          total += dataArrayRef.current[i];
          weightedSum += dataArrayRef.current[i] * i;
        }
        const centroid = total > 0 ? (weightedSum / total) / FFT_SIZE : 0.5;
        const rms = total / (FFT_SIZE * 255);

        // Update Texture
        texture.image.data.set(dataArrayRef.current);
        texture.needsUpdate = true;

        // Update Uniforms
        uniforms.uTime.value = time * 0.001;
        uniforms.uIntensity.value = 0.5 + rms * 2.0;
        uniforms.uCentroid.value = centroid;
      }

      renderer.render(scene, camera);
    };

    animate(0);

    const handleResize = () => {
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      texture.dispose();
    };
  }, []);

  // Word lifecycle
  useEffect(() => {
    const timer = setInterval(() => {
      setWords(prev => prev.map(w => ({ ...w, life: w.life - 0.1 })).filter(w => w.life > 0));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050a0a] overflow-hidden cursor-none">
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Floating Words for Lexical Mode */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <AnimatePresence>
          {words.map((w) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, scale: 0.5, blur: "10px" }}
              animate={{ opacity: w.life / 5, scale: 1, x: `${w.x}%`, y: `${w.y}%`, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
              className="absolute text-2xl font-light tracking-widest uppercase pointer-events-none"
              style={{ color: `hsl(${w.hue}, 70%, 70%)`, textShadow: `0 0 20px hsl(${w.hue}, 70%, 50%)` }}
            >
              {w.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Intro / Permission */}
      <AnimatePresence>
        {!isActive && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/90 z-50 p-6 text-center"
          >
            <div className="max-w-md">
              <h1 className="text-4xl font-light text-white mb-6 tracking-widest uppercase">Synesthesia Engine</h1>
              <p className="text-gray-400 mb-8 font-light italic leading-relaxed">
                Connect your perception. Translate sound into continuous color landscapes across spatial dimensions.
              </p>
              <button
                onClick={startAudio}
                className="group flex items-center space-x-3 px-8 py-4 rounded-full bg-white text-black font-bold tracking-widest hover:scale-105 transition-all"
              >
                <Volume2 size={20} />
                <span>ACTIVATE FIELD</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation UI */}
      <div className="absolute bottom-400 left-10 z-40 flex items-center space-x-4 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
        <button
          onClick={() => setMode("CHROMESTHESIA")}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl transition-all ${mode === "CHROMESTHESIA" ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
        >
          <Music size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Chromesthesia</span>
        </button>
        <button
          onClick={() => {
            setMode("LEXICAL");
            if (isActive) startSpeechRecognition();
          }}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl transition-all ${mode === "LEXICAL" ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
        >
          <Mic size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Lexical</span>
        </button>
        <button
          onClick={() => setMode("SEQUENCE")}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl transition-all ${mode === "SEQUENCE" ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
        >
          <Hash size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Sequence</span>
        </button>
      </div>

      <div className="absolute top-10 right-10 z-40 text-white/20 text-[10px] font-mono tracking-widest uppercase pointer-events-none flex items-center space-x-3">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span>Live Neural Translation Active</span>
      </div>

      {/* Screen Effects */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
    
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

export default SynesthesiaEngine;
