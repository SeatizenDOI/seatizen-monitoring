from geoalchemy2.shape import to_shape

from sqlalchemy import select
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.deposit import Deposit

PLATFORMS_AS_LINESTRING = ["UVC", "SCUBA", "PADDLE"]

async def get_all_deposits(db: AsyncSession):

    result = await db.execute(select(Deposit).options(joinedload(Deposit.deposit_linestring)))
    deposits =  result.scalars().all()

    # Convert geometry to GeoJSON
    for d in deposits:
        if d.footprint and d.platform_type not in PLATFORMS_AS_LINESTRING:
            shape = to_shape(d.footprint)  # Converts WKB to Shapely geometry
            d.footprint = shape.__geo_interface__  # GeoJSON format
        else:
            d.footprint = None

        if d.deposit_linestring.footprint_linestring and d.platform_type in PLATFORMS_AS_LINESTRING:
            shape = to_shape(d.deposit_linestring.footprint_linestring)  # Converts WKB to Shapely geometry
            d.deposit_linestring.footprint_linestring = shape.__geo_interface__  # GeoJSON format
        else:
            d.deposit_linestring.footprint_linestring = None
    return deposits