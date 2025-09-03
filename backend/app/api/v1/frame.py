from typing import List
from fastapi import APIRouter


router = APIRouter()

@router.get("/fields", response_model=List[str])
async def get_frame_fields():
    # List all fields you want to expose for filtering
    fields = [
        "version_doi",
        "filename",
        "original_filename",
        "relative_path",
        "gps_latitude",
        "gps_longitude",
        "gps_altitude",
        "gps_pitch",
        "gps_roll",
        "gps_track",
        "gps_fix",
        "gps_datetime"
    ]
    return fields