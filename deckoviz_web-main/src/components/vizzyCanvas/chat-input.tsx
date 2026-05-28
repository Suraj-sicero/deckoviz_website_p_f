

import { useRef, useCallback, useEffect, useState } from "react"
import { Button } from "./ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip"
import {
  ArrowUp,
  Square,
  RectangleHorizontal,
  RectangleVertical,
  Loader2,
  ImagePlus,
  X,
  Mic,
  MicOff,
  FileText,
  Video,
  Volume2,
  Paperclip
} from "lucide-react"
import { API_BASE_URL } from "../../lib/constants"
import { cn } from "./lib/utils"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
  aspectRatio: string
  onAspectRatioChange: (ratio: string) => void
  templateInsertToken?: number
  uploadedFile?: { url: string; fileName: string } | null
  onFileUpload?: (fileUrl: string, fileName: string) => void
  onFileRemove?: () => void
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  aspectRatio,
  onAspectRatioChange,
  templateInsertToken,
  uploadedFile,
  onFileUpload,
  onFileRemove,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Voice Chat (Speech-to-Text) States
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<any>(null)

  // Auto-focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      const rec = new SpeechRecognition()
      rec.continuous = true
      rec.interimResults = true
      rec.lang = "en-US"

      rec.onresult = (e: any) => {
        let transcript = ""
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) {
            transcript += e.results[i][0].transcript
          }
        }
        if (transcript) {
          onChange((prev) => (prev ? prev + " " + transcript : transcript))
        }
      }

      rec.onerror = (err: any) => {
        console.error("Speech recognition error:", err)
        setIsListening(false)
      }

      rec.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = rec
    }
  }, [onChange])

  const toggleVoiceInput = useCallback(() => {
    if (!recognitionRef.current) {
      setUploadError("Speech recognition is not supported in this browser.")
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
        setUploadError(null)
      } catch (err) {
        console.error("Error starting speech recognition:", err)
      }
    }
  }, [isListening])

  const handleFileSelect = useCallback(
    async (file: File) => {
      const allowedTypes = [
        "image/",
        "audio/",
        "video/",
        "application/pdf"
      ]

      const isAllowed = allowedTypes.some(type => file.type.startsWith(type))
      if (!isAllowed) {
        setUploadError("Please select an image, audio, video, or PDF file")
        return
      }

      if (file.size > 25 * 1024 * 1024) {
        setUploadError("File size must be less than 25MB")
        return
      }

      setIsUploading(true)
      setUploadError(null)

      try {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch(`${API_BASE_URL}/api/upload`, {
          method: "POST",
          body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Upload failed")
        }

        onFileUpload?.(data.image.url, file.name)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Upload failed"
        setUploadError(errorMessage)
      } finally {
        setIsUploading(false)
      }
    },
    [onFileUpload]
  )

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileSelect(file)
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    },
    [handleFileSelect]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const file = e.dataTransfer.files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        if (value.trim() && !isLoading) {
          onSubmit()
        }
      }
    },
    [value, isLoading, onSubmit]
  )

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
      const textarea = e.target
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
    },
    [onChange]
  )

  useEffect(() => {
    if (!value && textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }, [value])

  useEffect(() => {
    if (templateInsertToken === undefined || templateInsertToken === 0) return
    const ta = textareaRef.current
    if (!ta) return

    ta.style.height = "auto"
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`
    ta.focus()

    const match = ta.value.match(/\[[^\]]+\]/)
    if (match && match.index !== undefined) {
      const start = match.index
      const end = start + match[0].length
      requestAnimationFrame(() => {
        try {
          ta.setSelectionRange(start, end)
        } catch {
          /* no-op */
        }
      })
    } else {
      const end = ta.value.length
      ta.setSelectionRange(end, end)
    }
  }, [templateInsertToken])

  const renderFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase()
    if (["pdf"].includes(ext || "")) return <FileText className="size-6 text-red-400" />
    if (["mp3", "wav", "m4a", "ogg", "aac"].includes(ext || "")) return <Volume2 className="size-6 text-amber-400" />
    if (["mp4", "mov", "avi", "webm"].includes(ext || "")) return <Video className="size-6 text-cyan-400" />
    return <Paperclip className="size-6 text-slate-400" />
  }

  const isImageFile = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase()
    return ["png", "jpg", "jpeg", "webp", "gif"].includes(ext || "")
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {uploadError && (
        <div className="mb-2 text-xs text-red-500 bg-red-50 dark:bg-red-950 p-2 rounded-lg">
          {uploadError}
        </div>
      )}

      <div
        className={cn(
          "relative flex items-end gap-2 rounded-2xl backdrop-blur-2xl p-2.5 transition-all duration-300 focus-within:border-[var(--vc-accent-border)]",
          isLoading && "opacity-80"
        )}
        style={{
          background: "var(--vc-glass-bg)",
          border: "1px solid var(--vc-glass-border)",
          boxShadow: "var(--vc-glass-shadow), var(--vc-glass-inset)",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,audio/*,video/*,application/pdf"
          onChange={handleFileInputChange}
          className="hidden"
          aria-label="Upload media"
        />

        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="ghost"
          size="icon-sm"
          disabled={isUploading}
          className="flex-shrink-0 text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] rounded-xl"
          aria-label="Upload media"
          title={isUploading ? "Uploading..." : "Upload media"}
        >
          {isUploading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Paperclip className="size-4" />
          )}
        </Button>

        {uploadedFile && (
          <div className="absolute left-2.5 bottom-full mb-2 flex items-center gap-2 bg-white/[0.06] border border-white/10 backdrop-blur-2xl rounded-lg p-1.5 shadow-[0_8px_24px_rgba(11,18,32,0.4)]">
            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white/[0.05] flex items-center justify-center">
              {isImageFile(uploadedFile.fileName) ? (
                <img
                  src={uploadedFile.url}
                  alt={uploadedFile.fileName}
                  className="w-full h-full object-cover"
                />
              ) : (
                renderFileIcon(uploadedFile.fileName)
              )}
            </div>
            <div className="flex-1 min-w-0 px-1">
              <p className="text-xs font-medium truncate text-slate-100 max-w-[120px]">
                {uploadedFile.fileName}
              </p>
              <p className="text-[10px] text-slate-400">Ready to enhance</p>
            </div>
            <Button
              onClick={() => onFileRemove?.()}
              variant="ghost"
              size="icon-sm"
              className="flex-shrink-0 h-6 w-6 text-slate-400 hover:text-rose-300 hover:bg-rose-500/10"
              aria-label="Remove file"
            >
              <X className="size-3" />
            </Button>
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Describe what you want to create..."
          rows={1}
          disabled={isLoading}
          className="flex-1 resize-none bg-transparent border-0 outline-none text-sm leading-relaxed placeholder:text-[var(--vc-text-faint)] disabled:opacity-50 py-1.5 max-h-40"
          style={{ color: "var(--vc-text)" }}
          aria-label="Message input"
        />

        {/* Microphone voice toggle button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleVoiceInput}
              disabled={isLoading}
              variant="ghost"
              size="icon-sm"
              className={cn(
                "flex-shrink-0 text-slate-400 hover:bg-white/[0.06] rounded-xl transition-all duration-300",
                isListening && "text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 animate-pulse"
              )}
              aria-label="Voice Input"
            >
              {isListening ? <MicOff className="size-4 text-rose-500" /> : <Mic className="size-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            {isListening ? "Stop listening" : "Voice chat"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onSubmit}
              disabled={!value.trim() || isLoading}
              size="icon-sm"
              className={cn(
                "flex-shrink-0 rounded-xl transition-all duration-300 border border-white/10",
                value.trim() && !isLoading
                  ? "text-white shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:brightness-110"
                  : "bg-white/[0.05] text-slate-500"
              )}
              style={
                value.trim() && !isLoading
                  ? { background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)" }
                  : undefined
              }
              aria-label={isLoading ? "Generating..." : "Send message"}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ArrowUp className="size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            {isLoading ? "Generating..." : "Send"}
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center justify-between px-2 pt-2">
        <div className="flex items-center gap-2">
          {aspectRatio !== "1:1" && (
            <span className="text-xs text-cyan-300/90 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-md font-medium backdrop-blur-sm">
              Square
            </span>
          )}
        </div>
        <span className="text-[11px] text-slate-500/70">
          Shift + Enter for new line | Speak or drag files to upload
        </span>
      </div>
    </div>
  )
}

