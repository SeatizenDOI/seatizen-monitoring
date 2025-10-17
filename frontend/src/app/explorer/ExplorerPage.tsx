"use client";

import { useState } from "react";
import ToggleButton from "@/components/Controls/ToggleButton";
import MapCompare from "@/components/Map/DynamicLeafletMapCompare";
import ResizablePanel from "@/components/ResizablePanel";
import ExplorerFilterPanel from "@/components/FilterPanel/ExplorerFilterPanel";
import { useExplorerFilters } from "@/context/ExplorerFilterContext";
import LegendPanel from "@/components/LegendPanel";

export default function ExplorerPage() {
    const [showASV, setShowASV] = useState(true);
    const [showMarkers, setShowMarkers] = useState(true);
    const [showComparison, setComparison] = useState(false);

    const { filters } = useExplorerFilters();

    return (
        <ResizablePanel
            left_content={
                <div className="flex flex-col">
                    <LegendPanel />
                    <ExplorerFilterPanel />
                    <ToggleButton
                        label="Underwater orthophoto"
                        label_description="Hide or show underwater orthophoto made by ASV."
                        defaultState={true}
                        onToggle={(state) => setShowASV(state)}
                        id="underwater-explorer"
                    />
                    <ToggleButton
                        label="GCRMN and eDNA markers."
                        id="marker-explorer"
                        defaultState={true}
                        onToggle={(state) => setShowMarkers(state)}
                    />
                    <ToggleButton
                        label="Precompute comparison zone"
                        id="comparison-graph"
                        defaultState={false}
                        onToggle={(state) => setComparison(state)}
                    />
                </div>
            }
            right_content={
                <MapCompare
                    leftUrls={filters.selected_left_layers}
                    rightUrls={filters.selected_right_layers}
                    withASV={showASV}
                    withMarker={showMarkers}
                    withComparisonMap={showComparison}
                    leftDeposits={[]}
                    rightDeposits={[]}
                />
            }
            right_title="Explore raster data from the Seatizen Atlas database."
        ></ResizablePanel>
    );
}
