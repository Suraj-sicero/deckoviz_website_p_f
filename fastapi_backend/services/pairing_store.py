from __future__ import annotations

import re
import secrets
import time
import uuid
from typing import Any
from urllib.parse import parse_qs, urlparse

SESSION_TTL_MS = 10 * 60 * 1000

_sessions_by_id: dict[str, dict[str, Any]] = {}
_session_id_by_code: dict[str, str] = {}


def _now_ms() -> int:
    return int(time.time() * 1000)


def cleanup_expired() -> None:
    now = _now_ms()
    for session_id, session in list(_sessions_by_id.items()):
        if session["expires_at"] <= now and session["status"] == "pending":
            session["status"] = "expired"
            code = session.get("code")
            if code:
                _session_id_by_code.pop(code, None)


def generate_unique_code() -> str:
    for _ in range(50):
        code = str(secrets.randbelow(900000) + 100000)
        existing_id = _session_id_by_code.get(code)
        if not existing_id:
            return code
        existing = _sessions_by_id.get(existing_id)
        if (
            not existing
            or existing["status"] != "pending"
            or existing["expires_at"] <= _now_ms()
        ):
            _session_id_by_code.pop(code, None)
            return code
    raise RuntimeError("Unable to generate unique pairing code")


def create_session(
    *,
    device_name: str | None = None,
    platform: str | None = None,
    pair_page_base_url: str | None = None,
) -> dict[str, Any]:
    cleanup_expired()

    session_id = str(uuid.uuid4())
    app_instance_id = str(uuid.uuid4())
    code = generate_unique_code()
    expires_at = _now_ms() + SESSION_TTL_MS
    pair_base = (pair_page_base_url or "http://localhost:5173").rstrip("/")
    qr_payload = f"{pair_base}/pair?code={code}"

    session = {
        "session_id": session_id,
        "code": code,
        "app_instance_id": app_instance_id,
        "status": "pending",
        "expires_at": expires_at,
        "qr_payload": qr_payload,
        "device_name": device_name or "Deckoviz TV",
        "platform": platform or "google_tv",
        "user_id": None,
        "token": None,
        "claimed_at": None,
    }
    _sessions_by_id[session_id] = session
    _session_id_by_code[code] = session_id

    from datetime import datetime, timezone

    return {
        "session_id": session_id,
        "code": code,
        "qr_payload": qr_payload,
        "app_instance_id": app_instance_id,
        "expires_at": datetime.fromtimestamp(expires_at / 1000, tz=timezone.utc).isoformat().replace("+00:00", "Z"),
    }


def get_by_session_id(session_id: str) -> dict[str, Any] | None:
    cleanup_expired()
    return _sessions_by_id.get(session_id)


def get_by_code(code: str | None) -> dict[str, Any] | None:
    cleanup_expired()
    if not code:
        return None
    normalized = str(code).strip()
    session_id = _session_id_by_code.get(normalized)
    if not session_id:
        return None
    return _sessions_by_id.get(session_id)


def claim_session(
    session: dict[str, Any] | None,
    *,
    user_id: str,
    token: str,
    device_name: str | None = None,
) -> dict[str, Any]:
    if not session:
        return {"ok": False, "error": "Session not found"}
    if session["status"] == "expired" or session["expires_at"] <= _now_ms():
        session["status"] = "expired"
        _session_id_by_code.pop(session.get("code"), None)
        return {"ok": False, "error": "Pairing code expired"}
    if session["status"] != "pending":
        return {"ok": False, "error": "Pairing code already used"}

    session["status"] = "paired"
    session["user_id"] = user_id
    session["token"] = token
    session["claimed_at"] = _now_ms()
    if device_name:
        session["device_name"] = device_name

    _session_id_by_code.pop(session.get("code"), None)
    return {"ok": True, "session": session}


def build_poll_response(session: dict[str, Any] | None) -> dict[str, Any]:
    from datetime import datetime, timezone

    if not session:
        return {"status": "expired"}

    if session["status"] == "pending":
        if session["expires_at"] <= _now_ms():
            session["status"] = "expired"
            _session_id_by_code.pop(session.get("code"), None)
            return {"status": "expired"}
        return {
            "status": "pending",
            "expires_at": datetime.fromtimestamp(session["expires_at"] / 1000, tz=timezone.utc)
            .isoformat()
            .replace("+00:00", "Z"),
        }

    if session["status"] == "paired":
        payload = {
            "status": "paired",
            "token": session["token"],
            "app_instance_id": session["app_instance_id"],
            "user_id": session["user_id"],
            "device_name": session["device_name"],
        }
        session["status"] = "consumed"
        session["token"] = None
        return payload

    if session["status"] == "consumed":
        return {
            "status": "paired",
            "app_instance_id": session["app_instance_id"],
            "user_id": session["user_id"],
            "device_name": session["device_name"],
        }

    return {"status": "expired"}


def extract_code_from_payload(input_val: str | None) -> str | None:
    if not input_val:
        return None
    raw = str(input_val).strip()
    if re.fullmatch(r"\d{6}", raw):
        return raw
    try:
        parsed = urlparse(raw)
        qs = parse_qs(parsed.query)
        from_query = (qs.get("code") or [None])[0]
        if from_query and re.fullmatch(r"\d{6}", from_query.strip()):
            return from_query.strip()
    except Exception:
        pass
    match = re.search(r"\b(\d{6})\b", raw)
    return match.group(1) if match else None
