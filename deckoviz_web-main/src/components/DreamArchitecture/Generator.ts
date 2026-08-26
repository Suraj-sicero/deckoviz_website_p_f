import * as THREE from 'three';
import { ArchConfig, ArchStyle } from './types';

export class ArchGenerator {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    private random(): number {
        const x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

    public generate(config: ArchConfig): THREE.Group {
        const group = new THREE.Group();
        this.seed = config.seed;

        const count = Math.floor(config.density * 100);
        
        switch (config.style) {
            case 'brutalist': this.generateBrutalist(group, config, count); break;
            case 'gothic': this.generateGothic(group, config, count); break;
            case 'floating': this.generateFloating(group, config, count); break;
            case 'library': this.generateLibrary(group, config, count); break;
            case 'organic': this.generateOrganic(group, config, count); break;
        }

        return group;
    }

    private generateBrutalist(group: THREE.Group, config: ArchConfig, count: number) {
        const geo = new THREE.BoxGeometry(1, 1, 1);
        const mat = new THREE.MeshStandardMaterial({ color: config.color1, roughness: 0.9 });
        
        for (let i = 0; i < count; i++) {
            const w = (this.random() * 5 + 2) * config.scale;
            const h = (this.random() * 20 + 5) * config.height;
            const d = (this.random() * 5 + 2) * config.scale;
            
            const mesh = new THREE.Mesh(geo, mat);
            mesh.scale.set(w, h, d);
            mesh.position.set(
                (this.random() - 0.5) * 100,
                h / 2,
                (this.random() - 0.5) * 100
            );
            group.add(mesh);
        }
    }

    private generateGothic(group: THREE.Group, config: ArchConfig, count: number) {
        const pillarGeo = new THREE.CylinderGeometry(0.5, 0.5, 20);
        const archGeo = new THREE.TorusGeometry(5, 0.5, 16, 100, Math.PI);
        const mat = new THREE.MeshStandardMaterial({ color: config.color1, metalness: 0.2 });
        
        for (let i = 0; i < count / 2; i++) {
            const x = (i - count / 4) * 10;
            
            // Left Pillar
            const p1 = new THREE.Mesh(pillarGeo, mat);
            p1.position.set(x - 5, 10, 0);
            
            // Right Pillar
            const p2 = new THREE.Mesh(pillarGeo, mat);
            p2.position.set(x + 5, 10, 0);
            
            // Arch
            const arch = new THREE.Mesh(archGeo, mat);
            arch.position.set(x, 20, 0);
            
            group.add(p1, p2, arch);
        }
    }

    private generateFloating(group: THREE.Group, config: ArchConfig, count: number) {
        const geo = new THREE.IcosahedronGeometry(1, 1);
        const mat = new THREE.MeshStandardMaterial({ color: config.color1, emissive: config.color2, emissiveIntensity: 0.5 });
        
        for (let i = 0; i < count; i++) {
            const size = (this.random() * 10 + 2) * config.scale;
            const mesh = new THREE.Mesh(geo, mat);
            mesh.scale.set(size, size * 0.5, size);
            mesh.position.set(
                (this.random() - 0.5) * 200,
                (this.random() - 0.5) * 100 + 50,
                (this.random() - 0.5) * 200
            );
            mesh.rotation.set(this.random(), this.random(), this.random());
            group.add(mesh);
        }
    }

    private generateLibrary(group: THREE.Group, config: ArchConfig, count: number) {
        const shelfGeo = new THREE.BoxGeometry(10, 20, 2);
        const mat = new THREE.MeshStandardMaterial({ color: config.color1 });
        
        for (let i = 0; i < count; i++) {
            const row = Math.floor(i / 10);
            const col = i % 10;
            
            const mesh = new THREE.Mesh(shelfGeo, mat);
            mesh.position.set(col * 15 - 75, 10, row * 10 - 50);
            group.add(mesh);
        }
    }

    private generateOrganic(group: THREE.Group, config: ArchConfig, count: number) {
        const geo = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
        const mat = new THREE.MeshStandardMaterial({ color: config.color1, roughness: 0.2 });
        
        for (let i = 0; i < count / 2; i++) {
            const size = (this.random() * 15 + 5) * config.scale;
            const mesh = new THREE.Mesh(geo, mat);
            mesh.scale.set(size, size, size);
            mesh.position.set(
                (this.random() - 0.5) * 150,
                size,
                (this.random() - 0.5) * 150
            );
            mesh.rotation.set(this.random(), this.random(), this.random());
            group.add(mesh);
        }
    }
}
