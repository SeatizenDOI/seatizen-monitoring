from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.ml_class import MlClass


async def get_all_ml_class(db: AsyncSession):
    result = await db.execute(select(MlClass))
    ml_class = result.scalars().all()
    return ml_class


async def get_all_ml_class_by_model(db: AsyncSession, model_id: int):
    result = await db.execute(select(MlClass).where(MlClass.ml_model_id == model_id))
    ml_class = result.scalars().all()
    return ml_class