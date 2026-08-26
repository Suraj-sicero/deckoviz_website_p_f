import { useState, useCallback } from "react";
import { API_BASE_URL } from "../lib/constants";
import { useAuth } from "../context/AuthContext";

export interface LiveStreamOptions {
  url?: string;
  transition?: string;
  duration?: number;
}

export interface LiveStreamResult {
  success: boolean;
  dispatched?: boolean;
  message_id?: string;
  error?: string;
}

export function useLiveStream() {
  const { token } = useAuth();
  const [streaming, setStreaming] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<LiveStreamResult | null>(null);

  const streamArtworkLive = useCallback(
    async (
      appInstanceId: string,
      artworkId: string,
      options: LiveStreamOptions = {}
    ): Promise<LiveStreamResult> => {
      if (!appInstanceId || !token) {
        const errResult = { success: false, error: "Missing device target or auth token" };
        setLastResult(errResult);
        return errResult;
      }

      setStreaming(true);
      setLastResult(null);

      try {
        const res = await fetch(`${API_BASE_URL}/api/livestream/${appInstanceId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            artwork_id: artworkId,
            url: options.url || artworkId,
            transition: options.transition || "fade",
            duration: options.duration || 5000,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || "Live stream failed");
        }

        const result: LiveStreamResult = {
          success: true,
          dispatched: data.dispatched,
          message_id: data.message_id,
        };
        setLastResult(result);
        return result;
      } catch (err: any) {
        const result: LiveStreamResult = {
          success: false,
          error: err.message || "Live stream error",
        };
        setLastResult(result);
        return result;
      } finally {
        setStreaming(false);
      }
    },
    [token]
  );

  return {
    streaming,
    lastResult,
    streamArtworkLive,
  };
}
