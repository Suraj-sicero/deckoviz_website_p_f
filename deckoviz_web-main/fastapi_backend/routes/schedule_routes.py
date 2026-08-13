from __future__ import annotations

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from auth import FirebaseUser, get_current_user
from models import DailyQueueSlot, EventItem
from schemas import DailyQueueSlotCreate, DailyQueueSlotResponse, EventItemCreate, EventItemResponse

router = APIRouter(tags=["Scheduling"])

# --- Rituals (DailyQueueSlots) ---

@router.get("/rituals", response_model=List[DailyQueueSlotResponse])
def get_rituals(
    current_user: FirebaseUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(DailyQueueSlot).filter(DailyQueueSlot.user_id == current_user.id).all()

@router.post("/rituals", response_model=DailyQueueSlotResponse, status_code=status.HTTP_201_CREATED)
def create_ritual(
    ritual: DailyQueueSlotCreate,
    current_user: FirebaseUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_ritual = DailyQueueSlot(**ritual.model_dump(exclude_unset=True), user_id=current_user.id)
    db.add(db_ritual)
    db.commit()
    db.refresh(db_ritual)
    return db_ritual

@router.patch("/rituals/{ritual_id}", response_model=DailyQueueSlotResponse)
def update_ritual(
    ritual_id: str,
    ritual_update: DailyQueueSlotCreate,
    current_user: FirebaseUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_ritual = db.query(DailyQueueSlot).filter(DailyQueueSlot.id == ritual_id, DailyQueueSlot.user_id == current_user.id).first()
    if not db_ritual:
        raise HTTPException(status_code=404, detail="Ritual not found")
    
    update_data = ritual_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_ritual, key, value)
        
    db.commit()
    db.refresh(db_ritual)
    return db_ritual

@router.delete("/rituals/{ritual_id}")
def delete_ritual(
    ritual_id: str,
    current_user: FirebaseUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_ritual = db.query(DailyQueueSlot).filter(DailyQueueSlot.id == ritual_id, DailyQueueSlot.user_id == current_user.id).first()
    if not db_ritual:
        raise HTTPException(status_code=404, detail="Ritual not found")
    
    db.delete(db_ritual)
    db.commit()
    return {"success": True}

# --- Events (EventItems) ---

@router.get("/events", response_model=List[EventItemResponse])
def get_events(
    current_user: FirebaseUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(EventItem).filter(EventItem.user_id == current_user.id).all()

@router.post("/events", response_model=EventItemResponse, status_code=status.HTTP_201_CREATED)
def create_event(
    event: EventItemCreate,
    current_user: FirebaseUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_event = EventItem(**event.model_dump(exclude_unset=True), user_id=current_user.id)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.patch("/events/{event_id}", response_model=EventItemResponse)
def update_event(
    event_id: str,
    event_update: EventItemCreate,
    current_user: FirebaseUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_event = db.query(EventItem).filter(EventItem.id == event_id, EventItem.user_id == current_user.id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    update_data = event_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_event, key, value)
        
    db.commit()
    db.refresh(db_event)
    return db_event

@router.delete("/events/{event_id}")
def delete_event(
    event_id: str,
    current_user: FirebaseUser = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_event = db.query(EventItem).filter(EventItem.id == event_id, EventItem.user_id == current_user.id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    db.delete(db_event)
    db.commit()
    return {"success": True}
