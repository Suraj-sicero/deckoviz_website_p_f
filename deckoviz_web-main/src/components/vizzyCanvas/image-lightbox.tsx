

import { useEffect, useCallback, useState } from "react"
import { Button } from "./ui/button"
import { Download, X, Copy, Check, ZoomIn, ZoomOut } from "lucide-react"
import { cn } from "./lib/utils"

interface ImageLightboxProps {
  imageUrl: string | null
  prompt: string
  onClose: () => void
}

export function ImageLightbox({ imageUrl, prompt, onClose }: ImageLightboxProps) {
  const [zoomed, setZoomed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (imageUrl) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
      setZoomed(false)
      setCopied(false)
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [imageUrl, handleKeyDown])

  if (!imageUrl) return null

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = `vizzy-${prompt.slice(0, 30).replace(/[^a-z0-9]/gi, "-")}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch {
      window.open(imageUrl, "_blank")
    }
  }

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl animate-in fade-in-0 duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-20">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation()
              setZoomed(!zoomed)
            }}
            className="bg-card/80 backdrop-blur-md border-border/40 hover:bg-card shadow-sm"
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
          >
            {zoomed ? <ZoomOut className="size-4" /> : <ZoomIn className="size-4" />}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {prompt && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleCopyPrompt()
              }}
              className="bg-card/80 backdrop-blur-md border-border/40 hover:bg-card shadow-sm gap-1.5 text-xs"
            >
              {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy Prompt"}
            </Button>
          )}
          <Button
            variant="outline"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation()
              handleDownload()
            }}
            className="bg-card/80 backdrop-blur-md border-border/40 hover:bg-card shadow-sm"
            aria-label="Download image"
          >
            <Download className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={onClose}
            className="bg-card/80 backdrop-blur-md border-border/40 hover:bg-card shadow-sm"
            aria-label="Close preview"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      {/* Image */}
      <div
        className="relative flex flex-col items-center gap-4 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={`Generated: ${prompt}`}
          className={cn(
            "max-h-[80vh] object-contain rounded-2xl shadow-2xl transition-all duration-500 cursor-zoom-in",
            zoomed ? "max-w-[95vw] cursor-zoom-out" : "max-w-[85vw] md:max-w-[70vw]"
          )}
          onClick={() => setZoomed(!zoomed)}
        />

        {prompt && (
          <div className="absolute -bottom-10 text-xs text-muted-foreground/60 text-center max-w-lg px-4 leading-relaxed truncate">
            {prompt}
          </div>
        )}
      </div>
    </div>
  )
}
