"use client";

import L, { LatLngTuple, GeoJSON as LeafletGeoJSON } from "leaflet";
import { useEffect, useRef } from "react";
import { Deposit, depositPlatformColorMap } from "@/lib/definition";
import "leaflet-fullscreen";
import "leaflet-measure";
import "leaflet-draw";
import { bindMapMoveToUrl, getInitialView } from "@/utils/mapUtils";

export interface LeafletExportProps {
    deposits: Deposit[];
    polygons: any[];
    onPolygonAdd: (polygon: any) => void;
    onPolygonDelete: () => void;
}

// Fix marker icons for Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/leaflet/marker_empty.svg",
    iconUrl: "/leaflet/marker_empty.svg",
    shadowUrl: "/leaflet/marker-shadow.png",
});

// Fix leaflet-measure capture marker bug
// @ts-ignore
L.Control.Measure.include({
    _setCaptureMarkerIcon: function () {
        this._captureMarker.options.autoPanOnFocus = false;
        this._captureMarker.setIcon(
            L.divIcon({
                iconSize: this._map.getSize().multiplyBy(2),
            })
        );
    },
});

export default function LeafletMapExport({ deposits, polygons, onPolygonAdd, onPolygonDelete }: LeafletExportProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);
    const geoJsonLayerRef = useRef<LeafletGeoJSON | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        const { lat, lng, zoom } = getInitialView();

        const map = L.map(mapContainerRef.current, {
            center: [lat, lng] as LatLngTuple,
            zoom,
            minZoom: 5,
            //@ts-ignore
            fullscreenControl: true,
        });

        // Base layers
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
            attribution: "&copy; Tiles © Esri",
            maxZoom: 28,
        }).addTo(map);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/light_only_labels/{z}/{x}/{y}{r}.png", {
            attribution: "&copy; OpenStreetMap &copy; CARTO",
        }).addTo(map);

        // Measure control
        L.control
            // @ts-ignore
            .measure({
                position: "topleft",
                primaryLengthUnit: "meters",
                secondaryLengthUnit: "kilometers",
                primaryAreaUnit: "hectares",
                secondaryAreaUnit: "sqmeters",
                localization: "fr",
            })
            .addTo(map);

        // Draw control
        const drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        // @ts-ignore
        const drawControl = new L.Control.Draw({
            position: "bottomleft",
            edit: { featureGroup: drawnItems, edit: false },
            draw: {
                polygon: true,
                polyline: false,
                rectangle: false,
                circle: false,
                marker: false,
                circlemarker: false,
            },
        });
        map.addControl(drawControl);

        // Draw initial polygons if they exist.
        for (const pol of polygons) {
            const layer = L.geoJSON(pol);
            drawnItems.addLayer(layer);
        }

        // Listen to draw events
        // @ts-ignore
        map.on(L.Draw.Event.CREATED, (event: any) => {
            const layer = event.layer;
            drawnItems.addLayer(layer);
            onPolygonAdd(layer.toGeoJSON());
        });

        // @ts-ignore
        map.on(L.Draw.Event.DELETED, onPolygonDelete);

        const cleanupMoveHandler = bindMapMoveToUrl(map);
        mapRef.current = map;

        return () => {
            cleanupMoveHandler();
            map.remove();
            mapRef.current = null;
        };
    }, []);

    // Load deposits.
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        // Remove previous GeoJSON
        if (geoJsonLayerRef.current) {
            geoJsonLayerRef.current.remove();
            geoJsonLayerRef.current = null;
        }

        if (deposits.length === 0) return;

        // Combine deposits as a FeatureCollection
        const featureCollection = {
            type: "FeatureCollection",
            features: deposits.map((d) => ({
                type: "Feature",
                geometry: d.footprint ?? d.deposit_linestring.footprint_linestring,
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
            style: (feature) => {
                const platform = (feature?.properties as any)?.platform || "default";
                return {
                    color: depositPlatformColorMap[platform] || depositPlatformColorMap.default,
                    weight: 2,
                };
            },
            onEachFeature: (feature, layer) => {
                const props = feature.properties as any;

                const text_length_or_surface = props.perimeter ? `Length: ${props.perimeter}` : `Area: ${props.area}`;

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

        geoJsonLayerRef.current = geoJsonLayer;

        // Fit map bounds to deposits
        // const bounds = geoJsonLayer.getBounds();
        // if (bounds.isValid()) map.fitBounds(bounds);
    }, [deposits]);

    return <div ref={mapContainerRef} id="map-exporter" style={{ height: "85vh", width: "100%", zIndex: 1 }} />;
}
