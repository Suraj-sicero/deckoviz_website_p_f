import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { CosmicMode, CosmicConfig } from './types';
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
    private composer: EffectComposer;
    private bloomPass: UnrealBloomPass;
    private clock: THREE.Clock;
    private container: HTMLElement;
    
    private modeGroup: THREE.Group;
    private stars: THREE.Points | null = null;
    
    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.clock = new THREE.Clock();
        this.modeGroup = new THREE.Group();
        
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
        this.camera.position.z = 100;
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
        for (let i = 0; i < 10000; i++) {
            vertices.push(
                THREE.MathUtils.randFloatSpread(2000),
                THREE.MathUtils.randFloatSpread(2000),
                THREE.MathUtils.randFloatSpread(2000)
            );
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, transparent: true, opacity: 0.8 });
        this.stars = new THREE.Points(geometry, material);
        this.scene.add(this.stars);
    }

    public updateMode(config: CosmicConfig) {
        this.clearModeGroup();
        this.bloomPass.strength = config.bloomStrength;
        
        switch (config.mode) {
            case 'nebula': this.createNebula(config); break;
            case 'orbits': this.createOrbits(config); break;
            case 'blackhole': this.createBlackHole(config); break;
            case 'meteors': this.createMeteors(config); break;
            case 'starbirth': this.createStarBirth(config); break;
        }
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
        const geometry = new THREE.SphereGeometry(150, 64, 64);
        const material = new THREE.ShaderMaterial({
            vertexShader: nebulaVertexShader,
            fragmentShader: nebulaFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uIntensity: { value: config.intensity },
                uColor1: { value: new THREE.Color(0x7000ff) },
                uColor2: { value: new THREE.Color(0x00f2ff) }
            },
            transparent: true,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });
        const mesh = new THREE.Mesh(geometry, material);
        this.modeGroup.add(mesh);
    }

    private createOrbits(config: CosmicConfig) {
        // Sun
        const sunGeo = new THREE.SphereGeometry(10, 32, 32);
        const sunMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        this.modeGroup.add(sun);

        // Planets
        const planetData = [
            { dist: 25, size: 2, color: 0xff4400, speed: 1.2 },
            { dist: 45, size: 4, color: 0x00aaff, speed: 0.8 },
            { dist: 70, size: 6, color: 0xaa8866, speed: 0.5 },
        ];

        planetData.forEach(p => {
            const orbitGroup = new THREE.Group();
            const planetGeo = new THREE.SphereGeometry(p.size, 32, 32);
            const planetMat = new THREE.MeshStandardMaterial({ color: p.color });
            const planet = new THREE.Mesh(planetGeo, planetMat);
            planet.position.x = p.dist;
            
            // Orbit trail
            const trailGeo = new THREE.TorusGeometry(p.dist, 0.2, 16, 100);
            const trailMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
            const trail = new THREE.Mesh(trailGeo, trailMat);
            trail.rotation.x = Math.PI / 2;

            orbitGroup.add(planet, trail);
            (orbitGroup as any).orbitSpeed = p.speed * config.speed;
            this.modeGroup.add(orbitGroup);
        });

        const light = new THREE.PointLight(0xffffff, 2, 500);
        this.modeGroup.add(light);
    }

    private createBlackHole(config: CosmicConfig) {
        const geometry = new THREE.PlaneGeometry(100, 100);
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
        mesh.lookAt(this.camera.position);
        this.modeGroup.add(mesh);
    }

    private createMeteors(config: CosmicConfig) {
        const group = new THREE.Group();
        for (let i = 0; i < 50; i++) {
            const geometry = new THREE.ConeGeometry(0.5, 5, 8);
            const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
            const meteor = new THREE.Mesh(geometry, material);
            meteor.position.set(
                THREE.MathUtils.randFloatSpread(500),
                THREE.MathUtils.randFloatSpread(500),
                THREE.MathUtils.randFloatSpread(500)
            );
            meteor.lookAt(0, 0, 0);
            (meteor as any).velocity = new THREE.Vector3(0, 0, 0).randomDirection().multiplyScalar(config.speed * 2);
            group.add(meteor);
        }
        this.modeGroup.add(group);
    }

    private createStarBirth(config: CosmicConfig) {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        for (let i = 0; i < 5000; i++) {
            vertices.push(
                THREE.MathUtils.randFloatSpread(300),
                THREE.MathUtils.randFloatSpread(300),
                THREE.MathUtils.randFloatSpread(300)
            );
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({ color: 0xffaa00, size: 1, transparent: true, blending: THREE.AdditiveBlending });
        const particles = new THREE.Points(geometry, material);
        this.modeGroup.add(particles);
    }

    public animate(config: CosmicConfig) {
        const delta = this.clock.getDelta();
        const time = this.clock.getElapsedTime();

        if (config.driftEnabled) {
            this.camera.position.x += Math.sin(time * 0.2) * 0.1;
            this.camera.position.y += Math.cos(time * 0.2) * 0.1;
            this.camera.lookAt(0, 0, 0);
        }

        this.modeGroup.children.forEach(child => {
            // Nebula shader update
            if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial) {
                child.material.uniforms.uTime.value = time * config.speed;
            }
            
            // Orbits update
            if ((child as any).orbitSpeed) {
                child.rotation.y += (child as any).orbitSpeed * delta * config.speed;
            }

            // Meteors update
            if ((child as any).velocity) {
                child.position.add((child as any).velocity.clone().multiplyScalar(delta));
                if (child.position.length() > 500) child.position.setLength(0);
            }
            
            // Star Birth contraction
            if (child instanceof THREE.Points && config.mode === 'starbirth') {
                const pos = child.geometry.attributes.position.array as Float32Array;
                for (let i = 0; i < pos.length; i += 3) {
                    const v = new THREE.Vector3(pos[i], pos[i+1], pos[i+2]);
                    const dist = v.length();
                    v.multiplyScalar(0.99); // Contract
                    if (dist < 5) v.setLength(300); // Reset after collapse
                    pos[i] = v.x; pos[i+1] = v.y; pos[i+2] = v.z;
                }
                child.geometry.attributes.position.needsUpdate = true;
            }
        });

        if (this.stars) {
            this.stars.rotation.y += 0.0002;
        }

        this.composer.render();
        requestAnimationFrame(() => this.animate(config));
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
