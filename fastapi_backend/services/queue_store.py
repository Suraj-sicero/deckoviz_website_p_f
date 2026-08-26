import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Tuple

# (user_id, app_instance_id) → list of queued collection dicts
# Each collection dict: {"collection_id": str, "name": str, "item_count": int, "added_at": str, "order_index": int}
_queues: Dict[Tuple[str, str], List[Dict[str, Any]]] = {}


def _iso_now() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def get_queue(user_id: str, app_instance_id: str) -> List[Dict[str, Any]]:
    key = (user_id, app_instance_id)
    return _queues.get(key, [])


def add_to_queue(
    user_id: str,
    app_instance_id: str,
    collection_id: str,
    name: str = "Collection",
    item_count: int = 0,
) -> List[Dict[str, Any]]:
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


def reorder_queue(user_id: str, app_instance_id: str, collection_ids: List[str]) -> List[Dict[str, Any]]:
    key = (user_id, app_instance_id)
    existing_queue = _queues.get(key, [])
    by_id = {item["collection_id"]: item for item in existing_queue}

    new_queue: List[Dict[str, Any]] = []
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


def remove_from_queue(user_id: str, app_instance_id: str, collection_id: str) -> List[Dict[str, Any]]:
    key = (user_id, app_instance_id)
    queue = _queues.get(key, [])
    filtered = [item for item in queue if item["collection_id"] != collection_id]

    # Re-index
    for idx, item in enumerate(filtered):
        item["order_index"] = idx

    _queues[key] = filtered
    return filtered
