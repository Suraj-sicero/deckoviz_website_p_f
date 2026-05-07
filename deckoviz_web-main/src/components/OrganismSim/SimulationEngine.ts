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
    private currentConfig: OrganismConfig | null = null;
    private envParticles: THREE.Points | null = null;

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
        this.camera.position.z = 250;
    }

    public updateConfig(config: OrganismConfig) {
        this.currentConfig = config;
        this.clearAgents();
        this.updateEnvironment(config);
        this.createAgents(config);
    }

    public setParams(config: OrganismConfig) {
        this.currentConfig = config;
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
        
        const bgColor = config.environment === 'ocean' ? 0x000812 : (config.environment === 'space' ? 0x000000 : 0x051008);
        this.scene.background = new THREE.Color(bgColor);
        this.scene.fog = new THREE.FogExp2(bgColor, 0.003);
        
        const ambient = new THREE.AmbientLight(0xffffff, 0.2);
        this.environmentGroup.add(ambient);

        const point = new THREE.PointLight(config.color, 2, 500);
        point.position.set(0, 100, 50);
        this.environmentGroup.add(point);

        // Env particles
        if (this.envParticles) {
            this.scene.remove(this.envParticles);
            this.envParticles.geometry.dispose();
            (this.envParticles.material as THREE.Material).dispose();
        }

        const pCount = 1500;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        for(let i=0; i<pCount; i++) {
            pPos[i*3] = (Math.random()-0.5)*800;
            pPos[i*3+1] = (Math.random()-0.5)*800;
            pPos[i*3+2] = (Math.random()-0.5)*800;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({
            color: config.environment === 'ocean' ? 0x00ffff : (config.environment === 'space' ? 0xffffff : 0x88ffaa),
            size: 0.8,
            transparent: true,
            opacity: 0.4
        });
        this.envParticles = new THREE.Points(pGeo, pMat);
        this.scene.add(this.envParticles);
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
            emissiveIntensity: 1.5,
            metalness: config.type === 'fish' ? 0.9 : 0.2,
            roughness: 0.1,
            transparent: true,
            opacity: config.type === 'jellyfish' ? 0.6 : 0.9,
            flatShading: config.type === 'insect' || config.type === 'alien'
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

    public animate() {
        const delta = Math.min(this.clock.getDelta(), 0.1);
        const time = this.clock.getElapsedTime();
        const config = this.currentConfig;

        if (config && this.agents.length > 0 && this.instancedMesh) {
            BoidsEngine.update(this.agents, config, delta);

            for (let i = 0; i < this.agents.length; i++) {
                const agent = this.agents[i];
                this.dummy.position.copy(agent.position);
                
                const lookTarget = agent.position.clone().add(agent.velocity);
                this.dummy.lookAt(lookTarget);
                
                if (config.type === 'jellyfish') {
                    const pulse = 1.0 + Math.sin(time * 3 + i * 0.1) * 0.3;
                    this.dummy.scale.set(pulse, pulse * 0.5, pulse);
                } else if (config.type === 'fish') {
                    this.dummy.scale.set(1, 1, 1);
                    this.dummy.rotation.y += Math.sin(time * 10 + i) * 0.1;
                } else {
                    this.dummy.scale.set(1, 1, 1);
                }

                this.dummy.updateMatrix();
                this.instancedMesh.setMatrixAt(i, this.dummy.matrix);
            }
            this.instancedMesh.instanceMatrix.needsUpdate = true;
        }

        if (this.envParticles) {
            this.envParticles.rotation.y += 0.0005;
        }

        this.camera.position.x = Math.sin(time * 0.05) * 80;
        this.camera.position.z = 250 + Math.cos(time * 0.05) * 40;
        this.camera.lookAt(0, 0, 0);

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
