import { useState } from "react";
import PlatformSelector from "@/components/SelectorExport/DynamicPlatformSelector";
import TimelineSelector from "@/components/SelectorExport/TimelineSelector";
import ScorePredictionFilter from "../SelectorExport/ScorePredictionFilter";
import FrameFieldSelector from "../SelectorExport/DynamicFrameFieldSelector";
import ModelSelector from "@/components/SelectorExport/MlModelSelector";
import ClassSelector from "@/components/SelectorExport/DynamicMlClassSelector";

export default function FilterPanel() {
    const [platform, setPlatform] = useState<string[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedField, setSelectedField] = useState<string[]>([]);
    const [filterType, setFilterType] = useState<"score" | "prediction">("score");
    const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
    const [selectedClassId, setSelectedClassId] = useState<number[]>([0]);

    return (
        <div className="m-4 pb-52 flex flex-col justify-between">
            <ModelSelector onSelectModel={setSelectedModelId} />
            <ClassSelector modelId={selectedModelId} onSelectClasses={setSelectedClassId} />
            <PlatformSelector value={platform} onChange={setPlatform} />
            <TimelineSelector
                startDate={startDate}
                endDate={endDate}
                onChange={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                }}
            />
            <ScorePredictionFilter value={filterType} onChange={setFilterType} />
            <FrameFieldSelector value={selectedField} onChange={setSelectedField} />
            <button
                onClick={() => {
                    console.log("Selected filter:", {
                        platform,
                        startDate,
                        endDate,
                        filterType,
                        selectedField,
                        selectedClassId,
                        selectedModelId,
                    });
                }}
            >
                Apply Filters
            </button>
        </div>
    );
}
