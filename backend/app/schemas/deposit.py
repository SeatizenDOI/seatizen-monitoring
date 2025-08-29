from pydantic import BaseModel
from typing import Any

# Base schema (shared attributes)
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

# Response schema (inherits Base)
class DepositResponse(DepositBase):
    class Config:
        from_attributes = True  # Enable ORM to Pydantic conversion