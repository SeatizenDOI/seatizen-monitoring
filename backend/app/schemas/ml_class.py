from pydantic import BaseModel

# Base schema (shared attributes)
class MlClassBase(BaseModel):
    id: int
    name: str
    threshold: float
    ml_label_id: int
    ml_model_id: int


# Response schema (inherits Base)
class MlClassResponse(MlClassBase):
    class Config:
        from_attributes = True  # Enable ORM to Pydantic conversion