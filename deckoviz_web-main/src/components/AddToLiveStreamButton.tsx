import React, { useState } from "react";
import { Sparkles, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getOrCreateArtPlayInstanceId } from "../lib/artPlayInstance";
import { sendToArtPlay } from "../lib/artPlayApi";

interface AddToLiveStreamButtonProps {
  artworkId?: string;
  url?: string;
  title?: string;
  className?: string;
  compact?: boolean;
}

/** Theme-matched Deckoviz send to Art Play button */
export const AddToLiveStreamButton: React.FC<AddToLiveStreamButtonProps> = ({
  artworkId,
  url,
  title,
  className = "",
  compact = false,
}) => {
  const { token } = useAuth();
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (sending || (!url && !artworkId)) return;
    setSending(true);
    setResult(null);
    try {
      const instanceId = getOrCreateArtPlayInstanceId();
      const res = await sendToArtPlay(token, instanceId, {
        artworkId: artworkId || undefined,
        url: url || undefined,
        title: title || undefined,
      });
      if (res.success) {
        setResult({ ok: true, message: "Added to Live Stream!" });
        setTimeout(() => setResult(null), 3500);
      } else {
        setResult({ ok: false, message: res.error || "Failed" });
      }
    } catch (err: any) {
      setResult({ ok: false, message: err?.message || "Failed" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`inline-flex flex-col items-start gap-1 ${className}`} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        disabled={sending || (!url && !artworkId)}
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-md border border-white/10 transition-all duration-300 hover:from-[#1e3a5f] hover:to-[#1d4ed8] hover:shadow-lg active:scale-95 disabled:opacity-50 ${
          compact ? "px-2.5 py-1 text-[11px] font-medium" : "px-3 py-1.5 text-xs font-semibold"
        }`}
      >
        {sending ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-300" />
            <span>Adding…</span>
          </>
        ) : (
          <>
            <Sparkles className="h-3.5 w-3.5 text-blue-300 fill-blue-300/30" />
            <span>Add to Live Stream</span>
          </>
        )}
      </button>
      {result && (
        <div className="text-[10px]">
          {result.ok ? (
            <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium animate-in fade-in">
              <CheckCircle2 className="h-3 w-3" /> {result.message}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 font-medium animate-in fade-in">
              <AlertCircle className="h-3 w-3" /> {result.message}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

