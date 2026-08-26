"""
Headless E2E: pairing + display_image + TV acknowledgement.

Requires FastAPI on :8000.
  python scripts/e2e_pairing_transfer.py
"""

from __future__ import annotations

import json
import os
import sys
import threading
import time
import uuid
from urllib.parse import urlencode

import requests

try:
    import websocket
except ImportError:
    print("Install websocket-client: pip install websocket-client")
    sys.exit(1)

# Allow importing create_access_token without Firebase init side effects if possible
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from auth import create_access_token  # noqa: E402

API_BASE = os.environ.get("PAIRING_API_BASE", "http://localhost:8000").rstrip("/")
WS_BASE = API_BASE.replace("https://", "wss://").replace("http://", "ws://")
TIMEOUT_S = 20


def wait_for_event(events: list, predicate, timeout: float = TIMEOUT_S):
    deadline = time.time() + timeout
    while time.time() < deadline:
        for ev in list(events):
            if predicate(ev):
                return ev
        time.sleep(0.05)
    return None


def run_ws(url: str, events: list, ready: threading.Event, on_message_extra=None):
    def on_message(ws, raw):
        try:
            msg = json.loads(raw)
        except Exception:
            return
        events.append(msg)
        if on_message_extra:
            on_message_extra(ws, msg)

    def on_open(ws):
        ready.set()

    ws = websocket.WebSocketApp(url, on_open=on_open, on_message=on_message)
    t = threading.Thread(target=ws.run_forever, daemon=True)
    t.start()
    return ws, t


def main():
    print(f"E2E against {API_BASE}")

    user_id = f"e2e_{uuid.uuid4().hex[:10]}"
    browser_token = create_access_token(
        {"uid": user_id, "sub": user_id, "id": user_id, "email": f"{user_id}@test.local", "name": "E2E"}
    )

    # 1) TV creates session
    res = requests.post(
        f"{API_BASE}/api/pairing/session",
        json={"device_name": "E2E TV", "platform": "google_tv", "pair_page_base_url": "http://localhost:5173"},
        timeout=15,
    )
    session = res.json()
    assert res.status_code == 201, session
    code = session["code"]
    session_id = session["session_id"]
    app_instance_id = session["app_instance_id"]
    print(f"session created code={code}")

    # 2) Browser claims
    claim = requests.post(
        f"{API_BASE}/api/pairing/claim",
        headers={"Authorization": f"Bearer {browser_token}", "Content-Type": "application/json"},
        json={"code": code},
        timeout=15,
    )
    claim_data = claim.json()
    assert claim.status_code == 200 and claim_data.get("success"), claim_data
    print("claim ok", claim_data["device"]["app_instance_id"])

    # 3) TV polls for token
    poll = requests.get(f"{API_BASE}/api/pairing/session/{session_id}", timeout=15)
    paired = poll.json()
    assert paired.get("status") == "paired" and paired.get("token"), paired
    tv_token = paired["token"]
    print("TV received token")

    # 4) Connect TV WS — auto-ack display_image
    tv_events: list = []
    tv_ready = threading.Event()

    def tv_handler(ws, msg):
        if msg.get("action") == "display_image":
            ws.send(
                json.dumps(
                    {
                        "protocol_version": 1,
                        "message_id": str(uuid.uuid4()),
                        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                        "action": "acknowledgement",
                        "payload": {
                            "reference_message_id": msg.get("message_id"),
                            "status": "success",
                        },
                    }
                )
            )

    tv_qs = urlencode({"token": tv_token, "app_instance_id": app_instance_id})
    tv_ws, _ = run_ws(f"{WS_BASE}/ws/tv?{tv_qs}", tv_events, tv_ready, tv_handler)
    assert tv_ready.wait(TIMEOUT_S), "TV WS connect timeout"
    assert wait_for_event(tv_events, lambda m: m.get("action") == "connected"), "TV missing connected"
    print("TV WS connected")

    # 5) Connect browser WS
    browser_events: list = []
    browser_ready = threading.Event()
    br_qs = urlencode({"token": browser_token})
    browser_ws, _ = run_ws(f"{WS_BASE}/ws/browser?{br_qs}", browser_events, browser_ready)
    assert browser_ready.wait(TIMEOUT_S), "Browser WS connect timeout"
    assert wait_for_event(browser_events, lambda m: m.get("action") == "connected"), "Browser missing connected"
    devices_msg = wait_for_event(browser_events, lambda m: m.get("action") == "devices_list")
    assert devices_msg, "Browser missing devices_list"
    print("Browser WS connected; devices:", devices_msg["payload"].get("devices"))

    # 6) Browser sends display_image
    message_id = str(uuid.uuid4())
    image_url = "https://picsum.photos/seed/rtcsp-e2e/800/600"
    browser_ws.send(
        json.dumps(
            {
                "protocol_version": 1,
                "message_id": message_id,
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "action": "display_image",
                "target": {"app_instance_id": app_instance_id},
                "payload": {
                    "url": image_url,
                    "image_id": "e2e-img",
                    "image_url_or_ref": image_url,
                    "duration": 5000,
                    "transition": "fade",
                },
            }
        )
    )
    print("sent display_image", message_id)

    # 7) TV receives display_image
    tv_display = wait_for_event(
        tv_events,
        lambda m: m.get("action") == "display_image" and m.get("message_id") == message_id,
    )
    assert tv_display, "TV did not receive display_image"
    print("TV received display_image")

    # 8) Browser receives TV acknowledgement
    tv_ack = wait_for_event(
        browser_events,
        lambda m: m.get("action") == "acknowledgement"
        and (m.get("payload") or {}).get("reference_message_id") == message_id
        and (m.get("payload") or {}).get("source") == "tv",
    )
    assert tv_ack, "Browser did not receive TV acknowledgement"
    print("Browser received TV ack:", tv_ack["payload"])

    try:
        tv_ws.close()
        browser_ws.close()
    except Exception:
        pass

    print("\nE2E PASSED")


if __name__ == "__main__":
    try:
        main()
    except AssertionError as err:
        print("\nE2E FAILED:", err)
        sys.exit(1)
    except Exception as err:
        print("\nE2E FAILED:", err)
        sys.exit(1)
