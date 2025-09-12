from sqlalchemy import select, and_, any_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import array

from typing import AsyncGenerator

from app.models import MlPred

async def get_pred_from_frame_ids_and_class_ids(
    frame_ids: list[int],
    class_ids: list[int],
    db: AsyncSession,
    batch_size: int = 15000,
) -> AsyncGenerator[dict, None]:
    
    for i in range(0, len(frame_ids), batch_size):
        batch = frame_ids[i:i+batch_size]
        stmt = select(MlPred.__table__).where(
            and_(
                MlPred.frame_id == any_(array(batch)),
                MlPred.ml_class_id == any_(array(class_ids))
            )
        )

        async for row in await db.stream(stmt):
            yield dict(row._mapping)