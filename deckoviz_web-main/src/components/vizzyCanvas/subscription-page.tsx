import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { ArrowLeft, Zap, Check, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { API_BASE_URL } from "../../lib/constants"
import { CanvasThemeProvider, useCanvasTheme } from "./lib/canvas-theme"

type Tier = {
  id: "starter" | "creator" | "studio"
  name: string
  price: string
  priceUsd: number
  credits: number
  features: string[]
  cta: string
  highlight: boolean
}

const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "Free",
    priceUsd: 0,
    credits: 50,
    features: [
      "50 image credits",
      "Standard generation speed",
      "Personal use only",
    ],
    cta: "Current Plan",
    highlight: false,
  },
  {
    id: "creator",
    name: "Creator",
    price: "$12 / mo",
    priceUsd: 12,
    credits: 500,
    features: [
      "500 image credits / month",
      "Priority generation queue",
      "Music + video generation",
      "Commercial use license",
    ],
    cta: "Upgrade",
    highlight: true,
  },
  {
    id: "studio",
    name: "Studio",
    price: "$39 / mo",
    priceUsd: 39,
    credits: 2500,
    features: [
      "2,500 credits / month",
      "Highest priority queue",
      "Full music + video access",
      "Bulk export tools",
      "Team seats (3)",
    ],
    cta: "Upgrade",
    highlight: false,
  },
]

export default function SubscriptionPage() {
  return (
    <CanvasThemeProvider>
      <SubscriptionPageInner />
    </CanvasThemeProvider>
  )
}

function SubscriptionPageInner() {
  const { user } = useAuth()
  const { theme } = useCanvasTheme()
  const [loadingTier, setLoadingTier] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUpgrade = async (tier: Tier) => {
    if (tier.id === "starter" || !user?.email) return
    setLoadingTier(tier.id)
    setError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          productName: `Vizzy ${tier.name} Plan`,
          amount: tier.priceUsd,
          userId: user.id,
          metadata: {
            tier: tier.id,
            credits: String(tier.credits),
          },
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Checkout session failed")
      }
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
      setLoadingTier(null)
    }
  }

  return (
    <div
      data-vc-theme={theme}
      className="relative min-h-dvh"
      style={{ background: "var(--vc-bg-base)", color: "var(--vc-text)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(34,211,238,0.10) 0%, transparent 45%), radial-gradient(ellipse at bottom, rgba(37,99,235,0.10) 0%, transparent 50%)",
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl">
        <Link
          to="/vizzy-canvas"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Canvas
        </Link>
        <h1 className="text-base font-serif italic font-semibold">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(110deg, #2563EB 0%, #22D3EE 100%)",
            }}
          >
            Credits & Plans
          </span>
        </h1>
        <div className="w-24" />
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Current credits */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 mb-10 flex items-center gap-4">
          <div
            className="size-12 rounded-xl border border-white/10 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.18) 0%, rgba(37,99,235,0.18) 100%)",
            }}
          >
            <Zap className="size-6 text-cyan-300" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Current Balance
            </p>
            <p className="text-2xl font-serif font-semibold text-slate-100">
              {user?.credits ?? 0} credits
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-serif italic font-semibold mb-6 text-slate-100">
          Choose your plan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border backdrop-blur-2xl p-6 transition-all duration-300 ${
                tier.highlight
                  ? "border-cyan-400/40 bg-white/[0.06] shadow-[0_0_40px_rgba(34,211,238,0.18)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              {tier.highlight && (
                <div
                  className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
                  }}
                >
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-serif font-semibold mb-1">
                {tier.name}
              </h3>
              <p className="text-2xl font-semibold mb-4">{tier.price}</p>
              <ul className="space-y-2 mb-6 min-h-[140px]">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-slate-300"
                  >
                    <Check className="size-4 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                disabled={tier.id === "starter" || loadingTier !== null}
                onClick={() => handleUpgrade(tier)}
                className={`w-full text-white border border-white/10 ${
                  tier.highlight
                    ? "shadow-[0_4px_20px_rgba(37,99,235,0.4)]"
                    : "bg-white/[0.05]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                style={
                  tier.highlight
                    ? {
                        background:
                          "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
                      }
                    : undefined
                }
              >
                {loadingTier === tier.id ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  tier.cta
                )}
              </Button>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-xs text-rose-300 text-center mt-6 bg-rose-500/10 border border-rose-400/20 rounded-lg py-2 px-3 backdrop-blur-md max-w-md mx-auto">
            {error}
          </p>
        )}
        <p className="text-xs text-slate-500 text-center mt-8">
          Secure checkout via Stripe. Credits are added to your account after payment.
        </p>
      </main>
    </div>
  )
}
