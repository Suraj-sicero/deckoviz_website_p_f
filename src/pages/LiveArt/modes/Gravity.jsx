import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useLiveArt } from '../../../contexts/LiveArtContext';

const NUM_PARTICLES = 35000;

// Glowing Ether Background Shader
const etherVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const etherFragmentShader = `
  uniform float uTime;
  uniform int uStyle;
  varying vec2 vUv;
  
  float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
  float noise(vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 3; ++i) { 
      v += a * noise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv * 1.5;
    float t = uTime * 0.03;
    
    float q = fbm(uv + t);
    float f = fbm(uv + q + vec2(1.7, 9.2) + 0.1 * t);
    
    vec3 color;
    if (uStyle == 0) { // Stellar (Warm)
        color = mix(vec3(0.02, 0.0, 0.0), vec3(0.2, 0.05, 0.0), f * 1.2);
    } else if (uStyle == 1) { // Constellation (Cool)
        color = mix(vec3(0.0, 0.01, 0.03), vec3(0.0, 0.1, 0.25), f * 1.2);
    } else { // Quantum (Neon)
        color = mix(vec3(0.01, 0.0, 0.03), vec3(0.15, 0.0, 0.25), f * 1.2);
    }
    
    color *= smoothstep(0.1, 0.9, f);
    gl_FragColor = vec4(color, 1.0);
  }
`;

