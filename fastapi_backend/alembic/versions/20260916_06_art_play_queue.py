"""add art_play_queue for browser Art Play Page

Revision ID: 20260916_06
Revises: 20260913_05
Create Date: 2026-09-16
"""
from alembic import op
import sqlalchemy as sa

revision = "20260916_06"
down_revision = "20260913_05"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "art_play_queue",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("app_instance_id", sa.String(), nullable=False),
        sa.Column("user_id", sa.String(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("artwork_id", sa.String(), nullable=True),
        sa.Column("image_url", sa.Text(), nullable=False),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("sent_at", sa.DateTime(), nullable=False),
        sa.Column("position", sa.Integer(), nullable=False),
    )
    op.create_index("ix_art_play_queue_app_instance_id", "art_play_queue", ["app_instance_id"])
    op.create_index("ix_art_play_queue_user_id", "art_play_queue", ["user_id"])


def downgrade():
    op.drop_index("ix_art_play_queue_user_id", table_name="art_play_queue")
    op.drop_index("ix_art_play_queue_app_instance_id", table_name="art_play_queue")
    op.drop_table("art_play_queue")
