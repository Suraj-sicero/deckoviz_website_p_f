import { useState } from "react"
import { cn } from "./lib/utils"
import { getAllSuggestions } from "./lib/suggestions"
import type { CreativeMode, SuggestionCategory } from "./lib/types"
import { QuickTemplates } from "./quick-templates"
import {
  Palette,
  Camera,
  LayoutGrid,
  BookOpen,
  Type,
  Wand2,
  Pencil,
  Sparkles,
  BadgeCheck,
  Megaphone,
  Monitor,
  CalendarDays,
  Gift,
  Lightbulb,
  Play,
  Home,
  Briefcase,
  ChevronRight,
  ArrowRight,
} from "lucide-react"

const ICON_MAP: Record<string, React.ElementType> = {
  palette: Palette,
  camera: Camera,
  layout: LayoutGrid,
  book: BookOpen,
  type: Type,
  wand: Wand2,
  pencil: Pencil,
  sparkles: Sparkles,
  badge: BadgeCheck,
  megaphone: Megaphone,
  monitor: Monitor,
  calendar: CalendarDays,
  gift: Gift,
  lightbulb: Lightbulb,
  play: Play,
}

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void
}

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  const [mode, setMode] = useState<CreativeMode>("home")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const categories = getAllSuggestions(mode)

  return (
    <div className="relative flex flex-col items-center h-full px-4 py-8 md:py-12 overflow-y-auto">
      {/* Subtle star/noise overlay (looks lovely in both themes) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.30]"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 12% 18%, var(--vc-accent-text), transparent 60%), radial-gradient(1px 1px at 78% 28%, var(--vc-accent-text), transparent 60%), radial-gradient(1px 1px at 30% 72%, var(--vc-accent-text), transparent 60%), radial-gradient(1px 1px at 88% 80%, var(--vc-accent-text), transparent 60%), radial-gradient(1px 1px at 55% 12%, var(--vc-accent-text), transparent 60%)",
        }}
      />

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center gap-5 mb-8 md:mb-10 max-w-2xl">
        <div className="relative">
          <div
            className="size-20 md:size-24 rounded-3xl flex items-center justify-center backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(135deg, var(--vc-glow-1) 0%, var(--vc-glow-3) 100%)",
              border: "1px solid var(--vc-glass-border)",
              boxShadow:
                "var(--vc-glass-inset), 0 8px 40px var(--vc-glow-1)",
            }}
          >
            <Sparkles
              className="size-9 md:size-11"
              style={{ color: "var(--vc-accent-text)" }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-serif font-semibold tracking-tight text-balance text-4xl md:text-5xl leading-[1.1]">
            <span
              className="bg-clip-text text-transparent italic"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #2563EB 0%, #22D3EE 55%, #14B8A6 100%)",
              }}
            >
              What will you create?
            </span>
          </h2>
          <p
            className="text-sm md:text-base max-w-lg leading-relaxed text-pretty"
            style={{ color: "var(--vc-text-muted)" }}
          >
            Describe any visual you can imagine. Generate artwork, product shots,
            posters, brand visuals, and more. Iterate until it is perfect.
          </p>
        </div>
      </div>

      {/* Mode Toggle - glass pill */}
      <div
        className="relative z-10 flex items-center gap-1 p-1 rounded-2xl mb-8 backdrop-blur-xl"
        style={{
          background: "var(--vc-glass-bg)",
          border: "1px solid var(--vc-glass-border)",
        }}
      >
        <button
          onClick={() => { setMode("home"); setExpandedCategory(null) }}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
            mode === "home" ? "text-white shadow-[0_4px_24px_rgba(37,99,235,0.35)]" : ""
          )}
          style={
            mode === "home"
              ? { background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)" }
              : { color: "var(--vc-text-muted)" }
          }
        >
          <Home className="size-4" />
          Personal
        </button>
        <button
          onClick={() => { setMode("business"); setExpandedCategory(null) }}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
            mode === "business" ? "text-white shadow-[0_4px_24px_rgba(37,99,235,0.35)]" : ""
          )}
          style={
            mode === "business"
              ? { background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)" }
              : { color: "var(--vc-text-muted)" }
          }
        >
          <Briefcase className="size-4" />
          Business
        </button>
      </div>

      {/* Category Grid */}
      <div className="relative z-10 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((cat, index) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            isExpanded={expandedCategory === cat.id}
            onToggle={() =>
              setExpandedCategory(expandedCategory === cat.id ? null : cat.id)
            }
            onSuggestionClick={onSuggestionClick}
            colorIndex={index}
          />
        ))}
      </div>

      {/* Quick Templates — 12 visible by default, click + to expand all 120 */}
      <QuickTemplates onSelect={onSuggestionClick} />

      {/* Bottom hint */}
      <p
        className="mt-8 text-xs text-center"
        style={{ color: "var(--vc-text-faint)" }}
      >
        Or just type anything below to get started
      </p>
    </div>
  )
}

