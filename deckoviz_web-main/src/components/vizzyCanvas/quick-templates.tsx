import { useMemo, useState, useEffect } from "react"
import { 
  Sparkles, 
  Video, 
  Palette, 
  Layout, 
  BookOpen, 
  Heart, 
  CalendarDays, 
  ArrowRight,
  Star,
  Search
} from "lucide-react"
import { cn } from "./lib/utils"
import {
  PROMPT_TEMPLATES,
  TEMPLATE_CATEGORIES,
  type TemplateCategory,
} from "./lib/prompt-templates"
import { useAuth } from "../../context/AuthContext"
import { API_BASE_URL } from "../../lib/constants"
import { MoreTemplatesModal } from "./more-templates-modal"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [show120More, setShow120More] = useState(false)
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
    e.stopPropagation()
    if (!token) return

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
        if (data.isFavorited) {
          setFavoriteIds((prev) => Array.from(new Set([...prev, templateId])))
        } else {
          setFavoriteIds((prev) => prev.filter((id) => id !== templateId))
        }
      }
    } catch (err) {
      setFavoriteIds((prev) =>
        prev.includes(templateId)
          ? prev.filter((id) => id !== templateId)
          : [...prev, templateId]
      )
      console.error("Failed to toggle favorite prompt:", err)
    }
  }

  const filteredTemplates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return PROMPT_TEMPLATES.filter((t) => {
      const matchCat =
        activeCategory === "All" ||
        (activeCategory === "Starred" ? favoriteIds.includes(t.id) : t.category === activeCategory)
      const matchQuery =
        !q ||
        t.text.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      return matchCat && matchQuery
    })
  }, [searchQuery, activeCategory, favoriteIds])

  const categoriesToShow = useMemo(() => {
    if (activeCategory !== "All" && activeCategory !== "Starred") {
      return [activeCategory]
    }
    if (activeCategory === "Starred") {
      const starredCats = new Set(PROMPT_TEMPLATES.filter((t) => favoriteIds.includes(t.id)).map((t) => t.category))
      return TEMPLATE_CATEGORIES.filter((cat) => starredCats.has(cat))
    }
    return TEMPLATE_CATEGORIES
  }, [activeCategory, favoriteIds])

  return (
    <section className="relative z-10 w-full max-w-4xl mt-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold tracking-tight text-[var(--vc-text)] flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="size-5 text-blue-500" />
            Creative Canvas — Quick Templates
          </h3>
          <p className="text-xs text-[var(--vc-text-muted)] mt-1">
            {PROMPT_TEMPLATES.length} starting points for your home. Click any card to use it, customize the details, and press submit.
          </p>
        </div>
        <button
          onClick={() => setShow120More(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 text-xs font-semibold text-blue-400 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
        >
          <Sparkles className="size-3.5 text-cyan-400" />
          Open 120 more
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-5 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--vc-text-faint)] group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search templates..."
          className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] hover:bg-[var(--vc-glass-hover)] focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 outline-none text-[var(--vc-text)] transition-all placeholder-[var(--vc-text-faint)]"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        <button
          onClick={() => setActiveCategory("All")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-all border backdrop-blur-xl",
            activeCategory === "All"
              ? "text-white border-transparent shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
              : "border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] text-[var(--vc-text-muted)] hover:text-[var(--vc-text)] hover:border-[var(--vc-accent-border)]"
          )}
          style={
            activeCategory === "All"
              ? { background: "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)" }
              : undefined
          }
        >
          All Templates ({filteredTemplates.length})
        </button>

        {favoriteIds.length > 0 && (
          <button
            onClick={() => setActiveCategory("Starred")}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all border backdrop-blur-xl flex items-center gap-1.5",
              activeCategory === "Starred"
                ? "text-white border-transparent shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
                : "border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] text-[var(--vc-text-muted)] hover:text-[var(--vc-text)] hover:border-[var(--vc-accent-border)]"
            )}
            style={
              activeCategory === "Starred"
                ? { background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)" }
                : undefined
            }
          >
            Starred ★
            <span className={cn(
              "text-[10px] px-1.5 py-0.2 rounded-full",
              activeCategory === "Starred" ? "bg-white/20 text-white" : "bg-black/5 dark:bg-white/5 text-[var(--vc-text-faint)]"
            )}>
              {favoriteIds.length}
            </span>
          </button>
        )}

        {TEMPLATE_CATEGORIES.map((cat) => {
          const count = PROMPT_TEMPLATES.filter((t) => t.category === cat && (
            !searchQuery || 
            t.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
            t.title.toLowerCase().includes(searchQuery.toLowerCase())
          )).length

          if (count === 0 && searchQuery) return null

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all border backdrop-blur-xl flex items-center gap-1.5",
                activeCategory === cat
                  ? "text-white border-transparent shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
                  : "border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] text-[var(--vc-text-muted)] hover:text-[var(--vc-text)] hover:border-[var(--vc-accent-border)]"
              )}
              style={
                activeCategory === cat
                  ? { background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)" }
                  : undefined
              }
            >
              {cat}
              <span className={cn(
                "text-[10px] px-1.5 py-0.2 rounded-full",
                activeCategory === cat ? "bg-white/20 text-white" : "bg-black/5 dark:bg-white/5 text-[var(--vc-text-faint)]"
              )}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid of Sections */}
      <div className="space-y-8 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[var(--vc-glass-border)] rounded-2xl bg-[var(--vc-glass-bg)]">
            <p className="text-sm text-[var(--vc-text-muted)]">No templates found matching your criteria.</p>
          </div>
        ) : (
          categoriesToShow.map((cat) => {
            const items = filteredTemplates.filter((t) => t.category === cat)
            if (items.length === 0) return null

            const style = HOME_CAT_STYLES[cat] || {
              icon: "Sparkles",
              si: "bg-slate-200/50 dark:bg-slate-800/50",
              tag: "text-slate-600 bg-slate-100 dark:text-slate-300 dark:bg-slate-800",
              themeGlow: "shadow-none"
            }
            const IconComponent = ICON_MAP[style.icon] || Sparkles

            return (
              <div key={cat} className="space-y-4 animate-in fade-in-50 slide-in-from-top-2 duration-300">
                {/* Section Header */}
                <div className="flex items-center gap-2.5 pb-2 border-b border-[var(--vc-glass-border)]">
                  <div className={cn("size-8 rounded-lg flex items-center justify-center flex-shrink-0 text-slate-700 dark:text-slate-200", style.si)}>
                    <IconComponent className="size-4.5" />
                  </div>
                  <span className="text-sm font-bold text-[var(--vc-text)]">{cat}</span>
                  <span className="text-xs text-[var(--vc-text-faint)] ml-auto">{items.length} templates</span>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((tpl) => (
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
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setShow120More(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/25 text-xs font-medium text-blue-400 hover:border-blue-500/30 transition-all"
        >
          <Sparkles className="size-3.5 text-cyan-400" />
          Open 120 more templates
        </button>
      </div>

      <MoreTemplatesModal
        isOpen={show120More}
        onClose={() => setShow120More(false)}
        onSelect={(text) => {
          if (onSelect) onSelect(text)
          setShow120More(false)
        }}
      />
    </section>
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
