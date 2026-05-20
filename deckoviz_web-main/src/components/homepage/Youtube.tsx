import React, { useEffect, useState } from "react";

type Spark = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
};

const Youtube: React.FC = () => {
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
          color: ["#182A4A", "#2563EB", "#38bdf8", "#6366f1"][
            Math.floor(Math.random() * 4)
          ],
        },
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 md:py-28 text-center overflow-hidden
      bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50">

      {/* Glow blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/25 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/25 rounded-full blur-[120px]" />
      </div>

      {/* Floating sparks */}
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

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="text-gray-900">See</span>{" "}
          <span className="italic bg-gradient-to-r from-indigo-950 to-blue-600 bg-clip-text text-transparent">
            Deckoviz
          </span>{" "}
          <span className="text-gray-900">in</span>{" "}
          <span className="italic bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Action
          </span>
        </h2>

        <p className="text-lg text-gray-600 mb-12 animate-fadeIn delay-150">
          Discover how our smart frames transform any space into a personal sanctuary.
          Watch the video to experience the magic.
        </p>

        {/* Video container */}
        <div className="relative w-full group">

          {/* Pulse glow ring */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r
            from-indigo-500/40 via-blue-500/40 to-cyan-500/40 blur-xl
            opacity-60 group-hover:opacity-100 transition" />

          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl
            hover:scale-[1.01] transition-all duration-500"
            style={{ paddingBottom: "56.25%" }}
          >
              {/* className="absolute top-0 left-0 w-full h-full" */}
            <iframe className="absolute top-0 left-0 w-full h-full" width="560" height="315" src="https://www.youtube.com/embed/1mPhddoCgwI?si=oXcDQCmFPIvS0_NP" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity:0; transform: translateY(20px); }
          to { opacity:1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }

        .delay-150 {
          animation-delay: .15s;
        }
      `}</style>
    </section>
  );
};

export default Youtube;

