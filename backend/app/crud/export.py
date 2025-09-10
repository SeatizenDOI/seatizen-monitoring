import polars as pl
from datetime import datetime
from shapely import Polygon, Point
from shapely.geometry import Polygon
from sqlalchemy.ext.asyncio import AsyncSession


from app.models.frame import match_frame_header_and_attribut

from .ml_class import get_all_ml_class_by_model
from .frame import get_frames_filter_by_position_platform_date
from .ml_pred import get_pred_from_frame_and_class_ids


async def get_export_data(
        filters: dict,
        user_areas: list,
        db: AsyncSession
) -> pl.DataFrame:
    """ From user filters, selected and build a polars dataframe. """
    # Extract filters/
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
    

    frames = await get_frames_filter_by_position_platform_date(start_date, end_date, platforms, user_areas_pol, db)

    # Init dataframe header. Force header type due to polars library.
    df_header = ["FileName"] + frames_field
    
    # Add class name if selected.
    if len(ml_classes_selected) > 0:
        df_header += ["pred_doi"] + [mlc.name for mlc in ml_classes_selected]
    
    data = []
    ml_class_map_by_id = {mlc.id: mlc for mlc in ml_classes_selected}

    for frame in frames:
        data_to_add = [frame.filename]

        # Add frame metadata
        for fs in frames_field:
            data_to_add.append(match_frame_header_and_attribut(fs, frame))

        predictions = []
        if len(ml_class_map_by_id) > 0:
            predictions = await get_pred_from_frame_and_class_ids(frame.id, list(ml_class_map_by_id), db)
        
        # Get predictions for each class in good order.
        predictions_to_add = {cls.name: None for cls in ml_classes_selected}
        pred_doi = ""
        for pred in predictions:
            pred_doi = pred.version_doi

            ml_class = ml_class_map_by_id.get(pred.ml_class_id, None)
            if ml_class == None: continue
            if ml_class.name not in predictions_to_add: continue

            predictions_to_add[ml_class.name] = pred.score if filter_type == "score" else int(pred.score >= ml_class.threshold)
        
        if len(ml_class_map_by_id) > 0:
            data_to_add.append(f"{'https://doi.org/10.5281/zenodo.' if pred_doi != '' else ''}{pred_doi}")

        data.append(
            data_to_add + 
            [s if s != None else -1.0 for s in predictions_to_add.values()]
        )
    
    df_data = pl.DataFrame(data, schema=df_header, schema_overrides=typed_frames_header(), orient="row")

    return df_data


def extract_polygons(geo_json: list) -> list[Polygon]:
    """ Extract all polygons from user input. """
    polygons = []
    if not geo_json: return polygons

    for feature in geo_json:        
        geometry = feature.get("geometry", {})
        coordinates = geometry.get("coordinates", [])
        points = [Point(lat, lon) for lat, lon in coordinates[0]] # Seems to have an extra array useless
        polygons.append(Polygon(points))

    return polygons


def typed_frames_header() -> dict:
    return {
        "GPSLatitude": pl.Float64,
        "GPSLongitude": pl.Float64,
        "version_doi": pl.String,
        "OriginalFileName": pl.String,
        "relative_file_path": pl.String,
        "GPSAltitude": pl.Float64,
        "GPSPitch": pl.Float64,
        "GPSRoll": pl.Float64,
        "GPSTrack": pl.Float64,
        "GPSDatetime": pl.Datetime,
        "GPSFix": pl.UInt8
    }