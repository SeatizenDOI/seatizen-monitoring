from fastapi import APIRouter
from app.api.v1 import deposit

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(deposit.router, prefix="/deposits", tags=["deposits"])