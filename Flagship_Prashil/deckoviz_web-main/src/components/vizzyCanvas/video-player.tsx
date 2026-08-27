import { useState } from "react"
import { Button } from "./ui/button"
import { Download, Copy, Check, Film, Loader2 } from "lucide-react"
import type { VideoClip } from "./lib/types"

interface VideoPlayerProps {
  clip: VideoClip
}

export default function VideoPlayer({ clip }: VideoPlayerProps) {
  const [copied, setCopied] = useState(false)

  const handleDownload = async () => {
    if (!clip.videoUrl) return
    try {
      const res = await fetch(clip.videoUrl)
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = `vizzy-${clip.prompt.slice(0, 30).replace(/[^a-z0-9]/gi, "-")}.mp4`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch {
      window.open(clip.videoUrl, "_blank")
    }
  }

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(clip.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const statusLabel =
    clip.status === "completed"
      ? "Ready"
      : clip.status === "failed"
        ? "Failed"
        : "Generating"
  const statusColor =
    clip.status === "completed"
      ? "#10B981"
      : clip.status === "failed"
        ? "#E11D48"
        : "var(--vc-accent-text)"

  return (
    <div
      className="flex flex-col gap-4 p-4 rounded-2xl backdrop-blur-xl"
      style={{
        background: "var(--vc-glass-bg)",
        border: "1px solid var(--vc-glass-border)",
        boxShadow: "var(--vc-glass-shadow)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-xl"
          style={{
            background:
              "linear-gradient(135deg, var(--vc-glow-1) 0%, var(--vc-glow-3) 100%)",
            border: "1px solid var(--vc-glass-border)",
          }}
        >
          <Film className="w-5 h-5" style={{ color: "var(--vc-accent-text)" }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-sm truncate"
            style={{ color: "var(--vc-text)" }}
          >
            {clip.status === "completed" ? "Video" : "Your video"}
          </h3>
          <p className="text-xs" style={{ color: statusColor }}>
            {statusLabel}
          </p>
        </div>
      </div>

      {clip.status === "completed" && clip.videoUrl && (
        <div
          className="relative overflow-hidden rounded-xl bg-black/40"
          style={{ border: "1px solid var(--vc-glass-border)" }}
        >
          <video
            src={clip.videoUrl}
            controls
            loop
            playsInline
            className="w-full h-auto"
          />
        </div>
      )}

      {(clip.status === "in_queue" || clip.status === "in_progress") && (
        <div
          className="flex items-center gap-3 px-3 py-6 rounded-xl"
          style={{
            background: "var(--vc-glass-bg)",
            border: "1px solid var(--vc-glass-border)",
          }}
        >
          <Loader2
            className="w-4 h-4 animate-spin"
            style={{ color: "var(--vc-accent-text)" }}
          />
          <span className="text-xs text-[var(--vc-text-muted)]">
            Synthesizing motion... this can take 15-30 seconds
          </span>
        </div>
      )}

      <div className="space-y-1.5">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--vc-text-muted)]">
          Prompt
        </p>
        <p
          className="text-sm line-clamp-2"
          style={{ color: "var(--vc-text)", opacity: 0.85 }}
        >
          {clip.prompt}
        </p>
      </div>

      {clip.status === "completed" && clip.videoUrl && (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleDownload}
            className="flex-1 hover:bg-[var(--vc-glass-hover)]"
            style={{
              background: "var(--vc-glass-bg)",
              border: "1px solid var(--vc-glass-border)",
              color: "var(--vc-text)",
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyPrompt}
            className="flex-1 hover:bg-[var(--vc-glass-hover)]"
            style={{
              background: "var(--vc-glass-bg)",
              border: "1px solid var(--vc-glass-border)",
              color: "var(--vc-text)",
            }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Prompt
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
