import React, { useState, useMemo } from "react"
import {
  X,
  Copy,
  Check,
  Search,
  Sparkles,
  UtensilsCrossed,
  ShoppingBag,
  Building2,
  Heart,
  GraduationCap,
  Briefcase,
  Layers,
  Coffee,
  Palette,
  HelpCircle
} from "lucide-react"
import { cn } from "./lib/utils"
import { MORE_ENTERPRISE_GROUPS, MoreEnterpriseTemplate } from "./lib/more-enterprise-templates"

interface MoreEnterpriseModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect?: (text: string) => void
}

const CATEGORY_ICONS: Record<string, React.ComponentType<any>> = {
  "Restaurants": UtensilsCrossed,
  "Retail": ShoppingBag,
  "Hotels": Building2,
  "Wellness spaces": Heart,
  "Schools & learning": GraduationCap,
  "Offices": Briefcase,
  "Mixed verticals": Layers,
  "Food & beverage": Coffee,
  "Fashion & beauty": Palette,
  "Cross-sector": Sparkles,
  "Miscellaneous": HelpCircle
}

export function MoreEnterpriseModal({ isOpen, onClose, onSelect }: MoreEnterpriseModalProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Restaurants")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Handle outside click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handle template text copy
  const handleCopy = async (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  // Search filter logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null

    const query = searchQuery.toLowerCase().trim()
    const matches: { sectionTitle: string; template: MoreEnterpriseTemplate }[] = []

    MORE_ENTERPRISE_GROUPS.forEach((group) => {
      group.sections.forEach((section) => {
        section.templates.forEach((tpl) => {
          if (
            tpl.text.toLowerCase().includes(query) ||
            group.category.toLowerCase().includes(query) ||
            section.title.toLowerCase().includes(query)
          ) {
            matches.push({
              sectionTitle: `${group.category} — ${section.title}`,
              template: tpl,
            })
          }
        })
      })
    })

    return matches
  }, [searchQuery])

  if (!isOpen) return null

  // Highlight placeholders dynamically
  const renderTemplateText = (text: string) => {
    const parts = text.split(/(\[[^\]]+\])/g)
    return parts.map((part, i) =>
      /^\[[^\]]+\]$/.test(part) ? (
        <span
          key={i}
          className="font-medium px-1.5 py-0.5 mx-0.5 rounded-md bg-blue-500/15 dark:bg-blue-400/20 text-blue-600 dark:text-blue-300 font-mono text-[11px]"
        >
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    )
  }

  const currentGroup = MORE_ENTERPRISE_GROUPS.find((g) => g.category === activeCategory)

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 transition-all duration-300 animate-in fade-in"
    >
      <div
        className="relative w-full max-w-5xl h-[85vh] md:h-[80vh] flex flex-col rounded-3xl border border-[var(--vc-glass-border-strong)] bg-[#0B1220]/95 backdrop-blur-2xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(34, 211, 238, 0.05)",
        }}
      >
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border-b border-white/[0.08]">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold font-serif flex items-center gap-2 text-white">
              <Sparkles className="size-5 text-cyan-400" />
              <span>120 More Enterprise &amp; Business Templates</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select or copy seed prompts structured for commercial spaces, retail, hospitality, and brand campaigns.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search 120 templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white/[0.04] border border-white/[0.08] hover:border-white/20 focus:border-cyan-400/50 rounded-xl text-white outline-none placeholder:text-slate-500 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="size-4.5" />
            </button>
          </div>
        </header>

        {/* Modal Main Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Category Sidebar (hidden if search results are displayed) */}
          {!searchQuery && (
            <aside className="w-56 border-r border-white/[0.08] overflow-y-auto p-4 hidden md:flex flex-col gap-1.5 scrollbar-thin">
              {MORE_ENTERPRISE_GROUPS.map((group) => {
                const Icon = CATEGORY_ICONS[group.category] || HelpCircle
                const isActive = activeCategory === group.category
                return (
                  <button
                    key={group.category}
                    onClick={() => setActiveCategory(group.category)}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all duration-150 border",
                      isActive
                        ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border-cyan-500/30"
                        : "bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-white/[0.03]"
                    )}
                  >
                    <Icon className={cn("size-4 shrink-0", isActive ? "text-cyan-300" : "text-slate-400")} />
                    <span className="truncate">{group.category}</span>
                  </button>
                );
              })}
            </aside>
          )}

          {/* Right Template Content Container */}
          <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            {searchQuery ? (
              // Search Results view
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    Search Results ({searchResults?.length || 0})
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {searchResults && searchResults.length > 0 ? (
                    searchResults.map(({ sectionTitle, template }) => (
                      <div
                        key={template.id}
                        onClick={() => onSelect && onSelect(template.text)}
                        className={cn(
                          "group/item p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-all relative flex flex-col gap-2.5 text-left",
                          onSelect && "cursor-pointer hover:border-cyan-500/30"
                        )}
                      >
                        <div className="flex items-start justify-between w-full gap-3">
                          <span className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-wider">
                            {sectionTitle}
                          </span>
                          <button
                            onClick={(e) => handleCopy(e, template.text, template.id)}
                            className={cn(
                              "p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-slate-400 hover:text-white transition-all shrink-0",
                              copiedId === template.id && "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            )}
                            title="Copy to clipboard"
                          >
                            {copiedId === template.id ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                          </button>
                        </div>
                        <p className="text-xs leading-relaxed text-slate-300 font-normal">
                          {renderTemplateText(template.text)}
                        </p>
                        {onSelect && (
                          <div className="text-[9px] text-slate-500 group-hover/item:text-cyan-400 text-right mt-1 font-medium transition-colors">
                            click to use
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-slate-500 text-sm">
                      No matching templates found for "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Structured categories view
              <div className="flex flex-col gap-8">
                {/* Mobile Category Select */}
                <div className="md:hidden w-full mb-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">
                    Category
                  </label>
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400/50"
                  >
                    {MORE_ENTERPRISE_GROUPS.map((g) => (
                      <option key={g.category} value={g.category} className="bg-[#0B1220]">
                        {g.category}
                      </option>
                    ))}
                  </select>
                </div>

                {currentGroup?.sections.map((section) => (
                  <div key={section.title} className="flex flex-col gap-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 border-b border-white/[0.08] pb-2 px-1">
                      {section.title}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {section.templates.map((tpl) => (
                        <div
                          key={tpl.id}
                          onClick={() => onSelect && onSelect(tpl.text)}
                          className={cn(
                            "group/item p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-all relative flex flex-col gap-2 text-left",
                            onSelect && "cursor-pointer hover:border-cyan-500/30"
                          )}
                        >
                          <div className="flex items-start justify-between w-full gap-3">
                            <p className="text-xs leading-relaxed text-slate-300 font-normal flex-1">
                              {renderTemplateText(tpl.text)}
                            </p>
                            <button
                              onClick={(e) => handleCopy(e, tpl.text, tpl.id)}
                              className={cn(
                                "p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-slate-400 hover:text-white transition-all shrink-0",
                                copiedId === tpl.id && "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              )}
                              title="Copy to clipboard"
                            >
                              {copiedId === tpl.id ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                            </button>
                          </div>
                          {onSelect && (
                            <div className="text-[9px] text-slate-500 group-hover/item:text-cyan-400 text-right mt-1 font-medium transition-colors">
                              click to use
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
