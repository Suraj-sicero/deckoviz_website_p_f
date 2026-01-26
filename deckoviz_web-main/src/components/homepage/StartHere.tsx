import React from "react";
import { useNavigate } from "react-router-dom";

export default function StartHere() {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 overflow-hidden">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-fuchsia-200" />

      {/* Floating blobs */}
      <div className="absolute w-[420px] h-[420px] bg-pink-300/50 rounded-full blur-3xl top-10 left-10" />
      <div className="absolute w-[320px] h-[320px] bg-purple-300/50 rounded-full blur-3xl bottom-10 right-10" />
      <div className="absolute w-[220px] h-[220px] bg-fuchsia-300/40 rounded-full blur-2xl top-1/2 left-1/3" />

      {/* Glass Card */}
      <div className="relative max-w-5xl mx-auto px-6">

        <div className="relative rounded-[36px] bg-white/50 backdrop-blur-xl shadow-[0_40px_100px_rgba(168,85,247,0.25)] overflow-hidden">

          {/* Content */}
          <div className="p-12 md:p-16 text-center">

            {/* CENTERED HEADING */}
            <h2 className="text-4xl font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent mb-8">
              Start Here
            </h2>

            <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
              If you’re curious about Deckoviz, but want to understand it properly before bringing it into your home,
              this is the best place to begin.
            </p>

            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              These pieces are designed to answer the real questions people have.
            </p>

            <div className="space-y-1 text-gray-700 mb-10">
              <p>What is this actually for?</p>
              <p>How does it fit into daily life?</p>
              <p>Is this just another screen, or something meaningfully different?</p>
            </div>

            <button
              onClick={() => navigate("/core-reading")}
              className="px-12 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-fuchsia-500 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Core Reading
            </button>

          </div>

          {/* Bottom gradient bar ONLY (no text) */}
          <div className="h-16 bg-gradient-to-r from-purple-500 via-pink-400 to-fuchsia-500" />

        </div>

      </div>
    </section>
  );
}
