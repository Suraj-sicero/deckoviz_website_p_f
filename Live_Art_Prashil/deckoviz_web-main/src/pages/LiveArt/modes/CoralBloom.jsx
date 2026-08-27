import React, { useRef, useMemo, useEffect } from 'react';
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

const simFragmentShader = `
  uniform sampler2D tSource;
  uniform vec2 uResolution;
  uniform float uFeed;
  uniform float uKill;
  uniform float uDa;
  uniform float uDb;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 texel = 1.0 / uResolution;
    vec2 center = texture2D(tSource, vUv).rg;
    
    vec2 lapl = vec2(0.0);
    lapl += texture2D(tSource, vUv + vec2(-texel.x, 0.0)).rg * 0.2;
    lapl += texture2D(tSource, vUv + vec2(texel.x, 0.0)).rg * 0.2;
    lapl += texture2D(tSource, vUv + vec2(0.0, -texel.y)).rg * 0.2;
    lapl += texture2D(tSource, vUv + vec2(0.0, texel.y)).rg * 0.2;
    lapl += texture2D(tSource, vUv + vec2(-texel.x, -texel.y)).rg * 0.05;
    lapl += texture2D(tSource, vUv + vec2(texel.x, -texel.y)).rg * 0.05;
    lapl += texture2D(tSource, vUv + vec2(-texel.x, texel.y)).rg * 0.05;
    lapl += texture2D(tSource, vUv + vec2(texel.x, texel.y)).rg * 0.05;
    lapl -= center * 1.0;

    float a = center.r;
    float b = center.g;
    float reaction = a * b * b;
    
    float feed = uFeed + sin(vUv.x * 10.0 + uTime * 0.1) * 0.005;
    float kill = uKill + cos(vUv.y * 10.0 + uTime * 0.1) * 0.005;

    float newA = a + (uDa * lapl.r - reaction + feed * (1.0 - a));
    float newB = b + (uDb * lapl.g + reaction - (kill + feed) * b);

    if(distance(vUv, uMouse) < 0.01) {
      newB += 0.5;
    }

    gl_FragColor = vec4(clamp(newA, 0.0, 1.0), clamp(newB, 0.0, 1.0), 0.0, 1.0);
  }
`;

const renderFragmentShader = `
  uniform sampler2D tSource;
  varying vec2 vUv;
  void main() {
    float b = texture2D(tSource, vUv).g;
    vec3 color = vec3(0.02, 0.01, 0.05); 
    vec3 coralOuter = vec3(0.0, 0.6, 0.8); 
    vec3 coralInner = vec3(1.0, 0.4, 0.6); 
    float val = smoothstep(0.1, 0.5, b);
    float edge = smoothstep(0.4, 0.8, b);
    color = mix(color, coralOuter, val);
    color = mix(color, coralInner, edge);
    gl_FragColor = vec4(color, 1.0);
  }
`;

function ReactionDiffusion() {
  const { gl, pointer } = useThree();
  const { isPlaying, intensity, resetTrigger, isTVMode, isMouseIdle } = useLiveArt();
  const res = 512;
  
  const [rtA, rtB] = useMemo(() => {
    const options = { type: THREE.FloatType, format: THREE.RGBAFormat, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, wrapS: THREE.RepeatWrapping, wrapT: THREE.RepeatWrapping };
    return [new THREE.WebGLRenderTarget(res, res, options), new THREE.WebGLRenderTarget(res, res, options)];
  }, [res]);

  const simMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader, fragmentShader: simFragmentShader,
    uniforms: {
      tSource: { value: null }, uResolution: { value: new THREE.Vector2(res, res) },
      uFeed: { value: 0.0545 }, uKill: { value: 0.0620 }, uDa: { value: 1.0 }, uDb: { value: 0.5 },
      uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(-1, -1) }
    }
  }), [res]);

  const renderMaterial = useMemo(() => new THREE.ShaderMaterial({ vertexShader, fragmentShader: renderFragmentShader, uniforms: { tSource: { value: null } } }), []);
  const camera = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), []);
  const scene = useMemo(() => new THREE.Scene().add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial)), [simMaterial]);
  const renderScene = useMemo(() => new THREE.Scene().add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), renderMaterial)), [renderMaterial]);

  useEffect(() => {
    const initData = new Float32Array(res * res * 4);
    for (let i = 0; i < res * res; i++) {
      initData[i * 4] = 1.0;
      initData[i * 4 + 3] = 1.0;
    }
    const seedSize = 10;
    for (let y = res/2 - seedSize; y < res/2 + seedSize; y++) {
      for (let x = res/2 - seedSize; x < res/2 + seedSize; x++) {
        initData[(y * res + x) * 4 + 1] = 1.0;
      }
    }
    const texture = new THREE.DataTexture(initData, res, res, THREE.RGBAFormat, THREE.FloatType);
    texture.needsUpdate = true;
    simMaterial.uniforms.tSource.value = texture;
    gl.setRenderTarget(rtA); gl.render(scene, camera); gl.setRenderTarget(null);
  }, [gl, res, rtA, scene, camera, simMaterial, resetTrigger]);

  let iteration = useRef(0);
  let lastAutoSeed = useRef(0);

  useFrame((state) => {
    if (!isPlaying) {
      renderMaterial.uniforms.tSource.value = (iteration.current % 2 === 0 ? rtA : rtB).texture;
      gl.render(renderScene, camera);
      return;
    }
    
    simMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    
    const isMouseActive = !isTVMode && !isMouseIdle;
    if (isMouseActive) {
      simMaterial.uniforms.uMouse.value.set((pointer.x + 1) / 2, (pointer.y + 1) / 2);
    } else {
      // Auto-pilot: seed randomly every 2 seconds
      if (state.clock.elapsedTime - lastAutoSeed.current > 2.0) {
        simMaterial.uniforms.uMouse.value.set(Math.random() * 0.8 + 0.1, Math.random() * 0.8 + 0.1);
        lastAutoSeed.current = state.clock.elapsedTime;
      } else {
        simMaterial.uniforms.uMouse.value.set(-1, -1);
      }
    }

    const steps = Math.floor(4 + intensity * 8);
    for (let i = 0; i < steps; i++) {
      const source = iteration.current % 2 === 0 ? rtA : rtB;
      const target = iteration.current % 2 === 0 ? rtB : rtA;
      simMaterial.uniforms.tSource.value = source.texture;
      gl.setRenderTarget(target);
      gl.render(scene, camera);
      iteration.current++;
    }

    gl.setRenderTarget(null);
    renderMaterial.uniforms.tSource.value = (iteration.current % 2 === 0 ? rtA : rtB).texture;
    gl.render(renderScene, camera);
  }, 1);

  return null;
}

export default function CoralBloom() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#000' }}>
      <Canvas orthographic camera={{ position: [0, 0, 1] }} dpr={[1, 1]} gl={{ antialias: false }}>
        <ReactionDiffusion />
      </Canvas>
    </div>
  );
}
