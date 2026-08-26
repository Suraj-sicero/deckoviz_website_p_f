"""add Music Playback tables and Collection.assigned_music_id

Revision ID: 20260825_03
Revises: 20260822_02
Create Date: 2026-08-25
"""
from alembic import op
import sqlalchemy as sa

revision = "20260825_03"
down_revision = "20260822_02"
branch_labels = None
depends_on = None


def upgrade():
    # --- music table ---
    op.create_table(
        "music",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("title", sa.String(length=512), nullable=False),
        sa.Column("artist", sa.String(length=512), nullable=True),
        sa.Column("object_key", sa.String(length=1024), nullable=True, unique=True),
        sa.Column("bucket", sa.String(length=255), nullable=True),
        sa.Column("external_url", sa.Text(), nullable=True),
        sa.Column("uploaded_by", sa.String(), sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True),
        sa.Column("duration_seconds", sa.Float(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_music_uploaded_by", "music", ["uploaded_by"])

    # --- favorite_music join table ---
    op.create_table(
        "favorite_music",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("user_id", sa.String(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("music_id", sa.String(), sa.ForeignKey("music.id", ondelete="CASCADE"), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.UniqueConstraint("user_id", "music_id", name="uq_favorite_music"),
    )
    op.create_index("ix_favorite_music_user_id", "favorite_music", ["user_id"])
    op.create_index("ix_favorite_music_music_id", "favorite_music", ["music_id"])

    # --- new column on collections ---
    op.add_column(
        "collections",
        sa.Column(
            "assigned_music_id",
            sa.String(),
            sa.ForeignKey("music.id", ondelete="SET NULL"),
            nullable=True,
        ),
    )
    op.create_index("ix_collections_assigned_music_id", "collections", ["assigned_music_id"])


def downgrade():
    op.drop_index("ix_collections_assigned_music_id", table_name="collections")
    op.drop_column("collections", "assigned_music_id")
    op.drop_index("ix_favorite_music_music_id", table_name="favorite_music")
    op.drop_index("ix_favorite_music_user_id", table_name="favorite_music")
    op.drop_table("favorite_music")
    op.drop_index("ix_music_uploaded_by", table_name="music")
    op.drop_table("music")
