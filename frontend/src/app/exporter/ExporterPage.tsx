"use client";

import MapExport from "@/components/Map/DynamicLeafletMapExport";

import FilterPanel from "@/components/Controls/FilterPanel";
import { useEffect, useState } from "react";
import { URL_BACKEND_SERVER } from "@/lib/definition";
import { useFilters } from "@/context/FiltersContext";

export default function ExplorerPage() {
    const { filters } = useFilters();

    const [deposits, setDeposits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDeposits() {
            setLoading(true);
            setError(null);
            try {
                console.log(filters);
                const params = new URLSearchParams();

                if (filters.platform.length > 0) params.append("platforms", filters.platform.join(","));
                if (filters.startDate) params.append("start_date", filters.startDate);
                if (filters.endDate) params.append("end_date", filters.endDate);
                console.log(params);
                const res = await fetch(`${URL_BACKEND_SERVER}/api/v1/deposits/data?${params.toString()}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                console.log(data, filters);
                setDeposits(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchDeposits();
    }, [filters.platform, filters.startDate, filters.endDate]);

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
