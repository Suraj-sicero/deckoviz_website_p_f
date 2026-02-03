import { useEffect, useState } from "react";

type Spark = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dx: number;
  dy: number;
};

export default function MouseSparkles() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.5) return;

      setSparks((prev) => [
        ...prev,
        ...Array.from({ length: 6 }).map(() => ({
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 6,
          color: ["#ffffff", "#facc15", "#a855f7", "#ec4899", "#38bdf8"][
            Math.floor(Math.random() * 5)
          ],
          dx: (Math.random() - 0.5) * 10,
          dy: (Math.random() - 0.5) * 10,
        })),
      ]);

      setTimeout(() => {
        setSparks((prev) => prev.slice(6));
      }, 600);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="absolute rounded-full animate-spark"
          style={{
            left: spark.x,
            top: spark.y,
            width: spark.size,
            height: spark.size,
            background: spark.color,
            boxShadow: `0 0 20px ${spark.color}`,
            transform: `translate(${spark.dx}px, ${spark.dy}px)`,
          }}
        />
      ))}
    </div>
  );
}
