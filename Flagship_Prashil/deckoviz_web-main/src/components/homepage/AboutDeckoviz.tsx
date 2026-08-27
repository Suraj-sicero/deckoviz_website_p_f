export default function AboutDeckoviz() {
  return (
    <section
      className="relative min-h-screen overflow-hidden px-4 py-20"
      style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}
    >
      {/* Enterprise Indigo Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(99, 102, 241, 0.22)" }} />
        <div className="absolute -top-20 right-[-80px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(37, 99, 235, 0.20)" }} />
        <div className="absolute top-[40%] -left-20 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(79, 70, 229, 0.16)" }} />
        <div className="absolute top-[40%] right-0 w-[450px] h-[450px] rounded-full blur-[90px]" style={{ background: "rgba(59, 130, 246, 0.18)" }} />
        <div className="absolute bottom-[-80px] left-[25%] w-[700px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(99, 102, 241, 0.14)" }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            🌌 About Deckoviz DASP
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Your universe, alive on your walls.
          </p>
        </div>

        {/* 🧊 Glass Card */}
        <div
          className="relative rounded-[32px] p-6 md:p-10 space-y-6 text-gray-800 leading-relaxed"
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.45)",
            borderTop: "1px solid rgba(255, 255, 255, 0.75)",
            boxShadow: "0 12px 40px rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.65)",
          }}
        >

          <p className="text-lg">
            If we were to answer in a nutshell - we wouldn’t.  
            Because Deckoviz isn’t a nutshell, it’s a universe.
          </p>

          <p>
            Deckoviz is the world’s first{" "}
            <span className="font-semibold text-blue-700">
              AI-powered Dynamic Art Frame
            </span>, built on Google TV - designed to bring your moods,
            memories, and stories into living, glowing form.
          </p>

          <p>
            With custom-crafted frames and synced backlights, Deckoviz can hang
            like an elegant art frame or smart TV, or rest beautifully on a stand
            or table. Available in{" "}
            <span className="font-semibold">43", 55", 65"</span> and more.
          </p>

          {/* ✨ Feature Pills */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            {[
              "60+ evolving features",
              "Photos → living generative art",
              "Personal storytelling loops",
              "Daily rituals & ambience modes",
              "Mood & occasion switching",
              "And so much more…",
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border px-4 py-3 shadow-sm hover:shadow-md transition text-gray-800 font-medium"
                style={{
                  background: "rgba(255,255,255,0.30)",
                  backdropFilter: "blur(12px) saturate(180%)",
                  borderColor: "rgba(255,255,255,0.6)"
                }}
              >
                ✨ {item}
              </div>
            ))}
          </div>

          <p>
            More than just a frame, Deckoviz is your{" "}
            <span className="font-semibold text-indigo-700">
              emotionally intelligent home companion
            </span>{" "}
            - powered by VizzyAI.
          </p>

          <p>
            VizzyAI learns from you, grows with you, and curates art, ambience,
            and storytelling uniquely for you.
          </p>

          <p className="font-semibold text-gray-900">
            Deckoviz turns static into something alive - deeply personal,
            meaningful, and beautiful.
          </p>

          {/* CTA */}
          <div className="pt-8 flex justify-center">
            <button
              onClick={() => window.location.href = "/place-order"}
              className="group relative bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 
                         hover:from-indigo-700 hover:via-blue-700 hover:to-cyan-600
                         text-white px-10 py-3.5 rounded-full font-bold transition-all 
                         duration-300 hover:scale-105 shadow-2xl"
            >
              <span className="relative z-10">Pre Order Deckoviz</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                              -skew-x-12 -translate-x-full group-hover:translate-x-full 
                              transition-transform duration-1000 rounded-full"></div>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}