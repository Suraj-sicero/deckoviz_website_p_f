from __future__ import annotations

import logging
from typing import Any

import jwt
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from auth import verify_token_to_user_dict, verify_token_to_user_dict_async
from config import settings
from services import device_registry, ws_hub

logger = logging.getLogger("deckoviz.ws")
router = APIRouter(tags=["RTCSP WebSocket"])

MAX_MESSAGE_SIZE = 1024 * 1024


async def _verify_token(token: str) -> dict[str, Any] | None:
    """Async-safe token verification — runs blocking Firebase calls in a thread pool."""
    return await verify_token_to_user_dict_async(token)


async def _handle_display_image(
    user_id: str,
    payload: dict[str, Any],
    target_app_instance_id: str | None,
    origin_message_id: str | None,
) -> bool:
    message = ws_hub.envelope(
        "display_image",
        {
            "url": payload.get("url"),
            "image_id": payload.get("image_id"),
            "image_url_or_ref": payload.get("image_url_or_ref") or payload.get("url"),
            "duration": payload.get("duration") or 5000,
            "transition": payload.get("transition") or "fade",
        },
        target={"app_instance_id": target_app_instance_id} if target_app_instance_id else None,
        message_id=origin_message_id,
    )
    return await ws_hub.route_to_tv(user_id, target_app_instance_id, message)


async def _handle_acknowledgement(
    user_id: str,
    payload: dict[str, Any],
    tv_app_instance_id: str | None,
) -> bool:
    forward = ws_hub.envelope(
        "acknowledgement",
        {
            "reference_message_id": payload.get("reference_message_id") or payload.get("message_id"),
            "status": payload.get("status") or "success",
            "reason": payload.get("reason"),
            "source": "tv",
            "app_instance_id": tv_app_instance_id,
        },
    )
    await ws_hub.broadcast_to_browsers(user_id, forward)
    return True


async def _run_socket(websocket: WebSocket, client_type: str, app_instance_id: str | None) -> None:
    token = websocket.query_params.get("token")
    if not token:
        await websocket.close(code=4401)
        return

    user = await _verify_token(token)
    if not user:
        await websocket.close(code=4401)
        return

    if client_type == "tv" and not app_instance_id:
        await websocket.close(code=4400)
        return

    user_id = user["id"]
    await websocket.accept()
    conn_key = ws_hub.register(user_id, client_type, app_instance_id, websocket)
    logger.info("WS %s connected user=%s app=%s", client_type, user_id, app_instance_id)

    try:
        await ws_hub.send_connected(websocket, client_type, user_id, app_instance_id)

        if client_type == "browser":
            await ws_hub.send_devices_list(user_id, websocket)

        if client_type == "tv" and app_instance_id:
            device_registry.set_status(user_id, app_instance_id, "online")
            # ensure device exists even if claim used different process (same process for MVP)
            if not device_registry.get_device(app_instance_id):
                device_registry.upsert_device(
                    user_id=user_id,
                    app_instance_id=app_instance_id,
                    status="online",
                )
            else:
                device_registry.set_status(user_id, app_instance_id, "online")
            await ws_hub.refresh_browser_device_lists(user_id)

        while True:
            raw = await websocket.receive_text()
            if len(raw.encode("utf-8")) > MAX_MESSAGE_SIZE:
                await ws_hub.send_error(websocket, None, "Message too large. Maximum 1MB.")
                continue

            try:
                import json

                message = json.loads(raw)
            except Exception:
                await ws_hub.send_error(websocket, None, "Invalid JSON.")
                continue

            action = message.get("action")
            message_id = message.get("message_id")
            payload = message.get("payload") or {}
            target = message.get("target") or {}
            target_id = target.get("app_instance_id") or app_instance_id

            if not action:
                await ws_hub.send_error(websocket, message_id, "Missing 'action' field.")
                continue

            try:
                if action == "display_image":
                    sent = await _handle_display_image(user_id, payload, target_id, message_id)
                    if not sent:
                        await ws_hub.send_error(websocket, message_id, "Target device not connected")
                    else:
                        await ws_hub.send_acknowledgement(websocket, message_id, "success")
                elif action == "acknowledgement":
                    await _handle_acknowledgement(user_id, payload, app_instance_id)
                    await ws_hub.send_acknowledgement(websocket, message_id, "success")
                elif action in ("heartbeat", "register_device"):
                    if client_type == "tv" and app_instance_id:
                        device_registry.set_status(user_id, app_instance_id, "online")
                        if action == "register_device":
                            device_registry.upsert_device(
                                user_id=user_id,
                                app_instance_id=app_instance_id,
                                device_name=payload.get("device_name") or "Deckoviz TV",
                                platform=payload.get("platform") or "google_tv",
                                status="online",
                            )
                    await ws_hub.send_acknowledgement(websocket, message_id, "success")
                else:
                    await ws_hub.send_error(websocket, message_id, f"Unknown action: {action}")
            except Exception as exc:
                logger.exception("WS action error %s", action)
                await ws_hub.send_error(websocket, message_id, str(exc) or "Internal server error")

    except WebSocketDisconnect:
        pass
    finally:
        ws_hub.unregister(user_id, conn_key)
        logger.info("WS %s disconnected user=%s app=%s", client_type, user_id, app_instance_id)
        if client_type == "tv" and app_instance_id:
            device_registry.set_status(user_id, app_instance_id, "offline")
            await ws_hub.notify_browsers_device_offline(user_id, app_instance_id)
            await ws_hub.refresh_browser_device_lists(user_id)


@router.websocket("/ws/browser")
async def ws_browser(websocket: WebSocket):
    await _run_socket(websocket, "browser", None)


@router.websocket("/ws/tv")
async def ws_tv(websocket: WebSocket):
    app_instance_id = websocket.query_params.get("app_instance_id")
    await _run_socket(websocket, "tv", app_instance_id)
