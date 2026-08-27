import * as THREE from 'three';
import { Agent, OrganismConfig } from './types';

export class BoidsEngine {
    static update(agents: Agent[], config: OrganismConfig, delta: number) {
        const perceptionRadius = 20;
        const maxSpeed = config.speed;
        const maxForce = 0.05;

        for (let i = 0; i < agents.length; i++) {
            const agent = agents[i];
            
            let separation = new THREE.Vector3();
            let alignment = new THREE.Vector3();
            let cohesion = new THREE.Vector3();
            let total = 0;

            for (let j = 0; j < agents.length; j++) {
                if (i === j) continue;
                
                const other = agents[j];
                const d = agent.position.distanceTo(other.position);

                if (d < perceptionRadius) {
                    // Separation
                    const diff = agent.position.clone().sub(other.position);
                    diff.divideScalar(d * d);
                    separation.add(diff);

                    // Alignment
                    alignment.add(other.velocity);

                    // Cohesion
                    cohesion.add(other.position);
                    
                    total++;
                }
            }

            if (total > 0) {
                // Average and Normalize
                separation.divideScalar(total).normalize().multiplyScalar(maxSpeed).sub(agent.velocity).clampLength(0, maxForce);
                alignment.divideScalar(total).normalize().multiplyScalar(maxSpeed).sub(agent.velocity).clampLength(0, maxForce);
                cohesion.divideScalar(total).sub(agent.position).normalize().multiplyScalar(maxSpeed).sub(agent.velocity).clampLength(0, maxForce);

                // Apply Weights
                agent.acceleration.add(separation.multiplyScalar(config.separation));
                agent.acceleration.add(alignment.multiplyScalar(config.alignment));
                agent.acceleration.add(cohesion.multiplyScalar(config.cohesion));
            }

            // Random Noise
            const noise = new THREE.Vector3(
                (Math.random() - 0.5) * config.randomness,
                (Math.random() - 0.5) * config.randomness,
                (Math.random() - 0.5) * config.randomness
            );
            agent.acceleration.add(noise);

            // Boundaries (wrap around or bounce)
            this.handleBoundaries(agent);

            // Physics Update
            agent.velocity.add(agent.acceleration);
            agent.velocity.clampLength(0, maxSpeed);
            agent.position.add(agent.velocity.clone().multiplyScalar(delta * 60));
            agent.acceleration.set(0, 0, 0);
        }
    }

    private static handleBoundaries(agent: Agent) {
        const bound = 100;
        if (agent.position.x > bound) agent.position.x = -bound;
        if (agent.position.x < -bound) agent.position.x = bound;
        if (agent.position.y > bound) agent.position.y = -bound;
        if (agent.position.y < -bound) agent.position.y = bound;
        if (agent.position.z > bound) agent.position.z = -bound;
        if (agent.position.z < -bound) agent.position.z = bound;
    }
}
