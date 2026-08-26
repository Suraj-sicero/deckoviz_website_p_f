import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useLiveArt } from '../../../contexts/LiveArtContext';

function GardenParticles({ count = 5000 }) {
  const { isPlaying, intensity, resetTrigger, isTVMode, isMouseIdle } = useLiveArt();
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { mouse } = useThree();

  const activeCount = Math.floor(count * (0.3 + intensity * 0.7));

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 10),
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        targetScale: Math.random() * 0.5 + 0.1,
        color: new THREE.Color().setHSL(0.3 + Math.random() * 0.2, 0.8, 0.5)
      });
    }
    return temp;
  }, [count, resetTrigger]);

  const colorArray = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      particles[i].color.toArray(arr, i * 3);
    }
    return arr;
  }, [particles, count]);

  useFrame((state) => {
    if (!isPlaying) return;
    const time = state.clock.elapsedTime;
    const mouseVec = new THREE.Vector3(mouse.x * 15, mouse.y * 15, 0);

    for (let i = 0; i < activeCount; i++) {
      const p = particles[i];
      p.phase += p.speed * (0.5 + intensity * 2.0);
      
      const mouseDist = p.position.distanceTo(mouseVec);
      let s = p.targetScale * (0.5 + Math.sin(p.phase) * 0.5);
      
      // Bloom near mouse
      if (mouseDist < 5) {
        s += (5 - mouseDist) * 0.2;
      }
      
      // Drift upwards like pollen
      p.position.y += p.speed * intensity * 5;
      if (p.position.y > 15) p.position.y = -15;

      dummy.position.copy(p.position);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.count = activeCount;
    
    state.camera.position.z = 20 + Math.sin(time * 0.1) * 5;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <icosahedronGeometry args={[0.2, 0]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </icosahedronGeometry>
      <meshBasicMaterial vertexColors transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

export default function DigitalGarden() {
  return (
    <Canvas camera={{ position: [0, 0, 20] }} style={{ background: '#020a05' }}>
      <GardenParticles />
    </Canvas>
  );
}
