from __future__ import annotations

from typing import Any, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from auth import FirebaseUser, get_current_user
from services import device_registry, queue_store, ws_hub

router = APIRouter(tags=["Collection Queue & Live Streaming"])


class AddToQueueBody(BaseModel):
    collection_id: str
    name: Optional[str] = "Collection"
    item_count: Optional[int] = 0


class ReorderQueueBody(BaseModel):
    collection_ids: list[str]


class ShuffleQueueBody(BaseModel):
    max_attempts: Optional[int] = 5


class AutoPopulateBody(BaseModel):
    max_items: Optional[int] = 20


class LiveStreamBody(BaseModel):
    artwork_id: str
    url: Optional[str] = None
    transition: Optional[str] = "fade"
    duration: Optional[int] = 5000


def _validate_device_ownership(user_id: str, app_instance_id: str) -> None:
    device = device_registry.get_device(app_instance_id)
    if not device or device.get("user_id") != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Device not found or belongs to another user.",
        )


async def _dispatch_queue_to_tv(user_id: str, app_instance_id: str, queue: list[dict[str, Any]]) -> bool:
    # First 20 collections auto-play/auto-display
    active_top_20 = queue[:20]
    msg = ws_hub.envelope(
        "replace_queue",
        {
            "collections": active_top_20,
            "total_queued": len(queue),
            "active_count": len(active_top_20),
        },
        target={"app_instance_id": app_instance_id},
    )
    return await ws_hub.route_to_tv(user_id, app_instance_id, msg)


@router.get("/queue/{app_instance_id}")
def get_device_queue(
    app_instance_id: str,
    current_user: FirebaseUser = Depends(get_current_user),
):
    _validate_device_ownership(current_user.id, app_instance_id)
    queue = queue_store.get_queue(current_user.id, app_instance_id)
    return {
        "app_instance_id": app_instance_id,
        "total_queued": len(queue),
        "active_top_20": queue[:20],
        "queued_beyond_20": queue[20:],
        "items": queue,
    }


@router.post("/queue/{app_instance_id}", status_code=201)
async def add_collection_to_queue(
    app_instance_id: str,
    body: AddToQueueBody,
    current_user: FirebaseUser = Depends(get_current_user),
):
    _validate_device_ownership(current_user.id, app_instance_id)
    updated_queue = queue_store.add_to_queue(
        user_id=current_user.id,
        app_instance_id=app_instance_id,
        collection_id=body.collection_id,
        name=body.name or "Collection",
        item_count=body.item_count or 0,
    )
    dispatched = await _dispatch_queue_to_tv(current_user.id, app_instance_id, updated_queue)
    return {
        "success": True,
        "dispatched": dispatched,
        "total_queued": len(updated_queue),
        "items": updated_queue,
    }


@router.patch("/queue/{app_instance_id}/reorder")
async def reorder_device_queue(
    app_instance_id: str,
    body: ReorderQueueBody,
    current_user: FirebaseUser = Depends(get_current_user),
):
    _validate_device_ownership(current_user.id, app_instance_id)
    reordered_queue = queue_store.reorder_queue(
        user_id=current_user.id,
        app_instance_id=app_instance_id,
        collection_ids=body.collection_ids,
    )
    dispatched = await _dispatch_queue_to_tv(current_user.id, app_instance_id, reordered_queue)
    return {
        "success": True,
        "dispatched": dispatched,
        "total_queued": len(reordered_queue),
        "items": reordered_queue,
    }


@router.post("/queue/{app_instance_id}/shuffle")
async def shuffle_device_queue(
    app_instance_id: str,
    body: ShuffleQueueBody = ShuffleQueueBody(),
    current_user: FirebaseUser = Depends(get_current_user),
):
    _validate_device_ownership(current_user.id, app_instance_id)
    shuffled_queue = queue_store.shuffle_queue(
        user_id=current_user.id,
        app_instance_id=app_instance_id,
        max_attempts=body.max_attempts or 5,
    )
    dispatched = await _dispatch_queue_to_tv(current_user.id, app_instance_id, shuffled_queue)
    return {
        "success": True,
        "dispatched": dispatched,
        "total_queued": len(shuffled_queue),
        "items": shuffled_queue,
    }


@router.post("/queue/{app_instance_id}/auto-populate")
async def auto_populate_device_queue(
    app_instance_id: str,
    body: AutoPopulateBody = AutoPopulateBody(),
    current_user: FirebaseUser = Depends(get_current_user),
):
    _validate_device_ownership(current_user.id, app_instance_id)
    populated_queue = queue_store.auto_populate_queue(
        user_id=current_user.id,
        app_instance_id=app_instance_id,
        max_items=body.max_items or 20,
    )
    dispatched = await _dispatch_queue_to_tv(current_user.id, app_instance_id, populated_queue)
    return {
        "success": True,
        "dispatched": dispatched,
        "total_queued": len(populated_queue),
        "items": populated_queue,
    }


@router.delete("/queue/{app_instance_id}/{collection_id}")
async def remove_collection_from_queue(
    app_instance_id: str,
    collection_id: str,
    current_user: FirebaseUser = Depends(get_current_user),
):
    _validate_device_ownership(current_user.id, app_instance_id)
    updated_queue = queue_store.remove_from_queue(
        user_id=current_user.id,
        app_instance_id=app_instance_id,
        collection_id=collection_id,
    )
    dispatched = await _dispatch_queue_to_tv(current_user.id, app_instance_id, updated_queue)
    return {
        "success": True,
        "dispatched": dispatched,
        "total_queued": len(updated_queue),
        "items": updated_queue,
    }


@router.post("/livestream/{app_instance_id}")
async def stream_artwork_live(
    app_instance_id: str,
    body: LiveStreamBody,
    current_user: FirebaseUser = Depends(get_current_user),
):
    _validate_device_ownership(current_user.id, app_instance_id)
    artwork_url = body.url or body.artwork_id
    msg = ws_hub.envelope(
        "display_artwork",
        {
            "artwork_id": body.artwork_id,
            "url": artwork_url,
            "cdn_url": artwork_url,
            "transition": body.transition or "fade",
            "duration": body.duration or 5000,
            "mode": "live_stream",
        },
        target={"app_instance_id": app_instance_id},
    )

    sent = await ws_hub.route_to_tv(current_user.id, app_instance_id, msg)
    await ws_hub.broadcast_to_browsers(current_user.id, msg)

    return {
        "success": True,
        "dispatched": sent,
        "message_id": msg["message_id"],
        "mode": "live_stream",
        "target_app_instance_id": app_instance_id,
    }
