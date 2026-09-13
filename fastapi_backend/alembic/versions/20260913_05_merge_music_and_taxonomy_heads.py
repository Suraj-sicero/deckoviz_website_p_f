"""merge music playback and media taxonomy heads

Revision ID: 20260913_05
Revises: 20260825_03, 20260902_03
Create Date: 2026-09-13
"""
from alembic import op  # noqa: F401
import sqlalchemy as sa  # noqa: F401

revision = "20260913_05"
down_revision = ("20260825_03", "20260902_03")
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
