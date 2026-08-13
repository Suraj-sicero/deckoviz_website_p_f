import sqlite3

def run():
    conn = sqlite3.connect('deckoviz.db')
    c = conn.cursor()
    
    # Try adding columns to daily_queue_slots
    columns_dqs = [
        ("timezone", "VARCHAR DEFAULT 'UTC'"),
        ("target_app_instance_id", "VARCHAR"),
        ("mode", "VARCHAR DEFAULT 'scheduled'"),
        ("transition", "VARCHAR DEFAULT 'fade'"),
        ("duration", "INTEGER DEFAULT 5000")
    ]
    for col, dtype in columns_dqs:
        try:
            c.execute(f"ALTER TABLE daily_queue_slots ADD COLUMN {col} {dtype}")
        except sqlite3.OperationalError:
            pass # column exists

    # Try adding columns to event_items
    columns_ei = [
        ("time", "VARCHAR"),
        ("timezone", "VARCHAR DEFAULT 'UTC'"),
        ("target_app_instance_id", "VARCHAR"),
        ("mode", "VARCHAR DEFAULT 'scheduled'"),
        ("transition", "VARCHAR DEFAULT 'fade'"),
        ("duration", "INTEGER DEFAULT 5000")
    ]
    for col, dtype in columns_ei:
        try:
            c.execute(f"ALTER TABLE event_items ADD COLUMN {col} {dtype}")
        except sqlite3.OperationalError:
            pass # column exists
            
    conn.commit()
    conn.close()
    print("Migration successful")

if __name__ == '__main__':
    run()
