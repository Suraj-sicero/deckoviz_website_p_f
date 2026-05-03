"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Share2, Globe, Activity, Maximize2, 
  RefreshCw, Info, Users, Zap, Scan, 
  Target, Layers, ShieldCheck
} from "lucide-react";

// --- Constants ---
const NODE_COUNT = 8000;
const CLUSTERS = 8;

interface NodeData {
  id: number;
  pos: THREE.Vector3;
  cluster: number;
  degree: number;
  hue: number;
}

const HumanConnectivity: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [metrics, setMetrics] = useState({ nodes: 8142, connections: 12409, latency: 42 });
  
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const graphData = useMemo(() => {
    const nodes: NodeData[] = [];
    const edges: [number, number][] = [];
    
    // Create Cluster Centers
    const clusterCenters = Array.from({ length: CLUSTERS }).map((_, i) => {
      const angle = (i / CLUSTERS) * Math.PI * 2;
      const radius = 30 + Math.random() * 20;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 20,
        Math.sin(angle) * radius
      );
    });

    for (let i = 0; i < NODE_COUNT; i++) {
      const clusterIdx = Math.floor(Math.random() * CLUSTERS);
      const center = clusterCenters[clusterIdx];
      const spread = 8 + Math.random() * 12;
      
      const pos = new THREE.Vector3(
        center.x + (Math.random() - 0.5) * spread,
        center.y + (Math.random() - 0.5) * spread,
        center.z + (Math.random() - 0.5) * spread
      );

      nodes.push({ 
        id: i, 
        pos, 
        cluster: clusterIdx, 
        degree: 0,
        hue: (clusterIdx / CLUSTERS) * 0.2 + 0.5 // Blues to Purples
      });
      
      // Connect to someone in same cluster
      if (i > 20) {
        const sameClusterNodes = nodes.filter(n => n.cluster === clusterIdx && n.id !== i);
        if (sameClusterNodes.length > 0) {
           const target = sameClusterNodes[Math.floor(Math.random() * sameClusterNodes.length)];
           edges.push([i, target.id]);
           target.degree++;
           nodes[i].degree++;
        }
        
        // Occasional cross-cluster connection (6 degrees)
        if (Math.random() > 0.98) {
           const crossTarget = Math.floor(Math.random() * i);
           edges.push([i, crossTarget]);
           nodes[crossTarget].degree++;
           nodes[i].degree++;
        }
      }
    }

    return { nodes, edges };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#020205");

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(100, 100, 150);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;
    controlsRef.current = controls;

    // Post-Processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, 0.4, 0.85
    );
    composer.addPass(bloomPass);

    // --- Nodes ---
    const nodeGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial();
    const mesh = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT);
    
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    
    graphData.nodes.forEach((node, i) => {
      dummy.position.copy(node.pos);
      const s = 0.2 + Math.pow(node.degree / 10, 0.5);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      color.setHSL(node.hue, 0.8, 0.6);
      mesh.setColorAt(i, color);
    });
    scene.add(mesh);

    // --- Edges ---
    const lineGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(graphData.edges.length * 6);
    graphData.edges.forEach((edge, i) => {
      const n1 = graphData.nodes[edge[0]];
      const n2 = graphData.nodes[edge[1]];
      positions[i * 6] = n1.pos.x;
      positions[i * 6 + 1] = n1.pos.y;
      positions[i * 6 + 2] = n1.pos.z;
      positions[i * 6 + 3] = n2.pos.x;
      positions[i * 6 + 4] = n2.pos.y;
      positions[i * 6 + 5] = n2.pos.z;
    });
    lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const lineMat = new THREE.LineBasicMaterial({ 
      color: "#4facfe", 
      transparent: true, 
      opacity: 0.05,
      blending: THREE.AdditiveBlending 
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // --- Starfield ---
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(2000 * 3);
    for(let i=0; i<2000; i++) {
        starPos[i*3] = (Math.random()-0.5) * 1000;
        starPos[i*3+1] = (Math.random()-0.5) * 1000;
        starPos[i*3+2] = (Math.random()-0.5) * 1000;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: "#fff", size: 0.5, transparent: true, opacity: 0.2 });
    scene.add(new THREE.Points(starGeo, starMat));

    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      
      // Dynamic scaling for hubs
      mesh.rotation.y += 0.0005;
      lines.rotation.y += 0.0005;

      // Update metrics occasionally
      if (Math.random() > 0.99) {
          setMetrics(prev => ({
              nodes: prev.nodes + (Math.random() > 0.5 ? 1 : -1),
              connections: prev.connections + (Math.random() > 0.5 ? 5 : -5),
              latency: 38 + Math.random() * 8
          }));
      }

      composer.render();
    };
    animate(0);

    setIsLoaded(true);

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
  }, [graphData]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020205] overflow-hidden selection:bg-blue-500/30">
      <canvas ref={canvasRef} className="block w-full h-full z-0" />

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
              <div className="w-16 h-16 rounded-full border-2 border-blue-500/20 flex items-center justify-center backdrop-blur-xl">
                 <Globe className="w-8 h-8 text-blue-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-t-2 border-blue-400 rounded-full animate-spin duration-[6000ms]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Six Degrees</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <p className="text-[10px] text-blue-400/60 uppercase tracking-[0.6em]">Global Connectivity Mapping // v.6.2.0</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             <button 
               onClick={toggleFullscreen}
               className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl"
             >
               <Maximize2 size={16} />
             </button>
             <button onClick={() => window.location.reload()} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl">
                <RefreshCw size={16} />
             </button>
          </div>
        </div>

        {/* Bottom Telemetry HUD */}
        <div className="flex justify-between items-end">
          {/* Left Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 w-96 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Scan size={80} />
            </div>
            
            <div className="flex items-center gap-3 text-blue-400 border-b border-white/10 pb-4">
               <Activity size={18} className="animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Network Telemetry</span>
            </div>
            
            <div className="space-y-5">
              {[
                { label: "Active Nodes", val: metrics.nodes.toLocaleString(), icon: <Users size={12} />, progress: 0.82 },
                { label: "Total Edges", val: metrics.connections.toLocaleString(), icon: <Share2 size={12} />, progress: 0.94 },
                { label: "Signal Latency", val: `${metrics.latency.toFixed(1)}ms`, icon: <Zap size={12} />, progress: 0.42 }
              ].map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-2 text-white/40">
                      {m.icon}
                      <span>{m.label}</span>
                    </div>
                    <span className="text-white">{m.val}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: `${m.progress * 100}%` }}
                      className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-3 text-[10px] text-white/20 uppercase font-bold tracking-widest border-t border-white/5">
              <ShieldCheck size={14} className="text-blue-500/40" />
              <span>Connectivity Nexus Verified</span>
            </div>
          </motion.div>

          {/* Right Data Block */}
          <div className="flex flex-col gap-4">
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl flex gap-12 w-[30rem] relative overflow-hidden">
               <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Info size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Theoretical Note</span>
                  </div>
                  <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-wider">
                    The structure reveals that any two humans on Earth are on average separated by only six social connections.
                  </p>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent" 
                    />
                  </div>
               </div>
               <div className="w-px h-full bg-white/10" />
               <div className="flex-1 space-y-2">
                  <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Topology</span>
                  <p className="text-2xl text-white font-black italic">SCALE_FREE</p>
                  <div className="text-[10px] text-blue-400 font-bold italic tracking-widest mt-4">CLUSTER_OPTIMIZED</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Effects */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
};

export default HumanConnectivity;
