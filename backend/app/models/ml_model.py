from typing import Optional
from datetime import datetime

from sqlalchemy import String, Integer, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class MlModel(Base):
    __tablename__ = "multilabel_model"  # existing table name

    id: Mapped[Integer] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    link: Mapped[str] = mapped_column(String)
    doi: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    creation_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)