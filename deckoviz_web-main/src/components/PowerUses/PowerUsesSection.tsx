import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";
import { powerUsesApi, vizzyApi } from "../../lib/webappApi";
import type { PowerUse } from "../../lib/webappApi";

type Vertical = "home" | "enterprise" | "schools";

interface PowerUsesSectionProps {
  vertical: Vertical;
}

const verticalLabels: Record<Vertical, string> = {
  home: "Home",
  enterprise: "Enterprise",
  schools: "Schools",
};

export function PowerUsesSection({ vertical }: PowerUsesSectionProps) {
  const navigate = useNavigate();
  const [items, setItems] = useState<PowerUse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startingId, setStartingId] = useState<string | null>(null);
  const [startError, setStartError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchPowerUses() {
      setIsLoading(true);
      setError(null);
      try {
        // Direct fetch via powerUsesApi which wraps /api/power-uses/{vertical}
        const data = await powerUsesApi.getPowerUses(vertical);
        if (cancelled) return;
        // powerUsesApi.getPowerUses already normalizes to array; fallback to raw fetch if needed
        const list = Array.isArray(data) ? data : [];
        setItems(list);
      } catch (err: any) {
        if (cancelled) return;
        // Fallback: try raw fetch in case the wrapper shape differs
        try {
          const base = (await import("../../lib/constants")).API_BASE_URL;
          const token =
            localStorage.getItem("token") ||
            localStorage.getItem("authToken") ||
            localStorage.getItem("accessToken") ||
            undefined;
          const headers: Record<string, string> = { "Content-Type": "application/json" };
          if (token) headers["Authorization"] = `Bearer ${token.replace(/^Bearer\s+/i, "")}`;
          const res = await fetch(`${base}/api/power-uses/${vertical}`, { headers });
          if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
          const raw = await res.json();
          const list = Array.isArray(raw) ? raw : raw.items || raw.power_uses || raw.powerUses || [];
          setItems(list);
          setError(null);
          return;
        } catch {}
        setError(err?.message || "Failed to load power uses");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    fetchPowerUses();
    return () => {
      cancelled = true;
    };
  }, [vertical]);

  const handleCardClick = async (card: PowerUse) => {
    if (startingId) return;
    setStartingId(card.id);
    setStartError(null);
    try {
      // Use vizzyApi.startFromPowerUse which posts to /api/vizzy/sessions/start-from-power-use
      // It handles both /vizzy and /vizzy-canvas fallback and auth headers internally
      const res: any = await vizzyApi.startFromPowerUse(vertical, card.id);
      // Backend returns { session_id, first_message, chatId, id, content, ... } — handle all aliases
      const sessionId = res?.session_id || res?.sessionId || res?.chatId || res?.id || res?.chat?.id;
      if (!sessionId) throw new Error("No session id returned");
      // Navigate into existing Vizzy chat UI at the returned session_id — reuse the same mechanism
      // that the app uses for opening an existing session (query param ?chatId=)
      // Vizzy chat is at /vizzy-canvas (also /vizzy-generative-chat), we use /vizzy-canvas?chatId=
      navigate(`/vizzy-canvas?chatId=${encodeURIComponent(sessionId)}`);
    } catch (err: any) {
      const msg = err?.message || "Failed to start session";
      // Surface 401 as auth required (vizzyApi already dispatches deckoviz-auth-required, but also show inline)
      if (msg.includes("401") || msg.toLowerCase().includes("authentication")) {
        setStartError("Please log in to start a session");
        window.dispatchEvent(new CustomEvent("deckoviz-auth-required"));
      } else {
        setStartError(msg);
      }
    } finally {
      setStartingId(null);
    }
  };

  return (
    <section className="py-16 md:py-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10 md:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm text-xs font-semibold tracking-wider uppercase text-gray-700 mb-4">
          <Sparkles size={14} className="text-[#2563EB]" />
          <span>{verticalLabels[vertical]} · Vizzy Power Uses</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
          The 10 Power Uses
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Pick a card to start a new Vizzy chat — it opens pre-seeded with that use-case, so Vizzy replies with a specific first move, not a generic question.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 animate-pulse">
              <div className="h-5 w-3/4 rounded bg-gray-100 mb-3" />
              <div className="h-3 w-full rounded bg-gray-100 mb-2" />
              <div className="h-3 w-5/6 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-semibold text-red-700">Failed to load power uses</p>
          <p className="mt-1 text-xs text-red-600">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setIsLoading(true);
              powerUsesApi
                .getPowerUses(vertical)
                .then((list) => setItems(Array.isArray(list) ? list : []))
                .catch((e: any) => setError(e?.message || "Failed to load"))
                .finally(() => setIsLoading(false));
            }}
            className="mt-4 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-semibold text-red-700 shadow-sm border border-red-200 hover:bg-red-50"
          >
            Retry
          </button>
        </div>
      )}

      {/* Grid */}
      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
            {items.map((card) => {
              const isStarting = startingId === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  disabled={!!startingId}
                  className={`group relative flex flex-col text-left rounded-2xl bg-white border p-5 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden
                    ${isStarting ? "border-[#2563EB]/30 ring-2 ring-[#2563EB]/20" : "border-gray-100 hover:border-[#2563EB]/20"}
                    ${startingId && !isStarting ? "opacity-60 pointer-events-none" : ""}
                  `}
                >
                  {/* subtle top accent */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#182a4a] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-sm md:text-[15px] font-bold leading-tight text-gray-900 group-hover:text-[#182a4a] line-clamp-2">
                      {card.title}
                    </h3>
                    <span className="shrink-0 mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      {isStarting ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />}
                    </span>
                  </div>
                  <p className="text-xs md:text-[13px] leading-relaxed text-gray-600 line-clamp-3">
                    {card.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#2563EB]/70 group-hover:text-[#2563EB]">
                    <span>Start session</span>
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>
          {startError && (
            <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
              <p className="text-xs font-semibold text-amber-800">{startError}</p>
              <button
                onClick={() => setStartError(null)}
                className="mt-2 text-xs font-medium text-amber-700 underline hover:text-amber-900"
              >
                Dismiss
              </button>
            </div>
          )}
          {items.length === 0 && !isLoading && !error && (
            <p className="mt-8 text-center text-sm text-gray-500">No power uses available for this vertical.</p>
          )}
        </>
      )}
    </section>
  );
}

export default PowerUsesSection;
