"use client";

import L, { LatLngTuple } from "leaflet";
import { useEffect, useRef } from "react";
import "@/lib/leaflet-splitmap";
import "leaflet-fullscreen";
import { COGServerResponse, URL_COG_SERVER, DEFAULT_CENTER, DEFAULT_ZOOM } from "@/lib/definition";
import { load_edna_data } from "@/lib/edna_functions";

export interface LeafletSplitMapProps {
    leftUrls: COGServerResponse[];
    rightUrls: COGServerResponse[];
    withASV: boolean;
}

// Fix marker icons if needed
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/leaflet/marker-icon.png",
    iconUrl: "/leaflet/marker-icon.png",
    shadowUrl: "/leaflet/marker-shadow.png",
});

export default function LeafletMapCompare({ leftUrls, rightUrls, withASV }: LeafletSplitMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const splitRef = useRef<any>(null);
    const layersRef = useRef<L.TileLayer[]>([]);
    const urlsRef = useRef({ left: leftUrls, right: rightUrls, with_asv: withASV });

    // Update this value to always get the new one.
    useEffect(() => {
        urlsRef.current = { left: leftUrls, right: rightUrls, with_asv: withASV };
    }, [leftUrls, rightUrls, withASV]);

    // Retrieve the parameters from the URL.
    const getInitialView = (): { lat: number; lng: number; zoom: number } => {
        const params = new URLSearchParams(window.location.search);
        const lat = parseFloat(params.get("lat") || `${DEFAULT_CENTER[0]}`);
        const lng = parseFloat(params.get("lng") || `${DEFAULT_CENTER[1]}`);
        const z = parseInt(params.get("zoom") || `${DEFAULT_ZOOM}`, 10);
        return { lat, lng, zoom: z };
    };

    useEffect(() => {
        if (!mapRef.current) return;

        const { lat, lng, zoom } = getInitialView();

        // Initialize map only once
        const map = L.map(mapRef.current, {
            center: [lat, lng] as LatLngTuple,
            zoom: zoom,
            minZoom: 5,
            //@ts-ignore
            fullscreenControl: true,
        });

        // Setup the map backgound.
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 28,
        }).addTo(map);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/light_only_labels/{z}/{x}/{y}{r}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }).addTo(map);

        // Update URL params at the end of draging the map.
        const onMoveEnd = () => {
            const center = map.getCenter();
            const zoom = map.getZoom();
            const newParams = new URLSearchParams(window.location.search);
            newParams.set("lat", center.lat.toFixed(5));
            newParams.set("lng", center.lng.toFixed(5));
            newParams.set("zoom", zoom.toString());
            window.history.replaceState({}, "", `?${newParams.toString()}`);
        };

        // On map click, get the depth or the predictions value.
        const onClick = async (event: any) => {
            const separator = Number(splitRef.current._divider.style.left.replace("px", ""));
            if (Math.abs(event.containerPoint.x - separator) <= 1) return; // Click trigger by sliding the split object.
            let request_years = "";

            const layers_on_choosen_side =
                event.containerPoint.x < separator ? urlsRef.current.left : urlsRef.current.right;
            layers_on_choosen_side.forEach((layer) => {
                request_years = "&layers_id=" + layer.id + request_years;
            });

            if (request_years === "") return;

            const { lat, lng } = event.latlng;

            const response = await fetch(`${URL_COG_SERVER}/depthOrprediction?lon=${lng}&lat=${lat}${request_years}`);
            const data = await response.json();

            if (data.value === null) return;

            L.popup()
                .setLatLng([lat, lng, lat])
                .setContent(
                    data.type === "bathy" ? `Depth: ${data.value.toFixed(2)} m` : `Habitat Class: ${data.value}`
                )
                .openOn(map);
        };

        // Setup listener.
        map.on("click", onClick);
        map.on("moveend", onMoveEnd);

        // Keep ref to map.
        mapRef.current = map as any;

        // Load the eDNA data from a json file.
        load_edna_data(map);

        return () => {
            map.off("click", onClick);
            map.off("moveend", onMoveEnd);

            map.remove();
        };
    }, []);

    // Update the map when we have new layers to show.
    useEffect(() => {
        if (!mapRef.current) return;
        const map = mapRef.current as unknown as L.Map;

        // Remove the splitpane to redraw it later.
        if (splitRef.current) {
            try {
                splitRef.current.remove();
            } catch (e) {
                console.warn("Failed to remove split instance:", e);
            }
        }

        // Remove all the layers to reprint it.
        layersRef.current.forEach((layer) => map.removeLayer(layer));
        layersRef.current = [];

        // Append the left layers.
        const left_layers = [];
        for (const layer of leftUrls) {
            const tile = L.tileLayer(`${URL_COG_SERVER}${layer.url}?asv=${withASV}`, {
                attribution: layer.attribution,
                maxZoom: 28,
            }).addTo(map);
            left_layers.push(tile);
            layersRef.current.push(tile);
        }

        // Append the right layers.
        const right_layers = [];
        for (const layer of rightUrls) {
            const tile2 = L.tileLayer(`${URL_COG_SERVER}${layer.url}?asv=${withASV}`, {
                attribution: layer.attribution,
                maxZoom: 28,
            }).addTo(map);
            right_layers.push(tile2);
            layersRef.current.push(tile2);
        }

        // Redraw the central splitpane.
        splitRef.current = L.control
            //@ts-ignore
            .splitMap(left_layers, right_layers)
            .addTo(map);
    }, [leftUrls, rightUrls, withASV]);

    return <div ref={mapRef} style={{ height: "65vh", width: "100%" }}></div>;
}
