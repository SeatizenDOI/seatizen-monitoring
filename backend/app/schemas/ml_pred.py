from pydantic import BaseModel

# Base schema (shared attributes)
class MlPredBase(BaseModel):
    id: int
    score: float
    version_doi: str
    frame_id: int
    ml_class_id: int


# Response schema (inherits Base)
class MlClassResponse(MlPredBase):
    class Config:
        from_attributes = True  # Enable ORM to Pydantic conversion