import { useEffect, useRef } from 'react';
import { ParticleSystem } from './ParticleSystem';

export const useParticleSimulation = (canvasRef: React.RefObject<HTMLCanvasElement>, count: number) => {
    const systemRef = useRef<ParticleSystem | null>(null);
    const animationFrameRef = useRef<number>();
    const lastUpdateTimeRef = useRef<number>(performance.now());

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl2', {
            alpha: false,
            depth: false,
            preserveDrawingBuffer: true,
        });

        if (!gl) {
            console.error('WebGL2 not supported');
            return;
        }

        const system = new ParticleSystem(gl, count);
        systemRef.current = system;

        const update = () => {
            const now = performance.now();
            let dt = (now - lastUpdateTimeRef.current) / 1000;
            dt = Math.min(dt, 0.033);
            lastUpdateTimeRef.current = now;

            gl.viewport(0, 0, canvas.width, canvas.height);
            
            // Clear or Trails
            if (system.params.trails) {
                // For trails, we don't fully clear. 
                // We'll implement trail fade in index.tsx using a quad
            } else {
                gl.clearColor(0, 0, 0, 1);
                gl.clear(gl.COLOR_BUFFER_BIT);
            }

            system.update(now * 0.001, dt);
            system.render(canvas.width, canvas.height);

            animationFrameRef.current = requestAnimationFrame(update);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        animationFrameRef.current = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [canvasRef, count]);

    return systemRef;
};
