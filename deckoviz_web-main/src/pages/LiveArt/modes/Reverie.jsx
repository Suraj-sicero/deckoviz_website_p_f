import React, { useRef, useMemo, useState, useEffect } from 'react';
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
  uniform vec2 uMouse;
  uniform int uStyle;
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
    for (int i = 0; i < 5; ++i) {
      v += a * snoise(x);
      x = rot * x * 2.0 + vec2(100.0);
      a *= 0.5;
    }
    return v;
  }

  // Helper to shift hue over time so it dynamically evolves
  vec3 hueShift(vec3 color, float hueAdjust) {
    const vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(hueAdjust);
    return vec3(color * cosAngle + cross(k, color) * sin(hueAdjust) + k * dot(k, color) * (1.0 - cosAngle));
  }

  vec3 getFluidColor(float t) {
      vec3 col1 = vec3(1.0, 0.0, 0.6); // Neon Pink
      vec3 col2 = vec3(0.0, 1.0, 0.8); // Cyan / Teal
      vec3 col3 = vec3(0.4, 0.0, 1.0); // Deep Purple
      vec3 col4 = vec3(1.0, 0.8, 0.0); // Bright Orange/Gold
      
      t = fract(t);
      if (t < 0.25) return mix(col4, col1, t * 4.0);
      if (t < 0.50) return mix(col1, col2, (t - 0.25) * 4.0);
      if (t < 0.75) return mix(col2, col3, (t - 0.50) * 4.0);
      return mix(col3, col4, (t - 0.75) * 4.0);
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.05;
    vec2 m = uMouse;
    m.x *= uResolution.x / uResolution.y;
    
    vec3 finalColor = vec3(0.0);

    if (uStyle == 1) { 
        // Style 1: Topographical / Contour lines
        uv *= 2.5; 
        t = uTime * 0.15;
        m *= 2.5;
        float dist = distance(uv, m);
        vec2 warp = normalize(uv - m) * smoothstep(1.5, 0.0, dist) * 0.5;
        
        vec2 q = vec2(0.);
        q.x = fbm(uv + t + warp);
        q.y = fbm(uv + vec2(1.0) - t - warp);
        
        vec2 r = vec2(0.);
        r.x = fbm(uv + 1.0 * q + vec2(1.7, 9.2) + 0.1 * t);
        r.y = fbm(uv + 1.0 * q + vec2(8.3, 2.8) + 0.1 * t);

        float f = fbm(uv + r * 1.5 + t);

        finalColor = getFluidColor(f * 1.2 + t * 0.3 + length(q) * 0.3);
        float contour = sin((f + length(r)) * 50.0) * 0.5 + 0.5;
        finalColor += vec3(1.0) * smoothstep(0.92, 1.0, contour) * 0.6;
        finalColor -= vec3(1.0) * smoothstep(0.8, 0.9, contour) * 0.3;
        
    } else {
        // Style 0 (Smooth Vivid) or Style 2 (Original Muddy)
        float dist = distance(uv, m);
        vec2 warp = normalize(uv - m) * smoothstep(0.5, 0.0, dist) * 0.2;
        
        vec2 q = vec2(0.);
        q.x = fbm(uv + t + warp);
        q.y = fbm(uv + vec2(1.0) - t - warp);
        
        vec2 r = vec2(0.);
        r.x = fbm(uv + 1.0 * q + vec2(1.7, 9.2) + 0.1 * t);
        r.y = fbm(uv + 1.0 * q + vec2(8.3, 2.8) + 0.1 * t);

        float f = fbm(uv + r * 1.5);
        
        if (uStyle == 0) { 
            // Style 0: Smooth Vivid 
            vec3 paletteA = vec3(1.0, 0.0, 0.6); // Neon Pink
            vec3 paletteB = vec3(0.0, 1.0, 0.8); // Cyan / Teal
            vec3 paletteC = vec3(0.4, 0.0, 1.0); // Deep Purple
            vec3 paletteD = vec3(1.0, 0.8, 0.0); // Bright Orange/Gold

            paletteA = hueShift(paletteA, uTime * 0.2);
            paletteB = hueShift(paletteB, uTime * 0.25);
            paletteC = hueShift(paletteC, uTime * 0.15);
            paletteD = hueShift(paletteD, uTime * 0.3);

            vec3 color1 = mix(paletteA, paletteB, f);
            vec3 color2 = mix(paletteC, paletteD, length(q));
            finalColor = mix(color1, color2, clamp(length(r.x), 0.0, 1.0));
            
        } else {
            // Style 2: Original Reverie (Muddy teal/brown)
            vec3 paletteA = vec3(0.1, 0.4, 0.5);
            vec3 paletteB = vec3(0.8, 0.5, 0.3);
            vec3 paletteC = vec3(0.2, 0.2, 0.2);
            vec3 paletteD = vec3(0.9, 0.8, 0.7);

            vec3 color1 = mix(paletteA, paletteB, f);
            vec3 color2 = mix(paletteC, paletteD, length(q));
            finalColor = mix(color1, color2, clamp(length(r.x), 0.0, 1.0));
        }
    }
    
    // Film grain
    float grain = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += grain * 0.03;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function MorphingCanvas({ styleMode }) {
  const mesh = useRef();
  const { size, pointer } = useThree();
  const { isPlaying, intensity, resetTrigger, isTVMode, isMouseIdle } = useLiveArt();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uStyle: { value: styleMode }
  }), []);

  useEffect(() => {
    if (mesh.current) {
      mesh.current.material.uniforms.uStyle.value = styleMode;
    }
  }, [styleMode]);

  useFrame((state) => {
    if (!isPlaying) return;
    if (mesh.current) {
      const time = state.clock.elapsedTime + (resetTrigger * 10);
      mesh.current.material.uniforms.uTime.value = time * (0.5 + intensity * 1.5);
      mesh.current.material.uniforms.uResolution.value.set(size.width, size.height);
      
      const isMouseActive = !isTVMode && !isMouseIdle;
      const fakeX = Math.sin(time * 0.2) * 0.6;
      const fakeY = Math.cos(time * 0.15) * 0.6;
      
      const targetX = isMouseActive ? pointer.x : fakeX;
      const targetY = isMouseActive ? pointer.y : fakeY;
      
      mesh.current.material.uniforms.uMouse.value.x += ((targetX + 1) / 2 - mesh.current.material.uniforms.uMouse.value.x) * 0.05;
      mesh.current.material.uniforms.uMouse.value.y += ((targetY + 1) / 2 - mesh.current.material.uniforms.uMouse.value.y) * 0.05;
    }
  });

  return (
    <mesh ref={mesh}>
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

export default function Reverie() {
  const { activeStyle } = useLiveArt();

  return (
    <div style={{ width: '100%', height: '100%', background: '#000' }}>
      <Canvas orthographic camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <MorphingCanvas styleMode={activeStyle || 0} />
      </Canvas>
    </div>
  );
}
