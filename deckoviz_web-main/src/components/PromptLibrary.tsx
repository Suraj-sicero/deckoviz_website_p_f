import React, { useState, useEffect } from "react"
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
  const [retryCount, setRetryCount] = useState(0)

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
        setError(`Error fetching from ${API_BASE_URL}/api/prompt-library: ${err.message || String(err)}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPromptLibrary()
  }, [API_BASE_URL, retryCount])

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
    <div className="w-full h-full flex flex-col bg-[#1a1f3c] text-white">
      {/* Search Bar at top */}
      <div className="px-5 pt-5 pb-4 border-b border-white/5 bg-[#1a1f3c]">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a91be] size-4" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-[#5e6691] focus:outline-none focus:ring-2 focus:ring-[#4F75FF]/20 focus:border-[#4F75FF]/50 transition-all duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </div>
      </div>

      {/* Vertical Tabs */}
      <div className="px-5 pb-4 pt-3 bg-[#1a1f3c] border-b border-white/5">
        <div className="flex flex-wrap gap-2">
          {VERTICAL_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedVertical(tab.value)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 border ${
                selectedVertical === tab.value
                  ? "bg-[#4F75FF]/20 text-[#4F75FF] border-[#4F75FF]/30 shadow-sm"
                  : "text-[#8a91be] hover:text-white hover:bg-white/5 border-transparent"
              }`}
              aria-selected={selectedVertical === tab.value}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Cards Section */}
      <div className="p-5 bg-[#1a1f3c] flex-1 overflow-y-auto min-h-[300px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="size-6 animate-spin text-[#4F75FF]" />
            <span className="ml-3 text-[#8a91be]">Loading prompts...</span>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-[#8a91be] bg-[#252a50]/40 rounded-2xl border border-white/5">
            <AlertCircle className="size-6 mx-auto mb-3 text-[#8a91be]" />
            <p className="text-sm font-medium leading-relaxed max-w-md mx-auto">{error}</p>
            <button
              onClick={() => setRetryCount((prev) => prev + 1)}
              className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-br from-[#4F75FF] to-[#9B51E0] text-white text-xs font-bold hover:shadow-[0_0_15px_rgba(79,117,255,0.4)] transition-all duration-200"
            >
              Try again
            </button>
          </div>
        ) : selectedVertical === null ? (
          <div className="flex min-h-[200px] items-center justify-center text-[#8a91be]">
            Select a vertical to begin
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div className="p-8 text-center text-[#8a91be]">
            <Search className="size-6 mx-auto mb-3" />
            <p>No prompts found matching "{searchQuery}".</p>
            <p className="mt-2 text-sm text-[#5e6691]">Try adjusting your search term.</p>
          </div>
        ) : (
          <>
            {(() => {
              const categories = getCategories()
              if (categories.length <= 1) {
                return (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredPrompts.map((prompt) => (
                      <div
                        key={prompt.id}
                        className="group rounded-xl border border-white/5 bg-[#252a50]/70 hover:bg-[#252a50] hover:border-[#4F75FF]/30 transition-all cursor-pointer p-5 flex flex-col gap-3 shadow-sm"
                        onClick={() => onSelectPrompt(prompt)}
                      >
                        <h3 className="font-semibold text-white text-sm">
                          {prompt.title}
                        </h3>
                        <p className="text-xs text-[#8a91be] line-clamp-3 leading-relaxed">
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
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#5e6691] mb-4 mt-6 flex items-center gap-2">
                      <span>{category}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#8a91be] font-normal">
                        {promptsInCat.length}
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {promptsInCat.map((prompt) => (
                        <div
                          key={prompt.id}
                          className="group rounded-xl border border-white/5 bg-[#252a50]/70 hover:bg-[#252a50] hover:border-[#4F75FF]/30 transition-all cursor-pointer p-5 flex flex-col gap-3 shadow-sm"
                          onClick={() => onSelectPrompt(prompt)}
                        >
                          <h4 className="font-semibold text-white text-sm">
                            {prompt.title}
                          </h4>
                          <p className="text-xs text-[#8a91be] line-clamp-3 leading-relaxed">
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