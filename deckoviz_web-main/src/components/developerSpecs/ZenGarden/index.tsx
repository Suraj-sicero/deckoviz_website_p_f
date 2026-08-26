"use client";

import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Download, Wind, Trash2, Maximize2, RefreshCw, X, Hand, Compass, Layout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ZenGarden: React.FC = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [rakeWidth, setRakeWidth] = useState(0.08);
    const [grooveSpacing, setGrooveSpacing] = useState(1.5);
    const [rakeDepth, setRakeDepth] = useState(0.6);
    const [timeOfDay, setTimeOfDay] = useState<'golden' | 'midnight'>('golden');
    const [showUI, setShowUI] = useState(true);

    const stateRef = useRef({ rakeWidth, grooveSpacing, rakeDepth, timeOfDay, isDrawing: false, mouse: new THREE.Vector2() });

    useEffect(() => {
        stateRef.current = { ...stateRef.current, rakeWidth, grooveSpacing, rakeDepth, timeOfDay };
    }, [rakeWidth, grooveSpacing, rakeDepth, timeOfDay]);

    useEffect(() => {
        if (!canvasRef.current) return;

        // --- THREE.JS SETUP ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#1a1a15");

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 10, 10);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // --- LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xfff5e6, 2.0);
        mainLight.position.set(10, 15, 10);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.left = -10;
        mainLight.shadow.camera.right = 10;
        mainLight.shadow.camera.top = 10;
        mainLight.shadow.camera.bottom = -10;
        scene.add(mainLight);

        // Fill light for soft shadows
        const fillLight = new THREE.PointLight(0x8099ff, 0.5);
        fillLight.position.set(-10, 5, -5);
        scene.add(fillLight);

        // --- RENDER TARGETS (PING-PONG) ---
        const size = 1024;
        const renderTargets = [
            new THREE.WebGLRenderTarget(size, size, { type: THREE.HalfFloatType, format: THREE.RedFormat, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter }),
            new THREE.WebGLRenderTarget(size, size, { type: THREE.HalfFloatType, format: THREE.RedFormat, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter })
        ];
        let currentTarget = 0;

        // --- SHADERS ---
        const drawMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: null },
                uPos: { value: new THREE.Vector2(0.5, 0.5) },
                uPrevPos: { value: new THREE.Vector2(0.5, 0.5) },
                uSize: { value: 0.1 },
                uDepth: { value: 0.5 },
                uSpacing: { value: 1.0 },
                uIsDrawing: { value: false },
                uTime: { value: 0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D uTexture;
                uniform vec2 uPos;
                uniform vec2 uPrevPos;
                uniform float uSize;
                uniform float uDepth;
                uniform float uSpacing;
                uniform bool uIsDrawing;
                uniform float uTime;
                varying vec2 vUv;

                float lineSegment(vec2 p, vec2 a, vec2 b) {
                    vec2 pa = p - a, ba = b - a;
                    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
                    return length(pa - ba * h);
                }

                void main() {
                    float current = texture2D(uTexture, vUv).r;
                    if (!uIsDrawing) {
                        gl_FragColor = vec4(vec3(current), 1.0);
                        return;
                    }

                    float d = lineSegment(vUv, uPrevPos, uPos);
                    
                    // Create grooves with 'pushed sand' edges
                    float groove = sin(d * 120.0 / uSpacing) * 0.5 + 0.5;
                    float influence = smoothstep(uSize, 0.0, d);
                    
                    // Add some organic variation to the rake marks
                    float noise = sin(vUv.x * 200.0 + uTime) * cos(vUv.y * 200.0) * 0.1;
                    groove = mix(groove, noise, 0.1);

                    float next = mix(current, groove * uDepth, influence * 0.3);
                    gl_FragColor = vec4(vec3(next), 1.0);
                }
            `
        });

        const drawScene = new THREE.Scene();
        const drawCamera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);
        const drawQuad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), drawMaterial);
        drawScene.add(drawQuad);

        // --- GARDEN GEOMETRY ---
        const sandGeo = new THREE.PlaneGeometry(12, 12, 1024, 1024); // High res for smooth displacement
        const sandMat = new THREE.ShaderMaterial({
            uniforms: {
                uHeightMap: { value: null },
                uColor: { value: new THREE.Color("#d4c4a8") },
                uLightPos: { value: mainLight.position },
                uAmbientColor: { value: new THREE.Color("#2a1a0a") },
                uResolution: { value: new THREE.Vector2(size, size) }
            },
            vertexShader: `
                uniform sampler2D uHeightMap;
                varying vec2 vUv;
                varying vec3 vWorldPosition;
                varying float vHeight;

                void main() {
                    vUv = uv;
                    float h = texture2D(uHeightMap, uv).r;
                    vHeight = h;
                    vec3 pos = position;
                    pos.z += h * 0.4; // Reduced height for more subtle look
                    
                    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
                    vWorldPosition = worldPos.xyz;
                    
                    gl_Position = projectionMatrix * viewMatrix * worldPos;
                }
            `,
            fragmentShader: `
                uniform sampler2D uHeightMap;
                uniform vec3 uColor;
                uniform vec3 uLightPos;
                uniform vec3 uAmbientColor;
                uniform vec2 uResolution;
                varying vec2 vUv;
                varying vec3 vWorldPosition;
                varying float vHeight;

                void main() {
                    // Calculate normals from heightmap on the fly for sharp details
                    float texelSize = 1.0 / uResolution.x;
                    float hL = texture2D(uHeightMap, vUv + vec2(-texelSize, 0.0)).r;
                    float hR = texture2D(uHeightMap, vUv + vec2(texelSize, 0.0)).r;
                    float hD = texture2D(uHeightMap, vUv + vec2(0.0, -texelSize)).r;
                    float hU = texture2D(uHeightMap, vUv + vec2(0.0, texelSize)).r;
                    
                    vec3 normal = normalize(vec3(hL - hR, hD - hU, 0.1));
                    
                    // PBR-ish lighting
                    vec3 lightDir = normalize(uLightPos - vWorldPosition);
                    float diff = max(dot(normal, lightDir), 0.0);
                    
                    // Specular for sand glints
                    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
                    vec3 halfDir = normalize(lightDir + viewDir);
                    float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
                    
                    // Sand texture noise
                    float grain = fract(sin(dot(vUv * 1000.0, vec2(12.9898, 78.233))) * 43758.5453);
                    float microGlint = step(0.99, fract(sin(dot(vUv * 2000.0, vec2(45.2, 78.1))) * 12345.6));
                    
                    vec3 finalColor = mix(uAmbientColor, uColor, diff * 0.9 + 0.1);
                    finalColor += grain * 0.05; // Base grain
                    finalColor += microGlint * spec * 2.0; // Sharp glints
                    
                    // Ambient occlusion based on height
                    finalColor *= (vHeight * 0.5 + 0.5);
                    
                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `,
            side: THREE.DoubleSide
        });

        const sand = new THREE.Mesh(sandGeo, sandMat);
        sand.rotation.x = -Math.PI / 2;
        sand.receiveShadow = true;
        scene.add(sand);

        // Frame
        const frameGeo = new THREE.BoxGeometry(13, 0.8, 13);
        const frameMat = new THREE.MeshStandardMaterial({ color: "#1a120a", roughness: 0.9, metalness: 0.1 });
        const frame = new THREE.Mesh(frameGeo, frameMat);
        frame.position.y = -0.3;
        scene.add(frame);

        // --- STONES ---
        const stoneGroup = new THREE.Group();
        const stoneCount = 3;
        const stonePositions = [
            { x: -3, z: -2, s: 0.8 },
            { x: 2, z: 2, s: 1.2 },
            { x: 1, z: -4, s: 0.6 }
        ];

        stonePositions.forEach(pos => {
            const stoneGeo = new THREE.DodecahedronGeometry(pos.s, 1);
            const positions = stoneGeo.attributes.position.array as Float32Array;
            for(let i = 0; i < positions.length; i++) {
                positions[i] += (Math.random() - 0.5) * 0.2;
            }
            const stoneMat = new THREE.MeshStandardMaterial({ 
                color: "#444444", 
                roughness: 0.9, 
                flatShading: true 
            });
            const stone = new THREE.Mesh(stoneGeo, stoneMat);
            stone.position.set(pos.x, pos.s * 0.4 - 0.1, pos.z);
            stone.rotation.set(Math.random(), Math.random(), Math.random());
            stone.castShadow = true;
            stoneGroup.add(stone);
        });
        scene.add(stoneGroup);

        // --- INTERACTION ---
        const raycaster = new THREE.Raycaster();
        const prevMouse = new THREE.Vector2();

        const handlePointer = (e: PointerEvent) => {
            const rect = canvasRef.current!.getBoundingClientRect();
            stateRef.current.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            stateRef.current.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };

        window.addEventListener('pointermove', handlePointer);

        // --- ANIMATION LOOP ---
        const animate = (time: number) => {
            const { rakeWidth, grooveSpacing, rakeDepth, isDrawing, mouse, timeOfDay } = stateRef.current as any;

            // Update Time of Day Lighting
            if (timeOfDay === 'midnight') {
                mainLight.intensity = THREE.MathUtils.lerp(mainLight.intensity, 0.4, 0.05);
                mainLight.color.lerp(new THREE.Color("#8099ff"), 0.05);
                scene.background = (scene.background as THREE.Color).lerp(new THREE.Color("#05050a"), 0.05);
                sandMat.uniforms.uColor.value.lerp(new THREE.Color("#4a4a5a"), 0.05);
            } else {
                mainLight.intensity = THREE.MathUtils.lerp(mainLight.intensity, 2.0, 0.05);
                mainLight.color.lerp(new THREE.Color("#fff5e6"), 0.05);
                scene.background = (scene.background as THREE.Color).lerp(new THREE.Color("#1a1a15"), 0.05);
                sandMat.uniforms.uColor.value.lerp(new THREE.Color("#d4c4a8"), 0.05);
            }

            // Raycasting for drawing
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(sand);

            if (intersects.length > 0 && isDrawing) {
                const uv = intersects[0].uv!;
                
                if (!(stateRef.current as any).wasDrawing) {
                    prevMouse.copy(uv);
                    (stateRef.current as any).wasDrawing = true;
                }
                
                const nextTarget = 1 - currentTarget;
                drawMaterial.uniforms.uTexture.value = renderTargets[currentTarget].texture;
                drawMaterial.uniforms.uPos.value.copy(uv);
                drawMaterial.uniforms.uPrevPos.value.copy(prevMouse);
                drawMaterial.uniforms.uSize.value = rakeWidth;
                drawMaterial.uniforms.uDepth.value = rakeDepth;
                drawMaterial.uniforms.uSpacing.value = grooveSpacing;
                drawMaterial.uniforms.uIsDrawing.value = true;
                drawMaterial.uniforms.uTime.value = time * 0.001;

                renderer.setRenderTarget(renderTargets[nextTarget]);
                renderer.render(drawScene, drawCamera);
                renderer.setRenderTarget(null);

                currentTarget = nextTarget;
                prevMouse.copy(uv);
            } else {
                drawMaterial.uniforms.uIsDrawing.value = false;
                (stateRef.current as any).wasDrawing = false;
            }

            sandMat.uniforms.uHeightMap.value = renderTargets[currentTarget].texture;

            camera.position.x = Math.sin(Date.now() * 0.0001) * 3;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        const animationId = requestAnimationFrame(animate);

        // Initial Clear
        renderer.setRenderTarget(renderTargets[0]);
        renderer.setClearColor(0x000000, 1);
        renderer.clear();
        renderer.setRenderTarget(renderTargets[1]);
        renderer.clear();
        renderer.setRenderTarget(null);

        return () => {
            window.removeEventListener('pointermove', handlePointer);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            sandGeo.dispose();
            sandMat.dispose();
        };
    }, []);

    const handlePointerDown = (e: React.PointerEvent) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        stateRef.current.mouse.set(x, y);
        stateRef.current.isDrawing = true;

        // Initialize prevMouse by raycasting immediately
        const raycaster = new THREE.Raycaster();
        const tempCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        tempCamera.position.set(0, 10, 10);
        tempCamera.lookAt(0, 0, 0);
        raycaster.setFromCamera(stateRef.current.mouse, tempCamera);
        
        // Since we can't easily reference the 'sand' mesh here without making it more global, 
        // we can just use a plane that matches its transform.
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const intersectPoint = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
            // Convert world space to UV space (12x12 plane centered at 0,0)
            const u = (intersectPoint.x + 6) / 12;
            const v = (intersectPoint.z + 6) / 12;
            // The texture is inverted on Z
            // Actually let's just make it simpler in the next frame
        }
    };

    const handlePointerUp = () => {
        stateRef.current.isDrawing = false;
    };

    const handleExport = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = 'zen-garden-meditation.png';
            link.href = canvasRef.current.toDataURL();
            link.click();
        }
    };

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-[#1a1a15] overflow-hidden font-mono selection:bg-orange-200/20">
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 z-0 touch-none cursor-crosshair"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            />

            {/* Cinematic HUD Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none p-12 pb-32 flex flex-col justify-between">
                
                {/* Top Section */}
                <div className="flex justify-between items-start">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-1 pointer-events-auto"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-orange-300 animate-pulse" />
                            <h1 className="text-2xl font-black text-white/90 tracking-[0.2em] uppercase">Zen Garden</h1>
                        </div>
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] pl-5">Cognitive Calibration // Ritual v2.4</p>
                    </motion.div>

                    <div className="flex gap-4 pointer-events-auto">
                        <button 
                            onClick={() => setTimeOfDay(timeOfDay === 'golden' ? 'midnight' : 'golden')}
                            className={`p-4 rounded-2xl border transition-all backdrop-blur-xl flex items-center gap-3 ${timeOfDay === 'midnight' ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-200' : 'bg-orange-500/20 border-orange-500/50 text-orange-200'}`}
                        >
                            <Compass size={20} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{timeOfDay === 'golden' ? 'Zen Golden' : 'Deep Midnight'}</span>
                        </button>
                        <button onClick={() => window.location.reload()} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl">
                            <RefreshCw size={20} />
                        </button>
                        
                    </div>
                </div>

                {/* Center: Instruction */}
                <div className="self-center text-center space-y-2 opacity-20">
                    <Hand size={32} className="mx-auto text-white" />
                    <p className="text-[10px] text-white uppercase tracking-[1em]">Slow Motion Required</p>
                </div>

                {/* Bottom Section */}
                <div className="flex justify-between items-end pointer-events-auto">
                    <div className="p-8 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-3xl space-y-8 w-80">
                        <div className="flex items-center gap-3">
                            <Layout size={16} className="text-orange-300/60" />
                            <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Rake Configuration</span>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] text-white/40 uppercase font-bold tracking-widest">
                                    <span>Width</span>
                                    <span className="font-mono text-white">{Math.round(rakeWidth * 100)}</span>
                                </div>
                                <input 
                                    type="range" min="0.01" max="0.2" step="0.01" 
                                    value={rakeWidth}
                                    onChange={(e) => setRakeWidth(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-300"
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] text-white/40 uppercase font-bold tracking-widest">
                                    <span>Spacing</span>
                                    <span className="font-mono text-white">{grooveSpacing.toFixed(1)}</span>
                                </div>
                                <input 
                                    type="range" min="0.5" max="3.0" step="0.1" 
                                    value={grooveSpacing}
                                    onChange={(e) => setGrooveSpacing(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-300"
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] text-white/40 uppercase font-bold tracking-widest">
                                    <span>Depth</span>
                                    <span className="font-mono text-white">{Math.round(rakeDepth * 100)}%</span>
                                </div>
                                <input 
                                    type="range" min="0.1" max="1.0" step="0.05" 
                                    value={rakeDepth}
                                    onChange={(e) => setRakeDepth(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-orange-300"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <button 
                                onClick={() => window.location.reload()}
                                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] text-white/40 uppercase font-bold tracking-widest hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <Trash2 size={12} />
                                Clear Sanctuary
                            </button>
                        </div>
                    </div>

                    <div className="text-right space-y-4">
                        <div className="space-y-1">
                            <span className="text-xs text-white/30 uppercase font-bold tracking-[0.4em]">Presence Level</span>
                            <div className="text-8xl font-black text-white tracking-tighter tabular-nums">98.2</div>
                        </div>
                        <button onClick={handleExport} className="p-4 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all pointer-events-auto">
                            <Download size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #fdba74;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(253, 186, 116, 0.5);
                    border: 2px solid #1a1a15;
                }
            `}} />
        
      {/* ALWAYS VISIBLE EXIT BUTTON */}
      <div className="absolute top-8 right-24 pointer-events-auto z-[9999]">
        <button 
          onClick={() => {
            if (typeof navigate !== 'undefined') {
              navigate('/experimental-art-modes');
            } else {
              window.location.href = '/experimental-art-modes';
            }
          }}
          className="p-3.5 bg-black/20 hover:bg-rose-500/20 backdrop-blur-xl rounded-2xl border border-white/10 text-white/70 hover:text-rose-400 transition-all shadow-xl flex items-center justify-center"
          title="Exit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
</div>
    );
};

export default ZenGarden;
