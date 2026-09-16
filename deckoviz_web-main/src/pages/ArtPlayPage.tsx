import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MonitorPlay } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getOrCreateArtPlayInstanceId } from "../lib/artPlayInstance";
import { getArtPlayQueue, ArtPlayQueueItem } from "../lib/artPlayApi";
import { WS_TV_URL } from "../lib/constants";

type QueueItem = ArtPlayQueueItem & { _key?: string };

function itemKey(item: QueueItem): string {
  return item._key || item.id || `${item.artworkId || ""}:${item.sentAt || item.imageUrl}`;
}

function normalizeIncoming(payload: Record<string, unknown>): QueueItem | null {
  const imageUrl =
    (payload.image_url as string) ||
    (payload.cdn_url as string) ||
    (payload.url as string) ||
    (payload.imageUrl as string) ||
    "";
  if (!imageUrl) return null;
  const id =
    (payload.queue_item_id as string) ||
    (payload.artwork_id as string) ||
    `live_${Date.now()}`;
  return {
    id,
    artworkId: (payload.artwork_id as string) || null,
    imageUrl,
    url: imageUrl,
    cdn_url: imageUrl,
    title: (payload.title as string) || null,
    sentAt: (payload.sent_at as string) || new Date().toISOString(),
    _key: `${id}:${payload.sent_at || payload.message_id || imageUrl}`,
  };
}

export default function ArtPlayPage() {
  const { token } = useAuth();
  const [instanceId] = useState(() => getOrCreateArtPlayInstanceId());
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [index, setIndex] = useState(0);
  const [wsStatus, setWsStatus] = useState<"connecting" | "connected" | "disconnected">("connecting");
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const appendItem = useCallback((incoming: QueueItem) => {
    setQueue((prev) => {
      const key = itemKey(incoming);
      if (prev.some((p) => itemKey(p) === key || (p.id && p.id === incoming.id))) {
        return prev;
      }
      const next = [...prev, incoming];
      setIndex(next.length - 1);
      return next;
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const items = await getArtPlayQueue(token || undefined, instanceId);
        if (cancelled) return;
        setQueue(items.map((item) => ({ ...item, imageUrl: item.imageUrl || item.url || "" })));
        setIndex((i) => {
          if (items.length === 0) return 0;
          return Math.min(Math.max(i, 0), items.length - 1);
        });
      } catch {
        /* hydrate best-effort */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, instanceId]);

  // Listen for local add events (BroadcastChannel + CustomEvent + storage)
  useEffect(() => {
    const handleAdd = (item: QueueItem) => {
      if (!item.imageUrl) return;
      appendItem({
        ...item,
        imageUrl: item.imageUrl || item.url || "",
      });
    };

    const onCustomEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) handleAdd(detail);
    };

    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== "undefined") {
      channel = new BroadcastChannel("deckoviz_artplay_sync");
      channel.onmessage = (ev) => {
        if (ev.data?.type === "ADD_ITEM" && ev.data?.item) {
          handleAdd(ev.data.item);
        }
      };
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === `deckoviz_artplay_queue_${instanceId}`) {
        getArtPlayQueue(token || undefined, instanceId).then((items) => {
          setQueue(items.map((item) => ({ ...item, imageUrl: item.imageUrl || item.url || "" })));
        });
      }
    };

    window.addEventListener("deckoviz_artplay_item_added", onCustomEvent);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("deckoviz_artplay_item_added", onCustomEvent);
      window.removeEventListener("storage", onStorage);
      if (channel) channel.close();
    };
  }, [instanceId, token, appendItem]);

  useEffect(() => {
    let closed = false;

    const connect = () => {
      if (closed) return;
      if (!token) {
        setWsStatus("connected");
        return;
      }
      setWsStatus("connecting");
      const url = `${WS_TV_URL}?token=${encodeURIComponent(token)}&app_instance_id=${encodeURIComponent(instanceId)}`;
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!closed) setWsStatus("connected");
      };

      ws.onmessage = (ev) => {
        try {
          const msg = JSON.parse(ev.data);
          const action = msg?.action;
          if (action === "display_artwork" || action === "display_image") {
            const item = normalizeIncoming(msg.payload || {});
            if (item) appendItem(item);
          }
          if (msg?.message_id && ws.readyState === WebSocket.OPEN) {
            ws.send(
              JSON.stringify({
                protocol_version: 1,
                message_id: crypto.randomUUID?.() || String(Date.now()),
                timestamp: new Date().toISOString(),
                action: "acknowledgement",
                payload: { ack_message_id: msg.message_id, status: "ok" },
              })
            );
          }
        } catch {
          /* ignore malformed */
        }
      };

      ws.onerror = () => {
        if (!closed) setWsStatus("connected");
      };

      ws.onclose = () => {
        if (closed) return;
        setWsStatus("connected");
        reconnectTimer.current = setTimeout(connect, 2500);
      };
    };

    connect();

    return () => {
      closed = true;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      try {
        wsRef.current?.close();
      } catch {
        /* ignore */
      }
    };
  }, [token, instanceId, appendItem]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => Math.min(Math.max(queue.length - 1, 0), i + 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [queue.length]);

  const current = queue.length > 0 ? queue[Math.min(index, queue.length - 1)] : null;
  const canPrev = index > 0;
  const canNext = index < queue.length - 1;

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white overflow-hidden select-none">
      {current?.imageUrl ? (
        <img
          src={current.imageUrl}
          alt={current.title || "Artwork"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0b0e14] px-6 text-center">
          <MonitorPlay className="w-12 h-12 text-blue-400/80" />
          <p className="text-lg font-semibold text-white/90">Art Play Ready</p>
          <p className="text-sm text-white/50 max-w-md">
            Use &quot;Add to Live Stream&quot; on an artwork in the Home Suite Library or Collections. Items queue here
            full screen.
          </p>
        </div>
      )}

      <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none z-10">
        <div className="rounded-full bg-black/50 backdrop-blur px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/80 ring-1 ring-white/10">
          ART PLAY · {wsStatus === "connected" ? "LIVE" : wsStatus.toUpperCase()}
          {queue.length > 0 ? ` · ${index + 1}/${queue.length}` : ""}
        </div>
        {current?.title ? (
          <div className="rounded-full bg-black/50 backdrop-blur px-3 py-1.5 text-[11px] font-medium text-white/80 ring-1 ring-white/10 max-w-[50%] truncate">
            {current.title}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        aria-label="Previous artwork"
        disabled={!canPrev}
        onClick={() => setIndex((i) => Math.max(0, i - 1))}
        className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/45 backdrop-blur ring-1 ring-white/20 transition ${
          canPrev ? "hover:bg-black/70 text-white" : "opacity-30 cursor-default text-white/50"
        }`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        type="button"
        aria-label="Next artwork"
        disabled={!canNext}
        onClick={() => setIndex((i) => Math.min(queue.length - 1, i + 1))}
        className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/45 backdrop-blur ring-1 ring-white/20 transition ${
          canNext ? "hover:bg-black/70 text-white" : "opacity-30 cursor-default text-white/50"
        }`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
