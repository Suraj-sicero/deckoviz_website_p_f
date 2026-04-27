import { useEffect, useRef } from 'react';
import { FluidSimulation } from './FluidSimulation';

export const useFluidSimulation = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    const simulationRef = useRef<FluidSimulation | null>(null);
    const animationFrameRef = useRef<number>();
    const lastUpdateTimeRef = useRef<number>(performance.now());

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const sim = new FluidSimulation(canvas);
        simulationRef.current = sim;

        const update = () => {
            const now = performance.now();
            let dt = (now - lastUpdateTimeRef.current) / 1000;
            dt = Math.min(dt, 0.033); // Cap dt
            lastUpdateTimeRef.current = now;

            if (!sim.params.PAUSED) {
                sim.step(dt);
            }
            sim.render();

            animationFrameRef.current = requestAnimationFrame(update);
        };

        const handleResize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // Initial splat to avoid black screen
        setTimeout(() => {
            if (simulationRef.current) {
                const sim = simulationRef.current;
                for (let i = 0; i < 10; i++) {
                    sim.splat(
                        Math.random(), 
                        Math.random(), 
                        (Math.random() - 0.5) * 500, 
                        (Math.random() - 0.5) * 500, 
                        [Math.random(), Math.random(), Math.random()]
                    );
                }
            }
        }, 100);

        animationFrameRef.current = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [canvasRef]);

    return simulationRef;
};
