"use client";

import MapExport from "@/components/Map/DynamicLeafletMapExport";
import FilterPanel from "@/components/Controls/FilterPanel";
import { TOKEN_PAGE_EXPORTER } from "@/lib/definition";
import { useFilters } from "@/context/FiltersContext";
import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export default function ExporterPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [leftWidth, setLeftWidth] = useState(600); // default width in px
    const [isDragging, setIsDragging] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 }); // Tailwind "md"

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

    const onClickToLoadTutorial = () => {
        localStorage.removeItem(TOKEN_PAGE_EXPORTER);
        window.location.reload();
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

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (!isDragging || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const clientX = e.clientX;

            // Clamp width to avoid collapsing panels completely
            const newWidth = Math.max(350, Math.min(clientX - containerRect.left, containerRect.width - 350));
            setLeftWidth(newWidth);
        };

        const handlePointerUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener("pointermove", handlePointerMove);
            window.addEventListener("pointerup", handlePointerUp);
        }

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [isDragging]);

    if (loadingDeposits) return <p>Loading deposits...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    if (isMobile) {
        // 📱 Mobile layout: no draggable split pane
        return (
            <div className="flex flex-col-reverse m-8">
                <div className="bg-background overflow-y-auto mt-8">
                    <div className="flex flex-row justify-around mb-8">
                        <button
                            onClick={onClickToLoadTutorial}
                            className="p-2 rounded-md text-white text-xs font-semibold bg-blue-600 hover:bg-blue-700"
                        >
                            Show tutorial
                        </button>
                        <button
                            onClick={onClickRequest}
                            className="p-2 rounded-md text-white text-xs font-semibold bg-blue-600 hover:bg-blue-700"
                            id="exporter-button"
                        >
                            Export your data
                        </button>
                    </div>
                    <FilterPanel />
                </div>
                <div className="flex-1">
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

    return (
        <div ref={containerRef} className="flex w-full h-[calc(100vh-4rem)]">
            {/* Left Panel */}
            <div className="bg-background p-4 mb-4 overflow-y-auto flex-shrink-0" style={{ width: leftWidth }}>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-around">
                        <div
                            onClick={onClickToLoadTutorial}
                            className="px-4 py-2 rounded-md text-white font-semibold cursor-pointer text-center
                        bg-blue-600 hover:bg-blue-700 mb-4 max-w-1/2 self-center"
                        >
                            Show tutorial
                        </div>

                        <div
                            onClick={onClickRequest}
                            className="px-4 py-2 rounded-md text-white font-semibold cursor-pointer text-center
                        bg-blue-600 hover:bg-blue-700 mb-4 max-w-1/2 self-center"
                            id="exporter-button"
                        >
                            Export your data
                        </div>
                    </div>
                    <FilterPanel />
                </div>
            </div>

            {/* Divider / Drag Handle */}
            <div
                id="drag"
                className={`w-2 cursor-col-resize bg-gray-300 hover:bg-gray-400 transition ${
                    isDragging ? "bg-gray-500" : ""
                }`}
                onPointerDown={() => setIsDragging(true)}
            />

            {/* Right Panel */}
            <div className="flex-1 overflow-hidden">
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
