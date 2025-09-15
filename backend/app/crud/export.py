import io
import csv
import polars as pl
from datetime import datetime
from typing import AsyncGenerator

from app.utils.polygons import extract_polygons
from app.models.frame import match_frame_header_and_attribut, typed_frames_header
from app.database import SessionLocal

from .ml_class import get_all_ml_class_by_model
from .frame import get_frames_filter_by_position_platform_date, Frame
from .ml_pred import get_pred_from_frame_ids_and_class_ids

async def stream_export_data(filters: dict, user_areas: list) -> AsyncGenerator[bytes, None]:
    """Stream CSV per frame, filling all class columns before yielding."""

    # --- Setup ---
    async with SessionLocal() as db:
        user_areas_pol = extract_polygons(user_areas)
        platforms = filters.get("platform", [])
        start_date = datetime.strptime(filters.get("startDate", ""), "%Y-%m-%d").date()
        end_date = datetime.strptime(filters.get("endDate", ""), "%Y-%m-%d").date()
        frames_field = filters.get("selectedFields", [])
        selected_ml_class_ids = filters.get("selectedClassIds")
        selected_ml_model_id = filters.get("selectedModelId")
        filter_type = filters.get("filterType")

        ml_classes = await get_all_ml_class_by_model(db, selected_ml_model_id)

        if len(selected_ml_class_ids) == 1 and selected_ml_class_ids[0] == 0:
            ml_classes_selected = ml_classes
        else:
            ml_classes_selected = [ml_class for ml_class in ml_classes if ml_class.id in selected_ml_class_ids]

        class_names = [mlc.name for mlc in ml_classes_selected]
        ml_class_map_by_id = {mlc.id: mlc for mlc in ml_classes_selected}

        # Get frames and prepare lookup
        frames = await get_frames_filter_by_position_platform_date(start_date, end_date, platforms, user_areas_pol, db)
        frame_map = {f.id: f for f in frames}

        # If no class selected, return only frames metadata, skip prediction logic.
        if len(ml_class_map_by_id) == 0:
            for chunk in export_frames_without_classes(frames, frames_field):
                yield chunk
            return  # stop here

        # Prepare batch
        batch_size = 10_000
        current_batch = {
            "FileName": [],
            **{fs: [] for fs in frames_field},
            "pred_doi": [],
            **{cls: [] for cls in class_names},
        }

        first_chunk = True

        # Helper: flush batch
        async def flush_batch():
            nonlocal first_chunk, current_batch
            df = pl.DataFrame(current_batch, schema_overrides=typed_frames_header())
            yield _df_to_csv_bytes(df, include_header=first_chunk)
            first_chunk = False
            for k in current_batch:
                current_batch[k] = []

        # --- Streaming and grouping logic ---
        current_frame_id = None
        current_preds = []

        async for pred in get_pred_from_frame_ids_and_class_ids([f.id for f in frames], list(ml_class_map_by_id), db):
            fid = pred["frame_id"]

            # When frame changes, flush previous frame row
            if current_frame_id is not None and fid != current_frame_id:
                await _add_frame_row(
                    current_frame_id, current_preds, frame_map, frames_field, class_names, ml_class_map_by_id, filter_type, current_batch
                )
                current_preds = []

                if len(current_batch["FileName"]) >= batch_size:
                    async for chunk in flush_batch():
                        yield chunk

            current_frame_id = fid
            current_preds.append(pred)

        # Last frame after loop
        if current_frame_id is not None:
            await _add_frame_row(
                current_frame_id, current_preds, frame_map, frames_field, class_names, ml_class_map_by_id, filter_type, current_batch
            )

        # Final flush
        if current_batch["FileName"]:
            async for chunk in flush_batch():
                yield chunk


async def _add_frame_row(frame_id, preds, frame_map, frames_field, class_names, ml_class_map_by_id, filter_type, batch):
    """Build one CSV row for a single frame and add it to batch."""
    frame = frame_map.get(frame_id)
    if not frame:
        return

    row = {
        "FileName": frame.filename,
        **{fs: match_frame_header_and_attribut(fs, frame) for fs in frames_field},
        "pred_doi": "",
        **{cls: -1.0 for cls in class_names},
    }

    for pred in preds:
        row["pred_doi"] = f"https://doi.org/10.5281/zenodo.{pred['version_doi']}" if pred["version_doi"] else ""
        ml_class = ml_class_map_by_id.get(pred["ml_class_id"])
        if ml_class:
            row[ml_class.name] = (
                pred["score"] if filter_type == "score" else int(pred["score"] >= ml_class.threshold)
            )

    for k in batch:
        batch[k].append(row[k])


def _df_to_csv_bytes(df: pl.DataFrame, include_header=True) -> bytes:
    buf = io.StringIO()
    df.write_csv(buf, include_header=include_header)
    return buf.getvalue().encode("utf-8")


def export_frames_without_classes(frames: list[Frame], frames_field: list):
    """ Retrieve only the frames with the metadata. """
    buffer = io.StringIO()
    writer = csv.writer(buffer)

    header = ["FileName", *frames_field]
    writer.writerow(header)
    yield buffer.getvalue().encode()
    buffer.seek(0)
    buffer.truncate(0)


    for frame in frames:
        row = [
            frame.filename,
            *[match_frame_header_and_attribut(fs, frame) for fs in frames_field]
        ]

        writer.writerow(row)
        yield buffer.getvalue().encode()
        buffer.seek(0)
        buffer.truncate(0)