import sqlite3

def verify():
    conn = sqlite3.connect('deckoviz.db')
    c = conn.cursor()
    
    # Verify daily_queue_slots columns
    c.execute("PRAGMA table_info(daily_queue_slots)")
    dqs_cols = {row[1]: row[2] for row in c.fetchall()}
    print("daily_queue_slots columns:", dqs_cols)
    
    # Verify event_items columns
    c.execute("PRAGMA table_info(event_items)")
    ei_cols = {row[1]: row[2] for row in c.fetchall()}
    print("event_items columns:", ei_cols)
    
    conn.close()

if __name__ == '__main__':
    verify()
