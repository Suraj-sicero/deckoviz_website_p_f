import * as THREE from 'three';

export abstract class BaseEngine {
    protected scene: THREE.Scene;
    protected camera: THREE.PerspectiveCamera;
    protected renderer: THREE.WebGLRenderer;
    protected clock: THREE.Clock;
    protected container: HTMLElement;
    protected frameId: number | null = null;

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            2000
        );
        
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
        });
        
        this.clock = new THREE.Clock();
        
        this.init();
        this.onResize();
        window.addEventListener('resize', this.onResize.bind(this));
    }

    private init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
    }

    public abstract update(params: any): void;

    public animate() {
        const delta = this.clock.getDelta();
        const time = this.clock.getElapsedTime();
        
        this.render(delta, time);
        this.frameId = requestAnimationFrame(this.animate.bind(this));
    }

    protected render(delta: number, time: number) {
        this.renderer.render(this.scene, this.camera);
    }

    protected onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    public dispose() {
        if (this.frameId) cancelAnimationFrame(this.frameId);
        window.removeEventListener('resize', this.onResize);
        
        this.scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.geometry.dispose();
                if (Array.isArray(object.material)) {
                    object.material.forEach(m => m.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
        
        this.renderer.dispose();
        if (this.container.contains(this.renderer.domElement)) {
            this.container.removeChild(this.renderer.domElement);
        }
    }
}
