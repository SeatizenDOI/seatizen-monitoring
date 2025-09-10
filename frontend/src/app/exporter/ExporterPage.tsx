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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const onClickRequest = async () => {
        // setLoading(true);
        // setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND_SERVER}/api/v1/export`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filters, polygons }), // send your data
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            // Disable loading before downloading the file.
            // setLoading(false);

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
            // setError((err as Error).message);
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        console.log("JE charge les deposits eheh");
        async function fetchDeposits() {
            setLoading(true);
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
                setLoading(false);
            }
        }

        fetchDeposits();
    }, [filters.platform, filters.startDate, filters.endDate]);

    if (loading) return <p>Loading deposits...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    console.log("Jaifini ehehe");
    return (
        <div className="flex flex-col-reverse">
            <FilterPanel handleClick={onClickRequest} />
            <div className="min-h-4/6 max-h-4/6 h-fit">
                <MapExport deposits={deposits} onPolygonAdd={handlePolygonAdd} onPolygonDelete={handlePolygonDelete} />
            </div>
        </div>
    );
}
