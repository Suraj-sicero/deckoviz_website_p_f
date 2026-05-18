import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Settings, Play, Pause, Mic, Music, Upload, Maximize2, X, Sliders, Palette, Volume2, Info } from 'lucide-react';

// ==========================================
// 1. Audio Analyzer Class (Self-Contained)
// ==========================================
class SimpleAudioAnalyzer {
  context: AudioContext | null = null;
  analyzer: AnalyserNode | null = null;
  dataArray: Uint8Array | null = null;
  
  fileSource: MediaElementAudioSourceNode | null = null;
  micSource: MediaStreamAudioSourceNode | null = null;
  activeInput: 'file' | 'mic' | null = null;

  smoothedBands = {
    bass: 0,
    mid: 0,
    treble: 0,
    all: 0
  };

  constructor() {
    try {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.context = new AudioContextClass();
        this.analyzer = this.context.createAnalyser();
        this.analyzer.fftSize = 256;
        this.dataArray = new Uint8Array(this.analyzer.frequencyBinCount);
      }
    } catch (e) {
      console.error("SimpleAudioAnalyzer failed to init:", e);
    }
  }

  async initMic() {
    if (!this.context || !this.analyzer) return;
    
    // Disconnect file source from analyzer if active
    if (this.fileSource) {
      try {
        this.fileSource.disconnect();
      } catch {}
    }
    
    this.stopMic();
    
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.micSource = this.context.createMediaStreamSource(stream);
      this.micSource.connect(this.analyzer);
      this.activeInput = 'mic';
      
      // Do NOT connect to destination to prevent mic loop feedback
      try {
        this.analyzer.disconnect(this.context.destination);
      } catch {}
    } catch (err) {
      console.error("Mic access denied:", err);
      throw err;
    }
  }

  stopMic() {
    if (this.micSource) {
      try {
        this.micSource.mediaStream.getTracks().forEach(track => track.stop());
        this.micSource.disconnect();
      } catch {}
      this.micSource = null;
    }
    this.smoothedBands = { bass: 0, mid: 0, treble: 0, all: 0 };
  }

  initFile(audioElement: HTMLAudioElement) {
    if (!this.context || !this.analyzer) return;
    
    // Stop microphone if active
    this.stopMic();
    
    // Create file source exactly once
    if (!this.fileSource) {
      try {
        this.fileSource = this.context.createMediaElementSource(audioElement);
      } catch (err) {
        console.error("Failed to create media element source:", err);
      }
    }
    
    // Connect file source to analyzer and destination
    if (this.fileSource) {
      try {
        this.fileSource.disconnect(); // Clear previous connections
        this.fileSource.connect(this.analyzer);
        
        this.analyzer.disconnect();
        this.analyzer.connect(this.context.destination);
        this.activeInput = 'file';
      } catch (err) {
        console.error("Failed to connect file source:", err);
      }
    }
  }

  update() {
    if (!this.analyzer || !this.dataArray) return this.smoothedBands;
    const analyzer = this.analyzer;
    const dataArray = this.dataArray;
    
    analyzer.getByteFrequencyData(dataArray as Uint8Array<ArrayBuffer>);
    
    const binCount = dataArray.length;
    if (binCount === 0) return this.smoothedBands;

    let bass = 0, mid = 0, treble = 0;
    
    // Split frequencies
    const bassEnd = Math.max(1, Math.floor(binCount * 0.08)); // Up to ~8%
    const midEnd = Math.floor(binCount * 0.45);              // Up to ~45%
    
    for (let i = 0; i < binCount; i++) {
      const val = dataArray[i] / 255;
      if (i < bassEnd) bass += val;
      else if (i < midEnd) mid += val;
      else treble += val;
    }

    const avgBass = bass / bassEnd;
    const avgMid = mid / Math.max(1, midEnd - bassEnd);
    const avgTreble = treble / Math.max(1, binCount - midEnd);
    const avgAll = (avgBass + avgMid + avgTreble) / 3;
    
    // Smooth transitions
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    
    this.smoothedBands.bass = lerp(this.smoothedBands.bass, avgBass, 0.2);
    this.smoothedBands.mid = lerp(this.smoothedBands.mid, avgMid, 0.15);
    this.smoothedBands.treble = lerp(this.smoothedBands.treble, avgTreble, 0.15);
    this.smoothedBands.all = lerp(this.smoothedBands.all, avgAll, 0.15);
    
    return this.smoothedBands;
  }

  resume() {
    if (this.context && this.context.state === 'suspended') {
      this.context.resume().catch(() => {});
    }
  }

  dispose() {
    this.stopMic();
    if (this.fileSource) {
      try {
        this.fileSource.disconnect();
      } catch {}
      this.fileSource = null;
    }
    if (this.context) {
      this.context.close().catch(() => {});
    }
  }
}

