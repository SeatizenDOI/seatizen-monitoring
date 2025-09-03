"use client";

import MapExport from "@/components/Map/DynamicLeafletMapExport";
import ModelSelector from "@/components/SelectorExport/MlModelSelector";
import ClassSelector from "@/components/SelectorExport/DynamicMlClassSelector";
import { useState } from "react";
import useDeposits from "@/hooks/useDeposits";

export default function ExplorerPage() {
    const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
    const [selectedClassId, setSelectedClassId] = useState<number[]>([]);

    const { deposits, loading, error } = useDeposits();

    if (loading) return <p>Loading deposits...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="flex flex-col-reverse">
            <ClassSelector modelId={selectedModelId} onSelectClasses={setSelectedClassId} />
            <ModelSelector onSelectModel={setSelectedModelId} />
            <div className="min-h-4/6 max-h-4/6 h-fit">
                <MapExport deposits={deposits} />
            </div>
        </div>
    );
}
