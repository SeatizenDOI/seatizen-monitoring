import { useFilters } from "@/context/FiltersContext";
import PlatformSelector from "@/components/SelectorExport/DynamicPlatformSelector";
import TimelineSelector from "@/components/SelectorExport/TimelineSelector";
import ScorePredictionFilter from "../SelectorExport/ScorePredictionFilter";
import FrameFieldSelector from "../SelectorExport/DynamicFrameFieldSelector";
import ModelSelector from "@/components/SelectorExport/MlModelSelector";
import ClassSelector from "@/components/SelectorExport/DynamicMlClassSelector";

export default function FilterPanel() {
    const { filters, setFilters } = useFilters();

    return (
        <div className="m-4 pb-52 flex flex-col justify-between">
            <div className="flex flex-row w-full">
                <ModelSelector onSelectModel={(id) => setFilters((f) => ({ ...f, selectedModelId: id }))} />
                <ClassSelector
                    modelId={filters.selectedModelId}
                    onSelectClasses={(ids) => setFilters((f) => ({ ...f, selectedClassIds: ids }))}
                />
                <ScorePredictionFilter
                    value={filters.filterType}
                    onChange={(filterType) => setFilters((f) => ({ ...f, filterType }))}
                />
            </div>
            <div className="flex flex-row">
                <PlatformSelector
                    value={filters.platform}
                    onChange={(platform) => setFilters((f) => ({ ...f, platform }))}
                />
                <TimelineSelector
                    startDate={filters.startDate}
                    endDate={filters.endDate}
                    onChange={(start, end) => setFilters((f) => ({ ...f, startDate: start, endDate: end }))}
                />
                <FrameFieldSelector
                    value={filters.selectedFields}
                    onChange={(selectedFields) => setFilters((f) => ({ ...f, selectedFields }))}
                />
            </div>
        </div>
    );
}
