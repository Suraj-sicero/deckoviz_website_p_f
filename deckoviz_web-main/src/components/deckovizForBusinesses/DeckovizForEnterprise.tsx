"use client";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Building,
  Layers,
  Code,
  Headset,
  BarChart2,
  Shield,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { DynamicImageGrid } from "../other/DynamicImageGrid";
import { useNavigate } from "react-router-dom";
import { loadBlogs, MarkdownBlog } from "../../lib/blogLoader"

import { Link } from "react-router-dom"

const ENTERPRISE_ARTICLES = {
  core: [
    "deckoviz-for-restaurants",
    "deckoviz-for-retail",
    "deckoviz-for-real-estate",
    "deckoviz-for-hotels",
    "deckoviz-for-wellness",
  ],

  platform: [
    "dasp-users-guide",
    "the-vizzy-magic-for-homes-and-businesses",
    "from-screens-to-spaces",
    "enterprise-control-layer",
  ],

  thought: [
    "why-deckoviz-is-a-must-have-for-modern-enterprises",
    "the-power-of-visual-storytelling-and-custom-art-for-enterprises-with-deckoviz-e-dasp",
    "custom-art-as-a-brand-asset",
    "designing-for-dwell-time-not-distraction",
  ],

  practical: [
    "measuring-experience-without-killing-it",
    "the-future-of-intelligent-physical-spaces",
  ],
}

// --- REUSABLE COMPONENTS (Updated with new styling) ---
type Spark = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dx: number;
  dy: number;
};

const Button = ({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) => {
  // Style matched with the buttons in the first component
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5";
  const variants = {
    primary: "bg-[#6670d8] text-white hover:bg-indigo-700",
    secondary:
      "bg-white/80 backdrop-blur-sm text-gray-900 border border-gray-300/50 hover:bg-gray-100",
  };
  const renderPost = (post: MarkdownBlog) => (
  <Link
    key={post.slug}
    to={`/blog/${post.slug}`}
    className="group relative flex gap-4 pb-6 border-b border-gray-200 hover:border-purple-400 transition"
  >
    <div className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none
      bg-gradient-to-r from-purple-200/40 via-pink-200/30 to-indigo-200/40 blur-xl" />

    <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden shadow-sm">
      <img
        src={post.image || "/placeholder.svg"}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div className="relative flex-grow">
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition">
        {post.title}
      </h3>

      {post.description && (
        <p className="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-2">
          {post.description}
        </p>
      )}

      <div className="mt-2 text-sm text-purple-600 opacity-0 group-hover:opacity-100 transition">
        Read →
      </div>
    </div>
  </Link>
)

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  );
};



