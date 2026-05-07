import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { CosmicConfig, MODE_DEFAULTS } from './types';
import { 
    nebulaVertexShader, 
    nebulaFragmentShader, 
    blackHoleVertexShader, 
    blackHoleFragmentShader 
} from './Shaders';

export class CelestialEngine {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private composer!: EffectComposer;
    private bloomPass!: UnrealBloomPass;
    private clock: THREE.Clock;
    private container: HTMLElement;
    
    private modeGroup: THREE.Group;
    private stars: THREE.Points | null = null;
    private currentConfig: CosmicConfig;
    
    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.clock = new THREE.Clock();
        this.modeGroup = new THREE.Group();
        this.currentConfig = MODE_DEFAULTS.nebula;
        
        this.setupRenderer();
        this.setupPostProcessing();
        this.createStarfield();
        this.scene.add(this.modeGroup);
        
        window.addEventListener('resize', this.onResize.bind(this));
    }

    private setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 150;
    }

    private setupPostProcessing() {
        const renderPass = new RenderPass(this.scene, this.camera);
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5, 0.4, 0.85
        );
        
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(renderPass);
        this.composer.addPass(this.bloomPass);
    }

    private createStarfield() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        for (let i = 0; i < 15000; i++) {
            vertices.push(
                THREE.MathUtils.randFloatSpread(2500),
                THREE.MathUtils.randFloatSpread(2500),
                THREE.MathUtils.randFloatSpread(2500)
            );
            const c = new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 0.5, 0.8);
            colors.push(c.r, c.g, c.b);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({ size: 0.8, vertexColors: true, transparent: true, opacity: 0.6 });
        this.stars = new THREE.Points(geometry, material);
        this.scene.add(this.stars);
    }

    public updateMode(config: CosmicConfig) {
        this.currentConfig = config;
        this.clearModeGroup();
        this.bloomPass.strength = config.bloomStrength;
        
        switch (config.mode) {
            case 'nebula': this.createNebula(config); break;
            case 'orbits': this.createOrbits(config); break;
            case 'blackhole': this.createBlackHole(config); break;
            case 'meteors': this.createMeteors(config); break;
            case 'starbirth': this.createStarBirth(); break;
        }
    }

    public setParams(config: CosmicConfig) {
        this.currentConfig = config;
        this.bloomPass.strength = config.bloomStrength;
    }

    private clearModeGroup() {
        while (this.modeGroup.children.length > 0) {
            const obj = this.modeGroup.children[0] as any;
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
                else obj.material.dispose();
            }
            this.modeGroup.remove(obj);
        }
    }

    private createNebula(config: CosmicConfig) {
        const geometry = new THREE.SphereGeometry(200, 64, 64);
        const material = new THREE.ShaderMaterial({
            vertexShader: nebulaVertexShader,
            fragmentShader: nebulaFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uIntensity: { value: config.intensity },
                uColor1: { value: new THREE.Color(0x4f46e5) },
                uColor2: { value: new THREE.Color(0xec4899) }
            },
            transparent: true,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });
        const mesh = new THREE.Mesh(geometry, material);
        this.modeGroup.add(mesh);
    }

    private createOrbits(config: CosmicConfig) {
        const sunGeo = new THREE.SphereGeometry(15, 32, 32);
        const sunMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        this.modeGroup.add(sun);

        const planetData = [
            { dist: 40, size: 3, color: 0x6366f1, speed: 0.8, ring: true },
            { dist: 70, size: 5, color: 0xfb7185, speed: 0.5, ring: false },
            { dist: 110, size: 8, color: 0x2dd4bf, speed: 0.3, ring: true },
        ];

        planetData.forEach(p => {
            const system = new THREE.Group();
            
            const planetGeo = new THREE.SphereGeometry(p.size, 32, 32);
            const planetMat = new THREE.MeshStandardMaterial({ color: p.color, roughness: 0.4, metalness: 0.6 });
            const planet = new THREE.Mesh(planetGeo, planetMat);
            planet.position.x = p.dist;
            system.add(planet);

            if (p.ring) {
                const ringGeo = new THREE.TorusGeometry(p.size * 1.8, 0.1, 2, 64);
                const ringMat = new THREE.MeshBasicMaterial({ color: p.color, transparent: true, opacity: 0.4 });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.rotation.x = Math.PI / 2.5;
                ring.position.x = p.dist;
                system.add(ring);
            }

            const trailGeo = new THREE.TorusGeometry(p.dist, 0.1, 8, 128);
            const trailMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.1 });
            const trail = new THREE.Mesh(trailGeo, trailMat);
            trail.rotation.x = Math.PI / 2;
            this.modeGroup.add(trail);

            (system as any).orbitSpeed = p.speed * config.speed;
            this.modeGroup.add(system);
        });

        const light = new THREE.PointLight(0xffffff, 3, 600);
        this.modeGroup.add(light);
    }

    private createBlackHole(config: CosmicConfig) {
        const geometry = new THREE.PlaneGeometry(250, 250);
        const material = new THREE.ShaderMaterial({
            vertexShader: blackHoleVertexShader,
            fragmentShader: blackHoleFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uIntensity: { value: config.intensity }
            },
            transparent: true,
            side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 6;
        this.modeGroup.add(mesh);
    }

    private createMeteors(config: CosmicConfig) {
        const group = new THREE.Group();
        for (let i = 0; i < 80; i++) {
            const geometry = new THREE.CylinderGeometry(0.1, 0.8, 15, 8);
            const material = new THREE.MeshBasicMaterial({ 
                color: 0x6366f1, 
                transparent: true, 
                opacity: 0.6,
                blending: THREE.AdditiveBlending 
            });
            const meteor = new THREE.Mesh(geometry, material);
            meteor.position.set(
                THREE.MathUtils.randFloatSpread(800),
                THREE.MathUtils.randFloatSpread(800),
                THREE.MathUtils.randFloatSpread(800)
            );
            (meteor as any).velocity = new THREE.Vector3().randomDirection().multiplyScalar(config.speed * 4);
            meteor.lookAt(meteor.position.clone().add((meteor as any).velocity));
            meteor.rotateX(Math.PI / 2);
            group.add(meteor);
        }
        this.modeGroup.add(group);
    }

    private createStarBirth() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const sizes = [];
        for (let i = 0; i < 8000; i++) {
            vertices.push(
                THREE.MathUtils.randFloatSpread(400),
                THREE.MathUtils.randFloatSpread(400),
                THREE.MathUtils.randFloatSpread(400)
            );
            sizes.push(Math.random());
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
        
        const material = new THREE.PointsMaterial({ 
            color: 0x6366f1, 
            size: 1.5, 
            transparent: true, 
            blending: THREE.AdditiveBlending,
            opacity: 0.8
        });
        const particles = new THREE.Points(geometry, material);
        this.modeGroup.add(particles);

        const coreGeo = new THREE.SphereGeometry(2, 32, 32);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const core = new THREE.Mesh(coreGeo, coreMat);
        this.modeGroup.add(core);
    }

    public animate() {
        const delta = Math.min(this.clock.getDelta(), 0.1);
        const time = this.clock.getElapsedTime();
        const config = this.currentConfig;

        if (config.driftEnabled) {
            this.camera.position.x += Math.sin(time * 0.1) * 0.05;
            this.camera.position.y += Math.cos(time * 0.1) * 0.05;
            this.camera.lookAt(0, 0, 0);
        }

        this.modeGroup.children.forEach(child => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial) {
                child.material.uniforms.uTime.value = time * config.speed;
            }
            
            if ((child as any).orbitSpeed) {
                child.rotation.y += (child as any).orbitSpeed * delta * config.speed;
            }

            if ((child as any).velocity) {
                child.position.add((child as any).velocity.clone().multiplyScalar(delta * config.speed));
                if (child.position.length() > 600) child.position.setLength(0);
            }
            
            if (child instanceof THREE.Points && config.mode === 'starbirth') {
                const pos = child.geometry.attributes.position.array as Float32Array;
                for (let i = 0; i < pos.length; i += 3) {
                    const v = new THREE.Vector3(pos[i], pos[i+1], pos[i+2]);
                    const dist = v.length();
                    v.multiplyScalar(0.995); 
                    if (dist < 2) v.setLength(THREE.MathUtils.randFloat(300, 400)); 
                    pos[i] = v.x; pos[i+1] = v.y; pos[i+2] = v.z;
                }
                child.geometry.attributes.position.needsUpdate = true;
            }
        });

        if (this.stars) {
            this.stars.rotation.y += 0.0001;
        }

        this.composer.render();
        requestAnimationFrame(() => this.animate());
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
