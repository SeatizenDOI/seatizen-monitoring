from geoalchemy2 import Geometry 

from sqlalchemy import String, Boolean, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


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

    deposit_linestring: Mapped["DepositLineString"] = relationship(
        "DepositLineString",
        back_populates="deposit",
        uselist=False,
        cascade="all, delete-orphan"
    )

class DepositLineString(Base):
    __tablename__ = "deposit_linestring"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    deposit_doi: Mapped[str] = mapped_column(ForeignKey("deposit.doi"), unique=True)
    footprint_linestring: Mapped[str] = mapped_column(Geometry("LINESTRING"))

    deposit: Mapped["Deposit"] = relationship("Deposit", back_populates="deposit_linestring")
