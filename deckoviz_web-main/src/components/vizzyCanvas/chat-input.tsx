

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
  Music,
} from "lucide-react"
import { API_BASE_URL } from "../../lib/constants"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu"
import { cn } from "./lib/utils"

const ASPECT_RATIOS = [
  { label: "Square", value: "1:1", desc: "1024 x 1024", icon: Square },
  { label: "Landscape", value: "16:9", desc: "1536 x 864", icon: RectangleHorizontal },
  { label: "Portrait", value: "9:16", desc: "864 x 1536", icon: RectangleVertical },
  { label: "Photo Wide", value: "3:2", desc: "1536 x 1024", icon: RectangleHorizontal },
  { label: "Photo Tall", value: "2:3", desc: "1024 x 1536", icon: RectangleVertical },
  { label: "Classic", value: "4:3", desc: "1365 x 1024", icon: RectangleHorizontal },
]

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
  aspectRatio: string
  onAspectRatioChange: (ratio: string) => void
  // Increments each time a template is inserted. Causes the textarea to
  // focus and (if present) select the first [bracket] for inline editing.
  templateInsertToken?: number
  uploadedImage?: { url: string; fileName: string } | null
  onImageUpload?: (imageUrl: string) => void
  onImageRemove?: () => void
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  aspectRatio,
  onAspectRatioChange,
  templateInsertToken,
  uploadedImage,
  onImageUpload,
  onImageRemove,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Auto-focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleImageSelect = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setUploadError('Please select an image file')
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB')
        return
      }

      setIsUploading(true)
      setUploadError(null)

      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch(`${API_BASE_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Upload failed')
        }

        onImageUpload?.(data.image.url)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed'
        setUploadError(errorMessage)
      } finally {
        setIsUploading(false)
      }
    },
    [onImageUpload]
  )

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleImageSelect(file)
      }
      // Reset input so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
    [handleImageSelect]
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
        handleImageSelect(file)
      }
    },
    [handleImageSelect]
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

  // Reset textarea height when value is cleared (after submit)
  useEffect(() => {
    if (!value && textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }, [value])

  // When a template is inserted, focus the textarea, resize to fit, and
  // (if the inserted text contains [bracket] placeholders) select the first
  // one so the user can start typing over it immediately.
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
      // Defer to next tick so focus settles + scrollIntoView works
      requestAnimationFrame(() => {
        try {
          ta.setSelectionRange(start, end)
        } catch {
          /* no-op */
        }
      })
    } else {
      // No bracket → place cursor at end
      const end = ta.value.length
      ta.setSelectionRange(end, end)
    }
  }, [templateInsertToken])

  const currentRatio = ASPECT_RATIOS.find((r) => r.value === aspectRatio) || ASPECT_RATIOS[0]

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Upload error message */}
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
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          aria-label="Upload image"
        />

        {/* Image upload button */}
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="ghost"
          size="icon-sm"
          disabled={isUploading}
          className="flex-shrink-0 text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] rounded-xl"
          aria-label="Upload image"
          title={isUploading ? 'Uploading...' : 'Upload image'}
        >
          {isUploading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ImagePlus className="size-4" />
          )}
        </Button>



        {/* Uploaded image preview */}
        {uploadedImage && (
          <div className="absolute left-2.5 bottom-full mb-2 flex items-center gap-2 bg-white/[0.06] border border-white/10 backdrop-blur-2xl rounded-lg p-1.5 shadow-[0_8px_24px_rgba(11,18,32,0.4)]">
            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white/[0.05]">
              <img
                src={uploadedImage.url}
                alt={uploadedImage.fileName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 px-1">
              <p className="text-xs font-medium truncate text-slate-100">
                {uploadedImage.fileName}
              </p>
              <p className="text-[10px] text-slate-400">Ready to enhance</p>
            </div>
            <Button
              onClick={() => onImageRemove?.()}
              variant="ghost"
              size="icon-sm"
              className="flex-shrink-0 h-6 w-6 text-slate-400 hover:text-rose-300 hover:bg-rose-500/10"
              aria-label="Remove image"
            >
              <X className="size-3" />
            </Button>
          </div>
        )}

        {/* Textarea */}
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

        {/* Send / loading button */}
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

      {/* Footer hints */}
      <div className="flex items-center justify-between px-2 pt-2">
        <div className="flex items-center gap-2">
          {aspectRatio !== "1:1" && (
            <span className="text-xs text-cyan-300/90 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-md font-medium backdrop-blur-sm">
              {currentRatio.label} {aspectRatio}
            </span>
          )}
        </div>
        <span className="text-[11px] text-slate-500/70">
          Shift + Enter for new line
        </span>
      </div>
    </div>
  )
}
