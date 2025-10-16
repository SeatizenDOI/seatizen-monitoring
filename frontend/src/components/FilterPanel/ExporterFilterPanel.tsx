"use client";

import { useState } from "react";
import { useFilters } from "@/context/FiltersContext";
import PlatformSelector from "@/components/SelectorExport/PlatformSelector";
import TimelineSelector from "@/components/SelectorExport/TimelineSelector";
import ScorePredictionFilter from "../SelectorExport/ScorePredictionFilter";
import FrameFieldSelector from "../SelectorExport/FrameFieldSelector";
import ModelSelector from "@/components/SelectorExport/MlModelSelector";
import ClassSelector from "@/components/SelectorExport/MlClassSelector";
import { Database, Layers, ChevronDown, ChevronRight } from "lucide-react";

export default function ExporterFilterPanel() {
    const { filters, setFilters } = useFilters();

    // State to toggle visibility
    const [showModelConfig, setShowModelConfig] = useState(false); // If set to false and the user export, modelID and Class will not be defined.
    const [showDataConfig, setShowDataConfig] = useState(true);

    return (
        <div className="flex flex-col">
            {/* --- MODEL CONFIGURATION --- */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-4" id="model-config">
                {/* Header */}
                <button
                    onClick={() => setShowModelConfig((prev) => !prev)}
                    className="flex items-center justify-between w-full p-2 md:p-6"
                >
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-ocean-50 rounded-lg">
                            <Layers className="w-3 h-3 md:w-5 md:h-5 text-ocean-700" />
                        </div>
                        <h3 className="text-sm md:text-lg font-semibold text-slate-900">Model Configuration</h3>
                    </div>
                    {showModelConfig ? (
                        <ChevronDown className="w-5 h-5 text-slate-600" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                    )}
                </button>

                {/* Content */}
                {showModelConfig && (
                    <div className="flex flex-col items-center justify-between px-6 pb-6">
                        <ModelSelector onSelectModel={(id) => setFilters((f) => ({ ...f, selectedModelId: id }))} />
                        <ClassSelector
                            modelId={filters.selectedModelId}
                            selected_class_ids={filters.selectedClassIds}
                            onSelectClasses={(ids) => setFilters((f) => ({ ...f, selectedClassIds: ids }))}
                        />
                        <ScorePredictionFilter
                            value={filters.filterType}
                            onChange={(filterType) => setFilters((f) => ({ ...f, filterType }))}
                        />
                    </div>
                )}
            </div>

            {/* --- DATA CONFIGURATION --- */}
            <div className="bg-white rounded-xl w-full shadow-sm border border-slate-200" id="data-config">
                {/* Header */}
                <button
                    onClick={() => setShowDataConfig((prev) => !prev)}
                    className="flex items-center justify-between w-full p-2 md:p-6"
                >
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-ocean-50 rounded-lg">
                            <Database className="w-3 h-3 md:w-5 md:h-5 text-ocean-700" />
                        </div>
                        <h3 className="text-sm md:text-lg font-semibold text-slate-900">Data Configuration</h3>
                    </div>
                    {showDataConfig ? (
                        <ChevronDown className="w-5 h-5 text-slate-600" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                    )}
                </button>

                {/* Content */}
                {showDataConfig && (
                    <div className="flex flex-col  items-center justify-between px-6 pb-6">
                        <PlatformSelector
                            values={filters.platform}
                            setSelectedValues={(platform) => setFilters((f) => ({ ...f, platform }))}
                        />
                        <TimelineSelector
                            startDate={filters.startDate}
                            endDate={filters.endDate}
                            onChange={(start, end) => setFilters((f) => ({ ...f, startDate: start, endDate: end }))}
                        />
                        <FrameFieldSelector
                            values={filters.selectedFields}
                            setSelectedValues={(selectedFields) => setFilters((f) => ({ ...f, selectedFields }))}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
