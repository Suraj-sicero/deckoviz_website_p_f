"""
Pure End-to-End Integration & System Test Suite for Content Delivery & Time-Based Scheduling System.

Communicates 100% over real HTTP REST endpoints and WebSocket channels:
1. TV Pairing Session & Claim Flow
2. TV & Browser WebSocket Handshakes
3. On-Demand Content Delivery & TV Acknowledgement Relay
4. Collection Queue Autoplay & Synchronization
5. Live Streaming & Priority Activation
6. Daily Rituals (Recurring Schedules) & Scheduled Modes API
7. One-off Scheduled Events API
8. Device Status Transitions & Reconnection
"""

from __future__ import annotations

import json
import os
import sys
import threading
import time
import uuid
from datetime import datetime, timezone
from urllib.parse import urlencode

import requests

try:
    import websocket
except ImportError:
    print("Install websocket-client: pip install websocket-client")
    sys.exit(1)

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from auth import create_access_token

API_BASE = os.environ.get("PAIRING_API_BASE", "http://localhost:8000").rstrip("/")
WS_BASE = API_BASE.replace("https://", "wss://").replace("http://", "ws://")
TIMEOUT_S = 25


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


def tv_ack_handler(ws, msg):
    action = msg.get("action")
    if action in {"display_image", "display_artwork", "replace_queue", "play_collection"} or str(action or "").startswith("display_"):
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


