import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLiveArt } from '../../../contexts/LiveArtContext';

function Ribbon({ index, count, intensity, isPlaying }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (!isPlaying) return;
    const time = state.clock.elapsedTime;
    const offset = index * 0.1;
    const speed = 0.5 + intensity * 1.5;
    
    meshRef.current.position.y = Math.sin(time * speed + offset) * 2;
    meshRef.current.rotation.x = Math.sin(time * speed * 0.5 + offset) * 0.5;
    meshRef.current.rotation.z = Math.cos(time * speed * 0.3 + offset) * 0.5;
    
    // Pulse scale based on intensity
    const s = 1 + Math.sin(time * 2 + offset) * 0.1 * intensity;
    meshRef.current.scale.set(1, s, 1);
  });

  const opacity = 0.1 + (1 - index/count) * 0.2;
  const color = new THREE.Color().setHSL(0.5 + (index/count) * 0.2, 1, 0.6);

  return (
    <mesh ref={meshRef} position={[0, 0, -index * 1.5]}>
      <planeGeometry args={[40, 5, 32, 8]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={opacity} 
        blending={THREE.AdditiveBlending} 
        side={THREE.DoubleSide} 
        wireframe={index % 3 === 0}
      />
    </mesh>
  );
}

export default function AuroraField() {
  const { isPlaying, intensity, isTVMode, isMouseIdle } = useLiveArt();
  const ribbonCount = 20;

  return (
    <Canvas camera={{ position: [0, -5, 10], fov: 60 }} style={{ background: '#000510' }}>
      <ambientLight />
      <group rotation={[-Math.PI/6, 0, 0]}>
        {Array.from({ length: ribbonCount }).map((_, i) => (
          <Ribbon key={i} index={i} count={ribbonCount} intensity={intensity} isPlaying={isPlaying} />
        ))}
      </group>
    </Canvas>
  );
}
