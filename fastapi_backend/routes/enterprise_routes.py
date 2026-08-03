from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user, FirebaseUser
from firebase_config import (
    fs_get_profile,
    fs_get_collections,
    fs_get_curations,
    fs_create_curation,
    fs_get_events,
    fs_create_event,
    fs_get_notes,
    fs_create_note
)

router = APIRouter(prefix="/enterprise", tags=["Enterprise Suite - Firebase Firestore"])

@router.get("/dashboard")
def get_enterprise_dashboard(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    profile = fs_get_profile(uid)
    collections = fs_get_collections(uid)
    curations = fs_get_curations(uid)
    events = fs_get_events(uid)
    notes = fs_get_notes(uid)

    return {
        "profile": profile,
        "collectionsCount": len(collections),
        "curationsCount": len(curations),
        "eventsCount": len(events),
        "notesCount": len(notes),
        "curations": curations,
        "events": events
    }

@router.get("/curations")
def get_curations(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    items = fs_get_curations(uid)
    return items

@router.post("/curations")
def create_curation(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    created = fs_create_curation(uid, payload)
    return created

@router.get("/events")
def get_events(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    events = fs_get_events(uid)
    return events

@router.post("/events")
def create_event(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    created = fs_create_event(uid, payload)
    return created

@router.get("/notes")
def get_notes(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    notes = fs_get_notes(uid)
    return notes

@router.post("/notes")
def create_note(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    created = fs_create_note(uid, payload)
    return created
