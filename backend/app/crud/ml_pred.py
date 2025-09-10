from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import MlPred


async def get_pred_from_frame_and_class_ids(
        frame_id: int,
        class_ids: list[int],
        db: AsyncSession
):
    """ Return predictions based on frame_id and class ids. """
    stmt = select(MlPred)

    stmt = stmt.where(
        and_(
            MlPred.ml_class_id.in_(class_ids),
            MlPred.frame_id == frame_id
        )
    )
    result = await db.execute(stmt)
    ml_pred = result.scalars().all()

    return ml_pred