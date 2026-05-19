"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Brain, Activity, Zap, Search, Layers, X, Share2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface NodeData {
  id: string;
  label: string;
  color: string;
  position: THREE.Vector3;
  mesh?: THREE.Mesh;
  connections: string[];
}

const COLORS = ["#60a5fa", "#f472b6", "#fbbf24", "#34d399", "#818cf8", "#00d1ff"];

const RELATED_WORDS: Record<string, string[]> = {
  "mind": ["consciousness", "thought", "memory", "dream", "ego", "logic"],
  "thought": ["idea", "logic", "abstraction", "mind", "reason", "impulse"],
  "nature": ["forest", "river", "growth", "ecosystem", "biology", "gaia"],
  "space": ["star", "void", "galaxy", "infinite", "entropy", "nebula"],
  "technology": ["silicon", "network", "code", "future", "algorithm", "cyber"],
};

const ThoughtWeaver: React.FC = () => {
    const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [neuralLoad, setNeuralLoad] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const sceneRef = useRef<THREE.Scene | null>(null);
  const nodesRef = useRef<NodeData[]>([]);


  const addNode = useCallback((label: string, parentPos?: THREE.Vector3) => {
    const id = Math.random().toString(36).substr(2, 9);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    const pos = parentPos 
      ? new THREE.Vector3(
          parentPos.x + (Math.random() - 0.5) * 4,
          parentPos.y + (Math.random() - 0.5) * 4,
          parentPos.z + (Math.random() - 0.5) * 4
        )
      : new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);

    const geometry = new THREE.IcosahedronGeometry(0.15, 1);
    const material = new THREE.MeshStandardMaterial({ 
      color, 
      emissive: color, 
      emissiveIntensity: 1.5,
      metalness: 0.8,
      roughness: 0.2
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(pos);
    sceneRef.current?.add(mesh);

    const newNode: NodeData = {
      id,
      label: label.toLowerCase(),
      color,
      position: pos,
      mesh,
      connections: []
    };

    nodesRef.current.push(newNode);
    setNodes([...nodesRef.current]);
    setNeuralLoad(prev => Math.min(prev + 5, 100));

    // Auto-generate associations
    const relatives = RELATED_WORDS[label.toLowerCase()] || ["origin", "echo", "abstraction"];
    if (nodesRef.current.length < 40) {
      relatives.slice(0, 2).forEach((rel, i) => {
        if (!nodesRef.current.find(n => n.label === rel)) {
          setTimeout(() => addNode(rel, pos), 800 + i * 200);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#020205");
    scene.fog = new THREE.FogExp2("#020205", 0.05);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const amb = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(amb);

    const point = new THREE.PointLight("#60a5fa", 5, 50);
    point.position.set(5, 5, 10);
    scene.add(point);

    // Initial Node
    addNode("mind");

    let frame = 0;
    const animate = () => {
      frame++;
      requestAnimationFrame(animate);

      // Rotate nodes and scene
      if (sceneRef.current) {
        sceneRef.current.rotation.y += 0.001;
        sceneRef.current.rotation.x += 0.0005;
      }

      nodesRef.current.forEach(node => {
        if (node.mesh) {
          node.mesh.rotation.y += 0.01;
          node.mesh.position.y += Math.sin(frame * 0.01 + parseInt(node.id, 36)) * 0.002;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [addNode]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020205] overflow-hidden font-mono selection:bg-cyan-500/30">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 cursor-move" />

      {/* Interface HUD */}
      <div className="absolute inset-0 z-30 pointer-events-none p-12 pb-40 flex flex-col justify-between">
        
        {/* Top: Branding & Search */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl pointer-events-auto">
               <Brain className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Thought Web Weaver</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                <p className="text-[10px] text-white/40 uppercase tracking-[0.5em]">Neural Abstraction Network V0.9.5</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             <div className="relative group w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={18} />
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (addNode(input), setInput(""))}
                  placeholder="Inject Concept..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all backdrop-blur-xl"
                />
             </div>
             
          </div>
        </div>

        {/* Center Indicators */}
        <div className="absolute top-1/2 right-12 -translate-y-1/2 space-y-4">
           {nodes.slice(-5).reverse().map((n) => (
              <motion.div 
                key={n.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 justify-end"
              >
                <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{n.label}</span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: n.color }} />
              </motion.div>
           ))}
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end">
          {/* Telemetry Panel */}
          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 w-96 pointer-events-auto">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3 text-cyan-400">
                  <Activity size={18} className="animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Synaptic Load</span>
               </div>
               <span className="text-xs font-mono text-white/60">{neuralLoad}%</span>
            </div>
            
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                animate={{ width: `${neuralLoad}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Active Nodes</span>
                  <p className="text-white font-bold">{nodes.length}</p>
               </div>
               <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Latency</span>
                  <p className="text-white font-bold">14ms</p>
               </div>
            </div>
          </div>

          {/* Controls Panel */}
          <motion.div 
            className="flex gap-4 pointer-events-auto"
          >
             <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-cyan-400 transition-all backdrop-blur-xl">
                <Layers size={20} />
                <span className="text-[8px] font-bold uppercase tracking-widest">Layers</span>
             </button>
             <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-cyan-400 transition-all backdrop-blur-xl">
                <Zap size={20} />
                <span className="text-[8px] font-bold uppercase tracking-widest">Excite</span>
             </button>
             <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-cyan-400 transition-all backdrop-blur-xl">
                <Share2 size={20} />
                <span className="text-[8px] font-bold uppercase tracking-widest">Export</span>
             </button>
          </motion.div>
        </div>
      </div>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_350px_rgba(0,0,0,0.95)]" />
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen" />
      <div className="absolute bottom-400 right-12 z-30 text-[8px] text-white/5 tracking-[2em] uppercase pointer-events-none">
        Neural Core // Fragment 0x99
      </div>
    
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

export default ThoughtWeaver;
