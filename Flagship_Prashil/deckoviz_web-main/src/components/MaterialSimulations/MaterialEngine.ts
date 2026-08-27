import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { MaterialConfig, MaterialType } from './types';
import { 
    commonVertexShader, 
    liquidMetalShader, 
    lavaShader, 
    crystalShader, 
    glassShader,
    fabricShader,
    sandShader
} from './Shaders';

export class MaterialEngine {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private composer!: EffectComposer;
    private bloomPass!: UnrealBloomPass;
    private clock: THREE.Clock;
    private container: HTMLElement;
    
    private currentMesh: THREE.Mesh | null = null;
    private material: THREE.ShaderMaterial | null = null;

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.clock = new THREE.Clock();
        
        this.setupRenderer();
        this.setupPostProcessing();
        this.setupLights();
        
        this.onResize = this.onResize.bind(this);
        window.addEventListener('resize', this.onResize);
    }

    private setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;
    }

    private setupPostProcessing() {
        const renderPass = new RenderPass(this.scene, this.camera);
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.0, 0.4, 0.85
        );
        
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(renderPass);
        this.composer.addPass(this.bloomPass);
    }

    private setupLights() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        const directional = new THREE.DirectionalLight(0xffffff, 1);
        directional.position.set(5, 5, 5);
        this.scene.add(ambient, directional);
    }

    private currentType: MaterialType | null = null;

    public updateMaterial(config: MaterialConfig) {
        if (this.currentType === config.type && this.material) {
            this.material.uniforms.uSpeed.value = config.speed;
            this.material.uniforms.uIntensity.value = config.intensity;
            this.material.uniforms.uColor.value.set(config.color);
            this.bloomPass.strength = config.bloomStrength;
            return;
        }

        this.currentType = config.type;
        this.clearScene();
        this.bloomPass.strength = config.bloomStrength;

        let geometry: THREE.BufferGeometry;
        if (config.type === 'crystal') {
            geometry = new THREE.IcosahedronGeometry(2, 0);
        } else {
            geometry = new THREE.IcosahedronGeometry(2, 64);
        }

        const shader = this.getShaderForType(config.type) as { vertex?: string; fragment: string };
        this.material = new THREE.ShaderMaterial({
            vertexShader: shader.vertex || commonVertexShader,
            fragmentShader: shader.fragment,
            uniforms: {
                uTime: { value: 0 },
                uSpeed: { value: config.speed },
                uIntensity: { value: config.intensity },
                uColor: { value: new THREE.Color(config.color) }
            },
            transparent: config.type === 'glass',
            side: THREE.DoubleSide
        });

        this.currentMesh = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.currentMesh);
    }

    private getShaderForType(type: MaterialType) {
        switch (type) {
            case 'metal': return liquidMetalShader;
            case 'lava': return { fragment: lavaShader.fragment };
            case 'crystal': return { fragment: crystalShader.fragment };
            case 'glass': return { fragment: glassShader.fragment };
            case 'fabric': return fabricShader;
            case 'sand': return { fragment: sandShader.fragment };
            default: return liquidMetalShader;
        }
    }

    private clearScene() {
        if (this.currentMesh) {
            this.currentMesh.geometry.dispose();
            (this.currentMesh.material as THREE.Material).dispose();
            this.scene.remove(this.currentMesh);
        }
    }

    public animate() {
        const time = this.clock.getElapsedTime();
        if (this.material) {
            this.material.uniforms.uTime.value = time;
        }
        if (this.currentMesh) {
            this.currentMesh.rotation.y = time * 0.2;
            this.currentMesh.rotation.x = time * 0.1;
        }

        this.composer.render();
        requestAnimationFrame(this.animate.bind(this));
    }

    private onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.composer.setSize(window.innerWidth, window.innerHeight);
    }

    public dispose() {
        window.removeEventListener('resize', this.onResize);
        this.renderer.dispose();
    }
}
