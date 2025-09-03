"use client";

import MapExport from "@/components/Map/DynamicLeafletMapExport";

import useDeposits from "@/hooks/useDeposits";
import FilterPanel from "@/components/Controls/FilterPanel";

export default function ExplorerPage() {
    const { deposits, loading, error } = useDeposits();

    if (loading) return <p>Loading deposits...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="flex flex-col-reverse">
            <FilterPanel />
            <div className="min-h-4/6 max-h-4/6 h-fit">
                <MapExport deposits={deposits} />
            </div>
        </div>
    );
}
