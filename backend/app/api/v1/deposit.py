from datetime import date
from typing import List, Optional
from fastapi import APIRouter, Depends, Query

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.deposit import Deposit
from app.crud.deposit import get_all_deposits, get_deposits_filtered
from app.schemas.deposit import DepositResponse


router = APIRouter()

@router.get("/", response_model=List[DepositResponse])
async def read_deposits(db: AsyncSession = Depends(get_db)):
    deposits = await get_all_deposits(db)
    return deposits


@router.get("/filters")
async def get_deposit_filters(db: AsyncSession = Depends(get_db)):
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


@router.get("/data")
async def get_deposit_filters(
        platforms: Optional[str] = Query(None, description="Comma-separated list of platforms"),
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
        db: AsyncSession = Depends(get_db)
    ):
    deposits = await get_deposits_filtered(platforms, start_date, end_date, db)
    return deposits