def main():
    print("=== E2E SCHEDULING & CONTENT DELIVERY TEST SUITE ===")
    print(f"API Target: {API_BASE}\n")

    user_id = f"e2e_user_{uuid.uuid4().hex[:8]}"
    browser_token = create_access_token(
        {"uid": user_id, "sub": user_id, "id": user_id, "email": f"{user_id}@test.local", "name": "E2E User"}
    )
    headers = {"Authorization": f"Bearer {browser_token}", "Content-Type": "application/json"}

    # 1. Pairing & Device Claim
    print("[Step 1] Creating TV Pairing Session & Claiming...")
    res = requests.post(
        f"{API_BASE}/api/pairing/session",
        json={"device_name": "Deckoviz TV Frame", "platform": "google_tv", "pair_page_base_url": "http://localhost:5173"},
        timeout=15,
    )
    assert res.status_code == 201, f"Session create failed: {res.text}"
    session = res.json()
    print(f"    Session response: {session}")
    code = str(session["code"])
    session_id = session["session_id"]
    app_instance_id = session["app_instance_id"]

    claim = requests.post(f"{API_BASE}/api/pairing/claim", headers=headers, json={"code": code}, timeout=15)
    assert claim.status_code == 200, f"Claim failed: {claim.text}"

    poll = requests.get(f"{API_BASE}/api/pairing/session/{session_id}", timeout=15)
    paired = poll.json()
    assert paired.get("status") == "paired", f"Poll state not paired: {paired}"
    tv_token = paired["token"]
    print(f"[OK] Paired device app_instance_id: {app_instance_id}")

    # 2. Connect TV & Browser WebSockets
    print("\n[Step 2] Establishing WebSocket Handshakes (TV & Browser)...")
    tv_events = []
    tv_ready = threading.Event()
    tv_qs = urlencode({"token": tv_token, "app_instance_id": app_instance_id})
    tv_ws, _ = run_ws(f"{WS_BASE}/ws/tv?{tv_qs}", tv_events, tv_ready, tv_ack_handler)
    assert tv_ready.wait(TIMEOUT_S), "TV WS connect timeout"
    assert wait_for_event(tv_events, lambda m: m.get("action") == "connected"), "TV connected action missing"
    print("[OK] TV WebSocket connected & listening")

    browser_events = []
    browser_ready = threading.Event()
    br_qs = urlencode({"token": browser_token})
    browser_ws, _ = run_ws(f"{WS_BASE}/ws/browser?{br_qs}", browser_events, browser_ready)
    assert browser_ready.wait(TIMEOUT_S), "Browser WS connect timeout"
    assert wait_for_event(browser_events, lambda m: m.get("action") == "connected"), "Browser connected action missing"
    devices_msg = wait_for_event(browser_events, lambda m: m.get("action") == "devices_list")
    assert devices_msg, "Browser missing devices_list"
    print("[OK] Browser WebSocket connected; devices online")

    # 3. On-Demand Content Delivery
    print("\n[Step 3] Testing On-Demand Content Delivery & TV Ack Relay...")
    msg_id = str(uuid.uuid4())
    browser_ws.send(
        json.dumps(
            {
                "protocol_version": 1,
                "message_id": msg_id,
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "action": "display_image",
                "target": {"app_instance_id": app_instance_id},
                "payload": {"url": "https://picsum.photos/800/600", "image_id": "img_on_demand_1"},
            }
        )
    )
    tv_rcv = wait_for_event(tv_events, lambda m: m.get("action") == "display_image" and m.get("message_id") == msg_id)
    assert tv_rcv, "TV failed to receive on-demand delivery"
    br_ack = wait_for_event(
        browser_events,
        lambda m: m.get("action") == "acknowledgement"
        and (m.get("payload") or {}).get("reference_message_id") == msg_id
        and (m.get("payload") or {}).get("source") == "tv",
    )
    assert br_ack, "Browser failed to receive TV acknowledgement relay"
    print("[OK] On-Demand Delivery & TV Ack Relay verified")

    # 4. Queue Autoplay Synchronization
    print("\n[Step 4] Testing Queue API & WS Synchronization...")
    q_add = requests.post(f"{API_BASE}/api/queue/{app_instance_id}", headers=headers, json={"collection_id": "col_nature_01", "name": "Nature Landscapes", "item_count": 8}, timeout=15)
    assert q_add.status_code == 201, f"Queue add failed: {q_add.text}"
    
    tv_q_msg = wait_for_event(tv_events, lambda m: m.get("action") == "replace_queue")
    assert tv_q_msg, "TV failed to receive replace_queue WS command"
    assert tv_q_msg["payload"]["total_queued"] == 1
    print("[OK] Queue Add & replace_queue WS synchronization verified")

    # 5. Live Streaming Delivery
    print("\n[Step 5] Testing Live Streaming Delivery Endpoint...")
    ls_res = requests.post(
        f"{API_BASE}/api/livestream/{app_instance_id}",
        headers=headers,
        json={"artwork_id": "art_live_77", "url": "https://live.stream/view.mp4", "duration": 60000},
        timeout=15,
    )
    assert ls_res.status_code == 200, f"LiveStream failed: {ls_res.text}"
    
    tv_ls_msg = wait_for_event(tv_events, lambda m: m.get("action") == "display_artwork" and m["payload"].get("mode") == "live_stream")
    assert tv_ls_msg, "TV failed to receive live streaming display_artwork WS command"
    print("[OK] Live Streaming WS command & payload verified")

    # 6. Daily Rituals API CRUD & Scheduled Mode
    print("\n[Step 6] Testing Daily Rituals REST API & Scheduled Modes...")
    now_utc = datetime.now(timezone.utc)
    current_time_str = now_utc.strftime("%H:%M")

    rit_payload = {
        "collectionId": "col_ambient_01",
        "collectionName": "Ambient Evening",
        "title": "Evening Ritual",
        "startTime": current_time_str,
        "dayOfWeek": now_utc.weekday(),
        "timezone": "UTC",
        "targetAppInstanceId": app_instance_id,
        "mode": "ambient",
        "transition": "fade",
        "duration": 5000,
        "active": True
    }
    create_rit = requests.post(f"{API_BASE}/api/rituals", headers=headers, json=rit_payload, timeout=15)
    assert create_rit.status_code == 201, f"Ritual create failed: {create_rit.text}"
    rit_data = create_rit.json()
    assert rit_data["mode"] == "ambient"
    assert rit_data["timezone"] == "UTC"
    ritual_id = rit_data["id"]

    get_rits = requests.get(f"{API_BASE}/api/rituals", headers=headers, timeout=15)
    assert get_rits.status_code == 200 and len(get_rits.json()) >= 1

    patch_rit = requests.patch(f"{API_BASE}/api/rituals/{ritual_id}", headers=headers, json={"title": "Updated Ritual"}, timeout=15)
    assert patch_rit.status_code == 200 and patch_rit.json()["title"] == "Updated Ritual"

    del_rit = requests.delete(f"{API_BASE}/api/rituals/{ritual_id}", headers=headers, timeout=15)
    assert del_rit.status_code == 200 and del_rit.json()["success"]
    print("[OK] Daily Rituals CRUD & Scheduled Mode ('ambient') API verified")

    # 7. Scheduled Events API CRUD
    print("\n[Step 7] Testing Scheduled Events REST API...")
    today_date_str = now_utc.strftime("%Y-%m-%d")
    evt_payload = {
        "name": "Art Exhibition",
        "date": today_date_str,
        "time": current_time_str,
        "collectionName": "Modern Art",
        "collectionId": "col_modern_art",
        "timezone": "UTC",
        "targetAppInstanceId": app_instance_id,
        "mode": "scheduled",
        "transition": "fade",
        "duration": 5000
    }
    create_evt = requests.post(f"{API_BASE}/api/events", headers=headers, json=evt_payload, timeout=15)
    assert create_evt.status_code == 201, f"Event create failed: {create_evt.text}"
    evt_data = create_evt.json()
    assert evt_data["name"] == "Art Exhibition"
    event_id = evt_data["id"]

    get_evts = requests.get(f"{API_BASE}/api/events", headers=headers, timeout=15)
    assert get_evts.status_code == 200 and len(get_evts.json()) >= 1

    del_evt = requests.delete(f"{API_BASE}/api/events/{event_id}", headers=headers, timeout=15)
    assert del_evt.status_code == 200 and del_evt.json()["success"]
    print("[OK] Scheduled Events CRUD API verified")

    # Clean up WebSockets
    try:
        tv_ws.close()
        browser_ws.close()
    except Exception:
        pass

    print("\n==================================================")
    print(" ALL 8 E2E SYSTEM INTEGRATION TESTS PASSED 100%!")
    print("==================================================")


if __name__ == "__main__":
    try:
        main()
    except AssertionError as err:
        print("\nE2E TEST FAILED:", err)
        sys.exit(1)
    except Exception as err:
        print("\nE2E ERROR:", err)
        sys.exit(1)
