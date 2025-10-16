import { Deposit, depositPlatformColorMap } from "./definition";
import { GeoJSON } from "leaflet";

export function create_deposits_geojson(deposits: Deposit[], map: L.Map, pane?: string): GeoJSON | undefined {
    if (deposits.length === 0) return;

    const featureCollection = {
        type: "FeatureCollection",
        features: deposits.map((d) => ({
            type: "Feature",
            geometry: d.footprint,
            properties: {
                doi: d.doi,
                name: d.session_name,
                creation_date: d.session_date,
                platform: d.platform_type,
                area: d.area,
                perimeter: d.perimeter,
            },
        })),
    };

    //@ts-ignore
    const geoJsonLayer = L.geoJSON(featureCollection, {
        pane,
        style: (feature) => {
            const platform = (feature?.properties as any)?.platform || "default";
            return {
                color: depositPlatformColorMap[platform] || depositPlatformColorMap.default,
                weight: 2,
            };
        },
        onEachFeature: (feature, layer) => {
            const props = feature.properties as any;

            const text_length_or_surface = `Area: ${props.area}`;

            layer.bindPopup(`
                            <strong>${props.name}</strong><br/>
                            DOI:  <a href="https://doi.org/10.5281/zenodo.${props.doi}" target="_blank"> ${props.doi}</a><br/>
                            Acquisition date: ${props.creation_date} <br/>
                            Platform: ${props.platform} <br/>
                            ${text_length_or_surface}
                        `);

            // When popup opens → highlight
            layer.on("popupopen", () => {
                (layer as any).setStyle({
                    weight: 5,
                    color: "#FFFFFF", // optional: override for emphasis
                });
            });

            // When popup closes → reset style
            layer.on("popupclose", () => {
                geoJsonLayer.resetStyle(layer as any);
            });
        },
    }).addTo(map);

    return geoJsonLayer;
}
