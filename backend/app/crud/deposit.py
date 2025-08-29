from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.deposit import Deposit

from geoalchemy2.shape import to_shape

async def get_all_deposits(db: AsyncSession):
    result = await db.execute(select(Deposit))
    deposits =  result.scalars().all()

    # Convert geometry to GeoJSON
    for d in deposits:
        if d.footprint:
            shape = to_shape(d.footprint)  # Converts WKB to Shapely geometry
            d.footprint = shape.__geo_interface__  # GeoJSON format
    return deposits