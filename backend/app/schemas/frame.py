from pydantic import BaseModel

# Base schema (shared attributes)
class FrameBase(BaseModel):
    version_doi: str 
    filename: str
    OriginalFileName: str
    relative_file_path: str | None
    GPSAltitude: float | None
    GPSPitch: float | None
    GPSRoll: float | None
    GPSTrack: float | None
    GPSFix: int | None
    GPSDatetime: str
    GPSLongitude: float | None
    GPSLatitude: float | None

# Response schema (inherits Base)
class FrameResponse(FrameBase):
    class Config:
        from_attributes = True  # Enable ORM to Pydantic conversion