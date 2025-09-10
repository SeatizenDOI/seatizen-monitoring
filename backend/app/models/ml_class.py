from sqlalchemy import String, Integer, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base

class MlClass(Base):
    __tablename__ = "multilabel_class"  # existing table name

    id: Mapped[Integer] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    threshold: Mapped[float] = mapped_column(Float)
    ml_label_id: Mapped[Integer] = mapped_column(ForeignKey("multilabel_label.id"))
    ml_model_id: Mapped[Integer] = mapped_column(ForeignKey("multilabel_model.id"))