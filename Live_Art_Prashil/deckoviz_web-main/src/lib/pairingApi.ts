import { API_BASE_URL } from "./constants";

export type ClaimPairingResult = {
  success: boolean;
  device: {
    id: string;
    app_instance_id: string;
    device_name: string;
    platform: string;
    status: string;
    created: boolean;
  };
};

export type PairingSession = {
  session_id: string;
  code: string;
  qr_payload: string;
  app_instance_id: string;
  expires_at: string;
  status?: string;
  token?: string | null;
  device_name?: string;
  platform?: string;
};

function pairPageBaseUrl(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.origin;
}

export async function createPairingSession(options?: {
  device_name?: string;
  platform?: string;
  pair_page_base_url?: string;
}): Promise<PairingSession> {
  const res = await fetch(`${API_BASE_URL}/api/pairing/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      device_name: options?.device_name,
      platform: options?.platform,
      pair_page_base_url: options?.pair_page_base_url ?? pairPageBaseUrl(),
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.detail || `Failed to create pairing session (${res.status})`);
  }
  return data as PairingSession;
}

export async function getPairingSession(sessionId: string): Promise<PairingSession> {
  const res = await fetch(`${API_BASE_URL}/api/pairing/session/${encodeURIComponent(sessionId)}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.detail || `Failed to fetch pairing session (${res.status})`);
  }
  return data as PairingSession;
}

export async function claimPairingCode(
  token: string,
  codeOrPayload: string
): Promise<ClaimPairingResult> {
  const trimmed = codeOrPayload.trim();
  const body =
    /^\d{6}$/.test(trimmed)
      ? { code: trimmed }
      : { qr_payload: trimmed, code: trimmed };

  const res = await fetch(`${API_BASE_URL}/api/pairing/claim`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.detail || `Pairing failed (${res.status})`);
  }
  return data as ClaimPairingResult;
}

/** Extract a 6-digit code from raw input or a pair URL. */
export function extractPairingCode(input: string): string | null {
  const raw = input.trim();
  if (/^\d{6}$/.test(raw)) return raw;
  try {
    const url = new URL(raw);
    const fromQuery = url.searchParams.get("code");
    if (fromQuery && /^\d{6}$/.test(fromQuery.trim())) return fromQuery.trim();
  } catch {
    // not a URL
  }
  const match = raw.match(/\b(\d{6})\b/);
  return match ? match[1] : null;
}
