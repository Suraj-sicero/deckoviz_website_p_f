import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useLiveArt } from '../../../contexts/LiveArtContext';

const vertexShader = `
  uniform float uTime;
  uniform float uBass;
  uniform float uMid;
  uniform float uTreble;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    float wave1 = sin(pos.x * 2.0 + uTime * 0.5) * sin(pos.y * 2.0 + uTime * 0.5) * uBass * 2.0;
    float wave2 = sin(pos.x * 5.0 - uTime) * cos(pos.y * 4.0 + uTime) * uMid * 1.5;
    float wave3 = cos(pos.x * 10.0) * sin(pos.y * 10.0 - uTime * 2.0) * uTreble * 1.0;
    
    float elevation = wave1 + wave2 + wave3;
    pos.z += elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uBass;
  uniform float uTreble;
  uniform float uHueShift;
  varying vec2 vUv;
  varying float vElevation;

  vec3 hueShift(vec3 color, float hueAdjust) {
    const vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(hueAdjust);
    return vec3(color * cosAngle + cross(k, color) * sin(hueAdjust) + k * dot(k, color) * (1.0 - cosAngle));
  }

  void main() {
    float dist = distance(vUv, vec2(0.5));
    float alpha = smoothstep(0.5, 0.2, dist);

    vec3 cold = vec3(0.1, 0.4, 0.8);
    vec3 hot = vec3(0.9, 0.2, 0.1);
    
    float t = clamp((vElevation + 1.0) * 0.5 + uBass, 0.0, 1.0);
    vec3 color = mix(cold, hot, t);
    color += vec3(1.0) * uTreble * smoothstep(0.5, 1.0, vElevation);
    
    // Apply the dynamic beat-driven hue shift
    color = hueShift(color, uHueShift);

    gl_FragColor = vec4(color, alpha * 0.8);
  }
`;

function AudioVisualizer({ audioData, isMicEnabled }) {
  const meshRef = useRef();
  const { isPlaying, intensity, resetTrigger, isTVMode, isMouseIdle } = useLiveArt();
  
  const lastBass = useRef(0);
  const hueTarget = useRef(0);
  const currentHue = useRef(0);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uBass: { value: 0 },
    uMid: { value: 0 },
    uTreble: { value: 0 },
    uHueShift: { value: 0 }
  }), []);

  useFrame((state) => {
    if (!isPlaying) return;
    if (meshRef.current) {
      const time = state.clock.elapsedTime + (resetTrigger * 10);
      meshRef.current.material.uniforms.uTime.value = time;
      
      // Auto-pilot if mic is not enabled
      const fakeBass = Math.sin(time * 2.0) * 0.5 + 0.5;
      const fakeMid = Math.sin(time * 5.0) * 0.5 + 0.5;
      const fakeTreble = Math.cos(time * 10.0) * 0.5 + 0.5;
      
      const targetBass = (isMicEnabled ? audioData.bass : fakeBass) * (0.5 + intensity * 1.5);
      const targetMid = (isMicEnabled ? audioData.mid : fakeMid) * (0.5 + intensity * 1.5);
      const targetTreble = (isMicEnabled ? audioData.treble : fakeTreble) * (0.5 + intensity * 1.5);

      // Detect strong beats to shift the hue
      if (targetBass > 0.6 && targetBass > lastBass.current + 0.15) {
        hueTarget.current += Math.PI * 0.5; // rotate hue by 90 degrees
      }
      lastBass.current = targetBass;
      
      // Smoothly animate to the new hue
      currentHue.current += (hueTarget.current - currentHue.current) * 0.1;
      meshRef.current.material.uniforms.uHueShift.value = currentHue.current;

      meshRef.current.material.uniforms.uBass.value += (targetBass - meshRef.current.material.uniforms.uBass.value) * 0.1;
      meshRef.current.material.uniforms.uMid.value += (targetMid - meshRef.current.material.uniforms.uMid.value) * 0.1;
      meshRef.current.material.uniforms.uTreble.value += (targetTreble - meshRef.current.material.uniforms.uTreble.value) * 0.1;
      meshRef.current.rotation.z = time * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry args={[10, 10, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Resonance() {
  const [hasMic, setHasMic] = useState(false);
  const audioDataRef = useRef({ bass: 0, mid: 0, treble: 0 });
  const audioContextRef = useRef(null);
  const animationFrameRef = useRef(null);

  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      setHasMic(true);

      const updateAudio = () => {
        analyser.getByteFrequencyData(dataArray);
        let bassSum = 0; for(let i=0; i<10; i++) bassSum += dataArray[i];
        let midSum = 0; for(let i=10; i<50; i++) midSum += dataArray[i];
        let trebleSum = 0; for(let i=50; i<100; i++) trebleSum += dataArray[i];

        audioDataRef.current.bass = (bassSum / 10) / 255;
        audioDataRef.current.mid = (midSum / 40) / 255;
        audioDataRef.current.treble = (trebleSum / 50) / 255;
        animationFrameRef.current = requestAnimationFrame(updateAudio);
      };
      updateAudio();

    } catch (err) {
      console.error("Mic access denied:", err);
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', background: '#020005', position: 'relative' }}>
      {!hasMic && (
        <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }}>
          <button 
            onClick={startAudio}
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              color: 'white', 
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)'
            }}
          >
            Enable Microphone Input
          </button>
        </div>
      )}
      <Canvas camera={{ position: [0, -2, 5], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={['#020005']} />
        <AudioVisualizer audioData={audioDataRef.current} isMicEnabled={hasMic} />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={2.0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
