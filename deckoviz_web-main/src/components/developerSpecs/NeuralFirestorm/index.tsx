
import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Zap, Moon, Lightbulb, Activity, Maximize2, RefreshCw, X } from "lucide-react";

// --- Types ---
type BrainState = "DEFAULT" | "FOCUS" | "SLEEP" | "CREATIVE";

const N = 2000;

const NeuralFirestorm: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [brainState, setBrainState] = useState<BrainState>("DEFAULT");
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs for simulation and rendering
  const workerRef = useRef<Worker | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const instancedMeshRef = useRef<THREE.InstancedMesh | null>(null);
  const mouseRef = useRef(new THREE.Vector2(-10, -10));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  // Buffers for simulation
  const stimulusBuffer = useRef(new Float32Array(N));
  const neuronPositions = useMemo(() => {
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      // Create a brain-like shape (ellipsoid/lobed)
      const phi = Math.acos(-1 + (2 * i) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;
      
      const r = 4 + Math.random() * 0.5;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.6; // Flattened
      const z = r * Math.cos(phi) * 1.2; // Elongated
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // --- Initialize Three.js ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#05050a");
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // --- Instanced Mesh for Neurons ---
    const geometry = new THREE.CircleGeometry(0.06, 8);
    const material = new THREE.MeshBasicMaterial({ 
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const mesh = new THREE.InstancedMesh(geometry, material, N);
    
    const dummy = new THREE.Object3D();
    for (let i = 0; i < N; i++) {
      dummy.position.set(neuronPositions[i*3], neuronPositions[i*3+1], neuronPositions[i*3+2]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, new THREE.Color("#2a1b4d")); // Default resting color
    }
    scene.add(mesh);
    instancedMeshRef.current = mesh;

    // --- Web Worker Setup ---
    // Note: In a real Vite project, we use ?worker. 
    // Here we'll create it via blob for maximum portability or assume URL works.
    const worker = new Worker(new URL("./NeuralSimulation.worker.ts", import.meta.url), { type: 'module' });
    workerRef.current = worker;

    const restingColor = new THREE.Color("#2a1b4d");
    const firingColor = new THREE.Color("#ffcc33");
    
    worker.onmessage = (e) => {
      const { action, fired } = e.data;
      if (action === "render") {
        for (let i = 0; i < N; i++) {
          if (fired[i]) {
            mesh.setColorAt(i, firingColor);
          } else {
            // Fade back to resting color
            const currentColor = new THREE.Color();
            mesh.getColorAt(i, currentColor);
            currentColor.lerp(restingColor, 0.1);
            mesh.setColorAt(i, currentColor);
          }
        }
        mesh.instanceColor!.needsUpdate = true;
        
        // Next update
        requestUpdate();
      }
    };

    const requestUpdate = () => {
      // Calculate stimulus from mouse
      const stimulus = stimulusBuffer.current;
      stimulus.fill(0);
      
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouseRef.current, camera);
      const intersects = raycaster.intersectObject(mesh);
      
      if (intersects.length > 0) {
        const point = intersects[0].point;
        for (let i = 0; i < N; i++) {
          const dx = neuronPositions[i*3] - point.x;
          const dy = neuronPositions[i*3+1] - point.y;
          const dz = neuronPositions[i*3+2] - point.z;
          const distSq = dx*dx + dy*dy + dz*dz;
          if (distSq < 4) {
            stimulus[i] = (1 - Math.sqrt(distSq) / 2) * 0.5;
          }
        }
      }

      worker.postMessage({
        action: "update",
        data: { stimulus },
        time: performance.now()
      }, [stimulus.buffer]);
      
      // We need to re-create the buffer since it was transferred
      stimulusBuffer.current = new Float32Array(N);
    };

    requestUpdate();

    // --- Animation Loop ---
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Slow rotation
      mesh.rotation.y += 0.002;
      mesh.rotation.z += 0.001;
      
      renderer.render(scene, camera);
    };
    animate();
    setIsLoaded(true);

    // --- Event Listeners ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      worker.terminate();
      renderer.dispose();
    };
  }, [neuronPositions]);

  const changeState = (state: BrainState) => {
    setBrainState(state);
    workerRef.current?.postMessage({ action: "setState", data: { state } });
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#05050a] overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black z-50"
          >
            <div className="flex flex-col items-center space-y-4">
              <Brain className="w-12 h-12 text-violet-500 animate-pulse" />
              <p className="text-violet-400 font-mono text-sm tracking-widest">INITIALIZING SYNAPSES...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interface */}
      <div className="absolute top-10 left-10 flex items-center space-x-6 pointer-events-none">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl">
                <Brain className="w-6 h-6 text-violet-400" />
             </div>
             <div>
                <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">Neural Firestorm</h1>
                <p className="text-[8px] text-white/20 uppercase tracking-[0.4em]">Spiking Neural Network // v.1.2</p>
             </div>
          </div>
      </div>

      <div className="absolute top-10 right-10 flex gap-4 pointer-events-auto">
          <button 
            onClick={toggleFullscreen}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl"
          >
            <Maximize2 size={16} />
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl"
          >
            <RefreshCw size={16} />
          </button>
          <button 
            onClick={() => window.history.back()}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl"
          >
            <X size={16} />
          </button>
      </div>

      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center space-x-2 p-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
        {[
          { id: "DEFAULT", icon: Activity, label: "Balanced" },
          { id: "FOCUS", icon: Zap, label: "Focus" },
          { id: "SLEEP", icon: Moon, label: "Deep Sleep" },
          { id: "CREATIVE", icon: Lightbulb, label: "Creative Burst" }
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => changeState(s.id as BrainState)}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all duration-500 ${
              brainState === s.id 
                ? "bg-violet-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.5)]" 
                : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <s.icon size={16} />
            <span className="text-xs font-bold tracking-wider uppercase">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Info HUD */}
      <div className="absolute bottom-400 right-10 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 font-mono text-[10px] text-gray-500 pointer-events-none">
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between space-x-8">
            <span>NEURON COUNT</span>
            <span className="text-violet-400">2,000 LIF NODES</span>
          </div>
          <div className="flex justify-between space-x-8">
            <span>SYNAPTIC DENSITY</span>
            <span className="text-violet-400">3.4% SPARSE</span>
          </div>
          <div className="flex justify-between space-x-8">
            <span>CURRENT MODE</span>
            <span className="text-violet-400 uppercase">{brainState}</span>
          </div>
          <div className="mt-4 pt-2 border-t border-white/10">
            <span>MOVE POINTER TO STIMULATE REGIONS</span>
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
};

export default NeuralFirestorm;
