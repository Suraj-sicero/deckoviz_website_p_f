import uuid
from datetime import datetime, timezone
from typing import Any, Dict, Optional

from fastapi import WebSocket

from services import device_registry

# user_id → { conn_key → {ws, client_type, app_instance_id} }
_connections: Dict[str, Dict[str, Dict[str, Any]]] = {}


def _iso_now() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def envelope(
    action: str,
    payload: Dict[str, Any],
    *,
    target: Optional[Dict] = None,
    message_id: Optional[str] = None,
) -> Dict[str, Any]:
    msg: Dict[str, Any] = {
        "protocol_version": 1,
        "message_id": message_id or str(uuid.uuid4()),
        "timestamp": _iso_now(),
        "action": action,
        "payload": payload,
    }
    if target:
        msg["target"] = target
    return msg


async def send_json(ws: WebSocket, data: Dict[str, Any]) -> None:
    try:
        await ws.send_json(data)
    except Exception:
        pass


def register(user_id: str, client_type: str, app_instance_id: Optional[str], ws: WebSocket) -> str:
    if user_id not in _connections:
        _connections[user_id] = {}
    key = app_instance_id if client_type == "tv" else "browser"
    _connections[user_id][key] = {
        "ws": ws,
        "client_type": client_type,
        "app_instance_id": app_instance_id,
    }
    return key


def unregister(user_id: str, conn_key: str) -> None:
    user_conns = _connections.get(user_id)
    if not user_conns:
        return
    user_conns.pop(conn_key, None)
    if not user_conns:
        _connections.pop(user_id, None)


def is_tv_online(user_id: str, app_instance_id: str) -> bool:
    user_conns = _connections.get(user_id) or {}
    for conn in user_conns.values():
        if conn["client_type"] == "tv" and conn["app_instance_id"] == app_instance_id:
            return True
    return False


async def route_to_tv(
    user_id: str, target_app_instance_id: Optional[str], message: Dict[str, Any]
) -> bool:
    user_conns = _connections.get(user_id)
    if not user_conns:
        return False
    sent = False
    for conn in user_conns.values():
        if conn["client_type"] != "tv":
            continue
        if target_app_instance_id and conn["app_instance_id"] != target_app_instance_id:
            continue
        await send_json(conn["ws"], message)
        sent = True
    return sent


async def broadcast_to_browsers(user_id: str, message: Dict[str, Any]) -> None:
    user_conns = _connections.get(user_id)
    if not user_conns:
        return
    for conn in user_conns.values():
        if conn["client_type"] == "browser":
            await send_json(conn["ws"], message)


async def send_connected(
    ws: WebSocket, client_type: str, user_id: str, app_instance_id: Optional[str]
) -> None:
    await send_json(
        ws,
        envelope(
            "connected",
            {
                "client_type": client_type,
                "user_id": user_id,
                "app_instance_id": app_instance_id,
                "server_time": _iso_now(),
            },
        ),
    )


async def send_acknowledgement(
    ws: WebSocket, reference_message_id: Optional[str], status: str = "success"
) -> None:
    await send_json(
        ws,
        envelope(
            "acknowledgement",
            {"reference_message_id": reference_message_id, "status": status},
        ),
    )


async def send_error(ws: WebSocket, reference_message_id: Optional[str], reason: str) -> None:
    await send_json(
        ws,
        envelope(
            "error",
            {"reference_message_id": reference_message_id, "status": "failed", "reason": reason},
        ),
    )


async def send_devices_list(user_id: str, ws: WebSocket) -> None:
    devices = device_registry.list_devices_for_user(user_id)
    db_ids = {d["app_instance_id"] for d in devices}
    live = []
    for d in devices:
        online = is_tv_online(user_id, d["app_instance_id"])
        live.append(
            {
                "app_instance_id": d["app_instance_id"],
                "device_name": d["device_name"],
                "platform": d["platform"],
                "status": "online" if online else "offline",
                "last_seen": d.get("last_seen"),
                "current_artwork": d.get("current_artwork"),
                "playback_state": d.get("playback_state"),
            }
        )

    user_conns = _connections.get(user_id) or {}
    for conn in user_conns.values():
        aid = conn.get("app_instance_id")
        if conn["client_type"] == "tv" and aid and aid not in db_ids:
            live.append(
                {
                    "app_instance_id": aid,
                    "device_name": "TV Device",
                    "platform": "unknown",
                    "status": "online",
                    "last_seen": _iso_now(),
                    "current_artwork": None,
                    "playback_state": "playing",
                }
            )

    await send_json(ws, envelope("devices_list", {"devices": live}))


async def notify_browsers_device_offline(user_id: str, app_instance_id: str) -> None:
    await broadcast_to_browsers(
        user_id,
        envelope("device_offline", {"app_instance_id": app_instance_id}),
    )


async def refresh_browser_device_lists(user_id: str) -> None:
    user_conns = _connections.get(user_id) or {}
    for conn in user_conns.values():
        if conn["client_type"] == "browser":
            await send_devices_list(user_id, conn["ws"])
