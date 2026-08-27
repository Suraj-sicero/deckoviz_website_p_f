import type React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Brush,
  Clock,
  Home,
  Image as ImageIcon,
  Library,
  Monitor,
  Palette,
  PenTool,
  Play,
  Settings,
} from "lucide-react"

type NavItem = {
  label: string
  icon: React.ReactNode
  target: string
  canvas?: boolean
}

// Mirrors the primary navigation in DeckovizWebapp. Webapp views use a query
// string so the canvas can link into the exact same destination.
const primaryNavigation: NavItem[] = [
  { label: "Drawing Room", icon: <Home size={19} />, target: "/webapp" },
  { label: "Vizzy Creation Canvas", icon: <Brush size={19} />, target: "/vizzy-canvas", canvas: true },
  { label: "Create Collection", icon: <PenTool size={19} />, target: "/webapp?view=create_collection" },
  { label: "VCC", icon: <Palette size={19} />, target: "/vizzy-canvas", canvas: true },
  { label: "Daily Queue", icon: <Clock size={19} />, target: "/webapp?view=daily_queue" },
  { label: "All Media", icon: <ImageIcon size={19} />, target: "/webapp?view=all_media" },
  { label: "Explore Library", icon: <Library size={19} />, target: "/webapp?view=explore_library" },
  { label: "Device Pairing", icon: <Monitor size={19} />, target: "/pair" },
  { label: "Display", icon: <Play size={19} />, target: "/webapp?view=display" },
]

/** The Deckoviz home-suite rail, tuned to the Canvas colour tokens. */
export function DeckovizSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (item: NavItem) =>
    item.canvas ? location.pathname === "/vizzy-canvas" || location.pathname === "/vizzy-generative-chat" : false

  return (
    <aside className="hidden lg:flex relative z-20 w-[80px] shrink-0 items-center justify-center border-r border-[var(--vc-divider)] bg-[linear-gradient(180deg,rgba(24,42,74,0.36),rgba(11,18,32,0.08))] px-3">
      <nav
        className="flex flex-col items-center gap-2.5 rounded-[28px] border border-[var(--vc-glass-border)] bg-[var(--vc-glass-strong)] p-3 shadow-[0_12px_32px_rgba(5,15,34,0.32),0_0_24px_rgba(34,211,238,0.08)]"
        aria-label="Deckoviz home navigation"
      >
        <div className="h-1" />
        {primaryNavigation.map((item) => {
          const active = isActive(item)
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.target)}
              className={`group relative flex h-11 w-11 items-center justify-center rounded-[18px] transition-colors duration-150 ${
                active
                  ? "bg-gradient-to-br from-[#182A4A] via-[#2563EB] to-[#06B6D4] text-white shadow-[0_6px_18px_rgba(37,99,235,0.38),0_0_14px_rgba(34,211,238,0.2)] ring-1 ring-cyan-300/30"
                  : "text-[var(--vc-text-muted)] hover:bg-cyan-400/10 hover:text-cyan-200"
              }`}
              aria-current={active ? "page" : undefined}
              aria-label={item.label}
            >
              {item.icon}
              <span className="pointer-events-none absolute left-[58px] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-xl border border-cyan-200/15 bg-[#0B1220]/95 px-3 py-2 text-[12px] font-semibold text-slate-100 opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100">
                {item.label}
              </span>
            </button>
          )
        })}
        <div className="my-1 h-px w-5 bg-cyan-200/15" />
        <button
          type="button"
          onClick={() => navigate("/webapp?view=settings")}
          className="group relative flex h-11 w-11 items-center justify-center rounded-[18px] text-[var(--vc-text-muted)] transition-colors duration-150 hover:bg-cyan-400/10 hover:text-cyan-200"
          aria-label="Settings & Preferences"
        >
          <Settings size={19} />
          <span className="pointer-events-none absolute left-[58px] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-xl border border-cyan-200/15 bg-[#0B1220]/95 px-3 py-2 text-[12px] font-semibold text-slate-100 opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100">
            Settings & Preferences
          </span>
        </button>
      </nav>
    </aside>
  )
}
