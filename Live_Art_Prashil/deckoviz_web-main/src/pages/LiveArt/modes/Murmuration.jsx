import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import { useLiveArt } from '../../../contexts/LiveArtContext';

const NUM_BIRDS = 6000;

function Flock() {
  const meshRef = useRef();
  const noise3D = useMemo(() => createNoise3D(), []);
  const { isPlaying, intensity, resetTrigger, isTVMode, isMouseIdle } = useLiveArt();

  const activeCount = Math.floor(NUM_BIRDS * (0.2 + intensity * 0.8));

  const flockData = useMemo(() => {
    const data = [];
    for (let i = 0; i < NUM_BIRDS; i++) {
      data.push({
        position: new THREE.Vector3((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40),
        velocity: new THREE.Vector3(0, 0, 0),
        speed: 0.1 + Math.random() * 0.1,
        seed: Math.random() * 100
      });
    }
    return data;
  }, [resetTrigger]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!isPlaying) return;
    const time = state.clock.elapsedTime;
    
    // Auto-pilot attractor
    const isMouseActive = !isTVMode && !isMouseIdle;
    const targetX = isMouseActive ? state.pointer.x * 20 : Math.sin(time * 0.5) * 15;
    const targetY = isMouseActive ? state.pointer.y * 20 : Math.sin(time * 1.0) * 10;
    const targetZ = isMouseActive ? 0 : Math.cos(time * 0.5) * 15;
    
    const attractor = new THREE.Vector3(targetX, targetY, targetZ);

    for (let i = 0; i < activeCount; i++) {
      const b = flockData[i];
      
      const nx = noise3D(b.position.x * 0.05, b.position.y * 0.05, time * 0.2 + b.seed);
      const ny = noise3D(b.position.y * 0.05, b.position.z * 0.05, time * 0.2 + b.seed);
      const nz = noise3D(b.position.z * 0.05, b.position.x * 0.05, time * 0.2 + b.seed);
      
      const noiseForce = new THREE.Vector3(nx, ny, nz).multiplyScalar(0.05);
      
      const dirToAttractor = new THREE.Vector3().subVectors(attractor, b.position);
      const dist = dirToAttractor.length();
      dirToAttractor.normalize().multiplyScalar(0.02 * Math.min(dist, 10));
      
      b.velocity.add(noiseForce).add(dirToAttractor);
      
      if (b.velocity.length() > b.speed) {
        b.velocity.setLength(b.speed);
      }
      
      b.position.add(b.velocity);
      
      dummy.position.copy(b.position);
      dummy.scale.setScalar(0.05);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.count = activeCount;
    
    state.camera.position.x = Math.sin(time * 0.1) * 30;
    state.camera.position.z = Math.cos(time * 0.1) * 30;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, NUM_BIRDS]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#aaddff" />
    </instancedMesh>
  );
}

export default function Murmuration() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#020508' }}>
      <Canvas camera={{ position: [0, 0, 40], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={['#020508']} />
        <fog attach="fog" args={['#020508', 20, 60]} />
        <Flock />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.1} mipmapBlur intensity={3.0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
