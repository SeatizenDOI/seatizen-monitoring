import polars as pl
from shapely import wkb
from geoalchemy2 import Geometry

from sqlalchemy import String, Integer, Float
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class Frame(Base):
    __tablename__ = "frame"  # existing table name

    id: Mapped[Integer] = mapped_column(Integer, primary_key=True)
    version_doi: Mapped[str] = mapped_column(String)
    filename: Mapped[str] = mapped_column(String)
    OriginalFileName: Mapped[str] = mapped_column(String)
    relative_file_path: Mapped[str] = mapped_column(String, nullable=True)
    GPSAltitude: Mapped[float] = mapped_column(Float, nullable=True)
    GPSPitch: Mapped[float] = mapped_column(Float, nullable=True)
    GPSRoll: Mapped[float] = mapped_column(Float, nullable=True)
    GPSTrack: Mapped[float] = mapped_column(Float, nullable=True)
    GPSFix: Mapped[int] = mapped_column(Integer, nullable=True)
    GPSDatetime: Mapped[str] = mapped_column(String, nullable=True)
    GPSPosition: Mapped[str] = mapped_column(Geometry("POINT"))

    @property
    def GPSLongitude(self) -> float | None:
        if self.GPSPosition is None:
            return None
        point = wkb.loads(bytes(self.GPSPosition.data))  # shapely parses PostGIS geometry
        return point.x

    @property
    def GPSLatitude(self) -> float | None:
        if self.GPSPosition is None:
            return None
        point = wkb.loads(bytes(self.GPSPosition.data))
        return point.y
    

def match_frame_header_and_attribut(fs: str, frame: Frame):
    if fs == "version_doi": return f"https://doi.org/10.5281/zenodo.{frame.version_doi}"
    elif fs == "OriginalFileName": return frame.OriginalFileName
    elif fs == "relative_file_path": return frame.relative_file_path
    elif fs == "GPSLongitude": return frame.GPSLongitude
    elif fs == "GPSLatitude": return frame.GPSLatitude
    elif fs == "GPSAltitude": return frame.GPSAltitude
    elif fs == "GPSRoll": return frame.GPSRoll
    elif fs == "GPSPitch": return frame.GPSPitch
    elif fs == "GPSTrack": return frame.GPSTrack
    elif fs == "GPSFix": return frame.GPSFix
    elif fs == "GPSDatetime": return frame.GPSDatetime
    
    return None


def typed_frames_header() -> dict:
    return {
        "GPSLatitude": pl.Float64,
        "GPSLongitude": pl.Float64,
        "version_doi": pl.String,
        "OriginalFileName": pl.String,
        "relative_file_path": pl.String,
        "GPSAltitude": pl.Float64,
        "GPSPitch": pl.Float64,
        "GPSRoll": pl.Float64,
        "GPSTrack": pl.Float64,
        "GPSDatetime": pl.Datetime,
        "GPSFix": pl.UInt8
    }