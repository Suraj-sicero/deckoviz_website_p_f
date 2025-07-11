import React, { useEffect, useRef } from 'react';

const InteractiveParticleGraphic = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  class Particle {
    originalX: number;
    originalY: number;
    x: number;
    y: number;
    size: number;
    baseSize: number;
    hue: number;
    opacity: number;
    baseOpacity: number;

    constructor(x: number, y: number) {
      this.originalX = x;
      this.originalY = y;
      this.x = x;
      this.y = y;
      this.baseSize = Math.random() * 4 + 4; // Bigger particles like in the image
      this.size = this.baseSize;
      // Orange, pink, purple color range (15-60 for orange, 280-340 for purple/pink)
      this.hue = Math.random() < 0.33 
        ? Math.random() * 30 + 15   // Orange range (15-45)
        : Math.random() * 60 + 280; // Purple to pink range (280-340)
      this.baseOpacity = Math.random() * 0.3 + 0.7; // Higher opacity for visibility
      this.opacity = this.baseOpacity;
    }

    update(mouseX: number, mouseY: number) {
      // Calculate distance from mouse
      const dx = mouseX - this.originalX;
      const dy = mouseY - this.originalY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 180; // Bigger radius

      if (distance < maxDistance) {
        // Calculate repulsion force with more gooey effect
        const force = (maxDistance - distance) / maxDistance;
        const angle = Math.atan2(dy, dx);
        
        // GLOOPY effect - stronger, more elastic movement
        const pushDistance = force * force * 80; // Quadratic for more dramatic effect
        this.x = this.originalX - Math.cos(angle) * pushDistance;
        this.y = this.originalY - Math.sin(angle) * pushDistance;
        
        // More dramatic size changes for bigger particles
        this.size = this.baseSize + force * 6;
        this.opacity = Math.min(1, this.baseOpacity + force * 0.6);
      } else {
        // Slower, more gooey return - like thick liquid
        this.x += (this.originalX - this.x) * 0.06; // Much slower return
        this.y += (this.originalY - this.y) * 0.06;
        this.size += (this.baseSize - this.size) * 0.08;
        this.opacity += (this.baseOpacity - this.opacity) * 0.08;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      // Brighter gradient for more vibrant colors
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size * 2
      );
      
      // More saturated colors for orange, pink, purple
      gradient.addColorStop(0, `hsla(${this.hue}, 85%, 60%, ${this.opacity})`);
      gradient.addColorStop(0.5, `hsla(${this.hue}, 80%, 65%, ${this.opacity * 0.7})`);
      gradient.addColorStop(1, `hsla(${this.hue}, 70%, 70%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas
    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      createParticles();
    };

    // Create particle grid with more spacing
    const createParticles = () => {
      particlesRef.current = [];
      const spacing = 35; // Increased spacing for cleaner look
      const cols = Math.floor(canvas.width / spacing);
      const rows = Math.floor(canvas.height / spacing);
      
      // Center the grid
      const offsetX = (canvas.width - (cols - 1) * spacing) / 2;
      const offsetY = (canvas.height - (rows - 1) * spacing) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * spacing;
          const y = offsetY + j * spacing;
          particlesRef.current.push(new Particle(x, y));
        }
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with WHITE background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update(mouseRef.current.x, mouseRef.current.y);
        particle.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      // Move mouse far away to reset particles
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', setupCanvas);

    // Initialize
    setupCanvas();
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', setupCanvas);
    };
  }, []);

  return (
    <div className="w-full h-96 my-4 relative overflow-hidden rounded-2xl">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-default"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default InteractiveParticleGraphic;