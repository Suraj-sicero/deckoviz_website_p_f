import { useEffect, useRef, useState } from "react";

const ProgressBar = ({ value = 95, delay = 600 }) => {
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
  // 0 -> Blue/Cyan, 0.5 -> Purple/Indigo, 1.0 -> Pink/Orange
  const hue1 = 200 + (mouseRatio * 140);
  const hue2 = hue1 + 40;

  return (
    <div ref={ref} className="w-full h-2 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ 
          width: start ? `${value}%` : "0%",
          background: `linear-gradient(90deg, hsl(${hue1}, 90%, 60%), hsl(${hue2}, 90%, 55%))`,
          transition: "width 1s ease-out, background 0.3s ease"
        }}
      />
    </div>
  );
};

export default ProgressBar;