import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from "../lib/constants"
import { Loader2, AlertCircle, Search } from "lucide-react"

interface PromptTemplate {
  id: string
  vertical: string
  category: string
  title: string
  prompt_text: string
  placeholders: string[]
}

interface PromptLibraryProps {
  onSelectPrompt: (promptTemplate: PromptTemplate) => void
}

interface VerticalTab {
  value: string
  label: string
}

const VERTICAL_TABS: VerticalTab[] = [
  { value: "restaurants_cafes", label: "Restaurants & Cafés" },
  { value: "retail_stores", label: "Retail Stores" },
  { value: "hotels_hospitality", label: "Hotels & Hospitality" },
  { value: "schools_universities", label: "Schools & Universities" },
  { value: "home", label: "Home" },
]

export function PromptLibrary({ onSelectPrompt }: PromptLibraryProps) {
  const [verticalsData, setVerticalsData] = useState<PromptTemplate[][]>([])
  const [verticalLabels, setVerticalLabels] = useState<Record<string, string>>({})
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPromptLibrary() {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API_BASE_URL}/api/prompt-library`)
        if (!res.ok) throw new Error("Failed to fetch prompt library")
        const data = await res.json()
        setVerticalsData(data.verticals)

        // Build label map from the data
        const labels: Record<string, string> = {}
        data.verticals.forEach((verticals) => {
          verticals.prompts.forEach((prompt) => {
            labels[prompt.vertical] = prompt.category
          })
        })
        setVerticalLabels(labels)
        // Select the first vertical automatically
        if (data.verticals.length > 0) {
          setSelectedVertical(data.verticals[0].vertical)
        }
      } catch (err: any) {
        console.error("Error fetching prompt library:", err)
        setError(err.message || "Failed to load prompt library")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPromptLibrary()
  }, [API_BASE_URL])

  // Compute filtered prompts for the selected vertical
  const selectedData = verticalsData.find((v) => v.vertical === selectedVertical)
  const allPrompts = selectedData ? selectedData.prompts : []

  // Client-side search filter: match against title (case-insensitive)
  const filteredPrompts = allPrompts.filter((prompt) =>
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Helper: get categories for the selected vertical
  const getCategories = (): string[] => {
    if (!selectedData) return []
    const cats = new Set<string>()
    selectedData.prompts.forEach((p) => cats.add(p.category))
    return Array.from(cats)
  }


  return (
    <div className="min-h-screen bg-[var(--vc-bg-base)] text-[var(--vc-text)]">
      {/* Search Bar at top */}
      <div className="p-6 border-b border-[var(--vc-divider)] bg-[var(--vc-glass-bg)] backdrop-blur-xl">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--vc-text-muted)] size-4" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--vc-glass-border)] bg-transparent text-[var(--vc-text)] placeholder-[var(--vc-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--vc-accent-text)] focus:border-transparent"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>
        </div>
      </div>

      {/* Vertical Tabs */}
      <div className="p-6 bg-[var(--vc-glass-bg)] backdrop-blur-xl border-b border-[var(--vc-divider)]">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {VERTICAL_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedVertical(tab.value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedVertical === tab.value
                    ? "bg-[var(--vc-glass-hover)] text-[var(--vc-accent-text)]"
                    : "text-[var(--vc-text-muted)] hover:text-[var(--vc-text)]"
                }`}
                aria-selected={selectedVertical === tab.value}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prompt Cards Section */}
      <div className="p-6 bg-[var(--vc-glass-bg)] backdrop-blur-xl min-h-[300px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="size-6 animate-spin text-[var(--vc-accent-text)]" />
            <span className="ml-3 text-[var(--vc-text-muted)]">Loading prompts...</span>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-[var(--vc-text-muted)]">
            <AlertCircle className="size-6 mx-auto mb-3" />
            <p>{error}</p>
            <button
              onClick={() => navigate(-1)} // fallback - would need proper back navigation
              className="mt-3 inline-block text-[var(--vc-accent-text)] hover:underline"
            >
              Try again
            </button>
          </div>
        ) : selectedVertical === null ? (
          <div className="flex min-h-[200px] items-center justify-center text-[var(--vc-text-muted)]">
            Select a vertical to begin
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div className="p-8 text-center text-[var(--vc-text-muted)]">
            <Search className="size-6 mx-auto mb-3" />
            <p>No prompts found matching "{searchQuery}".</p>
            <p className="mt-2 text-sm">Try adjusting your search term.</p>
          </div>
        ) : (
          <>
            {(() => {
              const categories = getCategories()
              if (categories.length <= 1) {
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPrompts.map((prompt) => (
                      <div
                        key={prompt.id}
                        className="group rounded-2xl overflow-hidden border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] backdrop-blur-xl shadow-sm hover:border-cyan-400/30 transition-all cursor-pointer p-4 flex flex-col gap-2"
                        onClick={() => onSelectPrompt(prompt)}
                      >
                        <h3 className="font-semibold text-[var(--vc-text)] truncate line-clamp-1">
                          {prompt.title}
                        </h3>
                        <p className="text-xs text-[var(--vc-text-faint)] line-clamp-3">
                          {prompt.prompt_text}
                        </p>
                      </div>
                    ))}
                  </div>
                )
              }

              // Group prompts by category
              const grouped: Record<string, PromptTemplate[]> = {}
              filteredPrompts.forEach((prompt) => {
                if (!grouped[prompt.category]) {
                  grouped[prompt.category] = []
                }
                grouped[prompt.category].push(prompt)
              })

              // Preserve category order
              const orderedCategories: string[] = []
              filteredPrompts.forEach((prompt) => {
                if (!orderedCategories.includes(prompt.category)) {
                  orderedCategories.push(prompt.category)
                }
              })

              return orderedCategories.map((category) => {
                const promptsInCat = grouped[category]
                return (
                  <div key={category} className="mb-8">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--vc-text-muted)] mb-4 flex items-center gap-2">
                      <span>{category}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--vc-glass-border)]/50 text-[var(--vc-text-faint)] font-normal">
                        {promptsInCat.length}
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {promptsInCat.map((prompt) => (
                        <div
                          key={prompt.id}
                          className="group rounded-2xl overflow-hidden border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] backdrop-blur-xl shadow-sm hover:border-cyan-400/30 transition-all cursor-pointer p-4 flex flex-col gap-2"
                          onClick={() => onSelectPrompt(prompt)}
                        >
                          <h4 className="font-semibold text-[var(--vc-text)] truncate line-clamp-1">
                            {prompt.title}
                          </h4>
                          <p className="text-xs text-[var(--vc-text-faint)] line-clamp-3">
                            {prompt.prompt_text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
            })()}
          </>
        )}
      </div>
    </div>
  )
}