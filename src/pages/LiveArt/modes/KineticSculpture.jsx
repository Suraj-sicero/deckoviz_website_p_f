import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useLiveArt } from '../../../contexts/LiveArtContext';

function KineticSystem({ bodyCount = 10 }) {
  const { isPlaying, intensity, resetTrigger, isTVMode, isMouseIdle } = useLiveArt();
  const groupRef = useRef();

  const activeCount = Math.max(3, Math.floor(bodyCount * (0.2 + intensity * 0.8)));

  const bodies = useMemo(() => {
    const temp = [];
    for (let i = 0; i < bodyCount; i++) {
      temp.push({
        pos: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20),
        vel: new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2),
        mass: Math.random() * 5 + 1,
        color: new THREE.Color().setHSL(0.1 + Math.random() * 0.1, 0.8, 0.5),
        history: []
      });
    }
    return temp;
  }, [bodyCount, resetTrigger]);

  useFrame((state, delta) => {
    if (!isPlaying) return;
    
    // N-body physics calculation
    for (let i = 0; i < activeCount; i++) {
      const a = bodies[i];
      for (let j = 0; j < activeCount; j++) {
        if (i === j) continue;
        const b = bodies[j];
        const distSq = a.pos.distanceToSquared(b.pos);
        if (distSq > 1) { // soften gravity
          const force = 0.5 * (a.mass * b.mass) / distSq;
          const dir = b.pos.clone().sub(a.pos).normalize();
          a.vel.add(dir.multiplyScalar(force * delta));
        }
      }
    }

    // Update positions and trails
    for (let i = 0; i < activeCount; i++) {
      const b = bodies[i];
      b.pos.add(b.vel.clone().multiplyScalar(delta));
      
      b.history.push(b.pos.clone());
      if (b.history.length > 50) b.history.shift();
    }

    // Rotate camera slowly
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {bodies.slice(0, activeCount).map((b, i) => (
        <group key={i}>
          <mesh position={b.pos}>
            <octahedronGeometry args={[b.mass * 0.2]} />
            <meshStandardMaterial color={b.color} metalness={0.9} roughness={0.1} />
          </mesh>
          {b.history.length > 2 && (
            <Line
              points={b.history}
              color={b.color}
              lineWidth={2}
              transparent
              opacity={0.5}
            />
          )}
        </group>
      ))}
    </group>
  );
}

export default function KineticSculpture() {
  return (
    <Canvas camera={{ position: [0, 0, 30] }} style={{ background: '#020202' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
      <KineticSystem />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
