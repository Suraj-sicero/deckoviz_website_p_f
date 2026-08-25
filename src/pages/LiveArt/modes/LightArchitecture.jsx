import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import * as THREE from 'three';
import { useLiveArt } from '../../../contexts/LiveArtContext';

function Architecture() {
  const { isPlaying, intensity, isTVMode, isMouseIdle } = useLiveArt();
  const groupRef = useRef();
  
  const blocks = useMemo(() => {
    const temp = [];
    for(let i=0; i<100; i++) {
      temp.push({
        pos: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40
        ],
        scale: [
          Math.random() * 2 + 1,
          Math.random() * 20 + 2,
          Math.random() * 2 + 1
        ],
        color: new THREE.Color().setHSL(0.6 + Math.random() * 0.1, 0.8, 0.5),
        speed: Math.random() * 0.02
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!isPlaying) return;
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05 * (0.5 + intensity);
      groupRef.current.rotation.x = Math.sin(time * 0.02) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {blocks.map((b, i) => (
        <Box key={i} position={b.pos} scale={b.scale}>
          <meshStandardMaterial 
            color={b.color} 
            transparent 
            opacity={0.3 + intensity * 0.4}
            roughness={0.1}
            metalness={0.8}
          />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
            <lineBasicMaterial color={b.color} linewidth={2} />
          </lineSegments>
        </Box>
      ))}
    </group>
  );
}

export default function LightArchitecture() {
  return (
    <Canvas camera={{ position: [0, 0, 50], fov: 75 }} style={{ background: '#050505' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" distance={100} />
      <Architecture />
      <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} />
    </Canvas>
  );
}
