'use client'

import { useEffect, useState } from 'react'
import { Music, Download, Copy, Check } from 'lucide-react'
import { Button } from './ui/button'

interface MusicPlayerProps {
  audioUrl?: string
  title: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  generationId: string
  prompt: string
  onStatusChange?: (status: string) => void
}

export default function MusicPlayer({
  audioUrl,
  title,
  status,
  generationId,
  prompt,
  onStatusChange,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentStatus, setCurrentStatus] = useState(status)
  const [currentAudioUrl, setCurrentAudioUrl] = useState(audioUrl)
  const [copied, setCopied] = useState(false)

  console.log('[MUSIC PLAYER] Props received:', { audioUrl, title, status, generationId })
  console.log('[MUSIC PLAYER] Current state:', { currentStatus, currentAudioUrl })

  // Poll for status updates
  useEffect(() => {
    if (currentStatus === 'completed' || currentStatus === 'failed') {
      return
    }

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/music/status?generationId=${encodeURIComponent(generationId)}`)
        if (response.ok) {
          const data = await response.json()
          if (data.status !== currentStatus) {
            setCurrentStatus(data.status)
            if (data.audioUrl) {
              setCurrentAudioUrl(data.audioUrl)
            }
            onStatusChange?.(data.status)
          }
        }
      } catch (error) {
        console.error('[MUSIC PLAYER] Error polling status:', error)
      }
    }, 2000) // Poll every 2 seconds

    return () => clearInterval(pollInterval)
  }, [currentStatus, generationId, onStatusChange])

  const handleDownload = async () => {
    if (!currentAudioUrl) return

    try {
      const response = await fetch(currentAudioUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title || 'song'}.mp3`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('[MUSIC PLAYER] Error downloading:', error)
    }
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStatusText = () => {
    const normalized = typeof currentStatus === 'string' ? currentStatus.toLowerCase().trim() : ''
    switch (normalized) {
      case 'pending':
        return 'Queued...'
      case 'processing':
        return 'Creating your music...'
      case 'completed':
        return 'Ready to play'
      case 'failed':
        return 'Generation failed'
      default:
        console.warn('[MUSIC PLAYER] Unexpected status value:', currentStatus)
        return currentStatus && typeof currentStatus === 'string' ? currentStatus : 'Unknown'
    }
  }

  const getStatusColor = () => {
    switch (currentStatus) {
      case 'completed':
        return 'text-green-500'
      case 'failed':
        return 'text-red-500'
      case 'processing':
        return 'text-amber-500'
      default:
        return 'text-[var(--vc-text-muted)]'
    }
  }

  return (
    <div
      className="flex flex-col gap-4 p-4 rounded-2xl backdrop-blur-xl"
      style={{
        background: "var(--vc-glass-bg)",
        border: "1px solid var(--vc-glass-border)",
        boxShadow: "var(--vc-glass-shadow)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(135deg, var(--vc-glow-1) 0%, var(--vc-glow-3) 100%)",
              border: "1px solid var(--vc-glass-border)",
            }}
          >
            <Music className="w-5 h-5" style={{ color: "var(--vc-accent-text)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-sm truncate"
              style={{ color: "var(--vc-text)" }}
            >
              {title}
            </h3>
            <p className={`text-xs ${getStatusColor()}`}>{getStatusText()}</p>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {currentAudioUrl && currentStatus === 'completed' && (
        <div className="space-y-2">
          <audio
            src={currentAudioUrl}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            className="w-full"
            controls
          />
          <div className="flex items-center gap-2 text-xs text-[var(--vc-text-muted)]">
            <span>{Math.floor(currentTime)}s</span>
            <div
              className="flex-1 h-1 rounded-full"
              style={{ background: "var(--vc-divider)" }}
            />
            <span>{Math.floor(duration)}s</span>
          </div>
        </div>
      )}

      {/* Prompt */}
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-[var(--vc-text-muted)] uppercase tracking-wide">Prompt</p>
        <p
          className="text-sm line-clamp-2"
          style={{ color: "var(--vc-text)", opacity: 0.85 }}
        >
          {prompt}
        </p>
      </div>

      {/* Actions */}
      {currentStatus === 'completed' && currentAudioUrl && (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleDownload}
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyPrompt}
            className="flex-1"
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

      {/* Loading State */}
      {(currentStatus === 'processing' || currentStatus === 'pending') && (
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-[var(--vc-accent-text)]/70 rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 bg-[var(--vc-accent-text)]/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1.5 h-1.5 bg-[var(--vc-accent-text)]/70 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <span className="text-xs text-[var(--vc-text-muted)]">Creating your music...</span>
        </div>
      )}
    </div>
  )
}
