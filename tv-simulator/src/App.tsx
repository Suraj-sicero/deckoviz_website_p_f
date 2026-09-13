import { useState, useEffect, useRef, useCallback } from "react";
import type { RTCSPMessage, EventEntry, PairingSession, ImageState, Metrics, RealPairingState } from "./types";
import "./index.css";

// ── Constants ──────────────────────────────────────────────────────────────
const API_BASE = (import.meta.env.VITE_BACKEND_HTTP_BASE || "http://127.0.0.1:8000").replace(/\/$/, "");
const WS_BASE  = API_BASE.replace("https://", "wss://").replace("http://", "ws://");
const PAIR_PAGE_BASE = (import.meta.env.VITE_PAIR_PAGE_BASE || "http://localhost:5173").replace(/\/$/, "");
const POLL_INTERVAL_MS = 2000;
const MAX_EVENTS = 300;

const DISPLAY_ACTIONS = new Set([
  "display_artwork","display_image","display_collection",
  "replace_queue","start_slideshow","pause","resume","skip","change_mood","change_theme",
]);

// ── Helpers ─────────────────────────────────────────────────────────────────
function isVideoUrl(url: string): boolean {
  try {
    const u = url.split("?")[0].toLowerCase();
    return u.endsWith(".mp4") || u.endsWith(".webm") || u.endsWith(".ogg") || u.endsWith(".mov");
  } catch { return false; }
}

const SESSION_KEY = "deckoviz_tv_sim_session";
function loadSession(): { jwtToken: string; instanceId: string } | null {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
}
function saveSession(token: string, id: string) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify({ jwtToken: token, instanceId: id })); } catch {}
}
function clearSession() {
  try { localStorage.removeItem(SESSION_KEY); } catch {}
}

function fmtTs(ms: number): string {
  const d = new Date(ms);
  return `${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}:${d.getSeconds().toString().padStart(2,"0")}.${d.getMilliseconds().toString().padStart(3,"0")}`;
}
function fmtAge(ms: number): string {
  const s = Math.floor((Date.now() - ms) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s/60)}m ${s%60}s ago`;
  return `${Math.floor(s/3600)}h ago`;
}
function byteSize(str: string): number { return new TextEncoder().encode(str).length; }
function fmtBytes(b: number): string {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b/1024).toFixed(1)} KB`;
  return `${(b/1048576).toFixed(2)} MB`;
}
function newId() { return Math.random().toString(36).slice(2,9); }
function uuid() { return crypto.randomUUID ? crypto.randomUUID() : newId(); }

const emptyMetrics = (): Metrics => ({
  wsConnectLatencyMs: null, lastImageLatencyMs: null,
  msgRx: 0, msgTx: 0, msgFailed: 0,
  reconnectCount: 0, sessionStartTs: null, connectedTs: null,
  lastMsgTs: null, lastImageTs: null,
});

// ── SVGs ───────────────────────────────────────────────────────────────────
const Ico = {
  tv:       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>,
  wifi:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>,
  terminal: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  gauge:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l3 3"/></svg>,
  code:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  plug:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22V12"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><rect x="8" y="2" width="8" height="10" rx="2"/></svg>,
  refresh:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  x:        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  pause:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  play:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  copy:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  chevron:  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
  check:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  aspect:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
  expand:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>,
  minimize: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="12" x2="20" y2="12"/></svg>,
  restore:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>,
  dockBottom: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="15" x2="21" y2="15"/></svg>,
  dockSide:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="14" y1="3" x2="14" y2="21"/></svg>,
};

