import { useState, useEffect } from "react"
import { Search, X, Copy, Check, MessageSquarePlus, Palette, ZoomIn } from "lucide-react"
import { Button } from "./ui/button"
import stylesData from "../../data/midjourney-styles.json"

interface ArtStyle {
  id: number
  name: string
  imageUrl: string
}

interface ArtStylesReferenceProps {
  isOpen: boolean
  onClose: () => void
  onInsertStyle: (styleName: string) => void
  onPreviewImage?: (imageUrl: string, title: string) => void
}

export function ArtStylesReference({
  isOpen,
  onClose,
  onInsertStyle,
  onPreviewImage,
}: ArtStylesReferenceProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // Reset search query when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("")
    }
  }, [isOpen])

  if (!isOpen) return null

  // Filter styles based on search query
  const filteredStyles = (stylesData as ArtStyle[]).filter((style) =>
    style.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCopy = async (style: ArtStyle) => {
    try {
      await navigator.clipboard.writeText(style.name)
      setCopiedId(style.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy style name: ", err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl h-[85vh] overflow-hidden rounded-3xl border border-[var(--vc-glass-border-strong)] bg-[var(--vc-glass-strong)] backdrop-blur-3xl shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col"
      >
        {/* Decorative Glows */}
        <div
          className="absolute -left-20 -top-20 size-72 rounded-full blur-3xl pointer-events-none opacity-50"
          style={{ background: "radial-gradient(circle, var(--vc-glow-1) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -right-20 -bottom-20 size-72 rounded-full blur-3xl pointer-events-none opacity-50"
          style={{ background: "radial-gradient(circle, var(--vc-glow-3) 0%, transparent 70%)" }}
        />

        {/* Header */}
        <div className="relative z-10 flex flex-col gap-4 p-6 border-b border-[var(--vc-divider)] shrink-0 bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <Palette className="size-5" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-white tracking-tight">
                  Art Styles Reference
                </h2>
                <p className="text-xs text-[var(--vc-text-muted)] mt-0.5">
                  Explore and copy visual styles to enrich your generation prompts
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-xl transition-all"
              aria-label="Close reference guide"
            >
              <X className="size-5" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[var(--vc-text-faint)]" />
            <input
              type="text"
              placeholder="Search 76 art styles (e.g. Anime, Surrealism, Cyberpunk...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--vc-glass-border)] bg-black/25 text-sm text-[var(--vc-text)] placeholder:text-[var(--vc-text-faint)] focus:outline-none focus:border-cyan-500/50 transition-all duration-300"
              aria-label="Search art styles"
            />
          </div>
        </div>

        {/* Style Grid Section */}
        <div className="relative z-10 flex-1 overflow-y-auto p-6 scroll-smooth">
          {filteredStyles.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredStyles.map((style) => {
                const isHovered = hoveredId === style.id
                return (
                  <div
                    key={style.id}
                    onMouseEnter={() => setHoveredId(style.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="group relative flex flex-col justify-between rounded-2xl p-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-[var(--vc-glass-border)] hover:border-cyan-500/30 transition-all duration-300 shadow-sm"
                  >
                    {/* Image Container with Hover Expand effect */}
                    <div className="relative h-28 w-full rounded-xl overflow-hidden bg-black/20 mb-3 select-none">
                      <img
                        src={style.imageUrl}
                        alt={style.name}
                        className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                          isHovered ? "scale-115" : "scale-100"
                        }`}
                      />
                      
                      {/* Zoom Indicator */}
                      {onPreviewImage && (
                        <button
                          onClick={() => onPreviewImage(style.imageUrl, style.name)}
                          className="absolute right-2 top-2 size-6 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:scale-105 transition-all opacity-0 group-hover:opacity-100 duration-300"
                          title="View large image"
                        >
                          <ZoomIn className="size-3.5" />
                        </button>
                      )}

                      {/* Number Overlay */}
                      <span className="absolute left-2 top-2 px-1.5 py-0.5 rounded-md bg-black/50 text-[10px] font-mono text-slate-300 border border-white/5">
                        #{style.id}
                      </span>
                    </div>

                    {/* Info and Actions */}
                    <div className="flex flex-col gap-2.5">
                      <h4 className="text-xs font-semibold text-slate-200 line-clamp-2 min-h-[32px] group-hover:text-cyan-300 transition-colors">
                        {style.name}
                      </h4>

                      <div className="flex gap-1.5 shrink-0">
                        {/* Copy Button */}
                        <Button
                          size="sm"
                          onClick={() => handleCopy(style)}
                          className="flex-1 h-7 text-[10px] rounded-lg bg-white/[0.04] hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/20 font-medium transition-all flex items-center justify-center gap-1"
                        >
                          {copiedId === style.id ? (
                            <>
                              <Check className="size-3 text-emerald-400" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="size-3" />
                              Copy
                            </>
                          )}
                        </Button>

                        {/* Use Style / Insert Button */}
                        <Button
                          size="sm"
                          onClick={() => {
                            onInsertStyle(style.name)
                            onClose()
                          }}
                          className="h-7 w-7 p-0 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-white border border-cyan-500/20 hover:border-cyan-500 transition-all flex items-center justify-center"
                          title="Insert style into prompt"
                        >
                          <MessageSquarePlus className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
              <Palette className="size-12 text-slate-600 animate-pulse" />
              <h3 className="text-sm font-semibold text-slate-300">No styles found</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Try searching for a different keyword or check your spelling
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 px-6 py-4 border-t border-[var(--vc-divider)] shrink-0 bg-white/[0.01] flex items-center justify-between text-[10px] text-[var(--vc-text-faint)]">
          <span>Source: mateuszlomber.pl/en/midjourney-list-of-styles/</span>
          <span>Tip: Hover card to zoom image, click "+" to insert into prompt</span>
        </div>
      </div>
    </div>
  )
}
