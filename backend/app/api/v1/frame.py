from typing import List
from fastapi import APIRouter

from app.schemas.frame import FrameBase


router = APIRouter()

@router.get("/fields", response_model=List[str])
async def get_frame_fields():
    """ List all fields you want to expose for filtering """

    list_frame_headers = list(FrameBase.model_fields.keys())
    list_frame_headers.remove("filename")
    
    return list_frame_headers