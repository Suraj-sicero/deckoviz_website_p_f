import { Results } from '@mediapipe/pose';

export type MotionMode = 'trail' | 'particles' | 'skeleton' | 'energy';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    hue: number;
}

export class MotionRenderer {
    ctx: CanvasRenderingContext2D;
    width: number = 0;
    height: number = 0;
    
    trails: Map<number, {x: number, y: number}[]> = new Map();
    particles: Particle[] = [];
    
    params = {
        mode: 'trail' as MotionMode,
        sensitivity: 0.5,
        trailLength: 20,
        particleDensity: 5,
        colorMode: 'rainbow',
    };

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    setViewport(w: number, h: number) {
        this.width = w;
        this.height = h;
    }

    render(results: Results) {
        const { ctx, width, height } = this;
        
        // Background fade for trails
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);

        if (!results.poseLandmarks) return;

        ctx.save();
        // Mirror horizontally
        ctx.translate(width, 0);
        ctx.scale(-1, 1);

        if (this.params.mode === 'skeleton') {
            this.drawSkeleton(results.poseLandmarks);
        } else if (this.params.mode === 'trail') {
            this.drawTrails(results.poseLandmarks);
        } else if (this.params.mode === 'particles') {
            this.drawParticles(results.poseLandmarks);
        } else if (this.params.mode === 'energy') {
            this.drawEnergyField(results.poseLandmarks);
        }

        this.updateParticles();
        ctx.restore();
    }

    private drawSkeleton(landmarks: Required<Results>['poseLandmarks']) {
        const ctx = this.ctx;
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ffff';

        const connections = [
            [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], // Upper body
            [11, 23], [12, 24], [23, 24], // Torso
            [23, 25], [25, 27], [24, 26], [26, 28] // Lower body
        ];

        connections.forEach(([i, j]) => {
            const p1 = landmarks[i];
            const p2 = landmarks[j];
            if (p1 && p2 && (p1.visibility ?? 0) > 0.5 && (p2.visibility ?? 0) > 0.5) {
                ctx.beginPath();
                ctx.moveTo(p1.x * this.width, p1.y * this.height);
                ctx.lineTo(p2.x * this.width, p2.y * this.height);
                ctx.stroke();
            }
        });
    }

    private drawTrails(landmarks: Required<Results>['poseLandmarks']) {
        const ctx = this.ctx;
        // Focus on wrists (15, 16) and ankles (27, 28)
        [15, 16, 27, 28].forEach(idx => {
            const p = landmarks[idx];
            if (p && (p.visibility ?? 0) > 0.5) {
                const trail = this.trails.get(idx) || [];
                trail.push({ x: p.x * this.width, y: p.y * this.height });
                if (trail.length > this.params.trailLength) trail.shift();
                this.trails.set(idx, trail);

                if (trail.length > 2) {
                    ctx.beginPath();
                    ctx.moveTo(trail[0].x, trail[0].y);
                    for (let i = 1; i < trail.length; i++) {
                        ctx.lineTo(trail[i].x, trail[i].y);
                    }
                    const hue = (idx * 50 + Date.now() / 10) % 360;
                    ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.8)`;
                    ctx.lineWidth = 10;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                }
            }
        });
    }

    private drawParticles(landmarks: Required<Results>['poseLandmarks']) {
        [15, 16, 27, 28].forEach(idx => {
            const p = landmarks[idx];
            if (p && (p.visibility ?? 0) > 0.5) {
                for (let i = 0; i < this.params.particleDensity; i++) {
                    this.particles.push({
                        x: p.x * this.width,
                        y: p.y * this.height,
                        vx: (Math.random() - 0.5) * 5,
                        vy: (Math.random() - 0.5) * 5,
                        life: 1.0,
                        hue: (idx * 50 + Date.now() / 10) % 360
                    });
                }
            }
        });
    }

    private updateParticles() {
        const ctx = this.ctx;
        ctx.save();
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.life})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.life * 5, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    private drawEnergyField(landmarks: Required<Results>['poseLandmarks']) {
        const ctx = this.ctx;
        ctx.globalCompositeOperation = 'lighter';
        landmarks.forEach((p, i) => {
            if (p && (p.visibility ?? 0) > 0.5 && i > 10) { // Only major joints
                const grad = ctx.createRadialGradient(p.x * this.width, p.y * this.height, 0, p.x * this.width, p.y * this.height, 50);
                grad.addColorStop(0, 'rgba(0, 255, 255, 0.4)');
                grad.addColorStop(1, 'rgba(0, 255, 255, 0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.x * this.width, p.y * this.height, 50, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        ctx.globalCompositeOperation = 'source-over';
    }
}
