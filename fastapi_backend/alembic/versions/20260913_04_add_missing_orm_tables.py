"""add missing ORM feature tables from models.py

Revision ID: 20260913_04
Revises: 20260822_02
Create Date: 2026-09-13

Creates the nine tables defined in models.py that were never given CREATE
migrations. Must run before 20260825_03 (which ALTERs collections) and is a
shared parent for both post-02 branches (music + media taxonomy).
"""
from alembic import op
import sqlalchemy as sa

revision = "20260913_04"
down_revision = "20260822_02"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "profiles",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("user_id", sa.String(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("display_name", sa.String(), nullable=True),
        sa.Column("username", sa.String(), nullable=True),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("bio", sa.Text(), nullable=True),
        sa.Column("location", sa.String(), nullable=True),
        sa.Column("avatar", sa.Text(), nullable=True),
        sa.Column("banner", sa.Text(), nullable=True),
        sa.Column("art_styles", sa.JSON()),
        sa.Column("follower_count", sa.Integer()),
        sa.Column("following_count", sa.Integer()),
        sa.Column("post_count", sa.Integer()),
        sa.Column("updated_at", sa.DateTime()),
    )
    op.create_index("ix_profiles_user_id", "profiles", ["user_id"])

    op.create_table(
        "collections",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("user_id", sa.String(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("music_url", sa.Text(), nullable=True),
        sa.Column("tags", sa.JSON()),
        sa.Column("display_minutes", sa.Integer()),
        sa.Column("display_hours", sa.Integer()),
        sa.Column("is_system", sa.Boolean()),
        sa.Column("created_at", sa.DateTime()),
    )
    op.create_index("ix_collections_user_id", "collections", ["user_id"])

    op.create_table(
        "collection_items",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("collection_id", sa.String(), sa.ForeignKey("collections.id"), nullable=False),
        sa.Column("item_type", sa.String()),
        sa.Column("item_id", sa.String(), nullable=True),
        sa.Column("url", sa.Text(), nullable=True),
        sa.Column("media_url", sa.Text(), nullable=True),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("display_hours", sa.String(), nullable=True),
        sa.Column("display_seconds", sa.String(), nullable=True),
        sa.Column("meta_notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime()),
    )
    op.create_index("ix_collection_items_collection_id", "collection_items", ["collection_id"])

    op.create_table(
        "uploaded_media",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("user_id", sa.String(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("url", sa.Text(), nullable=True),
        sa.Column("media_url", sa.Text(), nullable=False),
        sa.Column("file_name", sa.String(), nullable=True),
        sa.Column("media_type", sa.String()),
        sa.Column("file_size", sa.Integer()),
        sa.Column("is_generated", sa.Boolean()),
        sa.Column("prompt", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime()),
    )
    op.create_index("ix_uploaded_media_user_id", "uploaded_media", ["user_id"])

    op.create_table(
        "daily_queue_slots",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("user_id", sa.String(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("collection_id", sa.String(), nullable=True),
        sa.Column("collection_name", sa.String(), nullable=True),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("start_time", sa.String(), nullable=True),
        sa.Column("end_time", sa.String(), nullable=True),
        sa.Column("day_of_week", sa.Integer()),
        sa.Column("active", sa.Boolean()),
        sa.Column("created_at", sa.DateTime()),
    )
    op.create_index("ix_daily_queue_slots_user_id", "daily_queue_slots", ["user_id"])

    op.create_table(
        "event_items",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("user_id", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("date", sa.String(), nullable=True),
        sa.Column("collection_name", sa.String(), nullable=True),
        sa.Column("collection_id", sa.String(), nullable=True),
        sa.Column("created_at", sa.DateTime()),
    )
    op.create_index("ix_event_items_user_id", "event_items", ["user_id"])

    op.create_table(
        "vizzy_chat_sessions",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("user_id", sa.String(), nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("active_agent", sa.String()),
        sa.Column("messages_json", sa.Text()),
        sa.Column("created_at", sa.DateTime()),
        sa.Column("updated_at", sa.DateTime()),
    )
    op.create_index("ix_vizzy_chat_sessions_user_id", "vizzy_chat_sessions", ["user_id"])

    op.create_table(
        "curation_items",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("user_id", sa.String(), nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("subtitle", sa.String(), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("category", sa.String(), nullable=True),
        sa.Column("image_url", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime()),
    )
    op.create_index("ix_curation_items_user_id", "curation_items", ["user_id"])

    op.create_table(
        "saved_note_items",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("user_id", sa.String(), nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("content", sa.Text(), nullable=True),
        sa.Column("tags", sa.JSON()),
        sa.Column("created_at", sa.DateTime()),
    )
    op.create_index("ix_saved_note_items_user_id", "saved_note_items", ["user_id"])


def downgrade():
    op.drop_index("ix_saved_note_items_user_id", table_name="saved_note_items")
    op.drop_table("saved_note_items")

    op.drop_index("ix_curation_items_user_id", table_name="curation_items")
    op.drop_table("curation_items")

    op.drop_index("ix_vizzy_chat_sessions_user_id", table_name="vizzy_chat_sessions")
    op.drop_table("vizzy_chat_sessions")

    op.drop_index("ix_event_items_user_id", table_name="event_items")
    op.drop_table("event_items")

    op.drop_index("ix_daily_queue_slots_user_id", table_name="daily_queue_slots")
    op.drop_table("daily_queue_slots")

    op.drop_index("ix_uploaded_media_user_id", table_name="uploaded_media")
    op.drop_table("uploaded_media")

    op.drop_index("ix_collection_items_collection_id", table_name="collection_items")
    op.drop_table("collection_items")

    op.drop_index("ix_collections_user_id", table_name="collections")
    op.drop_table("collections")

    op.drop_index("ix_profiles_user_id", table_name="profiles")
    op.drop_table("profiles")
