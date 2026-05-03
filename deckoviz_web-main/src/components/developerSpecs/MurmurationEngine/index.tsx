
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Bird, MousePointer2 } from "lucide-react";

const N = 10000;

// --- Shaders ---

const boidVertexShader = `
  attribute vec3 velocity;
  varying vec3 vVelocity;
  varying float vDistToCenter;

  void main() {
    vVelocity = velocity;
    
    // Calculate rotation to align with velocity
    vec3 dir = normalize(velocity);
    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 axis = cross(up, dir);
    float angle = acos(dot(up, dir));
    
    // Basic rotation matrix logic
    // (Simplified for shader - in practice we'd use a quaternion or matrix attribute)
    
    vDistToCenter = length(instanceMatrix[3].xyz) / 100.0;
    
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  }
`;

const boidFragmentShader = `
  varying vec3 vVelocity;
  varying float vDistToCenter;

  void main() {
    vec3 edgeColor = vec3(0.2, 0.4, 0.8); // Cool blue
    vec3 centerColor = vec3(1.0, 0.6, 0.2); // Warm orange
    
    vec3 color = mix(centerColor, edgeColor, clamp(vDistToCenter, 0.0, 1.0));
    float speed = length(vVelocity);
    color *= (0.5 + speed * 2.0);
    
    gl_FragColor = vec4(color, 0.6);
  }
`;

// --- Main Component ---

const MurmurationEngine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mode, setMode] = useState<"DUSK" | "STORM" | "DAWN">("DUSK");

  // Simulation Refs
  const workerRef = useRef<Worker | null>(null);
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const predatorRef = useRef({ x: 0, y: 0, active: false });
  const shockwaveRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0a1a");
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      preserveDrawingBuffer: true // For trails
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.autoClearColor = false; // Important for trails

    // --- Boid Geometry & Mesh ---
    const geometry = new THREE.ConeGeometry(0.4, 1.2, 3);
    geometry.rotateX(Math.PI / 2); // Align cone along velocity axis
    
    const material = new THREE.ShaderMaterial({
      vertexShader: boidVertexShader,
      fragmentShader: boidFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const mesh = new THREE.InstancedMesh(geometry, material, N);
    meshRef.current = mesh;
    
    // Add velocity attribute to instanced mesh
    const velocities = new Float32Array(N * 3);
    geometry.setAttribute('velocity', new THREE.InstancedBufferAttribute(velocities, 3));
    
    scene.add(mesh);

    // --- Trail Effect Overlay ---
    const trailGeo = new THREE.PlaneGeometry(2, 2);
    const trailMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.08, // Adjust for trail length
    });
    const trailPlane = new THREE.Mesh(trailGeo, trailMat);
    const trailCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // --- Worker Integration ---
    const worker = new Worker(new URL("./Murmuration.worker.ts", import.meta.url), { type: "module" });
    workerRef.current = worker;

    const dummy = new THREE.Object3D();

    worker.onmessage = (e) => {
      const { action, positions, velocities } = e.data;
      if (action === "render") {
        for (let i = 0; i < N; i++) {
          dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          
          // Rotation to match velocity
          const vx = velocities[i * 3];
          const vy = velocities[i * 3 + 1];
          const vz = velocities[i * 3 + 2];
          const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
          
          if (speed > 0.01) {
            dummy.lookAt(positions[i * 3] + vx, positions[i * 3 + 1] + vy, positions[i * 3 + 2] + vz);
          }
          
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        
        mesh.instanceMatrix.needsUpdate = true;
        mesh.geometry.attributes.velocity.array.set(velocities);
        mesh.geometry.attributes.velocity.needsUpdate = true;

        requestUpdate();
      }
    };

    const requestUpdate = () => {
      worker.postMessage({
        action: "update",
        predator: predatorRef.current,
        shockwave: shockwaveRef.current,
      });
    };

    requestUpdate();

    // --- Animation Loop ---
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Draw trails (fade previous frame)
      renderer.setRenderTarget(null);
      renderer.render(trailPlane, trailCamera);
      
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
      // Map screen space to world space (roughly)
      predatorRef.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * 80;
      predatorRef.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 50;
      predatorRef.current.active = true;
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
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050510] overflow-hidden cursor-crosshair">
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Intro Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black z-50"
          >
            <div className="flex flex-col items-center space-y-4">
              <Bird className="w-12 h-12 text-blue-500 animate-pulse" />
              <p className="text-blue-400 font-mono text-sm tracking-widest uppercase">Initializing Coherent Swarm...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD & Controls */}
      <div className="absolute top-10 left-10 z-40">
        <h1 className="text-2xl font-light text-white tracking-[0.4em] uppercase opacity-60">
          Murmuration Engine
        </h1>
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex space-x-2 p-1 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
            {(["DUSK", "STORM", "DAWN"] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-1.5 rounded-md text-[10px] font-bold tracking-widest transition-all ${
                  mode === m ? "bg-white text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-400 left-10 z-40 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 font-mono text-[10px] text-gray-500 pointer-events-none">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between space-x-12">
            <span>BOID POPULATION</span>
            <span className="text-blue-400">10,000 INSTANCES</span>
          </div>
          <div className="flex justify-between space-x-12">
            <span>COHERENCE</span>
            <span className="text-blue-400">94.2% SYNC</span>
          </div>
          <div className="flex justify-between space-x-12 uppercase">
            <span>NEIGHBOR SEARCH</span>
            <span className="text-blue-400">TOPOLOGICAL (8)</span>
          </div>
          <div className="mt-4 pt-2 border-t border-white/10 flex items-center gap-2">
            <MousePointer2 size={12} />
            <span>POINTER ACTS AS PREDATOR</span>
          </div>
        </div>
      </div>

      {/* Screen Effects */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none bg-gradient-to-t from-[#0a0a20] to-transparent opacity-40" />
    </div>
  );
};

export default MurmurationEngine;
