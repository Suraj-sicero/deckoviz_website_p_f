from __future__ import annotations

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional

from auth import FirebaseUser, create_access_token, get_current_user, get_current_user_optional
from services import device_registry, ws_hub
from services.pairing_store import (
    build_poll_response,
    claim_session,
    create_session,
    extract_code_from_payload,
    get_by_code,
    get_by_session_id,
)

router = APIRouter(prefix="/pairing", tags=["RTCSP Pairing"])


class CreateSessionBody(BaseModel):
    device_name: Optional[str] = None
    platform: Optional[str] = None
    pair_page_base_url: Optional[str] = None


class ClaimBody(BaseModel):
    code: Optional[str] = None
    qr_payload: Optional[str] = None
    device_name: Optional[str] = None


@router.post("/session", status_code=201)
def create_pairing_session(body: CreateSessionBody | None = None):
    body = body or CreateSessionBody()
    try:
        return create_session(
            device_name=body.device_name,
            platform=body.platform,
            pair_page_base_url=body.pair_page_base_url,
        )
    except Exception:
        return JSONResponse(status_code=500, content={"error": "Failed to create pairing session"})


@router.get("/session/{session_id}")
def poll_pairing_session(session_id: str):
    try:
        session = get_by_session_id(session_id)
        return build_poll_response(session)
    except Exception:
        return JSONResponse(status_code=500, content={"error": "Failed to fetch pairing session"})


@router.post("/claim")
@router.post("/pair")
async def claim_pairing_code(
    body: ClaimBody,
    user: Optional[FirebaseUser] = Depends(get_current_user_optional),
):
    resolved = extract_code_from_payload(body.code) or extract_code_from_payload(body.qr_payload)
    if not resolved:
        return JSONResponse(status_code=400, content={"error": "A valid 6-digit code is required"})

    session = get_by_code(resolved)
    if not session:
        return JSONResponse(status_code=404, content={"error": "Invalid or expired pairing code"})

    user_id = user.id if user else "anonymous_user"
    user_email = user.email if user else "guest@deckoviz.app"
    user_name = user.name if user else "User"

    token = create_access_token(
        {
            "uid": user_id,
            "sub": user_id,
            "id": user_id,
            "email": user_email,
            "name": user_name,
            "app_instance_id": session["app_instance_id"],
        }
    )

    claim = claim_session(
        session,
        user_id=user_id,
        token=token,
        device_name=body.device_name or session["device_name"],
    )
    if not claim["ok"]:
        err = claim["error"]
        code = 410 if "expired" in err.lower() else 409
        return JSONResponse(status_code=code, content={"error": err})

    device, created = device_registry.upsert_device(
        user_id=user_id,
        app_instance_id=session["app_instance_id"],
        device_name=session["device_name"] or "Deckoviz TV",
        platform=session.get("platform") or "google_tv",
        status="offline",
    )

    # Immediately broadcast updated device list to any connected browser WebSocket sessions
    # so the /pair page and /display page reflect the new device without waiting for TV to connect.
    try:
        await ws_hub.refresh_browser_device_lists(user_id)
    except Exception:
        pass  # Non-critical: device will appear when TV connects

    return {
        "success": True,
        "status": "paired",
        "token": token,
        "app_instance_id": session["app_instance_id"],
        "device": {
            "id": device["id"],
            "app_instance_id": device["app_instance_id"],
            "device_name": device["device_name"],
            "platform": device["platform"],
            "status": device["status"],
            "created": created,
        },
    }


class UnpairBody(BaseModel):
    app_instance_id: Optional[str] = None


@router.post("/unpair")
@router.delete("/devices/{app_instance_id}")
def unpair_device(
    body: UnpairBody | None = None,
    app_instance_id: str | None = None,
    user: Optional[FirebaseUser] = Depends(get_current_user_optional),
):
    user_id = user.id if user else "anonymous_user"
    aid = (body.app_instance_id if body else None) or app_instance_id
    if not aid:
        return JSONResponse(status_code=400, content={"error": "app_instance_id is required"})
    removed = device_registry.remove_device(user_id, aid)
    return {"success": True, "removed": removed, "app_instance_id": aid}


@router.get("/devices")
def get_user_devices(user: Optional[FirebaseUser] = Depends(get_current_user_optional)):
    user_id = user.id if user else "anonymous_user"
    devices = device_registry.list_devices_for_user(user_id)
    return {"devices": devices}


