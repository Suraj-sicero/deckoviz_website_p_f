import asyncio
import logging
from datetime import datetime
try:
    import zoneinfo
except ImportError:
    from backports import zoneinfo

from database import SessionLocal
from models import DailyQueueSlot, EventItem
from services import ws_hub

logger = logging.getLogger("deckoviz.scheduler")

_scheduler_task = None
_live_mode_active = {} # user_id -> app_instance_id -> expiry_time

def set_live_mode(user_id: str, app_instance_id: str, duration_sec: int):
    if user_id not in _live_mode_active:
        _live_mode_active[user_id] = {}
    
    _live_mode_active[user_id][app_instance_id] = datetime.utcnow().timestamp() + duration_sec

def is_live_mode_active(user_id: str, app_instance_id: str) -> bool:
    if user_id in _live_mode_active and app_instance_id in _live_mode_active[user_id]:
        if datetime.utcnow().timestamp() < _live_mode_active[user_id][app_instance_id]:
            return True
        else:
            del _live_mode_active[user_id][app_instance_id]
    return False

async def schedule_loop():
    logger.info("Scheduler started.")
    while True:
        try:
            await process_schedules()
        except Exception as e:
            logger.error(f"Error in schedule loop: {e}")
        
        # Sleep until the next minute starts to align with time-based schedules
        now = datetime.utcnow()
        seconds_to_next_minute = 60 - now.second
        await asyncio.sleep(seconds_to_next_minute)

async def process_schedules():
    db = SessionLocal()
    try:
        now_utc = datetime.utcnow()
        
        # Collect due rituals and events first, then close DB before dispatching WS commands
        due_schedules = []

        # Process Daily Rituals
        rituals = db.query(DailyQueueSlot).filter(DailyQueueSlot.active == True).all()
        for ritual in rituals:
            if not ritual.start_time or not ritual.target_app_instance_id:
                continue
            tz_name = ritual.timezone or "UTC"
            try:
                user_tz = zoneinfo.ZoneInfo(tz_name)
            except Exception:
                user_tz = zoneinfo.ZoneInfo("UTC")
            now_local = now_utc.replace(tzinfo=zoneinfo.ZoneInfo("UTC")).astimezone(user_tz)
            if ritual.day_of_week is not None and ritual.day_of_week != now_local.weekday():
                continue
            current_time_str = now_local.strftime("%H:%M")
            if ritual.start_time == current_time_str:
                due_schedules.append({
                    "type": "ritual",
                    "user_id": ritual.user_id,
                    "target_app_instance_id": ritual.target_app_instance_id,
                    "collection_id": ritual.collection_id,
                    "mode": ritual.mode,
                    "transition": ritual.transition,
                    "duration": ritual.duration,
                })

        # Process One-off Events
        events = db.query(EventItem).all()
        event_ids_to_delete = []
        for event in events:
            if not event.date or not event.time or not event.target_app_instance_id:
                continue
            tz_name = event.timezone or "UTC"
            try:
                user_tz = zoneinfo.ZoneInfo(tz_name)
            except Exception:
                user_tz = zoneinfo.ZoneInfo("UTC")
            now_local = now_utc.replace(tzinfo=zoneinfo.ZoneInfo("UTC")).astimezone(user_tz)
            current_date_str = now_local.strftime("%Y-%m-%d")
            current_time_str = now_local.strftime("%H:%M")
            if event.date == current_date_str and event.time == current_time_str:
                due_schedules.append({
                    "type": "event",
                    "id": event.id,
                    "user_id": event.user_id,
                    "target_app_instance_id": event.target_app_instance_id,
                    "collection_id": event.collection_id,
                    "mode": event.mode,
                    "transition": event.transition,
                    "duration": event.duration,
                })
                event_ids_to_delete.append(event.id)

        # Delete fired one-off events before releasing the lock
        if event_ids_to_delete:
            db.query(EventItem).filter(EventItem.id.in_(event_ids_to_delete)).delete(synchronize_session=False)
            db.commit()

    finally:
        db.close()  # Release DB lock before any async WS dispatches

    # Dispatch WS commands after DB session is fully closed
    for s in due_schedules:
        await execute_schedule(
            user_id=s["user_id"],
            target_app_instance_id=s["target_app_instance_id"],
            collection_id=s["collection_id"],
            mode=s["mode"],
            transition=s["transition"],
            duration=s["duration"],
        )

async def execute_schedule(user_id: str, target_app_instance_id: str, collection_id: str, mode: str, transition: str, duration: int):
    # Priority handling: Check if Live streaming is currently active
    if is_live_mode_active(user_id, target_app_instance_id):
        logger.info(f"Skipping schedule for {target_app_instance_id} due to active live stream.")
        return
        
    logger.info(f"Executing schedule for {user_id} on {target_app_instance_id}: mode={mode} collection={collection_id}")
    
    # Send WebSocket command based on mode
    msg = ws_hub.envelope(
        "display_artwork" if mode != "collection" else "play_collection",
        {
            "artwork_id": collection_id,
            "collection_id": collection_id,
            "url": collection_id, # Simplified for MVP, assumes ID is URL or handled by TV
            "transition": transition or "fade",
            "duration": duration or 5000,
            "mode": mode,
        },
        target={"app_instance_id": target_app_instance_id},
    )
    
    sent = await ws_hub.route_to_tv(user_id, target_app_instance_id, msg)
    if not sent:
        # Offline Queue logic
        from services.device_registry import push_pending_command
        push_pending_command(user_id, target_app_instance_id, msg)
        
    await ws_hub.broadcast_to_browsers(user_id, msg)

def start_scheduler():
    global _scheduler_task
    if _scheduler_task is None:
        _scheduler_task = asyncio.create_task(schedule_loop())

def stop_scheduler():
    global _scheduler_task
    if _scheduler_task:
        _scheduler_task.cancel()
        _scheduler_task = None
