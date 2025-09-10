from sqlalchemy import String, Integer, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base

class MlPred(Base):
    __tablename__ = "multilabel_prediction"  # existing table name

    id: Mapped[Integer] = mapped_column(Integer, primary_key=True)
    score: Mapped[float] = mapped_column(Float)
    version_doi: Mapped[str] = mapped_column(ForeignKey("version.doi"))
    frame_id: Mapped[Integer] = mapped_column(ForeignKey("frame.id"))
    ml_class_id: Mapped[Integer] = mapped_column(ForeignKey("multilabel_class.id"))