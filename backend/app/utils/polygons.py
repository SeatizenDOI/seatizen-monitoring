from shapely import Polygon, Point

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