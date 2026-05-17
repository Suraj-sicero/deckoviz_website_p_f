

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
import { Sparkles, Plus, Sun, Moon, Trash2, Clock, LogOut, User, Zap, Music, Volume2 } from "lucide-react"
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

function isMusicGenerationIntent(input: string): boolean {
  try {
    const lowerInput = input.toLowerCase().trim()
    
    // Simple music keyword check
    const musicKeywords = ["song", "music", "muisc", "msuic", "compose", "beat", "track", "melody", "create a song", "create music", "generate music"]
    
    for (const keyword of musicKeywords) {
      if (lowerInput.includes(keyword)) {
        console.log("[v0] Music keyword detected:", keyword)
        return true
      }
    }
    
    return false
  } catch (error) {
    console.error("[v0] Error in isMusicGenerationIntent:", error)
    return false
  }
}

function isImageGenerationIntent(input: string): boolean {
  try {
    const lowerInput = input.toLowerCase().trim()

    // Video and music take priority over image
    if (isVideoGenerationIntent(lowerInput)) return false
    const musicKeywords = ["song", "music", "muisc", "msuic", "beat", "compose", "melody", "track"]
    if (musicKeywords.some(kw => lowerInput.includes(kw))) {
      console.log("[v0] Music keywords detected, skipping image generation")
      return false
    }

    // Then check for image keywords
    const imageKeywords = ["generate", "create", "make", "draw", "paint", "design", "visualize", "picture", "image", "photo", "artwork"]
    return imageKeywords.some(kw => lowerInput.includes(kw))
  } catch (error) {
    console.error("[v0] Error in isImageGenerationIntent:", error)
    return false
  }
}

function isVideoGenerationIntent(input: string): boolean {
  const lower = input.toLowerCase().trim()
  const videoKeywords = [
    "video", "animate", "animation", "motion", "moving", "clip",
    "make it move", "bring to life", "loop",
  ]
  return videoKeywords.some(kw => lower.includes(kw))
}

function isConversational(input: string): boolean {
  const conversationKeywords = ["tell me", "explain", "what is", "why", "how", "about", "history"]
  return conversationKeywords.some(kw => input.toLowerCase().includes(kw))
}
  

