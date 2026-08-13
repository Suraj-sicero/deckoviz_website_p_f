import unittest
import os
import asyncio
from datetime import datetime
import zoneinfo

from database import SessionLocal
from models import DailyQueueSlot, EventItem
from schemas import DailyQueueSlotCreate, EventItemCreate
from auth import FirebaseUser
from routes.schedule_routes import (
    create_ritual, get_rituals, update_ritual, delete_ritual,
    create_event, get_events, update_event, delete_event
)
from services.scheduler import (
    is_live_mode_active, set_live_mode, process_schedules
)
from services.device_registry import (
    push_pending_command, pop_pending_commands, upsert_device, get_device
)
from services.ws_hub import register, unregister

class TestSchedulingSystemDirect(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.user_id = "test_user_123"
        cls.device_id = "test_frame_123"
        cls.user = FirebaseUser(
            id=cls.user_id,
            firebase_uid=cls.user_id,
            email="test@deckoviz.app",
            name="Test User",
            display_name="Test User",
            avatar="",
            role="creator"
        )
        # Register device
        upsert_device(
            user_id=cls.user_id,
            app_instance_id=cls.device_id,
            device_name="Test Frame",
            platform="google_tv",
            status="online"
        )

    def setUp(self):
        self.db = SessionLocal()
        # Clear tables
        self.db.query(DailyQueueSlot).filter(DailyQueueSlot.user_id == self.user_id).delete()
        self.db.query(EventItem).filter(EventItem.user_id == self.user_id).delete()
        self.db.commit()

    def tearDown(self):
        self.db.close()

    def test_rituals_crud(self):
        # 1. Create Ritual
        payload = DailyQueueSlotCreate(
            collectionId="col_ritual_abc",
            collectionName="Morning Routine",
            title="Calm Morning",
            startTime="07:00",
            endTime="09:00",
            dayOfWeek=1,
            timezone="America/New_York",
            targetAppInstanceId=self.device_id,
            mode="ambient",
            transition="fade",
            duration=6000,
            active=True
        )
        
        ritual = create_ritual(ritual=payload, current_user=self.user, db=self.db)
        self.assertEqual(ritual.title, "Calm Morning")
        self.assertEqual(ritual.timezone, "America/New_York")
        self.assertEqual(ritual.target_app_instance_id, self.device_id)
        ritual_id = ritual.id
        
        # 2. Read Rituals
        rituals = get_rituals(current_user=self.user, db=self.db)
        self.assertEqual(len(rituals), 1)
        self.assertEqual(rituals[0].id, ritual_id)
        
        # 3. Update Ritual
        update_payload = DailyQueueSlotCreate(
            title="Calm Morning Updated",
            startTime="07:30",
            timezone="America/New_York",
            targetAppInstanceId=self.device_id,
            collectionId="col_ritual_abc"
        )
        updated = update_ritual(ritual_id=ritual_id, ritual_update=update_payload, current_user=self.user, db=self.db)
        self.assertEqual(updated.title, "Calm Morning Updated")
        self.assertEqual(updated.start_time, "07:30")
        
        # 4. Delete Ritual
        res = delete_ritual(ritual_id=ritual_id, current_user=self.user, db=self.db)
        self.assertEqual(res, {"success": True})
        
        # Verify empty
        rituals_after = get_rituals(current_user=self.user, db=self.db)
        self.assertEqual(len(rituals_after), 0)

    def test_events_crud(self):
        # 1. Create Event
        payload = EventItemCreate(
            name="Dinner Party",
            date="2026-08-20",
            time="19:00",
            collectionName="Jazz and Wine",
            collectionId="col_event_jazz",
            timezone="Europe/London",
            targetAppInstanceId=self.device_id,
            mode="collection",
            transition="crossfade",
            duration=8000
        )
        event = create_event(event=payload, current_user=self.user, db=self.db)
        self.assertEqual(event.name, "Dinner Party")
        self.assertEqual(event.timezone, "Europe/London")
        self.assertEqual(event.target_app_instance_id, self.device_id)
        event_id = event.id
        
        # 2. Read Events
        events = get_events(current_user=self.user, db=self.db)
        self.assertEqual(len(events), 1)
        
        # 3. Update Event
        update_payload = EventItemCreate(
            name="Dinner Party Updated",
            time="19:30",
            collectionId="col_event_jazz"
        )
        updated = update_event(event_id=event_id, event_update=update_payload, current_user=self.user, db=self.db)
        self.assertEqual(updated.name, "Dinner Party Updated")
        self.assertEqual(updated.time, "19:30")
        
        # 4. Delete Event
        res = delete_event(event_id=event_id, current_user=self.user, db=self.db)
        self.assertEqual(res, {"success": True})
        
        # Verify empty
        events_after = get_events(current_user=self.user, db=self.db)
        self.assertEqual(len(events_after), 0)

    def test_live_priority_conflict(self):
        set_live_mode(self.user_id, self.device_id, 10)
        self.assertTrue(is_live_mode_active(self.user_id, self.device_id))
        
        set_live_mode(self.user_id, self.device_id, 0)
        self.assertFalse(is_live_mode_active(self.user_id, self.device_id))

    def test_offline_recovery_queue(self):
        msg = {"action": "display_artwork", "payload": {"artwork_id": "art_123"}}
        push_pending_command(self.user_id, self.device_id, msg)
        
        device = get_device(self.device_id)
        self.assertIn("pending_commands", device)
        self.assertEqual(len(device["pending_commands"]), 1)
        
        cmds = pop_pending_commands(self.user_id, self.device_id)
        self.assertEqual(len(cmds), 1)
        self.assertEqual(cmds[0]["payload"]["artwork_id"], "art_123")
        
        cmds2 = pop_pending_commands(self.user_id, self.device_id)
        self.assertEqual(len(cmds2), 0)

if __name__ == '__main__':
    unittest.main()
