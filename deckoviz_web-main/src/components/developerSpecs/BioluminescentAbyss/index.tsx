"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Radar, Droplet, Thermometer, X, Globe } from "lucide-react";

const DEPTHS = [
  { level: "200m", pressure: "20 atm", temp: "12°C", color: "#001a2c", count: 80, speed: 1.2 },
  { level: "1000m", pressure: "100 atm", temp: "4°C", color: "#000810", count: 40, speed: 0.8 },
  { level: "3000m", pressure: "300 atm", temp: "2°C", color: "#000205", count: 20, speed: 0.5 },
  { level: "6000m", pressure: "600 atm", temp: "1.5°C", color: "#000000", count: 8, speed: 0.3 },
];

const SPECIES = ["Aequorea Victoria", "Pelagia Noctiluca", "Chrysaora Fuscescens", "Cyanea Capillata"];

const BioluminescentAbyss: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [depth, setDepth] = useState(DEPTHS[1]);
  const creaturesRef = useRef<any[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(depth.color);
    scene.fog = new THREE.FogExp2(depth.color, 0.02);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const snowCount = 2000;
    const snowGeometry = new THREE.BufferGeometry();
    const snowPositions = new Float32Array(snowCount * 3);
    for (let i = 0; i < snowCount; i++) {
      snowPositions[i * 3] = (Math.random() - 0.5) * 100;
      snowPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    snowGeometry.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
    const snowMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.4
    });
    const marineSnow = new THREE.Points(snowGeometry, snowMaterial);
    scene.add(marineSnow);

    const colors = ["#00ffff", "#ff00ff", "#00ff88", "#7dd3fc", "#fb7185"];
    
    const createCreature = () => {
      const group = new THREE.Group();
      const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
      
      const headGeo = new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const headMat = new THREE.MeshStandardMaterial({ 
        color: 0x000000, 
        emissive: color, 
        emissiveIntensity: 2,
        transparent: true,
        opacity: 0.6,
        wireframe: true
      });
      const head = new THREE.Mesh(headGeo, headMat);
      head.scale.set(1, 0.8, 1);
      group.add(head);

      const tentacles: THREE.Line[] = [];
      for (let i = 0; i < 8; i++) {
        const points = [];
        for (let j = 0; j < 10; j++) {
          points.push(new THREE.Vector3(
            Math.cos((i / 8) * Math.PI * 2) * 0.8,
            -j * 0.4,
            Math.sin((i / 8) * Math.PI * 2) * 0.8
          ));
        }
        const tentacleGeo = new THREE.BufferGeometry().setFromPoints(points);
        const tentacleMat = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.3 });
        const tentacle = new THREE.Line(tentacleGeo, tentacleMat);
        group.add(tentacle);
        tentacles.push(tentacle);
      }

      group.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30
      );
      
      return { 
        mesh: group, 
        vel: new THREE.Vector3((Math.random()-0.5)*0.05, (Math.random()-0.5)*0.05, (Math.random()-0.5)*0.02),
        phase: Math.random() * Math.PI * 2,
        tentacles,
        species: SPECIES[Math.floor(Math.random() * SPECIES.length)]
      };
    };

    const spawnCreatures = (count: number) => {
      creaturesRef.current.forEach(c => scene.remove(c.mesh));
      creaturesRef.current = [];
      for (let i = 0; i < count; i++) {
        const c = createCreature();
        creaturesRef.current.push(c);
        scene.add(c.mesh);
      }
    };

    spawnCreatures(depth.count);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      marineSnow.position.y -= 0.01;
      if (marineSnow.position.y < -50) marineSnow.position.y = 50;

      creaturesRef.current.forEach(c => {
        const speedMult = depth.speed;
        c.mesh.position.add(c.vel.clone().multiplyScalar(speedMult));
        
        if (Math.abs(c.mesh.position.x) > 35) c.mesh.position.x *= -0.95;
        if (Math.abs(c.mesh.position.y) > 35) c.mesh.position.y *= -0.95;
        
        const pulse = Math.sin(time * 1.5 + c.phase);
        const scale = 1 + pulse * 0.2;
        c.mesh.children[0].scale.set(scale, 0.8 / scale, scale);
        (c.mesh.children[0] as THREE.Mesh).material.emissiveIntensity = 2 + pulse;
        
        c.tentacles.forEach((t: any, i: number) => {
          const pos = t.geometry.attributes.position;
          for (let j = 1; j < 10; j++) {
            const wave = Math.sin(time * 3 + j * 0.5 + c.phase + i) * (j * 0.1);
            pos.setX(j, pos.getX(0) + wave);
            pos.setZ(j, pos.getZ(0) + wave);
          }
          pos.needsUpdate = true;
        });

        c.vel.y += Math.sin(time * 0.5 + c.phase) * 0.0005;
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
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, [depth]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden font-mono selection:bg-cyan-500/30">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="absolute inset-0 z-30 pointer-events-none p-12 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 flex items-center justify-center backdrop-blur-xl">
                 <Globe className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-t-2 border-cyan-400 rounded-full animate-spin duration-[3000ms]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Bioluminescent Abyss</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                <p className="text-[10px] text-cyan-400/60 uppercase tracking-[0.6em]">Abyssal Core // Research Drone Sub-04</p>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pointer-events-auto">
             <div className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl flex flex-col items-end">
                <span className="text-[10px] text-white/30 uppercase font-bold tracking-[0.3em]">Telemetry Status</span>
                <span className="text-emerald-400 text-sm font-bold">NOMINAL_CONNECTION</span>
             </div>
             <button onClick={() => window.history.back()} className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl group">
              <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <div className="w-[80vh] h-[80vh] rounded-full border border-cyan-500/20 relative">
             <div className="absolute inset-0 border border-cyan-500/10 rounded-full scale-75" />
             <div className="absolute inset-0 border border-cyan-500/5 rounded-full scale-50" />
             <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 w-80">
            <div className="flex items-center gap-3 text-cyan-400">
               <Radar size={18} className="animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Sonar Array</span>
            </div>
            <div className="aspect-square rounded-full border-4 border-white/5 relative overflow-hidden bg-black/40">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute top-1/2 left-1/2 w-full h-full border-t border-cyan-500/40 -translate-x-1/2 -translate-y-1/2 origin-top-left" />
            </div>
            <div className="flex justify-between items-center text-[10px] text-white/40">
               <span>BIOMASS DETECTED</span>
               <span className="text-cyan-400 font-bold">{creaturesRef.current.length} SIGNALS</span>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-end">
            <div className="flex gap-3 pointer-events-auto">
              {DEPTHS.map(d => (
                <button
                  key={d.level}
                  onClick={() => setDepth(d)}
                  className={`px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${depth.level === d.level ? 'bg-cyan-500 text-black shadow-[0_0_30px_rgba(6,182,212,0.4)]' : 'bg-white/5 border border-white/10 text-white/40 hover:bg-white/10 hover:text-white'}`}
                >
                  {d.level}
                </button>
              ))}
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl grid grid-cols-2 gap-12 w-[32rem]">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Droplet size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Hydrostatic</span>
                </div>
                <p className="text-4xl text-white font-black tracking-tighter">{depth.pressure}</p>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-cyan-400" initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 2 }} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-400">
                  <Thermometer size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Temperature</span>
                </div>
                <p className="text-4xl text-white font-black tracking-tighter">{depth.temp}</p>
                <div className="flex gap-1 h-2 items-end">
                  {[20, 40, 60, 30, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-rose-400/20 rounded-full h-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,0.95)]" />
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-screen" />
      <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.03] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent bg-[length:100%_4px]" />
    </div>
  );
};

export default BioluminescentAbyss;
