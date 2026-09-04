import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Building2,
  GraduationCap,
  Sparkles,
  Check,
  Zap,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Star,
  Layers,
  Crown,
  Info,
  CheckCircle2,
  X
} from "lucide-react";

/* ═══════════════ DESIGN SYSTEM & COLOR PALETTE ═══════════════ */
const NavyTheme = {
  navy: "#182a4a",
  navyDark: "#0f1b32",
  blueAccent: "#2563eb",
  blueLight: "#3b82f6",
  bgLight: "#f8fafc",
  bgSubtle: "#f1f5f9",
  cardBg: "#ffffff",
  textDark: "#0f172a",
  textMuted: "#475569",
  borderLight: "#e2e8f0",
};

/* Animation Variants */
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ═══════════════ DATA STRUCTURES ═══════════════ */

type ExperienceType = "home" | "enterprise" | "schools";
type BillingCycle = "monthly" | "sixMonths" | "yearly";

interface PricingTier {
  name: "Silver" | "Gold" | "Diamond";
  badge?: string;
  monthly: string;
  sixMonths: string;
  yearly: string;
  monthlyNum: number;
  sixMonthsNum: number;
  yearlyNum: number;
  highlight?: boolean;
}

const experiences = [
  {
    id: "home" as ExperienceType,
    title: "HOME",
    tagline: "A living canvas for your home",
    description: "Personalised art, memories, moods, stories and experiences that evolve with you.",
    icon: Home,
    badge: "Popular for Families",
  },
  {
    id: "enterprise" as ExperienceType,
    title: "ENTERPRISE",
    tagline: "Intelligent visual experiences for business",
    description: "Transform your spaces with intelligent visual experiences designed for businesses, hospitality, workplaces and public environments.",
    icon: Building2,
    badge: "Built for Business",
  },
  {
    id: "schools" as ExperienceType,
    title: "SCHOOLS & LEARNING",
    tagline: "Generative learning in classrooms",
    description: "Bring generative, personalised and immersive learning experiences into classrooms and educational spaces.",
    icon: GraduationCap,
    badge: "Designed for Education",
  },
];

/* Tier Pricing Data */
const homeTiers: PricingTier[] = [
  {
    name: "Silver",
    monthly: "$8",
    sixMonths: "$45",
    yearly: "$80",
    monthlyNum: 8,
    sixMonthsNum: 45,
    yearlyNum: 80,
  },
  {
    name: "Gold",
    badge: "MOST POPULAR",
    monthly: "$16",
    sixMonths: "$90",
    yearly: "$160",
    monthlyNum: 16,
    sixMonthsNum: 90,
    yearlyNum: 160,
    highlight: true,
  },
  {
    name: "Diamond",
    badge: "ULTIMATE CREATOR",
    monthly: "$40",
    sixMonths: "$135",
    yearly: "$400",
    monthlyNum: 40,
    sixMonthsNum: 135,
    yearlyNum: 400,
  },
];

const enterpriseTiers: PricingTier[] = [
  {
    name: "Silver",
    monthly: "$8",
    sixMonths: "$45",
    yearly: "$80",
    monthlyNum: 8,
    sixMonthsNum: 45,
    yearlyNum: 80,
  },
  {
    name: "Gold",
    badge: "ACTIVE TEAMS",
    monthly: "$16",
    sixMonths: "$90",
    yearly: "$160",
    monthlyNum: 16,
    sixMonthsNum: 90,
    yearlyNum: 160,
    highlight: true,
  },
  {
    name: "Diamond",
    badge: "HIGH VOLUME",
    monthly: "$24",
    sixMonths: "$135",
    yearly: "$240",
    monthlyNum: 24,
    sixMonthsNum: 135,
    yearlyNum: 240,
  },
];

const schoolsTiers: PricingTier[] = [
  {
    name: "Silver",
    monthly: "$8",
    sixMonths: "$45",
    yearly: "$80",
    monthlyNum: 8,
    sixMonthsNum: 45,
    yearlyNum: 80,
  },
  {
    name: "Gold",
    badge: "ACTIVE SCHOOLS",
    monthly: "$16",
    sixMonths: "$90",
    yearly: "$160",
    monthlyNum: 16,
    sixMonthsNum: 90,
    yearlyNum: 160,
    highlight: true,
  },
  {
    name: "Diamond",
    badge: "DISTRICT WIDE",
    monthly: "$24",
    sixMonths: "$135",
    yearly: "$240",
    monthlyNum: 24,
    sixMonthsNum: 135,
    yearlyNum: 240,
  },
];

