

import { useState } from "react"
import { cn } from "./lib/utils"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"
import { API_BASE_URL } from "../../lib/constants"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip"
import {
  Download,
  Expand,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  Volume2,
  Loader2,
} from "lucide-react"
import MusicPlayer from "./music-player"
import VideoPlayer from "./video-player"
import type { ChatMessage as ChatMessageType } from "./lib/types"

interface ChatMessageProps {
  message: ChatMessageType
  onImageClick: (imageUrl: string, prompt: string) => void
  onRetry?: () => void
  selectedVoice?: { id: string; name: string; provider: string }
}

export function ChatMessage({ message, onImageClick, onRetry, selectedVoice }: ChatMessageProps) {
  const isUser = message.role === "user"
  const [isNarrating, setIsNarrating] = useState(false)

  const handleNarrate = async (text: string) => {
    setIsNarrating(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/vizzy-canvas/narrate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text, 
          provider: selectedVoice?.provider || "murf", 
          voiceId: selectedVoice?.id 
        }),
      })
      if (response.ok) {
        const data = await response.json()
        const audio = new Audio(data.audioUrl)
        audio.play()
      } else {
        const utterance = new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(utterance)
      }
    } catch (error) {
      console.error("Narration failed:", error)
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
    } finally {
      setIsNarrating(false)
    }
  }

  console.log('[CHAT MESSAGE] Rendering message:', { 
    role: message.role, 
    hasMusic: !!message.music, 
    musicLength: message.music?.length,
    music: message.music 
  })

  return (
    <div
      className={cn(
        "flex gap-3 max-w-3xl mx-auto w-full px-4 animate-in fade-in-0 slide-in-from-bottom-3 duration-400",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div
          className="flex-shrink-0 size-8 rounded-xl flex items-center justify-center mt-1 backdrop-blur-xl"
          style={{
            background:
              "linear-gradient(135deg, var(--vc-glow-1) 0%, var(--vc-glow-3) 100%)",
            border: "1px solid var(--vc-glass-border)",
            boxShadow: "0 0 18px var(--vc-glow-1)",
          }}
        >
          <Sparkles className="size-4" style={{ color: "var(--vc-accent-text)" }} />
        </div>
      )}

      <div className={cn("flex flex-col gap-3 max-w-[88%] md:max-w-[78%]", isUser && "items-end")}>
        {/* Text bubble */}
        {message.content && (
          <div
            className={cn(
              "rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words relative group backdrop-blur-xl",
              isUser
                ? "text-white rounded-br-lg shadow-[0_4px_24px_rgba(37,99,235,0.25)]"
                : "rounded-bl-lg"
            )}
            style={
              isUser
                ? {
                    background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }
                : {
                    background: "var(--vc-glass-bg)",
                    border: "1px solid var(--vc-glass-border)",
                    color: "var(--vc-text)",
                  }
            }
          >
            {message.content}
            {!isUser && (
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                onClick={() => handleNarrate(message.content)}
                disabled={isNarrating}
              >
                {isNarrating ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Volume2 className="size-3.5" />
                )}
              </Button>
            )}
          </div>
        )}

        {/* Loading state */}
        {message.isLoading && (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-3 text-sm text-[var(--vc-text-muted)]">
              <div className="relative size-5 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-2 animate-spin"
                  style={{
                    borderColor: "var(--vc-glass-border)",
                    borderTopColor: "var(--vc-accent-text)",
                  }}
                />
              </div>
              <span className="font-medium">Creating your vision...</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div
                className="relative aspect-square w-full max-w-sm rounded-2xl overflow-hidden backdrop-blur-xl"
                style={{
                  background: "var(--vc-glass-bg)",
                  border: "1px solid var(--vc-glass-border)",
                }}
              >
                <Skeleton className="absolute inset-0 rounded-2xl" />
                <div className="absolute inset-0 shimmer rounded-2xl" />
              </div>
            </div>
          </div>
        )}

        {/* Image grid */}
        {message.images && message.images.length > 0 && (
          <div className="flex flex-col gap-4 w-full">
            {/* Show uploaded image section if present */}
            {message.uploadedImages && message.uploadedImages.length > 0 && (
              <div className="w-full">
                <p className="text-xs font-medium text-[var(--vc-text-muted)] mb-2 px-1">Your image:</p>
                <div className="grid grid-cols-1 gap-3 max-w-md">
                  {message.uploadedImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-2xl backdrop-blur-xl"
                      style={{
                        background: "var(--vc-glass-bg)",
                        border: "1px solid var(--vc-glass-border)",
                        boxShadow: "var(--vc-glass-shadow)",
                      }}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={img.url}
                          alt={img.fileName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-2 right-2 bg-cyan-500/90 text-white text-xs px-2 py-1 rounded-full font-medium backdrop-blur-md">
                          Uploaded
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Generated/Enhanced images section */}
            {message.images.length > 0 && (
              <div className="w-full">
                {message.uploadedImages && message.uploadedImages.length > 0 && (
                  <p className="text-xs font-medium text-[var(--vc-text-muted)] mb-2 px-1">Enhanced version:</p>
                )}
                <div
                  className={cn(
                    "grid gap-3 w-full",
                    message.images.length === 1 && "grid-cols-1 max-w-md",
                    message.images.length === 2 && "grid-cols-2 max-w-lg",
                    message.images.length >= 3 && "grid-cols-2 max-w-lg"
                  )}
                >
                  {message.images.map((image, index) => (
                    <ImageCard
                      key={index}
                      url={image.url}
                      prompt={image.prompt}
                      index={index}
                      isUploaded={image.isUploaded}
                      onExpand={() => onImageClick(image.url, image.prompt)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Music player */}
        {message.music && message.music.length > 0 && (
          <div className="flex flex-col gap-4 w-full">
            {message.music.map((track, index) => (
              <MusicPlayer
                key={index}
                generationId={track.id}
                title={track.title}
                audioUrl={track.audioUrl}
                prompt={track.prompt}
                status={track.status}
              />
            ))}
          </div>
        )}

        {/* Video player */}
        {message.videos && message.videos.length > 0 && (
          <div className="flex flex-col gap-4 w-full">
            {message.videos.map((clip) => (
              <VideoPlayer key={clip.id} clip={clip} />
            ))}
          </div>
        )}

        {/* Error state */}
        {message.error && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-rose-500/10 border border-rose-400/30 text-sm backdrop-blur-xl">
            <span className="text-rose-500 flex-1" style={{ color: "#E11D48" }}>
              {message.error}
            </span>
            {onRetry && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRetry}
                className="gap-1.5 text-[var(--vc-text-muted)] hover:text-[var(--vc-accent-text)] flex-shrink-0"
              >
                <RotateCcw className="size-3.5" />
                Retry
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ImageCard({
  url,
  prompt,
  index,
  isUploaded,
  onExpand,
}: {
  url: string
  prompt: string
  index: number
  isUploaded?: boolean
  onExpand: () => void
}) {
  const [loaded, setLoaded] = useState(false)
  const [promptCopied, setPromptCopied] = useState(false)

  const handleDownload = async () => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = `vizzy-${prompt.slice(0, 30).replace(/[^a-z0-9]/gi, "-")}-${index}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch {
      window.open(url, "_blank")
    }
  }

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(prompt)
    setPromptCopied(true)
    setTimeout(() => setPromptCopied(false), 2000)
  }

  return (
    <div
      className="group relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "var(--vc-glass-bg)",
        border: "1px solid var(--vc-glass-border)",
        boxShadow: "var(--vc-glass-shadow)",
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {!loaded && (
          <div
            className="absolute inset-0"
            style={{ background: "var(--vc-glass-bg)" }}
          >
            <div className="absolute inset-0 shimmer" />
          </div>
        )}
        <img
          src={url}
          alt={`Generated: ${prompt}`}
          className={cn(
            "w-full h-full object-cover cursor-pointer transition-all duration-500",
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
            "group-hover:scale-[1.03]"
          )}
          onClick={onExpand}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/85 via-[#0B1220]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

        {/* Action bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="bg-black/30 hover:bg-black/45 text-white backdrop-blur-xl shadow-sm border border-white/20"
                onClick={handleCopyPrompt}
                aria-label="Copy prompt"
              >
                {promptCopied ? (
                  <Check className="size-3.5 text-green-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Copy prompt</TooltipContent>
          </Tooltip>

          <div className="flex items-center gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="bg-black/30 hover:bg-black/45 text-white backdrop-blur-xl shadow-sm border border-white/20"
                  onClick={onExpand}
                  aria-label="View full size"
                >
                  <Expand className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Full size</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="bg-black/30 hover:bg-black/45 text-white backdrop-blur-xl shadow-sm border border-white/20"
                  onClick={handleDownload}
                  aria-label="Download image"
                >
                  <Download className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Download</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}