// Brand-aligned accent palette: cosmic blue, icy teal, aurora, violet, lavender, indigo
const COLOR_PALETTE = [
  {
    gradient: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
    iconTint: "text-cyan-300",
    glow: "shadow-[0_0_30px_rgba(37,99,235,0.18)]",
    borderHover: "hover:border-cyan-400/40",
  },
  {
    gradient: "linear-gradient(135deg, #22D3EE 0%, #14B8A6 100%)",
    iconTint: "text-teal-300",
    glow: "shadow-[0_0_30px_rgba(34,211,238,0.18)]",
    borderHover: "hover:border-teal-400/40",
  },
  {
    gradient: "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
    iconTint: "text-sky-300",
    glow: "shadow-[0_0_30px_rgba(34,211,238,0.18)]",
    borderHover: "hover:border-sky-400/40",
  },
  {
    gradient: "linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)",
    iconTint: "text-violet-300",
    glow: "shadow-[0_0_30px_rgba(124,58,237,0.18)]",
    borderHover: "hover:border-violet-400/40",
  },
  {
    gradient: "linear-gradient(135deg, #14B8A6 0%, #2563EB 100%)",
    iconTint: "text-emerald-300",
    glow: "shadow-[0_0_30px_rgba(20,184,166,0.18)]",
    borderHover: "hover:border-emerald-400/40",
  },
  {
    gradient: "linear-gradient(135deg, #22D3EE 0%, #7C3AED 100%)",
    iconTint: "text-cyan-300",
    glow: "shadow-[0_0_30px_rgba(124,58,237,0.18)]",
    borderHover: "hover:border-cyan-400/40",
  },
]

function CategoryCard({
  category,
  isExpanded,
  onToggle,
  onSuggestionClick,
  colorIndex,
}: {
  category: SuggestionCategory
  isExpanded: boolean
  onToggle: () => void
  onSuggestionClick: (s: string) => void
  colorIndex: number
}) {
  const color = COLOR_PALETTE[colorIndex % COLOR_PALETTE.length]
  const IconComponent = ICON_MAP[category.icon] || Sparkles

  return (
    <div
      className={cn(
        "group relative rounded-2xl backdrop-blur-xl transition-all duration-300 overflow-hidden",
        isExpanded ? `${color.glow} col-span-1 sm:col-span-2` : "",
        !isExpanded && color.borderHover
      )}
      style={{
        background: isExpanded ? "var(--vc-glass-strong)" : "var(--vc-glass-bg)",
        border: `1px solid ${isExpanded ? "var(--vc-glass-border-strong)" : "var(--vc-glass-border)"}`,
      }}
    >
      <button
        onClick={onToggle}
        className="flex items-center gap-3 w-full px-4 py-3.5 text-left"
      >
        <div
          className={cn(
            "size-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
          )}
          style={
            isExpanded
              ? {
                  background: color.gradient,
                  border: "1px solid var(--vc-glass-border)",
                }
              : {
                  background: "var(--vc-glass-bg)",
                  border: "1px solid var(--vc-glass-border)",
                }
          }
        >
          <IconComponent
            className={cn("size-4.5 transition-colors")}
            style={{
              color: isExpanded ? "#fff" : "var(--vc-accent-text)",
            }}
          />
        </div>
        <span
          className="flex-1 text-sm font-medium transition-colors"
          style={{ color: "var(--vc-text)" }}
        >
          {category.label}
        </span>
        <ChevronRight
          className={cn(
            "size-4 transition-transform duration-300",
            isExpanded && "rotate-90"
          )}
          style={{
            color: isExpanded ? "var(--vc-accent-text)" : "var(--vc-text-muted)",
          }}
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in-0 slide-in-from-top-2 duration-300">
          {category.suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onSuggestionClick(suggestion)}
              className="group/item flex items-center gap-2 text-left px-3.5 py-3 rounded-xl text-sm transition-all duration-200 leading-relaxed backdrop-blur-sm"
              style={{
                background: "var(--vc-glass-bg)",
                border: "1px solid var(--vc-glass-border)",
                color: "var(--vc-text)",
              }}
            >
              <span className="flex-1">{suggestion}</span>
              <ArrowRight
                className="size-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0"
                style={{ color: "var(--vc-accent-text)" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
