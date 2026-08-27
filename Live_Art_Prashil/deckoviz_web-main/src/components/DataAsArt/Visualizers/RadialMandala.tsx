import React, { useEffect, useRef } from 'react';
import { NormalizedPoint, ColorPalette } from '../types';

interface Props {
    points: NormalizedPoint[];
    palette: ColorPalette;
    speed: number;
}

const RadialMandala: React.FC<Props> = ({ points, palette, speed }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d')!;
        let frameId: number;
        let rotation = 0;

        const animate = () => {
            const width = canvasRef.current!.width;
            const height = canvasRef.current!.height;
            const centerX = width / 2;
            const centerY = height / 2;
            const baseRadius = Math.min(width, height) * 0.35;

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, width, height);

            rotation += 0.002 * speed;

            points.forEach((p, i) => {
                const angle = (i / points.length) * Math.PI * 2 + rotation;
                const radius = baseRadius + (p.mapped.y - 0.5) * baseRadius * 0.5;
                const size = p.mapped.size * 30 + 5;
                const color = palette.colors[Math.floor(p.mapped.color * palette.colors.length)];

                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                // Draw connecting lines to center
                ctx.beginPath();
                ctx.strokeStyle = `${color}33`; // Add transparency
                ctx.lineWidth = 1;
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.stroke();

                // Draw geometric shape
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle + rotation * p.mapped.motion * 5);
                ctx.fillStyle = color;
                
                // Draw a petal or segment
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.quadraticCurveTo(size, -size, size * 2, 0);
                ctx.quadraticCurveTo(size, size, 0, 0);
                ctx.fill();
                
                // Bloom effect
                ctx.shadowBlur = 15;
                ctx.shadowColor = color;
                
                ctx.restore();
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

export default RadialMandala;
