"""
End-to-End Verification Script for TV Simulator Pairing & Display Transfer.
"""
import sys
import os
import json
import time
import requests
import websocket

API_BASE = "http://127.0.0.1:8000"
WS_BASE = "ws://127.0.0.1:8000"

def test_full_e2e_flow():
    print("=== STARTING END-TO-END TV SIMULATOR FLOW VERIFICATION ===")

    # 1. Create pairing session (TV Simulator action)
    print("\n[Step 1] Requesting pairing session from backend...")
    res = requests.post(
        f"{API_BASE}/api/pairing/session",
        json={"device_name": "Deckoviz TV Simulator", "platform": "google_tv", "pair_page_base_url": "http://localhost:5173"},
        timeout=10
    )
    assert res.status_code == 201, f"Failed session creation: {res.text}"
    session = res.json()
    session_id = session["session_id"]
    code = session["code"]
    app_instance_id = session["app_instance_id"]
    print(f"✓ Session created: session_id={session_id}, code={code}, app_instance_id={app_instance_id}")

    # 2. Verify initial poll is pending
    print("\n[Step 2] Polling session before claim...")
    poll1 = requests.get(f"{API_BASE}/api/pairing/session/{session_id}", timeout=10).json()
    assert poll1["status"] == "pending", f"Expected pending status, got {poll1}"
    print(f"✓ Session status: {poll1['status']} (Expires: {poll1['expires_at']})")

    # 3. User claims code (Web App action)
    print("\n[Step 3] Simulating user claiming 6-digit code in Web App...")
    sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    from auth import create_access_token
    
    test_user_id = "user_e2e_tv_sim_001"
    user_token = create_access_token({"uid": test_user_id, "email": "test@deckoviz.app", "name": "TV Sim Tester"})

    claim_res = requests.post(
        f"{API_BASE}/api/pairing/claim",
        headers={"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"},
        json={"code": code},
        timeout=10
    )
    assert claim_res.status_code == 200, f"Failed code claim: {claim_res.text}"
    claim_data = claim_res.json()
    assert claim_data.get("success") is True
    print(f"✓ Code claimed successfully for device: {claim_data['device']['device_name']} (ID: {claim_data['device']['app_instance_id']})")

    # 4. TV Simulator polls session and receives JWT token
    print("\n[Step 4] Polling session after claim to retrieve TV JWT token...")
    poll2 = requests.get(f"{API_BASE}/api/pairing/session/{session_id}", timeout=10).json()
    assert poll2["status"] == "paired" and poll2.get("token"), f"Expected paired with token, got {poll2}"
    tv_jwt_token = poll2["token"]
    print(f"✓ Pairing completed! Received TV JWT Token: {tv_jwt_token[:20]}...")

    # 5. Connect TV WebSocket
    print("\n[Step 5] Connecting TV WebSocket with received credentials...")
    tv_ws_url = f"{WS_BASE}/ws/tv?token={tv_jwt_token}&app_instance_id={app_instance_id}"
    
    received_messages = []
    
    def on_message(ws, message):
        msg = json.loads(message)
        print(f"  [TV WS RECV] action={msg.get('action')}")
        received_messages.append(msg)
        if msg.get("action") == "display_image":
            # Send ACK back
            ack = {
                "protocol_version": 1,
                "message_id": "ack_msg_001",
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "action": "acknowledgement",
                "payload": {"reference_message_id": msg.get("message_id"), "status": "success"}
            }
            ws.send(json.dumps(ack))
            print("  [TV WS SENT ACK] sent acknowledgement for message_id=", msg.get("message_id"))

    ws_app = websocket.WebSocketApp(
        tv_ws_url,
        on_message=on_message,
        on_error=lambda ws, err: print(f"  [TV WS ERR] {err}"),
        on_close=lambda ws, code, msg: print(f"  [TV WS CLOSED] code={code}")
    )
    
    import threading
    ws_thread = threading.Thread(target=ws_app.run_forever, daemon=True)
    ws_thread.start()
    
    time.sleep(1.5)
    assert any(m.get("action") == "connected" for m in received_messages), "TV WS failed to receive 'connected' handshake"
    print("✓ TV WebSocket connected and authenticated!")

    # 6. Connect Browser WS & Send Artwork
    print("\n[Step 6] Connecting Browser WebSocket to send artwork to TV...")
    browser_ws_url = f"{WS_BASE}/ws/browser?token={user_token}"
    browser_messages = []
    
    b_ws = websocket.WebSocketApp(
        browser_ws_url,
        on_message=lambda ws, msg: browser_messages.append(json.loads(msg))
    )
    b_thread = threading.Thread(target=b_ws.run_forever, daemon=True)
    b_thread.start()
    
    time.sleep(1.5)
    
    test_image_url = "https://picsum.photos/seed/deckoviz-test/1920/1080"
    display_cmd = {
        "protocol_version": 1,
        "message_id": "test_cmd_1001",
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "action": "display_image",
        "target": {"app_instance_id": app_instance_id},
        "payload": {
            "url": test_image_url,
            "title": "Masterpiece Artwork",
            "image_id": "art_101",
            "duration": 10000
        }
    }
    
    b_ws.send(json.dumps(display_cmd))
    print(f"✓ Browser sent 'display_image' command targeting app_instance_id={app_instance_id}")

    # 7. Verify TV received artwork
    print("\n[Step 7] Verifying TV received the artwork message...")
    time.sleep(2.0)
    
    tv_display_msg = next((m for m in received_messages if m.get("action") == "display_image"), None)
    assert tv_display_msg is not None, "TV did not receive display_image action!"
    assert tv_display_msg["payload"]["url"] == test_image_url
    print(f"✓ TV received display_image with URL: {tv_display_msg['payload']['url']}")

    # 8. Verify Browser received TV ACK
    print("\n[Step 8] Verifying Browser received ACK from TV...")
    ack_msg = next((m for m in browser_messages if m.get("action") == "acknowledgement"), None)
    assert ack_msg is not None, "Browser did not receive ACK from TV!"
    assert ack_msg["payload"]["reference_message_id"] == "test_cmd_1001"
    print(f"✓ Browser received ACK from TV: status={ack_msg['payload']['status']}")

    b_ws.close()
    ws_app.close()
    
    print("\n==================================================")
    print("SUCCESS: ALL 8 END-TO-END VERIFICATION STEPS PASSED!")
    print("==================================================")

if __name__ == "__main__":
    test_full_e2e_flow()
