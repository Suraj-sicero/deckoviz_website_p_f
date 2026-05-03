
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Wind, Database, Clock } from "lucide-react";

// --- GLSL Shaders ---

const auroraVertexShader = `
  varying vec2 vUv;
  varying float vNoise;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uKp;

  // Simple noise for vertex displacement
  float hash(float n) { return fract(sin(n) * 43758.5453123); }
  float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f);
    return mix(hash(i), hash(i + 1.0), u);
  }

  void main() {
    vUv = uv;
    
    // Displace vertices to create waving curtain effect
    float displacement = noise(position.x * 2.0 + uTime * uSpeed * 0.5) * (uKp * 0.2);
    vec3 newPosition = position;
    newPosition.z += displacement * sin(uv.y * 3.14159);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const auroraFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uDensity;
  uniform float uBz;
  uniform vec3 uColor1;
  vec3 uColor2 = vec3(0.0, 1.0, 0.5); // Green base
  uniform vec3 uColor3;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 g = a0.x  * vec2(x0.x,x12.x) + h.x  * vec2(x0.y,x12.y);
    float n = 130.0 * dot(m, g);
    return n;
  }

  void main() {
    // Multi-layered noise for curtains
    float n1 = snoise(vec2(vUv.x * 2.0 - uTime * uSpeed * 0.1, vUv.y * 0.5));
    float n2 = snoise(vec2(vUv.x * 5.0 + uTime * uSpeed * 0.2, vUv.y * 1.2));
    float finalNoise = n1 * 0.7 + n2 * 0.3;
    
    // Vertical fade
    float verticalFade = smoothstep(0.0, 0.4, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
    
    // Horizontal ribbons
    float ribbon = smoothstep(0.1, 0.5, finalNoise) * smoothstep(0.9, 0.5, finalNoise);
    
    // Color mapping based on Bz
    vec3 color;
    if (uBz < 0.0) {
      // Strong aurora: Green -> Magenta -> Blue
      float t = vUv.y + finalNoise * 0.2;
      color = mix(uColor1, uColor2, smoothstep(0.0, 0.5, t));
      color = mix(color, uColor3, smoothstep(0.5, 1.0, t));
    } else {
      // Subdued aurora: Pale Green -> Silver
      color = mix(uColor1, vec3(0.75, 0.75, 0.8), vUv.y);
    }
    
    float intensity = ribbon * verticalFade * uDensity * 0.8;
    gl_FragColor = vec4(color * intensity, intensity);
  }
`;

// --- Star Field Component ---