/* Feature Rows Data */
const homeFeatures = [
  { feature: "Total Monthly Credit Multiplier (Credits*Silver sub)", silver: "–", gold: "3X", diamond: "8X" },
  { feature: "Image Generation", silver: "Everyday allocation", gold: "Expanded allocation", diamond: "Our most generous allocation" },
  { feature: "Video Generation", silver: "–", gold: "Included", diamond: "More included" },
  { feature: "Text & Narration", silver: "Everyday allocation", gold: "Expanded allocation", diamond: "Our most generous allocation" },
  { feature: "Voice Credits", silver: "Included", gold: "More included", diamond: "Highest allocation" },
  { feature: "Real-Time Vizzy Access", silver: "Standard", gold: "Extended", diamond: "Priority, near-unlimited" },
  { feature: "Daily Curations", silver: "Included", gold: "More frequent", diamond: "Unlimited, on demand" },
  { feature: "Total Meta Credits", silver: "Everyday use", gold: "For active households", diamond: "For power users & creators" },
  { feature: "Storage", silver: "100 GB", gold: "200 GB", diamond: "400 GB" },
  { feature: "Personal & Global Library Access", silver: "Full access", gold: "Full access", diamond: "Full access + early releases" },
  { feature: "Rituals & Scheduling", silver: "Basic", gold: "Advanced", diamond: "Advanced, unlimited" },
  { feature: "Household Profiles", silver: "Up to 4", gold: "Up to 8", diamond: "Unlimited" },
  { feature: "Early Access to New Features", silver: "–", gold: "✓", diamond: "✓ Priority" },
  { feature: "Customer Care", silver: "Standard email", gold: "Priority support", diamond: "Instant voice support" },
];

const enterpriseFeatures = [
  { feature: "Image & Content Generation", silver: "Everyday allocation", gold: "Expanded allocation", diamond: "Our most generous allocation" },
  { feature: "Video Generation", silver: "–", gold: "Included", diamond: "More included" },
  { feature: "Text, Copy & Narration", silver: "Everyday allocation", gold: "Expanded allocation", diamond: "Our most generous allocation" },
  { feature: "Voice Credits", silver: "Included", gold: "More included", diamond: "Highest allocation" },
  { feature: "Real-Time Vizzy CMED Access", silver: "Standard", gold: "Extended", diamond: "Priority, near-unlimited" },
  { feature: "On-Demand Curations", silver: "Included", gold: "More frequent", diamond: "Unlimited, on demand" },
  { feature: "Total Meta Credits", silver: "Everyday business use", gold: "For active teams", diamond: "For high-volume operations" },
  { feature: "Storage", silver: "100 GB", gold: "200 GB", diamond: "400 GB" },
  { feature: "Brand & Global Library Access", silver: "Full access", gold: "Full access", diamond: "Full access + early releases" },
  { feature: "Guest Memory & Personalisation", silver: "Basic", gold: "Advanced", diamond: "Advanced, unlimited profiles" },
  { feature: "Rituals & Scheduling", silver: "Basic", gold: "Advanced", diamond: "Advanced, unlimited" },
  { feature: "Team Seats & Access", silver: "Up to 3", gold: "Up to 8", diamond: "Unlimited" },
  { feature: "Multi-Location Support", silver: "–", gold: "Up to 3 locations", diamond: "Unlimited locations" },
  { feature: "Early Access to New Features", silver: "–", gold: "✓", diamond: "✓ Priority" },
  { feature: "Customer Care", silver: "Standard email", gold: "Priority support", diamond: "Instant voice support" },
];

