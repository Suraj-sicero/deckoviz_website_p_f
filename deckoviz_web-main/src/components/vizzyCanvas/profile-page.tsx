import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { ArrowLeft, User, Mail, LogOut, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import { CanvasThemeProvider, useCanvasTheme } from "./lib/canvas-theme"

export default function ProfilePage() {
  return (
    <CanvasThemeProvider>
      <ProfilePageInner />
    </CanvasThemeProvider>
  )
}

function ProfilePageInner() {
  const { user, logout } = useAuth()
  const { theme } = useCanvasTheme()

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
            Profile
          </span>
        </h1>
        <div className="w-24" />
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 shadow-[0_8px_32px_rgba(11,18,32,0.45)]">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="size-16 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,211,238,0.18) 0%, rgba(37,99,235,0.18) 100%)",
                boxShadow: "0 0 24px rgba(34,211,238,0.18)",
              }}
            >
              <User className="size-7 text-cyan-300" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-semibold">
                {user?.email?.split("@")[0] || "Creator"}
              </h2>
              <p className="text-sm text-slate-400">Vizzy Member</p>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <Field icon={<Mail className="size-4" />} label="Email" value={user?.email || "—"} />
            <Field icon={<Sparkles className="size-4" />} label="Credits" value={String(user?.credits ?? 0)} />
            <Field icon={<User className="size-4" />} label="Plan" value={(user?.tier || "starter").replace(/^./, (c) => c.toUpperCase())} />
          </div>

          <Button
            onClick={logout}
            variant="outline"
            className="w-full bg-white/[0.04] border-white/10 text-rose-300 hover:bg-rose-500/10 hover:border-rose-400/30"
          >
            <LogOut className="size-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </main>
    </div>
  )
}

function Field({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <span className="text-cyan-300/70">{icon}</span>
      <span className="text-xs text-slate-400 uppercase tracking-wide w-20">
        {label}
      </span>
      <span className="text-sm text-slate-100 flex-1 truncate">{value}</span>
    </div>
  )
}
