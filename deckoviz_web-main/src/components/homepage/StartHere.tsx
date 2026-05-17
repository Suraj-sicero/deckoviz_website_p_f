import React from "react";
import { useNavigate } from "react-router-dom";

export default function StartHere() {
  const navigate = useNavigate();

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}
    >
      {/* Soft blue blobs so glass card is clearly visible */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(99, 102, 241, 0.22)" }} />
        <div className="absolute -top-10 right-[-60px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(37, 99, 235, 0.20)" }} />
        <div className="absolute bottom-[-60px] left-[20%] w-[700px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(79, 70, 229, 0.18)" }} />
      </div>

      {/* Glass Card */}
      <div className="relative max-w-5xl mx-auto px-6">

        <div className="relative rounded-[36px]
          bg-white/10 backdrop-blur-3xl
          shadow-[0_24px_60px_rgba(37,99,235,0.25),0_8px_20px_rgba(24,42,74,0.15),inset_0_1px_1px_rgba(255,255,255,0.7)]
          border border-white/40 overflow-hidden
          hover:shadow-[0_32px_80px_rgba(37,99,235,0.35),0_12px_30px_rgba(24,42,74,0.2),inset_0_1px_1px_rgba(255,255,255,0.7)]
          transition-shadow duration-700">

          {/* Multiple shine layers for glass effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-transparent pointer-events-none" />
          
          {/* Top edge shine */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/90 to-transparent" />
          
          {/* Left edge shine */}
          <div className="absolute top-0 left-0 bottom-0 w-[1.5px] bg-gradient-to-b from-white/70 via-white/20 to-transparent" />

          {/* Blue bottom glow */}
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />
          
          {/* Subtle inner glow */}
          <div className="absolute inset-[1px] rounded-[35px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-1px_4px_rgba(37,99,235,0.05)]" />

          {/* Content */}
          <div className="relative p-12 md:p-16 text-center">

            {/* CENTERED HEADING */}
            <h2 className="text-4xl font-semibold bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent mb-8 drop-shadow-sm">
              Start Here
            </h2>

            <p className="text-gray-800/90 mb-4 max-w-2xl mx-auto drop-shadow-sm">
              If you're curious about Deckoviz, but want to understand it properly before bringing it into your home,
              this is the best place to begin.
            </p>

            <p className="text-gray-800/90 mb-6 max-w-2xl mx-auto drop-shadow-sm">
              These pieces are designed to answer the real questions people have.
            </p>

            <div className="space-y-1 text-gray-800/90 mb-10 drop-shadow-sm">
              <p>What is this actually for?</p>
              <p>How does it fit into daily life?</p>
              <p>Is this just another screen, or something meaningfully different?</p>
            </div>

            <button
              onClick={() => navigate("/core-reading")}
              className="px-12 py-3 rounded-xl bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white font-medium shadow-lg hover:shadow-[#2563EB]/50 transition-all hover:-translate-y-0.5"
            >
              Core Reading
            </button>

          </div>

          {/* Bottom gradient bar ONLY (no text) */}
          <div className="relative h-16 bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
          </div>

        </div>

      </div>
    </section>
  );
}
