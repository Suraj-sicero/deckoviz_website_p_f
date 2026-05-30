

import { useState, useRef, useCallback, useEffect } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { ImageLightbox } from "./image-lightbox"
import { WelcomeScreen } from "./welcome-screen"
import { Button } from "./ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip"
import { Sparkles, Plus, Sun, Moon, Trash2, Clock, LogOut, User, Zap, Volume2 } from "lucide-react"
import { imageCache } from "./lib/image-cache"
import type { ChatMessage as ChatMessageType } from "./lib/types"
import { API_BASE_URL } from "../../lib/constants"
import { CanvasThemeProvider, useCanvasTheme } from "./lib/canvas-theme"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// ─────────────────────────────────────────────────────────────────────────────
// Vizzy 2.0 — Intent classification has moved to the backend (vizzyMasterAgent)
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

export function VizzyChat() {
  return (
    <CanvasThemeProvider>
      <VizzyChatInner />
    </CanvasThemeProvider>
  )
}

function VizzyChatInner() {
  const router = useNavigate()
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
    if (!trimmedInput || isLoading) return

    const userMessage: ChatMessageType = {
      id: generateId(),
      role: "user",
      content: trimmedInput,
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
      // ─────────────────────────────────────────────────────────────────────
      // VIZZY 2.0 — Step 1: Handle uploaded image (always client-detectable)
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

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? {
                  ...m,
                  content: `I've edited your image: ${trimmedInput}`,
                  images: [{ url: data.editedImage.url, prompt: trimmedInput }],
                  uploadedImages: [{
                    id: generateId(), url: uploadedImage!.url,
                    fileName: uploadedImage!.fileName, fileSize: 0, uploadedAt: Date.now(),
                  }],
                  isLoading: false,
                  agentUsed: "vizzy_pipeline",
                  intent: "image_editing",
                }
              : m
          )
        )
        setUploadedImage(null)
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
      // VIZZY 2.0 — Step 2: Send to Vizzy Master Agent
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

      console.log("[Vizzy2.0] Intent:", agentData.intent, "| Agent:", agentData.agentUsed)

      // ─────────────────────────────────────────────────────────────────────
      // VIZZY 2.0 — Step 3: If agent signals media delegation, call pipeline
      // The master agent doesn't handle media — it delegates back to the
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

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id
                ? {
                    ...m,
                    content: generateAssistantText(data.images.length, refinedPrompt),
                    images: data.images.map((img: { url: string; seed?: number }) => ({ url: img.url, prompt: refinedPrompt, seed: img.seed })),
                    isLoading: false,
                    agentUsed: "vizzy_pipeline",
                    intent: "image_generation",
                  }
              : m
            )
          )

          data.images.forEach((img: { url: string; seed?: number }, index: number) => {
            imageCache.save({ id: `img-${Date.now()}-${index}`, image_url: img.url, prompt: refinedPrompt, aspect_ratio: aspectRatio, created_at: new Date().toISOString(), is_favorited: false })
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
      // VIZZY 2.0 — Step 4: Conversational response from Master Agent
      // The agent returned a full content response — render it directly.
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
  }, [])

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
            <DropdownMenuContent align="end" className="w-48">
              {VOICE_OPTIONS.map((voice) => (
                <DropdownMenuItem
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice)}
                  className={selectedVoice.id === voice.id ? "bg-cyan-400/20" : ""}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{voice.name}</span>
                    <span className="text-[10px] text-slate-400/70 uppercase tracking-wider">{voice.provider}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/gallery">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-[var(--vc-text-muted)] hover:text-[var(--vc-accent-text)] hover:bg-[var(--vc-glass-hover)] rounded-xl"
                  aria-label="View generation history"
                >
                  <Clock className="size-4" />
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

      {/* Chat Area */}
      <div className="relative z-10 flex-1 overflow-y-auto scroll-smooth">
        {!hasMessages ? (
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

      {/* Input Area */}
      <div
        className="relative z-20 flex-shrink-0 pb-4 pt-2"
        style={{
          background:
            "linear-gradient(to top, var(--vc-bg-input-fade), color-mix(in srgb, var(--vc-bg-input-fade) 95%, transparent), transparent)",
        }}
      >
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
