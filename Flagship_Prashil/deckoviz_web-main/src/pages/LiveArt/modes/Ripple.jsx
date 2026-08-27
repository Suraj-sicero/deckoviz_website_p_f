import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useLiveArt } from '../../../contexts/LiveArtContext';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  
  const int MAX_RIPPLES = 10;
  uniform vec3 uRipples[MAX_RIPPLES];

  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); 
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uResolution.x / uResolution.y;

    float noise = snoise(uv * 3.0 + uTime * 0.1) * 0.5 + 0.5;
    vec3 color = mix(vec3(0.02, 0.04, 0.06), vec3(0.05, 0.1, 0.15), noise);

    float rippleInfluence = 0.0;
    for(int i = 0; i < MAX_RIPPLES; i++) {
      vec3 r = uRipples[i];
      if(r.z > 0.0) {
        float age = uTime - r.z;
        if(age < 5.0) {
          vec2 rPos = r.xy;
          rPos.x *= uResolution.x / uResolution.y;
          float dist = distance(uv, rPos);
          float ring = sin(dist * 40.0 - age * 15.0);
          float decay = smoothstep(5.0, 0.0, age) * smoothstep(1.5, 0.0, dist);
          rippleInfluence += max(0.0, ring * decay * 0.5);
        }
      }
    }

    color += vec3(0.2, 0.6, 0.8) * rippleInfluence;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function RippleCanvas() {
  const mesh = useRef();
  const { size } = useThree();
  const { isPlaying, intensity, resetTrigger, isTVMode, isMouseIdle } = useLiveArt();
  
  const MAX_RIPPLES = 10;
  const [ripples] = useState(() => Array(MAX_RIPPLES).fill().map(() => new THREE.Vector3(0, 0, -1)));
  const rippleIndex = useRef(0);
  const lastMouse = useRef(new THREE.Vector2());
  const lastSpawnTime = useRef(0);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uRipples: { value: ripples }
  }), [ripples]);

  const handlePointerMove = (e) => {
    if (!isPlaying) return;
    const mx = e.uv.x;
    const my = e.uv.y;
    
    const dist = lastMouse.current.distanceTo(new THREE.Vector2(mx, my));
    if (dist > 0.05) {
      lastMouse.current.set(mx, my);
      const time = mesh.current.material.uniforms.uTime.value;
      ripples[rippleIndex.current].set(mx, my, time);
      rippleIndex.current = (rippleIndex.current + 1) % MAX_RIPPLES;
      lastSpawnTime.current = time;
    }
  };

  useFrame((state) => {
    if (!isPlaying) return;
    if (mesh.current) {
      const time = state.clock.elapsedTime + (resetTrigger * 10);
      mesh.current.material.uniforms.uTime.value = time * (0.5 + intensity * 0.5);
      mesh.current.material.uniforms.uResolution.value.set(size.width, size.height);
      
      // Auto-pilot: spawn ripples if idle
      if (time - lastSpawnTime.current > 1.0) {
        const fakeX = 0.5 + Math.sin(time * 0.5) * 0.3;
        const fakeY = 0.5 + Math.cos(time * 0.7) * 0.3;
        ripples[rippleIndex.current].set(fakeX, fakeY, time);
        rippleIndex.current = (rippleIndex.current + 1) % MAX_RIPPLES;
        lastSpawnTime.current = time;
      }
    }
  });

  return (
    <mesh ref={mesh} onPointerMove={handlePointerMove}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Ripple() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#000' }}>
      <Canvas orthographic camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <RippleCanvas />
      </Canvas>
    </div>
  );
}
