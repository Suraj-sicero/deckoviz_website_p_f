const BASE_URL = import.meta.env.VITE_API_URL || "https://deckoviz-web-f.onrender.com";

export type ConnectionStatus = "connecting" | "connected" | "disconnected" | "reconnecting";

export interface WSDevice {
  app_instance_id: string;
  device_name: string;
  platform: string;
  status: "online" | "offline";
  last_seen: string;
  current_artwork: string | null;
  playback_state: string | null;
}

interface WSMessage {
  protocol_version: number;
  message_id: string;
  timestamp: string;
  action: string;
  payload: Record<string, unknown>;
  target?: { app_instance_id: string };
}

type EventCallback = (payload: Record<string, unknown>) => void;

class DeckovizWS {
  private ws: WebSocket | null = null;
  private token: string | null = null;
  private listeners = new Map<string, Set<EventCallback>>();
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private maxReconnectDelay = 30_000;
  private _status: ConnectionStatus = "disconnected";
  private _devices: WSDevice[] = [];
  private intentionalClose = false;

  get status(): ConnectionStatus {
    return this._status;
  }

  get devices(): WSDevice[] {
    return this._devices;
  }

  on(event: string, cb: EventCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(cb);
    return () => {
      this.listeners.get(event)?.delete(cb);
    };
  }

  private emit(event: string, payload: Record<string, unknown>) {
    this.listeners.get(event)?.forEach((cb) => cb(payload));
    this.listeners.get("*")?.forEach((cb) => cb({ event, ...payload }));
  }

  private setStatus(s: ConnectionStatus) {
    this._status = s;
    this.emit("status", { status: s });
  }

  connect(token: string) {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.token = token;
    this.intentionalClose = false;
    this.setStatus("connecting");

    const wsUrl = BASE_URL.replace(/^http/, "ws") + `/ws/browser?token=${encodeURIComponent(token)}`;

    try {
      this.ws = new WebSocket(wsUrl);
    } catch {
      this.setStatus("disconnected");
      this.scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.setStatus("connected");
    };

    this.ws.onmessage = (event) => {
      let msg: WSMessage;
      try {
        msg = JSON.parse(event.data);
      } catch {
        return;
      }

      switch (msg.action) {
        case "connected":
          this.emit("connected", msg.payload);
          break;
        case "devices_list":
          this._devices = (msg.payload.devices as WSDevice[]) || [];
          this.emit("devices_list", msg.payload);
          break;
        case "device_offline": {
          const offlineId = msg.payload.app_instance_id as string;
          this._devices = this._devices.map((d) =>
            d.app_instance_id === offlineId ? { ...d, status: "offline" as const } : d
          );
          this.emit("device_offline", msg.payload);
          break;
        }
        case "acknowledgement":
          this.emit("acknowledgement", msg.payload);
          break;
        case "error":
          this.emit("error", msg.payload);
          break;
        default:
          this.emit(msg.action, msg.payload);
          break;
      }
    };

    this.ws.onclose = () => {
      this.setStatus("disconnected");
      if (!this.intentionalClose) {
        this.scheduleReconnect();
      }
    };

    this.ws.onerror = () => {
      // onclose will fire after onerror, which handles reconnect
    };
  }

  disconnect() {
    this.intentionalClose = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.reconnectAttempts = 0;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this._devices = [];
    this.setStatus("disconnected");
  }

  send(action: string, payload: Record<string, unknown> = {}, targetAppInstanceId?: string): boolean {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return false;
    }

    const msg: WSMessage = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action,
      payload,
    };

    if (targetAppInstanceId) {
      msg.target = { app_instance_id: targetAppInstanceId };
    }

    this.ws.send(JSON.stringify(msg));
    return true;
  }

  // ── Convenience methods ──────────────────────────────────────────────────

  displayArtwork(cdnUrl: string, target?: string, transition = "fade", duration = 5000) {
    return this.send("display_artwork", { cdn_url: cdnUrl, transition, duration }, target);
  }

  displayCollection(collectionId: string, target?: string, transition = "fade", duration = 5000) {
    return this.send("display_collection", { collection_id: collectionId, transition, duration }, target);
  }

  queueCollection(collectionId: string, target?: string, position = "end") {
    return this.send("queue_collection", { collection_id: collectionId, position }, target);
  }

  replaceQueue(collections: string[], target?: string) {
    return this.send("replace_queue", { collections }, target);
  }

  removeCollection(collectionId: string, target?: string) {
    return this.send("remove_collection", { collection_id: collectionId }, target);
  }

  displayImage(url: string, target?: string, transition = "fade", duration = 5000) {
    return this.send("display_image", { url, transition, duration }, target);
  }

  changeMood(mood: string, target?: string) {
    return this.send("change_mood", { mood }, target);
  }

  changeTheme(theme: string, target?: string) {
    return this.send("change_theme", { theme }, target);
  }

  startSlideshow(collectionId: string, target?: string, interval = 10000, transition = "fade") {
    return this.send("start_slideshow", { collection_id: collectionId, interval, transition }, target);
  }

  pause(target?: string) {
    return this.send("pause", {}, target);
  }

  resume(target?: string) {
    return this.send("resume", {}, target);
  }

  skip(target?: string) {
    return this.send("skip", {}, target);
  }

  refreshConfig(target?: string) {
    return this.send("refresh_config", {}, target);
  }

  synchronizeDevice(target?: string) {
    return this.send("synchronize_device", {}, target);
  }

  // ── Reconnect logic ──────────────────────────────────────────────────────

  private scheduleReconnect() {
    if (this.intentionalClose) return;
    this.setStatus("reconnecting");

    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), this.maxReconnectDelay);
    this.reconnectAttempts++;

    this.reconnectTimer = setTimeout(() => {
      if (this.token && !this.intentionalClose) {
        this.connect(this.token);
      }
    }, delay);
  }
}

export const wsClient = new DeckovizWS();
