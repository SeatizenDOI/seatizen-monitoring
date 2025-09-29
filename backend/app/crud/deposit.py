from pyproj import Geod
from datetime import date
from typing import Optional
from binascii import unhexlify
from geoalchemy2.shape import to_shape
from geoalchemy2.elements import WKBElement


from sqlalchemy import select
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.deposit import Deposit

PLATFORMS_AS_LINESTRING = ["UVC", "SCUBA", "PADDLE"]

async def get_deposits_filtered(
        platforms: Optional[str],
        start_date: Optional[date],
        end_date: Optional[date],
        db: AsyncSession
):
    stmt = select(Deposit).options(joinedload(Deposit.deposit_linestring))

    # Filter by platforms
    if platforms:
        stmt = stmt.filter(Deposit.platform_type.in_(platforms.split(',')))

    # Filter by date range
    if start_date:
        stmt = stmt.filter(Deposit.session_date >= start_date)
    if end_date:
        stmt = stmt.filter(Deposit.session_date <= end_date)

    result = await db.execute(stmt)
    deposits = result.scalars().all()

    # Convert geometry to GeoJSON
    geod = Geod(ellps="WGS84")

    for d in deposits:

        if d.footprint and d.platform_type not in PLATFORMS_AS_LINESTRING:
            fp = d.footprint

            # If asyncpg returned a string (hex WKB), convert it to WKBElement
            if isinstance(fp, str):
                fp = WKBElement(unhexlify(fp), srid=4326)

            shape = to_shape(fp)  # Converts WKB to Shapely geometry
            poly_area, poly_perimeter = geod.geometry_area_perimeter(shape)
            d.area = f"{round(poly_area , 2)} m²"
            d.footprint = shape.__geo_interface__  # GeoJSON format
            
        else:
            d.area = None
            d.footprint = None


        if d.deposit_linestring.footprint_linestring and d.platform_type in PLATFORMS_AS_LINESTRING:
            fl = d.deposit_linestring.footprint_linestring

            # If asyncpg returned a string (hex WKB), convert it to WKBElement
            if isinstance(fl, str):
                fl = WKBElement(unhexlify(fl), srid=4326)

            shape = to_shape(fl)  # Converts WKB to Shapely geometry
            poly_area, poly_perimeter = geod.geometry_area_perimeter(shape)
            d.deposit_linestring.footprint_linestring = shape.__geo_interface__  # GeoJSON format
            d.perimeter = f"{round(poly_perimeter / 2)} m" # Magic smoke.
        else:
            d.deposit_linestring.footprint_linestring = None
            d.perimeter = None
            

    return deposits