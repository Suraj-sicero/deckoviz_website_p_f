import React from "react";
import { useLiveStream } from "../hooks/useLiveStream";
import { Zap, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface LiveStreamButtonProps {
  appInstanceId?: string;
  artworkId: string;
  url?: string;
  name?: string;
}

export const LiveStreamButton: React.FC<LiveStreamButtonProps> = ({
  appInstanceId,
  artworkId,
  url,
  name,
}) => {
  const { streaming, lastResult, streamArtworkLive } = useLiveStream();

  const handleStream = async () => {
    if (!appInstanceId) return;
    await streamArtworkLive(appInstanceId, artworkId, { url });
  };

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        disabled={streaming || !appInstanceId}
        onClick={handleStream}
        className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:from-amber-600 hover:to-orange-700 active:scale-95 disabled:opacity-50"
      >
        {streaming ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Streaming…
          </>
        ) : (
          <>
            <Zap className="h-3.5 w-3.5 fill-amber-200" /> Stream Live
          </>
        )}
      </button>

      {lastResult && (
        <div className="text-[10px]">
          {lastResult.success ? (
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle2 className="h-3 w-3" /> Pushed to frame!
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-red-500 font-medium">
              <AlertCircle className="h-3 w-3" /> {lastResult.error || "Failed"}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