// ==========================================
// 2. Custom Simplex Noise & Particle Shaders
// ==========================================
const sphereVertexShader = `
uniform float uTime;
uniform float uAudioBass;
uniform float uAudioMid;
uniform float uAudioTreble;
uniform float uNoiseScale;
uniform float uDeformIntensity;
uniform float uPointSize;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoiseVal;

// Description : Array and textureless GLSL 2D/3D/4D simplex 
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; 
  vec3 x3 = x0 - D.yyy;      

  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857; 
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vNormal = normalMatrix * normal;
  vPosition = position;
  
  // Layer multi-octave noise for ultra-rich organic detail
  // Swirl and travel faster during loud beats for active response
  float flowTime = uTime * 0.42 + uAudioBass * 1.5;
  vec3 noiseCoord = position * uNoiseScale + vec3(0.0, 0.0, flowTime);
  float nVal = snoise(noiseCoord);
  nVal += snoise(noiseCoord * 2.2 + vec3(uTime * 0.2, uTime * 0.1, 0.0)) * 0.5;
  nVal += snoise(noiseCoord * 4.4 - vec3(0.0, uTime * 0.3, uTime * 0.2)) * 0.25;
  
  vNoiseVal = nVal;
  
  // Base constant waving + audio modulation
  // Shift displacement to be always positive (range 0.15 to 0.45+) to prevent inward core clipping
  float baseWave = (nVal * 0.12 + 0.15) * uDeformIntensity;
  float displacement = baseWave * (1.0 + uAudioBass * 1.8);
  
  // High frequency ripples driven by treble and mid - using abs to create gorgeous sharp ridged folds
  displacement += abs(snoise(position * 6.0 + uTime * 1.2)) * 0.05 * (0.2 + uAudioMid * 0.8) * uDeformIntensity;
  displacement += abs(snoise(position * 12.0 + uTime * 2.0)) * 0.015 * (0.1 + uAudioTreble * 0.9) * uDeformIntensity;

  vec3 displacedPosition = position + normal * displacement;
  
  vec4 mvPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Dynamic particle size responsive to music frequency
  float activeSize = uPointSize * (1.0 + uAudioBass * 0.6 + uAudioMid * 0.4);
  gl_PointSize = (activeSize * 15.0) / -mvPosition.z;
}
`;

const sphereFragmentShader = `
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;
uniform float uGlowIntensity;
uniform float uAudioBass;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoiseVal;

void main() {
  // Soft, glowing circular particles instead of harsh squares
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  
  if (dist > 0.5) discard;
  
  // Smoothly fade the particle edges to make them soft, glowing and anti-aliased
  float alpha = smoothstep(0.5, 0.15, dist);
  alpha *= (0.75 + uAudioBass * 0.25); // Beat transparency pulsation
  
  // Color mapping: Peaks are secondary (magenta), Valleys are primary (cyan)
  float mixFactor = clamp((vNoiseVal + 1.2) * 0.45, 0.0, 1.0);
  mixFactor = smoothstep(0.15, 0.85, mixFactor); // Enhance contrast
  
  // Blend with vertical coordinate to add a beautiful vertical color transition
  float posFactor = clamp(vPosition.y * 0.12 + 0.5, 0.0, 1.0);
  mixFactor = clamp(mixFactor * 0.75 + posFactor * 0.25, 0.0, 1.0);
  
  vec3 color = mix(uColorPrimary, uColorSecondary, mixFactor);
  
  // Add Fresnel glow on edges
  vec3 normal = normalize(vNormal);
  float edgeGlow = pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 2.5);
  color += mix(uColorPrimary, uColorSecondary, 0.5) * edgeGlow * uGlowIntensity * 1.2;
  
  // Dark outline fade for high contrast on light backgrounds
  float borderStrength = smoothstep(0.48, 0.32, dist);
  color = mix(color * 0.15, color, borderStrength);
  
  // Bright, hot-white center core for hyper-intensity glow
  float centerIntensity = smoothstep(0.16, 0.0, dist);
  vec3 finalColor = mix(color, vec3(1.0), centerIntensity * 0.85);
  
  gl_FragColor = vec4(finalColor, alpha);
}
`;

