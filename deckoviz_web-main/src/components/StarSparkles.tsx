import { useEffect, useState } from "react";

type Spark = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
};

const StarSparkles = () => {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparks((prev) => [
        ...prev.slice(-20),
        {
          id: Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 4,
          color: ["#a855f7", "#ec4899", "#38bdf8", "#ffffff"][
            Math.floor(Math.random() * 4)
          ],
        },
      ]);
    }, 400); // slightly calmer than 300

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="absolute animate-star"
          style={{
            left: `${spark.x}%`,
            top: `${spark.y}%`,
            width: spark.size * 3,
            height: spark.size * 3,
            background: spark.color,
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            boxShadow: `0 0 30px ${spark.color}, 0 0 60px ${spark.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default StarSparkles;
