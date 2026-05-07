"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Zap, Radio, X } from "lucide-react";
import { IXP_NODES, SUBSEA_CABLES, IXPNode } from "./infrastructure";

// --- Constants ---
const GLOBE_RADIUS = 100;

// --- Helper: Lat/Lng to Vector3 ---
const latLngToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

const InternetHeartbeat: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<IXPNode | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const packetsRef = useRef<{ mesh: THREE.Mesh, curve: THREE.QuadraticBezierCurve3, progress: number, speed: number }[]>([]);

  // --- Three.js Setup ---
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#020205");

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 0, 450);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      powerPreference: "high-performance" 
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Post Processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, 0.4, 0.85
    );
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // --- Globe ---
    const globeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a15,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x112244,
      emissiveIntensity: 0.2,
      wireframe: true,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);
    globeRef.current = globe;

    // Inner Glow
    const innerGlowGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.98, 64, 64);
    const innerGlowMat = new THREE.MeshBasicMaterial({ color: 0x4fd1c5, transparent: true, opacity: 0.05 });
    scene.add(new THREE.Mesh(innerGlowGeo, innerGlowMat));

    // --- Infrastructure: Nodes & Cables ---
    const nodeGroup = new THREE.Group();
    IXP_NODES.forEach(node => {
      const pos = latLngToVector3(node.lat, node.lng, GLOBE_RADIUS);
      
      const dotGeo = new THREE.SphereGeometry(1.5, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xf6ad55 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      nodeGroup.add(dot);

      // Label Ring
      const ringGeo = new THREE.RingGeometry(2, 3, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xf6ad55, transparent: true, opacity: 0.2, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(0, 0, 0);
      nodeGroup.add(ring);
    });
    scene.add(nodeGroup);

    const cableGroup = new THREE.Group();
    SUBSEA_CABLES.forEach(cable => {
      const n1 = IXP_NODES.find(n => n.id === cable.nodes[0])!;
      const n2 = IXP_NODES.find(n => n.id === cable.nodes[1])!;
      
      const v1 = latLngToVector3(n1.lat, n1.lng, GLOBE_RADIUS);
      const v2 = latLngToVector3(n2.lat, n2.lng, GLOBE_RADIUS);

      // Arc logic: mid point elevated
      const midPoint = v1.clone().lerp(v2, 0.5).normalize().multiplyScalar(GLOBE_RADIUS * 1.2);
      const curve = new THREE.QuadraticBezierCurve3(v1, midPoint, v2);
      
      const points = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({ color: 0x4fd1c5, transparent: true, opacity: 0.2 });
      const line = new THREE.Line(curveGeo, curveMat);
      cableGroup.add(line);

      // Packet Template for this cable
      const packetGeo = new THREE.SphereGeometry(0.5, 8, 8);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0x4fd1c5 });
      
      for(let i=0; i<3; i++) {
        const pMesh = new THREE.Mesh(packetGeo, packetMat);
        packetsRef.current.push({
            mesh: pMesh,
            curve: curve,
            progress: Math.random(),
            speed: 0.001 + Math.random() * 0.002
        });
        scene.add(pMesh);
      }
    });
    scene.add(cableGroup);

    // --- Lighting ---
    const amb = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(amb);

    const dirLight = new THREE.DirectionalLight(0x4fd1c5, 1);
    dirLight.position.set(100, 100, 100);
    scene.add(dirLight);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.001;
        nodeGroup.rotation.y += 0.001;
        cableGroup.rotation.y += 0.001;
      }

      // Update Packets
      packetsRef.current.forEach(p => {
        p.progress += p.speed;
        if (p.progress >= 1) p.progress = 0;
        
        const pos = p.curve.getPoint(p.progress);
        p.mesh.position.copy(pos);
        // Rotation sync with globe
        p.mesh.position.applyAxisAngle(new THREE.Vector3(0,1,0), globeRef.current?.rotation.y || 0);
      });

      composer.render();
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020205] overflow-hidden font-mono selection:bg-teal-500/30">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Cinematic HUD */}
      <div className="absolute inset-0 z-30 pointer-events-none p-12 pb-40 pb-40 flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-teal-500/20 flex items-center justify-center backdrop-blur-xl">
                 <Radio className="w-8 h-8 text-teal-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-t-2 border-teal-400 rounded-full animate-spin duration-[5000ms]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Internet Heartbeat</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                <p className="text-[10px] text-teal-400/60 uppercase tracking-[0.6em]">Real-time Global Traffic Analysis // Node v.8.4</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             <div className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl flex flex-col items-end">
                <span className="text-[10px] text-white/30 uppercase font-bold tracking-[0.3em]">Network Entropy</span>
                <span className="text-teal-400 text-sm font-bold">SIGNAL_OPTIMAL</span>
             </div>
             <button onClick={() => window.history.back()} className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl group">
              <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Center Prompt - Background Grid */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02]">
           <div className="grid grid-cols-12 gap-8">
              {[...Array(144)].map((_, i) => (
                <div key={i} className="w-px h-8 bg-white" />
              ))}
           </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end pointer-events-auto">
          
          {/* Detailed Telemetry */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
               {IXP_NODES.slice(0, 3).map(node => (
                 <button 
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all group"
                 >
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:animate-ping" />
                      <span className="text-[10px] text-white/60 uppercase font-bold tracking-widest">{node.name.split(' - ')[0]}</span>
                   </div>
                 </button>
               ))}
            </div>

            <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl flex gap-12 w-[35rem]">
               <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-teal-400">
                    <Activity size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Traffic Ingest</span>
                  </div>
                  <div className="text-4xl font-black text-white italic tracking-tighter">
                    421 <span className="text-sm text-white/20 uppercase tracking-normal">Segments</span>
                  </div>
                  <p className="text-xs text-white/30">Active subsea cable paths under observation.</p>
               </div>
               <div className="w-px h-full bg-white/10" />
               <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-orange-400">
                    <Zap size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Global Latency</span>
                  </div>
                  <div className="text-4xl font-black text-white italic tracking-tighter">
                    142 <span className="text-sm text-white/20 uppercase tracking-normal">ms</span>
                  </div>
                  <p className="text-xs text-white/30">Average round-trip across planetary IXPs.</p>
               </div>
            </div>
          </div>

          {/* Infrastructure Details */}
          <AnimatePresence mode="wait">
            {selectedNode && (
              <motion.div 
                key={selectedNode.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: 20 }}
                className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl w-80 space-y-6"
              >
                 <div className="flex justify-between items-start">
                    <div>
                       <span className="text-[10px] text-orange-400 uppercase font-bold tracking-widest">Transit Node</span>
                       <h3 className="text-xl font-black text-white mt-1 uppercase italic tracking-tighter">{selectedNode.name}</h3>
                    </div>
                    <button onClick={() => setSelectedNode(null)} className="text-white/20 hover:text-white"><X size={14}/></button>
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between text-[10px] border-b border-white/5 pb-2">
                       <span className="text-white/30">THROUGHPUT</span>
                       <span className="text-white">{selectedNode.throughput} GBPS</span>
                    </div>
                    <div className="flex justify-between text-[10px] border-b border-white/5 pb-2">
                       <span className="text-white/30">COORDINATES</span>
                       <span className="text-white">{selectedNode.lat.toFixed(2)}°N, {selectedNode.lng.toFixed(2)}°E</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                       <span className="text-white/30">STATUS</span>
                       <span className="text-green-500 font-bold tracking-widest">OPTIMAL</span>
                    </div>
                 </div>
                 <button className="w-full py-4 rounded-xl bg-teal-500 text-black font-black text-[10px] uppercase tracking-widest hover:bg-teal-400 transition-all">
                    Initiate Deep Scan
                 </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Screen Effects */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,0.95)]" />
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen" />
      
      <div className="absolute bottom-400 left-1/2 -translate-x-1/2 z-20 text-[10px] font-mono text-white/10 tracking-[1em] uppercase">
        Observed Planetary Network // Neural Data Ingest
      </div>
    </div>
  );
};

export default InternetHeartbeat;
