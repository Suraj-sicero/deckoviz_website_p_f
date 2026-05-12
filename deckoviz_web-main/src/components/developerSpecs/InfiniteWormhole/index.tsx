import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Settings, Maximize2, X, Zap } from 'lucide-react';

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
uniform float uSpeed;
uniform float uColorShift;
uniform float uWarp;
uniform float uParticleIntensity;

varying vec2 vUv;

// Pseudo-random noise
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// Organic noise
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
    );
}

// Fractional Brownian Motion
float fbm(vec2 p) {
    float f = 0.0;
    float w = 0.5;
    for(int i = 0; i < 4; i++) {
        f += w * noise(p);
        p *= 2.0;
        w *= 0.5;
    }
    return f;
}

// Custom palette
vec3 getPalette(float t) {
    t = fract(t + uColorShift);
    
    vec3 c1 = vec3(0.0, 0.85, 1.0); // Electric Blue (#00D9FF)
    vec3 c2 = vec3(1.0, 0.17, 0.46); // Neon Pink (#FF2D75)
    vec3 c3 = vec3(0.41, 0.0, 1.0); // Cyber Purple (#6A00FF)
    vec3 c4 = vec3(1.0, 0.9, 0.0); // Bright Yellow (#FFE600)
    
    vec3 color = mix(c1, c2, smoothstep(0.0, 0.33, t));
    color = mix(color, c3, smoothstep(0.33, 0.66, t));
    color = mix(color, c4, smoothstep(0.66, 1.0, t));
    
    return color;
}

