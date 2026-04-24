import React, { useEffect, useRef } from 'react';
import { NormalizedPoint, ColorPalette } from '../types';

interface Props {
    points: NormalizedPoint[];
    palette: ColorPalette;
    speed: number;
}

const ParticleFlow: React.FC<Props> = ({ points, palette, speed }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<any[]>([]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d')!;
        let frameId: number;

        // Initialize particles with random offsets based on data
        particlesRef.current = points.map(p => ({
            x: p.mapped.x * canvasRef.current!.width,
            y: p.mapped.y * canvasRef.current!.height,
            targetX: p.mapped.x * canvasRef.current!.width,
            targetY: p.mapped.y * canvasRef.current!.height,
            size: p.mapped.size * 10 + 2,
            color: palette.colors[Math.floor(p.mapped.color * palette.colors.length)],
            vx: (Math.random() - 0.5) * p.mapped.motion * 5,
            vy: (Math.random() - 0.5) * p.mapped.motion * 5,
            history: [] as {x: number, y: number}[]
        }));

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

            particlesRef.current.forEach(p => {
                // Apply slight flow based on motion
                p.x += p.vx * speed;
                p.y += p.vy * speed;

                // Boundary check
                if (p.x < 0 || p.x > canvasRef.current!.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvasRef.current!.height) p.vy *= -1;

                // Draw trail
                p.history.push({ x: p.x, y: p.y });
                if (p.history.length > 10) p.history.shift();

                ctx.beginPath();
                ctx.strokeStyle = p.color;
                ctx.lineWidth = p.size / 2;
                ctx.lineCap = 'round';
                if (p.history.length > 1) {
                    ctx.moveTo(p.history[0].x, p.history[0].y);
                    for (let i = 1; i < p.history.length; i++) {
                        ctx.lineTo(p.history[i].x, p.history[i].y);
                    }
                    ctx.stroke();
                }

                // Draw particle
                ctx.beginPath();
                ctx.fillStyle = p.color;
                ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
                
                // Bloom effect
                ctx.shadowBlur = p.size;
                ctx.shadowColor = p.color;
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

export default ParticleFlow;
