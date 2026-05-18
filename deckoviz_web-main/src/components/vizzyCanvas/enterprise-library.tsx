import { useState, useMemo } from "react"
import { cn } from "./lib/utils"
import { 
  ENTERPRISE_CATS, 
  ENTERPRISE_TEMPLATES, 
  type EnterpriseCategory, 
  type EnterpriseTemplate 
} from "./lib/enterprise-templates"
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Palette, 
  Layout, 
  Video, 
  Camera, 
  Building2, 
  GraduationCap, 
  Heart, 
  Briefcase, 
  Search, 
  ArrowRight,
  Sparkles
} from "lucide-react"

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  UtensilsCrossed,
  ShoppingBag,
  Palette,
  Layout,
  Video,
  Camera,
  Building2,
  GraduationCap,
  Heart,
  Briefcase
}

interface EnterpriseLibraryProps {
  onSelect: (text: string) => void
}

export function EnterpriseLibrary({ onSelect }: EnterpriseLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")

  // Handle filtering
  const filteredTemplates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return ENTERPRISE_TEMPLATES.filter((t) => {
      const matchCat = activeCategory === "all" || t.cat === activeCategory
      const matchQuery = 
        !q || 
        t.text.toLowerCase().includes(q) || 
        t.type.toLowerCase().includes(q) || 
        t.cat.toLowerCase().includes(q)
      return matchCat && matchQuery
    })
  }, [searchQuery, activeCategory])

  // Get categories that actually have matching items
  const activeCategoriesToShow = useMemo(() => {
    if (activeCategory !== "all") {
      return ENTERPRISE_CATS.filter((c) => c.id === activeCategory)
    }
    return ENTERPRISE_CATS
  }, [activeCategory])

  // Highlight placeholders in the template text
  const renderTemplateText = (text: string) => {
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

  return (
    <section className="relative z-10 w-full max-w-4xl mt-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-6 text-center sm:text-left">
        <h3 className="text-xl font-bold tracking-tight text-[var(--vc-text)] flex items-center justify-center sm:justify-start gap-2">
          <Sparkles className="size-5 text-blue-500" />
          Enterprise Canvas — Template Library
        </h3>
        <p className="text-xs text-[var(--vc-text-muted)]">
          {ENTERPRISE_TEMPLATES.length} starting points for businesses. Click any card to use it, fill in your brand details, and press submit.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-5 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--vc-text-faint)] group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search business templates..."
          className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] hover:bg-[var(--vc-glass-hover)] focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 outline-none text-[var(--vc-text)] transition-all placeholder-[var(--vc-text-faint)]"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        <button
          onClick={() => setActiveCategory("all")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-all border backdrop-blur-xl",
            activeCategory === "all"
              ? "text-white border-transparent shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
              : "border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] text-[var(--vc-text-muted)] hover:text-[var(--vc-text)] hover:border-[var(--vc-accent-border)]"
          )}
          style={
            activeCategory === "all"
              ? { background: "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)" }
              : undefined
          }
        >
          All Templates ({filteredTemplates.length})
        </button>
        {ENTERPRISE_CATS.map((cat) => {
          const count = ENTERPRISE_TEMPLATES.filter((t) => t.cat === cat.id && (
            !searchQuery || 
            t.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
            t.type.toLowerCase().includes(searchQuery.toLowerCase())
          )).length

          if (count === 0 && searchQuery) return null

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all border backdrop-blur-xl flex items-center gap-1.5",
                activeCategory === cat.id
                  ? "text-white border-transparent shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
                  : "border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] text-[var(--vc-text-muted)] hover:text-[var(--vc-text)] hover:border-[var(--vc-accent-border)]"
              )}
              style={
                activeCategory === cat.id
                  ? { background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)" }
                  : undefined
              }
            >
              {cat.label}
              <span className={cn(
                "text-[10px] px-1.5 py-0.2 rounded-full",
                activeCategory === cat.id ? "bg-white/20 text-white" : "bg-black/5 dark:bg-white/5 text-[var(--vc-text-faint)]"
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
          activeCategoriesToShow.map((cat) => {
            const items = filteredTemplates.filter((t) => t.cat === cat.id)
            if (items.length === 0) return null

            const IconComponent = ICON_MAP[cat.icon] || Sparkles

            return (
              <div key={cat.id} className="space-y-4 animate-in fade-in-50 slide-in-from-top-2 duration-300">
                {/* Section Header */}
                <div className="flex items-center gap-2.5 pb-2 border-b border-[var(--vc-glass-border)]">
                  <div className={cn("size-8 rounded-lg flex items-center justify-center flex-shrink-0 text-slate-700 dark:text-slate-200", cat.si)}>
                    <IconComponent className="size-4.5" />
                  </div>
                  <span className="text-sm font-bold text-[var(--vc-text)]">{cat.label}</span>
                  <span className="text-xs text-[var(--vc-text-faint)] ml-auto">{items.length} templates</span>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelect(t.text)}
                      className={cn(
                        "group/card flex flex-col gap-2 text-left p-4 rounded-xl border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] hover:bg-[var(--vc-glass-hover)] transition-all duration-200 hover:border-blue-500/30",
                        cat.themeGlow
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className={cn("text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded", cat.tag)}>
                          {t.type}
                        </span>
                        <span className="text-[10px] text-[var(--vc-text-faint)] group-hover/card:text-blue-500 transition-colors flex items-center gap-1">
                          click to use <ArrowRight className="size-3 transition-transform group-hover/card:translate-x-0.5" />
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-[var(--vc-text-muted)] font-normal line-clamp-4 group-hover/card:text-[var(--vc-text)] transition-colors">
                        {renderTemplateText(t.text)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}
