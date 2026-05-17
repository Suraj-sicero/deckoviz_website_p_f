import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { API_BASE_URL } from "../../lib/constants"
import { Button } from "./ui/button"
import {
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  Clock,
  Heart,
  Trash2,
  Loader2,
} from "lucide-react"
import { CanvasThemeProvider, useCanvasTheme } from "./lib/canvas-theme"

interface VizzyImageRecord {
  id: string
  imageUrl: string
  prompt: string
  isFavorited: boolean
  createdAt?: string
  updatedAt?: string
}

interface VizzyChatRecord {
  id: string
  title: string
  messages: Array<{ content: string; role: string }>
  updatedAt: string
}

export default function VizzyLibrary() {
  return (
    <CanvasThemeProvider>
      <VizzyLibraryInner />
    </CanvasThemeProvider>
  )
}

function VizzyLibraryInner() {
  const { token } = useAuth()
  const { theme } = useCanvasTheme()
  const [images, setImages] = useState<VizzyImageRecord[]>([])
  const [chats, setChats] = useState<VizzyChatRecord[]>([])
  const [activeTab, setActiveTab] = useState<"images" | "chats">("images")
  const [isLoading, setIsLoading] = useState(true)
  const [pendingId, setPendingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setIsLoading(false)
        return
      }
      setIsLoading(true)
      try {
        const [imagesRes, chatsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/vizzy-canvas/images`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/api/vizzy-canvas/chats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])
        const imagesData = await imagesRes.json()
        const chatsData = await chatsRes.json()
        setImages(imagesData.images || [])
        setChats(chatsData.chats || [])
      } catch (error) {
        console.error("Failed to fetch library data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [token])

  const handleToggleFavorite = async (img: VizzyImageRecord) => {
    if (!token) return
    setPendingId(img.id)
    // Optimistic toggle
    setImages((prev) =>
      prev.map((i) =>
        i.id === img.id ? { ...i, isFavorited: !i.isFavorited } : i
      )
    )
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/vizzy-canvas/images/${img.id}/favorite`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (!res.ok) throw new Error("Failed to update favorite")
    } catch (e) {
      // Roll back
      setImages((prev) =>
        prev.map((i) =>
          i.id === img.id ? { ...i, isFavorited: img.isFavorited } : i
        )
      )
      console.error(e)
    } finally {
      setPendingId(null)
    }
  }

  const handleDeleteImage = async (img: VizzyImageRecord) => {
    if (!token) return
    if (!confirm("Delete this image? This cannot be undone.")) return
    setPendingId(img.id)
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/vizzy-canvas/images/${img.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (!res.ok) throw new Error("Failed to delete image")
      setImages((prev) => prev.filter((i) => i.id !== img.id))
    } catch (e) {
      console.error(e)
    } finally {
      setPendingId(null)
    }
  }

  const handleDeleteChat = async (chat: VizzyChatRecord) => {
    if (!token) return
    if (!confirm("Delete this chat session? This cannot be undone.")) return
    setPendingId(chat.id)
    try {
      const res = await fetch(`${API_BASE_URL}/api/vizzy-canvas/chats/${chat.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Failed to delete chat")
      setChats((prev) => prev.filter((c) => c.id !== chat.id))
    } catch (e) {
      console.error(e)
    } finally {
      setPendingId(null)
    }
  }

  return (
    <div
      data-vc-theme={theme}
      className="relative min-h-dvh"
      style={{ background: "var(--vc-bg-base)", color: "var(--vc-text)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(34,211,238,0.10) 0%, transparent 45%), radial-gradient(ellipse at bottom, rgba(37,99,235,0.10) 0%, transparent 50%)",
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div
            className="relative size-9 rounded-xl border border-white/10 flex items-center justify-center backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.18) 0%, rgba(37,99,235,0.18) 100%)",
            }}
          >
            <Sparkles className="size-[18px] text-cyan-300" />
          </div>
          <h1 className="text-base font-serif italic font-semibold">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #2563EB 0%, #22D3EE 100%)",
              }}
            >
              Vizzy Library
            </span>
          </h1>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("images")}
            className={`rounded-lg ${
              activeTab === "images"
                ? "bg-white/[0.08] text-cyan-300"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            <ImageIcon className="size-4 mr-2" />
            Images
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("chats")}
            className={`rounded-lg ${
              activeTab === "chats"
                ? "bg-white/[0.08] text-cyan-300"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            <MessageSquare className="size-4 mr-2" />
            Chats
          </Button>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="size-6 animate-spin text-cyan-300" />
          </div>
        ) : (
          <>
            {activeTab === "images" && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_24px_rgba(11,18,32,0.4)] hover:border-cyan-400/30 transition-all"
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.prompt}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/90 via-[#0B1220]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                      <p className="text-xs text-white line-clamp-2 mb-2">
                        {img.prompt}
                      </p>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleToggleFavorite(img)}
                          disabled={pendingId === img.id}
                          className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15"
                          aria-label={
                            img.isFavorited ? "Unfavorite" : "Favorite"
                          }
                        >
                          <Heart
                            className={`size-3.5 ${
                              img.isFavorited
                                ? "fill-rose-400 text-rose-400"
                                : "text-white"
                            }`}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDeleteImage(img)}
                          disabled={pendingId === img.id}
                          className="bg-white/10 hover:bg-rose-500/20 text-white hover:text-rose-300 backdrop-blur-md border border-white/15"
                          aria-label="Delete"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                    {img.isFavorited && (
                      <div className="absolute top-2 right-2 size-6 rounded-full bg-rose-500/90 backdrop-blur-md flex items-center justify-center">
                        <Heart className="size-3 fill-white text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {images.length === 0 && (
                  <div className="col-span-full text-center text-slate-400 py-12">
                    No images generated yet.
                  </div>
                )}
              </div>
            )}

            {activeTab === "chats" && (
              <div className="flex flex-col gap-3">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="group p-4 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:border-cyan-400/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-100 mb-1 truncate">
                          {chat.title || "Untitled Chat"}
                        </h3>
                        <p className="text-sm text-slate-400 line-clamp-1">
                          {chat.messages[chat.messages.length - 1]?.content}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                          <Clock className="size-3" />
                          <span>
                            {new Date(chat.updatedAt).toLocaleString()}
                          </span>
                          <span>•</span>
                          <span>{chat.messages.length} messages</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDeleteChat(chat)}
                        disabled={pendingId === chat.id}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 flex-shrink-0"
                        aria-label="Delete chat"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {chats.length === 0 && (
                  <div className="text-center text-slate-400 py-12">
                    No chats saved yet.
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
