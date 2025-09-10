from geoalchemy2 import Geometry 

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base

class Version(Base):
    __tablename__ = "version"  # existing table name

    doi: Mapped[str] = mapped_column(String, primary_key=True)
    deposit_doi: Mapped[str] = mapped_column(String)

