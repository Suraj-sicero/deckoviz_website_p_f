"""
Simulated TV client for local pairing + display verification.

Usage (FastAPI on :8000):
  python scripts/simulate_tv_pairing.py

1) Pair via http://localhost:5173/pair with the printed code
2) Leave this process running — it stays on /ws/tv and acks display_image
"""

import json
import os
import sys
import time
import uuid
from typing import Optional
from urllib.parse import urlencode

import requests

try:
    import websocket
except ImportError:
    print("Install websocket-client: pip install websocket-client")
    sys.exit(1)

API_BASE = os.environ.get("PAIRING_API_BASE", "http://localhost:8000").rstrip("/")
PAIR_PAGE_BASE = os.environ.get("PAIR_PAGE_BASE", "http://localhost:5173").rstrip("/")
POLL_MS = 2.0
MAX_POLLS = 150
DISPLAY_ACTIONS = {
    "display_artwork",
    "display_image",
    "display_collection",
    "start_slideshow",
    "pause",
    "resume",
    "skip",
    "change_mood",
    "change_theme",
}


def create_session() -> dict:
    res = requests.post(
        f"{API_BASE}/api/pairing/session",
        json={
            "device_name": "Simulated TV",
            "platform": "google_tv",
            "pair_page_base_url": PAIR_PAGE_BASE,
        },
        timeout=15,
    )
    data = res.json()
    if not res.ok:
        raise RuntimeError(data.get("error") or f"Failed to create session ({res.status_code})")
    return data


def poll_session(session_id: str) -> dict:
    for i in range(MAX_POLLS):
        res = requests.get(f"{API_BASE}/api/pairing/session/{session_id}", timeout=15)
        data = res.json()
        if not res.ok:
            raise RuntimeError(data.get("error") or f"Poll failed ({res.status_code})")

        print(f"\r[poll {i + 1}] status={data.get('status')}          ", end="", flush=True)

        if data.get("status") == "paired" and data.get("token"):
            print("\n")
            return data
        if data.get("status") == "paired" and not data.get("token"):
            raise RuntimeError("Session paired but token was already consumed — restart the simulator.")
        if data.get("status") == "expired":
            raise RuntimeError("Pairing session expired.")

        time.sleep(POLL_MS)
    raise RuntimeError("Timed out waiting for pairing.")


def send_tv_ack(ws: websocket.WebSocket, reference_message_id: str, status: str = "success", reason: Optional[str] = None):
    payload = {"reference_message_id": reference_message_id, "status": status}
    if reason:
        payload["reason"] = reason
    ws.send(
        json.dumps(
            {
                "protocol_version": 1,
                "message_id": str(uuid.uuid4()),
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "action": "acknowledgement",
                "payload": payload,
            }
        )
    )


def connect_tv_ws_and_listen(token: str, app_instance_id: str):
    ws_base = API_BASE.replace("https://", "wss://").replace("http://", "ws://")
    qs = urlencode({"token": token, "app_instance_id": app_instance_id})
    url = f"{ws_base}/ws/tv?{qs}"
    print(f"Connecting to {ws_base}/ws/tv?token=<token>&app_instance_id={app_instance_id}")

    connected = {"ok": False}

    def on_message(ws, raw):
        try:
            msg = json.loads(raw)
        except Exception:
            print("Non-JSON message:", raw)
            return

        print("\n← Received:", json.dumps(msg, indent=2))
        action = msg.get("action")

        if action == "connected":
            connected["ok"] = True
            print("\n✓ TV WebSocket connected — listening for display commands (Ctrl+C to exit).")
            return

        if action == "acknowledgement":
            return

        if action in DISPLAY_ACTIONS or str(action or "").startswith("display_"):
            print(f"\n[TV] Handling {action}")
            if msg.get("payload"):
                print(f"     payload: {json.dumps(msg['payload'])}")
            send_tv_ack(ws, msg.get("message_id"), "success")
            print(f"→ Sent acknowledgement for message_id={msg.get('message_id')}")

    def on_error(ws, err):
        print("WebSocket error:", err)

    def on_close(ws, status_code, msg):
        print("\nTV WebSocket closed.")

    def on_open(ws):
        print("WebSocket open")

    ws = websocket.WebSocketApp(
        url,
        on_open=on_open,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close,
    )
    ws.run_forever()


def main():
    print(f"API: {API_BASE}")
    print("Creating pairing session…\n")

    session = create_session()
    print("────────────────────────────────────────")
    print(f"  CODE:             {session['code']}")
    print(f"  QR payload:       {session['qr_payload']}")
    print(f"  session_id:       {session['session_id']}")
    print(f"  app_instance_id:  {session['app_instance_id']}")
    print(f"  expires_at:       {session['expires_at']}")
    print("────────────────────────────────────────")
    print("\nOpen the pair page, sign in, and enter the code above:")
    print(f"  {session['qr_payload']}\n")
    print("Waiting for claim…")

    paired = poll_session(session["session_id"])
    print("Pairing succeeded!")
    print(f"  user_id:          {paired.get('user_id')}")
    print(f"  device_name:      {paired.get('device_name')}")
    print(f"  app_instance_id:  {paired.get('app_instance_id')}")

    print("\nReconnecting to /ws/tv with real credentials…")
    connect_tv_ws_and_listen(paired["token"], paired["app_instance_id"])


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nStopped.")
    except Exception as err:
        print("\nSimulator failed:", err)
        sys.exit(1)
