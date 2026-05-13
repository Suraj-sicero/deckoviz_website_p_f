import { useState } from "react"
import { cn } from "./lib/utils"
import { getAllSuggestions } from "./lib/suggestions"
import type { CreativeMode, SuggestionCategory } from "./lib/types"
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
    <div className="relative flex flex-col items-center h-full px-4 py-8 md:py-12 overflow-y-auto bg-[#fdf4f6]">
      {/* Violet to pink spiral gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 60%, 
        rgba(168, 85, 247, 0.4) 0%, /* violet-500 */
        rgba(180, 83, 220, 0.3) 10%, /* violet-pink blend */
        rgba(195, 80, 190, 0.2) 18%, /* violet-pink blend */
        rgba(215, 75, 165, 0.15) 27%, /* violet-pink blend */
        rgba(226, 73, 155, 0.08) 39%, /* violet-pink blend */
        rgba(236, 72, 153, 0.03) 45%, /* pink-500 */
        transparent 50%)`,
        }}
      ></div>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center gap-4 mb-8 md:mb-10 max-w-2xl">
        <div className="relative">
          <div className="size-20 md:size-24 rounded-3xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center glow-accent float">
            <Sparkles className="size-9 md:size-11 text-violet-600" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] tracking-tight text-balance">
            <span className="bg-gradient-to-r from-violet-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">What will you create?</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-lg leading-relaxed text-pretty">
            Describe any visual you can imagine. Generate artwork, product shots, 
            posters, brand visuals, and more. Iterate until it is perfect.
          </p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="relative z-10 flex items-center gap-1 p-1 rounded-2xl bg-secondary/80 border border-border/60 mb-8 backdrop-blur-sm">
        <button
          onClick={() => { setMode("home"); setExpandedCategory(null) }}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
            mode === "home"
              ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md"
              : "text-gray-400 hover:text-white"
          )}
        >
          <Home className="size-4" />
          Personal
        </button>
        <button
          onClick={() => { setMode("business"); setExpandedCategory(null) }}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
            mode === "business"
              ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md"
              : "text-gray-400 hover:text-white"
          )}
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

      {/* Bottom hint */}
      <p className="mt-8 text-xs text-muted-foreground/60 text-center">
        Or just type anything below to get started
      </p>
    </div>
  )
}

const COLOR_PALETTE = [
  { bg: "from-violet-600 to-purple-600", border: "border-violet-500/30", text: "text-violet-400", glow: "shadow-[0_0_15px_rgba(125,57,236,0.15)]", hoverBorder: "hover:border-violet-500/50" },
  { bg: "from-pink-600 to-rose-600", border: "border-pink-500/30", text: "text-pink-400", glow: "shadow-[0_0_15px_rgba(236,72,153,0.15)]", hoverBorder: "hover:border-pink-500/50" },
  { bg: "from-orange-600 to-amber-600", border: "border-orange-500/30", text: "text-orange-400", glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]", hoverBorder: "hover:border-orange-500/50" },
  { bg: "from-blue-600 to-indigo-600", border: "border-blue-500/30", text: "text-blue-400", glow: "shadow-[0_0_15px_rgba(59,130,246,0.15)]", hoverBorder: "hover:border-blue-500/50" },
  { bg: "from-green-600 to-emerald-600", border: "border-green-500/30", text: "text-green-400", glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]", hoverBorder: "hover:border-green-500/50" },
  { bg: "from-cyan-600 to-teal-600", border: "border-cyan-500/30", text: "text-cyan-400", glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)]", hoverBorder: "hover:border-cyan-500/50" },
];

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
  const color = COLOR_PALETTE[colorIndex % COLOR_PALETTE.length];
  const IconComponent = ICON_MAP[category.icon] || Sparkles

  return (
    <div
      className={cn(
        "group rounded-2xl border transition-all duration-300",
        isExpanded
          ? `bg-white ${color.border} ${color.glow} col-span-1 sm:col-span-2`
          : `bg-white/60 border-gray-100/50 hover:bg-white ${color.hoverBorder} hover:shadow-sm`
      )}
    >
      <button
        onClick={onToggle}
        className="flex items-center gap-3 w-full px-4 py-3.5 text-left"
      >
        <div
          className={cn(
            "size-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300",
            isExpanded
              ? `bg-gradient-to-br ${color.bg} text-white`
              : `bg-gray-100 text-gray-400 group-hover:${color.text}`
          )}
        >
          <IconComponent className="size-4.5" />
        </div>
        <span className={`flex-1 text-sm font-medium text-gray-900 group-hover:${color.text} transition-colors`}>
          {category.label}
        </span>
        <ChevronRight
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-300",
            isExpanded && "rotate-90"
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in-0 slide-in-from-top-2 duration-300">
          {category.suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => onSuggestionClick(suggestion)}
              className="flex items-center gap-2 text-left px-3.5 py-3 rounded-xl bg-white/80 border border-violet-100 text-sm text-gray-800 hover:bg-gradient-to-r hover:from-violet-50 hover:to-pink-50 hover:border-violet-200 transition-all duration-200 group/item leading-relaxed"
            >
              <span className="flex-1">{suggestion}</span>
              <ArrowRight className="size-3.5 text-violet-500 opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
