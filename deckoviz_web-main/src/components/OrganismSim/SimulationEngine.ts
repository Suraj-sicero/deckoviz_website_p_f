import * as THREE from 'three';
import { Agent, OrganismConfig, OrganismType } from './types';
import { BoidsEngine } from './Boids';

export class SimulationEngine {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private container: HTMLElement;
    private clock: THREE.Clock;
    
    private instancedMesh: THREE.InstancedMesh | null = null;
    private agents: Agent[] = [];
    private dummy = new THREE.Object3D();
    private environmentGroup: THREE.Group;

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.clock = new THREE.Clock();
        this.environmentGroup = new THREE.Group();
        
        this.setupRenderer();
        this.scene.add(this.environmentGroup);
        
        window.addEventListener('resize', this.onResize.bind(this));
    }

    private setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 200;
    }

    public updateConfig(config: OrganismConfig) {
        this.clearAgents();
        this.updateEnvironment(config);
        this.createAgents(config);
    }

    private clearAgents() {
        if (this.instancedMesh) {
            this.instancedMesh.geometry.dispose();
            (this.instancedMesh.material as THREE.Material).dispose();
            this.scene.remove(this.instancedMesh);
        }
        this.agents = [];
    }

    private updateEnvironment(config: OrganismConfig) {
        while(this.environmentGroup.children.length > 0) this.environmentGroup.remove(this.environmentGroup.children[0]);
        
        const bgColor = config.environment === 'ocean' ? 0x000510 : (config.environment === 'space' ? 0x000000 : 0x051005);
        this.scene.background = new THREE.Color(bgColor);
        this.scene.fog = new THREE.FogExp2(bgColor, 0.005);
        
        // Add subtle ambient light
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        this.environmentGroup.add(light);
    }

    private createAgents(config: OrganismConfig) {
        let geometry: THREE.BufferGeometry;
        
        switch (config.type) {
            case 'insect': geometry = new THREE.ConeGeometry(0.5, 2, 8); break;
            case 'fish': geometry = new THREE.BoxGeometry(0.5, 1, 3); break;
            case 'jellyfish': geometry = new THREE.SphereGeometry(2, 16, 16); break;
            case 'alien': geometry = new THREE.IcosahedronGeometry(1.5, 1); break;
            default: geometry = new THREE.SphereGeometry(1);
        }

        const material = new THREE.MeshStandardMaterial({
            color: config.color,
            emissive: config.color,
            emissiveIntensity: config.glowIntensity,
            metalness: 0.5,
            roughness: 0.2,
            transparent: true,
            opacity: 0.8
        });

        this.instancedMesh = new THREE.InstancedMesh(geometry, material, config.population);
        this.instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.scene.add(this.instancedMesh);

        for (let i = 0; i < config.population; i++) {
            const agent: Agent = {
                id: i,
                position: new THREE.Vector3().randomDirection().multiplyScalar(Math.random() * 100),
                velocity: new THREE.Vector3().randomDirection().multiplyScalar(config.speed),
                acceleration: new THREE.Vector3(),
                color: new THREE.Color(config.color),
                size: 1
            };
            this.agents.push(agent);
        }
    }

    public animate(config: OrganismConfig) {
        const delta = this.clock.getDelta();
        const time = this.clock.getElapsedTime();

        if (this.agents.length > 0 && this.instancedMesh) {
            BoidsEngine.update(this.agents, config, delta);

            for (let i = 0; i < this.agents.length; i++) {
                const agent = this.agents[i];
                this.dummy.position.copy(agent.position);
                
                // Align to velocity
                const lookTarget = agent.position.clone().add(agent.velocity);
                this.dummy.lookAt(lookTarget);
                
                // Pulsing for jellyfish
                if (config.type === 'jellyfish') {
                    const pulse = 1.0 + Math.sin(time * 5 + i) * 0.2;
                    this.dummy.scale.set(pulse, pulse, pulse);
                }

                this.dummy.updateMatrix();
                this.instancedMesh.setMatrixAt(i, this.dummy.matrix);
            }
            this.instancedMesh.instanceMatrix.needsUpdate = true;
        }

        // Camera drift
        this.camera.position.x = Math.sin(time * 0.1) * 50;
        this.camera.position.y = Math.cos(time * 0.1) * 50;
        this.camera.lookAt(0, 0, 0);

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
