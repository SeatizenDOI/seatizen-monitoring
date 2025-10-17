"use client";

import { useState } from "react";
import ToggleButton from "@/components/Controls/ToggleButton";
import MapCompare from "@/components/Map/DynamicLeafletMapCompare";
import ResizablePanel from "@/components/ResizablePanel";
import ExplorerFilterPanel from "@/components/FilterPanel/ExplorerFilterPanel";
import { useExplorerFilters } from "@/context/ExplorerFilterContext";
import LegendPanel from "@/components/LegendPanel";
import AccordionComponent from "@/components/Accordion";
import PresetButton from "@/components/Controls/PresetButton";
import { Compass, Palette, Save } from "lucide-react";

export default function ExplorerPage() {
    const [showASV, setShowASV] = useState(true);
    const [showMarkers, setShowMarkers] = useState(true);
    const [showComparison, setComparison] = useState(false);

    const { filters } = useExplorerFilters();

    return (
        <ResizablePanel
            left_content={
                <div className="flex flex-col h-full">
                    <ExplorerFilterPanel />
                    <AccordionComponent icon={Palette} title="Legend" content={<LegendPanel />} />
                    <AccordionComponent
                        icon={Compass}
                        title="Map Options"
                        content={
                            <div>
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
                    />
                    <AccordionComponent
                        icon={Save}
                        title="Saved Configurations"
                        content={
                            <div id="preset-container" className="p-4 space-y-3">
                                <PresetButton
                                    buttonName="Bathy 2023/2025 comparison"
                                    urlString="/explorer?lat=-21.17536&lng=55.29213&zoom=16&left=ortho_2023%2Cbathy_2023&right=ortho_2025%2Cbathy_2025"
                                />
                                <PresetButton
                                    buttonName="Habitat map / Orthophoto 2023"
                                    urlString="/explorer?lat=-21.17536&lng=55.29213&zoom=16&left=ortho_2023%2Cpred_drone_2023&right=ortho_2023"
                                />
                                <PresetButton
                                    buttonName="IGN 2022 vs Drone Orthophoto 2023"
                                    urlString="/explorer?lat=-21.17536&lng=55.29213&zoom=16&right=ortho_2023&left=ign_2022"
                                />
                            </div>
                        }
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
