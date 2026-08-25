import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

// For performance, we'll use a CPU-driven InstancedMesh 
// guided by 3D Simplex noise to create emergent flocking behavior.

const NUM_ORGANISMS = 2000;

function Swarm() {
  const meshRef = useRef();
  const noise3D = useMemo(() => createNoise3D(), []);

  // Use a ref for state so we don't trigger re-renders
  const swarmData = useMemo(() => {
    const data = [];
    for (let i = 0; i < NUM_ORGANISMS; i++) {
      data.push({
        position: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20),
        velocity: new THREE.Vector3(0, 0, 0),
        seed: Math.random() * 1000,
        speed: 0.02 + Math.random() * 0.03,
        scale: Math.random() * 0.5 + 0.1,
        color: new THREE.Color().setHSL(0.3 + Math.random() * 0.2, 0.8, 0.6) // Greens and Cyans
      });
    }
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorArray = useMemo(() => new Float32Array(NUM_ORGANISMS * 3), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < NUM_ORGANISMS; i++) {
      const p = swarmData[i];
      
      // Calculate noise-based force field (curl-like)
      const nx = noise3D(p.position.x * 0.1, p.position.y * 0.1, time * 0.1 + p.seed);
      const ny = noise3D(p.position.y * 0.1, p.position.z * 0.1, time * 0.1 + p.seed);
      const nz = noise3D(p.position.z * 0.1, p.position.x * 0.1, time * 0.1 + p.seed);
      
      const force = new THREE.Vector3(nx, ny, nz);
      
      // Central attraction to keep them in view
      const centerAttraction = new THREE.Vector3().copy(p.position).multiplyScalar(-0.01);
      force.add(centerAttraction);

      // Apply forces to velocity
      p.velocity.add(force.multiplyScalar(0.01));
      
      // Limit speed
      if (p.velocity.length() > p.speed) {
        p.velocity.setLength(p.speed);
      }
      
      // Update position
      p.position.add(p.velocity);

      // Update dummy matrix
      dummy.position.copy(p.position);
      
      // Look along the velocity vector
      const target = p.position.clone().add(p.velocity);
      dummy.lookAt(target);
      
      // Pulse scale slightly
      const pulse = Math.sin(time * 2.0 + p.seed) * 0.2 + 1.0;
      dummy.scale.setScalar(p.scale * pulse);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Pulse color
      const pulseColor = p.color.clone();
      const intensity = Math.pow(Math.sin(time * 3.0 + p.seed) * 0.5 + 0.5, 2.0);
      pulseColor.multiplyScalar(0.5 + intensity * 1.5);
      colorArray[i * 3] = pulseColor.r;
      colorArray[i * 3 + 1] = pulseColor.g;
      colorArray[i * 3 + 2] = pulseColor.b;
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.geometry.attributes.color.needsUpdate = true;
    
    // Slow camera rotation
    state.camera.position.x = Math.sin(time * 0.1) * 15;
    state.camera.position.z = Math.cos(time * 0.1) * 15;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, NUM_ORGANISMS]}>
      {/* 4-sided pyramid / tetrahedron acts like a seed/organism */}
      <tetrahedronGeometry args={[0.2, 0]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </tetrahedronGeometry>
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  );
}

// Background environment structures (large slow glowing roots/tendrils)
function Tendrils() {
  const lines = useMemo(() => {
    const arr = [];
    for(let i=0; i<5; i++) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3((Math.random()-0.5)*20, -15, (Math.random()-0.5)*20),
        new THREE.Vector3((Math.random()-0.5)*10, -5, (Math.random()-0.5)*10),
        new THREE.Vector3((Math.random()-0.5)*10, 5, (Math.random()-0.5)*10),
        new THREE.Vector3((Math.random()-0.5)*20, 15, (Math.random()-0.5)*20),
      ]);
      const geo = new THREE.TubeGeometry(curve, 64, Math.random() * 0.5 + 0.1, 8, false);
      arr.push(geo);
    }
    return arr;
  }, []);

  return (
    <group>
      {lines.map((geo, idx) => (
        <mesh key={idx} geometry={geo}>
          <meshBasicMaterial color="#001105" transparent opacity={0.3} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

export default function DigitalLife({ isFrameMode }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#000502' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }} dpr={[1, 2]}>
        <color attach="background" args={['#000502']} />
        <fog attach="fog" args={['#000502', 10, 25]} />
        
        <Tendrils />
        <Swarm />

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
