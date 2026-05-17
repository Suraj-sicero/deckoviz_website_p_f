
import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { 
  BrainCircuit, MousePointer2, Zap, Activity, 
  Layers, Scan, RefreshCw, Share2, Info, 
  Flame, Target, Globe, Maximize2
} from "lucide-react";
import { getSolarElevation, kelvinToRGB } from "../SkyChronometer/solarCalc"; // Reuse if needed, or just standard colors

// --- Shaders ---

const agentUpdateShader = `
  uniform sampler2D uAgentData;
  uniform sampler2D uTrailMap;
  uniform vec2 uRes;
  uniform float uTime;
  uniform float uSensorAngle;
  uniform float uSensorDist;
  uniform float uTurnSpeed;
  uniform float uMoveSpeed;
  
  varying vec2 vUv;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  float sampleTrail(vec2 pos, float angle, float dist) {
    vec2 offset = vec2(cos(angle), sin(angle)) * dist;
    return texture2D(uTrailMap, pos + offset).r;
  }

  void main() {
    vec4 data = texture2D(uAgentData, vUv);
    vec2 pos = data.xy;
    float angle = data.z;

    // 1. Sensing (Jones 2010)
    float sensorAngle = uSensorAngle;
    float sensorDist = uSensorDist;
    
    float sF = sampleTrail(pos, angle, sensorDist);
    float sL = sampleTrail(pos, angle - sensorAngle, sensorDist);
    float sR = sampleTrail(pos, angle + sensorAngle, sensorDist);

    float rand = hash(vUv.x + vUv.y + uTime);
    
    // 2. Decision
    if (sF > sL && sF > sR) {
        // Stay same direction
    } else if (sF < sL && sF < sR) {
        // Jitter
        angle += (rand - 0.5) * 2.0 * uTurnSpeed;
    } else if (sL > sR) {
        angle -= uTurnSpeed;
    } else if (sR > sL) {
        angle += uTurnSpeed;
    }

    // 3. Move
    pos += vec2(cos(angle), sin(angle)) * uMoveSpeed;

    // 4. Boundary handling (Cyclic/Wrap)
    pos = fract(pos);

    gl_FragColor = vec4(pos, angle, 1.0);
  }
`;

const trailUpdateShader = `
  uniform sampler2D uTrailMap;
  uniform vec2 uRes;
  uniform float uDecay;
  uniform float uDiffuse;
  varying vec2 vUv;

  void main() {
    vec2 texel = 1.0 / uRes;
    float avg = 0.0;
    
    // 3x3 Box Blur
    for (int x = -1; x <= 1; x++) {
      for (int y = -1; y <= 1; y++) {
        avg += texture2D(uTrailMap, vUv + vec2(float(x), float(y)) * texel).r;
      }
    }
    avg /= 9.0;

    float val = texture2D(uTrailMap, vUv).r;
    val = mix(val, avg, uDiffuse);
    val *= uDecay;

    gl_FragColor = vec4(vec3(val), 1.0);
  }
`;

