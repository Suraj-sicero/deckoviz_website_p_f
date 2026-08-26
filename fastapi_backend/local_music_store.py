"""
Local-dev music store: saves uploaded audio to disk and tracks metadata in a
JSON index file.

Drop-in replacement for the S3 + PostgreSQL path when
DEV_LOCAL_MUSIC_STORAGE=true in .env.  Swap out for real storage later by
setting DEV_LOCAL_MUSIC_STORAGE=false and supplying DB/S3 credentials.
"""

import json
import os
import threading
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

# Stored relative to this file so uploads survive server restarts.
_BASE = Path(__file__).parent / "uploads"
MUSIC_DIR = _BASE / "music"
INDEX_FILE = _BASE / "music_index.json"

_lock = threading.Lock()


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _load() -> List[Dict]:
    """Read the JSON index; returns [] on missing or corrupt file."""
    if INDEX_FILE.exists():
        try:
            with open(INDEX_FILE, encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, OSError):
            return []
    return []


def _persist(tracks: List[Dict]) -> None:
    """Atomically write the JSON index (tmp-file + rename)."""
    _BASE.mkdir(parents=True, exist_ok=True)
    tmp = INDEX_FILE.with_suffix(".tmp")
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(tracks, f, indent=2, ensure_ascii=False)
    tmp.replace(INDEX_FILE)


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def list_tracks(search: Optional[str] = None) -> List[Dict]:
    """Return all tracks newest-first. Optional substring search on title/artist."""
    with _lock:
        tracks = list(_load())
    if search:
        q = search.lower()
        tracks = [
            t for t in tracks
            if q in (t.get("title") or "").lower()
            or q in (t.get("artist") or "").lower()
        ]
    tracks.sort(key=lambda t: t.get("created_at", ""), reverse=True)
    return tracks


def save_track(
    track_id: str,
    title: str,
    artist: Optional[str],
    uploaded_by: str,
    original_filename: str,
    file_bytes: bytes,
    content_type: str,
    duration_seconds: Optional[float] = None,
) -> Dict:
    """Write bytes to disk and append a record to the JSON index."""
    MUSIC_DIR.mkdir(parents=True, exist_ok=True)
    ext = os.path.splitext(original_filename)[1].lower() or ".mp3"
    disk_name = f"{track_id}{ext}"
    (MUSIC_DIR / disk_name).write_bytes(file_bytes)

    track: Dict = {
        "id": track_id,
        "title": title,
        "artist": artist,
        "uploaded_by": uploaded_by,
        "disk_name": disk_name,
        "original_filename": original_filename,
        "content_type": content_type,
        "duration_seconds": duration_seconds,
        "created_at": datetime.utcnow().isoformat(),
    }
    with _lock:
        tracks = _load()
        tracks.append(track)
        _persist(tracks)
    return track


def get_track(track_id: str) -> Optional[Dict]:
    with _lock:
        return next((t for t in _load() if t["id"] == track_id), None)


def local_file_url(base_url: str, disk_name: str) -> str:
    """Build an absolute URL the browser can fetch audio from."""
    return f"{base_url.rstrip('/')}/uploads/music/{disk_name}"
