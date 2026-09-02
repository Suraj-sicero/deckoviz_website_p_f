import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Sparkles, ArrowRight, GraduationCap, Users } from "lucide-react";
import { powerUsesApi, vizzyApi } from "../../lib/webappApi";
import type { PowerUse } from "../../lib/webappApi";

type Vertical = "home" | "enterprise" | "schools";
type SchoolsAudience = "teacher" | "student";

interface PowerUsesSectionProps {
  vertical: Vertical;
  /** For schools, controls whether teacher or student cards are shown. Defaults to teacher. */
  audience?: SchoolsAudience;
  /** If true, shows a toggle for teacher/student when vertical is schools. Defaults to true for schools. */
  showAudienceToggle?: boolean;
}

const verticalLabels: Record<Vertical, string> = {
  home: "Home",
  enterprise: "Enterprise",
  schools: "Schools",
};

export function PowerUsesSection({ vertical, audience: audienceProp, showAudienceToggle }: PowerUsesSectionProps) {
  const navigate = useNavigate();
  const [items, setItems] = useState<PowerUse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startingId, setStartingId] = useState<string | null>(null);
  const [startError, setStartError] = useState<string | null>(null);
  const [audienceFilter, setAudienceFilter] = useState<SchoolsAudience>(audienceProp || "teacher");

  // Keep internal filter in sync if parent prop changes
  useEffect(() => {
    if (audienceProp) setAudienceFilter(audienceProp);
  }, [audienceProp]);

  const shouldShowToggle = showAudienceToggle ?? vertical === "schools";

  useEffect(() => {
    let cancelled = false;
    async function fetchPowerUses() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await powerUsesApi.getPowerUses(vertical);
        if (cancelled) return;
        const list = Array.isArray(data) ? data : [];
        setItems(list);
      } catch (err: any) {
        if (cancelled) return;
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

  const filteredItems = useMemo(() => {
    if (vertical !== "schools") return items;
    return items.filter((card) => {
      const aud = (card as any).audience;
      if (!aud || aud === "both") return true;
      return aud === audienceFilter;
    });
  }, [items, vertical, audienceFilter]);

  const handleCardClick = async (card: PowerUse) => {
    if (startingId) return;
    setStartingId(card.id);
    setStartError(null);
    try {
      // Determine effective audience for schools: card's audience vs current filter
      let effectiveAudience: string | undefined;
      if (vertical === "schools") {
        const cardAud = (card as any).audience;
        if (cardAud === "teacher" || cardAud === "student") {
          effectiveAudience = cardAud;
        } else if (cardAud === "both") {
          effectiveAudience = audienceFilter;
        } else {
          effectiveAudience = audienceFilter;
        }
      }
      let token =
        localStorage.getItem("token") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("deckoviz_token") ||
        localStorage.getItem("jwt");
      if (!token || token === "undefined" || token === "null") {
        token = `guest_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem("token", token);
        localStorage.setItem("authToken", token);
        window.dispatchEvent(new CustomEvent("deckoviz-profile-updated"));
      }
      const res: any = await vizzyApi.startFromPowerUse(vertical, card.id, token, effectiveAudience);
      const sessionId = res?.session_id || res?.sessionId || res?.chatId || res?.id || res?.chat?.id;
      if (!sessionId) throw new Error("No session id returned");
      navigate(`/vizzy-canvas?chatId=${encodeURIComponent(sessionId)}`);
    } catch (err: any) {
      const msg = err?.message || "Failed to start session";
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
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>

          The 10 Power Uses
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Pick a card to start a new Vizzy chat — it opens pre-seeded with that use-case, so Vizzy replies with a specific first move, not a generic question.
        </p>
        {vertical === "schools" && shouldShowToggle && (
          <div className="mt-6 inline-flex items-center rounded-full bg-gray-100 p-1">
            <button
              onClick={() => setAudienceFilter("teacher")}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition ${audienceFilter === "teacher" ? "bg-white shadow text-[#182a4a]" : "text-gray-600 hover:text-gray-800"}`}
            >
              <Users size={14} /> Teacher
            </button>
            <button
              onClick={() => setAudienceFilter("student")}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition ${audienceFilter === "student" ? "bg-white shadow text-[#182a4a]" : "text-gray-600 hover:text-gray-800"}`}
            >
              <GraduationCap size={14} /> Student
            </button>
          </div>
        )}
      </div>

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

      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
            {filteredItems.map((card) => {
              const isStarting = startingId === card.id;
              const depth = (card as any).depth as "quick" | "deep" | undefined;
              const audience = (card as any).audience as string | undefined;
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
                  <div className="mt-3 flex items-center gap-2">
                    {depth && (
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${depth === "quick" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                        {depth}
                      </span>
                    )}
                    {audience && vertical === "schools" && (
                      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-[10px] font-semibold text-gray-600 border border-gray-200 capitalize">
                        {audience}
                      </span>
                    )}
                  </div>
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
          {filteredItems.length === 0 && !isLoading && !error && (
            <p className="mt-8 text-center text-sm text-gray-500">No power uses available for this view. Try switching audience.</p>
          )}
          {items.length > 0 && filteredItems.length === 0 && (
            <p className="mt-2 text-center text-xs text-gray-400">
              Showing {filteredItems.length} of {items.length} cards for {audienceFilter} mode — “both” cards appear in either mode.
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default PowerUsesSection;
