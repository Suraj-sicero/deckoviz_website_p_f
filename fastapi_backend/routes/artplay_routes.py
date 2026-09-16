"""Art Play Page — browser Smart Frame stand-in.

POST /api/artplay/{app_instance_id}/send  — append queue + WS display_artwork
GET  /api/artplay/{app_instance_id}       — hydrate queue for reconnect/refresh
"""
from datetime import datetime
from typing import Any, Dict, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from auth import FirebaseUser, get_current_user
from postgres_store import append_art_play_item, list_art_play_queue
from services import ws_hub

router = APIRouter(tags=["Art Play"])


class ArtPlaySendBody(BaseModel):
    artwork_id: Optional[str] = None
    artworkId: Optional[str] = None
    url: Optional[str] = None
    title: Optional[str] = None


@router.get("/artplay/{app_instance_id}")
async def get_art_play_queue(
    app_instance_id: str,
    current_user: FirebaseUser = Depends(get_current_user),
) -> Dict[str, Any]:
    uid = current_user.firebase_uid or current_user.id
    try:
        items = await list_art_play_queue(uid, app_instance_id)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to load art play queue: {}".format(exc),
        )
    return {
        "success": True,
        "appInstanceId": app_instance_id,
        "items": items,
        "count": len(items),
    }


@router.post("/artplay/{app_instance_id}/send")
async def send_to_art_play(
    app_instance_id: str,
    body: ArtPlaySendBody,
    current_user: FirebaseUser = Depends(get_current_user),
) -> Dict[str, Any]:
    uid = current_user.firebase_uid or current_user.id
    artwork_id = body.artwork_id or body.artworkId
    url = body.url
    title = body.title

    if not (url or artwork_id):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="url or artwork_id is required",
        )

    try:
        item = await append_art_play_item(
            uid,
            app_instance_id,
            artwork_id=artwork_id,
            image_url=url,
            title=title,
        )
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to append art play item: {}".format(exc),
        )

    image_url = item["imageUrl"]
    sent_at = item.get("sentAt") or datetime.utcnow().isoformat()
    msg = ws_hub.envelope(
        "display_artwork",
        {
            "artwork_id": item.get("artworkId") or artwork_id,
            "image_url": image_url,
            "url": image_url,
            "cdn_url": image_url,
            "title": item.get("title") or title,
            "sent_at": sent_at,
            "queue_item_id": item.get("id"),
            "mode": "art_play",
        },
        target={"app_instance_id": app_instance_id},
    )

    sent = await ws_hub.route_to_tv(uid, app_instance_id, msg)
    await ws_hub.broadcast_to_browsers(uid, msg)

    return {
        "success": True,
        "dispatched": bool(sent),
        "message_id": msg["message_id"],
        "appInstanceId": app_instance_id,
        "item": item,
    }
