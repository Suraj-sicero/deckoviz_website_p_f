import { motion, useMotionValue, useSpring } from "framer-motion";
import { benefitsData } from "./Benefits";

const AllBenefits = () => {
  /* ================= GLOBAL CURSOR GLITTER ================= */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  return (
    <section
      className="py-24 bg-white relative overflow-hidden"
      onMouseMove={(e) => {
        mouseX.set(e.clientX - 12);
        mouseY.set(e.clientY - 12);
      }}
    >
      {/* 🌟 Cursor Glitter */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="
          pointer-events-none fixed top-0 left-0
          w-6 h-6 rounded-full
          bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400
          opacity-40 blur-md z-50
        "
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ================= HEADING ================= */}
        <h1 className="text-4xl md:text-5xl font-semibold text-center mb-6">
          Why People Love Living With Deckoviz
        </h1>

        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-20">
          These aren’t just features. They’re experiences that grow with you,
          inspire you, and make your space feel alive.
        </p>

        {/* ================= BENEFIT CARDS (ALL) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-28">
          {benefitsData.map((benefit, index) => {
            /* Per-card mouse trail */
            const x = useMotionValue(0);
            const y = useMotionValue(0);

            const trailX = useSpring(x, { stiffness: 120, damping: 20 });
            const trailY = useSpring(y, { stiffness: 120, damping: 20 });

            return (
              <motion.div
                key={index}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  x.set(e.clientX - rect.left - 60);
                  y.set(e.clientY - rect.top - 60);
                }}
                whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="
                  relative overflow-hidden
                  p-8 rounded-2xl
                  bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50
                  hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700
                  text-gray-800 hover:text-white
                  shadow-sm hover:shadow-xl
                  transform-gpu transition-colors
                "
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* 🌈 Jelly / Ribbon Trail */}
                <motion.div
                  style={{ x: trailX, y: trailY }}
                  className="
                    pointer-events-none absolute
                    w-32 h-32 rounded-full
                    bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-400
                    opacity-40 blur-2xl
                  "
                />

                {/* ✨ Soft sparkles */}
                <motion.div
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-5 right-6 w-2 h-2 rounded-full bg-pink-400"
                />
                <motion.div
                  animate={{ opacity: [0.1, 0.5, 0.1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-purple-400"
                />

                {/* Emoji */}
                <motion.div
                  whileHover={{ scale: 1.4, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 12 }}
                  className="text-4xl mb-4 relative z-10"
                >
                  {benefit.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 relative z-10">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="opacity-90 relative z-10">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AllBenefits;
