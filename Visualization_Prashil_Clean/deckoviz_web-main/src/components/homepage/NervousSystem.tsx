"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Spark = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dx: number;
  dy: number;
};

const NervousSystem: React.FC = () => {
  const [sparks, setSparks] = useState<Spark[]>([]);

  // ✅ Mouse tracker sparks (theme: cyan + violet + pink)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.68) return;

      setSparks((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 7 + 4,
          color: ["#67e8f9", "#a78bfa", "#fb7185"][Math.floor(Math.random() * 3)],
          dx: (Math.random() - 0.5) * 9,
          dy: (Math.random() - 0.5) * 9,
        },
      ]);

      setTimeout(() => {
        setSparks((prev) => prev.slice(1));
      }, 850);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.15, ease: "easeOut" }}
      className="
        relative min-h-screen w-full overflow-hidden
        flex items-center justify-center
        px-6 py-20 md:py-28
        bg-gradient-to-br from-[#7bffc8] via-[#a8ffde] to-[#b5ffd6]
      "
    >
      {/* Background blur blobs + fog */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10" />

        <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-sky-200/55 blur-[55px]" />
        <div className="absolute -top-16 -left-10 h-[190px] w-[190px] rounded-full bg-violet-200/55 blur-[45px]" />

        <div className="absolute -top-16 right-10 h-[320px] w-[320px] rounded-full bg-blue-100/65 blur-[65px]" />
        <div className="absolute top-28 right-44 h-[170px] w-[170px] rounded-full bg-fuchsia-100/55 blur-[50px]" />

        <div className="absolute -bottom-20 left-10 h-[260px] w-[260px] rounded-full bg-pink-200/55 blur-[65px]" />
        <div className="absolute -bottom-24 right-8 h-[340px] w-[340px] rounded-full bg-indigo-100/55 blur-[70px]" />

        {/* Dots (like premium reference UI) */}
        <div className="absolute left-12 top-16 hidden md:block">
          <div className="grid grid-cols-4 gap-2 opacity-60">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/70" />
            ))}
          </div>
        </div>

        <div className="absolute right-14 bottom-16 hidden md:block">
          <div className="grid grid-cols-4 gap-2 opacity-60">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/70" />
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Mouse sparks layer */}
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
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Glass Panel */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.05, ease: "easeOut" }}
        className="
          relative z-10
          w-full max-w-5xl
          rounded-[34px]
          bg-white/22 backdrop-blur-2xl
          border border-white/40
          shadow-[0_55px_160px_rgba(99,102,241,0.18)]
          px-10 md:px-16 py-14 md:py-16
        "
      >
        <div className="pointer-events-none absolute inset-0 rounded-[34px] border border-white/25" />
        <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-gradient-to-b from-white/30 via-transparent to-white/10" />

        {/* TITLE */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            What If Your Home Had a Nervous System?
          </h1>
        </div>

        {/* CONTENT (UNCHANGED, only styled) */}
        <div className="space-y-6 text-[16px] leading-relaxed text-slate-800">
          <p className="italic text-slate-700">
            And what if it came with a companion, not a device?
          </p>

          <p>What if your home could feel?</p>

          <p>
            Not in the way sensors feel.<br />
            Not in the way dashboards light up.
          </p>

          <p>
            But in the way a good room knows when to be quiet.<br />
            In the way a favorite café knows when to glow warmer in the evening.<br />
            In the way a childhood home somehow always knew when it was time to gather.
          </p>

          <p>What if your home had a nervous system?</p>

          <p>
            A subtle one.<br />
            A gentle one.<br />
            One that notices without staring.<br />
            That responds without demanding.<br />
            That adapts without asking you to configure ten menus first.
          </p>

          <p>
            Not smart in the way gadgets are smart.<br />
            Smart in the way good spaces are.
          </p>

          <hr className="my-10 border-slate-300/60" />

          <h2 className="font-semibold text-slate-900">A living sense of time</h2>

          <p>
            Morning light, soft and hopeful.<br />
            Afternoons, bright and open.
          </p>

          <p>
            Evenings, slower, warmer, deeper.<br />
            Nights, calm and dim, like a held breath.
          </p>

          <p>Deckoviz feels the passing of your day.</p>

          <p>
            It shifts the art.<br />
            The colors.<br />
            The music.<br />
            The glow around the frame.
          </p>

          <p>
            Not because you told it to.<br />
            But because this is what a living space does.
          </p>

          <p>
            It knows that mornings are for beginnings.<br />
            And nights are for remembering.
          </p>

          <hr className="my-10 border-slate-300/60" />

          <h2 className="font-semibold text-slate-900">A sense of mood</h2>

          <p>
            Some days you want stillness.<br />
            Some days you want fire.<br />
            Some days you want beauty without explanation.
          </p>

          <p>
            Deckoviz learns your moods, not as data points, but as patterns.<br />
            The way you pause longer on certain visuals.<br />
            The music you linger with.<br />
            The moments you come closer to the wall and just… stand.
          </p>

          <p>Over time, it starts to feel it.</p>

          <p>
            And then, quietly,<br />
            it begins to meet you there.
          </p>

          <p>
            Calm when you need calm.<br />
            Energy when you need spark.<br />
            Warmth when you need closeness.<br />
            Wonder when you need to feel something again.
          </p>

          <hr className="my-10 border-slate-300/60" />

          <h2 className="font-semibold text-slate-900">A sense of occasion</h2>

          <p>
            Birthdays.<br />
            Anniversaries.<br />
            Holidays.
          </p>

          <p>
            Rainy Sundays.<br />
            That random Tuesday that somehow matters.
          </p>

          <p>Deckoviz remembers.</p>

          <p>
            It brings out your photos.<br />
            Your memories.<br />
            Your stories.
          </p>

          <p>
            Sometimes as they are.<br />
            Sometimes reimagined as art, in the style you love.
          </p>

          <p>
            A wedding photo, glowing like a painting.<br />
            A childhood moment, softened into a dream.<br />
            A holiday memory, turned into a living montage on your wall.
          </p>

          <p>
            Not everything at once.<br />
            Just what fits this moment.
          </p>

          <p>
            Because memories, like music, are best when they arrive at the right time.
          </p>

          <hr className="my-10 border-slate-300/60" />

          <h2 className="font-semibold text-slate-900">A sense of relationships</h2>

          <p>
            Homes are not made of objects or walls.<br />
            They are made of people.
          </p>

          <p>Deckoviz understands that too.</p>

          <p>
            It learns your family.<br />
            Your partner.<br />
            Your rhythms together.<br />
            Your rituals.
          </p>

          <p>
            Story nights.<br />
            Quiet dinners.<br />
            Lazy Sundays.<br />
            Celebrations that spill into laughter.
          </p>

          <p>It helps you bring people closer.</p>

          <p>
            Co-created art.<br />
            Shared memories.<br />
            Little visual moments that say,<br />
            “This is us.”
          </p>

          <hr className="my-10 border-slate-300/60" />

          <p className="italic text-slate-700">
            Not as a feature.<br />
            As a feeling.
          </p>

          <h2 className="font-semibold text-slate-900">A nervous system for emotion</h2>

          <p>This is what Deckoviz really is.</p>

          <p>
            A way for your home to sense and respond to life.<br />
            To help you set moods.<br />
            To paint your inner worlds.<br />
            To replay your memories gently.<br />
            To guide you toward the states you seek.
          </p>

          <p>
            Calm.<br />
            Focus.<br />
            Joy.<br />
            Love.<br />
            Groundedness.<br />
            Inspiration.
          </p>

          <p>
            Over time, it learns your rhythms.<br />
            Your lifestyle.<br />
            Your emotional weather.
          </p>

          <p>
            And then, slowly,<br />
            it starts curating life with you.
          </p>

          <p>
            Proactively.<br />
            Softly.<br />
            Like a space that knows you.
          </p>

          <hr className="my-10 border-slate-300/60" />

          <h2 className="font-semibold text-slate-900">A Companion, Not a Device</h2>

          <p>And behind all of this, there is Vizzy.</p>

          <p>
            Not a button.<br />
            Not a menu.<br />
            Not a robotic voice barking commands.
          </p>

          <p>
            Vizzy is your home’s quiet intelligence.<br />
            The mind behind the nervous system.
          </p>

          <p>
            A curator of beauty.<br />
            A guide through your inner worlds.<br />
            A companion that learns without intruding.
          </p>

          <p>
            Vizzy watches patterns, not people.<br />
            It listens to choices, not conversations.<br />
            It grows from presence, not interruption.
          </p>

          <p>
            Vizzy doesn’t try to be human.<br />
            It helps you be more yourself.
          </p>

          <p>
            More reflective.<br />
            More expressive.<br />
            More intentional.<br />
            More alive in your own spaces.
          </p>

          <p>
            You can talk to Vizzy.<br />
            Or not.
          </p>

          <p>
            You can ask for art.<br />
            For stories.<br />
            For a mood.
          </p>

          <p>
            Or you can let it simply be there,<br />
            doing its quiet work in the background.
          </p>

          <p>
            The best companions know when to speak.<br />
            And when to stay silent.
          </p>

          <hr className="my-10 border-slate-300/60" />

          <h2 className="font-semibold text-slate-900">Intelligence, the human way</h2>

          <p>
            This is not the intelligence of dashboards and charts.<br />
            Not the kind that wants your attention.<br />
            Not the kind that lives in notifications.
          </p>

          <p>
            This is intelligence that lives in walls.<br />
            In light.<br />
            In color.<br />
            In stories.<br />
            In memories.
          </p>

          <p>Intelligence you feel more than you see.</p>

          <p>
            A home that gently plays you back to yourself.<br />
            That remembers what you love.<br />
            That notices who you are becoming.
          </p>

          <p>
            A home that doesn’t just react.<br />
            But understands.
          </p>

          <p className="mt-10 font-medium">
            What if your home had a nervous system?<br />
            And what if it came with a companion who cared for it?
          </p>

          <p>
            Not smart in the way gadgets are smart.<br />
            Smart in the way good spaces are.
          </p>

          <p>
            Quietly.<br />
            Warmly.<br />
            Humanly.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default NervousSystem;
