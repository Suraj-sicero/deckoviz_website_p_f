import * as THREE from 'three';
import { BaseEngine } from '../creative-suite/shared/BaseEngine';
import { SymmetryConfig } from './types';
import { kaleidoscopeShader } from './Shaders';

export class SymmetryEngine extends BaseEngine {
    private material: THREE.ShaderMaterial;
    private mesh: THREE.Mesh;

    constructor(container: HTMLElement) {
        super(container);
        
        this.material = new THREE.ShaderMaterial({
            vertexShader: kaleidoscopeShader.vertex,
            fragmentShader: kaleidoscopeShader.fragment,
            uniforms: {
                uTime: { value: 0 },
                uSides: { value: 8 },
                uZoom: { value: 1.0 },
                uIntensity: { value: 0.8 },
                uColorShift: { value: 0.5 }
            }
        });

        const geometry = new THREE.PlaneGeometry(20, 20);
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.mesh);
        
        this.camera.position.z = 5;
    }

    public update(config: SymmetryConfig) {
        this.material.uniforms.uSides.value = config.sides;
        this.material.uniforms.uZoom.value = config.zoom;
        this.material.uniforms.uIntensity.value = config.intensity;
        this.material.uniforms.uColorShift.value = config.colorShift;
    }

    protected render(delta: number, time: number) {
        this.material.uniforms.uTime.value = time;
        super.render(delta, time);
    }
}
