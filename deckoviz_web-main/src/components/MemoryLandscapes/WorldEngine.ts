import * as THREE from 'three';
import { SceneConfig } from './types';

export class WorldEngine {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private container: HTMLElement;
    private clock: THREE.Clock;
    
    private terrain: THREE.Mesh | null = null;
    private particles: THREE.Points | null = null;
    private objects: THREE.Group;
    private lights: THREE.Group;

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.clock = new THREE.Clock();
        this.objects = new THREE.Group();
        this.lights = new THREE.Group();
        
        this.setupRenderer();
        this.scene.add(this.objects);
        this.scene.add(this.lights);
        
        window.addEventListener('resize', this.onResize.bind(this));
    }

    private setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.set(0, 5, 20);
    }

    public updateScene(config: SceneConfig) {
        this.clearObjects();
        this.updateAtmosphere(config);
        this.generateTerrain(config);
        this.generateObjects(config);
        this.generateParticles(config);
        this.setupLights(config);
    }

    private clearObjects() {
        while (this.objects.children.length > 0) this.objects.remove(this.objects.children[0]);
        while (this.lights.children.length > 0) this.lights.remove(this.lights.children[0]);
        if (this.terrain) {
            this.terrain.geometry.dispose();
            (this.terrain.material as THREE.Material).dispose();
            this.scene.remove(this.terrain);
        }
        if (this.particles) {
            this.particles.geometry.dispose();
            (this.particles.material as THREE.Material).dispose();
            this.scene.remove(this.particles);
        }
    }

    private updateAtmosphere(config: SceneConfig) {
        const color = new THREE.Color(config.colors[0]);
        this.scene.background = color;
        this.scene.fog = new THREE.FogExp2(color, config.fogDensity);
    }

    private generateTerrain(config: SceneConfig) {
        const geometry = new THREE.PlaneGeometry(200, 200, 100, 100);
        const vertices = geometry.attributes.position.array;
        
        for (let i = 0; i < vertices.length; i += 3) {
            const x = vertices[i];
            const y = vertices[i + 1];
            // Simple procedural height
            vertices[i + 2] = Math.sin(x * 0.1) * Math.cos(y * 0.1) * config.terrainHeight;
        }
        
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({
            color: config.colors[1],
            wireframe: config.environment === 'abstract',
            roughness: 0.8,
            metalness: 0.2
        });
        
        this.terrain = new THREE.Mesh(geometry, material);
        this.terrain.rotation.x = -Math.PI / 2;
        this.terrain.receiveShadow = true;
        this.scene.add(this.terrain);
    }

    private generateObjects(config: SceneConfig) {
        const count = config.environment === 'forest' ? 50 : (config.environment === 'city' ? 30 : 0);
        
        for (let i = 0; i < count; i++) {
            let mesh: THREE.Mesh;
            if (config.environment === 'forest') {
                mesh = this.createTree(config.colors[2]);
            } else {
                mesh = this.createBuilding(config.colors[2]);
            }
            
            mesh.position.set(
                (Math.random() - 0.5) * 150,
                0,
                (Math.random() - 0.5) * 150
            );
            
            // Adjust height based on terrain
            mesh.position.y = Math.sin(mesh.position.x * 0.1) * Math.cos(mesh.position.z * 0.1) * config.terrainHeight;
            
            this.objects.add(mesh);
        }
    }

    private createTree(color: string): THREE.Mesh {
        const group = new THREE.Group();
        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.4, 3),
            new THREE.MeshStandardMaterial({ color: '#4b3621' })
        );
        const leaves = new THREE.Mesh(
            new THREE.ConeGeometry(2, 5, 8),
            new THREE.MeshStandardMaterial({ color })
        );
        leaves.position.y = 3;
        group.add(trunk);
        group.add(leaves);
        return group as any;
    }

    private createBuilding(color: string): THREE.Mesh {
        const h = Math.random() * 15 + 5;
        const geometry = new THREE.BoxGeometry(4, h, 4);
        const material = new THREE.MeshStandardMaterial({ color, opacity: 0.8, transparent: true });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = h / 2;
        return mesh;
    }

    private generateParticles(config: SceneConfig) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(config.particleCount * 3);
        
        for (let i = 0; i < config.particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 200;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            size: 0.1,
            color: '#ffffff',
            transparent: true,
            opacity: 0.5
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    private setupLights(config: SceneConfig) {
        const ambient = new THREE.AmbientLight(0xffffff, config.lightIntensity * 0.5);
        const directional = new THREE.DirectionalLight(0xffffff, config.lightIntensity);
        directional.position.set(10, 20, 10);
        directional.castShadow = true;
        this.lights.add(ambient, directional);
    }

    public animate() {
        const time = this.clock.getElapsedTime();
        
        // Cinematic camera movement
        this.camera.position.x = Math.sin(time * 0.1) * 30;
        this.camera.position.z = Math.cos(time * 0.1) * 30;
        this.camera.lookAt(0, 0, 0);

        // Animate particles (rain/snow feel)
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array as Float32Array;
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] -= 0.1;
                if (positions[i] < -20) positions[i] = 50;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        // Animate terrain (waves)
        if (this.terrain) {
            const vertices = this.terrain.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < vertices.length; i += 3) {
                const x = vertices[i];
                const y = vertices[i + 1];
                vertices[i + 2] = Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 + time) * 2;
            }
            this.terrain.geometry.attributes.position.needsUpdate = true;
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
    }
}
