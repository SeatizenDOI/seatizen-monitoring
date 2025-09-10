from pydantic import BaseModel


class VersionBase(BaseModel):
    doi: str
    deposit_doi: str


# Response schema (inherits Base)
class VersionResponse(VersionBase):
    class Config:
        from_attributes = True  # Enable ORM to Pydantic conversion