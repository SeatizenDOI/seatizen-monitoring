"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ToggleButton from "@/components/Controls/ToggleButton";
import MapCompare from "@/components/Map/DynamicLeafletMapCompare";
import { COGServerResponse } from "@/lib/definition";
import ASVExplorerFilterPanel from "@/components/Controls/ASVExplorerFilterPanel";
import { useASVExplorerFilters } from "@/context/ASVExplorerFilterContext";

export default function ASVExplorerPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { filters, setFilters } = useASVExplorerFilters();
    const [layersMap, setLayersMap] = useState<Map<string, COGServerResponse>>(new Map());

    const [selectedLayersLeft, setSelectedLayersLeft] = useState<COGServerResponse[]>([]);
    const [selectedLayersRight, setSelectedLayersRight] = useState<COGServerResponse[]>([]);

    const [loading, setLoading] = useState(true);
    const [showMarkers, setShowMarkers] = useState(true);

    useEffect(() => {
        async function fetchLayers() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL_COG_SERVER}/layers`);
                if (!res.ok) throw new Error("Failed to fetch layers");
                const layers: COGServerResponse[] = await res.json();
                // Convert to Map for fast access
                const map = new Map<string, COGServerResponse>();
                layers.forEach((layer) => {
                    map.set(layer.id, layer);
                });

                setLayersMap(map);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchLayers();
    }, []);

    // Retrieve all the layers from the cog server.
    useEffect(() => {
        async function fetchFilters() {
            try {
                console.log(filters.left_specie, filters.right_specie, filters.left_year, filters.right_year);

                if (filters.left_specie !== "") {
                    const params = new URLSearchParams();

                    params.append("year", filters.left_year);
                    params.append("specie", filters.left_specie);

                    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_COG_SERVER}/get-layer?${params.toString()}`);
                    if (!res.ok) throw new Error(`HTTP ${res.status}, Cannot retrieve information for left layer`);
                    const layer: COGServerResponse = await res.json();

                    const background_map = layersMap.get(`ortho_${filters.left_year}`);

                    if (background_map !== undefined) {
                        setSelectedLayersLeft([background_map, layer]);
                    } else {
                        setSelectedLayersLeft([layer]);
                    }
                }

                if (filters.right_specie !== "") {
                    const params = new URLSearchParams();

                    params.append("year", filters.right_year);
                    params.append("specie", filters.right_specie);

                    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_COG_SERVER}/get-layer?${params.toString()}`);
                    if (!res.ok) throw new Error(`HTTP ${res.status}, Cannot retrieve information for right layer`);
                    const layer: COGServerResponse = await res.json();

                    const background_map = layersMap.get(`ortho_${filters.right_year}`);

                    if (background_map !== undefined) {
                        setSelectedLayersRight([background_map, layer]);
                    } else {
                        setSelectedLayersRight([layer]);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchFilters();
    }, [filters.left_specie, filters.right_specie, filters.left_year, filters.right_year]);

    // Update the url based on the selected layers for each side.
    useEffect(() => {
        updateURL(selectedLayersLeft, selectedLayersRight);
    }, [selectedLayersLeft, selectedLayersRight]);

    const updateURL = (left: COGServerResponse[], right: COGServerResponse[]) => {
        const params = new URLSearchParams(searchParams.toString());
        if (left.length !== 0) params.set("left", left.map((l) => l.id).join(","));
        else params.delete("left");

        if (right.length !== 0) params.set("right", right.map((l) => l.id).join(","));
        else params.delete("right");

        router.push(`?${params.toString()}`, { scroll: false });
    };


    if (loading) return <p>Loading layers...</p>;

    // The div is in reverse because the LayerDropDown need to be init before the map.
    return (
        <div className="flex flex-col-reverse">
            <div className="flex justify-center my-4">
                <ToggleButton label="With Marker" defaultState={true} onToggle={(state) => setShowMarkers(state)} />
            </div>

            <div className="flex flex-row justify-around">
                <ASVExplorerFilterPanel />
            </div>
            <div className="min-h-4/6 max-h-4/6 h-fit">
                <MapCompare
                    leftUrls={selectedLayersLeft}
                    rightUrls={selectedLayersRight}
                    withASV={false}
                    withMarker={showMarkers}
                />
            </div>
        </div>
    );
}
