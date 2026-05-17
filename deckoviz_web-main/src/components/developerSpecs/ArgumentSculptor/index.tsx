
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { motion, AnimatePresence } from "framer-motion";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { 
  Scale, Zap, Box, Activity, Layers, Scan, 
  Brain, Cpu, Database, Info, RefreshCw, Maximize2
} from "lucide-react";
import { CURATED_ARGUMENTS, ArgumentGraph, ArgumentNode } from "./arguments";

// --- Component ---

const ArgumentSculptor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeGraph, setActiveGraph] = useState<ArgumentGraph>(CURATED_ARGUMENTS[0]);
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [selectedNode] = useState<ArgumentNode | null>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Simulation State
  const nodesRef = useRef<Map<string, { pos: THREE.Vector3, vel: THREE.Vector3, weight: number, type: string }>>(new Map());

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050508");

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(20, 15, 20);

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
      1.5, 0.4, 0.85
    );
    composer.addPass(bloomPass);

    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.autoRotate = !isStressTesting;
    controls.autoRotateSpeed = 0.5;

    // --- Lighting ---
    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    // --- Materials ---
    const stoneMat = new THREE.MeshStandardMaterial({
      color: "#888888",
      roughness: 0.9,
      metalness: 0.1,
    });

    const cableMat = new THREE.MeshStandardMaterial({
      color: "#444444",
      roughness: 0.5,
    });

    const fractureMat = new THREE.MeshBasicMaterial({
      color: "#ff0000",
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });

    // --- Graph Meshes ---
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);
    const edgeGroup = new THREE.Group();
    scene.add(edgeGroup);

    // Initialize Physics State
    const initPhysics = (graph: ArgumentGraph) => {
      nodesRef.current.clear();
      nodeGroup.clear();
      edgeGroup.clear();

      graph.nodes.forEach((n) => {
        const pos = new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          10 + (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 10
        );
        nodesRef.current.set(n.id, { 
          pos, 
          vel: new THREE.Vector3(), 
          weight: n.weight,
          type: n.type
        });

        const geo = n.type === 'conclusion' ? new THREE.BoxGeometry(2, 2, 2) : new THREE.SphereGeometry(n.weight * 1.5, 32, 32);
        const mesh = new THREE.Mesh(geo, stoneMat);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = { id: n.id };
        nodeGroup.add(mesh);
      });
    };

    initPhysics(activeGraph);

    // --- Physics Simulation ---
    const updatePhysics = (time: number) => {
      const gNodes = nodesRef.current;
      const edges = activeGraph.edges;

      // 1. Forces
      gNodes.forEach((n1, id1) => {
        const force = new THREE.Vector3(0, -0.05, 0); // Gravity

        // Edge Constraints
        edges.forEach(edge => {
          if (edge.from === id1 || edge.to === id1) {
            const otherId = edge.from === id1 ? edge.to : edge.from;
            const n2 = gNodes.get(otherId)!;
            const diff = n2.pos.clone().sub(n1.pos);
            const dist = diff.length();
            const restLen = 10;
            const k = edge.strength * 0.05;
            
            if (edge.type === 'dependency') {
                force.add(diff.normalize().multiplyScalar((dist - restLen) * k));
            } else {
                // Contradiction: Repulsion
                if (dist < 15) force.add(diff.normalize().multiplyScalar((dist - 15) * 0.1));
            }
          }
        });

        // Ground Constraint
        if (n1.pos.y < 0) {
            n1.pos.y = 0;
            n1.vel.y *= -0.5;
        }

        // Stress Test Oscillation
        if (isStressTesting && n1.type === 'conclusion') {
            force.x += Math.sin(time * 0.01) * 0.2;
            force.z += Math.cos(time * 0.008) * 0.2;
        }

        n1.vel.add(force).multiplyScalar(0.95); // Damping
        n1.pos.add(n1.vel);
      });

      // 2. Sync Meshes
      nodeGroup.children.forEach((mesh) => {
        const data = gNodes.get(mesh.userData.id);
        if (data) mesh.position.copy(data.pos);
      });

      // 3. Update Edges (Cylinders)
      edgeGroup.clear();
      edges.forEach(edge => {
        const n1 = gNodes.get(edge.from)!;
        const n2 = gNodes.get(edge.to)!;
        
        if (edge.type === 'dependency') {
            const mid = n1.pos.clone().add(n2.pos).multiplyScalar(0.5);
            const dist = n1.pos.distanceTo(n2.pos);
            const geo = new THREE.CylinderGeometry(0.1, 0.1, dist, 8);
            const mesh = new THREE.Mesh(geo, cableMat);
            mesh.position.copy(mid);
            mesh.lookAt(n2.pos);
            mesh.rotateX(Math.PI / 2);
            edgeGroup.add(mesh);
        } else {
            // Contradiction Plane
            const mid = n1.pos.clone().add(n2.pos).multiplyScalar(0.5);
            const geo = new THREE.PlaneGeometry(5, 5);
            const mesh = new THREE.Mesh(geo, fractureMat);
            mesh.position.copy(mid);
            mesh.lookAt(n2.pos);
            edgeGroup.add(mesh);
        }
      });
    };

    // Animation Loop
    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      updatePhysics(time);
      controls.update();
      composer.render();
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
      renderer.dispose();
    };
  }, [activeGraph, isStressTesting]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020205] overflow-hidden selection:bg-blue-500/30">
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Cinematic HUD Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none p-12 pb-40 pb-40 flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-blue-500/20 flex items-center justify-center backdrop-blur-xl">
                 <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-t-2 border-blue-400 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Argument Sculptor</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <p className="text-[10px] text-blue-400/60 uppercase tracking-[0.6em]">Structural Logic Simulation // Active</p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col items-end gap-2">
            <button 
              onClick={toggleFullscreen}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all pointer-events-auto mb-2"
            >
              <Maximize2 size={14} />
            </button>
            <div className="flex items-center space-x-3 text-white/40">
              <Cpu size={14} />
              <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Neural Topology: {activeGraph.nodes.length} Nodes</span>
            </div>
            <div className="flex items-center space-x-3 text-white/40">
              <Database size={14} />
              <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Logical Linkage: {activeGraph.edges.length} Edges</span>
            </div>
          </div>
        </div>

        {/* Bottom Logic Telemetry */}
        <div className="flex justify-between items-end">
          {/* Left Controls */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-3xl flex gap-4 pointer-events-auto"
            >
              {CURATED_ARGUMENTS.map(g => (
                <button
                  key={g.title}
                  onClick={() => setActiveGraph(g)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeGraph.title === g.title 
                    ? "bg-blue-500 text-black shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
                    : "text-white/40 hover:text-white hover:bg-white/5 border border-white/5"
                  }`}
                >
                  {g.title}
                </button>
              ))}
            </motion.div>

            <div className="flex gap-4">
              <button 
                onClick={() => setIsStressTesting(!isStressTesting)}
                className={`flex-1 flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl border transition-all pointer-events-auto backdrop-blur-xl ${
                  isStressTesting 
                  ? "bg-red-500/20 border-red-500/50 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]" 
                  : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                }`}
              >
                <Zap size={14} className={isStressTesting ? "animate-pulse" : ""} />
                <span className="text-[10px] font-black uppercase tracking-widest">Stress Test Structure</span>
              </button>
              
              <button 
                onClick={() => window.location.reload()}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all pointer-events-auto backdrop-blur-xl"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          {/* Right Info */}
          <div className="max-w-xs text-right space-y-4">
            <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-2">
               <div className="flex items-center justify-end gap-2 text-blue-400">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Structural Integrity</span>
                  <Activity size={14} />
               </div>
               <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: isStressTesting ? "30%" : "95%" }}
                    className={`h-full transition-colors duration-500 ${isStressTesting ? "bg-red-500" : "bg-blue-400"}`}
                  />
               </div>
               <p className="text-[9px] text-white/20 uppercase tracking-[0.2em]">Stability: {isStressTesting ? "CRITICAL" : "OPTIMAL"}</p>
            </div>
            <div className="text-[10px] text-white/30 uppercase tracking-[0.4em] italic leading-relaxed">
              "Logic is the scaffold of reality. When premises fail, the structure collapses."
            </div>
          </div>
        </div>
      </div>

      {/* Screen Effects */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen" />
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default ArgumentSculptor;
