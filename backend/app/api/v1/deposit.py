from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.schemas.deposit import DepositResponse
from app.crud.deposit import get_all_deposits
from app.database import get_db

router = APIRouter()

@router.get("/", response_model=List[DepositResponse])
async def read_deposits(db: AsyncSession = Depends(get_db)):
    deposits = await get_all_deposits(db)
    return deposits