"""initial PostgreSQL schema

Revision ID: 20260822_01
Revises:
Create Date: 2026-08-22
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "20260822_01"
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table("users", sa.Column("id", sa.String(), primary_key=True), sa.Column("firebase_uid", sa.String(), unique=True), sa.Column("email", sa.String(), nullable=False, unique=True), sa.Column("name", sa.String()), sa.Column("display_name", sa.String()), sa.Column("avatar", sa.Text()), sa.Column("banner", sa.Text()), sa.Column("role", sa.String()), sa.Column("created_at", sa.DateTime()))
    op.create_index("ix_users_firebase_uid", "users", ["firebase_uid"])
    op.create_table("user_documents", sa.Column("id", sa.Integer(), primary_key=True), sa.Column("user_id", sa.String(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False), sa.Column("kind", sa.String(64), nullable=False), sa.Column("document_id", sa.String(128), nullable=False), sa.Column("payload", postgresql.JSONB(), nullable=False), sa.Column("created_at", sa.DateTime(), nullable=False), sa.Column("updated_at", sa.DateTime(), nullable=False), sa.UniqueConstraint("user_id", "kind", "document_id", name="uq_user_document"))
    op.create_index("ix_user_documents_user_id", "user_documents", ["user_id"])
    op.create_index("ix_user_documents_kind", "user_documents", ["kind"])
    op.create_index("ix_user_documents_document_id", "user_documents", ["document_id"])

def downgrade():
    op.drop_table("user_documents")
    op.drop_table("users")
