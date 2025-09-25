from datetime import date
from typing import List, Optional
from fastapi import APIRouter, Depends, Query

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.deposit import Deposit
from app.crud.deposit import get_deposits_filtered
from app.schemas.deposit import DepositResponse


router = APIRouter()

@router.get("/search")
async def get_deposit_search_data(db: AsyncSession = Depends(get_db)):
    # Distinct platform types
    platform_stmt = select(Deposit.platform_type).distinct()
    platform_result = await db.execute(platform_stmt)
    platforms = [row[0] for row in platform_result.fetchall()]

    # Min and max session_date
    date_stmt = select(func.min(Deposit.session_date), func.max(Deposit.session_date))
    date_result = await db.execute(date_stmt)
    min_date, max_date = date_result.fetchone()

    return {
        "platforms": sorted(platforms),
        "timeline": {
            "min": min_date,
            "max": max_date
        }
    }


@router.get("/filter")
async def get_deposit_filter_by_date_and_platforms(
        platforms: Optional[str] = Query(None, description="Comma-separated list of platforms"),
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
        db: AsyncSession = Depends(get_db)
    ):
    deposits = await get_deposits_filtered(platforms, start_date, end_date, db)
    return deposits