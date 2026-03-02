export default function AboutDeckoviz() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 px-4 py-20">

      {/* 🌈 Floating Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 rounded-full blur-3xl opacity-40" />
      <div className="absolute top-1/4 -right-40 w-[450px] h-[450px] bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-500 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-[-200px] left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-indigo-400 via-blue-400 to-pink-400 rounded-full blur-3xl opacity-30" />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            🌌 About Deckoviz DASP
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Your universe, alive on your walls.
          </p>
        </div>

        {/* 🧊 Glass Card */}
        <div className="relative rounded-[32px] bg-white/50 backdrop-blur-xl border border-white/40 shadow-[0_20px_80px_rgba(0,0,0,0.12)] p-6 md:p-10 space-y-6 text-gray-700 leading-relaxed">

          <p className="text-lg">
            If we were to answer in a nutshell   we wouldn’t.  
            Because Deckoviz isn’t a nutshell, it’s a universe.
          </p>

          <p>
            Deckoviz is the world’s first{" "}
            <span className="font-semibold text-blue-700">
              AI-powered Dynamic Art Frame
            </span>, built on Google TV   designed to bring your moods,
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
                className="rounded-2xl bg-white/60 backdrop-blur border border-white/50 px-4 py-3 shadow-sm hover:shadow-md transition"
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
              powered by VizzyAI.
          </p>

          <p>
            VizzyAI learns from you, grows with you, and curates art, ambience,
            and storytelling uniquely for you.
          </p>

          <p className="font-semibold text-gray-900">
            Deckoviz turns static into something alive   deeply personal,
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
