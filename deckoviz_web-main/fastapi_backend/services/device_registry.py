from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import Any

# app_instance_id → device record
_devices: dict[str, dict[str, Any]] = {}


def _iso_now() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def upsert_device(
    *,
    user_id: str,
    app_instance_id: str,
    device_name: str = "Deckoviz TV",
    platform: str = "google_tv",
    status: str = "offline",
) -> tuple[dict[str, Any], bool]:
    existing = _devices.get(app_instance_id)
    if existing:
        existing["user_id"] = user_id
        existing["device_name"] = device_name or existing["device_name"]
        existing["platform"] = platform or existing["platform"]
        existing["last_seen"] = _iso_now()
        if status:
            existing["status"] = status
        return existing, False

    device = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "app_instance_id": app_instance_id,
        "device_name": device_name,
        "platform": platform,
        "status": status,
        "last_seen": _iso_now(),
        "current_artwork": None,
        "playback_state": None,
    }
    _devices[app_instance_id] = device
    return device, True


def list_devices_for_user(user_id: str) -> list[dict[str, Any]]:
    return [d for d in _devices.values() if d["user_id"] == user_id]


def set_status(user_id: str, app_instance_id: str, status: str) -> None:
    device = _devices.get(app_instance_id)
    if device and device["user_id"] == user_id:
        device["status"] = status
        device["last_seen"] = _iso_now()


def get_device(app_instance_id: str) -> dict[str, Any] | None:
    return _devices.get(app_instance_id)

def push_pending_command(user_id: str, app_instance_id: str, message: dict[str, Any]) -> None:
    device = _devices.get(app_instance_id)
    if device and device["user_id"] == user_id:
        if "pending_commands" not in device:
            device["pending_commands"] = []
        # Keep only the last command of each type to avoid stale spam, or just append
        # For MVP, we simply queue the latest command, maybe replacing existing similar ones
        # For simplicity, let's keep the queue length reasonable
        device["pending_commands"].append(message)
        if len(device["pending_commands"]) > 5:
            device["pending_commands"].pop(0)

def pop_pending_commands(user_id: str, app_instance_id: str) -> list[dict[str, Any]]:
    device = _devices.get(app_instance_id)
    if device and device["user_id"] == user_id:
        commands = device.get("pending_commands", [])
        device["pending_commands"] = []
        return commands
    return []
