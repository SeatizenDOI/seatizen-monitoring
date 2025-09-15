"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ShareButton from "@/components/Controls/ShareButton";
import ToggleButton from "@/components/Controls/ToggleButton";
import MapCompare from "@/components/Map/DynamicLeafletMapCompare";
import LayerDropDown from "@/components/Controls/DynamicLayerDropDown";
import { COGServerResponse } from "@/lib/definition";
import PresetButton from "@/components/Controls/PresetButton";

export default function ExplorerPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedLayersLeft, setSelectedLayersLeft] = useState<COGServerResponse[]>([]);
    const [selectedLayersRight, setSelectedLayersRight] = useState<COGServerResponse[]>([]);
    const [layers, setLayers] = useState<COGServerResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [showASV, setShowASV] = useState(true);
    const [showMarkers, setShowMarkers] = useState(true);

    // Retrieve all the layers from the cog server.
    useEffect(() => {
        async function fetchLayers() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL_COG_SERVER}/layers`);
                if (!res.ok) throw new Error("Failed to fetch layers");
                const layers: COGServerResponse[] = await res.json();
                setLayers(layers);

                const leftIds = searchParams.get("left")?.split(",") || [];
                const rightIds = searchParams.get("right")?.split(",") || [];
                // Filter and sort to keep the url order.
                setSelectedLayersLeft(
                    layers
                        .filter((l) => leftIds.includes(l.id))
                        .sort((a, b) => leftIds.indexOf(a.id) - leftIds.indexOf(b.id))
                );
                setSelectedLayersRight(
                    layers
                        .filter((l) => rightIds.includes(l.id))
                        .sort((a, b) => rightIds.indexOf(a.id) - rightIds.indexOf(b.id))
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchLayers();
    }, []);

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

    // Set the new layers after the dropdown is set.
    const handleLeftChange = (values: COGServerResponse[]) => {
        setSelectedLayersLeft(values);
    };

    const handleRightChange = (values: COGServerResponse[]) => {
        setSelectedLayersRight(values);
    };

    if (loading) return <p>Loading layers...</p>;
    if (!layers.length) return <p>No layers available</p>;

    // The div is in reverse because the LayerDropDown need to be init before the map.
    return (
        <div className="flex flex-col-reverse">
            <div className="flex justify-around">
                <PresetButton
                    buttonName="Bathy 2023/2025 comparison"
                    urlString="/explorer?lat=-21.17536&lng=55.29213&zoom=16&left=ortho_2023%2Cbathy_2023&right=ortho_2025%2Cbathy_2025"
                />
                <PresetButton
                    buttonName="Habitat map 2023"
                    urlString="/explorer?lat=-21.17536&lng=55.29213&zoom=16&left=ortho_2023%2Cpred_drone_2023&right=ortho_2023"
                />
                <PresetButton
                    buttonName="IGN 2022 vs Drone Orthophoto 2023"
                    urlString="/explorer?lat=-21.17536&lng=55.29213&zoom=16&right=ortho_2023&left=ign_2022"
                />
            </div>
            <div className="flex justify-end p-4">
                <ShareButton />
            </div>
            <div className="flex justify-center my-4">
                <ToggleButton
                    label="With Underwater orthophoto"
                    defaultState={true}
                    onToggle={(state) => setShowASV(state)}
                />
                <ToggleButton label="With Marker" defaultState={true} onToggle={(state) => setShowMarkers(state)} />
            </div>

            <div className="flex flex-row justify-around">
                <LayerDropDown opt_layers={layers} onChange={handleLeftChange} selected_layers={selectedLayersLeft} />

                <LayerDropDown opt_layers={layers} onChange={handleRightChange} selected_layers={selectedLayersRight} />
            </div>
            <div className="min-h-4/6 max-h-4/6 h-fit">
                <MapCompare
                    leftUrls={selectedLayersLeft}
                    rightUrls={selectedLayersRight}
                    withASV={showASV}
                    withMarker={showMarkers}
                />
            </div>
        </div>
    );
}
