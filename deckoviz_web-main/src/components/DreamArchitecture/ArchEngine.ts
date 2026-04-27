import * as THREE from 'three';
import { ArchConfig } from './types';
import { ArchGenerator } from './Generator';

export class ArchEngine {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private container: HTMLElement;
    private clock: THREE.Clock;
    
    private generator: ArchGenerator;
    private currentArch: THREE.Group | null = null;
    private lights: THREE.Group;

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.clock = new THREE.Clock();
        this.generator = new ArchGenerator(0);
        this.lights = new THREE.Group();
        
        this.setupRenderer();
        this.setupLights();
        
        this.onResize = this.onResize.bind(this);
        window.addEventListener('resize', this.onResize);
    }

    private setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.set(100, 50, 100);
    }

    private setupLights() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        const directional = new THREE.DirectionalLight(0xffffff, 1);
        directional.position.set(50, 100, 50);
        directional.castShadow = true;
        this.lights.add(ambient, directional);
        this.scene.add(this.lights);
    }

    private lastConfig: ArchConfig | null = null;

    public updateScene(config: ArchConfig) {
        // Optimization: Only update atmosphere if geometry params haven't changed
        if (this.lastConfig && 
            this.lastConfig.style === config.style && 
            this.lastConfig.seed === config.seed &&
            this.lastConfig.density === config.density &&
            this.lastConfig.scale === config.scale &&
            this.lastConfig.height === config.height &&
            this.lastConfig.color1 === config.color1) {
            
            this.updateAtmosphere(config);
            this.lastConfig = { ...config };
            return;
        }

        this.lastConfig = { ...config };
        this.clearArch();
        this.updateAtmosphere(config);
        
        this.currentArch = this.generator.generate(config);
        this.scene.add(this.currentArch);
    }

    private clearArch() {
        if (this.currentArch) {
            this.currentArch.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
                    else child.material.dispose();
                }
            });
            this.scene.remove(this.currentArch);
        }
    }

    private updateAtmosphere(config: ArchConfig) {
        const color = new THREE.Color(config.color2);
        this.scene.background = color;
        this.scene.fog = new THREE.FogExp2(color, config.fogDensity);
    }

    public animate() {
        const time = this.clock.getElapsedTime();
        
        // Cinematic camera
        this.camera.position.x = Math.sin(time * 0.1) * 150;
        this.camera.position.z = Math.cos(time * 0.1) * 150;
        this.camera.position.y = 50 + Math.sin(time * 0.2) * 20;
        this.camera.lookAt(0, 0, 0);

        if (this.currentArch) {
            // Subtle breathing motion for floating islands
            if (this.currentArch.children.length > 0 && this.currentArch.children[0].name === 'floating') {
                this.currentArch.position.y = Math.sin(time * 0.5) * 5;
            }
        }

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    }

    private onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    public dispose() {
        window.removeEventListener('resize', this.onResize);
        this.renderer.dispose();
        if (this.currentArch) this.clearArch();
    }
}
