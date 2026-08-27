import { useState } from "react";
import { ChevronLeft, CheckSquare } from "lucide-react";

type ViewType =
  | "marketplace"
  | "artists"
  | "ai_manager"
  | "collections"
  | "create_collection"
  | "add"
  | "social"
  | "profile"
  | "followers"
  | "following"
  | "cart"
  | "pricing"
  | "payment"
  | "product_info"
  | "art_drawer"
  | "comments"
  | "subscription";

const plans = [
  {
    tier: "BASIC",
    price: "$19",
    period: "/Month",
    subtitle: "For Basic Art Lover",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
    buttonStyle: "outlined" as const,
    features: [
      "Browse public galleries",
      "Follow Artist",
      "Limited uploads  E.g. 10 Artworks",
    ],
    featuresLabel: "Includes:",
    highlighted: false,
  },
  {
    tier: "ADVANCED",
    price: "$99",
    period: "/month",
    subtitle: "For Pro Art Lover",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
    buttonStyle: "filled" as const,
    features: [
      "Create and share Private Collection",
      "Priority listing search",
      "Advanced profile & gallery customization",
    ],
    featuresLabel: "Everything in Advanced Plan Includes:",
    highlighted: true,
  },
  {
    tier: "PREMIUM",
    price: "$299",
    period: "/month",
    subtitle: "For Professional Artist",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
    buttonStyle: "outlined" as const,
    features: [
      "Unlimited uploads",
      "Access to marketplace / sell art",
      "Direct messaging with collectors",
    ],
    featuresLabel: "Everything in Premium Plan Includes:",
    highlighted: false,
  },
];

export default function PricingPlanView({
  onNavigate,
}: {
  onNavigate?: (view: ViewType) => void;
}) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="flex w-full justify-center pb-20 pt-6 font-sans">
      <div className="w-full max-w-[1094px] px-4">
        {/* Back button */}
        <button
          onClick={() => onNavigate?.("marketplace")}
          className="mb-6 flex items-center gap-1 text-[15px] font-medium text-[#374151] transition hover:text-[#111827]"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#6366f1]">
            PRICING PLAN
          </p>
          <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-6 text-[36px] font-bold leading-tight ">
            Plans for Everyone
          </h1>

          {/* Billing toggle */}
          <div className="inline-flex items-center overflow-hidden rounded-full border border-[#e5e7eb]">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-7 py-2.5 text-[14px] font-semibold transition ${
                billing === "monthly"
                  ? "bg-[#4657bd] text-white shadow-md"
                  : "text-[#6b7280] hover:text-[#374151]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-7 py-2.5 text-[14px] font-semibold transition ${
                billing === "yearly"
                  ? "bg-[#4657bd] text-white shadow-md"
                  : "text-[#6b7280] hover:text-[#374151]"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.tier}
              className={`relative flex flex-col overflow-hidden rounded-[18px] border bg-white transition ${
                plan.highlighted
                  ? "border-[#6366f1]/30 shadow-[0_12px_40px_rgba(99,102,241,0.18)] scale-[1.02]"
                  : "border-[#e5e7eb] shadow-[0_4px_16px_rgba(15,23,42,0.08)]"
              }`}
            >
              {/* Decorative header image */}
              <div className="relative h-[90px] overflow-hidden">
                <div className="absolute inset-0 flex items-start justify-between px-5 pt-5">
                  <span
                    className={`rounded-[4px] border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                      plan.highlighted
                        ? "border-[#6366f1]/30 bg-white/90 text-[#4657bd]"
                        : "border-[#e5e7eb] bg-white/90 text-[#374151]"
                    }`}
                  >
                    {plan.tier}
                  </span>
                </div>
                {/* Gradient blob decoration */}
                <div
                  className={`absolute right-0 top-0 h-[90px] w-[180px] rounded-bl-[40px] ${
                    plan.highlighted
                      ? "bg-gradient-to-br from-[#818cf8] via-[#6366f1] to-[#4f46e5]"
                      : "bg-gradient-to-br from-[#c7d2fe] via-[#e0e7ff] to-[#bfdbfe]"
                  }`}
                  style={{ opacity: 0.7 }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col px-6 pb-7">
                {/* Price */}
                <div className="mb-3 flex items-baseline gap-1">
                  <span className="text-[48px] font-bold leading-none text-[#111827]">
                    {plan.price}
                  </span>
                  <span className="text-[15px] font-medium text-[#9ca3af]">
                    {plan.period}
                  </span>
                </div>

                {/* Subtitle */}
                <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-2 text-[16px] font-bold ">
                  {plan.subtitle}
                </h3>
                <p className="mb-6 text-[13px] leading-relaxed text-[#6b7280]">
                  {plan.description}
                </p>

                {/* CTA Button */}
                <button
                  className={`mb-8 h-[48px] w-full rounded-[10px] text-[15px] font-semibold transition ${
                    plan.highlighted
                      ? "bg-[#4657bd] text-white shadow-[0_6px_16px_rgba(70,87,189,0.3)] hover:bg-[#3a4ba6]"
                      : "border-2 border-[#6366f1] bg-transparent text-[#6366f1] hover:bg-[#f5f3ff]"
                  }`}
                >
                  Get Started
                </button>

                {/* Features */}
                <p className="mb-4 text-[13px] font-semibold text-[#374151]">
                  {plan.featuresLabel}
                </p>
                <div className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckSquare
                        size={18}
                        className="mt-0.5 shrink-0 text-[#6366f1]"
                      />
                      <span className="text-[13px] leading-snug text-[#374151]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
