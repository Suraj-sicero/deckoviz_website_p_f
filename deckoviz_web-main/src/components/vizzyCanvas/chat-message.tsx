

import { useState } from "react"
import { cn } from "./lib/utils"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"
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
} from "lucide-react"
import MusicPlayer from "./music-player"
import type { ChatMessage as ChatMessageType } from "./lib/types"

interface ChatMessageProps {
  message: ChatMessageType
  onImageClick: (imageUrl: string, prompt: string) => void
  onRetry?: () => void
}

export function ChatMessage({ message, onImageClick, onRetry }: ChatMessageProps) {
  const isUser = message.role === "user"

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
        <div className="flex-shrink-0 size-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mt-1">
          <Sparkles className="size-4 text-accent" />
        </div>
      )}

      <div className={cn("flex flex-col gap-3 max-w-[88%] md:max-w-[78%]", isUser && "items-end")}>
        {/* Text bubble */}
        {message.content && (
          <div
            className={cn(
              "rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words",
              isUser
                ? "bg-accent text-accent-foreground rounded-br-lg"
                : "bg-secondary/80 text-secondary-foreground rounded-bl-lg border border-border/40"
            )}
          >
            {message.content}
          </div>
        )}

        {/* Loading state */}
        {message.isLoading && (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="relative size-5 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
              </div>
              <span className="font-medium">Creating your vision...</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="relative aspect-square w-full max-w-sm rounded-2xl overflow-hidden bg-secondary/60 border border-border/40">
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
                <p className="text-xs font-medium text-muted-foreground mb-2 px-1">Your image:</p>
                <div className="grid grid-cols-1 gap-3 max-w-md">
                  {message.uploadedImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={img.url}
                          alt={img.fileName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-2 right-2 bg-blue-500/90 text-white text-xs px-2 py-1 rounded-full font-medium">
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
                  <p className="text-xs font-medium text-muted-foreground mb-2 px-1">Enhanced version:</p>
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
                    <imgCard
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

        {/* Error state */}
        {message.error && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-destructive/5 border border-destructive/20 text-sm">
            <span className="text-destructive flex-1">{message.error}</span>
            {onRetry && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRetry}
                className="gap-1.5 text-muted-foreground hover:text-foreground flex-shrink-0"
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
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-border"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 bg-secondary/60">
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
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

        {/* Action bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="bg-card/90 hover:bg-card text-foreground backdrop-blur-md shadow-sm border border-border/20"
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
                  className="bg-card/90 hover:bg-card text-foreground backdrop-blur-md shadow-sm border border-border/20"
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
                  className="bg-card/90 hover:bg-card text-foreground backdrop-blur-md shadow-sm border border-border/20"
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
