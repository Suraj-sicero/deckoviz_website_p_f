import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
  ArrowLeft,
  Palette,
  RotateCcw,
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
  isFavorited: boolean
  updatedAt: string
}

interface CurationRecord {
  id: string
  title: string
  artist: string
  imageUrl: string
  category: string
  style: string
  description?: string
  isFeatured?: boolean
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
  const navigate = useNavigate()
  const [images, setImages] = useState<VizzyImageRecord[]>([])
  const [chats, setChats] = useState<VizzyChatRecord[]>([])
  const [deletedImages, setDeletedImages] = useState<VizzyImageRecord[]>([])
  const [deletedChats, setDeletedChats] = useState<VizzyChatRecord[]>([])
  const [curations, setCurations] = useState<CurationRecord[]>([])
  const [activeTab, setActiveTab] = useState<"images" | "chats" | "deleted" | "curations">("images")
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
        const [imagesRes, chatsRes, delImagesRes, delChatsRes, curationsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/vizzy-canvas/images`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/api/vizzy-canvas/chats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/api/vizzy-canvas/images/deleted`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/api/vizzy-canvas/chats/deleted`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/api/vizzy-canvas/curations`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])
        const imagesData = await imagesRes.json()
        const chatsData = await chatsRes.json()
        const delImagesData = await delImagesRes.json()
        const delChatsData = await delChatsRes.json()
        const curationsData = await curationsRes.json()
        
        setImages(imagesData.images || [])
        setChats(chatsData.chats || [])
        setDeletedImages(delImagesData.images || [])
        setDeletedChats(delChatsData.chats || [])
        setCurations(curationsData.curations || [])
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

  const handleToggleFavoriteChat = async (chat: VizzyChatRecord) => {
    if (!token) return
    setPendingId(chat.id)
    // Optimistic toggle
    setChats((prev) =>
      prev.map((c) =>
        c.id === chat.id ? { ...c, isFavorited: !c.isFavorited } : c
      )
    )
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/vizzy-canvas/chats/${chat.id}/favorite`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (!res.ok) throw new Error("Failed to update chat favorite")
    } catch (e) {
      // Roll back
      setChats((prev) =>
        prev.map((c) =>
          c.id === chat.id ? { ...c, isFavorited: chat.isFavorited } : c
        )
      )
      console.error(e)
    } finally {
      setPendingId(null)
    }
  }

  const handleDeleteChat = async (chat: VizzyChatRecord) => {
    if (!token) return
    if (!confirm("Delete this chat session? You can restore it from the Deleted tab later.")) return
    setPendingId(chat.id)
    try {
      const res = await fetch(`${API_BASE_URL}/api/vizzy-canvas/chats/${chat.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Failed to delete chat")
      setChats((prev) => prev.filter((c) => c.id !== chat.id))
      // Add to deleted state
      setDeletedChats((prev) => [chat, ...prev])
    } catch (e) {
      console.error(e)
    } finally {
      setPendingId(null)
    }
  }

  const handleRestoreImage = async (img: VizzyImageRecord) => {
    if (!token) return
    setPendingId(img.id)
    try {
      const res = await fetch(`${API_BASE_URL}/api/vizzy-canvas/images/${img.id}/restore`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Failed to restore image")
      setDeletedImages((prev) => prev.filter((i) => i.id !== img.id))
      setImages((prev) => [img, ...prev])
    } catch (e) {
      console.error(e)
    } finally {
      setPendingId(null)
    }
  }

  const handleRestoreChat = async (chat: VizzyChatRecord) => {
    if (!token) return
    setPendingId(chat.id)
    try {
      const res = await fetch(`${API_BASE_URL}/api/vizzy-canvas/chats/${chat.id}/restore`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Failed to restore chat")
      setDeletedChats((prev) => prev.filter((c) => c.id !== chat.id))
      setChats((prev) => [chat, ...prev])
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

      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-[var(--vc-divider)] bg-[var(--vc-glass-bg)] backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          {/* Back to Canvas */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => navigate("/vizzy-canvas")}
            className="text-[var(--vc-text-muted)] hover:text-[var(--vc-accent-text)] hover:bg-[var(--vc-glass-hover)] rounded-xl -ml-1 mr-1"
            aria-label="Back to Vizzy Canvas"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div
            className="relative size-9 rounded-xl border border-[var(--vc-glass-border)] flex items-center justify-center backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(135deg, var(--vc-glow-1) 0%, var(--vc-glow-3) 100%)",
            }}
          >
            <Sparkles className="size-[18px] text-[var(--vc-accent-text)]" />
          </div>
          <h1
            className="text-base font-semibold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span
              className="bg-clip-text text-transparent italic"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #2563EB 0%, #22D3EE 100%)",
              }}
            >
              Vizzy Library
            </span>
          </h1>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-[var(--vc-glass-bg)] border border-[var(--vc-glass-border)] backdrop-blur-xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("images")}
            className={`rounded-lg ${
              activeTab === "images"
                ? "bg-[var(--vc-glass-hover)] text-[var(--vc-accent-text)] font-semibold"
                : "text-[var(--vc-text-muted)] hover:text-[var(--vc-text)]"
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
                ? "bg-[var(--vc-glass-hover)] text-[var(--vc-accent-text)] font-semibold"
                : "text-[var(--vc-text-muted)] hover:text-[var(--vc-text)]"
            }`}
          >
            <MessageSquare className="size-4 mr-2" />
            Chats
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("deleted")}
            className={`rounded-lg ${
              activeTab === "deleted"
                ? "bg-[var(--vc-glass-hover)] text-rose-500 font-semibold"
                : "text-[var(--vc-text-muted)] hover:text-[var(--vc-text)]"
            }`}
          >
            <Trash2 className="size-4 mr-2" />
            Trash
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("curations")}
            className={`rounded-lg ${
              activeTab === "curations"
                ? "bg-[var(--vc-glass-hover)] text-[var(--vc-accent-text)] font-semibold"
                : "text-[var(--vc-text-muted)] hover:text-[var(--vc-text)]"
            }`}
          >
            <Palette className="size-4 mr-2" />
            Curations
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
                  <div className="col-span-full text-center text-[var(--vc-text-muted)] py-12">
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
                    className="group p-4 rounded-2xl border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] backdrop-blur-xl hover:border-[var(--vc-accent-border)] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[var(--vc-text)] truncate">
                            {chat.title || "Untitled Chat"}
                          </h3>
                          {chat.isFavorited && (
                            <Heart className="size-3.5 fill-rose-400 text-rose-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-[var(--vc-text-muted)] line-clamp-1">
                          {chat.messages[chat.messages.length - 1]?.content}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-[var(--vc-text-faint)]">
                          <Clock className="size-3" />
                          <span>
                            {new Date(chat.updatedAt).toLocaleString()}
                          </span>
                          <span>•</span>
                          <span>{chat.messages.length} messages</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleToggleFavoriteChat(chat)}
                          disabled={pendingId === chat.id}
                          className="text-[var(--vc-text-muted)] hover:text-rose-400 hover:bg-[var(--vc-glass-hover)]"
                          aria-label={
                            chat.isFavorited ? "Unfavorite chat" : "Favorite chat"
                          }
                        >
                          <Heart
                            className={`size-4 ${
                              chat.isFavorited ? "fill-rose-400 text-rose-400" : ""
                            }`}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDeleteChat(chat)}
                          disabled={pendingId === chat.id}
                          className="text-[var(--vc-text-muted)] hover:text-rose-500 hover:bg-rose-500/10"
                          aria-label="Delete chat"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {chats.length === 0 && (
                  <div className="text-center text-[var(--vc-text-muted)] py-12">
                    No chats saved yet.
                  </div>
                )}
              </div>
            )}

            {activeTab === "deleted" && (
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-sm font-semibold tracking-wider uppercase text-rose-400 mb-4 px-1">
                    Deleted Images
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {deletedImages.map((img) => (
                      <div
                        key={img.id}
                        className="group relative rounded-2xl overflow-hidden border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] backdrop-blur-xl shadow-[0_8px_24px_rgba(11,18,32,0.4)]"
                      >
                        <img
                          src={img.imageUrl}
                          alt={img.prompt}
                          className="w-full h-48 object-cover opacity-70 grayscale"
                        />
                        <div className="absolute inset-0 bg-[#0B1220]/80 p-3 flex flex-col justify-end">
                          <p className="text-xs text-white line-clamp-2 mb-2">
                            {img.prompt}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRestoreImage(img)}
                            disabled={pendingId === img.id}
                            className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 w-full flex items-center justify-center gap-1.5"
                          >
                            <RotateCcw className="size-3.5" />
                            Restore
                          </Button>
                        </div>
                      </div>
                    ))}
                    {deletedImages.length === 0 && (
                      <div className="col-span-full text-left text-[var(--vc-text-faint)] py-4 px-1 text-sm">
                        No deleted images.
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-semibold tracking-wider uppercase text-rose-400 mb-4 px-1">
                    Deleted Chats
                  </h2>
                  <div className="flex flex-col gap-3">
                    {deletedChats.map((chat) => (
                      <div
                        key={chat.id}
                        className="p-4 rounded-2xl border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] backdrop-blur-xl hover:border-[var(--vc-accent-border)] transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-[var(--vc-text)] mb-1 truncate">
                              {chat.title || "Untitled Chat"}
                            </h3>
                            <p className="text-sm text-[var(--vc-text-muted)] line-clamp-1">
                              {chat.messages[chat.messages.length - 1]?.content}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRestoreChat(chat)}
                            disabled={pendingId === chat.id}
                            className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 flex items-center gap-1.5"
                          >
                            <RotateCcw className="size-3.5" />
                            Restore
                          </Button>
                        </div>
                      </div>
                    ))}
                    {deletedChats.length === 0 && (
                      <div className="text-left text-[var(--vc-text-faint)] py-4 px-1 text-sm">
                        No deleted chats.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "curations" && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                <div className="flex flex-col gap-1 px-1">
                  <h2 className="text-lg font-semibold text-[var(--vc-text)]">
                    Deckoviz Curations
                  </h2>
                  <p className="text-sm text-[var(--vc-text-muted)]">
                    Hand-selected seed artworks and creative patterns curated for your digital workspace.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {curations.map((item) => (
                    <div
                      key={item.id}
                      className="group relative rounded-2xl overflow-hidden border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] backdrop-blur-xl shadow-lg hover:border-[var(--vc-accent-border)] transition-all flex flex-col"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/40 text-cyan-300 border border-white/10 backdrop-blur-md">
                          {item.category}
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                        <div className="flex flex-col gap-1">
                          <h3 className="font-semibold text-[var(--vc-text)] truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[var(--vc-text-muted)]">
                            By {item.artist} · <span className="italic text-[var(--vc-accent-text)]/85">{item.style}</span>
                          </p>
                          {item.description && (
                            <p className="text-xs text-[var(--vc-text-faint)] line-clamp-2 mt-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            // Copy description or title to clipboard to seed canvas
                            navigator.clipboard.writeText(item.description || item.title)
                            alert("Artwork prompt copied! Go to Canvas to paste and generate.")
                            navigate("/vizzy-canvas")
                          }}
                          className="bg-[var(--vc-glass-hover)] hover:bg-[var(--vc-accent-text)]/10 text-[var(--vc-text-muted)] hover:text-[var(--vc-accent-text)] border border-[var(--vc-glass-border)] rounded-xl w-full flex items-center justify-center gap-1.5"
                        >
                          <Sparkles className="size-3.5" />
                          Use Prompt Seed
                        </Button>
                      </div>
                    </div>
                  ))}
                  {curations.length === 0 && (
                    <div className="col-span-full text-center text-[var(--vc-text-faint)] py-16">
                      <Palette className="size-8 mx-auto mb-2 text-[var(--vc-text-muted)] animate-pulse" />
                      <p className="text-sm font-medium">No seed curations registered yet.</p>
                      <p className="text-xs text-[var(--vc-text-faint)] mt-1">
                        Run the seed script in your terminal to populate curations.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
