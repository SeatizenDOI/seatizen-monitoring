from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.ml_class import MlClassResponse
from app.crud.ml_class import get_all_ml_class, get_all_ml_class_by_model

router = APIRouter()

@router.get("/", response_model=List[MlClassResponse])
async def read_ml_class(db: AsyncSession = Depends(get_db)):
    ml_class = await get_all_ml_class(db)
    return ml_class

@router.get("/model/{model_id}", response_model=List[MlClassResponse])
async def read_ml_class_by_model(model_id: int, db: AsyncSession = Depends(get_db)):
    ml_classes = await get_all_ml_class_by_model(db, model_id)
    return ml_classes