function EtherBackground({ style }) {
  const meshRef = useRef();
  const uniforms = useMemo(() => ({ 
      uTime: { value: 0 },
      uStyle: { value: style }
  }), [style]);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, -50]} scale={[1000, 1000, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial 
        vertexShader={etherVertexShader} 
        fragmentShader={etherFragmentShader} 
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

// Custom Point Material for Soft Glowing Dust
const pointVertexShader = `
  attribute vec3 customColor;
  varying vec3 vColor;
  void main() {
    vColor = customColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 20.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const pointFragmentShader = `
  varying vec3 vColor;
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Soft radial gradient for a glowing orb effect
    float alpha = smoothstep(0.5, 0.1, dist);
    gl_FragColor = vec4(vColor, alpha * 0.9);
  }
`;

function FluidNebulaSimulation() {
  const pointsRef = useRef();
  const { isPlaying, intensity, resetTrigger, isTVMode, isMouseIdle, activeStyle } = useLiveArt();
  const style = activeStyle || 0;

  // Use flat typed arrays for maximum performance in JavaScript
  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(NUM_PARTICLES * 3);
    const vel = new Float32Array(NUM_PARTICLES * 3);
    const col = new Float32Array(NUM_PARTICLES * 3);
    
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const i3 = i * 3;
      // Initialize in a massive spherical cloud
      const r = Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);
      
      vel[i3] = (Math.random() - 0.5) * 0.1;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.1;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.1;
      
      col[i3] = 1; col[i3 + 1] = 1; col[i3 + 2] = 1;
    }
    return { positions: pos, velocities: vel, colors: col };
  }, [resetTrigger]);

  useFrame((state) => {
    if (!isPlaying || !pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    const isMouseActive = !isTVMode && !isMouseIdle;
    
    // The supermassive gravity well
    const targetX = isMouseActive ? state.pointer.x * 20 : Math.sin(time * 0.3) * 15;
    const targetY = isMouseActive ? state.pointer.y * 20 : Math.cos(time * 0.2) * 15;
    
    // Scale physics based on user intensity slider
    const activeCount = Math.floor(NUM_PARTICLES * (0.2 + intensity * 0.8));
    
    // Style-specific fluid dynamics
    let gravityStrength = 0.05;
    let drag = 0.96;
    let swirl = 0.08;
    
    if (style === 1) { // Constellation Web (Smooth, heavy accretion)
        gravityStrength = 0.08;
        drag = 0.94;
        swirl = 0.03;
    } else if (style === 2) { // Quantum Crystals (Volatile, explosive)
        gravityStrength = 0.02;
        drag = 0.98;
        swirl = 0.15;
    } else if (style === 3) { // Original (Calm, traditional)
        gravityStrength = 0.04;
        drag = 0.97;
        swirl = 0.05;
    }
    
    const positionsAttr = pointsRef.current.geometry.attributes.position.array;
    const velocitiesAttr = velocities;
    const colorsAttr = pointsRef.current.geometry.attributes.customColor.array;
    
    for (let i = 0; i < activeCount; i++) {
        const i3 = i * 3;
        const px = positionsAttr[i3];
        const py = positionsAttr[i3 + 1];
        const pz = positionsAttr[i3 + 2];
        
        let vx = velocitiesAttr[i3];
        let vy = velocitiesAttr[i3 + 1];
        let vz = velocitiesAttr[i3 + 2];
        
        // Vector to the gravity well
        const dx = targetX - px;
        const dy = targetY - py;
        const dz = 0 - pz;
        const distSq = dx*dx + dy*dy + dz*dz + 2.0; // Softening parameter prevents infinite gravity at core
        const dist = Math.sqrt(distSq);
        
        // Apply Gravity Force
        const force = gravityStrength / distSq;
        vx += (dx / dist) * force * 150.0;
        vy += (dy / dist) * force * 150.0;
        vz += (dz / dist) * force * 150.0;
        
        // Apply Fluid Swirl (Cheap 3D Curl Noise approximation)
        const curlX = Math.sin(py * 0.2 + time) * swirl;
        const curlY = Math.cos(px * 0.2 + time) * swirl;
        const curlZ = Math.sin((px + py) * 0.1) * swirl;
        
        vx += curlX;
        vy += curlY;
        vz += curlZ;
        
        // Apply Drag (simulating fluid viscosity)
        vx *= drag;
        vy *= drag;
        vz *= drag;
        
        velocitiesAttr[i3] = vx;
        velocitiesAttr[i3 + 1] = vy;
        velocitiesAttr[i3 + 2] = vz;
        
        positionsAttr[i3] += vx;
        positionsAttr[i3 + 1] += vy;
        positionsAttr[i3 + 2] += vz;
        
        // Velocity-based Dynamic Coloring
        const speedSq = vx*vx + vy*vy + vz*vz;
        let r, g, b;
        
        if (style === 0) { // Stellar Dust (Deep Red -> Bright Yellow)
            r = 0.2 + speedSq * 1.5; 
            g = 0.0 + speedSq * 0.8; 
            b = 0.0;
        } else if (style === 1) { // Constellation Web (Deep Blue -> Bright Cyan)
            r = 0.0 + speedSq * 0.2; 
            g = 0.1 + speedSq * 0.6; 
            b = 0.4 + speedSq * 1.2;
        } else if (style === 2) { // Quantum Crystals (Deep Purple -> Hot Pink)
            r = 0.1 + speedSq * 1.2; 
            g = 0.0 + speedSq * 0.2; 
            b = 0.3 + speedSq * 1.2;
        } else { // Original Gravity (Monochrome Cyan)
            r = 0.0; 
            g = 0.6 + speedSq * 0.5; 
            b = 0.8 + speedSq * 0.5;
        }
        
        // Cap colors beautifully to prevent blowout
        colorsAttr[i3] = Math.min(1.0, r);
        colorsAttr[i3 + 1] = Math.min(1.0, g);
        colorsAttr[i3 + 2] = Math.min(1.0, b);
    }
    
    // Tell R3F that the buffer data has changed
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.customColor.needsUpdate = true;
    pointsRef.current.geometry.setDrawRange(0, activeCount);
    
    // Slow cinematic camera drift
    state.camera.position.x = Math.sin(time * 0.1) * 20;
    state.camera.position.z = Math.cos(time * 0.1) * 20;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {style !== 3 && <EtherBackground style={style} />}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={NUM_PARTICLES} array={positions} itemSize={3} usage={THREE.DynamicDrawUsage} />
          <bufferAttribute attach="attributes-customColor" count={NUM_PARTICLES} array={colors} itemSize={3} usage={THREE.DynamicDrawUsage} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={pointVertexShader}
          fragmentShader={pointFragmentShader}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

// Geometric Web Overlay for Style 1
function ConstellationOverlay() {
  const NUM_NODES = 100;
  const MAX_LINES = NUM_NODES * 4;
  
  const linesRef = useRef();
  const { isPlaying, isTVMode, isMouseIdle } = useLiveArt();
  
  const nodes = useMemo(() => {
    return Array(NUM_NODES).fill().map(() => ({
      position: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20),
      velocity: new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1)
    }));
  }, []);
  
  const linePositions = useMemo(() => new Float32Array(MAX_LINES * 2 * 3), []);
  const lineColors = useMemo(() => new Float32Array(MAX_LINES * 2 * 3), []);

  useFrame((state) => {
    if (!isPlaying) return;
    
    const time = state.clock.elapsedTime;
    const isMouseActive = !isTVMode && !isMouseIdle;
    const targetX = isMouseActive ? state.pointer.x * 20 : Math.sin(time * 0.3) * 15;
    const targetY = isMouseActive ? state.pointer.y * 20 : Math.cos(time * 0.2) * 15;
    
    let lineIndex = 0;
    
    for (let i = 0; i < NUM_NODES; i++) {
      const p = nodes[i];
      
      const dx = targetX - p.position.x;
      const dy = targetY - p.position.y;
      const dz = 0 - p.position.z;
      const distSq = dx*dx + dy*dy + dz*dz + 1.0;
      
      const force = 0.05 / distSq;
      p.velocity.x += (dx / Math.sqrt(distSq)) * force * 50.0;
      p.velocity.y += (dy / Math.sqrt(distSq)) * force * 50.0;
      p.velocity.z += (dz / Math.sqrt(distSq)) * force * 50.0;
      
      // Swirl
      p.velocity.x += Math.sin(p.position.y * 0.2 + time) * 0.05;
      p.velocity.y += Math.cos(p.position.x * 0.2 + time) * 0.05;
      
      p.velocity.multiplyScalar(0.95); // Drag
      p.position.add(p.velocity);
      
      // Draw connecting lines
      for (let j = i + 1; j < NUM_NODES; j++) {
        const dist = p.position.distanceToSquared(nodes[j].position);
        if (dist < 25.0 && lineIndex < MAX_LINES) {
          linePositions[lineIndex * 6 + 0] = p.position.x;
          linePositions[lineIndex * 6 + 1] = p.position.y;
          linePositions[lineIndex * 6 + 2] = p.position.z;
          linePositions[lineIndex * 6 + 3] = nodes[j].position.x;
          linePositions[lineIndex * 6 + 4] = nodes[j].position.y;
          linePositions[lineIndex * 6 + 5] = nodes[j].position.z;
          
          const intensity = (1.0 - (dist / 25.0)) * 1.5;
          // Cyan glowing web
          lineColors[lineIndex * 6 + 0] = 0.0 * intensity;
          lineColors[lineIndex * 6 + 1] = 0.6 * intensity;
          lineColors[lineIndex * 6 + 2] = 1.0 * intensity;
          lineColors[lineIndex * 6 + 3] = 0.0 * intensity;
          lineColors[lineIndex * 6 + 4] = 0.6 * intensity;
          lineColors[lineIndex * 6 + 5] = 1.0 * intensity;
          
          lineIndex++;
        }
      }
    }
    
    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[linePositions, 3]} usage={THREE.DynamicDrawUsage} />
        <bufferAttribute attach="attributes-color" args={[lineColors, 3]} usage={THREE.DynamicDrawUsage} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
    </lineSegments>
  );
}

export default function Gravity() {
  const { activeStyle } = useLiveArt();
  const style = activeStyle || 0;
  
  return (
    <div style={{ width: '100%', height: '100%', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }} dpr={1}>
        <color attach="background" args={['#000']} />
        <FluidNebulaSimulation />
        {style === 1 && <ConstellationOverlay />}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={2.0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
