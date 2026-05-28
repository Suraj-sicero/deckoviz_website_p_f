import { useMemo, useState, useEffect } from "react"
import { 
  Plus, 
  Minus, 
  Sparkles, 
  Video, 
  Palette, 
  Layout, 
  BookOpen, 
  Heart, 
  CalendarDays, 
  ArrowRight,
  Star
} from "lucide-react"
import { cn } from "./lib/utils"
import {
  PROMPT_TEMPLATES,
  TEMPLATE_CATEGORIES,
  type TemplateCategory,
} from "./lib/prompt-templates"
import { useAuth } from "../../context/AuthContext"
import { API_BASE_URL } from "../../lib/constants"

const DEFAULT_VISIBLE = 12

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Video,
  Palette,
  Layout,
  BookOpen,
  Sparkles,
  Heart,
  CalendarDays
}

interface HomeCategoryStyle {
  icon: string
  si: string // Light mode container background / Dark mode opacity
  tag: string // Badge background/text color
  themeGlow: string // Custom glow shadow
}

const HOME_CAT_STYLES: Record<string, HomeCategoryStyle> = {
  "Video art": {
    icon: "Video",
    si: "bg-[#FBEAF0]/80 dark:bg-[#FBEAF0]/10",
    tag: "text-[#993556] bg-[#FBEAF0] dark:text-[#FBEAF0] dark:bg-[#993556]/30",
    themeGlow: "shadow-[0_0_20px_rgba(236,72,153,0.12)]"
  },
  "Artwork": {
    icon: "Palette",
    si: "bg-[#E1F5EE]/80 dark:bg-[#E1F5EE]/10",
    tag: "text-[#0F6E56] bg-[#E1F5EE] dark:text-[#E1F5EE] dark:bg-[#0F6E56]/30",
    themeGlow: "shadow-[0_0_20px_rgba(16,185,129,0.12)]"
  },
  "Posters": {
    icon: "Layout",
    si: "bg-[#E6F1FB]/80 dark:bg-[#E6F1FB]/10",
    tag: "text-[#185FA5] bg-[#E6F1FB] dark:text-[#E6F1FB] dark:bg-[#185FA5]/30",
    themeGlow: "shadow-[0_0_20px_rgba(59,130,246,0.12)]"
  },
  "Stories": {
    icon: "BookOpen",
    si: "bg-[#FAEEDA]/80 dark:bg-[#FAEEDA]/10",
    tag: "text-[#854F0B] bg-[#FAEEDA] dark:text-[#FAEEDA] dark:bg-[#854F0B]/30",
    themeGlow: "shadow-[0_0_20px_rgba(234,179,8,0.12)]"
  },
  "Narrative experiences": {
    icon: "Sparkles",
    si: "bg-[#EEEDFE]/80 dark:bg-[#EEEDFE]/10",
    tag: "text-[#3C3489] bg-[#EEEDFE] dark:text-[#EEEDFE] dark:bg-[#3C3489]/30",
    themeGlow: "shadow-[0_0_20px_rgba(124,58,237,0.12)]"
  },
  "Personal & memory": {
    icon: "Heart",
    si: "bg-[#FAECE7]/80 dark:bg-[#FAECE7]/10",
    tag: "text-[#993C1D] bg-[#FAECE7] dark:text-[#FAECE7] dark:bg-[#993C1D]/30",
    themeGlow: "shadow-[0_0_20px_rgba(249,115,22,0.12)]"
  },
  "Social & seasonal": {
    icon: "CalendarDays",
    si: "bg-[#EAF3DE]/80 dark:bg-[#EAF3DE]/10",
    tag: "text-[#3B6D11] bg-[#EAF3DE] dark:text-[#EAF3DE] dark:bg-[#3B6D11]/30",
    themeGlow: "shadow-[0_0_20px_rgba(132,204,22,0.12)]"
  }
}

interface QuickTemplatesProps {
  onSelect: (text: string) => void
}