// ── Collapsible Section ────────────────────────────────────────────────────
function Section({ title, icon, children, defaultOpen = true }: { title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="sec">
      <div className="sec-header" onClick={() => setOpen(o => !o)}>
        <span className="sec-title">{icon}{title}</span>
        <span className={`sec-chevron ${open ? "open" : ""}`}>{Ico.chevron}</span>
      </div>
      {open && <div className="sec-body">{children}</div>}
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export function App() {
  // ── Session rehydration from localStorage ─────────────────────────────────
  const _saved = loadSession();

  // Connection
  const [mode, setMode] = useState<"pair" | "manual">("pair");
  const [wsUrl, setWsUrl]           = useState(WS_BASE);
  const [instanceId, setInstanceId] = useState(_saved?.instanceId || import.meta.env.VITE_DEFAULT_APP_INSTANCE_ID || "tv_sim_001");
  const [jwtToken, setJwtToken]     = useState(_saved?.jwtToken || "");

  // Real pairing lifecycle state
  const [realPairState, setRealPairState] = useState<RealPairingState>(_saved?.jwtToken ? "paired" : "disconnected");
  const [pairSession, setPairSession]     = useState<PairingSession | null>(null);
  const [pairError, setPairError]         = useState("");
  const [countdown, setCountdown]         = useState(0);
  const [copied, setCopied]               = useState(false);

  // WebSocket state
  const [wsStatus, setWsStatus]     = useState<"disconnected"|"connecting"|"connected"|"error">("disconnected");
  const [authStatus, setAuthStatus] = useState<"none"|"authenticated"|"failed">("none");
  const [wsError, setWsError]       = useState("");

  // Collection queue + slideshow state
  const [collectionQueue, setCollectionQueue] = useState<import("./types").QueuedCollectionItem[]>([]);
  const [activeCollection, setActiveCollection] = useState<import("./types").CollectionState | null>(null);
  const slideshowRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeCollRef = useRef<import("./types").CollectionState | null>(null);
  useEffect(() => { activeCollRef.current = activeCollection; }, [activeCollection]);

  // TV display & 16:9 Frame settings
  const [image, setImage] = useState<ImageState | null>(null);
  const [imgFlow, setImgFlow] = useState<{ws:boolean;parse:boolean;load:boolean|null;render:boolean|null}>({ ws:false, parse:false, load:null, render:null });
  const [aspectFit, setAspectFit] = useState<"cover" | "contain">("cover");

  // Terminal / WebSocket Monitor layout (VS Code style resizable & dockable)
  const [terminalHeight, setTerminalHeight] = useState<number>(240);
  const [terminalWidth, setTerminalWidth] = useState<number>(440);
  const [terminalDock, setTerminalDock] = useState<"bottom" | "side">("bottom");
  const [terminalMinimized, setTerminalMinimized] = useState<boolean>(false);
  const [terminalMaximized, setTerminalMaximized] = useState<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartYRef = useRef<number>(0);
  const dragStartHeightRef = useRef<number>(240);
  const dragStartXRef = useRef<number>(0);
  const dragStartWidthRef = useRef<number>(440);

  // Metrics & Events
  const [metrics, setMetrics]       = useState<Metrics>(emptyMetrics());
  const [events, setEvents]         = useState<EventEntry[]>([]);
  const [logPaused, setLogPaused]   = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [rawMsg, setRawMsg]         = useState<any>(null);

  // Drag Resizing Logic for Terminal
  const handleMouseDownResizeH = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    dragStartHeightRef.current = terminalHeight;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaY = dragStartYRef.current - moveEvent.clientY;
      const newHeight = Math.max(90, Math.min(window.innerHeight * 0.75, dragStartHeightRef.current + deltaY));
      setTerminalHeight(newHeight);
      setTerminalMinimized(false);
      setTerminalMaximized(false);
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleMouseDownResizeV = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartWidthRef.current = terminalWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = dragStartXRef.current - moveEvent.clientX;
      const newWidth = Math.max(280, Math.min(window.innerWidth * 0.65, dragStartWidthRef.current + deltaX));
      setTerminalWidth(newWidth);
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Refs
  const wsRef         = useRef<WebSocket | null>(null);
  const pollRef       = useRef<ReturnType<typeof setInterval> | null>(null);
  const connectTsRef  = useRef<number | null>(null);
  const cdTimerRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const logRef        = useRef<HTMLDivElement>(null);
  const metricsRef    = useRef(metrics);
  const logPausedRef  = useRef(logPaused);

  useEffect(() => { metricsRef.current = metrics; }, [metrics]);
  useEffect(() => { logPausedRef.current = logPaused; }, [logPaused]);

  // Auto-reconnect on mount if a saved session exists
  useEffect(() => {
    const saved = loadSession();
    if (saved?.jwtToken && saved?.instanceId) {
      sysEvent("SESSION_RESTORE", `Rehydrating session for device: ${saved.instanceId}`);
      connectWs(saved.jwtToken, saved.instanceId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (logRef.current && !logPaused) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [events, logPaused]);

  // ── Event logging ────────────────────────────────────────────────────────
  const pushEvent = useCallback((e: Omit<EventEntry, "id" | "ts" | "tsLabel">) => {
    if (logPausedRef.current) return;
    const ts = Date.now();
    const entry: EventEntry = { ...e, id: newId(), ts, tsLabel: fmtTs(ts) };
    setEvents(prev => [...prev.slice(-(MAX_EVENTS - 1)), entry]);
  }, []);

  const sysEvent = useCallback((action: string, detail?: string) => {
    pushEvent({ direction: "SYS", action, payloadBytes: 0, raw: detail || null, renderStatus: "n/a" });
  }, [pushEvent]);

  // ── Pairing flow ──────────────────────────────────────────────────────────
  const clearPollTimer = () => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
  };

  const startCountdown = (expiresAt: string) => {
    if (cdTimerRef.current) clearInterval(cdTimerRef.current);
    const updateCd = () => {
      const left = Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
      setCountdown(left);
      if (left === 0) {
        clearInterval(cdTimerRef.current!);
        setRealPairState("expired");
        sysEvent("PAIRING_EXPIRED", "Session TTL ended");
      }
    };
    updateCd();
    cdTimerRef.current = setInterval(updateCd, 1000);
  };

  const startPolling = (sessionId: string) => {
    clearPollTimer();
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/pairing/session/${sessionId}`);
        const data = await res.json();
        
        if (data.status === "paired" && data.token) {
          clearPollTimer();
          if (cdTimerRef.current) clearInterval(cdTimerRef.current);
          
          const newToken = data.token;
          const newId = data.app_instance_id || instanceId;
          setJwtToken(newToken);
          setInstanceId(newId);
          setRealPairState("paired");
          saveSession(newToken, newId);
          
          sysEvent("PAIRING_CLAIMED", `user=${data.user_id} device=${newId}`);
          connectWs(newToken, newId);
        } else if (data.status === "expired") {
          clearPollTimer();
          if (cdTimerRef.current) clearInterval(cdTimerRef.current);
          setRealPairState("expired");
          setPairError("Pairing session expired. Please start a new session.");
          sysEvent("PAIRING_EXPIRED");
        }
      } catch (err: any) {
        sysEvent("POLL_ERROR", err.message);
      }
    }, POLL_INTERVAL_MS);
  };

  const startPairing = async () => {
    setRealPairState("waiting_for_code");
    setPairError("");
    clearPollTimer();
    if (cdTimerRef.current) clearInterval(cdTimerRef.current);
    
    sysEvent("CREATE_SESSION_START", `API=${API_BASE}/api/pairing/session`);
    
    try {
      const res = await fetch(`${API_BASE}/api/pairing/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          device_name: "Deckoviz TV Simulator",
          platform: "google_tv",
          pair_page_base_url: PAIR_PAGE_BASE || window.location.origin,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      
      const session: PairingSession = data;
      setPairSession(session);
      setInstanceId(session.app_instance_id);
      
      setRealPairState("code_generated");
      sysEvent("CODE_GENERATED", `Code: ${session.code} (Session: ${session.session_id.slice(0,8)}...)`);
      
      setRealPairState("pairing_in_progress");
      startCountdown(session.expires_at);
      startPolling(session.session_id);
    } catch (err: any) {
      setRealPairState("auth_failed");
      setPairError(err.message);
      sysEvent("CREATE_SESSION_ERROR", err.message);
    }
  };

  // ── WebSocket Connection ──────────────────────────────────────────────────
  const connectWs = useCallback((token?: string, aid?: string) => {
    const tok = token || jwtToken;
    const appId = aid || instanceId;

    if (!tok.trim()) {
      setWsError("JWT token is required for WebSocket authentication.");
      setRealPairState("auth_failed");
      setAuthStatus("failed");
      return;
    }

    if (wsRef.current) { wsRef.current.close(); wsRef.current = null; }

    setWsStatus("connecting");
    setAuthStatus("none");
    setWsError("");
    
    const base = (wsUrl || WS_BASE).replace(/\/$/, "");
    const url = `${base}/ws/tv?token=${encodeURIComponent(tok.trim())}&app_instance_id=${encodeURIComponent(appId.trim())}`;
    
    connectTsRef.current = Date.now();
    setMetrics(m => ({ ...m, sessionStartTs: Date.now() }));
    sysEvent("WS_CONNECTING", `url=${base}/ws/tv app_instance_id=${appId}`);

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      sysEvent("WS_OPEN", "TCP handshake complete. Waiting for 'connected' message from backend.");
    };

    ws.onmessage = (ev) => {
      const now = Date.now();
      const rawStr: string = ev.data;
      const bytes = byteSize(rawStr);
      setMetrics(m => ({ ...m, msgRx: m.msgRx + 1, lastMsgTs: now }));

      let msg: RTCSPMessage;
      try {
        msg = JSON.parse(rawStr);
      } catch {
        pushEvent({ direction: "RECV", action: "PARSE_ERROR", payloadBytes: bytes, raw: rawStr, renderStatus: "fail", error: "Non-JSON message" });
        return;
      }

      setRawMsg(msg);
      const action = msg.action;
      const payload = msg.payload || {};

      // Handle backend "connected" handshake
      if (action === "connected" && connectTsRef.current) {
        const latency = now - connectTsRef.current;
        setWsStatus("connected");
        setAuthStatus("authenticated");
        setRealPairState("paired");
        setMetrics(m => ({ ...m, wsConnectLatencyMs: latency, connectedTs: now }));
        pushEvent({ direction: "RECV", action: "connected", payloadBytes: bytes, latencyMs: latency, raw: msg, renderStatus: "n/a" });
        sysEvent("AUTHENTICATED", `user_id=${payload.user_id} latency=${latency}ms`);
        return;
      }

      if (action === "acknowledgement") {
        pushEvent({ direction: "RECV", action: "acknowledgement", payloadBytes: bytes, raw: msg, renderStatus: "n/a" });
        return;
      }

      if (action === "error") {
        pushEvent({ direction: "RECV", action: "error", payloadBytes: bytes, raw: msg, renderStatus: "fail", error: payload.reason });
        setWsError(`BACKEND ERROR: ${payload.reason || "Unknown error"}`);
        return;
      }

      // ── replace_queue / queue_collection: update collection queue panel ───
      if (action === "replace_queue" || action === "queue_collection") {
        const queueItems: import("./types").QueuedCollectionItem[] = payload.queue || payload.collections || [];
        setCollectionQueue(queueItems);
        pushEvent({ direction: "RECV", action, payloadBytes: bytes, raw: msg, renderStatus: "n/a" });
        sysEvent("QUEUE_UPDATED", `${queueItems.length} items in queue`);

        // If first item in new queue has items, start slideshow
        const first = queueItems[0];
        if (first && Array.isArray(first.items) && first.items.length > 0) {
          startSlideshow({
            id: first.collection_id,
            name: first.name || first.title || "Collection",
            title: first.title || first.name,
            itemCount: first.items.length,
            items: first.items,
            currentIndex: 0,
          });
        }

        // Send ACK
        if (msg.message_id && ws.readyState === WebSocket.OPEN) {
          const ack: RTCSPMessage = { protocol_version: 1, message_id: uuid(), timestamp: new Date().toISOString(), action: "acknowledgement", payload: { reference_message_id: msg.message_id, status: "success" } };
          ws.send(JSON.stringify(ack));
          setMetrics(m => ({ ...m, msgTx: m.msgTx + 1 }));
        }
        return;
      }

      if (DISPLAY_ACTIONS.has(action) || action.startsWith("display_")) {
        const receivedAt = now;
        const imageUrl = payload.cdn_url || payload.url || payload.image_url_or_ref || payload.image_url;

        // ── display_collection: start slideshow from collection payload ───────
        if (action === "display_collection" && payload.items && Array.isArray(payload.items)) {
          const colItems: import("./types").CollectionItem[] = payload.items;
          startSlideshow({
            id: payload.collection_id || payload.id || "col-unknown",
            name: payload.name || payload.title || "Collection",
            itemCount: colItems.length,
            items: colItems,
            currentIndex: 0,
          });
          pushEvent({ direction: "RECV", action, payloadBytes: bytes, raw: msg, renderStatus: "n/a" });
          sysEvent("SLIDESHOW_START", `Collection: ${payload.name} (${colItems.length} items)`);
          // Send ACK
          if (msg.message_id && ws.readyState === WebSocket.OPEN) {
            const ack: RTCSPMessage = { protocol_version: 1, message_id: uuid(), timestamp: new Date().toISOString(), action: "acknowledgement", payload: { reference_message_id: msg.message_id, status: "success" } };
            ws.send(JSON.stringify(ack));
            setMetrics(m => ({ ...m, msgTx: m.msgTx + 1 }));
          }
          return;
        }

        pushEvent({ direction: "RECV", action, payloadBytes: bytes, raw: msg, renderStatus: "pend" });
        setImgFlow({ ws: true, parse: true, load: null, render: null });

        if (imageUrl) {
          const receivedAt2 = receivedAt;
          if (isVideoUrl(imageUrl)) {
            // ── Video rendering path ──────────────────────────────────────────
            const renderedAt = Date.now();
            const deliveryMs = renderedAt - receivedAt2;
            setImage({
              url: imageUrl, action, messageId: msg.message_id || "",
              title: payload.title,
              artworkId: payload.artwork_id || payload.image_id,
              receivedAt: receivedAt2, renderedAt, payloadBytes: bytes, dims: null,
              deliveryLatencyMs: deliveryMs,
              mediaType: "video",
            });
            setImgFlow({ ws: true, parse: true, load: true, render: true });
            setMetrics(m => ({ ...m, lastImageLatencyMs: deliveryMs, lastImageTs: renderedAt }));
            setEvents(prev => prev.map(e =>
              e.action === action && e.ts === receivedAt
                ? { ...e, renderStatus: "rendered", latencyMs: deliveryMs }
                : e
            ));
            sysEvent("VIDEO_RENDERED", `url=${imageUrl} latency=${deliveryMs}ms`);
          } else {
            // ── Image rendering path ──────────────────────────────────────────
            const imgEl = new Image();
            imgEl.onload = () => {
              const renderedAt = Date.now();
              const deliveryMs = renderedAt - receivedAt2;
              const dims = { w: imgEl.naturalWidth, h: imgEl.naturalHeight };
              setImage({
                url: imageUrl, action, messageId: msg.message_id || "",
                title: payload.title,
                artworkId: payload.artwork_id || payload.image_id,
                receivedAt: receivedAt2, renderedAt, payloadBytes: bytes, dims,
                deliveryLatencyMs: deliveryMs,
                mediaType: "image",
              });
              setImgFlow({ ws: true, parse: true, load: true, render: true });
              setMetrics(m => ({ ...m, lastImageLatencyMs: deliveryMs, lastImageTs: renderedAt }));
              setEvents(prev => prev.map(e =>
                e.action === action && e.ts === receivedAt
                  ? { ...e, renderStatus: "rendered", latencyMs: deliveryMs }
                  : e
              ));
              sysEvent("IMAGE_RENDERED", `dims=${dims.w}x${dims.h} latency=${deliveryMs}ms`);
            };
            imgEl.onerror = () => {
              setImgFlow(f => ({ ...f, load: false, render: false }));
              const errMsg = `Failed to load image from: ${imageUrl}`;
              pushEvent({ direction: "SYS", action: "IMAGE_LOAD_ERROR", payloadBytes: 0, raw: imageUrl, renderStatus: "fail", error: errMsg });
              setWsError(errMsg);
              setMetrics(m => ({ ...m, msgFailed: m.msgFailed + 1 }));
            };
            imgEl.src = imageUrl;
          }
        } else {
          setImgFlow(f => ({ ...f, load: false, render: false }));
          pushEvent({ direction: "SYS", action: "NO_IMAGE_URL", payloadBytes: 0, raw: payload, renderStatus: "fail", error: "No valid image URL in payload" });
          setMetrics(m => ({ ...m, msgFailed: m.msgFailed + 1 }));
        }

        // Send ACK over WebSocket
        if (msg.message_id && ws.readyState === WebSocket.OPEN) {
          const ack: RTCSPMessage = {
            protocol_version: 1,
            message_id: uuid(),
            timestamp: new Date().toISOString(),
            action: "acknowledgement",
            payload: { reference_message_id: msg.message_id, status: "success" },
          };
          ws.send(JSON.stringify(ack));
          setMetrics(m => ({ ...m, msgTx: m.msgTx + 1 }));
          pushEvent({ direction: "SENT", action: "acknowledgement", payloadBytes: byteSize(JSON.stringify(ack)), raw: ack, renderStatus: "n/a" });
        }
        return;
      }

      pushEvent({ direction: "RECV", action: action || "unknown", payloadBytes: bytes, raw: msg, renderStatus: "n/a" });
    };

    ws.onerror = () => {
      setWsStatus("error");
      setAuthStatus("failed");
      setRealPairState("auth_failed");
      const msg = "WebSocket error: Connection refused or authentication failed. Check backend status.";
      setWsError(msg);
      setMetrics(m => ({ ...m, msgFailed: m.msgFailed + 1 }));
      pushEvent({ direction: "SYS", action: "WS_ERROR", payloadBytes: 0, raw: null, renderStatus: "fail", error: msg });
    };

    ws.onclose = (ev) => {
      setWsStatus("disconnected");
      wsRef.current = null;
      const detail = `code=${ev.code} reason=${ev.reason || "none"}`;
      sysEvent("WS_CLOSED", detail);
      if (ev.code === 4401) {
        setAuthStatus("failed");
        setRealPairState("auth_failed");
        setWsError("Authentication failed: Invalid or expired token (HTTP 401 / WS 4401).");
      } else if (ev.code !== 1000 && ev.code !== 1001) {
        setWsError(`WebSocket closed unexpectedly (Code: ${ev.code})`);
        setMetrics(m => ({ ...m, reconnectCount: m.reconnectCount + 1 }));
      }
    };
  }, [jwtToken, instanceId, wsUrl, pushEvent, sysEvent]);

  // ── Slideshow ───────────────────────────────────────────────────────────
  const stopSlideshow = useCallback(() => {
    if (slideshowRef.current) { clearInterval(slideshowRef.current); slideshowRef.current = null; }
    setActiveCollection(null);
  }, []);

  const startSlideshow = useCallback((col: import("./types").CollectionState) => {
    stopSlideshow();
    setActiveCollection({ ...col, currentIndex: 0 });

    const firstItem = col.items[0];
    if (firstItem) {
      const firstUrl = firstItem.url || firstItem.mediaUrl || firstItem.media_url || "";
      if (firstUrl) {
        setImage({ url: firstUrl, action: "display_collection", messageId: "", title: firstItem.title || firstItem.name, artworkId: firstItem.id, receivedAt: Date.now(), renderedAt: Date.now(), payloadBytes: 0, dims: null, deliveryLatencyMs: 0, mediaType: isVideoUrl(firstUrl) ? "video" : "image", collectionName: col.name, itemIndex: 0, totalItems: col.itemCount });
        setImgFlow({ ws: true, parse: true, load: true, render: true });
      }
    }

    // Advance every 30 seconds (or use item.displaySeconds if set)
    const getInterval = (items: import("./types").CollectionItem[], idx: number) => {
      const item = items[idx];
      const sec = typeof item?.displaySeconds === "number" ? item.displaySeconds : parseInt(String(item?.displaySeconds || "30"));
      return (isNaN(sec) || sec <= 0 ? 30 : sec) * 1000;
    };

    const advance = (col: import("./types").CollectionState) => {
      const cur = activeCollRef.current;
      if (!cur) return;
      const nextIdx = (cur.currentIndex + 1) % cur.items.length;
      const nextItem = cur.items[nextIdx];
      const nextUrl = nextItem?.url || nextItem?.mediaUrl || nextItem?.media_url || "";
      const updated = { ...cur, currentIndex: nextIdx };
      setActiveCollection(updated);
      activeCollRef.current = updated;
      if (nextUrl) {
        setImage({ url: nextUrl, action: "display_collection", messageId: "", title: nextItem.title || nextItem.name, artworkId: nextItem.id, receivedAt: Date.now(), renderedAt: Date.now(), payloadBytes: 0, dims: null, deliveryLatencyMs: 0, mediaType: isVideoUrl(nextUrl) ? "video" : "image", collectionName: cur.name, itemIndex: nextIdx, totalItems: cur.itemCount });
      }
      // Reschedule with new item's interval
      if (slideshowRef.current) clearInterval(slideshowRef.current);
      slideshowRef.current = setInterval(() => advance(updated), getInterval(updated.items, nextIdx));
    };

    const firstInterval = getInterval(col.items, 0);
    slideshowRef.current = setInterval(() => advance(col), firstInterval);
    sysEvent("SLIDESHOW_START", `${col.name} — ${col.items.length} items, interval=${firstInterval/1000}s`);
  }, [stopSlideshow, sysEvent]);

  const disconnect = () => {
    clearPollTimer();
    if (cdTimerRef.current) clearInterval(cdTimerRef.current);
    if (wsRef.current) { wsRef.current.close(1000, "User disconnected"); wsRef.current = null; }
    setWsStatus("disconnected");
    setAuthStatus("none");
    setRealPairState("disconnected");
    sysEvent("MANUAL_DISCONNECT");
  };

  const reset = () => {
    disconnect();
    stopSlideshow();
    setPairSession(null);
    setPairError("");
    setJwtToken("");
    setImage(null);
    setImgFlow({ ws:false, parse:false, load:null, render:null });
    setMetrics(emptyMetrics());
    setEvents([]);
    setRawMsg(null);
    setWsError("");
    setRealPairState("disconnected");
    setCollectionQueue([]);
    clearSession();
  };

  useEffect(() => () => {
    clearPollTimer();
    if (cdTimerRef.current) clearInterval(cdTimerRef.current);
    if (wsRef.current) { wsRef.current.close(); wsRef.current = null; }
    if (slideshowRef.current) clearInterval(slideshowRef.current);
  }, []);

  const copyCode = () => {
    if (pairSession?.code) {
      navigator.clipboard.writeText(pairSession.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── Render Badges ──────────────────────────────────────────────────────────
  const wsStatusBadge = {
    connected:    <span className="badge badge-connected"><span className="badge-dot pulse"/>CONNECTED</span>,
    connecting:   <span className="badge badge-connecting"><span className="badge-dot pulse"/>CONNECTING</span>,
    disconnected: <span className="badge badge-disconnected"><span className="badge-dot"/>DISCONNECTED</span>,
    error:        <span className="badge badge-error"><span className="badge-dot"/>ERROR</span>,
  }[wsStatus];

  const authBadge = authStatus === "authenticated"
    ? <span className="badge badge-authed">AUTHENTICATED</span>
    : authStatus === "failed"
    ? <span className="badge badge-error">AUTH FAILED</span>
    : null;

  const realPairBadge = {
    disconnected:        <span className="badge badge-disconnected"><span className="badge-dot"/>DISCONNECTED</span>,
    waiting_for_code:    <span className="badge badge-connecting"><span className="badge-dot pulse"/>WAITING FOR CODE</span>,
    code_generated:      <span className="badge badge-connecting" style={{borderColor:"var(--amber)",color:"var(--amber)"}}><span className="badge-dot pulse" style={{background:"var(--amber)"}}/>CODE GENERATED</span>,
    pairing_in_progress: <span className="badge badge-connecting" style={{borderColor:"var(--amber)",color:"var(--amber)"}}><span className="badge-dot pulse" style={{background:"var(--amber)"}}/>PAIRING IN PROGRESS</span>,
    paired:              <span className="badge badge-connected"><span className="badge-dot pulse"/>PAIRED</span>,
    auth_failed:         <span className="badge badge-error"><span className="badge-dot"/>AUTH FAILED</span>,
    expired:             <span className="badge badge-error"><span className="badge-dot"/>EXPIRED</span>,
  }[realPairState];

  const FlowStep = ({ label, state }: { label: string; state: boolean | null | undefined }) => (
    <span className={`flow-step ${state === true ? "done" : state === false ? "fail" : "pend"}`}>
      {state === true ? "✓" : state === false ? "✗" : "·"} {label}
    </span>
  );

  // ── Connection Panel ───────────────────────────────────────────────────────
  const ConnectionPanel = () => (
    <div className="sec">
      <div className="sec-header" style={{ cursor:"default" }}>
        <span className="sec-title">{Ico.plug} Connection</span>
        <div style={{display:"flex",gap:6}}>
          {wsStatus === "connected" || realPairState === "pairing_in_progress"
            ? <button className="btn btn-danger btn-sm" onClick={disconnect}>{Ico.x} Disconnect</button>
            : null}
          <button className="btn btn-ghost btn-sm" onClick={reset} title="Reset all state">{Ico.refresh}</button>
        </div>
      </div>
      <div className="conn-tabs">
        <button className={`conn-tab ${mode==="pair"?"active":""}`} onClick={() => setMode("pair")}>Auto Pair</button>
        <button className={`conn-tab ${mode==="manual"?"active":""}`} onClick={() => setMode("manual")}>Manual</button>
      </div>
      <div className="conn-body">
        <div className="field"><label>Backend HTTP Base URL</label>
          <input value={wsUrl.replace("ws://","http://").replace("wss://","https://")}
            onChange={e => setWsUrl(e.target.value.replace("http://","ws://").replace("https://","wss://"))}
            placeholder="http://127.0.0.1:8000" />
        </div>

        {mode === "pair" && (
          <>
            {realPairState === "disconnected" || realPairState === "expired" || realPairState === "auth_failed" ? (
              <>
                {pairError && <div className="err-banner" style={{margin:"0 0 6px"}}>{pairError}</div>}
                <button className="btn btn-primary btn-full" onClick={startPairing}>
                  {Ico.wifi} Start Pairing Session
                </button>
              </>
            ) : realPairState === "waiting_for_code" ? (
              <div style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--amber)",padding:"8px 0",display:"flex",alignItems:"center",gap:6}}>
                <span className="badge-dot pulse" style={{background:"var(--amber)"}}/> Creating session & 6-digit code…
              </div>
            ) : (realPairState === "code_generated" || realPairState === "pairing_in_progress") && pairSession ? (
              <>
                <div className="pair-code-box">
                  <div className="pair-code-label">6-Digit Pairing Code</div>
                  <div className="pair-code" style={{letterSpacing:8,fontSize:26,cursor:"pointer"}} onClick={copyCode} title="Click to copy">
                    {pairSession.code}
                  </div>
                  <div style={{fontSize:9,color:copied?"var(--green)":"var(--text3)",marginBottom:4,textAlign:"center"}}>
                    {copied ? "✓ Copied to clipboard!" : "Click code to copy"}
                  </div>
                  <div className="pair-code-url" style={{fontSize:9}}>
                    Enter code at: <a href={`${window.location.origin}/pair?code=${pairSession.code}`} target="_blank" rel="noreferrer" style={{color:"var(--accent)",textDecoration:"underline"}}>
                      {window.location.origin}/pair?code={pairSession.code}
                    </a>
                  </div>
                  <div className="pair-countdown" style={{marginTop:6}}>
                    Expires in {Math.floor(countdown/60)}:{String(countdown%60).padStart(2,"0")}
                  </div>
                </div>
                <div className="poll-indicator">
                  <span className="badge-dot pulse" style={{background:"var(--amber)",display:"inline-block",width:6,height:6,borderRadius:"50%"}}/>
                  Polling backend for claim every 2s…
                </div>
              </>
            ) : realPairState === "paired" ? (
              <div className="pair-code-box">
                <div style={{color:"var(--green)",fontFamily:"var(--mono)",fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>
                  {Ico.check} Paired — TV WebSocket connected
                </div>
              </div>
            ) : null}
          </>
        )}

        {mode === "manual" && (
          <>
            <div className="field"><label>App Instance ID</label>
              <input value={instanceId} onChange={e => setInstanceId(e.target.value)} placeholder="tv_sim_001"/>
            </div>
            <div className="field"><label>JWT Token</label>
              <textarea value={jwtToken} onChange={e => setJwtToken(e.target.value)} placeholder="Paste JWT access token…" rows={3}/>
            </div>
            {wsStatus === "disconnected" || wsStatus === "error" ? (
              <button className="btn btn-primary btn-full" onClick={() => connectWs()} disabled={!jwtToken.trim()}>
                {Ico.wifi} Connect
              </button>
            ) : null}
          </>
        )}

        {wsError && <div className="err-banner">{wsError}</div>}
      </div>
    </div>
  );

  // ── Device Status Panel ────────────────────────────────────────────────────
  const StatusPanel = () => {
    const age = metrics.connectedTs ? fmtAge(metrics.connectedTs) : "N/A";
    return (
      <Section title="Device Status" icon={Ico.tv}>
        <div className="stat-grid">
          <div className="stat-row"><span className="stat-key">Device ID</span><span className="stat-val accent" style={{fontSize:9}}>{instanceId || "—"}</span></div>
          <div className="stat-row"><span className="stat-key">Pairing State</span><span className="stat-val">{realPairBadge}</span></div>
          <div className="stat-row"><span className="stat-key">WS Status</span><span className="stat-val">{wsStatusBadge}</span></div>
          <div className="stat-row"><span className="stat-key">Auth</span><span className="stat-val">{authBadge || <span className="stat-val muted">NONE</span>}</span></div>
          {pairSession?.code && (
            <div className="stat-row"><span className="stat-key">Pairing Code</span><span className="stat-val green" style={{letterSpacing:2,fontWeight:700}}>{pairSession.code}</span></div>
          )}
          <div className="stat-sep"/>
          <div className="stat-row"><span className="stat-key">Session age</span><span className="stat-val muted">{age}</span></div>
          <div className="stat-row"><span className="stat-key">Connected at</span><span className="stat-val muted">{metrics.connectedTs ? fmtTs(metrics.connectedTs) : "—"}</span></div>
          <div className="stat-row"><span className="stat-key">Last message</span><span className="stat-val muted">{metrics.lastMsgTs ? fmtTs(metrics.lastMsgTs) : "—"}</span></div>
          <div className="stat-row"><span className="stat-key">Last image</span><span className="stat-val muted">{metrics.lastImageTs ? fmtTs(metrics.lastImageTs) : "—"}</span></div>
          <div className="stat-row"><span className="stat-key">Reconnects</span><span className={`stat-val ${metrics.reconnectCount>0?"amber":"muted"}`}>{metrics.reconnectCount}</span></div>
        </div>
      </Section>
    );
  };

  // ── Metrics Panel ──────────────────────────────────────────────────────────
  const MetricsPanel = () => (
    <Section title="Network / Latency" icon={Ico.gauge} defaultOpen={false}>
      <div className="metric-grid">
        <div className="metric-box">
          <div className="metric-label">WS Connect</div>
          {metrics.wsConnectLatencyMs !== null
            ? <div className="metric-val accent">{metrics.wsConnectLatencyMs}<span className="metric-unit">ms</span></div>
            : <div className="metric-val metric-na">N/A</div>}
        </div>
        <div className="metric-box">
          <div className="metric-label">Image Latency</div>
          {metrics.lastImageLatencyMs !== null
            ? <div className={`metric-val ${metrics.lastImageLatencyMs < 500 ? "green" : "amber"}`}>{metrics.lastImageLatencyMs}<span className="metric-unit">ms</span></div>
            : <div className="metric-val metric-na">N/A</div>}
        </div>
        <div className="metric-box">
          <div className="metric-label">Msgs Recv</div>
          <div className="metric-val green">{metrics.msgRx}</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">Msgs Sent</div>
          <div className="metric-val accent">{metrics.msgTx}</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">Failed</div>
          <div className={`metric-val ${metrics.msgFailed>0?"":"metric-na"}`} style={metrics.msgFailed>0?{color:"var(--red)"}:{}}>{metrics.msgFailed || "0"}</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">Reconnects</div>
          <div className={`metric-val ${metrics.reconnectCount>0?"amber":"metric-na"}`}>{metrics.reconnectCount}</div>
        </div>
      </div>
    </Section>
  );

  // ── Last Artwork Panel ─────────────────────────────────────────────────────
  const ArtworkPanel = () => !image ? null : (
    <Section title="Last Artwork" icon={Ico.code} defaultOpen={true}>
      <div className="stat-grid">
        <div className="stat-row"><span className="stat-key">Received</span><span className="stat-val muted">{fmtTs(image.receivedAt)}</span></div>
        <div className="stat-row"><span className="stat-key">Rendered</span><span className="stat-val muted">{image.renderedAt ? fmtTs(image.renderedAt) : "—"}</span></div>
        <div className="stat-row"><span className="stat-key">Delivery</span><span className={`stat-val ${(image.deliveryLatencyMs||0)<500?"green":"amber"}`}>{image.deliveryLatencyMs ?? "—"}ms</span></div>
        <div className="stat-row"><span className="stat-key">Dimensions</span><span className="stat-val muted">{image.dims ? `${image.dims.w} × ${image.dims.h}` : "—"}</span></div>
        <div className="stat-row"><span className="stat-key">Payload size</span><span className="stat-val muted">{fmtBytes(image.payloadBytes)}</span></div>
        <div className="stat-sep"/>
        <div className="stat-row"><span className="stat-key">Action</span><span className="stat-val accent">{image.action}</span></div>
        <div className="stat-row"><span className="stat-key">Message ID</span><span className="stat-val muted" style={{fontSize:9}}>{image.messageId || "—"}</span></div>
        {image.title && <div className="stat-row"><span className="stat-key">Title</span><span className="stat-val muted">{image.title}</span></div>}
        {image.artworkId && <div className="stat-row"><span className="stat-key">Artwork ID</span><span className="stat-val muted">{image.artworkId}</span></div>}
      </div>
    </Section>
  );

  // ── Raw Inspector ──────────────────────────────────────────────────────────
  const RawPanel = () => (
    <Section title="Raw Message Inspector" icon={Ico.code} defaultOpen={false}>
      {rawMsg
        ? <>
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:4}}>
              <button className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard.writeText(JSON.stringify(rawMsg,null,2))}>
                {Ico.copy} Copy
              </button>
            </div>
            <div className="raw-box">{JSON.stringify(rawMsg, null, 2)}</div>
          </>
        : <div style={{fontFamily:"var(--mono)",fontSize:10,color:"var(--text3)"}}>No messages received yet.</div>
      }
    </Section>
  );

  // ── Event Log (VS Code Style Resizable / Dockable Terminal) ────────────────
  const EventLog = () => {
    const isMinimized = terminalMinimized;
    const effectiveHeight = terminalMaximized
      ? window.innerHeight * 0.7
      : isMinimized
      ? 38
      : terminalHeight;

    return (
      <div
        className={`evlog ${terminalDock === "side" ? "side-dock" : ""} ${isMinimized ? "minimized" : ""}`}
        style={
          terminalDock === "bottom"
            ? { height: `${effectiveHeight}px` }
            : { width: `${terminalWidth}px` }
        }
      >
        {/* Terminal Header */}
        <div className="evlog-header">
          <span className="evlog-title">
            {Ico.terminal} WebSocket Monitor
            <span style={{ color: "var(--text3)", fontWeight: 400, fontSize: 11 }}>({events.length} events)</span>
          </span>

          <div className="evlog-actions">
            {/* Dock switch: Bottom vs Side */}
            <button
              className={`btn btn-ghost btn-sm ${terminalDock === "bottom" ? "" : "active"}`}
              onClick={() => setTerminalDock((d) => (d === "bottom" ? "side" : "bottom"))}
              title={terminalDock === "bottom" ? "Dock to Side (VS Code style)" : "Dock to Bottom"}
            >
              {terminalDock === "bottom" ? Ico.dockSide : Ico.dockBottom}
              <span style={{ fontSize: 9.5 }}>{terminalDock === "bottom" ? "Side Dock" : "Bottom Dock"}</span>
            </button>

            {/* Minimize / Expand */}
            {terminalDock === "bottom" && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setTerminalMinimized((m) => !m);
                  if (terminalMaximized) setTerminalMaximized(false);
                }}
                title={isMinimized ? "Expand Terminal" : "Minimize Terminal"}
              >
                {isMinimized ? Ico.expand : Ico.minimize}
              </button>
            )}

            {/* Maximize / Restore */}
            {terminalDock === "bottom" && !isMinimized && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setTerminalMaximized((m) => !m)}
                title={terminalMaximized ? "Restore Height" : "Maximize Terminal"}
              >
                {terminalMaximized ? Ico.restore : Ico.expand}
              </button>
            )}

            {/* Pause / Resume */}
            <button className="btn btn-ghost btn-sm" onClick={() => setLogPaused((p) => !p)} title="Pause stream">
              {logPaused ? Ico.play : Ico.pause} {logPaused ? "Resume" : "Pause"}
            </button>

            {/* Clear */}
            <button className="btn btn-ghost btn-sm" onClick={() => setEvents([])} title="Clear event log">
              {Ico.x} Clear
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        {!isMinimized && (
          <div className="evlog-body" ref={logRef}>
            <div className="ev-header-row">
              <div className="ev-header-cell">Timestamp</div>
              <div className="ev-header-cell">Dir</div>
              <div className="ev-header-cell">Action</div>
              <div className="ev-header-cell">Size</div>
              <div className="ev-header-cell">Latency</div>
              <div className="ev-header-cell">Status</div>
              <div className="ev-header-cell">Detail</div>
            </div>
            {events.length === 0 && (
              <div style={{ padding: "20px 16px", fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)" }}>
                No WebSocket events yet. Start a pairing session or send an artwork command from the web application.
              </div>
            )}
            {[...events].reverse().map((ev) => (
              <div key={ev.id}>
                <div
                  className={`ev-row ${expandedId === ev.id ? "expanded" : ""}`}
                  onClick={() => setExpandedId((id) => (id === ev.id ? null : ev.id))}
                >
                  <div className="ev-cell ts">{ev.tsLabel}</div>
                  <div className={`ev-cell ev-dir ${ev.direction.toLowerCase()}`}>{ev.direction}</div>
                  <div className="ev-cell ev-action">{ev.action}</div>
                  <div className="ev-cell">{ev.payloadBytes > 0 ? fmtBytes(ev.payloadBytes) : "—"}</div>
                  <div className="ev-cell">{ev.latencyMs != null ? `${ev.latencyMs}ms` : "—"}</div>
                  <div className={`ev-cell ev-status ${ev.renderStatus === "rendered" ? "ok" : (ev.renderStatus === "failed" || ev.renderStatus === "fail") ? "fail" : "pend"}`}>
                    {ev.renderStatus === "rendered" ? "Rendered" : (ev.renderStatus === "failed" || ev.renderStatus === "fail") ? "Failed" : ev.renderStatus === "n/a" ? "—" : "Pending"}
                  </div>
                  <div className="ev-cell" style={{ color: "var(--text2)", fontSize: 10 }}>
                    {ev.error || (typeof ev.raw === "string" ? ev.raw : "—")}
                  </div>
                </div>
                {expandedId === ev.id && ev.raw && typeof ev.raw !== "string" && (
                  <div className="ev-raw">{JSON.stringify(ev.raw, null, 2)}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── Collection Queue Panel (right sidebar) ─────────────────────────────────
  const CollectionQueuePanel = () => (
    <section className="sec" style={{ marginTop: 8 }}>
      <div className="sec-header" style={{ cursor: "default" }}>
        <span className="sec-title">📋 Collection Queue ({collectionQueue.length})</span>
        {activeCollection && (
          <span style={{ fontSize: 9, color: "var(--green)", fontFamily: "var(--mono)" }}>▶ PLAYING</span>
        )}
      </div>
      <div className="sec-body">
        {collectionQueue.length === 0 ? (
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", padding: "6px 0" }}>No collections queued.</div>
        ) : (
          collectionQueue.map((item, idx) => {
            const isActive = activeCollection?.id === item.collection_id;
            return (
              <div key={item.collection_id || idx} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0", borderBottom: "1px solid var(--border)", opacity: isActive ? 1 : 0.6 }}>
                <span style={{ fontSize: 9, width: 14, color: isActive ? "var(--green)" : "var(--text3)", fontFamily: "var(--mono)", fontWeight: 700 }}>{isActive ? "▶" : `${idx + 1}.`}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name || item.title || "Untitled"}</div>
                  <div style={{ fontSize: 9, color: "var(--text3)", fontFamily: "var(--mono)" }}>{item.item_count || item.itemCount || (item.items?.length) || "?"} items</div>
                </div>
                {isActive && activeCollection && (
                  <span style={{ fontSize: 9, color: "var(--amber)", fontFamily: "var(--mono)", whiteSpace: "nowrap" }}>
                    {activeCollection.currentIndex + 1}/{activeCollection.itemCount}
                  </span>
                )}
              </div>
            );
          })
        )}
        {activeCollection && (
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 6, width: "100%" }} onClick={stopSlideshow}>
            ⏹ Stop Slideshow
          </button>
        )}
      </div>
    </section>
  );

  // ── TV Viewport Canvas (Enforced 16:9 Display Frame) ────────────────────────
  const TVCanvas = () => {
    if (image) {
      if (image.mediaType === "video") {
        return (
          <video
            key={image.url}
            className={`tv-img ${aspectFit === "contain" ? "contain-mode" : ""}`}
            src={image.url}
            autoPlay
            loop
            muted
            playsInline
            style={{ objectFit: aspectFit === "contain" ? "contain" : "cover" }}
          />
        );
      }
      return (
        <img
          className={`tv-img ${aspectFit === "contain" ? "contain-mode" : ""}`}
          src={image.url}
          alt={image.title || "Artwork"}
        />
      );
    }

    if (realPairState === "waiting_for_code") {
      return (
        <div className="tv-idle">
          <div className="tv-idle-icon">⏳</div>
          <div className="tv-idle-title">Generating 6-Digit Pairing Code...</div>
          <div className="tv-idle-sub">Calling FastAPI Backend POST /api/pairing/session</div>
        </div>
      );
    }

    if ((realPairState === "code_generated" || realPairState === "pairing_in_progress") && pairSession) {
      const codeDigits = pairSession.code.split("");
      return (
        <div className="tv-idle" style={{ padding: "28px 36px", maxWidth: 620 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2.5, color: "var(--accent)", textTransform: "uppercase", marginBottom: 8 }}>
            DECKOVIZ 16:9 FRAME TV • PAIRING MODE
          </div>
          <div className="tv-idle-title" style={{ fontSize: 24, marginBottom: 8 }}>
            PAIR YOUR DEVICE
          </div>
          <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 18 }}>
            On your phone or browser, navigate to <strong style={{ color: "#fff" }}>{window.location.origin}/pair</strong> and enter code:
          </div>

          {/* Big 6-Digit Display */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", margin: "14px 0 22px" }}>
            {codeDigits.map((digit, idx) => (
              <div
                key={idx}
                style={{
                  width: 50,
                  height: 62,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(37,99,235,0.18)",
                  border: "2px solid var(--accent)",
                  borderRadius: 9,
                  fontSize: 30,
                  fontWeight: 700,
                  fontFamily: "var(--mono)",
                  color: "#fff",
                  boxShadow: "0 0 20px rgba(37,99,235,0.3)",
                }}
              >
                {digit}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontSize: 12, color: "var(--text2)", marginBottom: 10 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--amber)", fontWeight: 500 }}>
              <span className="badge-dot pulse" style={{ background: "var(--amber)", width: 8, height: 8, borderRadius: "50%" }} />
              Waiting for device claim (polling 2s)...
            </span>
            <span>•</span>
            <span>Expires in {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, "0")}</span>
          </div>

          <button className="btn btn-ghost btn-sm" onClick={copyCode} style={{ margin: "10px auto 0", fontSize: 11, padding: "5px 14px" }}>
            {Ico.copy} {copied ? "Code Copied!" : "Copy 6-Digit Code"}
          </button>
        </div>
      );
    }

    if (realPairState === "paired" && wsStatus !== "connected") {
      return (
        <div className="tv-idle">
          <div className="tv-idle-icon" style={{ color: "var(--green)" }}>✓</div>
          <div className="tv-idle-title" style={{ color: "var(--green)" }}>Device Paired Successfully!</div>
          <div className="tv-idle-sub">Establishing authenticated WebSocket connection to backend...</div>
        </div>
      );
    }

    if (wsStatus === "connected") {
      return (
        <div className="tv-idle">
          <div className="tv-idle-icon">🖼️</div>
          <div className="tv-idle-title" style={{ fontSize: 20 }}>16:9 Smart Frame Ready</div>
          <div className="tv-idle-sub" style={{ fontSize: 13, maxWidth: 420 }}>
            TV Frame connected & authenticated to FastAPI backend.
            <br />
            Select an artwork or collection on the Web App to stream live to this screen.
          </div>
        </div>
      );
    }

    if (realPairState === "auth_failed") {
      return (
        <div className="tv-idle">
          <div className="tv-idle-icon" style={{ color: "var(--red)" }}>⚠️</div>
          <div className="tv-idle-title" style={{ color: "var(--red)" }}>Authentication Failed</div>
          <div className="tv-idle-sub">{pairError || wsError || "Token rejected or session invalid."}</div>
          <button className="btn btn-primary btn-sm" onClick={startPairing} style={{ marginTop: 14 }}>
            {Ico.refresh} Retry Pairing
          </button>
        </div>
      );
    }

    if (realPairState === "expired") {
      return (
        <div className="tv-idle">
          <div className="tv-idle-icon" style={{ color: "var(--amber)" }}>⏱️</div>
          <div className="tv-idle-title" style={{ color: "var(--amber)" }}>Pairing Code Expired</div>
          <div className="tv-idle-sub">The 6-digit pairing code has expired. Generate a new code to continue.</div>
          <button className="btn btn-primary btn-sm" onClick={startPairing} style={{ marginTop: 14 }}>
            {Ico.wifi} Generate New Code
          </button>
        </div>
      );
    }

    // Default standby state
    return (
      <div className="tv-idle">
        <div className="tv-idle-icon">📺</div>
        <div className="tv-idle-title" style={{ fontSize: 19 }}>16:9 TV Standby Mode</div>
        <div className="tv-idle-sub">Click "Start Pairing Session" in the Connection panel to generate a 6-digit pairing code.</div>
        <button className="btn btn-primary btn-sm" onClick={startPairing} style={{ marginTop: 16 }}>
          {Ico.wifi} Start Pairing Session
        </button>
      </div>
    );
  };

  // ── Main Render ────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* Header */}
      <header className="hdr">
        <div className="hdr-left">
          <div className="hdr-logo">
            {Ico.tv} DECKOVIZ TV SIMULATOR
          </div>
          <div className="hdr-divider" />
          <div className="hdr-session">
            {instanceId ? `device: ${instanceId}` : "no device paired"}
            {pairSession ? ` · session: ${pairSession.session_id.slice(0, 8)}…` : ""}
          </div>
        </div>
        <div className="hdr-right">
          {realPairBadge}
          {authBadge}
          {wsStatusBadge}
        </div>
      </header>

      {/* Body */}
      <div className="body">
        {/* Center: TV + Terminal */}
        <div className={`center ${terminalDock === "side" ? "side-dock-layout" : ""}`}>
          <div className="tv-area" style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
            {/* TV Viewport Area with Centered 16:9 Frame */}
            <div className="tv-wrap">
              <div className="tv-frame">
                <div className="tv-scanlines" />
                <TVCanvas />

                {image && (
                  <div className="tv-overlay">
                    <div className="tv-overlay-row">
                      <div className="tv-overlay-title">
                        {activeCollection
                          ? `${activeCollection.name} — ${activeCollection.currentIndex + 1} / ${activeCollection.itemCount}`
                          : (image.title || image.action)}
                      </div>
                      <div className="tv-overlay-flow">
                        <FlowStep label="WS RECV" state={imgFlow.ws} />
                        <span className="flow-arrow">›</span>
                        <FlowStep label="PARSED" state={imgFlow.parse} />
                        <span className="flow-arrow">›</span>
                        <FlowStep label="LOADED" state={imgFlow.load} />
                        <span className="flow-arrow">›</span>
                        <FlowStep label="RENDERED" state={imgFlow.render} />
                        {image.mediaType === "video" && <span className="flow-step done" style={{ marginLeft: 4 }}>🎬 VIDEO</span>}
                      </div>
                    </div>
                    <div className="tv-overlay-meta">
                      <span>recv: {fmtTs(image.receivedAt)}</span>
                      {image.dims && <span>{image.dims.w}×{image.dims.h}</span>}
                      {image.deliveryLatencyMs != null && <span>latency: {image.deliveryLatencyMs}ms</span>}
                      <span>msg: {image.messageId?.slice(0, 12) || "—"}</span>
                      {activeCollection && <span style={{ color: "var(--amber)" }}>SLIDESHOW ▶</span>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TV bottom toolbar */}
            <div className="tv-bar">
              <div className="tv-bar-left">
                <span className="tv-bar-item">
                  ratio: <strong>16:9 HD</strong>
                </span>
                <span className="tv-bar-item">
                  msgs rx: <strong>{metrics.msgRx}</strong>
                </span>
                <span className="tv-bar-item">
                  msgs tx: <strong>{metrics.msgTx}</strong>
                </span>
                <span className="tv-bar-item">
                  failed: <strong style={metrics.msgFailed > 0 ? { color: "var(--red)" } : {}}>{metrics.msgFailed}</strong>
                </span>
                {metrics.wsConnectLatencyMs != null && (
                  <span className="tv-bar-item">
                    ws latency: <strong>{metrics.wsConnectLatencyMs}ms</strong>
                  </span>
                )}
                {image && (
                  <span className="tv-bar-item">
                    last image: <strong>{fmtTs(image.receivedAt)}</strong>
                  </span>
                )}
              </div>
              <div className="tv-bar-actions">
                {/* 16:9 Fit Mode Switcher */}
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setAspectFit((f) => (f === "cover" ? "contain" : "cover"))}
                  title="Toggle between 16:9 Fill (crop to fill) and 16:9 Fit (contain entire image)"
                >
                  {Ico.aspect} Fit: {aspectFit === "cover" ? "16:9 Fill" : "16:9 Fit"}
                </button>

                {image && (
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setImage(null);
                      setImgFlow({ ws: false, parse: false, load: null, render: null });
                    }}
                  >
                    {Ico.x} Clear Screen
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Resizable Divider & Event Log */}
          {terminalDock === "bottom" ? (
            <>
              <div className="resize-handle-h" onMouseDown={handleMouseDownResizeH} title="Drag to resize WebSocket Monitor height" />
              <EventLog />
            </>
          ) : (
            <>
              <div className="resize-handle-v" onMouseDown={handleMouseDownResizeV} title="Drag to resize WebSocket Monitor width" />
              <EventLog />
            </>
          )}
        </div>

        {/* Right Configuration & Telemetry Panel */}
        <div className="right">
          <div className="right-scroll">
            <ConnectionPanel />
            <StatusPanel />
            <CollectionQueuePanel />
            <MetricsPanel />
            <ArtworkPanel />
            <RawPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
