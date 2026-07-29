

import { useState, useRef, useCallback, useEffect } from "react"
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { ImageLightbox } from "./image-lightbox"
import { WelcomeScreen } from "./welcome-screen"
import { ArtStylesReference } from "./art-styles-reference"
import { Button } from "./ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip"
import { Sparkles, Plus, Sun, Moon, Trash2, Clock, LogOut, User, Zap, Volume2, Palette, X, Home, MessageSquare, ChevronRight, Image as ImageIcon, Upload } from "lucide-react"
import { imageCache } from "./lib/image-cache"
import type { ChatMessage as ChatMessageType } from "./lib/types"
import { API_BASE_URL } from "../../lib/constants"
import { vizzyApi, saveImageToMediaLibrary } from "../../lib/webappApi"
import { CanvasThemeProvider, useCanvasTheme } from "./lib/canvas-theme"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

// ─── Chat History Types ──────────────────────────────────────────────────────
interface ChatHistoryItem {
  id: string
  title: string
  updatedAt: string
  messageCount: number
  lastMessage?: string
  hasImages?: boolean
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// ─────────────────────────────────────────────────────────────────────────────
// Vizzy 2.0 - Intent classification has moved to the backend (vizzyMasterAgent)
// The helpers below are kept only for the image refinement prompt builder,
// which still runs client-side to assemble a richer prompt before sending.
// ─────────────────────────────────────────────────────────────────────────────

function buildRefinedPrompt(messages: ChatMessageType[], newInput: string): string {
  const previousImages = messages
    .filter((m) => m.role === "assistant" && m.images && m.images.length > 0)
    .slice(-1)

  const lastAssistantMessages = messages
    .filter((m) => m.role === "assistant")
    .slice(-1)

  const positiveResponsePatterns = [
    /^(yup|yeah|yes|ok|okay|good|great|perfect|excellent|love it|nice|cool|rad|awesome)$/i,
    /^(ok|okay|alright|sure)\s+(let|lets|let's).*generate/i,
    /^(let|lets|let's).*generate/i,
    /generate\s+that/i,
    /make\s+that/i,
    /create\s+that/i,
  ]

  const isPositiveResponse = positiveResponsePatterns.some(pattern => pattern.test(newInput.trim()))

  if (isPositiveResponse) {
    const lastMessage = messages.slice(-1)[0]
    if (lastMessage?.role === "assistant" && lastMessage?.images && lastMessage.images.length > 0) {
      const lastImagePrompt = lastMessage.images[0]?.prompt
      if (lastImagePrompt) return lastImagePrompt
    }
    if (lastAssistantMessages.length > 0) {
      return lastAssistantMessages[0].content
    }
  }

  const refinementWords = [
    "make it", "change", "more", "less", "add", "remove", "try",
    "darker", "brighter", "bigger", "smaller", "different", "same but",
    "like that but", "adjust", "modify", "keep", "turn it", "transform",
    "switch", "convert", "instead", "also", "but with", "now make",
    "could you", "can you", "please make", "update", "tweak",
  ]

  const isRefinement = refinementWords.some((word) =>
    newInput.toLowerCase().includes(word)
  )

  if (isRefinement && previousImages.length > 0) {
    const lastImagePrompt = previousImages[0].images?.[0]?.prompt
    if (lastImagePrompt) {
      return `${lastImagePrompt}. User modification: ${newInput}`
    }
  }

  return newInput
}

function parseNumImages(input: string): number {
  const patterns = [
    /(\d+)\s*(images?|versions?|variations?|options?|alternatives?|concepts?|ideas?|visuals?)/i,
    /generate\s*(\d+)/i,
    /create\s*(\d+)/i,
    /make\s*(\d+)/i,
    /show\s*(?:me\s*)?(\d+)/i,
    /give\s*(?:me\s*)?(\d+)/i,
  ]
  for (const pattern of patterns) {
    const match = input.match(pattern)
    if (match) {
      const num = parseInt(match[1], 10)
      return Math.min(Math.max(num, 1), 4)
    }
  }
  return 1
}

function generateAssistantText(numImages: number, prompt: string): string {
  if (numImages > 1) return `Here are ${numImages} variations based on your vision:`
  const lowerPrompt = prompt.toLowerCase()
  if (lowerPrompt.includes("poster") || lowerPrompt.includes("signage")) return "Here's your design:"
  if (lowerPrompt.includes("product") || lowerPrompt.includes("photo")) return "Here's the product visual:"
  if (lowerPrompt.includes("brand") || lowerPrompt.includes("marketing")) return "Here's your brand visual:"
  if (lowerPrompt.includes("dream") || lowerPrompt.includes("emotion") || lowerPrompt.includes("feel")) return "Here's what I envisioned for you:"
  if (lowerPrompt.includes("story") || lowerPrompt.includes("scene")) return "Here's the scene I created:"
  if (lowerPrompt.includes("moodboard") || lowerPrompt.includes("vision board")) return "Here's your moodboard concept:"
  return "Here's what I created for you:"
}

const VOICE_OPTIONS = [
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel (EN-US)", provider: "elevenlabs" },
  { id: "en-US-natalie", name: "Natalie (EN-US)", provider: "murf" },
  { id: "en-US-marcus", name: "Marcus (EN-US)", provider: "murf" },
  { id: "en-US-julie", name: "Julie (EN-US)", provider: "murf" },
]

const ART_STYLES = [
  "Van Gogh (Impressionism)",
  "Picasso (Cubism)",
  "Claude Monet (Impressionism)",
  "Salvador Dali (Surrealism)",
  "Andy Warhol (Pop Art)",
  "Katsushika Hokusai (Ukiyo-e)",
  "Edvard Munch (Expressionism)",
  "Jackson Pollock (Abstract Expressionism)",
  "Gustav Klimt (Art Nouveau)",
  "Henri Matisse (Fauvism)",
  "Michelangelo (Renaissance)",
  "Jean-Michel Basquiat (Neo-Expressionism)",
  "Piet Mondrian (De Stijl)",
  "Roy Lichtenstein (Comic Book)",
  "William Morris (Arts & Crafts)",
  "Yayoi Kusama (Polka Dots)",
  "Keith Haring (Street Art)",
  "Georgia O'Keeffe (Modernist Flower)",
  "Wassily Kandinsky (Abstract)",
  "M.C. Escher (Surreal Mathematical)"
]

export function VizzyChat() {
  return (
    <CanvasThemeProvider>
      <VizzyChatInner />
    </CanvasThemeProvider>
  )
}

function VizzyChatInner() {
  const router = useNavigate()
  const [searchParams] = useSearchParams()
  const initialChatId = searchParams.get("chatId")
  const { user, token, logout: signOut } = useAuth()
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxPrompt, setLightboxPrompt] = useState("")
  const [uploadedImage, setUploadedImage] = useState<{ url: string; fileName: string } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useCanvasTheme()
  const [selectedVoice, setSelectedVoice] = useState(VOICE_OPTIONS[0])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  // Incremented each time a template/suggestion is clicked. ChatInput uses
  // this as a signal to focus the textarea and select the first [bracket].
  const [templateInsertToken, setTemplateInsertToken] = useState(0)
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean | null>(null)
  const [chatMode, setChatMode] = useState<"home" | "onboarding">("home")
  const [persona, setPersona] = useState<any>(null)
  const [showPersonaModal, setShowPersonaModal] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [showStylesReference, setShowStylesReference] = useState(false)

  // ─── Chat History Persistence State ───────────────────────────────────────
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([])
  const [showChatHistory, setShowChatHistory] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [isLoadingChat, setIsLoadingChat] = useState(false)

  // Fetch Onboarding Status on mount
  useEffect(() => {
    if (!token) return
    fetch(`${API_BASE_URL}/api/vizzy-canvas/onboarding/status`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsOnboardingCompleted(data.completed)
          if (data.persona) {
            setPersona(data.persona.preferencesCard)
          }
        }
      })
      .catch((err) => console.error("Error fetching onboarding status:", err))
  }, [token])

