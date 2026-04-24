import * as THREE from 'three';
import { RitualConfig, RitualMode } from './types';
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

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.clock = new THREE.Clock();
        
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
        this.clearParticles();
        this.updateBackground(config);
        this.createParticles(config);
    }

    private clearParticles() {
        if (this.particles) {
            this.particles.geometry.dispose();
            (this.particles.material as THREE.Material).dispose();
            this.scene.remove(this.particles);
        }
    }

    private updateBackground(config: RitualConfig) {
        this.bgMaterial.uniforms.uColor1.value.set(config.color1);
        this.bgMaterial.uniforms.uColor2.value.set(config.color2);
        this.scene.fog = new THREE.FogExp2(config.color1, config.fogDensity);
    }

    private createParticles(config: RitualConfig) {
        const count = config.particleCount;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const offsets = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            offsets[i * 3] = (Math.random() - 0.5) * 10;
            offsets[i * 3 + 1] = (Math.random() - 0.5) * 10;
            offsets[i * 3 + 2] = (Math.random() - 0.5) * 10;
            sizes[i] = Math.random() * 5 + 1;
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

    public animate(config: RitualConfig) {
        const time = this.clock.getElapsedTime();
        
        this.bgMaterial.uniforms.uTime.value = time;
        
        if (this.particles) {
            const mat = this.particles.material as THREE.ShaderMaterial;
            mat.uniforms.uTime.value = time;
            mat.uniforms.uSpeed.value = config.speed;
            mat.uniforms.uIntensity.value = config.intensity;

            const pos = this.particles.geometry.attributes.aOffset.array as Float32Array;
            for (let i = 0; i < config.particleCount; i++) {
                if (config.motionStyle === 'rising') {
                    pos[i * 3 + 1] += 0.01 * config.speed;
                    if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -5;
                } else if (config.motionStyle === 'rain') {
                    pos[i * 3 + 1] -= 0.05 * config.speed;
                    if (pos[i * 3 + 1] < -5) pos[i * 3 + 1] = 5;
                } else if (config.motionStyle === 'drifting') {
                    pos[i * 3] += Math.sin(time * 0.1 + i) * 0.001;
                    pos[i * 3 + 1] += Math.cos(time * 0.1 + i) * 0.001;
                }
            }
            this.particles.geometry.attributes.aOffset.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate(config));
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