const renderShader = `
  uniform sampler2D uTrailMap;
  varying vec2 vUv;
  void main() {
    float val = texture2D(uTrailMap, vUv).r;
    
    // Non-linear intensity (Gamma)
    val = pow(val, 0.8);

    // Color Mapping: Black -> Dark Orange -> Amber Glow -> White
    vec3 col = mix(vec3(0.0), vec3(0.6, 0.2, 0.0), clamp(val * 4.0, 0.0, 1.0));
    col = mix(col, vec3(0.9, 0.4, 0.1), clamp((val - 0.25) * 3.0, 0.0, 1.0));
    col = mix(col, vec3(1.0, 0.7, 0.3), clamp((val - 0.6) * 4.0, 0.0, 1.0));
    
    // Subtle additive glow
    col += vec3(0.8, 0.3, 0.1) * pow(val, 2.0) * 0.5;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// --- Component ---

const SlimeMould: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [efficiency, setEfficiency] = useState(85);
  const [isInjecting, setIsInjecting] = useState(false);
  const foodNodesRef = useRef<THREE.Vector2[]>([]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    
    if (e.button === 0) {
      foodNodesRef.current.push(new THREE.Vector2(x, y));
      setIsInjecting(true);
      setTimeout(() => setIsInjecting(false), 200);
    } else {
      foodNodesRef.current = [];
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = 1024;
    const height = 1024;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Post-Processing ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(new THREE.Scene(), camera); // Scene will be set later
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.6, 0.4, 0.85
    );
    composer.addPass(bloomPass);

    // --- Textures ---
    const options = { 
      type: THREE.FloatType, 
      minFilter: THREE.LinearFilter, 
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat
    };
    
    // Agent Data [x, y, angle, 1]
    const size = 512; // 262,144 agents
    const initialData = new Float32Array(size * size * 4);
    for(let i=0; i<size*size; i++) {
        initialData[i*4] = Math.random();
        initialData[i*4+1] = Math.random();
        initialData[i*4+2] = Math.random() * Math.PI * 2;
        initialData[i*4+3] = 1.0;
    }
    const agentTex1 = new THREE.DataTexture(initialData, size, size, THREE.RGBAFormat, THREE.FloatType);
    agentTex1.needsUpdate = true;
    
    let agentRT1 = new THREE.WebGLRenderTarget(size, size, { ...options, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
    let agentRT2 = new THREE.WebGLRenderTarget(size, size, { ...options, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
    
    // Trail Map
    let trailRT1 = new THREE.WebGLRenderTarget(width, height, options);
    let trailRT2 = new THREE.WebGLRenderTarget(width, height, options);

    // --- Materials ---
    const agentUpdateMat = new THREE.ShaderMaterial({
      uniforms: {
        uAgentData: { value: agentTex1 },
        uTrailMap: { value: trailRT1.texture },
        uRes: { value: new THREE.Vector2(size, size) },
        uTime: { value: 0 },
        uSensorAngle: { value: 0.45 },
        uSensorDist: { value: 0.02 },
        uTurnSpeed: { value: 0.2 },
        uMoveSpeed: { value: 0.0025 }
      },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
      fragmentShader: agentUpdateShader
    });

    const trailUpdateMat = new THREE.ShaderMaterial({
      uniforms: {
        uTrailMap: { value: trailRT1.texture },
        uRes: { value: new THREE.Vector2(width, height) },
        uDecay: { value: 0.9 },
        uDiffuse: { value: 0.4 }
      },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
      fragmentShader: trailUpdateShader
    });

    // --- Interaction Points ---
    const foodGeo = new THREE.BufferGeometry();
    const foodPoints = new THREE.Points(foodGeo, new THREE.ShaderMaterial({
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); gl_PointSize = 20.0; }`,
      fragmentShader: `void main() { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }`,
      blending: THREE.AdditiveBlending,
      transparent: true
    }));

    // --- Agent Deposit Points ---
    const depositGeo = new THREE.BufferGeometry();
    const uvAttr = new THREE.BufferAttribute(new Float32Array(size * size * 2), 2);
    for(let i=0; i<size*size; i++) {
        uvAttr.setXY(i, (i % size) / size, Math.floor(i / size) / size);
    }
    depositGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(size * size * 3), 3));
    depositGeo.setAttribute('uv_agent', uvAttr);
    
    const depositShaderMat = new THREE.ShaderMaterial({
        uniforms: { uAgentData: { value: agentRT1.texture } },
        vertexShader: `
            uniform sampler2D uAgentData;
            attribute vec2 uv_agent;
            void main() {
                vec4 data = texture2D(uAgentData, uv_agent);
                gl_Position = vec4(data.xy * 2.0 - 1.0, 0.0, 1.0);
                gl_PointSize = 1.0;
            }
        `,
        fragmentShader: `void main() { gl_FragColor = vec4(0.1, 0.0, 0.0, 1.0); }`,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    const depositPoints = new THREE.Points(depositGeo, depositShaderMat);

    const renderMat = new THREE.ShaderMaterial({
      uniforms: { uTrailMap: { value: trailRT1.texture } },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
      fragmentShader: renderShader
    });

    const fullScreenQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), renderMat);
    const orthoScene = new THREE.Scene();
    orthoScene.add(fullScreenQuad);
    renderPass.scene = orthoScene;

    // --- Animation Loop ---
    let frame = 0;
    let animationId: number;
    const animate = (time: number) => {
      frame++;
      animationId = requestAnimationFrame(animate);

      // 1. Update Agents
      agentUpdateMat.uniforms.uAgentData.value = frame === 1 ? agentTex1 : agentRT1.texture;
      agentUpdateMat.uniforms.uTrailMap.value = trailRT1.texture;
      agentUpdateMat.uniforms.uTime.value = time * 0.001;
      renderer.setRenderTarget(agentRT2);
      orthoScene.overrideMaterial = agentUpdateMat;
      renderer.render(orthoScene, camera);
      orthoScene.overrideMaterial = null;
      [agentRT1, agentRT2] = [agentRT2, agentRT1];

      // 2. Deposit Agents + Food
      renderer.setRenderTarget(trailRT1);
      renderer.autoClear = false;
      depositShaderMat.uniforms.uAgentData.value = agentRT1.texture;
      renderer.render(depositPoints, camera);
      
      // Render food nodes
      if (foodNodesRef.current.length > 0) {
        const positions = new Float32Array(foodNodesRef.current.length * 3);
        foodNodesRef.current.forEach((n, i) => {
          positions[i*3] = n.x * 2.0 - 1.0;
          positions[i*3+1] = n.y * 2.0 - 1.0;
          positions[i*3+2] = 0;
        });
        foodGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        renderer.render(foodPoints, camera);
      }
      renderer.autoClear = true;

      // 3. Diffuse/Decay
      trailUpdateMat.uniforms.uTrailMap.value = trailRT1.texture;
      renderer.setRenderTarget(trailRT2);
      orthoScene.overrideMaterial = trailUpdateMat;
      renderer.render(orthoScene, camera);
      orthoScene.overrideMaterial = null;
      [trailRT1, trailRT2] = [trailRT2, trailRT1];

      // 4. Render to screen with Bloom
      renderMat.uniforms.uTrailMap.value = trailRT1.texture;
      renderer.setRenderTarget(null);
      composer.render();

      if (frame % 60 === 0) {
        setEfficiency(prev => Math.min(98, prev + (Math.random() * 0.5)));
      }
    };
    animate(0);

    const handleResize = () => {
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
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#020205] overflow-hidden selection:bg-amber-500/30"
      onPointerDown={handlePointerDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

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
              <div className="w-16 h-16 rounded-full border-2 border-amber-500/20 flex items-center justify-center backdrop-blur-xl">
                 <BrainCircuit className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-t-2 border-amber-400 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Slime Mould Intelligence</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.6em]">Physarum Polycephalum Optimization // Active</p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center space-x-3 text-white/40">
              <Scan size={14} />
              <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Agent Population: 262,144</span>
            </div>
            <div className="flex items-center space-x-3 text-white/40">
              <Globe size={14} />
              <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Environment: CYCLIC_TOPOLOGY</span>
            </div>
          </div>
        </div>

        {/* Interaction Prompt */}
        <AnimatePresence>
          {isInjecting && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
              <div className="flex flex-col items-center gap-4">
                 <div className="w-24 h-24 rounded-full border border-amber-500/30 flex items-center justify-center">
                    <Target className="text-amber-400 animate-ping" size={48} />
                 </div>
                 <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.5em]">Injecting Food Signal</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Optimization Telemetry */}
        <div className="flex justify-between items-end">
          {/* Left Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 w-96 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-400">
              <Activity size={80} />
            </div>
            
            <div className="flex items-center gap-3 text-amber-400 border-b border-white/10 pb-4">
               <Layers size={18} className="animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Network Telemetry</span>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-white/40">Network Efficiency</span>
                  <span className="text-amber-400">{efficiency.toFixed(1)}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${efficiency}%` }}
                    className="h-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" 
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-white/30 uppercase tracking-widest font-bold">
                 <MousePointer2 size={14} className="text-amber-500" />
                 <span>Left Click: Inject Food // Right Click: Clear</span>
              </div>
            </div>
          </motion.div>

          {/* Right Status */}
          <div className="flex flex-col gap-6 items-end">
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
              <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl">
                <Share2 size={16} />
              </button>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl flex gap-12 w-[30rem] relative overflow-hidden">
               <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Zap size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Emergent Behavior</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: "85%" }} 
                      className="h-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" 
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">Growth: OPTIMIZED_PATH_REINFORCEMENT</p>
               </div>
               <div className="w-px h-full bg-white/10" />
               <div className="flex-1 space-y-2 text-right">
                  <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Mode</span>
                  <p className="text-2xl text-white font-black italic">PH_SIM</p>
               </div>
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

export default SlimeMould;
