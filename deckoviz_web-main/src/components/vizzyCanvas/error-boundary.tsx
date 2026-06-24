import React from "react"
import { AlertTriangle, RotateCcw } from "lucide-react"

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class CanvasErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[CanvasErrorBoundary] caught:", error, info.componentStack)
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="relative min-h-dvh bg-[#0B1220] text-slate-100 flex items-center justify-center px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(244,63,94,0.10) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-md w-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 shadow-[0_8px_32px_rgba(11,18,32,0.45)] text-center">
          <div
            className="mx-auto size-14 rounded-2xl border border-white/10 flex items-center justify-center mb-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(244,63,94,0.18) 0%, rgba(124,58,237,0.18) 100%)",
            }}
          >
            <AlertTriangle className="size-6 text-rose-300" />
          </div>
          <h1 className="text-xl font-serif font-semibold mb-2">
            Something went wrong on the canvas
          </h1>
          <p className="text-sm text-slate-400 mb-6">
            We hit an unexpected error and couldn't render this view. Try reloading
            - your chats and gallery are saved on the server.
          </p>
          {this.state.error?.message && (
            <p className="text-xs text-slate-500 font-mono bg-black/30 rounded-lg p-3 mb-6 break-all">
              {this.state.error.message}
            </p>
          )}
          <button
            onClick={this.handleReload}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium border border-white/10 shadow-[0_4px_20px_rgba(37,99,235,0.4)]"
            style={{
              background:
                "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
            }}
          >
            <RotateCcw className="size-4" />
            Reload Canvas
          </button>
        </div>
      </div>
    )
  }
}
