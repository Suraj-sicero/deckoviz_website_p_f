import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useLiveArt } from '../../../contexts/LiveArtContext';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
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

  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 6; ++i) {
      v += a * snoise(x);
      x = rot * x * 2.0 + vec2(100.0);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uResolution.x / uResolution.y;
    vec2 mouse = uMouse;
    mouse.x *= uResolution.x / uResolution.y;
    
    vec2 q = vec2(0.);
    q.x = fbm(uv + 0.01 * uTime);
    q.y = fbm(uv + vec2(1.0));
    
    float dist = distance(uv, mouse);
    if(dist < 0.3) {
      q += normalize(uv - mouse) * (0.3 - dist);
    }

    vec2 r = vec2(0.);
    r.x = fbm(uv + 1.0 * q + vec2(1.7, 9.2) + 0.05 * uTime);
    r.y = fbm(uv + 1.0 * q + vec2(8.3, 2.8) + 0.05 * uTime);

    float f = fbm(uv + r * 2.0);

    vec3 color = mix(vec3(0.01, 0.02, 0.05), vec3(0.1, 0.3, 0.6), f);
    color = mix(color, vec3(0.9, 0.9, 0.95), clamp(length(q) * f, 0.0, 1.0));
    color = mix(color, vec3(0.1, 0.6, 0.8), clamp(length(r.x), 0.0, 1.0));
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function FluidPlane() {
  const mesh = useRef();
  const { size, viewport, pointer } = useThree();
  const { isPlaying, intensity, resetTrigger, isTVMode, isMouseIdle } = useLiveArt();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) }
  }), []);

  useFrame((state) => {
    if (!isPlaying) return;
    if (mesh.current) {
      const time = state.clock.elapsedTime + (resetTrigger * 10);
      mesh.current.material.uniforms.uTime.value = time * (0.1 + intensity * 0.9);
      mesh.current.material.uniforms.uResolution.value.set(size.width, size.height);
      
      const isMouseActive = !isTVMode && !isMouseIdle;
      const fakeX = Math.sin(time * 0.5) * 0.8;
      const fakeY = Math.cos(time * 0.3) * 0.8;
      
      const targetX = isMouseActive ? pointer.x : fakeX;
      const targetY = isMouseActive ? pointer.y : fakeY;
      
      const currentMouseX = (targetX + 1) / 2;
      const currentMouseY = (targetY + 1) / 2;
      
      mesh.current.material.uniforms.uMouse.value.x += (currentMouseX - mesh.current.material.uniforms.uMouse.value.x) * 0.1;
      mesh.current.material.uniforms.uMouse.value.y += (currentMouseY - mesh.current.material.uniforms.uMouse.value.y) * 0.1;
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function InkTide() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#000' }}>
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} dpr={[1, 2]}>
        <FluidPlane />
      </Canvas>
    </div>
  );
}
