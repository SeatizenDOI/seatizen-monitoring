from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.ml_model import MlModel

async def get_all_ml_model(db: AsyncSession):
    result = await db.execute(select(MlModel))
    ml_models =  result.scalars().all()
    return ml_models