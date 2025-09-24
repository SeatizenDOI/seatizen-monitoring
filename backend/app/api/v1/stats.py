from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.deposit import Deposit
from app.models.frame import Frame
from app.models.version import Version


router = APIRouter()

@router.get("/light")
async def stats(db: AsyncSession = Depends(get_db)):
    # Count deposits
    deposit_count_result = await db.execute(select(func.count()).select_from(Deposit))
    nb_deposit = deposit_count_result.scalar_one()

    # Count frames
    frame_count_result = await db.execute(select(func.count()).select_from(Frame))
    nb_frames = frame_count_result.scalar_one()

    return {
        "nb_deposits": nb_deposit,
        "nb_frames": nb_frames,
    }


@router.get("/heavy")
async def stats(db: AsyncSession = Depends(get_db)):
    
    # Count deposit
    deposit_count_result = await db.execute(select(func.count()).select_from(Deposit))
    nb_deposit = deposit_count_result.scalar_one()

    # Count frames
    frame_count_result = await db.execute(select(func.count()).select_from(Frame))
    nb_frames = frame_count_result.scalar_one()

    # Count ASV frames in Q1.
    stmt = (
        select(func.count())
        .select_from(Frame)
        .join(Version, Frame.version_doi == Version.doi)
        .join(Deposit, Version.deposit_doi == Deposit.doi)
        .where(Deposit.platform_type == "ASV")
        .where(Frame.GPSFix == 1)
    )
    frames_count_q1_asv = await db.execute(stmt)
    nb_frames_q1_asv = frames_count_q1_asv.scalar_one()

    # Count frames by Deposit.platform_type
    stmt = (
        select(Deposit.platform_type, func.count(Frame.id))
        .join(Version, Version.deposit_doi == Deposit.doi)
        .join(Frame, Frame.version_doi == Version.doi)
        .group_by(Deposit.platform_type)
    )

    result = await db.execute(stmt)
    frames_by_platform = [
        {"platform_type": platform_type, "count": count}
        for platform_type, count in result.all()
    ]

    # Deposit by platform.
    stmt = (
        select(Deposit.platform_type, func.count(Deposit.doi))
        .group_by(Deposit.platform_type)
    )

    result = await db.execute(stmt)
    deposit_by_platform = [
        {"platform_type": platform_type, "count": count}
        for platform_type, count in result.all()
    ]

    return {
        "nb_deposits": nb_deposit,
        "nb_frames": nb_frames,
        "nb_frames_q1_asv": (nb_frames_q1_asv / nb_frames) * 100,
        "frames_by_platform": frames_by_platform,
        "deposit_by_platform": deposit_by_platform
    }
