from pydantic import BaseModel
from typing import Any, Optional

# Base schema (shared attributes)
class DepositLineStringResponse(BaseModel):
    footprint_linestring: Any  # or GeoJSON

    class Config:
        from_attributes = True

class DepositBase(BaseModel):
    doi: str
    session_name: str
    have_processed_data: bool
    have_raw_data: bool
    session_date: str
    alpha3_country_code: str
    location: str
    platform_type: str
    footprint: Any  # Will store GeoJSON representation
    deposit_linestring: Optional[DepositLineStringResponse]  # one-to-one


# Response schema (inherits Base)
class DepositResponse(DepositBase):
    class Config:
        from_attributes = True  # Enable ORM to Pydantic conversion