function buildRefinedPrompt(messages: ChatMessageType[], newInput: string): string {
  const previousImages = messages
    .filter((m) => m.role === "assistant" && m.images && m.images.length > 0)
    .slice(-1)

  // Also get the last assistant message (even without images) for suggested prompts
  const lastAssistantMessages = messages
    .filter((m) => m.role === "assistant")
    .slice(-1)



  // For short positive responses like "yup", "good", "yes" - use the exact previous prompt
  // Also match phrases like "ok lets generate that", "lets make that", etc.
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
    // For positive responses, check the order of messages:
    // - If the IMMEDIATE previous message is an image, and user says "yup/ok", regenerate from that
    // - Otherwise, use the last text message (latest suggestion)
    
    const lastMessage = messages.slice(-1)[0]
    
    // If the immediate previous message has an image AND it's an assistant message
    if (lastMessage?.role === "assistant" && lastMessage?.images && lastMessage.images.length > 0) {
      // User is asking to regenerate the immediate previous image
      const lastImagePrompt = lastMessage.images[0]?.prompt
      if (lastImagePrompt) {
        return lastImagePrompt
      }
    }
    
    // Otherwise, use the latest assistant text message (a suggestion)
    if (lastAssistantMessages.length > 0) {
      const lastAssistantContent = lastAssistantMessages[0].content
      return lastAssistantContent
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

  // For explicit modifications, append the user's request
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
  if (numImages > 1) {
    return `Here are ${numImages} variations based on your vision:`
  }

  // Contextual responses based on intent
  const lowerPrompt = prompt.toLowerCase()
  if (lowerPrompt.includes("poster") || lowerPrompt.includes("signage"))
    return "Here's your design:"
  if (lowerPrompt.includes("product") || lowerPrompt.includes("photo"))
    return "Here's the product visual:"
  if (lowerPrompt.includes("brand") || lowerPrompt.includes("marketing"))
    return "Here's your brand visual:"
  if (lowerPrompt.includes("dream") || lowerPrompt.includes("emotion") || lowerPrompt.includes("feel"))
    return "Here's what I envisioned for you:"
  if (lowerPrompt.includes("story") || lowerPrompt.includes("scene"))
    return "Here's the scene I created:"
  if (lowerPrompt.includes("moodboard") || lowerPrompt.includes("vision board"))
    return "Here's your moodboard concept:"

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

    setMessages((prev) => [...prev, userMessage, assistantMessage])
    setInput("")
    setIsLoading(true)

    try {
      const isImageGen = isImageGenerationIntent(trimmedInput)
      const isMusicGen = isMusicGenerationIntent(trimmedInput)
      const isVideoGen = isVideoGenerationIntent(trimmedInput)
      console.log("[v0] User input:", trimmedInput)
      console.log("[v0] Is image generation intent:", isImageGen)
      console.log("[v0] Is music generation intent:", isMusicGen)
      console.log("[v0] Is video generation intent:", isVideoGen)
      
      // Check if user has uploaded an image and wants to enhance it
      const hasUploadedImage = uploadedImage !== null
      console.log("[v0] Has uploaded image:", hasUploadedImage)



      if (hasUploadedImage && trimmedInput) {
        // User provided an editing instruction with uploaded image - use Stability AI inpainting
        console.log("[v0] Calling inpaint endpoint with Stability AI")
        
        const response = await fetch(`${API_BASE_URL}/api/vizzy-canvas/inpaint`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageUrl: uploadedImage!.url,
            prompt: trimmedInput,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to edit image")
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? {
                  ...m,
                  content: `I've edited your image: ${trimmedInput}`,
                  images: [
                    {
                      url: data.editedImage.url,
                      prompt: trimmedInput,
                    },
                  ],
                  uploadedImages: [
                    {
                      id: generateId(),
                      url: uploadedImage!.url,
                      fileName: uploadedImage!.fileName,
                      fileSize: 0,
                      uploadedAt: Date.now(),
                    },
                  ],
                  isLoading: false,
                }
              : m
          )
        )
        
        setUploadedImage(null)
      } else if (hasUploadedImage) {
        // Display uploaded image without editing instruction
        console.log("[v0] Displaying uploaded image")
        
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? {
                  ...m,
                  content: `I can see your uploaded image. What would you like me to edit? Describe the changes (like "remove the cat") and I'll apply them using AI inpainting.`,
                  uploadedImages: [
                    {
                      id: generateId(),
                      url: uploadedImage!.url,
                      fileName: uploadedImage!.fileName,
                      fileSize: 0,
                      uploadedAt: Date.now(),
                    },
                  ],
                  isLoading: false,
                }
              : m
          )
        )
        
        setUploadedImage(null)
      } else if (isMusicGen) {
        // Music generation flow
        console.log("[v0] Starting music generation for prompt:", trimmedInput)
        
        let response
        let data
        let retries = 3
        let lastError
        
        while (retries > 0) {
          try {
            response = await fetch(`${API_BASE_URL}/api/vizzy-canvas/music/generate`, {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                ...(token && { "Authorization": `Bearer ${token}` }),
              },
              body: JSON.stringify({
                prompt: trimmedInput,
              }),
            })
            
            console.log("[v0] Music API response status:", response.status)
            const responseText = await response.text()
            console.log("[v0] Music API raw response:", responseText.substring(0, 200))
            
            try {
              data = JSON.parse(responseText)
            } catch (e) {
              console.error("[v0] Failed to parse music API response as JSON:", e)
              throw new Error("Music API returned invalid JSON")
            }
            console.log("[v0] Music API response data:", data)

            if (!response.ok) {
              console.error("[v0] Music generation error:", data.error)
              throw new Error(data.error || "Failed to generate music")
            }
            
            break // Success, exit retry loop
          } catch (error) {
            lastError = error
            retries--
            console.error("[v0] Music generation attempt failed:", error.message, "Retries left:", retries)
            if (retries > 0) {
              await new Promise(resolve => setTimeout(resolve, 500)) // Wait 500ms before retry
            }
          }
        }
        
        if (!data) {
          throw lastError || new Error("Failed to generate music after retries")
        }

        const musicMessage = `I'm creating a song based on your description. This typically takes 30-60 seconds. Your music will be ready soon!`

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? {
                  ...m,
                  content: musicMessage,
                  music: [
                    {
                      id: data.generationId,
                      title: data.title || "Untitled",
                      audioUrl: data.audioData ? `data:audio/wav;base64,${data.audioData}` : data.audioUrl,
                      prompt: trimmedInput,
                      status: data.status,
                      createdAt: Date.now(),
                    },
                  ],
                  isLoading: true,
                }
              : m
          )
        )
      } else if (isVideoGen) {
        // Video generation flow (fal.ai LTX-Video). Image-to-video if a prior
        // generated image exists, else text-to-video.
        const lastImage = [...messages].reverse().find(
          (m) => m.role === "assistant" && m.images && m.images.length > 0
        )
        const sourceImageUrl = lastImage?.images?.[0]?.url

        const submitRes = await fetch(`${API_BASE_URL}/api/vizzy-canvas/video/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
          },
          body: JSON.stringify({
            prompt: trimmedInput,
            imageUrl: sourceImageUrl,
          }),
        })

        const submitData = await submitRes.json()
        if (!submitRes.ok) {
          throw new Error(submitData.error || "Failed to start video generation")
        }

        const videoId = generateId()
        const videoModel = submitData.model || "fal-ai/ltx-video"

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? {
                  ...m,
                  content: sourceImageUrl
                    ? "Animating your image. This usually takes 15-30 seconds."
                    : "Generating your video. This usually takes 15-30 seconds.",
                  videos: [
                    {
                      id: videoId,
                      requestId: submitData.requestId,
                      model: videoModel,
                      prompt: trimmedInput,
                      sourceImageUrl,
                      status: "in_queue",
                      createdAt: Date.now(),
                    },
                  ],
                  isLoading: true,
                }
              : m
          )
        )

        // Poll for completion (up to ~2 min)
        const maxAttempts = 40
        let attempt = 0
        let finalUrl: string | undefined
        let finalStatus: "completed" | "failed" = "failed"
        while (attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, 3000))
          const pollRes = await fetch(
            `${API_BASE_URL}/api/vizzy-canvas/video/status?op=${encodeURIComponent(submitData.requestId)}`,
            { headers: { ...(token && { "Authorization": `Bearer ${token}` }) } }
          )
          const pollData = await pollRes.json()
          if (pollData.status === "completed") {
            finalUrl = pollData.videoUrl
            finalStatus = "completed"
            break
          }
          if (pollData.status === "failed") {
            finalStatus = "failed"
            break
          }
          attempt++
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? {
                  ...m,
                  content:
                    finalStatus === "completed"
                      ? "Here's your video:"
                      : "Video generation timed out. Try again with a simpler prompt.",
                  videos: m.videos?.map((v) =>
                    v.requestId === submitData.requestId
                      ? { ...v, status: finalStatus, videoUrl: finalUrl }
                      : v
                  ),
                  isLoading: false,
                }
              : m
          )
        )
      } else if (isImageGen) {
        // Image generation flow
        const refinedPrompt = buildRefinedPrompt(
          [...messages, userMessage],
          trimmedInput
        )
        
        const numResults = parseNumImages(trimmedInput)

        const response = await fetch(`${API_BASE_URL}/api/vizzy-canvas/generate`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
          },
          body: JSON.stringify({
            prompt: refinedPrompt,
            aspect_ratio: aspectRatio,
            num_results: numResults,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to generate image")
        }

        const assistantText = generateAssistantText(data.images.length, refinedPrompt)

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? {
                  ...m,
                  content: assistantText,
                  images: data.images.map((img: { url: string; seed?: number }) => ({
                    url: img.url,
                    prompt: refinedPrompt,
                    seed: img.seed,
                  })),
                  isLoading: false,
                }
              : m
          )
        )

        // Save images to local cache for gallery view
        data.images.forEach((img: { url: string; seed?: number }, index: number) => {
          imageCache.save({
            id: `img-${Date.now()}-${index}`,
            image_url: img.url,
            prompt: refinedPrompt,
            aspect_ratio: aspectRatio,
            created_at: new Date().toISOString(),
            is_favorited: false,
          })
        })
        console.log("[v0] Saved", data.images.length, "images to local cache")
        console.log("[v0] Total cached images:", imageCache.getAll().length)

        // Analyze the generated image
        if (data.images.length > 0 && refinedPrompt) {
          try {
            const analysisResponse = await fetch(`${API_BASE_URL}/api/vizzy-canvas/analyze-image`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                prompt: refinedPrompt,
                imageUrl: data.images[0].url,
              }),
            })

            if (analysisResponse.ok) {
              const analysisData = await analysisResponse.json()
              
              // Add analysis as a follow-up message
              setMessages((prev) => [
                ...prev,
                {
                  id: `analysis_${Date.now()}`,
                  role: "assistant",
                  content: analysisData.analysis,
                  images: [],
                  isLoading: false,
                  timestamp: Date.now(),
                },
              ])
            }
          } catch (analysisError) {
            // Silently fail - image generation succeeded even if analysis fails
          }
        }
      } else {
        // LLM chat flow
        console.log("[v0] Using LLM chat flow")
        const conversationMessages = [
          ...messages,
          userMessage,
        ].map((m) => ({
          role: m.role,
          content: m.content,
        }))

        console.log("[v0] Sending to chat API:", conversationMessages.length, "messages")
        const response = await fetch(`${API_BASE_URL}/api/vizzy-canvas/chat`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
          },
          body: JSON.stringify({
            messages: conversationMessages,
            chatId: currentChatId,
          }),
        })

        const data = await response.json()
        console.log("[v0] Chat API response status:", response.status)
        console.log("[v0] Chat API response:", data)

        if (!response.ok) {
          throw new Error(data.error || "Failed to generate response")
        }

        if (data.chatId && data.chatId !== currentChatId) {
          setCurrentChatId(data.chatId)
        }

        console.log("[v0] Chat response content:", data.content)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? {
                  ...m,
                  content: data.content,
                  isLoading: false,
                }
              : m
          )
        )
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong"
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
  }, [input, isLoading, messages, aspectRatio, uploadedImage])

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
            <h1 className="text-base font-serif font-semibold tracking-tight leading-none">
              <span
                className="bg-clip-text text-transparent italic"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, #2563EB 0%, #22D3EE 100%)",
                }}
              >
                Vizzy
              </span>
            </h1>
            <span
              className="text-[10px] tracking-wide uppercase leading-none mt-0.5"
              style={{ color: "var(--vc-text-faint)" }}
            >
              Creative Studio
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
          <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
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
          uploadedImage={uploadedImage}
          onImageUpload={(imageUrl) => {
            setUploadedImage({
              url: imageUrl,
              fileName: 'uploaded-image.png',
            })
          }}
          onImageRemove={() => setUploadedImage(null)}
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
    </div>
  )
}