// --- NEW STYLED FEATURE CARD (Updated with new text styling) ---
const EnterpriseFeatureCard = ({
  icon,
  title,
  description,
  themeColor,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  themeColor: string;
}) => {
  const themes: {
    [key: string]: { gradient: string; text: string; accent: string };
  } = {
    purple: {
      gradient: "from-purple-500 to-indigo-500",
      text: "text-purple-600",
      accent: "group-hover:from-purple-400",
    },
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      text: "text-blue-600",
      accent: "group-hover:from-blue-400",
    },
    emerald: {
      gradient: "from-emerald-500 to-teal-500",
      text: "text-emerald-600",
      accent: "group-hover:from-emerald-400",
    },
  };
  const theme = themes[themeColor] || themes.purple;

  return (
    <div className="relative group cursor-pointer h-full">
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${theme.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`}
      />
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col group-hover:bg-white/90">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`p-3 rounded-2xl bg-gradient-to-r ${theme.gradient} group-hover:scale-110 transition-transform duration-300`}
            >
              {icon}
            </div>
            <div
              className={`w-8 h-1 bg-gradient-to-r from-gray-300 to-transparent rounded-full ${theme.accent} transition-colors duration-300`}
            />
          </div>
          <div
            className={`text-gray-400 ${theme.text} transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {/* Matched h3 styling */}
        <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight group-hover:text-gray-800">
          {title}
        </h3>
        {/* Matched p styling with card descriptions from the first file */}
        <p className="text-indigo-700 font-medium text-sm leading-relaxed flex-grow">
          {description}
        </p>
        <div className="mt-8 pt-4 border-t border-gray-100">
          <div
            className={`h-1 bg-gradient-to-r ${theme.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
          />
        </div>
      </div>
    </div>
  );
};

const DemoRequestModal = ({ onClose }: { onClose: () => void }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your demo request has been submitted.");
    onClose();
  };
  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative transition-all duration-300 ease-in-out transform scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          {/* Matched heading style */}
          <h3 className="text-xl font-semibold text-gray-900">
            Request an Enterprise Demo
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Form fields remain the same */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              id="company"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message (Optional)
            </label>
            <textarea
              id="message"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div className="pt-4">
            {/* Matched button style */}
            <button
              type="submit"
              className="w-full bg-[#6670d8] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const enterpriseImages = [
  { src: "/images/DIGE6.png" },
  { src: "/images/DIGE2.png" },
  { src: "/images/DIGE3.png" },
  { src: "/images/DIGE4.png" },
  { src: "/images/DIGE5.png" },
  { src: "/images/DIGE7.png" },
  { src: "/images/DIGE8.png" },
  { src: "/images/DIGE9.png" },
];

export default function DeckovizForEnterprise() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);


const retailImages = Array.from(
  { length: 20 },
  (_, i) => `/images/shoppic (${i + 1}).png`
);

const hotelImages = Array.from(
  { length: 43 },
  (_, i) => `/images/hootelpic (${i + 1}).png`
);


const [retailIndex, setRetailIndex] = useState(0);
const [hotelIndex, setHotelIndex] = useState(0);

useEffect(() => {
  const retailInterval = setInterval(() => {
    setRetailIndex((prev) => (prev + 1) % retailImages.length);
  }, 2000);

  const hotelInterval = setInterval(() => {
    setHotelIndex((prev) => (prev + 1) % hotelImages.length);
  }, 2000);

  return () => {
    clearInterval(retailInterval);
    clearInterval(hotelInterval);
  };
}, []);

  const [blogs, setBlogs] = useState<MarkdownBlog[]>([])
  const categorizedEnterpriseBlogs = {
  core: blogs.filter(b => ENTERPRISE_ARTICLES.core.includes(b.slug)),
  platform: blogs.filter(b => ENTERPRISE_ARTICLES.platform.includes(b.slug)),
  thought: blogs.filter(b => ENTERPRISE_ARTICLES.thought.includes(b.slug)),
  practical: blogs.filter(b => ENTERPRISE_ARTICLES.practical.includes(b.slug)),
}

const [activeCategory, setActiveCategory] = useState("All")

useEffect(() => {
  loadBlogs().then(setBlogs)
}, [])
const enterpriseCategories = [
  "All",
  "Core Industry Pages",
  "Platform & Intelligence",
  "Thought Leadership & Strategy",
  "Practical & Forward-Looking",
]


useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {

    if (Math.random() > 0.5) return;

    setSparks(prev => [
      ...prev,
      ...Array.from({ length: 6 }).map(() => ({
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 6,
        color: ["#ffffff","#facc15","#a855f7","#ec4899","#38bdf8"]
          [Math.floor(Math.random() * 5)],
        dx: (Math.random() - 0.5) * 10,
        dy: (Math.random() - 0.5) * 10,
      }))
    ]);

    setTimeout(() => {
      setSparks(prev => prev.slice(6));
    }, 600);

  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);

  const navigate = useNavigate();

  const enterpriseFeatures = [
    {
      icon: <Layers size={28} className="text-white" />,
      title: "Adaptive Environments",
      description:
        "Deckoviz creates environments that evolve in real time. Art, visuals, music, lighting, and ambience adapt to the time of day, season, event, and guest context. Morning feels different from evening. Weekdays feel different from weekends. A quiet afternoon does not feel like a celebration night. Your space stops being static and starts feeling alive, intentional, and tuned.",
    },
    {
      icon: <Building size={28} className="text-white" />,
      title: "Products That Come Alive",
      description:
        "Deckoviz turns products, dishes, collections, and offerings into living visuals. Static images become dynamic animations, subtle videos, and narrative-driven displays. Dishes float, textures breathe, products are shown in use, in context, in mood. This increases perceived value, curiosity, and conversion without feeling promotional. Your walls start doing the storytelling your staff cannot repeat endlessly.",
    },
    {
      icon: <Code size={28} className="text-white" />,
      title: "Deep Guest Personalization",
      description:
        "Deckoviz allows you to recognize guests without making it awkward. Frequent visitors can be welcomed with subtle visual cues, personalized menus, memento artworks, or contextual experiences. New guests can be served through persona-based experiences that feel thoughtful, not generic. Personalization becomes atmospheric rather than transactional.",
    },
    {
      icon: <Headset size={28} className="text-white" />,
      title: "Built-in Generative Engine",
      description:
        "Deckoviz removes the friction between creation and display. Custom art, branded visuals, posters, menus, announcements, and campaign material can be generated directly on the platform and instantly deployed across screens. No external tools. No printing. No long design loops. Creation, iteration, and deployment happen in one continuous flow.",
    },
    {
      icon: <BarChart2 size={28} className="text-white" />,
      title: "Memorable Guest Experiences",
      description:
        "Deckoviz turns visits into experiences worth remembering and sharing. Immersive visuals, narrative moments, personalized elements, and multisensory scenes create emotional anchors. Guests remember how the space made them feel. They talk about it. They photograph it. They return. Memorability compounds into loyalty, word of mouth, and organic reach.",
    },
    {
      icon: <Shield size={28} className="text-white" />,
      title: "Vizzy, Your AI Brand Companion",
      description:
        "Vizzy is the intelligence layer behind Deckoviz. For enterprises, Vizzy acts as a brand storyteller, visual curator, experience designer, customer entertainer, campaign assistant, ambience orchestrator, and custom art generator. Vizzy understands your brand, your offerings, your audience, and your goals. And it improves continuously, learning from real-world usage rather than assumptions.",
    },
  ];
const renderPost = (post: MarkdownBlog) => (
  <Link
    key={post.slug}
    to={`/blog/${post.slug}`}
    className="group relative flex gap-4 pb-6 border-b border-gray-200 hover:border-purple-400 transition"
  >
    <div className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition pointer-events-none
      bg-gradient-to-r from-purple-200/40 via-pink-200/30 to-indigo-200/40 blur-xl" />

    <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden shadow-sm">
      <img
        src={post.image || "/placeholder.svg"}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div className="relative flex-grow">
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition">
        {post.title}
      </h3>

      {post.description && (
        <p className="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-2">
          {post.description}
        </p>
      )}

      <div className="mt-2 text-sm text-purple-600 opacity-0 group-hover:opacity-100 transition">
        Read →
      </div>
    </div>
  </Link>
)

  return (
    <div className="bg-white">
      
      <div className="pointer-events-none fixed inset-0 z-[999]">
{sparks.map(spark => (
<span
  key={spark.id}
  className="absolute rounded-full animate-spark"
  style={{
    left: spark.x,
    top: spark.y,
    width: spark.size,
    height: spark.size,
    background: spark.color,
    boxShadow: `0 0 20px ${spark.color}`,
    transform: `translate(${spark.dx}px, ${spark.dy}px)`
  }}
/>
))}
</div>

      {/* Hero Section with Gradient Background */}
      <div className="min-h-[120vh] relative overflow-hidden">
        {/* Gradient Background Effects - Only for Hero Section */}
        <div className="absolute inset-0">
          {/* Animated Gradient Layers */}
          <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-indigo-500/25 via-purple-400/15 to-transparent blur-[40px] animate-[floatLeft_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-r from-indigo-500/20 via-purple-400/10 to-transparent blur-[50px] animate-[floatCenter_8s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/2 left-0 w-3/5 h-1/2 bg-gradient-to-r from-indigo-500/15 via-purple-400/8 to-transparent blur-[60px] animate-[floatBottom_10s_ease-in-out_infinite]"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/25 via-purple-400/15 to-transparent blur-[50px] animate-[floatRight_7s_ease-in-out_infinite]"></div>
          <div className="absolute top-0 left-0 w-1/6 h-1/3 bg-gradient-to-r from-indigo-600/30 via-rose-400/15 to-transparent blur-[30px] animate-[pulse_4s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/3 left-0 w-1/5 h-1/2 bg-gradient-to-r from-indigo-500/20 via-rose-400/17 to-transparent blur-[35px] animate-[floatLeft_5s_ease-in-out_infinite_1s]"></div>
          <div className="absolute top-2/3 left-0 w-1/4 h-1/3 bg-gradient-to-r from-indigo-600/35 via-rose-400/20 to-transparent blur-[40px] animate-[floatCenter_6s_ease-in-out_infinite_2s]"></div>
          <div className="absolute top-0 right-0 w-1/6 h-full bg-gradient-to-l from-indigo-600/30 via-rose-400/15 to-transparent blur-[35px] animate-[floatRight_9s_ease-in-out_infinite_1.5s]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-purple-300/20 via-pink-300/18 to-transparent blur-[45px] animate-[floatBottom_8s_ease-in-out_infinite_3s]"></div>

          {/* Curved Grid Pattern - Barrel Distortion Effect */}
          <svg
            className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
            viewBox="0 0 1000 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <g stroke="white" strokeWidth="1" fill="none">
              {/* Vertical curved lines (longitude-style) */}
              {Array.from({ length: 25 }).map((_, i) => {
                const x = (i / 24) * 1000;
                const curvature = Math.sin((i / 24) * Math.PI) * 120;
                return (
                  <path
                    key={`v-${i}`}
                    d={`M ${x} 0 Q ${x + curvature} 400 ${x} 800`}
                  />
                );
              })}

              {/* Horizontal curved lines (latitude-style) */}
              {Array.from({ length: 20 }).map((_, i) => {
                const y = (i / 19) * 800;
                const distanceFromCenter = Math.abs(y - 400) / 400;
                const compression = 1 - distanceFromCenter * 0.7;
                const curve = 150 * (1 - compression);

                return (
                  <path
                    key={`h-${i}`}
                    d={`M 0 ${y} Q ${250 + curve} ${y} 500 ${y} T 1000 ${y}`}
                  />
                );
              })}
            </g>
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16">
          {/* Top Badge */}
          <div className="mt-28 mb-10 shadow-lg hover:shadow-xl">
            <span className="inline-flex items-center px-3 py-1 bg-[#6670d8] text-white text-sm font-medium rounded-md">
              Deckoviz For All
            </span>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-5xl font-semibold text-gray-900 leading-tight">
              Deckoviz For Enterprises
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 max-w-2xl">
            <p className="text-lg font-medium text-gray-800 leading-relaxed max-w-3xl mx-auto">
              The AI-powered ambience, storytelling, and personalization layer
              for modern enterprise spaces.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Request an Enterprise Demo
            </Button>
            <a href="/d(1).pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">Download Brochure</Button>
            </a>
          </div>

          {/* Description Paragraphs */}
        </div>
      </div>
      {/* ================= FULL ENTERPRISE OVERVIEW   GLASS CARD ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-purple-500/30 via-pink-500/25 to-indigo-500/20 blur-[160px]" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-[40px] overflow-hidden shadow-[0_60px_160px_rgba(168,85,247,0.35)]"
          >
            {/* Top Gradient Bar */}
            <div className="h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500" />

            {/* Glass Card */}
            <div className="bg-gradient-to-br from-[#ab50db] via-[#a73dc4] to-purple-600 text-white backdrop-blur-xl p-10">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold tracking-wide">
                  Deckoviz for Enterprises
                </h2>

                <div className="px-4 py-1 rounded-full text-sm bg-white/10 border border-white/20">
                  Full Overview
                </div>
              </div>

              {/* Progress */}
              <div className="mb-10">
                <div className="flex justify-between text-sm text-white/70 mb-3">
                  <span>Experience Progress</span>
                  <span>∞</span>
                </div>

                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[95%] bg-gradient-to-r from-purple-800 via-indigo-700 to-pink-500 rounded-full" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 text-white/80 leading-relaxed text-[16px]">
                <p>
                  Attention is fragmented. Expectations are higher.
                  Differentiation is harder. Screens are everywhere   yet most
                  spaces still feel forgettable.
                </p>

                <p>
                  Deckoviz was built for this exact problem. It is an AI-powered
                  Dynamic Art, Storytelling, and Spatial Experience Platform
                  designed for enterprises that understand one thing clearly:
                  <span className="text-white font-semibold">
                    {" "}
                    the future of business is experiential, emotional, and
                    adaptive.
                  </span>
                </p>

                <p>
                  Not static signage. Not passive screens. Deckoviz turns walls
                  into living, intelligent canvases that respond to context,
                  brand, time, audience, and intent.
                </p>

                <p>
                  For businesses, Deckoviz becomes the missing layer between
                  brand strategy and real-world experience   the layer customers
                  actually feel.
                </p>
              </div>

              {/* Footer Pills */}
              <div className="mt-10 flex gap-4 flex-wrap">
                <div className="px-4 py-2 rounded-full bg-white/10 text-sm border border-white/20">
                  Dynamic Art
                </div>

                <div className="px-4 py-2 rounded-full bg-white/10 text-sm border border-white/20">
                  Storytelling
                </div>

                <div className="px-4 py-2 rounded-full bg-white/10 text-sm border border-white/20">
                  Spatial Intelligence
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SECTION 2: WHAT DECKOVIZ IS AT ITS CORE ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-8">
            What Deckoviz is, at its Core
          </h2>

          <p className="text-[17px] text-gray-700 leading-relaxed text-justify mb-10">
            Deckoviz DASP is an AI-powered Dynamic Art and Storytelling Portal,
            paired with a premium Smart Display system. It functions
            simultaneously as:
          </p>

          <div className="mt-10 space-y-6">
            {[
              "A generative visual engine",
              "A brand storytelling system",
              "A dynamic signage and merchandising platform",
              "A multisensory ambience controller",
              "An adaptive, learning companion for physical spaces",
            ].map((item, i) => (
              <div
                key={i}
                className="group flex items-center gap-6 py-5 border-b border-gray-200 hover:border-purple-400 transition"
              >
                {/* Number */}
                <div className="text-xl font-semibold text-purple-500 w-10">
                  0{i + 1}
                </div>

                {/* Text */}
                <p className="text-gray-800 text-lg group-hover:text-purple-600 transition">
                  {item}
                </p>

                {/* Line grow */}
                <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
            ))}
          </div>

          <p className="mt-10 text-[17px] text-gray-700 leading-relaxed text-justify">
            This is not a device you “install and forget”. It is a platform that
            learns your business and grows with it.
          </p>
        </div>
      </section>

     {/* ================= CORE ENTERPRISE FEATURES ================= */}
<section className="py-24 bg-white">

<h2 className="text-4xl font-semibold text-center mb-14 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
  Core Enterprise Features
</h2>

<div className="max-w-4xl mx-auto space-y-10 px-6">

{enterpriseFeatures.map((feature, index) => (

<motion.div
  key={feature.title}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: index * 0.08 }}
  viewport={{ once: true }}
  className="group"
>

<div className="flex gap-6 items-start">

{/* Icon */}
<div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shrink-0">
{feature.icon}
</div>

{/* Text */}
<div className="flex-grow">

<h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition">
{feature.title}
</h3>

<p className="text-gray-700 leading-relaxed">
{feature.description}
</p>

{/* Elegant divider */}
<div className="mt-6 h-[1px] w-full bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 opacity-30 group-hover:opacity-80 transition" />

</div>

</div>

</motion.div>

))}

</div>

</section>

      {/* ================= SECTION 4: BROCHURE INTRO (Pic content) ================= */}
      {/* ================= INTELLIGENT AMBIENCE CARD ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="
    rounded-[36px] p-14
    bg-gradient-to-br from-fuchsia-200 via-indigo-200 to-indigo-300
    shadow-[0_35px_90px_rgba(236,72,153,0.20)]
    border border-pink-300    
  "
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-6">
              The Intelligent Ambience & Storytelling Layer for Enterprise
              Spaces
            </h2>

            <p className="text-[17px] text-gray-700 leading-relaxed mb-5 text-justify">
              Most enterprise spaces still rely on static frames, static
              screens, static signage, and static moods. Deckoviz replaces that
              with a living system.
            </p>

            <p className="text-[17px] text-gray-700 leading-relaxed mb-5 text-justify">
              Deckoviz for Enterprise is an{" "}
              <span className="font-semibold text-gray-900">
                AI-powered ambience, storytelling, and personalization platform
              </span>{" "}
              that transforms physical spaces into adaptive, expressive,
              revenue-supporting environments. It blends generative visuals,
              sound, lighting, memory, and intelligence to help businesses tell
              better stories, create stronger emotional connections, and deliver
              experiences that evolve over time.
            </p>

            <p className="text-[17px] text-gray-700 leading-relaxed text-justify">
              Below are some of the core, general-purpose capabilities that
              power Deckoviz across retail, hospitality, real estate, wellness,
              offices, and public spaces.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: BROCHURE TABLE FEATURES (Pic content) ================= */}
      <section className="bg-white pb-28 relative overflow-hidden">
        {/* BACKGROUND GLOW */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/30 via-pink-400/25 to-indigo-400/20 blur-[140px]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-semibold text-center mb-12 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
            Core Enterprise Features & Highlights
          </h2>

          {/* DRIP BAR */}
          <div className="relative mx-auto w-24 h-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 mb-10">
            <div className="absolute -bottom-4 left-1/2 w-6 h-6 bg-pink-500 rounded-full blur-sm" />
          </div>

          <div className="rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(168,85,247,0.25)] border border-purple-200">
            {/* HEADER */}
            <div className="grid grid-cols-12 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white">
              <div className="col-span-4 px-6 py-5 font-semibold">Feature</div>
              <div className="col-span-8 px-6 py-5 font-semibold">
                Description
              </div>
            </div>

            {/* ROWS */}
            <div className="divide-y divide-purple-100 bg-white">
              {[
                [
                  "Dynamic Product Display Enhancer",
                  "Turn static product images into animated visuals, artistic loops, or short videos. Showcase products in motion, in use, or reimagined through high-production generative visuals.",
                ],
                [
                  "AI Brand-Themed Artwork Engine",
                  "Generate living artworks inspired by your brand identity, location, history, and values. Every space gains a unique visual language that evolves with time and context.",
                ],
                [
                  "Generative Marketing & Signage Suite",
                  "Instantly create menus, posters, signage, promotions, and announcements in your brand style. Update content dynamically without design bottlenecks.",
                ],
                [
                  "Multisensory Moodscapes Engine",
                  "Sync visuals with music, adaptive backlighting, and future scent modules to create deeply immersive, emotionally resonant environments.",
                ],
                [
                  "Guest & Visitor Personalization",
                  "Remember frequent guests, customer personas, or visitor types. Adapt visuals and ambience subtly to make people feel recognized, not tracked.",
                ],
                [
                  "Collections with AI Narration",
                  "Turn products, menus, stories, or spaces into narrated visual collections. Voice adds trust, warmth, and clarity without feeling salesy.",
                ],
                [
                  "AI Music & Sound Generator",
                  "Create brand-themed music, product-specific soundscapes, or ambient audio that aligns with time of day, energy, and context.",
                ],
                [
                  "Smart Display Scheduling",
                  "Automate displays by time, season, event, audience type, or business rhythm. Morning, evening, weekday, festive, or campaign-specific modes run automatically.",
                ],
                [
                  "Customer Visual Keepsakes",
                  "Create personalized visuals for guests or customers during special moments and let them take it home digitally. Experiences turn into shareable memories.",
                ],
                [
                  "Vizzy for Business (AI Brand Companion)",
                  "Vizzy acts as a brand ambassador, storyteller, and guide. It answers questions, introduces offerings, and shapes experiences with personality and restraint.",
                ],
                [
                  "AI Montage & Memory Creator",
                  "Instantly generate artistic montages from photos or events. Ideal for hospitality, celebrations, retail milestones, or real estate walkthroughs.",
                ],
                [
                  "Dynamic Visual Menus & Catalogs",
                  "Replace static menus or catalogs with living visual systems that rotate items, highlight specials, and tell stories visually.",
                ],
                [
                  "Social Proof & Testimonial Displays",
                  "Curate reviews, testimonials, and customer moments into ambient, trust-building visual loops without turning the space into a feed.",
                ],
                [
                  "Marketplace & Commerce Layer",
                  "Use Deckoviz as a visual commerce surface. Showcase products, experiences, or digital items directly within the environment.",
                ],
                [
                  "Enterprise Control & Admin Suite",
                  "Centralized dashboard for multi-location control, scheduling, approvals, branding consistency, and future CRM or POS integrations.",
                ],
                [
                  "Adaptive Intelligence Engine",
                  "Over time, Deckoviz learns what works in each space. Displays, moods, and stories improve continuously based on real-world interaction patterns.",
                ],
              ].map(([feature, desc], i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 px-6 py-6 hover:bg-gradient-to-r hover:from-purple-50 hover:via-pink-50 hover:to-indigo-50 transition-all duration-300 group"
                >
                  <div className="col-span-4 font-semibold text-gray-900 group-hover:text-purple-600">
                    {feature}
                  </div>

                  <div className="col-span-8 text-gray-700 leading-relaxed">
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* YT and Instagram */}
      <div className="bg-white py-12 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Enhanced Heading Section */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-4xl font-semibold text-gray-900 leading-tight mb-7">
              Learn More About
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}
                Deckoviz
              </span>
            </h2>
            <p className="text-sm mb-16 md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dive deeper into the world of AI-powered smart art frames and
              discover how Deckoviz is revolutionizing customer experiences
              through immersive visual storytelling.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - YouTube Video */}
            <div className="relative group mt-0 md:mt-[-3rem]">
              <div className="relative p-10 sm:p-6 md:p-8">
                <div
                  className="absolute -inset-12 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(99,102,241,0.4) 0%, rgba(147,51,234,0.3) 15%, rgba(124,58,237,0.35) 30%, rgba(168,85,247,0.3) 45%, rgba(251,146,60,0.25) 60%, rgba(219,39,119,0.2) 75%, rgba(139,69,19,0.1) 90%, transparent 100%)",
                    filter: "blur(40px)",
                  }}
                />
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-white/50 group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Watch Deckoviz Transform Spaces
                    </h3>
                  </div>
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.youtube.com/embed/Rxms0gWUmMs"
                      title="Deckoviz Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <p className="text-center text-gray-600 mt-4">
                    Experience the magic of Deckoviz and see how it can
                    transform your space.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group mt-0">
              <div className="relative p-4 sm:p-6 md:p-8">
                {/* Background Glow */}
                <div
                  className="absolute -inset-12 opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(99,102,241,0.4) 0%, rgba(147,51,234,0.3) 15%, rgba(124,58,237,0.35) 30%, rgba(168,85,247,0.3) 45%, rgba(251,146,60,0.25) 60%, rgba(219,39,119,0.2) 75%, rgba(139,69,19,0.1) 90%, transparent 100%)",
                    filter: "blur(40px)",
                  }}
                />

                {/* Instagram Container */}
                <div className="relative bg-white/95 backdrop-blur-sm w-full max-w-md mx-auto rounded-3xl p-3 shadow-2xl border border-white/60 group-hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Responsive Instagram Embed */}
                  <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl">
                    <iframe
                      src="https://www.instagram.com/p/DLM9TrnSibN/embed"
                      className="w-full h-full"
                      frameBorder="0"
                      allowTransparency={true}
                      allow="encrypted-media"
                      title="Instagram Post"
                    ></iframe>
                  </div>

                  {/* Caption */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Follow Our Journey
                    </h3>
                    <p className="text-sm text-gray-600">
                      Daily inspiration & updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 6: EXPLORE FURTHER ================= */}


{/* 📘 Floating Business DASP Guide Button */}


      <section className="py-24 bg-white">

<div className="max-w-7xl mx-auto px-6">

{/* Title */}
<div className="text-center mb-14">

<h2 className="text-4xl font-semibold text-gray-900 mb-4">
A Canvas for Every Environment, Every Moment
</h2>

<p className="text-gray-600 max-w-2xl mx-auto">
From lobbies to luxury suites, from restaurants to wellness spaces, see how Deckoviz adapts to any enterprise space.
</p>

</div>

{/* Images */}
<div className="grid md:grid-cols-2 gap-12 md:gap-16">

{/* RETAIL */}
<div className="relative flex justify-center">

<img
src="/images/retail_bgpic.jpeg"
className="w-full rounded-[40px] shadow-xl"
/>

<div className="absolute top-[20.5%] left-1/2 -translate-x-1/2 w-[70%] h-[41%] aspect-video overflow-hidden">

{retailImages.map((img, index) => (
<img
key={index}
src={img}
className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
index === retailIndex ? "opacity-100" : "opacity-0"
}`}
 />
))}

