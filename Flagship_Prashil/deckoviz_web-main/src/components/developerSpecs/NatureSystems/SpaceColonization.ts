export interface Node {
    x: number;
    y: number;
    parent: Node | null;
    dir: { x: number, y: number };
    count: number;
    thickness: number;
}

export interface Attractor {
    x: number;
    y: number;
    reached: boolean;
}

export class SpaceColonization {
    nodes: Node[] = [];
    attractors: Attractor[] = [];
    maxDist: number;
    minDist: number;
    stepSize: number;

    constructor(width: number, height: number, numAttractors = 400) {
        this.maxDist = 150;
        this.minDist = 10;
        this.stepSize = 10;

        for (let i = 0; i < numAttractors; i++) {
            this.attractors.push({
                x: Math.random() * width,
                y: Math.random() * (height * 0.7), // Concentrate at top
                reached: false
            });
        }

        const root: Node = {
            x: width / 2,
            y: height,
            parent: null,
            dir: { x: 0, y: -1 },
            count: 0,
            thickness: 1
        };
        this.nodes.push(root);
    }

    grow() {
        for (const attractor of this.attractors) {
            if (attractor.reached) continue;

            let closestNode = null;
            let recordDist = this.maxDist;

            for (const node of this.nodes) {
                const d = Math.sqrt((attractor.x - node.x) ** 2 + (attractor.y - node.y) ** 2);
                if (d < this.minDist) {
                    attractor.reached = true;
                    closestNode = null;
                    break;
                } else if (d < recordDist) {
                    closestNode = node;
                    recordDist = d;
                }
            }

            if (closestNode) {
                const dir = {
                    x: attractor.x - closestNode.x,
                    y: attractor.y - closestNode.y
                };
                const mag = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
                closestNode.dir.x += dir.x / mag;
                closestNode.dir.y += dir.y / mag;
                closestNode.count++;
            }
        }

        const newNodes: Node[] = [];
        for (const node of this.nodes) {
            if (node.count > 0) {
                const avgDir = {
                    x: node.dir.x / node.count,
                    y: node.dir.y / node.count
                };
                const mag = Math.sqrt(avgDir.x * avgDir.x + avgDir.y * avgDir.y);
                
                const newNode: Node = {
                    x: node.x + (avgDir.x / mag) * this.stepSize,
                    y: node.y + (avgDir.y / mag) * this.stepSize,
                    parent: node,
                    dir: { x: avgDir.x / mag, y: avgDir.y / mag },
                    count: 0,
                    thickness: 1
                };
                newNodes.push(newNode);
                
                node.dir = { x: 0, y: 0 };
                node.count = 0;
            }
        }
        
        this.nodes.push(...newNodes);
        this.calculateThickness();
    }

    calculateThickness() {
        // Base thickness on number of descendants (simplified)
        for (const node of this.nodes) {
            node.thickness = 1;
        }
        // Actually, let's just make it taper from root
        // (Better logic would be recursive but PBD style is fine here)
    }
}
