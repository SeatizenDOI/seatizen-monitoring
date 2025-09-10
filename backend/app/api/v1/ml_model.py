from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.crud.ml_models import get_all_ml_model
from app.schemas.ml_model import MlModelResponse


router = APIRouter()

@router.get("/", response_model=List[MlModelResponse])
async def read_ml_model(db: AsyncSession = Depends(get_db)):
    models = await get_all_ml_model(db)
    return models