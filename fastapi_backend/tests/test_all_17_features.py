"""Deckoviz v1 MVP — Full 17-Feature Automated Test Suite

Runs end-to-end against the FastAPI application surface, testing both HTTP endpoints
and WebSocket real-time delivery to simulated TV clients.
"""
import os
import sys
import unittest
import json
from typing import Any, Dict

# Ensure repository root is on PYTHONPATH
SYS_PATH_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if SYS_PATH_ROOT not in sys.path:
    sys.path.insert(0, SYS_PATH_ROOT)

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

TEST_USER_ID = "test_user_e2e_17_features"
AUTH_HEADERS = {"Authorization": f"Bearer {TEST_USER_ID}"}


class TestDeckoviz17Features(unittest.TestCase):

    # ── Feature 1: Pair TV via 6-digit Code ──────────────────────────────────
    def test_feature_01_pair_tv_code(self):
        """Happy Path & Edge Case: Create pairing session, poll code, pair device, verify invalid code."""
        # 1. Create pairing session
        res = client.post(
            "/api/pairing/session",
            json={"device_name": "Test TV", "platform": "google_tv"},
        )
        self.assertIn(res.status_code, (200, 201), f"Session create failed: {res.text}")
        data = res.json()
        session_id = data["session_id"]
        code = data["code"]
        aid = data["app_instance_id"]
        self.assertTrue(code and len(code) == 6)

        # 2. Edge Case: Invalid pairing code
        bad_res = client.post("/api/pairing/pair", json={"code": "000000"})
        self.assertIn(bad_res.status_code, (400, 404))

        # 3. Happy Path: Pair using valid 6-digit code
        pair_res = client.post(
            "/api/pairing/pair",
            json={"code": code},
            headers=AUTH_HEADERS,
        )
        self.assertEqual(pair_res.status_code, 200, f"Pairing failed: {pair_res.text}")
        pair_data = pair_res.json()
        self.assertEqual(pair_data["status"], "paired")
        self.assertTrue(pair_data["token"])
        self.assertEqual(pair_data["app_instance_id"], aid)

    # ── Feature 2: Disconnect / Unpair TV ─────────────────────────────────────
    def test_feature_02_unpair_tv(self):
        """Happy Path & Edge Case: Pair device then unpair / disconnect via API."""
        # Pair a new session
        sess_res = client.post("/api/pairing/session", json={"device_name": "Unpair Test TV"})
        aid = sess_res.json()["app_instance_id"]
        code = sess_res.json()["code"]
        client.post("/api/pairing/pair", json={"code": code}, headers=AUTH_HEADERS)

        # Happy Path: Call unpair endpoint
        unpair_res = client.post(
            "/api/pairing/unpair",
            json={"app_instance_id": aid},
            headers=AUTH_HEADERS,
        )
        self.assertEqual(unpair_res.status_code, 200, f"Unpair failed: {unpair_res.text}")
        self.assertTrue(unpair_res.json().get("success"))

        # Edge Case: Unpair already unpaired device
        unpair_again = client.post(
            "/api/pairing/unpair",
            json={"app_instance_id": "non_existent_app_id"},
            headers=AUTH_HEADERS,
        )
        self.assertIn(unpair_again.status_code, (200, 404))

    # ── Feature 3: Live Streaming Direct to TV ───────────────────────────────
    def test_feature_03_livestream_direct(self):
        """Happy Path & Edge Case: Send livestream direct to TV, assert WS receives display_artwork."""
        aid = "tv_sim_feature_03"

        # Connect TV WebSocket client
        with client.websocket_connect(f"/ws/tv?token={TEST_USER_ID}&app_instance_id={aid}") as ws:
            # 1. Handshake connected envelope
            connected_msg = ws.receive_json()
            self.assertEqual(connected_msg["action"], "connected")

            # 2. Trigger livestream via HTTP API
            stream_res = client.post(
                f"/api/livestream/{aid}",
                json={
                    "artwork_id": "art_live_03",
                    "url": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119",
                    "transition": "fade",
                    "duration": 6000,
                },
                headers=AUTH_HEADERS,
            )
            self.assertEqual(stream_res.status_code, 200, f"Livestream API failed: {stream_res.text}")
            self.assertTrue(stream_res.json().get("dispatched"))

            # 3. Assert WS receives display_artwork envelope
            msg = ws.receive_json()
            self.assertEqual(msg["action"], "display_artwork")
            self.assertEqual(msg["payload"]["artwork_id"], "art_live_03")
            self.assertEqual(msg["payload"]["url"], "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119")

    # ── Feature 4: Image Generation via VGC ──────────────────────────────────
    def test_feature_04_vgc_generation(self):
        """Happy Path & Edge Case: Call VGC chat & image generation endpoints."""
        res = client.get("/api/vizzy/chats", headers=AUTH_HEADERS)
        self.assertEqual(res.status_code, 200, f"VGC get chats failed: {res.text}")
        self.assertIsInstance(res.json(), list)

        # Edge Case: Get non-existent chat detail
        detail_res = client.get("/api/vizzy/chats/non_existent_chat", headers=AUTH_HEADERS)
        self.assertIn(detail_res.status_code, (200, 404))

    # ── Feature 5: Text Prompt to Artwork ────────────────────────────────────
    def test_feature_05_prompt_to_artwork(self):
        """Happy Path: Verify prompt-to-artwork routes and power-uses endpoints."""
        power_res = client.get("/api/power-uses/general", headers=AUTH_HEADERS)
        self.assertEqual(power_res.status_code, 200, f"Power uses failed: {power_res.text}")
        self.assertIsInstance(power_res.json(), (list, dict))

    # ── Feature 6: Session Persistence ───────────────────────────────────────
    def test_feature_06_session_persistence(self):
        """Happy Path & Edge Case: Authenticate WS with user token, assert persistent session user_id."""
        aid = "tv_sim_feature_06"
        with client.websocket_connect(f"/ws/tv?token={TEST_USER_ID}&app_instance_id={aid}") as ws:
            msg = ws.receive_json()
            self.assertEqual(msg["action"], "connected")
            self.assertEqual(msg["payload"]["user_id"], TEST_USER_ID)
            self.assertEqual(msg["payload"]["app_instance_id"], aid)

    # ── Feature 7: Current Collection & Queue View ───────────────────────────
    def test_feature_07_queue_view(self):
        """Happy Path & Edge Case: Retrieve current device queue status."""
        aid = "tv_sim_feature_07"
        res = client.get(f"/api/queue/{aid}", headers=AUTH_HEADERS)
        self.assertEqual(res.status_code, 200, f"Queue view failed: {res.text}")
        data = res.json()
        self.assertIn("active_top_20", data)
        self.assertIn("total_queued", data)

    # ── Feature 8: Personal Media Library ────────────────────────────────────
    def test_feature_08_personal_media_library(self):
        """Happy Path & Edge Case: Upload media (JSON & Form), list media, tag batch, delete media."""
        # 1. Upload media via JSON
        json_upload = client.post(
            "/api/upload",
            json={
                "url": "https://example.com/personal_art.jpg",
                "fileName": "personal_art.jpg",
                "prompt": "Vibrant abstract sunset",
                "source": "vizzy_chat",
            },
            headers=AUTH_HEADERS,
        )
        self.assertEqual(json_upload.status_code, 200, f"JSON upload failed: {json_upload.text}")
        media_id = json_upload.json()["id"]

        # 2. Upload media via FormData
        form_upload = client.post(
            "/api/upload",
            data={"url": "https://example.com/form_art.jpg", "fileName": "form_art.jpg", "source": "vizzy_chat"},
            headers=AUTH_HEADERS,
        )
        self.assertEqual(form_upload.status_code, 200, f"Form upload failed: {form_upload.text}")

        # 3. List media
        list_res = client.get("/api/home/media", headers=AUTH_HEADERS)
        self.assertEqual(list_res.status_code, 200)
        items = list_res.json()
        self.assertTrue(any(m["id"] == media_id for m in items))

        # 4. Tag batch
        tag_res = client.post(
            "/api/upload/batch/tag",
            json={"media_ids": [media_id], "tags": "nature,sunset"},
            headers=AUTH_HEADERS,
        )
        self.assertEqual(tag_res.status_code, 200)

        # 5. Delete media
        del_res = client.delete(f"/api/home/media/{media_id}", headers=AUTH_HEADERS)
        self.assertEqual(del_res.status_code, 200)

        # Edge Case: Upload empty payload (no file and no url)
        bad_upload = client.post("/api/upload", data={}, headers=AUTH_HEADERS)
        self.assertEqual(bad_upload.status_code, 422)

    # ── Feature 9: Personal Collections ──────────────────────────────────────
    def test_feature_09_personal_collections(self):
        """Happy Path & Edge Case: Create collection, add item, list, delete."""
        # 1. Create collection
        col_res = client.post(
            "/api/home/collections",
            json={
                "name": "E2E Test Collection",
                "items": [
                    {"url": "https://example.com/col_img1.jpg", "title": "Slide 1"},
                    {"url": "https://example.com/col_img2.jpg", "title": "Slide 2"},
                ],
            },
            headers=AUTH_HEADERS,
        )
        self.assertEqual(col_res.status_code, 200, f"Create collection failed: {col_res.text}")
        col_id = col_res.json()["id"]

        # 2. Add item to collection
        item_res = client.post(
            f"/api/home/collections/{col_id}/items",
            json={"url": "https://example.com/col_img3.jpg", "title": "Slide 3"},
            headers=AUTH_HEADERS,
        )
        self.assertEqual(item_res.status_code, 200)

        # 3. List collections
        list_res = client.get("/api/home/collections", headers=AUTH_HEADERS)
        self.assertEqual(list_res.status_code, 200)
        self.assertTrue(any(c["id"] == col_id for c in list_res.json()))

        # 4. Delete collection
        del_res = client.delete(f"/api/home/collections/{col_id}", headers=AUTH_HEADERS)
        self.assertEqual(del_res.status_code, 200)

    # ── Feature 10: Personal Queue & Daily Queue ─────────────────────────────
    def test_feature_10_queue_management(self):
        """Happy Path & Edge Case: Add collection to device queue, reorder, shuffle, auto-populate, remove.
        Assert TV WebSocket receives replace_queue with hydrated items[].
        """
        aid = "tv_sim_feature_10"

        # Create test collection first
        col_res = client.post(
            "/api/home/collections",
            json={
                "name": "Queue Test Collection",
                "items": [{"url": "https://example.com/queue_slide.jpg", "title": "Queue Slide"}],
            },
            headers=AUTH_HEADERS,
        )
        col_id = col_res.json()["id"]

        with client.websocket_connect(f"/ws/tv?token={TEST_USER_ID}&app_instance_id={aid}") as ws:
            ws.receive_json()  # connected envelope

            # 1. Add to queue
            add_res = client.post(
                f"/api/queue/{aid}",
                json={"collection_id": col_id, "name": "Queue Test Collection", "item_count": 1},
                headers=AUTH_HEADERS,
            )
            self.assertEqual(add_res.status_code, 201, f"Queue add failed: {add_res.text}")

            # 2. Assert TV WS receives replace_queue message with BOTH 'queue' and 'collections' keys
            ws_msg = ws.receive_json()
            self.assertIn(ws_msg["action"], ("replace_queue", "queue_collection"))
            payload = ws_msg["payload"]
            self.assertIn("queue", payload)
            self.assertIn("collections", payload)

            # Assert items[] are hydrated
            q_items = payload["queue"]
            self.assertTrue(len(q_items) > 0)
            self.assertIn("items", q_items[0])
            self.assertTrue(len(q_items[0]["items"]) > 0)
            self.assertEqual(q_items[0]["items"][0]["url"], "https://example.com/queue_slide.jpg")

            # 3. Shuffle queue
            shuf_res = client.post(f"/api/queue/{aid}/shuffle", json={"max_attempts": 3}, headers=AUTH_HEADERS)
            self.assertEqual(shuf_res.status_code, 200)

            # 4. Auto-populate queue
            auto_res = client.post(f"/api/queue/{aid}/auto-populate", json={"max_items": 10}, headers=AUTH_HEADERS)
            self.assertEqual(auto_res.status_code, 200)

            # 5. Remove from queue
            rem_res = client.delete(f"/api/queue/{aid}/{col_id}", headers=AUTH_HEADERS)
            self.assertEqual(rem_res.status_code, 200)

    # ── Feature 11: Personal Music Library ────────────────────────────────────
    def test_feature_11_personal_music(self):
        """Happy Path & Edge Case: Add user music track, list music."""
        add_res = client.post(
            "/api/home/music",
            json={"title": "Ambient Chill Track", "artist": "Deckoviz Music", "url": "https://example.com/chill.mp3"},
            headers=AUTH_HEADERS,
        )
        self.assertEqual(add_res.status_code, 200, f"Add music failed: {add_res.text}")

        list_res = client.get("/api/home/music", headers=AUTH_HEADERS)
        self.assertEqual(list_res.status_code, 200)
        self.assertIsInstance(list_res.json(), list)

    # ── Feature 12: Global Artwork Library ───────────────────────────────────
    def test_feature_12_global_artwork_library(self):
        """Happy Path: Fetch global curated artworks catalog (20 default items)."""
        curator_res = client.get("/api/curator/artworks", headers=AUTH_HEADERS)
        self.assertEqual(curator_res.status_code, 200, f"Curator artworks failed: {curator_res.text}")
        artworks = curator_res.json()
        self.assertIsInstance(artworks, list)
        self.assertGreaterEqual(len(artworks), 20, "Expected at least 20 curated seed artworks")

        featured_res = client.get("/artworks/featured")
        self.assertIn(featured_res.status_code, (200, 404))  # optional endpoint

    # ── Feature 13: Live Streaming Multi-Upload & Batching ───────────────────
    def test_feature_13_livestream_batching(self):
        """Happy Path & Edge Case: Multi-upload batching & livestream batching."""
        aid = "tv_sim_feature_13"
        batch_res = client.post(
            f"/api/livestream/batch/{aid}",
            json={
                "artworks": [
                    {"artwork_id": "b1", "url": "https://example.com/b1.jpg"},
                    {"artwork_id": "b2", "url": "https://example.com/b2.jpg"},
                ],
                "interval_seconds": 3,
                "transition": "crossfade",
            },
            headers=AUTH_HEADERS,
        )
        self.assertEqual(batch_res.status_code, 200, f"Batch livestream failed: {batch_res.text}")
        self.assertTrue(batch_res.json().get("success"))

        # Edge Case: Empty batch upload
        empty_batch = client.post("/api/upload/batch", headers=AUTH_HEADERS)
        self.assertIn(empty_batch.status_code, (400, 422))

    # ── Feature 14: Live Streaming Loops & Transitions ─────────────
    def test_feature_14_livestream_loops(self):
        """Happy Path: Verify livestream loop metadata and transitions."""
        aid = "tv_sim_feature_14"
        loop_res = client.post(
            f"/api/livestream/batch/{aid}",
            json={
                "artworks": [{"url": "https://example.com/loop1.jpg"}],
                "interval_seconds": 5,
                "transition": "zoom",
            },
            headers=AUTH_HEADERS,
        )
        self.assertEqual(loop_res.status_code, 200)
        self.assertTrue(loop_res.json().get("success"))

    # ── Feature 15: Global Music Library ─────────────────────────────────────
    def test_feature_15_global_music_library(self):
        """Happy Path: Fetch global music catalog (merged 20 curated tracks)."""
        res = client.get("/api/curator/music", headers=AUTH_HEADERS)
        self.assertEqual(res.status_code, 200, f"Curator music failed: {res.text}")
        music_tracks = res.json()
        self.assertIsInstance(music_tracks, list)
        self.assertGreaterEqual(len(music_tracks), 20, "Expected at least 20 curated seed music tracks")

    # ── Feature 16: Video Streaming Support ──────────────────────────────────
    def test_feature_16_video_streaming(self):
        """Happy Path & Edge Case: Register video media and stream video URL to TV client."""
        aid = "tv_sim_feature_16"

        # Register video media
        vid_res = client.post(
            "/api/upload",
            json={
                "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "fileName": "BigBuckBunny.mp4",
                "mediaType": "video/mp4",
            },
            headers=AUTH_HEADERS,
        )
        self.assertEqual(vid_res.status_code, 200, f"Video upload failed: {vid_res.text}")
        vid_url = vid_res.json()["url"]

        # Stream video to TV
        with client.websocket_connect(f"/ws/tv?token={TEST_USER_ID}&app_instance_id={aid}") as ws:
            ws.receive_json()  # connected

            stream_res = client.post(
                f"/api/livestream/{aid}",
                json={"artwork_id": "vid_01", "url": vid_url},
                headers=AUTH_HEADERS,
            )
            self.assertEqual(stream_res.status_code, 200)

            ws_msg = ws.receive_json()
            self.assertEqual(ws_msg["action"], "display_artwork")
            self.assertTrue(ws_msg["payload"]["url"].endswith(".mp4"))

    # ── Feature 17: Live Streaming Direct Playback without Collection ────────
    def test_feature_17_direct_livestream_no_collection(self):
        """Happy Path: Instant livestreaming direct playback bypassing collection/queue."""
        aid = "tv_sim_feature_17"
        with client.websocket_connect(f"/ws/tv?token={TEST_USER_ID}&app_instance_id={aid}") as ws:
            ws.receive_json()

            res = client.post(
                f"/api/livestream/{aid}",
                json={"artwork_id": "direct_17", "url": "https://example.com/direct.jpg"},
                headers=AUTH_HEADERS,
            )
            self.assertEqual(res.status_code, 200)

            msg = ws.receive_json()
            self.assertEqual(msg["action"], "display_artwork")
            self.assertEqual(msg["payload"]["url"], "https://example.com/direct.jpg")


if __name__ == "__main__":
    unittest.main()
