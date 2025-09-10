from fastapi import APIRouter

from app.api.v1 import deposit, ml_class, ml_model, frame, export

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(deposit.router, prefix="/deposits", tags=["deposits"])
api_router.include_router(ml_model.router, prefix="/ml_model", tags=["ml_models"])
api_router.include_router(ml_class.router, prefix="/ml_class", tags=["ml_class"])
api_router.include_router(frame.router, prefix="/frame", tags=["frame"])
api_router.include_router(export.router, prefix="/export", tags=["export"])
