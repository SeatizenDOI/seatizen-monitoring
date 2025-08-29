from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Integer, Boolean
from geoalchemy2 import Geometry 

class Base(DeclarativeBase):
    pass

class Deposit(Base):
    __tablename__ = "deposit"  # existing table name

    doi: Mapped[str] = mapped_column(String, primary_key=True)
    session_name: Mapped[str] = mapped_column(String)
    have_processed_data: Mapped[bool] = mapped_column(Boolean)
    have_raw_data: Mapped[bool] = mapped_column(Boolean)
    session_date: Mapped[str] = mapped_column(String)
    alpha3_country_code: Mapped[str] = mapped_column(String)
    location: Mapped[str] = mapped_column(String)
    platform_type: Mapped[str] = mapped_column(String)
    footprint: Mapped[str] = mapped_column(Geometry("POLYGON"))
