export type RealPairingState =
  | "disconnected"
  | "waiting_for_code"
  | "code_generated"
  | "pairing_in_progress"
  | "paired"
  | "auth_failed"
  | "expired";

export interface RTCSPMessage {
  protocol_version: number;
  message_id: string;
  timestamp: string;
  action: string;
  payload?: Record<string, any>;
  target?: Record<string, any>;
}

export interface EventEntry {
  id: string;
  ts: number; // epoch ms
  tsLabel: string; // HH:MM:SS.mmm
  direction: "RECV" | "SENT" | "SYS";
  action: string;
  payloadBytes: number;
  latencyMs?: number;
  renderStatus?: "rendered" | "failed" | "fail" | "n/a" | "pend";
  raw: any;
  error?: string;
}

export interface PairingSession {
  session_id: string;
  code: string;
  qr_payload: string;
  app_instance_id: string;
  expires_at: string; // ISO
}

export interface ImageState {
  url: string;
  action: string;
  messageId: string;
  title?: string;
  artworkId?: string;
  receivedAt: number; // epoch ms
  renderedAt: number | null;
  payloadBytes: number;
  dims: { w: number; h: number } | null;
  deliveryLatencyMs: number | null;
  mediaType?: "image" | "video";
  collectionName?: string;
  itemIndex?: number;
  totalItems?: number;
}

export interface CollectionItem {
  id?: string;
  title?: string;
  name?: string;
  url?: string;
  mediaUrl?: string;
  media_url?: string;
  itemType?: string;
  type?: string;
  displaySeconds?: string | number;
  displayHours?: string | number;
}

export interface CollectionState {
  id: string;
  name: string;
  title?: string;
  itemCount: number;
  items: CollectionItem[];
  currentIndex: number;
  updatedAt?: string;
}

export interface QueuedCollectionItem {
  collection_id: string;
  name?: string;
  title?: string;
  item_count?: number;
  itemCount?: number;
  added_at?: string;
  items?: CollectionItem[];
}

export interface Metrics {
  wsConnectLatencyMs: number | null;
  lastImageLatencyMs: number | null;
  msgRx: number;
  msgTx: number;
  msgFailed: number;
  reconnectCount: number;
  sessionStartTs: number | null;
  connectedTs: number | null;
  lastMsgTs: number | null;
  lastImageTs: number | null;
}