</div>

</div>


{/* RESTAURANT */}
<div className="relative flex justify-center">

<img
src="/images/restobg.png"
className="w-full rounded-[40px] shadow-xl"
/>

<div className="absolute top-[14.5%] left-1/2 -translate-x-1/2 w-[60%] aspect-video overflow-hidden z-10">

{hotelImages.map((img, index) => (
<img
key={index}
src={img}
className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
index === hotelIndex ? "opacity-100" : "opacity-0"
}`}
 />
))}

</div>

</div>
</div>

</div>

</section>
      {/* Features Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 right-20 w-[600px] h-[600px] opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, rgba(147,51,234,0.4) 0%, rgba(219,39,119,0.25) 40%, transparent 90%)",
              filter: "blur(140px)",
            }}
          />
          <div
            className="absolute bottom-20 left-20 w-[500px] h-[500px] opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, rgba(59,130,246,0.3) 0%, rgba(147,51,234,0.2) 50%, transparent 80%)",
              filter: "blur(120px)",
            }}
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            {/* UPDATED: font-bold to font-semibold */}
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
              Benefits that compound, with enterprise-grade solutions
            </h2>
            {/* UPDATED: text-gray-600 to text-gray-800 */}
            <p className="text-lg text-gray-800 mt-4 max-w-2xl mx-auto leading-relaxed">
              Benefits that compound over time Not features you install once,
              but advantages that grow with every guest, every day Deckoviz is
              designed to quietly solve the hardest problems in physical spaces.
              Problems of attention, emotion, memory, differentiation, and
              scale. These are a few core benefits enterprises experience when
              Deckoviz becomes part of their environment.
            </p>
          </div>
          <div className="max-w-4xl mx-auto mt-16 space-y-10">
            {enterpriseFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shrink-0">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition">
                      {feature.title}
                    </h3>

                    <p className="text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Divider */}
                    <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 opacity-40 group-hover:opacity-80 transition" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION: OTHER ENTERPRISE BENEFITS ================= */}
      <section className="relative py-20 bg-white overflow-hidden border-t border-gray-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-10 w-[450px] h-[450px] rounded-full bg-pink-200/25 blur-[110px]" />
          <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-purple-200/25 blur-[110px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
              Other Enterprise Benefits
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Beyond the core features, Deckoviz delivers enterprise-grade
              advantages that matter at scale   operationally, strategically,
              and experientially.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Multi-location orchestration",
                desc: "Manage one screen or one thousand from a single intuitive dashboard. Orchestrate content, experiences, and ambience centrally while still enabling local nuance across locations.",
              },
              {
                title: "Brand consistency at scale",
                desc: "Preserve your visual identity everywhere your brand exists   visuals, color systems, tone, narrative style, and experience design remain aligned without sacrificing flexibility.",
              },
              {
                title: "Clean enterprise integrations",
                desc: "Integrate into existing enterprise systems through APIs and structured controls. Automate updates, enable inventory-aware visuals, and coordinate campaigns without operational overhead.",
              },
              {
                title: "Analytics & measurable impact",
                desc: "Move beyond guesswork using analytics that link visual experiences to dwell time, engagement patterns, and behavioral signals   enabling teams to optimize for real-world outcomes.",
              },
              {
                title: "Enterprise security & reliability",
                desc: "Deckoviz is built with enterprise-grade security, reliability, and support. From onboarding to expansion, it remains dependable, low-maintenance, and future-proof.",
              },
              {
                title: "A living body for your brand",
                desc: "Deckoviz does not replace your brand strategy   it gives it a living, intelligent body inside your space, continuously evolving with your business.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/55 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-[0_20px_70px_rgba(236,72,153,0.10)] hover:shadow-[0_30px_90px_rgba(168,85,247,0.16)] transition-all duration-500 hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-[15px] text-gray-700 leading-relaxed text-justify">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-14">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Schedule Your Enterprise Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 text-center">
          {/* UPDATED: font-bold to font-semibold */}
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            Ready to Redefine Your Space?
          </h2>
          {/* UPDATED: text-gray-600 to text-gray-900, added font-medium */}
          <p className="text-lg text-gray-900 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how Deckoviz can create a unique, immersive experience
            for your brand.
          </p>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Schedule Your Enterprise Demo
          </Button>
        </div>
      </section>

      {isModalOpen && (
        <DemoRequestModal onClose={() => setIsModalOpen(false)} />
      )}
      <section className="bg-white py-20 border-t border-gray-100">
        {/* ================= EXPLORE FURTHER ================= */}
<section className="relative py-28 bg-white border-t border-gray-100">


{/* 📘 Business DASP Guide Button   ONLY for Explore Further */}
<button
  onClick={() => navigate("/dasp-business-guide")}
  className="
    hidden lg:flex
    absolute
    right-10
    top-16
    z-20
    max-w-[560px]
    px-10 py-2
    rounded-[999px]
    text-left
    bg-gradient-to-br from-violet-300 via-fuchsia-400 to-pink-400
    shadow-[0_16px_40px_rgba(168,85,247,0.35)]
    hover:shadow-[0_24px_60px_rgba(168,85,247,0.55)]
    transition-all duration-500
  "
>
  <div className="flex flex-col gap-0.5">
    <span className="text-xs uppercase tracking-widest text-purple-900">
      Business Guide
    </span>

    <span className="text-sm font-medium text-purple-950 leading-snug">
      The Ultimate Guide for Deckoviz DASP For Business
    </span>

    <span className="text-xs text-purple-900 opacity-80">
      Strategy, platform intelligence, enterprise use-cases & scale.
    </span>
  </div>
</button>


<div className="max-w-7xl mx-auto px-6">

{/* Header */}
<div className="text-center mb-14">
<h2 className="text-4xl font-semibold text-gray-900 mb-4">
Explore Further
</h2>

<p className="text-gray-600 max-w-2xl mx-auto">
Deeper dives into industries, platform intelligence, strategy, and the future of intelligent spaces.
</p>
</div>

{/* Category Filter */}
<div className="flex flex-wrap justify-center gap-4 mb-16">

{enterpriseCategories.map(cat => (
<button
key={cat}
onClick={() => setActiveCategory(cat)}
className={`px-6 py-2 rounded-full text-sm font-medium transition ${
activeCategory === cat
? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow"
: "bg-gray-100 text-gray-700 hover:bg-gray-200"
}`}
>
{cat}
</button>
))}

</div>

{/* Article Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">

{activeCategory === "All" && (
<>
{categorizedEnterpriseBlogs.core.map(renderPost)}
{categorizedEnterpriseBlogs.platform.map(renderPost)}
{categorizedEnterpriseBlogs.thought.map(renderPost)}
{categorizedEnterpriseBlogs.practical.map(renderPost)}
</>
)}

{activeCategory === "Core Industry Pages" &&
categorizedEnterpriseBlogs.core.map(renderPost)}

{activeCategory === "Platform & Intelligence" &&
categorizedEnterpriseBlogs.platform.map(renderPost)}

{activeCategory === "Thought Leadership & Strategy" &&
categorizedEnterpriseBlogs.thought.map(renderPost)}

{activeCategory === "Practical & Forward-Looking" &&
categorizedEnterpriseBlogs.practical.map(renderPost)}



</div>
</div>
</section>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/more-info")}
            className="
      px-10 py-3 rounded-full
      bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600
      text-white font-medium
      shadow-[0_20px_50px_rgba(168,85,247,0.35)]
      hover:shadow-[0_30px_70px_rgba(236,72,153,0.45)]
      transition-all duration-300 hover:-translate-y-1
    "
          >
            More Information
          </button>
        </div>
      </section>
    </div>
  );
}