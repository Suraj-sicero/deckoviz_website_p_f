import * as THREE from 'three';
import { RitualConfig, RitualMode, RITUAL_PRESETS } from './types';
import { 
    backgroundFragmentShader, 
    particleVertexShader, 
    particleFragmentShader 
} from './Shaders';

export class RitualEngine {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private container: HTMLElement;
    private clock: THREE.Clock;
    
    private background: THREE.Mesh;
    private particles: THREE.Points | null = null;
    private bgMaterial: THREE.ShaderMaterial;
    private currentConfig: RitualConfig;

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.clock = new THREE.Clock();
        this.currentConfig = RITUAL_PRESETS.focus;
        
        this.setupRenderer();
        this.bgMaterial = new THREE.ShaderMaterial({
            vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
            fragmentShader: backgroundFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new THREE.Color(0x000000) },
                uColor2: { value: new THREE.Color(0x111111) }
            }
        });
        
        this.background = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), this.bgMaterial);
        this.background.position.z = -5;
        this.scene.add(this.background);
        
        window.addEventListener('resize', this.onResize.bind(this));
    }

    private setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;
    }

    public updateMode(config: RitualConfig) {
        this.currentConfig = config;
        this.clearParticles();
        this.updateBackground(config);
        this.createParticles(config);
        
        // Force an immediate redraw if necessary
        this.renderer.render(this.scene, this.camera);
    }

    public setParams(config: RitualConfig) {
        this.currentConfig = config;
        this.updateBackground(config);
    }

    private clearParticles() {
        if (this.particles) {
            this.particles.geometry.dispose();
            (this.particles.material as THREE.Material).dispose();
            this.scene.remove(this.particles);
            this.particles = null;
        }
    }

    private updateBackground(config: RitualConfig) {
        const c1 = new THREE.Color(config.color1);
        const c2 = new THREE.Color(config.color2);
        
        this.bgMaterial.uniforms.uColor1.value.copy(c1);
        this.bgMaterial.uniforms.uColor2.value.copy(c2);
        
        // Update fog and scene background for consistency
        this.scene.fog = new THREE.FogExp2(c1, config.fogDensity);
        this.scene.background = c1;
    }

    private createParticles(config: RitualConfig) {
        const count = config.particleCount;
        const geometry = new THREE.BufferGeometry();
        const sizes = new Float32Array(count);
        const offsets = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            offsets[i * 3] = (THREE.MathUtils.randFloatSpread(20));
            offsets[i * 3 + 1] = (THREE.MathUtils.randFloatSpread(20));
            offsets[i * 3 + 2] = (THREE.MathUtils.randFloatSpread(10));
            sizes[i] = Math.random() * 10 + 2;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
        geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 3));

        const material = new THREE.ShaderMaterial({
            vertexShader: particleVertexShader,
            fragmentShader: particleFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uSpeed: { value: config.speed },
                uIntensity: { value: config.intensity }
            },
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    public animate() {
        const time = this.clock.getElapsedTime();
        const config = this.currentConfig;
        
        this.bgMaterial.uniforms.uTime.value = time;
        
        if (this.particles) {
            const mat = this.particles.material as THREE.ShaderMaterial;
            mat.uniforms.uTime.value = time;
            mat.uniforms.uSpeed.value = config.speed;
            mat.uniforms.uIntensity.value = config.intensity;

            const pos = this.particles.geometry.attributes.aOffset.array as Float32Array;
            for (let i = 0; i < config.particleCount; i++) {
                if (config.motionStyle === 'rising') {
                    pos[i * 3 + 1] += 0.02 * config.speed;
                    if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
                } else if (config.motionStyle === 'rain') {
                    pos[i * 3 + 1] -= 0.05 * config.speed;
                    if (pos[i * 3 + 1] < -10) pos[i * 3 + 1] = 10;
                } else if (config.motionStyle === 'drifting') {
                    pos[i * 3] += Math.sin(time * 0.3 + i) * 0.003 * config.speed;
                    pos[i * 3 + 1] += Math.cos(time * 0.3 + i) * 0.003 * config.speed;
                }
            }
            this.particles.geometry.attributes.aOffset.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }

    private onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    public dispose() {
        window.removeEventListener('resize', this.onResize);
        this.renderer.dispose();
    }
}
