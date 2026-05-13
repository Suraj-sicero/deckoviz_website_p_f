

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

        const response = await fetch('/api/upload', {
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
          "relative flex items-end gap-2 rounded-2xl border border-violet-200/50 bg-white/70 backdrop-blur-md p-2.5 shadow-sm transition-all duration-300",
          "focus-within:shadow-md focus-within:border-violet-400/50",
          isLoading && "opacity-80"
        )}
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
          className="flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl"
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
          <div className="absolute left-2.5 bottom-full mb-2 flex items-center gap-2 bg-card border border-accent/20 rounded-lg p-1.5 shadow-sm">
            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-secondary">
              <img
                src={uploadedImage.url}
                alt={uploadedImage.fileName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 px-1">
              <p className="text-xs font-medium truncate text-foreground">
                {uploadedImage.fileName}
              </p>
              <p className="text-[10px] text-muted-foreground">Ready to enhance</p>
            </div>
            <Button
              onClick={() => onImageRemove?.()}
              variant="ghost"
              size="icon-sm"
              className="flex-shrink-0 h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
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
          className="flex-1 resize-none bg-transparent border-0 outline-none text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 disabled:opacity-50 py-1.5 max-h-40"
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
                "flex-shrink-0 rounded-xl transition-all duration-300",
                value.trim() && !isLoading
                  ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm"
                  : "bg-secondary text-muted-foreground"
              )}
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
            <span className="text-xs text-accent/80 bg-accent/10 px-2 py-0.5 rounded-md font-medium">
              {currentRatio.label} {aspectRatio}
            </span>
          )}
        </div>
        <span className="text-[11px] text-muted-foreground/50">
          Shift + Enter for new line
        </span>
      </div>
    </div>
  )
}
