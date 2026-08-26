export interface Point {
    x: number;
    y: number;
    oldX: number;
    oldY: number;
    vx: number;
    vy: number;
    mass: number;
    invMass: number;
    pinned: boolean;
    color: string;
}

export interface Constraint {
    p1: Point;
    p2: Point;
    distance: number;
    stiffness: number;
    type: 'link' | 'cloth' | 'soft';
    teared: boolean;
}

export class PhysicsEngine {
    points: Point[] = [];
    constraints: Constraint[] = [];
    clothMeshes: { points: Point[][], cols: number, rows: number }[] = [];
    width: number;
    height: number;
    
    params = {
        gravity: 0.5,
        wind: 0,
        friction: 0.99,
        stiffness: 0.8,
        iterations: 8,
        subSteps: 3,
        tearThreshold: 100,
        paused: false,
    };

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    addPoint(x: number, y: number, pinned = false, color = '#ffffff'): Point {
        const p: Point = {
            x, y, 
            oldX: x, oldY: y,
            vx: 0, vy: 0,
            mass: 1, invMass: pinned ? 0 : 1,
            pinned, color
        };
        this.points.push(p);
        return p;
    }

    addConstraint(p1: Point, p2: Point, stiffness = this.params.stiffness, type: Constraint['type'] = 'link') {
        const dist = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
        this.constraints.push({ p1, p2, distance: dist, stiffness, type, teared: false });
    }

    update() {
        if (this.params.paused) return;

        for (let s = 0; s < this.params.subSteps; s++) {
            this.applyForces();
            this.integrate();
            this.solveConstraints();
            this.handleCollisions();
        }
    }

    applyForces() {
        for (const p of this.points) {
            if (p.pinned) continue;
            p.vy += this.params.gravity / this.params.subSteps;
            p.vx += this.params.wind / this.params.subSteps;
        }
    }

    integrate() {
        for (const p of this.points) {
            if (p.pinned) continue;
            const vx = (p.x - p.oldX) * this.params.friction;
            const vy = (p.y - p.oldY) * this.params.friction;
            p.oldX = p.x;
            p.oldY = p.y;
            p.x += vx;
            p.y += vy;
        }
    }

    solveConstraints() {
        for (let i = 0; i < this.params.iterations; i++) {
            for (let j = this.constraints.length - 1; j >= 0; j--) {
                const c = this.constraints[j];
                if (c.teared) continue;

                const dx = c.p2.x - c.p1.x;
                const dy = c.p2.y - c.p1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // Tearing logic
                if (dist > c.distance * 2.5 && c.type === 'cloth') {
                    c.teared = true;
                    continue;
                }

                const diff = (c.distance - dist) / dist;
                const ratio1 = c.p1.invMass / (c.p1.invMass + c.p2.invMass);
                const ratio2 = 1 - ratio1;

                if (!c.p1.pinned) {
                    c.p1.x -= dx * ratio1 * diff * c.stiffness;
                    c.p1.y -= dy * ratio1 * diff * c.stiffness;
                }
                if (!c.p2.pinned) {
                    c.p2.x += dx * ratio2 * diff * c.stiffness;
                    c.p2.y += dy * ratio2 * diff * c.stiffness;
                }
            }
        }
    }

    handleCollisions() {
        const bounce = 0.5;
        for (const p of this.points) {
            if (p.pinned) continue;
            
            // Boundary
            if (p.x < 0) { p.x = 0; p.oldX = p.x + (p.x - p.oldX) * bounce; }
            if (p.x > this.width) { p.x = this.width; p.oldX = p.x + (p.x - p.oldX) * bounce; }
            if (p.y < 0) { p.y = 0; p.oldY = p.y + (p.y - p.oldY) * bounce; }
            if (p.y > this.height) { p.y = this.height; p.oldY = p.y + (p.y - p.oldY) * bounce; }
        }
    }

    clear() {
        this.points = [];
        this.constraints = [];
        this.clothMeshes = [];
    }

    createCloth(startX: number, startY: number, cols: number, rows: number, spacing: number) {
        const clothPoints: Point[][] = [];
        for (let y = 0; y < rows; y++) {
            clothPoints[y] = [];
            for (let x = 0; x < cols; x++) {
                const pinned = y === 0;
                const p = this.addPoint(startX + x * spacing, startY + y * spacing, pinned, '#6366f1');
                clothPoints[y][x] = p;
                
                if (x > 0) this.addConstraint(clothPoints[y][x - 1], p, 0.9, 'cloth');
                if (y > 0) this.addConstraint(clothPoints[y - 1][x], p, 0.9, 'cloth');
            }
        }
        this.clothMeshes.push({ points: clothPoints, cols, rows });
    }

    createSoftBody(centerX: number, centerY: number, radius: number, segments: number) {
        const circlePoints: Point[] = [];
        const center = this.addPoint(centerX, centerY, false, '#ec4899');
        
        for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const p = this.addPoint(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius,
                false, '#ec4899'
            );
            circlePoints.push(p);
            this.addConstraint(center, p, 0.4, 'soft');
            if (i > 0) {
                this.addConstraint(circlePoints[i - 1], p, 0.8, 'soft');
            }
        }
        this.addConstraint(circlePoints[segments - 1], circlePoints[0], 0.8, 'soft');
    }
}