  // ─── Save Chat to Local Storage Fallback Cache ─────────────────────────
  const saveChatToLocalHistory = useCallback((chatId: string, msgs: ChatMessageType[]) => {
    if (!chatId || msgs.length === 0) return
    try {
      const lastUserMsg = [...msgs].reverse().find((m) => m.role === 'user')
      const hasImgs = msgs.some((m) => (m.images && m.images.length > 0) || (m.uploadedImages && m.uploadedImages.length > 0))
      const item: ChatHistoryItem = {
        id: chatId,
        title: lastUserMsg?.content?.substring(0, 50) || 'Untitled Chat',
        updatedAt: new Date().toISOString(),
        messageCount: msgs.length,
        lastMessage: lastUserMsg?.content?.substring(0, 80),
        hasImages: hasImgs,
      }
      const cached = localStorage.getItem("vizzy_chat_sessions")
      let list: ChatHistoryItem[] = cached ? JSON.parse(cached) : []
      list = list.filter((c) => c.id !== chatId)
      list.unshift(item)
      localStorage.setItem("vizzy_chat_sessions", JSON.stringify(list.slice(0, 50)))
      localStorage.setItem(`vizzy_chat_msgs_${chatId}`, JSON.stringify(msgs))

      setChatHistory((prev) => {
        const filtered = prev.filter((c) => c.id !== chatId)
        return [item, ...filtered]
      })
    } catch (e) {
      console.warn("Failed to cache local chat:", e)
    }
  }, [])

  // ─── Fetch Chat History on mount ──────────────────────────────────────────
  const fetchChatHistory = useCallback(async () => {
    setIsLoadingHistory(true)
    let localChats: ChatHistoryItem[] = []
    try {
      const cached = localStorage.getItem("vizzy_chat_sessions")
      if (cached) localChats = JSON.parse(cached)
    } catch (e) {}

    const tkn = token || localStorage.getItem("token") || undefined
    let apiChats: ChatHistoryItem[] = []

    if (tkn) {
      try {
        const data = await vizzyApi.getChats(tkn)
        const rawChats = Array.isArray(data) ? data : (data?.chats || data?.rows || data?.data || data?.history || [])
        apiChats = rawChats.map((c: any) => {
          const msgs = typeof c.messages === 'string' ? JSON.parse(c.messages || '[]') : (c.messages || [])
          const lastUserMsg = [...msgs].reverse().find((m: any) => m.role === 'user')
          const hasImgs = msgs.some((m: any) => (m.images && m.images.length > 0) || (m.uploadedImages && m.uploadedImages.length > 0))
          return {
            id: c.id,
            title: c.title || lastUserMsg?.content?.substring(0, 50) || 'Untitled Chat',
            updatedAt: c.updatedAt || c.createdAt || new Date().toISOString(),
            messageCount: msgs.length,
            lastMessage: lastUserMsg?.content?.substring(0, 80),
            hasImages: hasImgs,
          }
        })
      } catch (err) {
        console.warn('[Vizzy] API fetch chat history warning:', err)
      }
    }

    const map = new Map<string, ChatHistoryItem>()
    localChats.forEach((c) => map.set(c.id, c))
    apiChats.forEach((c) => map.set(c.id, c))

    setChatHistory(Array.from(map.values()))
    setIsLoadingHistory(false)
  }, [token])

  useEffect(() => { fetchChatHistory() }, [fetchChatHistory])

  // ─── Sync chat messages (with images/media) to backend DB ───────────────
  const syncChatToBackend = useCallback(async (chatId: string | null, msgs: ChatMessageType[]) => {
    if (!chatId || msgs.length === 0) return
    saveChatToLocalHistory(chatId, msgs)

    const tkn = token || localStorage.getItem("token") || undefined
    if (!tkn) return
    try {
      const cleanMsgs = msgs.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        images: m.images,
        uploadedImages: m.uploadedImages,
        music: m.music,
        videos: m.videos,
        timestamp: m.timestamp,
        agentUsed: m.agentUsed,
        intent: m.intent,
      }))

