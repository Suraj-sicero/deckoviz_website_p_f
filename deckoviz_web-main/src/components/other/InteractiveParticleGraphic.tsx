import { useEffect, useRef } from 'react';

const InteractiveParticleGraphic = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pause when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    interface ParticleData {
      ox: number; oy: number; x: number; y: number;
      size: number; baseSize: number;
      hue: number; opacity: number; baseOpacity: number;
    }

    let particles: ParticleData[] = [];
    const mouse = { x: -1000, y: -1000 };

    const setupCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const spacing = 55; // wider spacing = fewer particles = faster
      const cols = Math.floor(canvas.width / spacing);
      const rows = Math.floor(canvas.height / spacing);
      const offsetX = (canvas.width - (cols - 1) * spacing) / 2;
      const offsetY = (canvas.height - (rows - 1) * spacing) / 2;

      const excludeW = canvas.width * 0.55;
      const excludeStartX = (canvas.width - excludeW) / 2;
      const excludeEndX = excludeStartX + excludeW;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * spacing;
          const y = offsetY + j * spacing;
          if (x > excludeStartX && x < excludeEndX) continue;
          const hue = Math.random() < 0.5
            ? Math.random() * 40 + 180  // cyan/teal
            : Math.random() * 40 + 220; // blue
          const baseSize = Math.random() * 3 + 3;
          const baseOpacity = Math.random() * 0.3 + 0.55;
          particles.push({ ox: x, oy: y, x, y, size: baseSize, baseSize, hue, opacity: baseOpacity, baseOpacity });
        }
      }
    };

    // Frame throttling: only re-render every other frame
    let frameCount = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;
      frameCount++;
      if (frameCount % 2 !== 0) return; // skip every other frame

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        const dx = mouse.x - p.ox;
        const dy = mouse.y - p.oy;
        const distSq = dx * dx + dy * dy;
        const maxDist = 160;

        if (distSq < maxDist * maxDist) {
          const dist = Math.sqrt(distSq);
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          const push = force * force * 60;
          p.x = p.ox - Math.cos(angle) * push;
          p.y = p.oy - Math.sin(angle) * push;
          p.size = p.baseSize + force * 4;
          p.opacity = Math.min(1, p.baseOpacity + force * 0.5);
        } else {
          p.x += (p.ox - p.x) * 0.08;
          p.y += (p.oy - p.y) * 0.08;
          p.size += (p.baseSize - p.size) * 0.1;
          p.opacity += (p.baseOpacity - p.opacity) * 0.1;
        }

        // Flat circle — no per-frame gradient creation
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 62%, ${p.opacity})`;
        ctx.fill();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', setupCanvas);

    const timeoutId = setTimeout(setupCanvas, 100);
    animate();

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', setupCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default InteractiveParticleGraphic;