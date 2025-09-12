import polars as pl
from datetime import datetime
from collections import defaultdict
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.ml_pred import MlPred
from app.models.ml_class import MlClass
from app.utils.polygons import extract_polygons
from app.models.frame import match_frame_header_and_attribut, Frame, typed_frames_header

from .ml_class import get_all_ml_class_by_model
from .frame import get_frames_filter_by_position_platform_date
from .ml_pred import get_pred_from_frame_ids_and_class_ids


async def get_export_data(
        filters: dict,
        user_areas: list,
        db: AsyncSession
) -> pl.DataFrame:
    """ From user filters, selected and build a polars dataframe. """

    # Extract filters.
    user_areas_pol = extract_polygons(user_areas)
    platforms = filters.get("platform", [])
    start_date = datetime.strptime(filters.get("startDate", ""), "%Y-%m-%d").date()
    end_date = datetime.strptime(filters.get("endDate", ""), "%Y-%m-%d").date()
    frames_field = filters.get("selectedFields", [])
    selected_ml_class_ids = filters.get("selectedClassIds")
    selected_ml_model_id = filters.get("selectedModelId")
    filter_type = filters.get("filterType")


    # Get all class for the selected model_id.
    ml_classes = await get_all_ml_class_by_model(db, selected_ml_model_id)

    # Extract only the selected classes or all if the id is selected.
    ml_classes_selected = []
    if len(selected_ml_class_ids) == 1 and selected_ml_class_ids[0] == 0:
        ml_classes_selected = ml_classes
    else:
        ml_classes_selected = [ml_class for ml_class in ml_classes if ml_class.id in selected_ml_class_ids]
    
    # Retrieve selected frames from database.
    frames = await get_frames_filter_by_position_platform_date(start_date, end_date, platforms, user_areas_pol, db)
    
    # Split the circuit into two case. If the user doesn't need class, render only the metadata.
    if len(ml_classes_selected) > 0:
        df_data = await export_frames_with_classes_lazy(frames, ml_classes_selected, frames_field, filter_type, db)
    else:
        df_data = export_frames_without_classes(frames, frames_field)

    return df_data


async def export_frames_with_classes_lazy(
    frames: list[Frame],
    ml_classes_selected: list[MlClass],
    frames_field: list,
    filter_type: str,
    db: AsyncSession,
    batch_size: int = 50_000,
) -> pl.DataFrame:
    """
    Lazy version: streams predictions and builds Polars DataFrame in chunks.
    """

    ml_class_map_by_id = {mlc.id: mlc for mlc in ml_classes_selected}

    # Pre-allocate a mapping for quick lookup
    class_names = [mlc.name for mlc in ml_classes_selected]

    # We'll accumulate rows in batches to avoid huge memory usage
    all_batches: list[pl.DataFrame] = []
    current_batch = {
        "FileName": [],
        "pred_doi": [],
        **{fs: [] for fs in frames_field},
        **{cls: [] for cls in class_names},
    }

    # Instead of pulling ALL predictions, we stream them grouped by frame
    # You'll need to modify get_pred_from_frame_ids_and_class_ids to yield rows
    frame_id_to_preds: dict[int, list[MlPred]] = defaultdict(list)

    async for pred in get_pred_from_frame_ids_and_class_ids(
        [f.id for f in frames], list(ml_class_map_by_id), db
    ):
        frame_id_to_preds[pred["frame_id"]].append(pred)


    for idx, frame in enumerate(frames, start=1):
        preds = frame_id_to_preds.get(frame.id, [])

        # Prepare row
        row = {
            "FileName": frame.filename,
            **{fs: match_frame_header_and_attribut(fs, frame) for fs in frames_field},
            "pred_doi": "",
            **{cls: -1.0 for cls in class_names},
        }

        for pred in preds:
            row["pred_doi"] = f"https://doi.org/10.5281/zenodo.{pred["version_doi"]}" if pred["version_doi"] else ""
            ml_class = ml_class_map_by_id.get(pred["ml_class_id"])
            if not ml_class:
                continue
            row[ml_class.name] = (
                pred["score"] if filter_type == "score" else int(pred["score"] >= ml_class.threshold)
            )

        # Append to current batch
        for k in current_batch:
            current_batch[k].append(row[k])

        # Flush batch to DataFrame when we hit batch_size
        if idx % batch_size == 0:
            all_batches.append(
                pl.DataFrame(current_batch, schema_overrides=typed_frames_header())
            )
            for k in current_batch:
                current_batch[k] = []  # reset for next batch

    # Final flush for remaining rows
    if current_batch["FileName"]:
        all_batches.append(
            pl.DataFrame(current_batch, schema_overrides=typed_frames_header())
        )

    # Concatenate all batches into a single DataFrame
    final_df = pl.concat(all_batches)

    return final_df


def export_frames_without_classes(frames: list[Frame], frames_field: list) -> pl.DataFrame:
    """ Retrieve only the frames with the metadata. """
    frame_name, field_columns = [], {fs: [] for fs in frames_field}
 
    for frame in frames:
        frame_name.append(frame.filename)

        # Frame fields
        for fs in frames_field:
            field_columns[fs].append(match_frame_header_and_attribut(fs, frame))

    df_data = pl.DataFrame(
        {"FileName": frame_name, **field_columns},
        schema_overrides=typed_frames_header()
    )
    
    return df_data