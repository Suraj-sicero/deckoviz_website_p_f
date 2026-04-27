import React, { useEffect, useRef } from 'react';
import { NormalizedPoint, ColorPalette } from '../types';

interface Props {
    points: NormalizedPoint[];
    palette: ColorPalette;
    speed: number;
}

const NetworkGraph: React.FC<Props> = ({ points, palette, speed }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<any[]>([]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d')!;
        let frameId: number;

        // Initialize nodes with data
        nodesRef.current = points.map(p => ({
            x: Math.random() * canvasRef.current!.width,
            y: Math.random() * canvasRef.current!.height,
            vx: 0,
            vy: 0,
            size: p.mapped.size * 8 + 3,
            color: palette.colors[Math.floor(p.mapped.color * palette.colors.length)],
            motion: p.mapped.motion,
            original: p
        }));

        const animate = () => {
            const width = canvasRef.current!.width;
            const height = canvasRef.current!.height;
            
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);

            const nodes = nodesRef.current;
            const repulsion = 50 * speed;
            const attraction = 0.01 * speed;

            // Physics loop
            for (let i = 0; i < nodes.length; i++) {
                const n1 = nodes[i];

                // Pull to data center
                const targetX = n1.original.mapped.x * width;
                const targetY = n1.original.mapped.y * height;
                n1.vx += (targetX - n1.x) * attraction;
                n1.vy += (targetY - n1.y) * attraction;

                for (let j = i + 1; j < nodes.length; j++) {
                    const n2 = nodes[j];
                    const dx = n2.x - n1.x;
                    const dy = n2.y - n1.y;
                    const distSq = dx * dx + dy * dy;
                    const dist = Math.sqrt(distSq);

                    if (dist < 150) {
                        // Repulsion
                        const force = repulsion / (distSq + 1);
                        n1.vx -= dx * force;
                        n1.vy -= dy * force;
                        n2.vx += dx * force;
                        n2.vy += dy * force;

                        // Draw edge
                        ctx.beginPath();
                        ctx.strokeStyle = `${n1.color}${Math.floor((1 - dist / 150) * 255).toString(16).padStart(2, '0')}`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(n1.x, n1.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.stroke();
                    }
                }

                // Update position
                n1.x += n1.vx;
                n1.y += n1.vy;
                n1.vx *= 0.9; // Friction
                n1.vy *= 0.9;
            }

            // Draw nodes
            nodes.forEach(n => {
                ctx.beginPath();
                ctx.fillStyle = n.color;
                ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.shadowBlur = 10;
                ctx.shadowColor = n.color;
            });

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

export default NetworkGraph;
