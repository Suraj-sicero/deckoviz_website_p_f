import { useEffect, useRef, useState } from "react";

const ProgressBar = ({ value = 95, delay = 600, hueOverride = null }: { value?: number, delay?: number, hueOverride?: { start: number, end: number } | null }) => {
  const ref = useRef(null);
  const [start, setStart] = useState(false);
  const [mouseRatio, setMouseRatio] = useState(0.5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseRatio(e.clientX / window.innerWidth);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStart(true);
          }, delay);

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  // Calculate dynamic hues based on mouse horizontal position
  const hue1 = hueOverride ? hueOverride.start : 200 + (mouseRatio * 140);
  const hue2 = hueOverride ? hueOverride.end : hue1 + 40;

  return (
    <div ref={ref} className="w-full h-3 rounded-full overflow-hidden bg-gray-200/20">
      <div
        className="h-full rounded-full"
        style={{
          width: start ? `${value}%` : "0%",
          background: `linear-gradient(90deg, hsl(${hue1}, 80%, 60%), hsl(${hue2}, 80%, 55%))`,
          transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease"
        }}
      />
    </div>
  );
};


export default ProgressBar;