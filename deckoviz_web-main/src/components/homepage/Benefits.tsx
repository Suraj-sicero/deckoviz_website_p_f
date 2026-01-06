import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/* ================= BENEFITS DATA ================= */

export const benefitsData = [
  /* =====================================================
     MAIN FEATURES (VISIBLE ON HOME + EXPLORE MORE)
     ===================================================== */

  {
    icon: "✨",
    title: "A Living, Breathing Home",
    description:
      "Your walls evolve with your day. Morning calm. Afternoon focus. Evening warmth. Deckoviz turns your space into a living environment that moves with your rhythms, moods, and moments.",
    showOnHome: true
  },
  {
    icon: "🎨",
    title: "Infinite Personal Art",
    description:
      "Your photos. Your dreams. Your thoughts. Your inner worlds. An endless stream of art that is deeply personal, never repeated, and always meaningful.",
    showOnHome: true
  },
  {
    icon: "🌸",
    title: "More Presence, Less Noise",
    description:
      "Rituals, moodscapes, meditations, and visual calm help you slow down and feel grounded, present, and at home in your own space.",
    showOnHome: true
  },
  {
    icon: "❤️",
    title: "Deeper Family & Relationships",
    description:
      "From bedtime stories to couple rituals to shared creations, Deckoviz becomes a quiet bridge for bonding, intimacy, play, and togetherness.",
    showOnHome: true
  },
  {
    icon: "✨",
    title: "A Spark for Creativity",
    description:
      "Ideas flow when your space inspires you. Deckoviz nudges you to imagine more, create more, and see beauty where you didn’t before.",
    showOnHome: true
  },
  {
    icon: "🌍",
    title: "A Window to Wonder",
    description:
      "Explore art, cultures, dreams, stories, and worlds far beyond your walls—keeping curiosity alive and your home feeling expansive.",
    showOnHome: true
  },
  {
    icon: "🖼️",
    title: "One Frame, A Thousand Roles",
    description:
      "Art gallery. Memory wall. Vision board. Meditation space. Storybook. TV. One intelligent presence replaces clutter.",
    showOnHome: true
  },
  {
    icon: "🔁",
    title: "Always Fresh, Always Growing",
    description:
      "New art. New modes. New features. Every week. Deckoviz never gets old because it keeps becoming more.",
    showOnHome: true
  },

  /* =====================================================
     REMAINING BENEFITS (VISIBLE ONLY ON EXPLORE MORE)
     ===================================================== */

  {
    icon: "🧠",
    title: "Your Space Works With You",
    description:
      "Instead of static walls and idle screens, your home begins to respond—to your mood, your time, your rituals, and your energy. The environment supports how you want to feel and who you want to become.",
    showOnHome: false
  },
  {
    icon: "🛠️",
    title: "Beauty and Utility, Together",
    description:
      "Deckoviz replaces art, photo frames, posters, mood lighting, music systems, and inspiration boards with a single evolving canvas. Fewer objects. Far richer experiences.",
    showOnHome: false
  },
  {
    icon: "🖼️",
    title: "Memories That Don’t Fade",
    description:
      "Photos, moments, and stories refuse to stay archived. They evolve into art and become part of your daily life instead of something you scroll through once a year.",
    showOnHome: false
  },
  {
    icon: "🎈",
    title: "Creativity Becomes Playful",
    description:
      "You create more without friction—paintings, posters, music, stories, rituals—not because you schedule time, but because your space invites it.",
    showOnHome: false
  },
  {
    icon: "🧘",
    title: "Emotionally Intelligent Spaces",
    description:
      "Morning calm feels different from evening warmth. Celebrations feel distinct from reflection. The space adapts quietly, without you managing it.",
    showOnHome: false
  },
  {
    icon: "🕯️",
    title: "Rituals Without Effort",
    description:
      "Daily grounding. Weekly reflection. Monthly celebrations. Deckoviz remembers, prepares, and sets the tone—making reflection feel natural.",
    showOnHome: false
  },
  {
    icon: "📵",
    title: "A Healthier Relationship With Technology",
    description:
      "Less scrolling. Less noise. More ambience. More presence. Technology shifts from demanding attention to shaping atmosphere.",
    showOnHome: false
  },
  {
    icon: "🌱",
    title: "Personal Growth Stays Visible",
    description:
      "Goals, affirmations, visions, and intentions remain present. Not buried in apps. Not forgotten. Gently seen, every day.",
    showOnHome: false
  },
  {
    icon: "🏡",
    title: "A Home More Expressive Than Your Social Feed",
    description:
      "Your home reflects who you are now, not who you were the last time you updated a profile.",
    showOnHome: false
  },
  {
    icon: "💫",
    title: "A Space That Feels Alive",
    description:
      "Not animated for the sake of it. Alive in a quiet, intentional way. Subtle. Responsive. Human.",
    showOnHome: false
  },
  {
    icon: "🧩",
    title: "One Frame Replaces Many Devices",
    description:
      "Art. TV. Music. Ambience. Memory display. Creative tool. All in one.",
    showOnHome: false
  },
  {
    icon: "♾️",
    title: "Infinite Visuals Without Ongoing Purchases",
    description:
      "No buying prints. No replacing frames. No clutter. Your canvas evolves endlessly.",
    showOnHome: false
  },
  {
    icon: "⚙️",
    title: "Personalization Without Complexity",
    description:
      "Deckoviz learns you over time—without constant inputs or micromanagement.",
    showOnHome: false
  },
  {
    icon: "🚀",
    title: "Designed to Last",
    description:
      "Weekly software evolution. Expanding features. A platform that grows with you, not something you outgrow.",
    showOnHome: false
  }
];

