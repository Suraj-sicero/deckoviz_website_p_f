import asyncio
import sys
import os
sys.path.insert(0, os.path.realpath(os.path.join(os.path.dirname(__file__), '..')))

from logging.config import fileConfig
from alembic import context
from sqlalchemy.ext.asyncio import async_engine_from_config
from config import settings
from database import Base
import models  # registers all metadata

config = context.config
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
if config.config_file_name:
    fileConfig(config.config_file_name)
target_metadata = Base.metadata

def run_migrations_offline():
    context.configure(url=settings.DATABASE_URL, target_metadata=target_metadata, literal_binds=True, dialect_opts={"paramstyle": "named"})
    with context.begin_transaction(): context.run_migrations()

def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction(): context.run_migrations()

async def run_migrations_online():
    section = config.get_section(config.config_ini_section, {})
    section["sqlalchemy.url"] = settings.DATABASE_URL
    engine = async_engine_from_config(section, prefix="sqlalchemy.")
    async with engine.connect() as connection:
        await connection.run_sync(do_run_migrations)
    await engine.dispose()

if context.is_offline_mode(): run_migrations_offline()
else: asyncio.run(run_migrations_online())
