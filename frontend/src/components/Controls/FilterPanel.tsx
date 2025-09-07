import PlatformSelector from "@/components/SelectorExport/DynamicPlatformSelector";
import TimelineSelector from "@/components/SelectorExport/TimelineSelector";
import ScorePredictionFilter from "../SelectorExport/ScorePredictionFilter";
import FrameFieldSelector from "../SelectorExport/DynamicFrameFieldSelector";
import ModelSelector from "@/components/SelectorExport/MlModelSelector";
import ClassSelector from "@/components/SelectorExport/DynamicMlClassSelector";
import { useFilters } from "@/context/FiltersContext";

export default function FilterPanel() {
    const { filters, setFilters } = useFilters();

    return (
        <div className="m-4 pb-52 flex flex-col justify-between">
            <ModelSelector onSelectModel={(id) => setFilters((f) => ({ ...f, selectedModelId: id }))} />
            <ClassSelector
                modelId={filters.selectedModelId}
                onSelectClasses={(ids) => setFilters((f) => ({ ...f, selectedClassId: ids }))}
            />
            <PlatformSelector
                value={filters.platform}
                onChange={(platform) => setFilters((f) => ({ ...f, platform }))}
            />
            <TimelineSelector
                startDate={filters.startDate}
                endDate={filters.endDate}
                onChange={(start, end) => setFilters((f) => ({ ...f, startDate: start, endDate: end }))}
            />
            <ScorePredictionFilter
                value={filters.filterType}
                onChange={(filterType) => setFilters((f) => ({ ...f, filterType }))}
            />
            <FrameFieldSelector
                value={filters.selectedField}
                onChange={(selectedField) => setFilters((f) => ({ ...f, selectedField }))}
            />
            <button
                onClick={() => {
                    console.log("Selected filter:", filters);
                }}
            >
                Apply Filters
            </button>
        </div>
    );
}