const schoolsFeatures = [
  { feature: "Image & Learning Material Generation", silver: "Everyday allocation", gold: "Expanded allocation", diamond: "Our most generous allocation" },
  { feature: "Video Generation", silver: "–", gold: "Included", diamond: "More included" },
  { feature: "Text, Narration & Assessment Generation", silver: "Everyday allocation", gold: "Expanded allocation", diamond: "Our most generous allocation" },
  { feature: "Voice Credits", silver: "Included", gold: "More included", diamond: "Highest allocation" },
  { feature: "Real-Time Vizzy Access (Teachers & Students)", silver: "Standard", gold: "Extended", diamond: "Priority, near-unlimited" },
  { feature: "On-Demand Curations", silver: "Included", gold: "More frequent", diamond: "Unlimited, on demand" },
  { feature: "Total Meta Credits", silver: "Everyday classroom use", gold: "For active schools", diamond: "For district-wide use" },
  { feature: "Storage", silver: "100 GB", gold: "200 GB", diamond: "400 GB" },
  { feature: "Class & Global Library Access", silver: "Full access", gold: "Full access", diamond: "Full access + early releases" },
  { feature: "Life Skills Curriculum Access", silver: "Core courses", gold: "Extended library", diamond: "Full 51+ course library" },
  { feature: "Student & Teacher Profiles", silver: "Up to 30", gold: "Up to 150", diamond: "Unlimited" },
  { feature: "School-Level Content Controls", silver: "Standard", gold: "Advanced", diamond: "Advanced, fully customisable" },
  { feature: "Rituals & Scheduling", silver: "Basic", gold: "Advanced", diamond: "Advanced, unlimited" },
  { feature: "Early Access to New Features", silver: "–", gold: "✓", diamond: "✓ Priority" },
  { feature: "Customer Care", silver: "Standard email", gold: "Priority support", diamond: "Instant voice support" },
];