export function QuickTemplates({ onSelect }: QuickTemplatesProps) {
  const { token } = useAuth()
  const [expanded, setExpanded] = useState(false)
  const [activeCategory, setActiveCategory] =
    useState<TemplateCategory | "All" | "Starred">("All")
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return
      try {
        const res = await fetch(`${API_BASE_URL}/api/vizzy-canvas/prompts/favorite`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setFavoriteIds(data.favoritePromptIds || [])
      } catch (err) {
        console.error("Failed to fetch favorite prompts:", err)
      }
    }
    fetchFavorites()
  }, [token])

  const handleToggleFavorite = async (e: React.MouseEvent, templateId: string) => {
    e.stopPropagation() // Prevent selecting the prompt template
    if (!token) return

    // Optimistic UI update
    setFavoriteIds((prev) =>
      prev.includes(templateId)
        ? prev.filter((id) => id !== templateId)
        : [...prev, templateId]
    )

    try {
      const res = await fetch(`${API_BASE_URL}/api/vizzy-canvas/prompts/favorite`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ templateId }),
      })
      const data = await res.json()
      if (data.success) {
        // Sync with actual server state
        if (data.isFavorited) {
          setFavoriteIds((prev) => Array.from(new Set([...prev, templateId])))
        } else {
          setFavoriteIds((prev) => prev.filter((id) => id !== templateId))
        }
      }
    } catch (err) {
      // Revert on error
      setFavoriteIds((prev) =>
        prev.includes(templateId)
          ? prev.filter((id) => id !== templateId)
          : [...prev, templateId]
      )
      console.error("Failed to toggle favorite prompt:", err)
    }
  }

  const filtered = useMemo(() => {
    if (activeCategory === "All") return PROMPT_TEMPLATES
    if (activeCategory === "Starred") {
      return PROMPT_TEMPLATES.filter((t) => favoriteIds.includes(t.id))
    }
    return PROMPT_TEMPLATES.filter((t) => t.category === activeCategory)
  }, [activeCategory, favoriteIds])

  const visible = expanded ? filtered : filtered.slice(0, DEFAULT_VISIBLE)
  const remaining = filtered.length - visible.length

  return (
    <section className="relative z-10 w-full max-w-3xl mt-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-[var(--vc-text-muted)] flex items-center gap-1.5">
          <Sparkles className="size-4 text-blue-500" />
          Quick Templates
        </h3>
        <span className="text-xs text-[var(--vc-text-faint)]">
          {filtered.length} templates · click to insert
        </span>
      </div>

      {/* Category chips (only when expanded, to keep collapsed view tidy) */}
      {expanded && (
        <div className="flex flex-wrap gap-1.5 mb-4 animate-in fade-in-0 duration-200">
          <CategoryChip
            label="All"
            active={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
          />
          {favoriteIds.length > 0 && (
            <CategoryChip
              label="Starred ★"
              active={activeCategory === "Starred"}
              onClick={() => setActiveCategory("Starred")}
            />
          )}
          {TEMPLATE_CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      )}

      {/* Templates Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visible.map((tpl) => {
          const style = HOME_CAT_STYLES[tpl.category] || {
            icon: "Sparkles",
            si: "bg-slate-200/50 dark:bg-slate-800/50",
            tag: "text-slate-600 bg-slate-100 dark:text-slate-300 dark:bg-slate-800",
            themeGlow: "shadow-none"
          }
          const IconComponent = ICON_MAP[style.icon] || Sparkles

          return (
            <button
              key={tpl.id}
              onClick={() => onSelect(tpl.text)}
              className={cn(
                "group/card flex flex-col gap-2 text-left p-4 rounded-xl border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] hover:bg-[var(--vc-glass-hover)] transition-all duration-200 hover:border-blue-500/30 relative",
                style.themeGlow
              )}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5">
                  <div className={cn("size-6 rounded flex items-center justify-center flex-shrink-0 text-slate-700 dark:text-slate-200", style.si)}>
                    <IconComponent className="size-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[var(--vc-text)] capitalize">
                    {tpl.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {token && (
                    <button
                      onClick={(e) => handleToggleFavorite(e, tpl.id)}
                      className={cn(
                        "size-6 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors text-slate-400 hover:text-amber-400",
                        favoriteIds.includes(tpl.id) && "text-amber-400"
                      )}
                      aria-label="Star template"
                    >
                      <Star
                        className={cn(
                          "size-3.5",
                          favoriteIds.includes(tpl.id) && "fill-amber-400"
                        )}
                      />
                    </button>
                  )}
                  <span className={cn("text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded", style.tag)}>
                    {tpl.category}
                  </span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-[var(--vc-text-muted)] font-normal line-clamp-3 group-hover/card:text-[var(--vc-text)] transition-colors">
                {renderTemplate(tpl.text)}
              </p>
              <div className="flex items-center justify-end w-full mt-1 border-t border-[var(--vc-glass-border)]/20 pt-1.5">
                <span className="text-[10px] text-[var(--vc-text-faint)] group-hover/card:text-blue-500 transition-colors flex items-center gap-1">
                  click to use <ArrowRight className="size-3 transition-transform group-hover/card:translate-x-0.5" />
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {(remaining > 0 || expanded) && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] backdrop-blur-xl text-xs font-medium text-[var(--vc-text)] hover:bg-[var(--vc-glass-hover)] hover:border-[var(--vc-accent-border)] transition-all"
          >
            {expanded ? (
              <>
                <Minus className="size-3.5" />
                Show fewer
              </>
            ) : (
              <>
                <Plus className="size-3.5" />
                Show all {filtered.length} templates
              </>
            )}
          </button>
        </div>
      )}
    </section>
  )
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium transition-all border backdrop-blur-xl",
        active
          ? "text-white border-transparent shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
          : "border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] text-[var(--vc-text-muted)] hover:text-[var(--vc-text)] hover:border-[var(--vc-accent-border)]"
      )}
      style={
        active
          ? { background: "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)" }
          : undefined
      }
    >
      {label}
    </button>
  )
}

// Highlight [PLACEHOLDERS] so users immediately see what to fill in with premium contrast
function renderTemplate(text: string) {
  const parts = text.split(/(\[[^\]]+\])/g)
  return parts.map((part, i) =>
    /^\[[^\]]+\]$/.test(part) ? (
      <span
        key={i}
        className="font-medium px-1.5 py-0.5 mx-0.5 rounded-md bg-blue-500/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-300 font-mono text-[11px]"
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}