const starVertexShader = `
  attribute float size;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  varying vec3 vColor;
  void main() {
    if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

// --- Main Component ---

interface SolarWindData {
  speed: number;
  density: number;
  bz: number;
  kp: number;
  timestamp: string;
  updatedAt: string;
}

interface CustomUniform extends THREE.IUniform {
  target?: number | THREE.Color;
}

const SolarWindPainter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<SolarWindData | null>(null);
  const [showHUD, setShowHUD] = useState(true);
  const [loading, setLoading] = useState(true);

  // Scene state refs for Three.js
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const curtainsRef = useRef<THREE.Mesh[]>([]);
  const uniformsRef = useRef<Record<string, CustomUniform>>({
    uTime: { value: 0 },
    uSpeed: { value: 0.4 },
    uDensity: { value: 1.0 },
    uKp: { value: 2.0 },
    uBz: { value: 0.0 },
    uColor1: { value: new THREE.Color("#00ff99") },
    uColor3: { value: new THREE.Color("#0066ff") },
  });

  // Fetch Data
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/solar-wind");
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch solar wind data", err);
      // Fallback is handled by the API usually, but just in case
      if (!data) {
        setData({
          speed: 400,
          density: 5,
          bz: -2,
          kp: 3,
          timestamp: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    }
  }, [data]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Poll every 5 mins
    return () => clearInterval(interval);
  }, [fetchData]);

  // Smoothly update uniforms when data changes
  useEffect(() => {
    if (data) {
      // Lerp logic would go in the animate loop, but we set target values here
      uniformsRef.current.uSpeed.target = data.speed / 1000;
      uniformsRef.current.uDensity.target = Math.min(data.density / 10, 2.0);
      uniformsRef.current.uKp.target = data.kp;
      uniformsRef.current.uBz.target = data.bz;

      if (data.bz < 0) {
        uniformsRef.current.uColor1.target = new THREE.Color("#00ff99");
        uniformsRef.current.uColor3.target = new THREE.Color("#ff00ff");
      } else {
        uniformsRef.current.uColor1.target = new THREE.Color("#aaffcc");
        uniformsRef.current.uColor3.target = new THREE.Color("#c0c0c0");
      }
    }
  }, [data]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Initialize Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create Star Field
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const posArray = new Float32Array(starCount * 3);
    const sizeArray = new Float32Array(starCount);
    const colorArray = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 20;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 20;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      sizeArray[i] = Math.random() * 2;
      const brightness = 0.5 + Math.random() * 0.5;
      colorArray[i * 3] = brightness;
      colorArray[i * 3 + 1] = brightness;
      colorArray[i * 3 + 2] = brightness;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    starGeometry.setAttribute("size", new THREE.BufferAttribute(sizeArray, 1));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const starMaterial = new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      transparent: true,
      vertexColors: true,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create Aurora Curtains
    const createCurtain = (yOffset: number, zOffset: number) => {
      const geometry = new THREE.PlaneGeometry(20, 10, 100, 50);
      const material = new THREE.ShaderMaterial({
        vertexShader: auroraVertexShader,
        fragmentShader: auroraFragmentShader,
        uniforms: {
          uTime: uniformsRef.current.uTime,
          uSpeed: uniformsRef.current.uSpeed,
          uDensity: uniformsRef.current.uDensity,
          uKp: uniformsRef.current.uKp,
          uBz: uniformsRef.current.uBz,
          uColor1: uniformsRef.current.uColor1,
          uColor3: uniformsRef.current.uColor3,
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = yOffset;
      mesh.position.z = zOffset;
      scene.add(mesh);
      return mesh;
    };

    const curtains = [
      createCurtain(0, -2),
      createCurtain(1, -4),
      createCurtain(-1, -6),
    ];
    curtainsRef.current = curtains;

    // Animation Loop
    let animationId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const lerpColor = (a: THREE.Color, b: THREE.Color, t: number) => {
      a.r = lerp(a.r, b.r, t);
      a.g = lerp(a.g, b.g, t);
      a.b = lerp(a.b, b.b, t);
    };

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      const delta = 0.01;
      
      uniformsRef.current.uTime.value = time * 0.001;
      
      // Smoothly interpolate uniforms
      if (uniformsRef.current.uSpeed.target !== undefined) {
        uniformsRef.current.uSpeed.value = lerp(uniformsRef.current.uSpeed.value, uniformsRef.current.uSpeed.target, delta);
        uniformsRef.current.uDensity.value = lerp(uniformsRef.current.uDensity.value, uniformsRef.current.uDensity.target, delta);
        uniformsRef.current.uKp.value = lerp(uniformsRef.current.uKp.value, uniformsRef.current.uKp.target, delta);
        uniformsRef.current.uBz.value = lerp(uniformsRef.current.uBz.value, uniformsRef.current.uBz.target, delta);
        
        lerpColor(uniformsRef.current.uColor1.value, uniformsRef.current.uColor1.target, delta);
        lerpColor(uniformsRef.current.uColor3.value, uniformsRef.current.uColor3.target, delta);
      }

      // Subtle camera movement
      camera.position.x = Math.sin(time * 0.0002) * 0.5;
      camera.position.y = Math.cos(time * 0.0003) * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate(0);

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      // Cleanup Three.js
      curtains.forEach(c => {
        c.geometry.dispose();
        (c.material as THREE.ShaderMaterial).dispose();
      });
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-black overflow-hidden cursor-crosshair"
      onClick={() => setShowHUD(!showHUD)}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black z-50"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
              <p className="text-green-500 font-mono text-sm tracking-widest">CONNECTING TO DSCOVR...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD */}
      <AnimatePresence>
        {showHUD && data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-400 left-8 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 font-mono pointer-events-none select-none"
          >
            <div className="flex items-center space-x-3 mb-4 border-b border-white/10 pb-2">
              <Activity size={16} className="text-green-400" />
              <span className="text-white font-bold text-xs tracking-tighter uppercase">Space Weather Telemetry</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between space-x-8">
                <div className="flex items-center space-x-2">
                  <Wind size={14} className="text-blue-400" />
                  <span className="text-gray-400 text-[11px]">SOLAR WIND SPEED</span>
                </div>
                <span className="text-blue-400 text-[11px]">{data.speed.toFixed(1)} km/s</span>
              </div>

              <div className="flex items-center justify-between space-x-8">
                <div className="flex items-center space-x-2">
                  <Database size={14} className="text-purple-400" />
                  <span className="text-gray-400 text-[11px]">PROTON DENSITY</span>
                </div>
                <span className="text-purple-400 text-[11px]">{data.density.toFixed(1)} p/cc</span>
              </div>

              <div className="flex items-center justify-between space-x-8">
                <div className="flex items-center space-x-2">
                  <Activity size={14} className="text-yellow-400" />
                  <span className="text-gray-400 text-[11px]">Kp INDEX</span>
                </div>
                <span className="text-yellow-400 text-[11px]">{data.kp.toFixed(1)}</span>
              </div>

              <div className="flex items-center justify-between space-x-8">
                <div className="flex items-center space-x-2">
                  <Activity size={14} className="text-red-400" />
                  <span className="text-gray-400 text-[11px]">MAG BZ</span>
                </div>
                <span className={`${data.bz < 0 ? 'text-red-400' : 'text-emerald-400'} text-[11px]`}>
                  {data.bz.toFixed(1)} nT
                </span>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Clock size={10} className="text-gray-500" />
                <span className="text-[9px] text-gray-500">SYNCED: {new Date(data.updatedAt).toLocaleTimeString()}</span>
              </div>
              <span className="text-[9px] text-gray-600 uppercase">NOAA SWPC SOURCE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aesthetic Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
    </div>
  );
};

export default SolarWindPainter;
