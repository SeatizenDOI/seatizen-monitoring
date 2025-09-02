"use client";

import L, { LatLngTuple } from "leaflet";
import { useEffect, useRef } from "react";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "@/lib/definition";
import "leaflet-fullscreen";
import "leaflet-measure";

export interface LeafletExportProps {}

// Fix marker icons for Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/leaflet/marker-icon.png",
    iconUrl: "/leaflet/marker-icon.png",
    shadowUrl: "/leaflet/marker-shadow.png",
});

// This piece of code correct a bug with leaflet-measure where the map move on click. https://github.com/ljagis/leaflet-measure/issues/171
// @ts-ignore (no correct types)
L.Control.Measure.include({
    // set icon on the capture marker
    _setCaptureMarkerIcon: function () {
        // disable autopan
        this._captureMarker.options.autoPanOnFocus = false;

        // default function
        this._captureMarker.setIcon(
            L.divIcon({
                iconSize: this._map.getSize().multiplyBy(2),
            })
        );
    },
});

export default function LeafletMapExport({}: LeafletExportProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);

    // Get initial map view from URL or defaults
    const getInitialView = (): { lat: number; lng: number; zoom: number } => {
        const params = new URLSearchParams(window.location.search);
        const lat = parseFloat(params.get("lat") || `${DEFAULT_CENTER[0]}`);
        const lng = parseFloat(params.get("lng") || `${DEFAULT_CENTER[1]}`);
        const zoom = parseInt(params.get("zoom") || `${DEFAULT_ZOOM}`, 10);
        return { lat, lng, zoom };
    };

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return; // initialize only once

        const { lat, lng, zoom } = getInitialView();

        const map = L.map(mapContainerRef.current, {
            center: [lat, lng] as LatLngTuple,
            zoom,
            minZoom: 5,
            //@ts-ignore
            fullscreenControl: true,
        });

        const measure_control = L.control
            // @ts-ignore (no correct types)
            .measure({
                position: "topleft",
                primaryLengthUnit: "meters",
                secondaryLengthUnit: "kilometers",
                primaryAreaUnit: "hectares",
                secondaryAreaUnit: "sqmeters",
                localization: "fr",
            })
            .addTo(map);

        // Base layers
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 28,
        }).addTo(map);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/light_only_labels/{z}/{x}/{y}{r}.png", {
            attribution: "&copy; OpenStreetMap &copy; CARTO",
        }).addTo(map);

        // Update URL on map move
        map.on("moveend", () => {
            const center = map.getCenter();
            const zoom = map.getZoom();
            const newParams = new URLSearchParams(window.location.search);
            newParams.set("lat", center.lat.toFixed(5));
            newParams.set("lng", center.lng.toFixed(5));
            newParams.set("zoom", zoom.toString());
            window.history.replaceState({}, "", `?${newParams.toString()}`);
        });

        mapRef.current = map;
    }, []);

    return <div ref={mapContainerRef} style={{ height: "65vh", width: "100%" }} />;
}
