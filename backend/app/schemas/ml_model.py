from datetime import datetime
from pydantic import BaseModel

# Base schema (shared attributes)
class MlModelBase(BaseModel):
    id: int
    name: str
    link: str
    doi: str | None
    creation_date: datetime

# Response schema (inherits Base)
class MlModelResponse(MlModelBase):
    class Config:
        from_attributes = True  # Enable ORM to Pydantic conversion