// ==========================================
// 3. Preset Definitions
// ==========================================
const PRESETS = {
  Ethereal: {
    name: "Ethereal Neon",
    primary: "#00f2fe",     // Cyber Cyan
    secondary: "#ec008c",   // Neon Magenta/Pink
    deform: 1.2,
    noiseScale: 0.65,
    size: 2.2,
    speed: 0.8,
    ambient: "#050510",
  },
  Volcano: {
    name: "Cyber Volcano",
    primary: "#ff0844",     // Radiant Red
    secondary: "#ffe600",   // Solar Yellow
    deform: 1.6,
    noiseScale: 0.8,
    size: 1.8,
    speed: 1.2,
    ambient: "#120202",
  },
  Forest: {
    name: "Acid Forest",
    primary: "#02c39a",     // Mint Green
    secondary: "#ffe066",   // Yellow Gold
    deform: 1.0,
    noiseScale: 0.5,
    size: 2.5,
    speed: 0.6,
    ambient: "#020a05",
  },
  Cosmic: {
    name: "Cosmic Deep",
    primary: "#8a2be2",     // Deep Violet
    secondary: "#00ffff",   // Cyan Blue
    deform: 1.4,
    noiseScale: 0.75,
    size: 2.0,
    speed: 1.0,
    ambient: "#080312",
  }
};

