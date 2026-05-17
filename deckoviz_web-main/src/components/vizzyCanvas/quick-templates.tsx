import { useMemo, useState } from "react"
import { Plus, Minus, Sparkles } from "lucide-react"
import { cn } from "./lib/utils"
import {
  PROMPT_TEMPLATES,
  TEMPLATE_CATEGORIES,
  type TemplateCategory,
} from "./lib/prompt-templates"

const DEFAULT_VISIBLE = 12

interface QuickTemplatesProps {
  onSelect: (text: string) => void
}

export function QuickTemplates({ onSelect }: QuickTemplatesProps) {
  const [expanded, setExpanded] = useState(false)
  const [activeCategory, setActiveCategory] =
    useState<TemplateCategory | "All">("All")

  const filtered = useMemo(() => {
    if (activeCategory === "All") return PROMPT_TEMPLATES
    return PROMPT_TEMPLATES.filter((t) => t.category === activeCategory)
  }, [activeCategory])

  const visible = expanded ? filtered : filtered.slice(0, DEFAULT_VISIBLE)
  const remaining = filtered.length - visible.length

  return (
    <section className="relative z-10 w-full max-w-3xl mt-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-[var(--vc-text-muted)]">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {visible.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => onSelect(tpl.text)}
            className="group/tpl flex flex-col gap-1.5 text-left px-3.5 py-3 rounded-xl border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] backdrop-blur-xl hover:border-[var(--vc-accent-border)] hover:bg-[var(--vc-glass-hover)] transition-all duration-200"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="size-3.5 text-[var(--vc-accent-text)] opacity-70 group-hover/tpl:opacity-100 flex-shrink-0 transition-opacity" />
              <span className="text-sm font-semibold text-[var(--vc-text)] capitalize">
                {tpl.title}
              </span>
              <span className="ml-auto text-[10px] uppercase tracking-wider text-[var(--vc-text-faint)]">
                {tpl.category}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[var(--vc-text-muted)] line-clamp-3">
              {renderTemplate(tpl.text)}
            </p>
          </button>
        ))}
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
          : "border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] text-[var(--vc-text-muted)] hover:text-[var(--vc-text)]"
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

// Highlight [PLACEHOLDERS] so users immediately see what to fill in
function renderTemplate(text: string) {
  const parts = text.split(/(\[[^\]]+\])/g)
  return parts.map((part, i) =>
    /^\[[^\]]+\]$/.test(part) ? (
      <span
        key={i}
        className="font-medium px-1 py-0.5 -my-0.5 rounded-md bg-[var(--vc-placeholder-bg)] text-[var(--vc-placeholder-text)]"
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}
