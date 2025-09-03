"use client";

import { URL_BACKEND_SERVER } from "@/lib/definition";
import { useEffect, useState } from "react";

export type Deposit = {
    doi: string;
    session_name: string;
    have_processed_data: boolean;
    have_processed_raw: boolean;
    session_date: string;
    alpha3_country_code: string;
    location: string;
    platform_type: string;
    deposit_linestring: {
        footprint_linestring: GeoJSON.LineString | null;
    };
    footprint: GeoJSON.Polygon | null; // assuming your API returns a GeoJSON geometry
};

export const depositPlatformColorMap: Record<string, string> = {
    UAV: "blue",
    ASV: "green",
    SCUBA: "orange",
    PADDLE: "red",
    UVC: "black",
    default: "gray",
};

export default function useDeposits() {
    const [deposits, setDeposits] = useState<Deposit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDeposits() {
            try {
                const res = await fetch(`${URL_BACKEND_SERVER}/api/v1/deposits/`);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data: Deposit[] = await res.json();
                setDeposits(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchDeposits();
    }, []);

    return { deposits, loading, error };
}
