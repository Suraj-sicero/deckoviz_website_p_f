"""add normalized private S3 media metadata

Revision ID: 20260822_02
Revises: 20260822_01
"""
from alembic import op
import sqlalchemy as sa

revision = "20260822_02"
down_revision = "20260822_01"
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        "media_objects",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("user_id", sa.String(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("object_key", sa.String(length=1024), unique=True),
        sa.Column("bucket", sa.String(length=255)),
        sa.Column("mime_type", sa.String(length=255), nullable=False),
        sa.Column("size_bytes", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("checksum_sha256", sa.String(length=64)),
        sa.Column("filename", sa.String(length=512)),
        sa.Column("external_url", sa.Text()),
        sa.Column("is_generated", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("prompt", sa.Text()),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_media_objects_user_id", "media_objects", ["user_id"])

def downgrade():
    op.drop_table("media_objects")
