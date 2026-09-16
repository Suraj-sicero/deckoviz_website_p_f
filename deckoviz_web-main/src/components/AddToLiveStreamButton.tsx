import React, { useState } from "react";
import { Zap, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getOrCreateArtPlayInstanceId } from "../lib/artPlayInstance";
import { sendToArtPlay } from "../lib/artPlayApi";

interface AddToLiveStreamButtonProps {
  artworkId?: string;
  url?: string;
  title?: string;
  className?: string;
}

/** Always-visible one-click send to Art Play — same treatment as DisplayOnTv "Stream Live". */
export const AddToLiveStreamButton: React.FC<AddToLiveStreamButtonProps> = ({
  artworkId,
  url,
  title,
  className = "",
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
        setResult({ ok: true, message: "Sent to Art Play!" });
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
        className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:from-amber-600 hover:to-orange-700 active:scale-95 disabled:opacity-50"
      >
        {sending ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Zap className="h-3.5 w-3.5 fill-amber-200" /> Add to Live Stream
          </>
        )}
      </button>
      {result && (
        <div className="text-[10px]">
          {result.ok ? (
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="h-3 w-3" /> {result.message}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-red-500 font-medium">
              <AlertCircle className="h-3 w-3" /> {result.message}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
