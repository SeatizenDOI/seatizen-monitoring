"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ShareButton from "@/components/Controls/ShareButton";
import ToggleButton from "@/components/Controls/ToggleButtons";
import MapCompare from "@/components/Map/DynamicLeafletMapCompare";
import LayerDropDown from "@/components/Controls/DynamicLayerDropDown";
import { COGServerResponse, URL_COG_SERVER } from "@/lib/definition";

export default function ExplorerPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedLayersLeft, setSelectedLayersLeft] = useState<COGServerResponse[]>([]);
    const [selectedLayersRight, setSelectedLayersRight] = useState<COGServerResponse[]>([]);
    const [layers, setLayers] = useState<COGServerResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [showExtraControls, setShowExtraControls] = useState(true);

    // Retrieve all the layers from the cog server.
    useEffect(() => {
        async function fetchLayers() {
            try {
                const res = await fetch(`${URL_COG_SERVER}/layers`);
                if (!res.ok) throw new Error("Failed to fetch layers");
                const layers: COGServerResponse[] = await res.json();
                setLayers(layers);

                const leftIds = searchParams.get("left")?.split(",") || [];
                const rightIds = searchParams.get("right")?.split(",") || [];
                setSelectedLayersLeft(layers.filter((l) => leftIds.includes(l.id)));
                setSelectedLayersRight(layers.filter((l) => rightIds.includes(l.id)));
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
            <div className="flex justify-end p-4">
                <ShareButton />
            </div>
            <div className="flex justify-center my-4">
                <ToggleButton
                    label="With Underwater orthophoto"
                    defaultState={true}
                    onToggle={(state) => setShowExtraControls(state)}
                />
            </div>

            <div className="flex flex-row justify-around">
                <LayerDropDown opt_layers={layers} onChange={handleLeftChange} selected_layers={selectedLayersLeft} />

                <LayerDropDown opt_layers={layers} onChange={handleRightChange} selected_layers={selectedLayersRight} />
            </div>
            <div className="border-2 min-h-4/6 max-h-4/6 h-fit">
                <MapCompare leftUrls={selectedLayersLeft} rightUrls={selectedLayersRight} withASV={showExtraControls} />
            </div>
        </div>
    );
}
