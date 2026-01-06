import { motion } from "framer-motion";
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

export default function MessageForVisitors() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  // Calm mouse tracker (premium + non-distracting)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.65) return;

      setSparks((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 6 + 4,
          color: ["#a855f7", "#6366f1", "#38bdf8"][
            Math.floor(Math.random() * 3)
          ],
          dx: (Math.random() - 0.5) * 8,
          dy: (Math.random() - 0.5) * 8,
        },
      ]);

      setTimeout(() => {
        setSparks((prev) => prev.slice(1));
      }, 800);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="
        relative min-h-screen overflow-hidden px-6 py-28
        bg-gradient-to-br from-indigo-800 via-purple-800 to-slate-800
        text-white
      "
    >
      {/* Background aurora glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-30%] left-[-15%] w-[700px] h-[700px]
          bg-purple-500/30 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[700px] h-[700px]
          bg-indigo-500/30 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
      </div>

      {/* Mouse sparks */}
      <div className="pointer-events-none fixed inset-0 z-40">
        {sparks.map((spark) => (
          <span
            key={spark.id}
            className="absolute rounded-full"
            style={{
              left: spark.x,
              top: spark.y,
              width: spark.size,
              height: spark.size,
              background: spark.color,
              boxShadow: `0 0 18px ${spark.color}`,
              transform: `translate(${spark.dx}px, ${spark.dy}px)`,
              opacity: 0.75,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-24 relative z-10">

        {/* Header */}
        <div className="text-center space-y-6">
          <h1
            className="
              text-5xl md:text-6xl font-bold tracking-tight
              bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300
              bg-clip-text text-transparent
            "
          >
            A Message For Our Visitors
          </h1>

          <p className="italic text-indigo-200 text-lg">
            🌿 Opening Manifesto
          </p>
        </div>

        {/* Manifesto – Glass Card */}
        <div
          className="
            rounded-3xl p-8 md:p-12 space-y-5
            bg-white/10 backdrop-blur-2xl
            border border-white/15
            shadow-[0_30px_80px_rgba(0,0,0,0.45)]
            text-lg leading-relaxed
          "
        >
          <p>The walls around us are not mere boundaries.</p>
          <p>They are invitations.</p>

          <p className="font-medium text-indigo-100">
            To beauty. To wonder. To self-expression. To feeling alive.
          </p>

          <p>
            At Deckoviz, we believe that space is sacred.
            That what surrounds you shapes you — your moods, your dreams,
            your creativity, your peace.
          </p>

          <p className="text-indigo-200">
            And yet for too long, our environments have been static,
            lifeless, disconnected.
          </p>

          <p>Flat pictures on walls.</p>
          <p>Screens locked in repetition.</p>
          <p>Spaces that forget who we are.</p>

          <p className="font-medium text-indigo-100">
            Deckoviz was born from this dream.
          </p>

          <p className="text-indigo-200">
            A dynamic companion for your walls.
            A silent poet for your spaces.
            A living mirror for your moods, your passions, your becoming.
          </p>

          <p className="font-semibold text-purple-200">
            This is not just technology.  
            This is not just art.
          </p>

          <p className="font-bold text-purple-300">
            This is the future of space.  
            This is Deckoviz.
          </p>
        </div>

        {/* Mission – Glass Card */}
        <div
          className="
            rounded-3xl p-8 md:p-12 space-y-4
            bg-white/10 backdrop-blur-2xl
            border border-white/15
            shadow-[0_30px_80px_rgba(0,0,0,0.45)]
          "
        >
          <h2 className="text-2xl font-bold text-purple-200">
            🎯 Mission
          </h2>

          <p className="text-indigo-100 leading-relaxed">
            To revolutionize how people experience their spaces —
            infusing homes, workplaces, and public environments with
            living, breathing art that reflects, inspires, and evolves
            with the human spirit.
          </p>

          <p className="text-indigo-300">
            One wall. One moment. One soul-stirring visual experience at a time.
          </p>
        </div>

        {/* Vision – Glass Card */}
        <div
          className="
            rounded-3xl p-8 md:p-12 space-y-4
            bg-white/10 backdrop-blur-2xl
            border border-white/15
            shadow-[0_30px_80px_rgba(0,0,0,0.45)]
          "
        >
          <h2 className="text-2xl font-bold text-purple-200">
            🌌 Vision
          </h2>

          <p className="text-indigo-100 leading-relaxed">
            To create a world where every space is a sanctuary of beauty,
            wonder, self-expression, and emotional resonance —
            powered by intelligent, evolving, personalized art.
          </p>

          <p className="font-medium text-purple-300">
            Art that isn’t just seen.  
            It’s felt.  
            It’s lived.  
            It’s yours.
          </p>
        </div>

      </div>
    </motion.section>
  );
}
