"use client";

import MapExport from "@/components/Map/DynamicLeafletMapExport";

import FilterPanel from "@/components/Controls/FilterPanel";
import React, { useEffect, useState } from "react";
import { useFilters } from "@/context/FiltersContext";

export default function ExplorerPage() {
    const { filters } = useFilters();
    const [polygons, setPolygons] = useState<any[]>([]);

    const handlePolygonAdd = (polygon: any) => {
        setPolygons((prev) => [...prev, polygon]); // keep all polygons
    };

    const handlePolygonDelete = () => {
        setPolygons([]);
    };

    const [deposits, setDeposits] = useState<any[]>([]);
    const [loadingDeposits, setLoadingDeposits] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const onClickRequest = async () => {
        setError(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND_SERVER}/api/v1/export/save-job`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filters, polygons }), // send your data
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const { job_id } = await res.json();

            window.open(`${process.env.NEXT_PUBLIC_URL_BACKEND_SERVER}/api/v1/export/download-csv?job_id=${job_id}`);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    useEffect(() => {
        async function fetchDeposits() {
            setLoadingDeposits(true);
            setError(null);
            try {
                const params = new URLSearchParams();

                if (filters.platform.length > 0) params.append("platforms", filters.platform.join(","));
                if (filters.startDate) params.append("start_date", filters.startDate);
                if (filters.endDate) params.append("end_date", filters.endDate);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_BACKEND_SERVER}/api/v1/deposits/filter?${params.toString()}`
                );
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();

                setDeposits(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoadingDeposits(false);
            }
        }

        fetchDeposits();
    }, [filters.platform, filters.startDate, filters.endDate]);

    if (loadingDeposits) return <p>Loading deposits...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="flex flex-col-reverse">
            <div
                onClick={onClickRequest} // prevent clicking while loading
                className={`px-4 py-2 rounded-md text-white font-semibold cursor-pointer text-center
                bg-blue-600 hover:bg-blue-700`}
            >
                Export your data
            </div>
            <FilterPanel />
            <div className="min-h-4/6 max-h-4/6 h-fit">
                <MapExport
                    deposits={deposits}
                    polygons={polygons}
                    onPolygonAdd={handlePolygonAdd}
                    onPolygonDelete={handlePolygonDelete}
                />
            </div>
        </div>
    );
}
