from __future__ import annotations

import random
import uuid
from datetime import datetime, timezone
from typing import Any

# (user_id, app_instance_id) → list of queued collection dicts
# Each collection dict: {"collection_id": str, "name": str, "item_count": int, "added_at": str, "order_index": int}
_queues: dict[tuple[str, str], list[dict[str, Any]]] = {}


def _iso_now() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def get_queue(user_id: str, app_instance_id: str) -> list[dict[str, Any]]:
    key = (user_id, app_instance_id)
    return _queues.get(key, [])


def add_to_queue(
    user_id: str,
    app_instance_id: str,
    collection_id: str,
    name: str = "Collection",
    item_count: int = 0,
) -> list[dict[str, Any]]:
    key = (user_id, app_instance_id)
    queue = _queues.setdefault(key, [])
    
    # Avoid duplicate addition of the same collection ID in queue
    existing = next((item for item in queue if item["collection_id"] == collection_id), None)
    if existing:
        return queue

    new_item = {
        "collection_id": collection_id,
        "name": name,
        "item_count": item_count,
        "added_at": _iso_now(),
        "order_index": len(queue),
    }
    queue.append(new_item)
    return queue


def reorder_queue(user_id: str, app_instance_id: str, collection_ids: list[str]) -> list[dict[str, Any]]:
    key = (user_id, app_instance_id)
    existing_queue = _queues.get(key, [])
    by_id = {item["collection_id"]: item for item in existing_queue}

    new_queue: list[dict[str, Any]] = []
    for idx, cid in enumerate(collection_ids):
        if cid in by_id:
            item = by_id.pop(cid)
            item["order_index"] = idx
            new_queue.append(item)

    # Append any remaining items that weren't specified in collection_ids
    for item in by_id.values():
        item["order_index"] = len(new_queue)
        new_queue.append(item)

    _queues[key] = new_queue
    return new_queue


def remove_from_queue(user_id: str, app_instance_id: str, collection_id: str) -> list[dict[str, Any]]:
    key = (user_id, app_instance_id)
    queue = _queues.get(key, [])
    filtered = [item for item in queue if item["collection_id"] != collection_id]

    # Re-index
    for idx, item in enumerate(filtered):
        item["order_index"] = idx

    _queues[key] = filtered
    return filtered


def shuffle_queue(user_id: str, app_instance_id: str, max_attempts: int = 5) -> list[dict[str, Any]]:
    """Shuffle the queue in place. If the new order matches the previous order, reshuffle up to max_attempts times."""
    import random
    key = (user_id, app_instance_id)
    queue = _queues.get(key, [])
    
    if len(queue) <= 1:
        return queue
    
    # Store the original order for comparison
    original_order = [item["collection_id"] for item in queue]
    
    for _ in range(max_attempts):
        # Create a copy and shuffle it
        shuffled = queue.copy()
        random.shuffle(shuffled)
        
        new_order = [item["collection_id"] for item in shuffled]
        
        # Check if the order changed
        if new_order != original_order:
            # Update order_index for each item
            for idx, item in enumerate(shuffled):
                item["order_index"] = idx
            _queues[key] = shuffled
            return shuffled
    
    # If we couldn't get a different order after max_attempts, return the last shuffle
    # Update order_index for the final shuffle
    for idx, item in enumerate(shuffled):
        item["order_index"] = idx
    _queues[key] = shuffled
    return shuffled


def get_auto_populate_pool(user_id: str) -> list[dict[str, Any]]:
    """Get the auto-populate pool: user's liked/starred items + their own collections.
    This is the user's personal meta-collection, NOT the general library.
    """
    from postgres_store import fs_get_profile, fs_get_collections, fs_get_favorites
    
    # Get user's favorites/starred items
    favorites = fs_get_favorites(user_id)
    
    # Get user's own collections
    collections = fs_get_collections(user_id)
    
    pool: list[dict[str, Any]] = []
    
    # Add favorited/starred collections
    for fav in favorites:
        if fav.get("type") == "collection":
            pool.append({
                "collection_id": fav.get("id"),
                "name": fav.get("name") or fav.get("title") or "Starred Collection",
                "item_count": fav.get("item_count", 0),
                "source": "favorite",
            })
    
    # Add user's own collections (avoid duplicates)
    existing_ids = {item["collection_id"] for item in pool}
    for col in collections:
        col_id = col.get("id") or col.get("collection_id")
        if col_id and col_id not in existing_ids:
            existing_ids.add(col_id)
            pool.append({
                "collection_id": col_id,
                "name": col.get("name") or col.get("title") or col.get("name"),
                "item_count": col.get("item_count", 0),
                "source": "owned",
            })
    
    return pool


def auto_populate_queue(
    user_id: str,
    app_instance_id: str,
    max_items: int = 20,
) -> list[dict[str, Any]]:
    """Auto-populate the queue from the user's personal meta-collection.
    REPLACES the current queue (not append). Respects the 20-item batch limit.
    """
    import random
    
    pool = get_auto_populate_pool(user_id)
    
    if not pool:
        return []
    
    # Shuffle the pool
    random.shuffle(pool)
    
    # Take up to max_items (respecting the batch size limit of 20)
    limit = min(max_items, 20)  # Hard limit of 20 as per existing queue system
    selected = pool[:limit]
    
    # Build the new queue items
    new_queue = []
    for idx, item in enumerate(selected):
        new_queue.append({
            "collection_id": item["collection_id"],
            "name": item["name"],
            "item_count": item.get("item_count", 0),
            "added_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
            "order_index": idx,
        })
    
    # Replace the queue
    key = (user_id, app_instance_id)
    _queues[key] = new_queue
    
    return new_queue