void main() {
    // Normalize coordinates
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uResolution.x / uResolution.y;
    
    float r = length(uv);
    float a = atan(uv.y, uv.x);
    
    // Core Tunnel Math
    float z = 1.0 / r; // Inverse radius gives depth
    
    // Add warp distortion
    float warp = sin(z * 2.0 + uTime) * uWarp;
    a += warp;
    
    float tunnelU = a / 3.14159265;
    float tunnelV = z - uTime * uSpeed;
    
    // Rotation over time
    tunnelU += uTime * 0.1;
    
    vec2 tunnelUV = vec2(tunnelU, tunnelV);
    
    // --- 1. Plasma Rings ---
    float ringNoise = fbm(vec2(cos(a), sin(a)) * 2.0 + vec2(0.0, tunnelV * 0.5));
    float rings = sin(tunnelUV.y * 10.0 + ringNoise * 5.0) * 0.5 + 0.5;
    rings = pow(rings, 4.0); // Sharpen the rings
    
    vec3 ringColor = getPalette(z * 0.1 + uTime * 0.1) * rings * 1.5;
    
    // --- 2. Energy Waves ---
    float waveDist = fbm(vec2(cos(a), sin(a)) * 3.0 + vec2(0.0, tunnelV * 0.2));
    float waves = smoothstep(0.4, 0.6, waveDist) * smoothstep(0.6, 0.4, waveDist);
    vec3 waveColor = getPalette(z * 0.2 - uTime * 0.15 + 0.5) * waves * 3.0;
    
    // --- 3. Fast Moving Particles ---
    vec2 pUV = vec2(tunnelU * 10.0, tunnelV * 5.0);
    vec2 pGrid = floor(pUV);
    vec2 pFract = fract(pUV);
    float pHash = hash(pGrid);
    
    // Only spawn particles on some grid cells
    float pMask = step(0.8, pHash);
    
    // Randomize particle position within cell
    vec2 pPos = vec2(hash(pGrid + 1.0), hash(pGrid + 2.0));
    float pDist = length(pFract - pPos);
    
    // Particle size depends on hash
    float pSize = mix(0.05, 0.2, hash(pGrid + 3.0));
    float particle = smoothstep(pSize, pSize * 0.5, pDist) * pMask;
    
    // Add glow to particles
    particle += exp(-pDist * 20.0) * pMask * 0.5;
    
    vec3 particleColor = vec3(1.0) * particle * uParticleIntensity;
    
    // --- Final Composite ---
    vec3 finalColor = ringColor + waveColor + particleColor;
    
    // Fog / Depth fade (darken center)
    float depthFade = smoothstep(0.0, 0.5, r);
    finalColor *= depthFade;
    
    // Core glow (Cyan/Blue at the very center)
    float coreGlow = exp(-r * 8.0) * 1.5;
    finalColor += vec3(0.0, 1.0, 0.9) * coreGlow;
    
    // Vignette
    finalColor *= 1.0 - smoothstep(0.5, 1.5, r);
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const PRESETS = {
    Hyperspace: { speed: 2.0, colorShift: 0.0, warp: 0.1, particleIntensity: 2.0 },
    NebulaWarp: { speed: 1.0, colorShift: 0.3, warp: 0.3, particleIntensity: 1.0 },
    CyberPulse: { speed: 3.0, colorShift: 0.6, warp: 0.05, particleIntensity: 3.0 },
    CalmPortal: { speed: 0.5, colorShift: 0.1, warp: 0.2, particleIntensity: 0.5 }
};

const InfiniteWormhole: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showUI, setShowUI] = useState(true);
    const [currentPreset, setCurrentPreset] = useState<keyof typeof PRESETS>('Hyperspace');
    
    // Shader uniforms
    const uniformsRef = useRef({
        uTime: { value: 0.0 },
        uResolution: { value: new THREE.Vector2() },
        uSpeed: { value: PRESETS.Hyperspace.speed },
        uColorShift: { value: PRESETS.Hyperspace.colorShift },
        uWarp: { value: PRESETS.Hyperspace.warp },
        uParticleIntensity: { value: PRESETS.Hyperspace.particleIntensity }
    });

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const container = containerRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize for mobile
        
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: uniformsRef.current,
            depthWrite: false,
            depthTest: false
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const handleResize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            uniformsRef.current.uResolution.value.set(width, height);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        let animationFrameId: number;
        let lastTime = performance.now();

        const animate = (time: number) => {
            const delta = (time - lastTime) / 1000;
            lastTime = time;
            
            // Smoothly interpolate uniforms towards target preset
            const target = PRESETS[currentPreset];
            uniformsRef.current.uSpeed.value += (target.speed - uniformsRef.current.uSpeed.value) * delta * 2.0;
            uniformsRef.current.uColorShift.value += (target.colorShift - uniformsRef.current.uColorShift.value) * delta * 2.0;
            uniformsRef.current.uWarp.value += (target.warp - uniformsRef.current.uWarp.value) * delta * 2.0;
            uniformsRef.current.uParticleIntensity.value += (target.particleIntensity - uniformsRef.current.uParticleIntensity.value) * delta * 2.0;
            
            uniformsRef.current.uTime.value += delta;
            
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, [currentPreset]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const handleWheel = (e: React.WheelEvent) => {
        // Adjust speed via scroll
        const speedDelta = e.deltaY * -0.005;
        const currentSpeedTarget = PRESETS[currentPreset].speed;
        PRESETS[currentPreset].speed = Math.max(0.1, Math.min(10.0, currentSpeedTarget + speedDelta));
    };

    return (
        <div ref={containerRef} className="relative w-full h-full bg-black overflow-hidden font-sans" onWheel={handleWheel}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none" />

            {/* UI Overlay */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
                {/* Header */}
                <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                        <Zap className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Infinite Wormhole</h1>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Psychedelic Neon Vortex</p>
                    </div>
                </div>

                {/* Controls - Bottom */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-4 pointer-events-auto bg-black/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/10 shadow-2xl overflow-x-auto max-w-[95vw]">
                    <div className="flex items-center space-x-2 px-2">
                        {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((p) => (
                            <button
                                key={p}
                                onClick={() => setCurrentPreset(p)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                                    currentPreset === p 
                                    ? 'bg-white text-black scale-105 shadow-lg' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                    
                    <div className="w-px h-6 bg-white/10 mx-2 flex-shrink-0" />
                    
                    <div className="flex items-center text-xs text-gray-400 px-2 whitespace-nowrap">
                        <span>Scroll to change speed</span>
                    </div>
                </div>

                {/* Info Toggle */}
                <div className="absolute top-8 right-8 flex gap-3 pointer-events-auto">
                    <button 
                        onClick={toggleFullscreen}
                        className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-xl"
                    >
                        <Maximize2 className="w-6 h-6 text-white" />
                    </button>
                    <button 
                        onClick={() => setShowUI(!showUI)}
                        className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-xl"
                    >
                        <Settings className="w-6 h-6 text-white" />
                    </button>
                    <button 
                        onClick={() => window.history.back()}
                        className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-xl"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfiniteWormhole;
