import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useLiveArt } from '../../../contexts/LiveArtContext';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uIntensity;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Classic Perlin 3D Noise by Stefan Gustavson
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

  float cnoise(vec3 P){
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }

  float fbm(vec3 x) {
      float v = 0.0;
      float a = 0.5;
      vec3 shift = vec3(100);
      for (int i = 0; i < 5; ++i) {
          v += a * cnoise(x);
          x = x * 2.0 + shift;
          a *= 0.5;
      }
      return v;
  }

  vec3 getFluidColor(float t) {
      vec3 col1 = vec3(1.0, 0.1, 0.6); // Vibrant Pink
      vec3 col2 = vec3(0.5, 0.0, 1.0); // Deep Purple
      vec3 col3 = vec3(0.0, 0.9, 1.0); // Cyan
      vec3 col4 = vec3(0.1, 0.0, 0.5); // Dark Blue

      if (t < 0.25) return mix(col4, col2, t * 4.0);
      if (t < 0.50) return mix(col2, col1, (t - 0.25) * 4.0);
      if (t < 0.75) return mix(col1, col3, (t - 0.50) * 4.0);
      return mix(col3, col4, (t - 0.75) * 4.0);
  }

  void main() {
      vec2 uv = vUv;
      uv.x *= uResolution.x / uResolution.y;
      vec2 st = uv * 4.0; 
      
      float t = uTime * (0.15 + uIntensity * 0.3);
      
      // Domain warping for fluid look
      vec3 q = vec3(0.0);
      q.x = fbm( vec3(st, t) );
      q.y = fbm( vec3(st + vec2(1.0), t) );

      vec3 r = vec3(0.0);
      r.x = fbm( vec3(st + 1.0*q.xy + vec2(1.7,9.2), 0.15*t) );
      r.y = fbm( vec3(st + 1.0*q.xy + vec2(8.3,2.8), 0.126*t) );

      float f = fbm( vec3(st + r.xy, t) );
      
      // Create rings / marbled fluid effect
      float marble = sin(f * 35.0 + t * 4.0) * 0.5 + 0.5;
      
      // Vivid color mixing based on the noise field
      vec3 color = getFluidColor(fract(f * 1.5 + t * 0.2 + uIntensity * 0.5));
      
      // Bright edge highlights
      vec3 highlightCol = mix(vec3(0.0, 1.0, 1.0), vec3(1.0, 0.0, 1.0), fract(f*2.0));
      color += highlightCol * smoothstep(0.85, 1.0, marble) * 0.9;

      // Subtle vignette
      float vignette = length(vUv - 0.5);
      color -= vignette * 0.6;

      gl_FragColor = vec4(color, 1.0);
  }
`;

function FluidShader() {
  const meshRef = useRef();
  const { isPlaying, intensity, resetTrigger } = useLiveArt();
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIntensity: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) }
  }), []);

  useFrame((state) => {
    if (!isPlaying) return;
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime + (resetTrigger * 10);
      meshRef.current.material.uniforms.uIntensity.value = intensity;
      meshRef.current.material.uniforms.uResolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh ref={meshRef}>
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

export default function CosmicFluid() {
  return (
    <Canvas camera={{ position: [0, 0, 1], fov: 60 }} style={{ background: '#010308' }} dpr={[1, 2]}>
      <FluidShader />
    </Canvas>
  );
}