// ==========================================
// 4. Main Component
// ==========================================
const MusicResponsiveArt: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const analyzerRef = useRef<SimpleAudioAnalyzer | null>(null);
  const uniformsRef = useRef<Record<string, THREE.IUniform> | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const pointsInnerRef = useRef<THREE.Points | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const coreRef = useRef<THREE.Mesh | null>(null);

  // Helper to retrieve or initialize the persistent Audio Analyzer
  const getAnalyzer = () => {
    if (!analyzerRef.current) {
      analyzerRef.current = new SimpleAudioAnalyzer();
    }
    return analyzerRef.current;
  };
  
  // State variables
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMic, setIsMic] = useState(false);
  const [inputType, setInputType] = useState<'file' | 'mic'>('file');
  const [currentPreset, setCurrentPreset] = useState<keyof typeof PRESETS>('Ethereal');
  const [showUI, setShowUI] = useState(true);
  const [fileName, setFileName] = useState<string | null>(null);
  
  // Customizable Settings
  const [colorPrimary, setColorPrimary] = useState(PRESETS.Ethereal.primary);
  const [colorSecondary, setColorSecondary] = useState(PRESETS.Ethereal.secondary);
  const [ambientBg, setAmbientBg] = useState(PRESETS.Ethereal.ambient);
  const [deformIntensity, setDeformIntensity] = useState(PRESETS.Ethereal.deform);
  const [noiseScale, setNoiseScale] = useState(PRESETS.Ethereal.noiseScale);
  const [particleSize, setParticleSize] = useState(PRESETS.Ethereal.size);
  const [rotationSpeed, setRotationSpeed] = useState(PRESETS.Ethereal.speed);
  const [glowIntensity, setGlowIntensity] = useState(1.5);
  const particleCount = 12000;
  const [isWireframe, setIsWireframe] = useState(false);

  // Initialize Audio & Three Scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    
    // Scene & Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(ambientBg);
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true, 
      alpha: false,
      preserveDrawingBuffer: false 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 22;

    // Create Audio-Reactive Particle Sphere (The Ball)
    // High-resolution SphereGeometry to align particles in gorgeous longitude/latitude grid lines
    const sphereGeometry = new THREE.SphereGeometry(4, 180, 180); 
    
    // Uniforms mapping to shader inputs
    uniformsRef.current = {
      uTime: { value: 0.0 },
      uAudioBass: { value: 0.0 },
      uAudioMid: { value: 0.0 },
      uAudioTreble: { value: 0.0 },
      uNoiseScale: { value: noiseScale },
      uDeformIntensity: { value: deformIntensity },
      uPointSize: { value: particleSize },
      uColorPrimary: { value: new THREE.Color(colorPrimary) },
      uColorSecondary: { value: new THREE.Color(colorSecondary) },
      uGlowIntensity: { value: glowIntensity }
    };

    // Add point lights for core mesh reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(new THREE.Color(colorPrimary), 1.0);
    dirLight2.position.set(-5, -5, -10);
    scene.add(dirLight2);

    // Create elegant metallic glass-like inner core sphere
    const coreGeometry = new THREE.SphereGeometry(3.85, 80, 80);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#020208'),
      roughness: 0.15,
      metalness: 0.9,
      transparent: true,
      opacity: 0.65, // Let back-side particles shine through
      wireframe: isWireframe
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);
    coreRef.current = coreMesh;

    const sphereMaterial = new THREE.ShaderMaterial({
      vertexShader: sphereVertexShader,
      fragmentShader: sphereFragmentShader,
      uniforms: uniformsRef.current,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const spherePoints = new THREE.Points(sphereGeometry, sphereMaterial);
    scene.add(spherePoints);
    pointsRef.current = spherePoints;

    // Create Inner Particle Sphere for double-layered organic complexity
    const sphereInnerGeometry = new THREE.SphereGeometry(3.9, 150, 150);
    // Reuse the exact same material! Both will deform in lockstep but with different scales and opposite rotations!
    const sphereInnerPoints = new THREE.Points(sphereInnerGeometry, sphereMaterial);
    scene.add(sphereInnerPoints);
    pointsInnerRef.current = sphereInnerPoints;

    // Outer Stellar Space Dust Particles (Floating Background)
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(particleCount * 3);
    const starColors = new Float32Array(particleCount * 3);
    
    const colorPrim = new THREE.Color(colorPrimary);
    const colorSec = new THREE.Color(colorSecondary);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Random coordinates in a shell around the sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const radius = 6.0 + Math.random() * 25.0; // outside the main ball

      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i+1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i+2] = radius * Math.cos(phi);

      const mixedColor = new THREE.Color().lerpColors(colorPrim, colorSec, Math.random());
      starColors[i] = mixedColor.r;
      starColors[i+1] = mixedColor.g;
      starColors[i+2] = mixedColor.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Custom circular points texture mapping
    const canvasPoint = document.createElement('canvas');
    canvasPoint.width = 16;
    canvasPoint.height = 16;
    const ctx = canvasPoint.getContext('2d')!;
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const pointTexture = new THREE.CanvasTexture(canvasPoint);

    const starMaterial = new THREE.PointsMaterial({
      size: 0.12,
      map: pointTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.45,
      depthWrite: false
    });

    const starParticles = new THREE.Points(starGeometry, starMaterial);
    scene.add(starParticles);
    starsRef.current = starParticles;

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // 1. Get sound bands from Web Audio
      let bands = { bass: 0, mid: 0, treble: 0, all: 0 };
      if (analyzerRef.current) {
        bands = analyzerRef.current.update();
      }

      // 2. Feed sound variables and time to Sphere Shaders
      if (uniformsRef.current) {
        uniformsRef.current.uTime.value = time * rotationSpeed;
        
        // Enhance response curve of frequencies for high visual impact
        uniformsRef.current.uAudioBass.value = Math.pow(bands.bass, 1.4);
        uniformsRef.current.uAudioMid.value = bands.mid;
        uniformsRef.current.uAudioTreble.value = bands.treble;
      }

      // 3. Deform and rotate the organic ball
      if (spherePoints) {
        spherePoints.rotation.y = time * 0.12 * rotationSpeed;
        spherePoints.rotation.x = time * 0.08 * rotationSpeed;

        // Pulse scale slightly with bass
        const baseScale = 1.0;
        const pulse = baseScale + Math.pow(bands.bass, 2.0) * 0.25;
        spherePoints.scale.set(pulse, pulse, pulse);

        if (pointsInnerRef.current) {
          pointsInnerRef.current.rotation.y = -time * 0.09 * rotationSpeed;
          pointsInnerRef.current.rotation.x = -time * 0.06 * rotationSpeed;
          // Pulse scale slightly offset to create interweaving breathing layers
          const innerPulse = baseScale + Math.pow(bands.bass, 2.0) * 0.22;
          pointsInnerRef.current.scale.set(innerPulse, innerPulse, innerPulse);
        }

        if (coreRef.current) {
          coreRef.current.rotation.y = time * 0.18 * rotationSpeed;
          coreRef.current.rotation.x = time * 0.10 * rotationSpeed;
          // Pulse scale in synchronization with the particle sphere
          const corePulse = baseScale + Math.pow(bands.bass, 2.0) * 0.20;
          coreRef.current.scale.set(corePulse, corePulse, corePulse);
        }
      }

      // 4. Floating outer space dust reactive movement
      if (starParticles) {
        starParticles.rotation.y = -time * 0.03 * rotationSpeed;
        
        // Space dust expands slightly on bass beats
        const starPulse = 1.0 + bands.bass * 0.08;
        starParticles.scale.set(starPulse, starPulse, starPulse);
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      if (coreRef.current) {
        coreRef.current.geometry.dispose();
        (coreRef.current.material as THREE.Material).dispose();
      }
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      sphereGeometry.dispose();
      sphereInnerGeometry.dispose();
      sphereMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      pointTexture.dispose();
      if (analyzerRef.current) {
        analyzerRef.current.dispose();
        analyzerRef.current = null;
      }
    };
  }, []);

  // Update Three.js Materials dynamically when states change
  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.uDeformIntensity.value = deformIntensity;
      uniformsRef.current.uNoiseScale.value = noiseScale;
      uniformsRef.current.uPointSize.value = particleSize;
      uniformsRef.current.uColorPrimary.value.set(colorPrimary);
      uniformsRef.current.uColorSecondary.value.set(colorSecondary);
      uniformsRef.current.uGlowIntensity.value = glowIntensity;
    }
    
    if (coreRef.current) {
      const coreMat = coreRef.current.material as THREE.MeshStandardMaterial;
      const baseColor = new THREE.Color('#020208'); // Maintain high-contrast obsidian dark backing
      coreMat.color.copy(baseColor);
      coreMat.needsUpdate = true;
    }
  }, [deformIntensity, noiseScale, particleSize, colorPrimary, colorSecondary, glowIntensity, ambientBg]);

  // Handle Preset Changes
  const applyPreset = (presetKey: keyof typeof PRESETS) => {
    setCurrentPreset(presetKey);
    const preset = PRESETS[presetKey];
    
    setColorPrimary(preset.primary);
    setColorSecondary(preset.secondary);
    setDeformIntensity(preset.deform);
    setNoiseScale(preset.noiseScale);
    setParticleSize(preset.size);
    setRotationSpeed(preset.speed);
    setAmbientBg(preset.ambient);

    // Update Three scene background instantly
    if (canvasRef.current) {
      const gl = canvasRef.current.getContext('webgl2') || canvasRef.current.getContext('webgl');
      if (gl && pointsRef.current) {
        const scene = pointsRef.current.parent as THREE.Scene;
        if (scene) scene.background = new THREE.Color(preset.ambient);
      }
    }
  };

  // Play / Pause imported MP3
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    const analyzer = getAnalyzer();
    
    // Bind file to audio context
    analyzer.initFile(audioRef.current);
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      analyzer.resume();
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // File Upload importer
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && audioRef.current) {
      const analyzer = getAnalyzer();
      const url = URL.createObjectURL(file);
      audioRef.current.src = url;
      setFileName(file.name);
      setIsMic(false);
      setInputType('file');
      
      // Bind file to audio context
      analyzer.initFile(audioRef.current);
      
      // Auto play
      analyzer.resume();
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Toggle Microphone Audio input
  const handleMicToggle = async () => {
    const analyzer = getAnalyzer();
    
    if (!isMic) {
      try {
        await analyzer.initMic();
        setIsMic(true);
        setInputType('mic');
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsPlaying(false);
      } catch (err) {
        alert("Failed to access microphone. Please grant permission.");
        console.error("Mic activation failed:", err);
      }
    } else {
      analyzer.stopMic();
      setIsMic(false);
      // Re-init file if URL exists
      if (audioRef.current && audioRef.current.src) {
        analyzer.initFile(audioRef.current);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error("Fullscreen error:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Wireframe / Mesh view toggle
  const toggleWireframe = () => {
    setIsWireframe(!isWireframe);
    if (pointsRef.current) {
      const mesh = pointsRef.current;
      const material = mesh.material as THREE.ShaderMaterial;
      material.wireframe = !isWireframe;
      material.needsUpdate = true;
    }
    if (coreRef.current) {
      const coreMaterial = coreRef.current.material as THREE.MeshStandardMaterial;
      coreMaterial.wireframe = !isWireframe;
      coreMaterial.needsUpdate = true;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#030308] overflow-hidden font-sans select-none">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
          border-radius: 999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.28);
        }
      `}</style>
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0 touch-none" />

      {/* HTML5 Audio Element */}
      <audio ref={audioRef} crossOrigin="anonymous" hidden onEnded={() => setIsPlaying(false)} />

      {/* UI Overlay */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 z-10 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Header (Top Left) */}
        <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
          <div className="p-3.5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/20 to-[#ec008c]/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <Volume2 className="w-6 h-6 text-white relative z-10 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Music Responsive Art
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ec008c]/20 text-[#ec008c] font-semibold border border-[#ec008c]/30 uppercase tracking-widest">
                Reactive
              </span>
            </h1>
            <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Interactive Developer Spec</p>
          </div>
        </div>

        {/* Action Controls (Top Right) */}
        <div className="absolute top-8 right-8 flex items-center gap-3 pointer-events-auto">
          <button 
            onClick={toggleFullscreen}
            className="p-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 text-gray-400 hover:text-white transition-all shadow-xl flex items-center justify-center"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowUI(!showUI)}
            className="p-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 text-gray-400 hover:text-white transition-all shadow-xl flex items-center justify-center"
            title="Toggle Controls Panel"
          >
            <Settings className={`w-5 h-5 transition-transform duration-500 ${showUI ? 'rotate-90 text-white' : ''}`} />
          </button>
          <button 
            onClick={() => window.history.back()}
            className="p-3.5 bg-white/5 hover:bg-rose-500/20 backdrop-blur-xl rounded-2xl border border-white/10 text-gray-400 hover:text-rose-400 transition-all shadow-xl flex items-center justify-center"
            title="Exit"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Input Control Box (Bottom Center) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center gap-4 pointer-events-auto bg-black/40 backdrop-blur-2xl p-4 rounded-[2rem] border border-white/10 shadow-2xl max-w-[95vw] w-full md:w-auto">
          
          {/* Input Type Selector */}
          <div className="flex bg-white/5 p-1 rounded-full border border-white/5">
            <button
              onClick={() => {
                setInputType('file');
                if(isMic) handleMicToggle();
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                inputType === 'file' ? 'bg-white text-black shadow-lg scale-105' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              MP3 File
            </button>
            <button
              onClick={() => {
                setInputType('mic');
                if(!isMic) handleMicToggle();
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                inputType === 'mic' ? 'bg-red-500 text-white shadow-lg scale-105 animate-pulse' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              Microphone
            </button>
          </div>

          <div className="w-px h-8 bg-white/10 hidden md:block" />

          {/* Action Player Controls */}
          <div className="flex items-center gap-3">
            {inputType === 'file' ? (
              <>
                <button 
                  onClick={handlePlayPause}
                  disabled={!audioRef.current?.src}
                  className={`p-3.5 rounded-full transition-all ${
                    !audioRef.current?.src 
                      ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
                      : isPlaying 
                        ? 'bg-white text-black hover:bg-gray-200' 
                        : 'bg-[#ec008c] text-white hover:bg-[#ec008c]/80'
                  }`}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                
                <label className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 cursor-pointer transition-all group font-semibold text-xs tracking-wider uppercase">
                  <Upload className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-all" />
                  Import MP3
                  <input type="file" accept="audio/*" className="hidden" onChange={handleFileUpload} />
                </label>
              </>
            ) : (
              <button 
                onClick={handleMicToggle}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all border ${
                  isMic 
                    ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse' 
                    : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                }`}
              >
                <Mic className="w-4 h-4" />
                {isMic ? 'Listening...' : 'Turn On Mic'}
              </button>
            )}
          </div>

          {fileName && inputType === 'file' && (
            <>
              <div className="w-px h-8 bg-white/10 hidden md:block" />
              <div className="px-4 py-1.5 bg-white/5 rounded-full border border-white/5 max-w-[200px] flex items-center gap-2">
                <Music className="w-3 h-3 text-[#00f2fe]" />
                <span className="text-[10px] font-medium text-gray-300 truncate block">{fileName}</span>
              </div>
            </>
          )}
        </div>

        {/* Settings & Preset Customization Bar (Right Slide-out) */}
        <div className="absolute right-8 top-8 bottom-8 w-80 pointer-events-auto bg-black/40 backdrop-blur-2xl px-6 pt-6 pb-24 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          
          {/* Presets Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-violet-400" />
              <h2 className="text-xs font-bold text-gray-200 uppercase tracking-widest">Color Presets</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((key) => {
                const preset = PRESETS[key];
                return (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      currentPreset === key 
                        ? 'bg-white/10 border-white/30 text-white' 
                        : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                    }`}
                  >
                    <div className="text-xs font-semibold mb-2">{preset.name}</div>
                    <div className="flex gap-1.5">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Color Pickers */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-4 h-4 text-[#00f2fe]" />
              <h2 className="text-xs font-bold text-gray-200 uppercase tracking-widest">Custom Colors</h2>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Primary Color</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 font-mono">{colorPrimary}</span>
                  <input 
                    type="color" 
                    value={colorPrimary}
                    onChange={(e) => {
                      setColorPrimary(e.target.value);
                      setCurrentPreset('Ethereal'); // fallback to show custom values are being adjusted
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0" 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Secondary Color</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 font-mono">{colorSecondary}</span>
                  <input 
                    type="color" 
                    value={colorSecondary}
                    onChange={(e) => {
                      setColorSecondary(e.target.value);
                      setCurrentPreset('Ethereal');
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0" 
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Ambient BG</span>
                <input 
                  type="color" 
                  value={ambientBg}
                  onChange={(e) => {
                    const newBg = e.target.value;
                    setAmbientBg(newBg);
                    if (pointsRef.current) {
                      const scene = pointsRef.current.parent as THREE.Scene;
                      if (scene) scene.background = new THREE.Color(newBg);
                    }
                  }}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0" 
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Interactive Parameters Sliders */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-4 h-4 text-[#ec008c]" />
              <h2 className="text-xs font-bold text-gray-200 uppercase tracking-widest">Adjust Sphere</h2>
            </div>

            <div className="flex flex-col gap-4">
              {/* Deform slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Deform Sensitivity</span>
                  <span className="text-white font-mono">{deformIntensity.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="0.1" max="3.0" step="0.1" 
                  value={deformIntensity}
                  onChange={(e) => setDeformIntensity(parseFloat(e.target.value))}
                  className="w-full accent-[#ec008c] bg-white/10 h-1 rounded-lg cursor-pointer"
                />
              </div>

              {/* Particle size slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Particle Size</span>
                  <span className="text-white font-mono">{particleSize.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="0.5" max="5.0" step="0.1" 
                  value={particleSize}
                  onChange={(e) => setParticleSize(parseFloat(e.target.value))}
                  className="w-full accent-[#00f2fe] bg-white/10 h-1 rounded-lg cursor-pointer"
                />
              </div>

              {/* Noise scale slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Complexity</span>
                  <span className="text-white font-mono">{noiseScale.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="0.1" max="1.5" step="0.05" 
                  value={noiseScale}
                  onChange={(e) => setNoiseScale(parseFloat(e.target.value))}
                  className="w-full accent-[#8a2be2] bg-white/10 h-1 rounded-lg cursor-pointer"
                />
              </div>

              {/* Rotation speed slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Spin Speed</span>
                  <span className="text-white font-mono">{rotationSpeed.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="0.1" max="3.0" step="0.1" 
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                  className="w-full accent-[#ffe600] bg-white/10 h-1 rounded-lg cursor-pointer"
                />
              </div>

              {/* Glow Intensity Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Neon Glow</span>
                  <span className="text-white font-mono">{glowIntensity.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="0.0" max="3.0" step="0.1" 
                  value={glowIntensity}
                  onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 bg-white/10 h-1 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Alternate Grid / Particle Mode */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Wireframe Matrix</span>
            <button 
              onClick={toggleWireframe}
              className={`w-12 h-6 rounded-full p-1 transition-all ${isWireframe ? 'bg-[#ec008c]' : 'bg-white/10'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${isWireframe ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>

        {/* Meditative helper tooltip (Bottom Left) */}
        <div className="absolute bottom-8 left-8 p-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 max-w-xs shadow-2xl flex gap-3 pointer-events-auto">
          <Info className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <div className="text-[10px] text-gray-400 leading-normal">
            <span className="font-bold text-white block mb-0.5">Interaction Tip:</span>
            Speak into your microphone or play imported MP3 beats. The particle ball will dynamically expand and distort along with the bass and frequency bands!
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicResponsiveArt;
