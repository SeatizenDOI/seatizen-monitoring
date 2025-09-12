from datetime import date
from shapely.geometry import Polygon

from sqlalchemy import select, func, and_, union_all
from sqlalchemy.orm import aliased
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Deposit, Version, Frame


async def get_frames_filter_by_position_platform_date(
        start_date: date,
        end_date: date,
        platforms: list[str],
        user_areas_pol: list[Polygon],
        db: AsyncSession
):
    """ Select frames inside polygons, filter by date and platforms. """

    # Aliases for clarity
    f = aliased(Frame)
    v = aliased(Version)
    d = aliased(Deposit)


   # Base query with joins
    stmt = (
        select(f)  # or explicit columns if you want
        .join(v, f.version_doi == v.doi)
        .join(d, v.deposit_doi == d.doi)
    )

     # Date filter
    stmt = stmt.where(
        and_(
            d.session_date >= start_date,
            d.session_date <= end_date,
        )
    )

    # Platform type filter
    if len(platforms) > 0:
        stmt = stmt.where(d.platform_type.in_(platforms))
    
    # Geospatial filter
    if len(user_areas_pol) > 0:
        # 1. Build a CTE with all polygons
        polygons = union_all(
            *[
                select(func.ST_GeomFromText(poly.wkt, 4326).label("geom"))
                for poly in user_areas_pol
            ]
        ).cte("polygons")

        # 2. Build a CTE with the union of all polygons
        combined_polygon = (
            select(func.ST_Union(polygons.c.geom).label("geom"))
            .select_from(polygons)
            .cte("combined_polygon")
        )

        # 3. Add WHERE clause using the CTE
        stmt = stmt.where(
            and_(
                f.GPSPosition.isnot(None),
                func.ST_Contains(select(combined_polygon.c.geom), f.GPSPosition),
            )
        )
    
    results = await db.execute(stmt)
    frames = results.scalars().all()

    return frames
