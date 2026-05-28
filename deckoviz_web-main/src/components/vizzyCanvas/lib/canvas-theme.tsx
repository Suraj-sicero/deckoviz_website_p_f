import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export type CanvasTheme = "dark" | "light"

interface CanvasThemeCtx {
  theme: CanvasTheme
  toggleTheme: () => void
  setTheme: (t: CanvasTheme) => void
}

const STORAGE_KEY = "vizzy-canvas-theme"

const Ctx = createContext<CanvasThemeCtx | null>(null)

export function CanvasThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<CanvasTheme>(() => {
    if (typeof window === "undefined") return "dark"
    const stored = window.localStorage.getItem(STORAGE_KEY) as CanvasTheme | null
    return stored === "light" || stored === "dark" ? stored : "dark"
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, theme)
      if (theme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [theme])

  const setTheme = useCallback((t: CanvasTheme) => setThemeState(t), [])
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    []
  )

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCanvasTheme(): CanvasThemeCtx {
  const ctx = useContext(Ctx)
  if (!ctx) {
    // Fallback when used outside the provider (e.g. ad-hoc tests)
    return {
      theme: "dark",
      toggleTheme: () => {},
      setTheme: () => {},
    }
  }
  return ctx
}