      // Persist updated messages to backend chat record
      await fetch(`${API_BASE_URL}/api/vizzy-canvas/chats/${chatId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tkn}`,
        },
        body: JSON.stringify({ messages: cleanMsgs }),
      }).catch(() => {})

      // Also notify agent endpoint to sync messages
      await fetch(`${API_BASE_URL}/api/vizzy-canvas/agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tkn}`,
        },
        body: JSON.stringify({
          messages: cleanMsgs,
          chatId,
          mode: chatMode,
        }),
      }).catch(() => {})
    } catch (err) {
      console.warn("[Vizzy] Failed to sync updated chat to backend:", err)
    }
  }, [token, chatMode, saveChatToLocalHistory])

  // ─── Load a previous chat ─────────────────────────────────────────────────
  const loadChat = useCallback(async (chatId: string) => {
    setIsLoadingChat(true)
    let rawMsgs: any[] = []
    const tkn = token || localStorage.getItem("token") || undefined

    if (tkn) {
      try {
        const data = await vizzyApi.getChat(chatId, tkn)
        rawMsgs = typeof data.chat?.messages === 'string'
          ? JSON.parse(data.chat.messages || '[]')
          : (data.chat?.messages || data?.messages || [])
      } catch (err) {
        console.warn('[Vizzy] Failed to load chat from backend, trying local:', err)
      }
    }

    if (rawMsgs.length === 0) {
      try {
        const local = localStorage.getItem(`vizzy_chat_msgs_${chatId}`)
        if (local) rawMsgs = JSON.parse(local)
      } catch (e) {}
    }

    const restoredMsgs: ChatMessageType[] = rawMsgs.map((m: any) => ({
      id: m.id || generateId(),
      role: m.role,
      content: m.content || '',
      images: Array.isArray(m.images) && m.images.length > 0 ? m.images.map((img: any) => ({
        url: img.url || img.imageUrl || img.image_url || '',
        prompt: img.prompt || '',
        seed: img.seed,
      })) : undefined,
      uploadedImages: m.uploadedImages,
      music: m.music,
      videos: m.videos,
      timestamp: m.timestamp || Date.now(),
      agentUsed: m.agentUsed,
      intent: m.intent,
    }))

    setMessages(restoredMsgs)
    setCurrentChatId(chatId)
    setChatMode('home')
    setShowChatHistory(false)
    setIsLoadingChat(false)
  }, [token])

  // Auto-load chat session if URL contains ?chatId=...
  useEffect(() => {
    if (initialChatId) {
      loadChat(initialChatId)
    }
  }, [initialChatId, loadChat])

  // ─── Delete a chat from history ───────────────────────────────────────────
  const deleteChatFromHistory = useCallback(async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('Delete this chat session?')) return
    try {
      const tkn = token || localStorage.getItem("token") || undefined
      if (tkn) {
        await vizzyApi.deleteChat(chatId, tkn).catch(() => {})
      }
      try {
        const cached = localStorage.getItem("vizzy_chat_sessions")
        if (cached) {
          const list: ChatHistoryItem[] = JSON.parse(cached)
          localStorage.setItem("vizzy_chat_sessions", JSON.stringify(list.filter((c) => c.id !== chatId)))
        }
        localStorage.removeItem(`vizzy_chat_msgs_${chatId}`)
      } catch (err) {}

      setChatHistory((prev) => prev.filter((c) => c.id !== chatId))
      if (currentChatId === chatId) {
        setMessages([])
        setCurrentChatId(null)
      }
    } catch (err) {
      console.error('[Vizzy] Failed to delete chat:', err)
    }
  }, [token, currentChatId])

  const handleStartOnboarding = useCallback(async () => {
    setIsLoading(false)
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/vizzy-canvas/onboarding/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed to start onboarding")

      setChatMode("onboarding")
      setCurrentChatId(data.chat.id)
      const initialMessages = JSON.parse(data.chat.messages || "[]")
      setMessages(initialMessages)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to start onboarding")
    } finally {
      setIsLoading(false)
    }
  }, [token])

  const handleLogout = async () => {
    try {
      signOut()
      router("/auth/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSubmit = useCallback(async () => {
    const trimmedInput = input.trim()
    const isStyleTransferMode = selectedStyle !== null

    if ((!trimmedInput && !isStyleTransferMode) || isLoading) return

    if (isStyleTransferMode && !uploadedImage) {
      alert("Please upload an image first to perform style transfer.")
      return
    }

    const userMessage: ChatMessageType = {
      id: generateId(),
      role: "user",
      content: isStyleTransferMode
        ? `Style Transfer: Apply ${selectedStyle} style to uploaded image.`
        : trimmedInput,
      timestamp: Date.now(),
    }

    const assistantMessage: ChatMessageType = {
      id: generateId(),
      role: "assistant",
      content: "",
      isLoading: true,
      timestamp: Date.now(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages((prev) => [...prev, userMessage, assistantMessage])
    setInput("")
    setIsLoading(true)

    try {
      if (isStyleTransferMode && uploadedImage) {
        const response = await fetch(`${API_BASE_URL}/api/vizzy-canvas/style-transfer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
          },
          body: JSON.stringify({
            imageUrl: uploadedImage.url,
            style: selectedStyle,
          }),
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.error || "Failed to perform style transfer")

        const styleTransferredImages = [{ url: data.transferredImage.url, prompt: `Style Transfer: ${selectedStyle}` }]
        const updatedWithStyle = messages.concat([
          userMessage,
          {
            id: assistantMessage.id,
            role: "assistant",
            content: `I've neurally transferred the **${selectedStyle}** style onto your image.`,
            images: styleTransferredImages,
            uploadedImages: [{
              id: generateId(),
              url: uploadedImage.url,
              fileName: uploadedImage.fileName,
              fileSize: 0,
              uploadedAt: Date.now(),
            }],
            isLoading: false,
            agentUsed: "vizzy_pipeline",
            intent: "style_transfer",
            timestamp: Date.now(),
          }
        ])

        setMessages(updatedWithStyle)
        setUploadedImage(null)
        setSelectedStyle(null)

        // Sync complete messages (with images) to backend DB
        syncChatToBackend(currentChatId, updatedWithStyle)

        // Auto-sync style-transferred image to media library
        if (data.transferredImage?.url) {
          saveImageToMediaLibrary(
            data.transferredImage.url,
            { prompt: `Style Transfer: ${selectedStyle}`, source: 'vizzy_style_transfer' },
            token || undefined,
          )
        }
        return
      }

      // ─────────────────────────────────────────────────────────────────────
      // VIZZY 2.0 - Step 1: Handle uploaded image (always client-detectable)
      // Image editing is detected by file presence, not LLM classification.
      // ─────────────────────────────────────────────────────────────────────
      const hasUploadedImage = uploadedImage !== null

      if (hasUploadedImage && trimmedInput) {
        const response = await fetch(`${API_BASE_URL}/api/vizzy-canvas/inpaint`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: uploadedImage!.url, prompt: trimmedInput }),
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || "Failed to edit image")

        const editedImages = [{ url: data.editedImage.url, prompt: trimmedInput }]
        const updatedWithInpaint = updatedMessages.concat([
          {
            id: assistantMessage.id,
            role: "assistant",
            content: `I've edited your image: ${trimmedInput}`,
            images: editedImages,
            uploadedImages: [{
              id: generateId(), url: uploadedImage!.url,
              fileName: uploadedImage!.fileName, fileSize: 0, uploadedAt: Date.now(),
            }],
            isLoading: false,
            agentUsed: "vizzy_pipeline",
            intent: "image_editing",
            timestamp: Date.now(),
          }
        ])

        setMessages(updatedWithInpaint)
        setUploadedImage(null)

        // Sync complete messages (with images) to backend DB
        syncChatToBackend(currentChatId, updatedWithInpaint)

        // Auto-sync edited image to media library
        if (data.editedImage?.url) {
          saveImageToMediaLibrary(
            data.editedImage.url,
            { prompt: trimmedInput, source: 'vizzy_image_edit' },
            token || undefined,
          )
        }
        return
      }

      if (hasUploadedImage) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? {
                  ...m,
                  content: `I can see your uploaded image. What would you like me to edit? Describe the changes (like "remove the cat") and I'll apply them using AI inpainting.`,
                  uploadedImages: [{
                    id: generateId(), url: uploadedImage!.url,
                    fileName: uploadedImage!.fileName, fileSize: 0, uploadedAt: Date.now(),
                  }],
                  isLoading: false,
                }
              : m
          )
        )
        setUploadedImage(null)
        return
      }

      // ─────────────────────────────────────────────────────────────────────
      // VIZZY 2.0 - Step 2: Send to Vizzy Master Agent
      // The backend classifies intent, selects sub-agent, loads memory +
      // system card, and either responds directly or signals media delegation.
      // ─────────────────────────────────────────────────────────────────────
      console.log("[Vizzy2.0] Sending to Master Agent:", trimmedInput.substring(0, 60))

      const agentRes = await fetch(`${API_BASE_URL}/api/vizzy-canvas/agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          chatId: currentChatId,
          mode: chatMode,
        }),
      })

      const agentData = await agentRes.json()
      if (!agentRes.ok) throw new Error(agentData.error || "Agent request failed")

      // Track chat session id
      if (agentData.chatId && agentData.chatId !== currentChatId) {
        setCurrentChatId(agentData.chatId)
      }

      console.log("[Vizzy2.0] Intent:", agentData.intent, "| Agent:", agentData.agentUsed, "| delegateToMedia:", agentData.delegateToMedia)
      console.log("[Vizzy2.0] Full agent response keys:", Object.keys(agentData))
      console.log("[Vizzy2.0] Agent content (first 200):", agentData.content?.substring(0, 200))
      console.log("[Vizzy2.0] Agent images:", agentData.images)

      // ─────────────────────────────────────────────────────────────────────
      // VIZZY 2.0 - Step 3: If agent signals media delegation, call pipeline
      // The master agent doesn't handle media - it delegates back to the
      // existing specialized endpoints (unchanged from v1).
      // ─────────────────────────────────────────────────────────────────────
      if (agentData.delegateToMedia) {
        const intent = agentData.intent

        if (intent === "music_generation") {
          // Music pipeline
          let response; let data; let retries = 3; let lastError
          while (retries > 0) {
            try {
              response = await fetch(`${API_BASE_URL}/api/vizzy-canvas/music/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json", ...(token && { "Authorization": `Bearer ${token}` }) },
                body: JSON.stringify({ prompt: trimmedInput }),
              })
              const responseText = await response.text()
              data = JSON.parse(responseText)
              if (!response.ok) throw new Error(data.error || "Failed to generate music")
              break
            } catch (error) {
              lastError = error; retries--
              if (retries > 0) await new Promise(resolve => setTimeout(resolve, 500))
            }
          }
          if (!data) throw lastError || new Error("Music generation failed")

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id
                ? {
                    ...m,
                    content: `I'm creating a song based on your description. This typically takes 30-60 seconds. Your music will be ready soon!`,
                    music: [{
                      id: data.generationId, title: data.title || "Untitled",
                      audioUrl: data.audioData ? `data:audio/wav;base64,${data.audioData}` : data.audioUrl,
                      prompt: trimmedInput, status: data.status, createdAt: Date.now(),
                    }],
                    isLoading: true,
                    agentUsed: "vizzy_pipeline",
                    intent: "music_generation",
                  }
              : m
            )
          )
          return
        }

        if (intent === "video_generation") {
          // Video pipeline
          const lastImage = [...messages].reverse().find((m) => m.role === "assistant" && m.images && m.images.length > 0)
          const sourceImageUrl = lastImage?.images?.[0]?.url

          const submitRes = await fetch(`${API_BASE_URL}/api/vizzy-canvas/video/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...(token && { "Authorization": `Bearer ${token}` }) },
            body: JSON.stringify({ prompt: trimmedInput, imageUrl: sourceImageUrl }),
          })
          const submitData = await submitRes.json()
          if (!submitRes.ok) throw new Error(submitData.error || "Failed to start video generation")

          const videoId = generateId()
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id
                ? {
                    ...m,
                    content: sourceImageUrl ? "Animating your image. This usually takes 15-30 seconds." : "Generating your video. This usually takes 15-30 seconds.",
                    videos: [{ id: videoId, requestId: submitData.requestId, model: submitData.model || "veo-2.0", prompt: trimmedInput, sourceImageUrl, status: "in_queue", createdAt: Date.now() }],
                    isLoading: true,
                    agentUsed: "vizzy_pipeline",
                    intent: "video_generation",
                  }
              : m
            )
          )

          const maxAttempts = 40; let attempt = 0; let finalUrl: string | undefined; let finalStatus: "completed" | "failed" = "failed"
          while (attempt < maxAttempts) {
            await new Promise((r) => setTimeout(r, 3000))
            const pollRes = await fetch(`${API_BASE_URL}/api/vizzy-canvas/video/status?op=${encodeURIComponent(submitData.requestId)}`, { headers: { ...(token && { "Authorization": `Bearer ${token}` }) } })
            const pollData = await pollRes.json()
            if (pollData.status === "completed") { finalUrl = pollData.videoUrl; finalStatus = "completed"; break }
            if (pollData.status === "failed") { finalStatus = "failed"; break }
            attempt++
          }
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id
                ? { ...m, content: finalStatus === "completed" ? "Here's your video:" : "Video generation timed out. Try again with a simpler prompt.", videos: m.videos?.map((v) => v.requestId === submitData.requestId ? { ...v, status: finalStatus, videoUrl: finalUrl } : v), isLoading: false }
              : m
            )
          )
          return
        }

        if (intent === "image_generation") {
          // Image generation pipeline
          const refinedPrompt = buildRefinedPrompt(updatedMessages, trimmedInput)
          const numResults = parseNumImages(trimmedInput)

          const response = await fetch(`${API_BASE_URL}/api/vizzy-canvas/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...(token && { "Authorization": `Bearer ${token}` }) },
            body: JSON.stringify({ prompt: refinedPrompt, aspect_ratio: aspectRatio, num_results: numResults }),
          })
          const data = await response.json()
          if (!response.ok) throw new Error(data.error || "Failed to generate image")

          console.log('[Vizzy2.0] Image generation response:', JSON.stringify(data, null, 2).substring(0, 500))
          console.log('[Vizzy2.0] First image URL (first 200 chars):', data.images?.[0]?.url?.substring(0, 200))

          // Helper: ensure image URL is usable
          const normalizeImageUrl = (url: string): string => {
            if (!url) return url
            if (url.includes('image.pollinations.ai')) {
              const cleanPrompt = refinedPrompt ? encodeURIComponent(refinedPrompt) : 'art'
              return `https://image.pollinations.ai/prompt/${cleanPrompt}?nologo=true`
            }
            // Already a valid URL or data URI
            if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url
            // Looks like raw base64 data (no URL prefix)
            if (/^[A-Za-z0-9+/=]/.test(url) && url.length > 100) {
              return `data:image/png;base64,${url}`
            }
            return url
          }

          const generatedImages = data.images.map((img: { url: string; seed?: number }) => ({ url: normalizeImageUrl(img.url), prompt: refinedPrompt, seed: img.seed }))
          const updatedWithGenImages = updatedMessages.concat([
            {
              id: assistantMessage.id,
              role: "assistant",
              content: generateAssistantText(data.images.length, refinedPrompt),
              images: generatedImages,
              isLoading: false,
              agentUsed: "vizzy_pipeline",
              intent: "image_generation",
              timestamp: Date.now(),
            }
          ])

          setMessages(updatedWithGenImages)

          // Sync complete messages (including generated images) to backend DB
          const activeChatId = agentData.chatId || currentChatId
          syncChatToBackend(activeChatId, updatedWithGenImages)

          data.images.forEach((img: { url: string; seed?: number }, index: number) => {
            const cleanUrl = normalizeImageUrl(img.url)
            const cachedImage = { id: `img-${Date.now()}-${index}`, image_url: cleanUrl, prompt: refinedPrompt, aspect_ratio: aspectRatio, created_at: new Date().toISOString(), is_favorited: false }
            imageCache.save(cachedImage)
            // ── Auto-sync to Home Webapp media library ──
            imageCache.syncToBackend(cachedImage, token || undefined)
          })

          // Post-generation analysis (fire and forget)
          if (data.images.length > 0 && refinedPrompt) {
            fetch(`${API_BASE_URL}/api/vizzy-canvas/analyze-image`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt: refinedPrompt, imageUrl: data.images[0].url }),
            }).then(async (r) => {
              if (r.ok) {
                const { analysis } = await r.json()
                setMessages((prev) => [...prev, { id: `analysis_${Date.now()}`, role: "assistant", content: analysis, images: [], isLoading: false, timestamp: Date.now() }])
              }
            }).catch(() => {})
          }
          return
        }
      }

      // ─────────────────────────────────────────────────────────────────────
      // VIZZY 2.0 - Step 4: Conversational response from Master Agent
      // The agent returned a full content response - render it directly.
      // ─────────────────────────────────────────────────────────────────────
      // Track onboarding completion
      if (agentData.onboardingCompleted && agentData.persona) {
        setIsOnboardingCompleted(true)
        setPersona(agentData.persona)
        setShowPersonaModal(true)
        setChatMode("home")
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? {
                ...m,
                content: agentData.content || "",
                isLoading: false,
                agentUsed: agentData.agentUsed,
                intent: agentData.intent,
              }
            : m
        )
      )

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong"
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, content: "", isLoading: false, error: errorMessage }
            : m
        )
      )
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages, aspectRatio, uploadedImage, currentChatId, token, chatMode])

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInput(suggestion)
    setTemplateInsertToken((n) => n + 1)
  }, [])

  const handleInsertStyle = useCallback((styleName: string) => {
    setInput((prev) => {
      const trimmed = prev.trim()
      if (!trimmed) return styleName
      if (trimmed.endsWith(",") || trimmed.endsWith(".")) {
        return `${trimmed} ${styleName}`
      }
      return `${trimmed}, ${styleName}`
    })
    setTemplateInsertToken((n) => n + 1)
  }, [])

  const handleRetry = useCallback(
    (messageId: string) => {
      const msgIndex = messages.findIndex((m) => m.id === messageId)
      if (msgIndex < 1) return
      const userMsg = messages[msgIndex - 1]
      if (userMsg.role !== "user") return
      setInput(userMsg.content)
      setMessages((prev) => prev.filter((_, i) => i < msgIndex - 1))
    },
    [messages]
  )

  const handleNewChat = useCallback(() => {
    setMessages([])
    setInput("")
    setIsLoading(false)
    setLightboxImage(null)
    setCurrentChatId(null)
    setChatMode("home")
    // Refresh history so the just-ended chat appears
    fetchChatHistory()
  }, [fetchChatHistory])

  const hasMessages = messages.length > 0

  return (
    <div
      data-vc-theme={theme}
      className="relative flex flex-col h-dvh"
      style={{ background: "var(--vc-bg-base)", color: "var(--vc-text)" }}
    >
      {/* Dynamic ambient gradient (drifts slowly) */}
      <div className="vc-ambient z-0" />
      {/* Premium paper-grain texture (visible only in light mode) */}
      <div className="vc-paper-grain z-0" />
      {/* Premium Header */}
      <header
        className="relative z-20 flex-shrink-0 flex items-center justify-between px-4 md:px-6 py-3 backdrop-blur-2xl"
        style={{
          borderBottom: "1px solid var(--vc-divider)",
          background: "var(--vc-glass-bg)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="relative size-9 rounded-xl flex items-center justify-center backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(135deg, var(--vc-glow-1) 0%, var(--vc-glow-3) 100%)",
              border: "1px solid var(--vc-glass-border)",
              boxShadow: "0 0 24px var(--vc-glow-1)",
            }}
          >
            <Sparkles
              className="size-[18px]"
              style={{ color: "var(--vc-accent-text)" }}
            />
          </div>
          <div className="flex flex-col">
            <h1
              className="text-base font-semibold tracking-tight leading-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span
                className="bg-clip-text text-transparent italic"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, #2563EB 0%, #22D3EE 100%)",
                }}
              >
                {chatMode === "onboarding" ? "Vizzy Onboarding" : "Vizzy"}
              </span>
            </h1>
            <span
              className="text-[10px] tracking-wide uppercase leading-none mt-0.5"
              style={{ color: chatMode === "onboarding" ? "var(--vc-accent-text)" : "var(--vc-text-faint)" }}
            >
              {chatMode === "onboarding" ? "Deep Persona Setup" : "Creative Studio"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-[var(--vc-text-muted)] hover:text-[var(--vc-accent-text)] hover:bg-[var(--vc-glass-hover)] rounded-xl"
                  aria-label="Go to homepage"
                >
                  <Home className="size-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Home</TooltipContent>
          </Tooltip>

          {hasMessages && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleNewChat}
                    className="text-[var(--vc-text-muted)] hover:text-[var(--vc-accent-text)] hover:bg-[var(--vc-glass-hover)] rounded-xl"
                    aria-label="New conversation"
                  >
                    <Plus className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">New chat</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleNewChat}
                    className="text-[var(--vc-text-muted)] hover:text-rose-500 hover:bg-rose-500/10 rounded-xl"
                    aria-label="Clear conversation"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Clear chat</TooltipContent>
              </Tooltip>
            </>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-[var(--vc-text-muted)] hover:text-[var(--vc-accent-text)] hover:bg-[var(--vc-glass-hover)] rounded-xl"
                      aria-label="Select Voice"
                    >
                      <Volume2 className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Voice: {selectedVoice.name}</TooltipContent>
                </Tooltip>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-[var(--vc-glass-strong)] border-[var(--vc-glass-border-strong)] text-[var(--vc-text)] backdrop-blur-2xl" data-vc-theme={theme}>
              {VOICE_OPTIONS.map((voice) => (
                <DropdownMenuItem
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice)}
                  className={selectedVoice.id === voice.id ? "bg-cyan-400/20 font-medium text-[var(--vc-text)]" : "text-[var(--vc-text)]"}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{voice.name}</span>
                    <span className="text-[10px] text-[var(--vc-text-muted)] uppercase tracking-wider">{voice.provider}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={selectedStyle ? "default" : "ghost"}
                      size="icon-sm"
                      className={selectedStyle ? "rounded-xl transition-all duration-300 bg-cyan-500 hover:bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]" : "rounded-xl transition-all duration-300 text-[var(--vc-text-muted)] hover:text-[var(--vc-accent-text)] hover:bg-[var(--vc-glass-hover)]"}
                      aria-label="Select Art Style"
                    >
                      <Palette className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {selectedStyle ? `Style: ${selectedStyle}` : "Style Transfer"}
                  </TooltipContent>
                </Tooltip>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 max-h-80 overflow-y-auto bg-[var(--vc-glass-strong)] border-[var(--vc-glass-border-strong)] text-[var(--vc-text)] backdrop-blur-2xl" data-vc-theme={theme}>
              <div className="px-2 py-1.5 text-xs font-semibold text-[var(--vc-text-muted)] border-b border-[var(--vc-glass-border)] uppercase tracking-wider">
                Select Art Style
              </div>
              <DropdownMenuItem
                onClick={() => setSelectedStyle(null)}
                className={selectedStyle === null ? "bg-cyan-400/20 font-medium text-[var(--vc-text)]" : "text-[var(--vc-text)]"}
              >
                <span className="text-sm">None (Normal Chat)</span>
              </DropdownMenuItem>
              {ART_STYLES.map((style) => (
                <DropdownMenuItem
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={selectedStyle === style ? "bg-cyan-400/20 font-medium text-[var(--vc-text)]" : "text-[var(--vc-text)]"}
                >
                  <span className="text-sm">{style}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={showChatHistory ? "default" : "ghost"}
                size="icon-sm"
                onClick={() => {
                  setShowChatHistory((v) => {
                    const next = !v
                    if (next) fetchChatHistory()
                    return next
                  })
                }}
                className={showChatHistory
                  ? "rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                  : "text-[var(--vc-text-muted)] hover:text-[var(--vc-accent-text)] hover:bg-[var(--vc-glass-hover)] rounded-xl"
                }
                aria-label="Chat history"
              >
                <Clock className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Chat History</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/gallery">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-[var(--vc-text-muted)] hover:text-[var(--vc-accent-text)] hover:bg-[var(--vc-glass-hover)] rounded-xl"
                  aria-label="View gallery"
                >
                  <ImageIcon className="size-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Gallery</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={toggleTheme}
                className="text-[var(--vc-text-muted)] hover:text-[var(--vc-accent-text)] hover:bg-[var(--vc-glass-hover)] rounded-xl"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Toggle theme</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/subscription">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-[var(--vc-text-muted)] hover:text-[var(--vc-accent-text)] hover:bg-[var(--vc-glass-hover)] rounded-xl"
                  aria-label="Subscription and credits"
                >
                  <Zap className="size-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Credits</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/profile">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-[var(--vc-text-muted)] hover:text-[var(--vc-accent-text)] hover:bg-[var(--vc-glass-hover)] rounded-xl"
                  aria-label="User profile"
                >
                  <User className="size-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">{user?.email}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleLogout}
                className="text-[var(--vc-text-muted)] hover:text-rose-500 hover:bg-rose-500/10 rounded-xl"
                aria-label="Logout"
              >
                <LogOut className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Logout</TooltipContent>
          </Tooltip>
        </div>
      </header>

      {/* Chat Area with History Sidebar */}
      <div className="relative z-10 flex-1 overflow-hidden flex">
        {/* ─── Chat History Sidebar ─── */}
        <div
          className={`flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden border-r border-[var(--vc-divider)] ${
            showChatHistory ? 'w-72 md:w-80' : 'w-0'
          }`}
          style={{ background: 'var(--vc-glass-bg)' }}
        >
          <div className="w-72 md:w-80 h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--vc-divider)]">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4" style={{ color: 'var(--vc-accent-text)' }} />
                <h2 className="text-sm font-semibold" style={{ color: 'var(--vc-text)' }}>Chat History</h2>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setShowChatHistory(false)}
                className="text-[var(--vc-text-muted)] hover:text-[var(--vc-text)] hover:bg-[var(--vc-glass-hover)] rounded-lg"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>

            {/* New Chat Button */}
            <div className="px-3 py-2">
              <Button
                variant="ghost"
                onClick={() => { handleNewChat(); setShowChatHistory(false) }}
                className="w-full justify-start gap-2 text-xs font-semibold rounded-xl border border-dashed border-[var(--vc-glass-border-strong)] hover:border-cyan-500/50 hover:bg-cyan-500/5 text-[var(--vc-accent-text)] h-9"
              >
                <Plus className="size-3.5" />
                New Conversation
              </Button>
            </div>

            {/* Chat List */}
            <div
              className="flex-1 overflow-y-auto px-2 pb-3 space-y-1"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(34, 211, 238, 0.3) transparent',
              }}
            >
              {isLoadingHistory ? (
                <div className="flex items-center justify-center py-12">
                  <div className="size-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : chatHistory.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <MessageSquare className="size-8 mx-auto mb-3" style={{ color: 'var(--vc-text-faint)' }} />
                  <p className="text-xs font-medium" style={{ color: 'var(--vc-text-muted)' }}>No previous chats</p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--vc-text-faint)' }}>Start a conversation and it will appear here</p>
                </div>
              ) : (
                chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => loadChat(chat.id)}
                    className={`w-full text-left rounded-xl px-3 py-2.5 transition-all duration-200 group relative ${
                      currentChatId === chat.id
                        ? 'bg-cyan-500/15 border border-cyan-500/30'
                        : 'hover:bg-[var(--vc-glass-hover)] border border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate" style={{ color: 'var(--vc-text)' }}>
                          {chat.title}
                        </p>
                        {chat.lastMessage && (
                          <p className="text-[10px] truncate mt-0.5" style={{ color: 'var(--vc-text-muted)' }}>
                            {chat.lastMessage}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-medium" style={{ color: 'var(--vc-text-faint)' }}>
                            {new Date(chat.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-[9px]" style={{ color: 'var(--vc-text-faint)' }}>
                            {chat.messageCount} msgs
                          </span>
                          {chat.hasImages && (
                            <ImageIcon className="size-2.5" style={{ color: 'var(--vc-accent-text)' }} />
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => deleteChatFromHistory(chat.id, e)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-rose-500/10 hover:text-rose-400 text-[var(--vc-text-faint)]"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ─── Main Chat Area ─── */}
        <div className="flex-1 overflow-y-auto scroll-smooth relative">
          {isLoadingChat ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="size-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-medium" style={{ color: 'var(--vc-text-muted)' }}>Loading conversation…</p>
              </div>
            </div>
          ) : !hasMessages ? (
            <WelcomeScreen
              onSuggestionClick={handleSuggestionClick}
              isOnboardingCompleted={isOnboardingCompleted}
              onStartOnboarding={handleStartOnboarding}
            />
          ) : (
            <div className="flex flex-col gap-5 py-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  selectedVoice={selectedVoice}
                  onImageClick={(url, prompt) => {
                    setLightboxImage(url)
                    setLightboxPrompt(prompt)
                  }}
                  onQuoteMessage={(text, sender) => {
                    setInput((prev) => {
                      const quote = `> [${sender}]: "${text}"\n\n`;
                      return prev ? quote + prev : quote;
                    });
                  }}
                  onRetry={
                    message.error ? () => handleRetry(message.id) : undefined
                  }
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div
        className="relative z-20 flex-shrink-0 pb-4 pt-2"
        style={{
          background:
            "linear-gradient(to top, var(--vc-bg-input-fade), color-mix(in srgb, var(--vc-bg-input-fade) 95%, transparent), transparent)",
        }}
      >
        {selectedStyle && (
          <div className="w-full max-w-3xl mx-auto px-4 mb-2 flex items-center justify-between bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-2.5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2">
              <Palette className="size-4 text-cyan-300 animate-pulse" />
              <div className="text-xs">
                <span className="font-semibold text-cyan-300">Style Transfer:</span>{" "}
                <span className="text-slate-200">{selectedStyle}</span>
              </div>
            </div>
            {!uploadedImage ? (
              <span className="text-[10px] text-cyan-300/80 animate-pulse font-medium">
                Please upload an image to apply this style
              </span>
            ) : (
              <span className="text-[10px] text-emerald-400 font-medium">
                Image ready! Click Send to generate
              </span>
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setSelectedStyle(null)}
              className="h-6 w-6 text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-md"
              aria-label="Disable style transfer"
            >
              <X className="size-3" />
            </Button>
          </div>
        )}
        <div className="w-full max-w-3xl mx-auto px-4 mb-2 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowStylesReference(true)}
            className="text-[11px] font-semibold px-3.5 py-1.5 h-auto rounded-xl border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] hover:bg-[var(--vc-glass-hover)] text-[var(--vc-accent-text)] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Palette className="size-3.5" />
            Quick Reference For Some Common Art Styles
          </Button>
        </div>
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          aspectRatio={aspectRatio}
          onAspectRatioChange={setAspectRatio}
          templateInsertToken={templateInsertToken}
          uploadedFile={uploadedImage}
          onFileUpload={(fileUrl, fileName) => {
            setUploadedImage({
              url: fileUrl,
              fileName: fileName,
            })
          }}
          onFileRemove={() => setUploadedImage(null)}
        />
      </div>

      {/* Lightbox */}
      <ImageLightbox
        imageUrl={lightboxImage}
        prompt={lightboxPrompt}
        onClose={() => {
          setLightboxImage(null)
          setLightboxPrompt("")
        }}
      />

      {/* Art Styles Reference Guide */}
      <ArtStylesReference
        isOpen={showStylesReference}
        onClose={() => setShowStylesReference(false)}
        onInsertStyle={handleInsertStyle}
        onPreviewImage={(url, title) => {
          setLightboxImage(url)
          setLightboxPrompt(title)
        }}
      />

      {/* Deep Persona Modal */}
      {showPersonaModal && persona && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-8 border border-[var(--vc-glass-border-strong)] bg-[var(--vc-glass-strong)] backdrop-blur-3xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col gap-6"
          >
            {/* Ambient gradients */}
            <div className="absolute -left-16 -top-16 size-48 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, var(--vc-glow-1) 0%, transparent 70%)" }} />
            <div className="absolute -right-16 -bottom-16 size-48 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, var(--vc-glow-3) 0%, transparent 70%)" }} />

            <div className="flex items-start justify-between z-10">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                  ✨ Core Profile Synced
                </span>
                <h2 className="font-serif text-3xl font-extrabold text-[var(--vc-text)] mt-3">
                  Your Deep Persona Profile
                </h2>
                <p className="text-xs text-[var(--vc-text-muted)] mt-1">
                  Generated by Vizzy based on your unique aesthetic sensibility, lifestyle and values.
                </p>
              </div>
              <button
                onClick={() => setShowPersonaModal(false)}
                className="text-[var(--vc-text-muted)] hover:text-[var(--vc-text)] hover:bg-[var(--vc-glass-hover)] p-2 rounded-xl transition-all"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-6 z-10 overflow-y-auto pr-1">
              {/* Identity Section */}
              <div className="rounded-2xl p-5 border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] backdrop-blur-md">
                <h4 className="text-sm font-semibold text-[var(--vc-accent-text)] uppercase tracking-wider mb-3">Identity &amp; Rhythms</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[var(--vc-text-faint)] tracking-wider">Preferred Name</label>
                    <p className="text-sm font-medium text-[var(--vc-text)] mt-0.5">{persona.identity?.preferred_name || persona.identity?.name || "Explorer"}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[var(--vc-text-faint)] tracking-wider">Location</label>
                    <p className="text-sm font-medium text-[var(--vc-text)] mt-0.5">{persona.identity?.location?.city ? `${persona.identity.location.city}, ${persona.identity.location.country || ""}` : "Not specified"}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[var(--vc-text-faint)] tracking-wider">Occupation</label>
                    <p className="text-sm font-medium text-[var(--vc-text)] mt-0.5">{persona.vocation_and_passions?.occupation || "Not specified"}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[var(--vc-text-faint)] tracking-wider">Ideal Vibe / Home Pace</label>
                    <p className="text-sm font-medium text-[var(--vc-text)] mt-0.5 capitalize">{persona.lifestyle?.home_mood_intent || "Not specified"}</p>
                  </div>
                </div>
              </div>

              {/* Aesthetic Profile */}
              <div className="rounded-2xl p-5 border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] backdrop-blur-md">
                <h4 className="text-sm font-semibold text-[var(--vc-accent-text)] uppercase tracking-wider mb-3">Aesthetic &amp; Visual Styles</h4>
                <div className="flex flex-col gap-3">
                  {persona.aesthetics?.sensibility_notes && (
                    <p className="text-xs text-[var(--vc-text)] italic">
                      &ldquo;{persona.aesthetics.sensibility_notes}&rdquo;
                    </p>
                  )}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[var(--vc-text-faint)] tracking-wider">Visual Styles &amp; Eras</label>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {[
                        ...(persona.aesthetics?.visual_style_descriptors || []),
                        ...(persona.aesthetics?.design_eras_of_interest || []),
                        ...(persona.aesthetics?.art_styles || [])
                      ].map((item: any, idx: number) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg text-xs bg-[var(--vc-glass-hover)] border border-[var(--vc-glass-border)] text-[var(--vc-text)] capitalize">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  {persona.aesthetics?.colour_palette_preference?.length > 0 && (
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[var(--vc-text-faint)] tracking-wider">Instinctive Palette</label>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {persona.aesthetics.colour_palette_preference.map((item: string, idx: number) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 capitalize">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Core Values */}
              {persona.values_and_beliefs?.core_values?.length > 0 && (
                <div className="rounded-2xl p-5 border border-[var(--vc-glass-border)] bg-[var(--vc-glass-bg)] backdrop-blur-md">
                  <h4 className="text-sm font-semibold text-[var(--vc-accent-text)] uppercase tracking-wider mb-3">Core Values &amp; Beliefs</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {persona.values_and_beliefs.core_values.map((val: string, idx: number) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 z-10 pt-4 border-t border-[var(--vc-divider)]">
              <Button
                variant="ghost"
                onClick={() => setShowPersonaModal(false)}
                className="bg-[var(--vc-glass-hover)] hover:bg-[var(--vc-glass-border)] border border-[var(--vc-glass-border)] text-xs font-semibold px-5 py-2 rounded-xl"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowPersonaModal(false)
                  handleNewChat()
                }}
                className="text-white text-xs font-semibold px-5 py-2 rounded-xl shadow-lg"
                style={{ background: "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)" }}
              >
                Let's Make Art!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
