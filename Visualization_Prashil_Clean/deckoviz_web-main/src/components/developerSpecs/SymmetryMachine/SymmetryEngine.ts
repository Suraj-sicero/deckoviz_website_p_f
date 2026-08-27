export type SymmetryMode = 'radial' | 'mirror' | 'kaleidoscope' | 'rotational';

export interface DrawParams {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    points: {x: number, y: number}[];
    mode: SymmetryMode;
    segments: number;
    color: string;
    brushSize: number;
    rainbow: boolean;
}

export class SymmetryEngine {
    static draw(params: DrawParams) {
        const { ctx, width, height, points, mode, segments, color, brushSize, rainbow } = params;
        if (points.length < 2) return;

        const centerX = width / 2;
        const centerY = height / 2;
        const p1 = points[points.length - 2];
        const p2 = points[points.length - 1];

        // Convert to centered coordinates
        const x1 = p1.x - centerX;
        const y1 = p1.y - centerY;
        const x2 = p2.x - centerX;
        const y2 = p2.y - centerY;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = brushSize;
        
        if (rainbow) {
            const hue = (Date.now() / 10) % 360;
            ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.8)`;
            ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.5)`;
        } else {
            ctx.strokeStyle = color;
            ctx.shadowColor = color;
        }
        ctx.shadowBlur = brushSize * 1.5;

        for (let i = 0; i < segments; i++) {
            const angle = (Math.PI * 2 / segments) * i;
            
            ctx.save();
            ctx.rotate(angle);
            
            this.drawSegment(ctx, x1, y1, x2, y2);
            
            if (mode === 'mirror' || mode === 'kaleidoscope') {
                ctx.scale(1, -1);
                this.drawSegment(ctx, x1, y1, x2, y2);
            }
            
            ctx.restore();
            
            if (mode === 'rotational' && segments === 2) {
                // Special case for simple mirror
                ctx.save();
                ctx.scale(-1, 1);
                this.drawSegment(ctx, x1, y1, x2, y2);
                ctx.restore();
            }
        }

        ctx.restore();
    }

    private static drawSegment(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}
