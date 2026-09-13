"""persist media batch tags and collection taxonomy

Revision ID: 20260902_03
Revises: 20260822_02
"""
from alembic import op
import sqlalchemy as sa

revision = "20260902_03"
down_revision = "20260822_02"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("media_objects", sa.Column("tags", sa.JSON(), nullable=False, server_default=sa.text("'[]'")))
    op.add_column("media_objects", sa.Column("collection_id", sa.String(length=255), nullable=True))
    op.add_column("media_objects", sa.Column("collection_name", sa.String(length=512), nullable=True))
    op.create_index("ix_media_objects_collection_id", "media_objects", ["collection_id"])


def downgrade():
    op.drop_index("ix_media_objects_collection_id", table_name="media_objects")
    op.drop_column("media_objects", "collection_name")
    op.drop_column("media_objects", "collection_id")
    op.drop_column("media_objects", "tags")
