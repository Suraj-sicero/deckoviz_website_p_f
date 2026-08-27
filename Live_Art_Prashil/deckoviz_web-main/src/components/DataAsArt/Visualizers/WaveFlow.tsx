import React, { useEffect, useRef } from 'react';
import { NormalizedPoint, ColorPalette } from '../types';

interface Props {
    points: NormalizedPoint[];
    palette: ColorPalette;
    speed: number;
}

const WaveFlow: React.FC<Props> = ({ points, palette, speed }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d')!;
        let frameId: number;
        let time = 0;

        const animate = () => {
            const width = canvasRef.current!.width;
            const height = canvasRef.current!.height;
            
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);

            time += 0.01 * speed;

            // Draw layers of waves based on data segments
            const segmentSize = Math.max(1, Math.floor(points.length / 5));
            for (let s = 0; s < points.length; s += segmentSize) {
                const subPoints = points.slice(s, s + segmentSize);
                if (subPoints.length < 2) continue;

                const color = palette.colors[s % palette.colors.length];
                const baseHeight = height * (0.2 + (s / points.length) * 0.6);

                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = 3;
                ctx.setLineDash([5, 15]); // Artistic dashed lines
                
                ctx.moveTo(0, baseHeight);

                for (let i = 0; i < subPoints.length; i++) {
                    const p = subPoints[i];
                    const x = (i / (subPoints.length - 1)) * width;
                    const noise = Math.sin(time + i * 0.5) * p.mapped.motion * 50;
                    const y = baseHeight + (p.mapped.y - 0.5) * 200 + noise;
                    
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        // Bezier for smoothness
                        const prevX = ((i - 1) / (subPoints.length - 1)) * width;
                        const cpX = (prevX + x) / 2;
                        ctx.quadraticCurveTo(cpX, y, x, y);
                    }

                    // Draw data nodes
                    ctx.save();
                    ctx.fillStyle = '#fff';
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = color;
                    ctx.beginPath();
                    ctx.arc(x, y, p.mapped.size * 5 + 1, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
                ctx.stroke();
            }

            frameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        animate();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [points, palette, speed]);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default WaveFlow;