export default function DeckovizSubscriptionsPage() {
  const navigate = useNavigate();
  const [activeExp, setActiveExp] = useState<ExperienceType>("home");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [selectedPlanModal, setSelectedPlanModal] = useState<{
    tier: string;
    price: string;
    expTitle: string;
  } | null>(null);

  const getTiersForExp = (): PricingTier[] => {
    switch (activeExp) {
      case "home":
        return homeTiers;
      case "enterprise":
        return enterpriseTiers;
      case "schools":
        return schoolsTiers;
    }
  };

  const getFeaturesForExp = () => {
    switch (activeExp) {
      case "home":
        return homeFeatures;
      case "enterprise":
        return enterpriseFeatures;
      case "schools":
        return schoolsFeatures;
    }
  };

  const currentTiers = getTiersForExp();
  const currentFeatures = getFeaturesForExp();
  const currentExpDetails = experiences.find((e) => e.id === activeExp)!;

  const handlePlanSelect = (tierName: string, priceStr: string) => {
    setSelectedPlanModal({
      tier: tierName,
      price: priceStr,
      expTitle: currentExpDetails.title,
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 overflow-hidden font-sans selection:bg-[#182a4a] selection:text-white">
      {/* Subtle Navy Glow Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-[#182a4a]/10 via-[#2563eb]/5 to-transparent blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-0 w-[600px] h-[600px] bg-[#182a4a]/5 blur-[150px] pointer-events-none z-0" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #182a4a 1px, transparent 1px), linear-gradient(to bottom, #182a4a 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ════════════════════════════════════════════════════════════════
          1. PAGE HERO & TITLE
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-[0.2em] uppercase mb-6 bg-slate-100 border border-[#182a4a]/20 text-[#182a4a] shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#2563eb] animate-pulse" />
            <span>CHOOSE YOUR EXPERIENCE. MAKE IT YOURS.</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6">
            Deckoviz{" "}
            <span className="bg-gradient-to-r from-[#182a4a] via-[#1e3a5f] to-[#2563eb] bg-clip-text text-transparent">
              Subscriptions
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-12">
            Get your Deckoviz subscription right here. Whether you’re bringing a living, evolving canvas into your home, transforming a professional space, or creating richer learning environments, choose the experience that fits you.
          </p>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            2. CHOOSE YOUR EXPERIENCE (CATEGORY SELECTOR TABS)
           ════════════════════════════════════════════════════════════════ */}
        <div className="mb-16">
          <div className="text-xs font-extrabold tracking-widest text-[#182a4a] uppercase mb-6">
            CHOOSE YOUR DECKOVIZ EXPERIENCE
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {experiences.map((exp) => {
              const IconComp = exp.icon;
              const isActive = activeExp === exp.id;

              return (
                <motion.button
                  key={exp.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveExp(exp.id)}
                  className={`relative p-6 rounded-3xl text-left transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "bg-white border-2 border-[#182a4a] shadow-xl shadow-[#182a4a]/10 ring-4 ring-[#182a4a]/5"
                      : "bg-white/80 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeExpPill"
                      className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#182a4a] to-[#2563eb] text-white shadow-md"
                    >
                      SELECTED
                    </motion.div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-gradient-to-br from-[#182a4a] to-[#2563eb] text-white shadow-md"
                            : "bg-slate-100 text-[#182a4a]"
                        }`}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {exp.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#182a4a] mb-2">
                      {exp.tagline}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#182a4a]">
                    <span>View {exp.title} Tiers</span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? "translate-x-1" : ""}`} />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            3. CHOOSE YOUR SUBSCRIPTION (BILLING CYCLE SELECTOR)
           ════════════════════════════════════════════════════════════════ */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-lg max-w-4xl mx-auto mb-20 text-center">
          <div className="text-xs font-extrabold tracking-widest text-[#182a4a] uppercase mb-2">
            CHOOSE YOUR SUBSCRIPTION PERIOD
          </div>
          <p className="text-sm text-slate-600 mb-6">
            Select your experience above, choose your subscription period, and make your space come alive.
          </p>

          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner flex-wrap justify-center gap-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-[#182a4a] to-[#2563eb] text-white shadow-md shadow-[#182a4a]/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              1 MONTH
            </button>

            <button
              onClick={() => setBillingCycle("sixMonths")}
              className={`px-6 py-3 rounded-xl text-xs font-bold transition-all relative ${
                billingCycle === "sixMonths"
                  ? "bg-gradient-to-r from-[#182a4a] to-[#2563eb] text-white shadow-md shadow-[#182a4a]/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              6 MONTHS
              <span className="ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
                SAVE 10%
              </span>
            </button>

            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-3 rounded-xl text-xs font-bold transition-all relative ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-[#182a4a] to-[#2563eb] text-white shadow-md shadow-[#182a4a]/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              12 MONTHS
              <span className="ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold">
                BEST VALUE
              </span>
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            4. SUBSCRIPTION TIER PRICING CARDS
           ════════════════════════════════════════════════════════════════ */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20 items-stretch">
          {currentTiers.map((tier) => {
            const isGold = tier.name === "Gold";
            const isDiamond = tier.name === "Diamond";

            let priceDisplay = tier.monthly;
            let cycleLabel = "/mo";

            if (billingCycle === "sixMonths") {
              priceDisplay = tier.sixMonths;
              cycleLabel = " / 6 mos";
            } else if (billingCycle === "yearly") {
              priceDisplay = tier.yearly;
              cycleLabel = " / year";
            }

            return (
              <motion.div
                key={tier.name}
                whileHover={{ y: -6 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isGold
                    ? "bg-white border-2 border-[#2563eb] shadow-2xl shadow-[#2563eb]/15 ring-4 ring-[#2563eb]/10"
                    : "bg-white border border-slate-200 shadow-lg"
                }`}
              >
                {tier.badge && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-md ${
                      isGold
                        ? "bg-gradient-to-r from-[#182a4a] to-[#2563eb]"
                        : "bg-slate-800"
                    }`}
                  >
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                      {isDiamond && <Crown className="w-5 h-5 text-amber-500" />}
                      {tier.name}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {currentExpDetails.title}
                    </span>
                  </div>

                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-[#182a4a]">
                        {priceDisplay}
                      </span>
                      <span className="text-sm font-bold text-slate-500">
                        {cycleLabel}
                      </span>
                    </div>

                    {billingCycle === "yearly" && (
                      <div className="text-xs text-emerald-600 font-semibold mt-1">
                        Effective ${(tier.yearlyNum / 12).toFixed(2)}/mo billed annually
                      </div>
                    )}
                  </div>

                  {/* Highlights list */}
                  <ul className="space-y-3 mb-8 text-xs font-medium text-slate-700 text-left">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>
                        {tier.name === "Silver"
                          ? "Everyday content & image generation"
                          : tier.name === "Gold"
                          ? "Expanded allocation & video generation"
                          : "Generous allocation & priority access"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>
                        Storage: {tier.name === "Silver" ? "100 GB" : tier.name === "Gold" ? "200 GB" : "400 GB"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>
                        Vizzy Access: {tier.name === "Silver" ? "Standard" : tier.name === "Gold" ? "Extended" : "Priority Near-Unlimited"}
                      </span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handlePlanSelect(tier.name, priceDisplay)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                    isGold
                      ? "bg-gradient-to-r from-[#182a4a] via-[#1e3a5f] to-[#2563eb] text-white shadow-[#182a4a]/25 hover:scale-[1.02]"
                      : "bg-slate-900 text-white hover:bg-[#182a4a]"
                  }`}
                >
                  <span>CHOOSE {tier.name.toUpperCase()} PLAN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            5. DETAILED TIER FEATURE COMPARISON TABLE
           ════════════════════════════════════════════════════════════════ */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl max-w-5xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="text-xs font-extrabold tracking-widest text-[#182a4a] uppercase mb-1">
                FEATURE BREAKDOWN
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {currentExpDetails.title} Subscription Comparison
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
              {experiences.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveExp(exp.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeExp === exp.id
                      ? "bg-[#182a4a] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {exp.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-4 px-4 font-extrabold text-slate-900 text-sm w-1/3">
                    Feature
                  </th>
                  <th className="py-4 px-4 font-black text-[#182a4a] text-sm text-center">
                    Silver
                  </th>
                  <th className="py-4 px-4 font-black text-[#2563eb] text-sm text-center bg-blue-50/50 rounded-t-xl">
                    Gold ⭐
                  </th>
                  <th className="py-4 px-4 font-black text-slate-900 text-sm text-center">
                    Diamond 💎
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentFeatures.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      idx % 2 === 0 ? "bg-slate-50/30" : "bg-white"
                    }`}
                  >
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-center font-medium">
                      {row.silver === "✓" ? (
                        <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : row.silver === "–" ? (
                        <span className="text-slate-400">–</span>
                      ) : (
                        row.silver
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-900 text-center font-bold bg-blue-50/30">
                      {row.gold === "✓" ? (
                        <Check className="w-4 h-4 text-emerald-600 mx-auto font-black" />
                      ) : row.gold === "–" ? (
                        <span className="text-slate-400">–</span>
                      ) : (
                        row.gold
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-900 text-center font-bold">
                      {row.diamond === "✓" || row.diamond === "✓ Priority" ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-extrabold">
                          <Check className="w-4 h-4 text-emerald-600" />
                          {row.diamond !== "✓" && row.diamond.replace("✓ ", "")}
                        </span>
                      ) : row.diamond === "–" ? (
                        <span className="text-slate-400">–</span>
                      ) : (
                        row.diamond
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            6. PRICING FOOTER NOTE
           ════════════════════════════════════════════════════════════════ */}
        <div className="max-w-4xl mx-auto mb-16 p-6 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs leading-relaxed flex items-start gap-4">
          <Info className="w-5 h-5 text-[#182a4a] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block mb-1">
              A note on pricing:
            </span>
            I've kept the dollar figures identical across all three tables per your instruction, worth flagging that enterprise and school pricing at consumer-tier rates ($8–$24/mo) will likely feel low once you're selling to a business or a school with dozens of profiles, teams, or classrooms, you may want to revisit this once those tiers are priced independently, especially given the added rows (team seats, multi-location, student/teacher profile counts) that don't really apply at a single-household scale.
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          7. ORDER / PLAN CONFIRMATION MODAL
         ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedPlanModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlanModal(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl z-10 overflow-hidden text-slate-900"
            >
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-2 rounded-full bg-slate-100 border border-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#182a4a] mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>DECKOVIZ SUBSCRIPTIONS</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {selectedPlanModal.tier} Plan – {selectedPlanModal.expTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Selected Billing Cycle: {billingCycle.toUpperCase()} ({selectedPlanModal.price})
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Selected Experience:</span>
                  <span className="font-bold text-slate-900">{selectedPlanModal.expTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Selected Plan:</span>
                  <span className="font-bold text-[#182a4a]">{selectedPlanModal.tier} Tier</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="font-bold text-slate-900">Total Due:</span>
                  <span className="font-black text-[#182a4a] text-sm">{selectedPlanModal.price}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    alert(`Proceeding to checkout for ${selectedPlanModal.tier} Plan (${selectedPlanModal.price})!`);
                    setSelectedPlanModal(null);
                    navigate("/place-order");
                  }}
                  className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#182a4a] via-[#1e3a5f] to-[#2563eb] text-white shadow-lg shadow-[#182a4a]/25 hover:scale-[1.01] transition-all"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => setSelectedPlanModal(null)}
                  className="w-full py-3 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
