import uuid
from typing import Dict, Any

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.crud.export import stream_export_data

from app.utils.job_database import JobDatabase

router = APIRouter()

database = JobDatabase()


@router.post("/save-job")
async def export_data(payload: Dict[str, Any]):
    """ Save filters as a job and return job id"""
    filters = payload.get("filters", {})
    polygons = payload.get("polygons", [])

    job_id = str(uuid.uuid4())
    database.save_job(job_id, filters, polygons)

    return {"job_id": job_id} 


@router.get("/download-csv")
async def download_csv(job_id: str):
    """ From a job id, stream the request. """
    data = database.get_job(job_id)
    if data == None:
        raise HTTPException(status_code=404, detail="Job not found")
    
    filters, polygons = data

    # Return as streaming response
    return StreamingResponse(
        stream_export_data(filters, polygons),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=seatizen_monitoring_{job_id}.csv"},
    )