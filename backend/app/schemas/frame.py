from typing import Any
from pydantic import BaseModel

# Base schema (shared attributes)
class FrameBase(BaseModel):
    version_doi: str 
    filename: str
    original_filename: str
    relative_path: str | None
    gps_latitude: float | None
    gps_longitude: float | None
    gps_altitude: float | None
    gps_pitch: float | None
    gps_roll: float | None
    gps_track: float | None
    gps_fix: int | None
    gps_datetime: str
    gps_position: Any
    id: int

# Response schema (inherits Base)
class FrameResponse(FrameBase):
    class Config:
        from_attributes = True  # Enable ORM to Pydantic conversion