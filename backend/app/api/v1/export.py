import io
from typing import Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from app.database import get_db
from app.crud.export import get_export_data


router = APIRouter()

@router.post("/")
async def export_data(payload: Dict[str, Any], db: AsyncSession = Depends(get_db)):
    filters = payload.get("filters", {})
    polygons = payload.get("polygons", [])

    # Get polars dataframe.
    df = await get_export_data(filters, polygons, db)

    # Write CSV into memory buffer
    output = io.BytesIO()
    df.write_csv(output)
    output.seek(0)

    # Return as streaming response
    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=export.csv"},
    )