import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLiveArt } from '../../../contexts/LiveArtContext';

const bioVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const bioFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    vec2 p = -1.0 + 2.0 * vUv;
    p.x *= 1.5;
    vec2 m = -1.0 + 2.0 * uMouse;
    m.x *= 1.5;

    float t = uTime * (0.2 + uIntensity);
    
    // Distort space
    p.x += sin(p.y * 5.0 + t) * 0.1;
    p.y += cos(p.x * 5.0 + t) * 0.1;
    
    float distToMouse = length(p - m);
    float glow = 0.05 / (distToMouse + 0.01);
    
    float rings = sin(distToMouse * 20.0 - t * 5.0);
    rings = smoothstep(0.8, 1.0, rings) * glow;
    
    vec3 color = vec3(0.0, 0.05, 0.1); // Deep ocean
    vec3 biolum = vec3(0.1, 0.9, 0.8) * rings;
    
    // Ambient noise fields
    float ambient = sin(p.x * 10.0 + t) * cos(p.y * 10.0 - t) * 0.02;
    biolum += vec3(0.0, 0.2, 0.4) * max(0.0, ambient);
    
    gl_FragColor = vec4(color + biolum, 1.0);
  }
`;

function BioCanvas() {
  const { isPlaying, intensity, resetTrigger, isTVMode, isMouseIdle } = useLiveArt();
  const materialRef = useRef();

  useFrame((state) => {
    if (!isPlaying) return;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime + (resetTrigger * 5);
      materialRef.current.uniforms.uIntensity.value = intensity;
      
      const mx = state.mouse.x;
      const my = state.mouse.y;
      materialRef.current.uniforms.uMouse.value.set((mx + 1) / 2, (my + 1) / 2);
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uIntensity: { value: 0.5 }
  }), []);

  return (
    <mesh>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={bioVertexShader}
        fragmentShader={bioFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function OceanicBioluminescence() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} style={{ background: '#000205' }}>
      <BioCanvas />
    </Canvas>
  );
}