/* ================= COMPONENT ================= */

const Benefits = () => {
  const navigate = useNavigate();

  return (
<section className="relative py-20 bg-white overflow-visible">

      {/* 🌸 Infinite Portal Button */}
{/* 🌸 Infinite Portal Button */}
<button
  onClick={() => navigate("/infinite-portal")}
  className="
    hidden lg:flex
    absolute right-8 top-6
    z-30
    max-w-[460px]
    px-6 py-3
    rounded-full
    text-left

    /* 🍊 Dark Peach / Soft Orange */
    bg-gradient-to-r 
    from-[#ffb088] 
    via-[#ff9966] 
    to-[#ff874d]

    text-[#6b2f16]

    shadow-[0_18px_45px_rgba(255,135,77,0.45)]
    hover:shadow-[0_28px_70px_rgba(255,135,77,0.65)]

    transition-all duration-500
    animate-[float_7s_ease-in-out_infinite]
  "
>
  <span className="text-sm font-medium leading-snug">
    A Portal of Infinite Goodness, Endless Memories,  
    and a Frame That Will Never Be Finished 
  </span>
</button>

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
          How Deckoviz Brings Your Space to Life
        </h2>

        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          A living canvas, a creative companion, and a quiet presence that makes
          your space feel more like you.
        </p>

        {/* MAIN BENEFIT CARDS ONLY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsData
            .filter((benefit) => benefit.showOnHome)
            .map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="
                  p-6 rounded-2xl
                  bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50
                  hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500
                  text-gray-800 hover:text-white
                  shadow-sm hover:shadow-xl
                  transition-colors
                  transform-gpu
                  text-center
                "
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Emoji */}
                <motion.div
                  whileHover={{ scale: 1.4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 12 }}
                  className="text-4xl mb-4 inline-block"
                >
                  {benefit.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm opacity-90">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
        </div>

        {/* Explore More */}
        <div className="flex justify-center mt-12">
          <Link
            to="/benefits"
            className="
              px-8 py-3 rounded-full
              bg-gradient-to-r from-indigo-500 to-pink-500
              text-white font-medium shadow-lg
              hover:scale-105 transition
            "
          >
            See More Magic ✨
          </Link>
        </div>
      </div>
      <style>{`
  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
`}</style>

    </section>
  );
};

export default Benefits;
