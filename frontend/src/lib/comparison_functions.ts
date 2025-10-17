import { ComparisonItem } from "./definition";
import L from "leaflet";
export async function load_comparison_zones(map: L.Map) {
    const comparison_layers: L.GeoJSON[] = [];
    try {
        const response = await fetch("/comparison_data.json");
        if (!response.ok) {
            throw new Error("Comparison Data not found");
        }

        const comparison_data: ComparisonItem[] = await response.json();

        for (const item of comparison_data) {
            try {
                // Load each GeoJSON footprint
                const geojsonResp = await fetch(item.zone);
                if (!geojsonResp.ok) {
                    throw new Error(`GeoJSON not found for ${item.zone}`);
                }

                const geojson = await geojsonResp.json();

                // Create an image popup

                const popup = new L.Popup({
                    className: "comparison-popup",
                    content: `
                    <div class="popup-group">
                    <img src="${item.figure}" alt="Comparison Figure" >
                    </div>
                    `,
                    closeOnClick: true,
                    autoClose: true,
                    closeButton: true,
                });

                // Create a Leaflet GeoJSON layer
                const geojson_layer = L.geoJSON(geojson, {
                    style: {
                        color: "#0077ff",
                        weight: 2,
                        fillColor: "#0077ff",
                        fillOpacity: 0.2,
                    },
                })
                    .addTo(map)
                    .bindPopup(popup);

                geojson_layer.on("popupopen", () => {
                    const popupLatLng = geojson_layer.getPopup()?.getLatLng();
                    if (!popupLatLng) {
                        return;
                    }

                    // Project the popup's lat/lng to pixel coordinates
                    const point = map.project(popupLatLng, map.getZoom());

                    // Offset upward by N pixels (e.g., 150px)
                    point.y -= 250;

                    // Convert back to lat/lng
                    const newLatLng = map.unproject(point, map.getZoom());

                    // Smooth pan to adjusted center
                    map.panTo(newLatLng, {
                        animate: true,
                        duration: 0.5,
                    });
                });

                comparison_layers.push(geojson_layer);
            } catch (geoErr) {
                console.error(`Error loading zone ${item.zone}:`, geoErr);
            }
        }
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }

    return comparison_layers;
}
