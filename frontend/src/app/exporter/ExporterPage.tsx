"use client";

import MapExport from "@/components/Map/DynamicLeafletMapExport";

import FilterPanel from "@/components/Controls/FilterPanel";
import React, { useEffect, useState } from "react";
import { useFilters } from "@/context/FiltersContext";
import { formatDateTime } from "@/utils/dateUtils";

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
    const [loadingData, setLoadingData] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const onClickRequest = async () => {
        setLoadingData(true);
        setError(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND_SERVER}/api/v1/export`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filters, polygons }), // send your data
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            // Turn response into blob
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const formatted_date = formatDateTime(new Date());

            // Create <a> tag dynamically
            const a = document.createElement("a");
            a.href = url;
            a.download = `seatizen_monitoring_${formatted_date}.csv`;
            a.click();

            // Cleanup
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoadingData(false);
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
                onClick={!loadingData ? onClickRequest : undefined} // prevent clicking while loading
                className={`px-4 py-2 rounded-md text-white font-semibold cursor-pointer 
                ${loadingData ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
                {loadingData ? (
                    <div className="flex items-center justify-center space-x-2">
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        <span>Exporting...</span>
                    </div>
                ) : (
                    "Export your data"
                )}
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
