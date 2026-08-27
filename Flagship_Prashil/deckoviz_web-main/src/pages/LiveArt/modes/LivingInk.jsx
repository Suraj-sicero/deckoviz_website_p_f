import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLiveArt } from '../../../contexts/LiveArtContext';

const fluidVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fluidFragmentShader = `
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  // Mod noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); 
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * (0.2 + uIntensity * 0.8);
    
    // FBM for fluid-like diffusion
    float n1 = snoise(uv * 3.0 + vec2(time * 0.1, time * 0.15));
    float n2 = snoise(uv * 6.0 - vec2(time * 0.2, -time * 0.1) + n1);
    float n3 = snoise(uv * 12.0 + vec2(-time * 0.3, time * 0.2) + n2);
    
    float f = (n1 + 0.5 * n2 + 0.25 * n3) / 1.75;
    
    // Living Ink Color Palette (Deep blues, purples, and gold)
    vec3 col1 = vec3(0.05, 0.0, 0.2);
    vec3 col2 = vec3(0.4, 0.1, 0.5);
    vec3 col3 = vec3(1.0, 0.8, 0.2);
    
    vec3 finalColor = mix(col1, col2, smoothstep(-0.5, 0.5, f));
    finalColor = mix(finalColor, col3, smoothstep(0.3, 0.8, f));
    
    // Edge darkening for depth
    float dist = distance(uv, vec2(0.5));
    finalColor *= smoothstep(0.8, 0.2, dist);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function FluidCanvas() {
  const { isPlaying, intensity, resetTrigger, isTVMode, isMouseIdle } = useLiveArt();
  const materialRef = useRef();

  useFrame((state) => {
    if (!isPlaying) return;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime + (resetTrigger * 10);
      materialRef.current.uniforms.uIntensity.value = intensity;
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIntensity: { value: 0.5 }
  }), []);

  return (
    <mesh>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={fluidVertexShader}
        fragmentShader={fluidFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function LivingInk() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <FluidCanvas />
    </Canvas>
  );
}
