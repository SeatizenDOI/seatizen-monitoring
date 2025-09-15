import json
import sqlite3
from datetime import datetime


class JobDatabase:
    def __init__(self, db_path: str = "jobs.db"):
        self.db_path = db_path
        self.create_database()


    def create_database(self):
        """Ensure table exists."""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
            CREATE TABLE IF NOT EXISTS jobs (
                id TEXT PRIMARY KEY,
                filters TEXT,
                polygon TEXT,
                current_date DATETIME
            )
            """)
            conn.commit()


    def save_job(self, job_id: str, filters: str, polygon: str) -> None:
        """Add job in database."""
        
        current_date = datetime.now()

        with sqlite3.connect(self.db_path) as conn:
            conn.execute(
                "INSERT INTO jobs (id, filters, polygon, current_date) VALUES (?, ?, ?, ?)",
                (job_id, json.dumps(filters), json.dumps(polygon), current_date)
            )
            conn.commit()


    def get_job(self, job_id: str) -> tuple[str, str] | None:
        """Retrieve a job from the database."""

        with sqlite3.connect(self.db_path) as conn:
            row = conn.execute("SELECT filters, polygon FROM jobs WHERE id=?", (job_id,)).fetchone()
            return (json.loads(row[0]), json.loads(row[1])) if row else None


    def drop_job(self, job_id: str) -> None:
        """Remove job from the database."""

        with sqlite3.connect(self.db_path) as conn:
            conn.execute("DELETE FROM jobs WHERE id=?", (job_id,))
            conn.commit()
