import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ShareButton from "@/components/Controls/ShareButton";
import { COGServerResponse } from "@/lib/definition";
import PresetButton from "@/components/Controls/PresetButton";
import { useExplorerFilters } from "@/context/ExplorerFilterContext";
import FancyMultiSelect from "../Controls/FancyMultiSelect";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function ExplorerFilterPanel() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { filters, setFilters } = useExplorerFilters();
    const [layers, setLayers] = useState<COGServerResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [showPreset, setShowPreset] = useState(false);

    // Retrieve all the layers from the cog server.
    useEffect(() => {
        async function fetchLayers() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL_COG_SERVER}/layers`);
                if (!res.ok) throw new Error("Failed to fetch layers");
                const layers: COGServerResponse[] = await res.json();
                setLayers(layers);

                const leftIds = searchParams.get("left")?.split(",") || [];
                const rightIds = searchParams.get("right")?.split(",") || [];

                // Filter and sort to keep the url order.
                const selected_left_layers = layers
                    .filter((l) => leftIds.includes(l.id))
                    .sort((a, b) => leftIds.indexOf(a.id) - leftIds.indexOf(b.id));

                const selected_right_layers = layers
                    .filter((l) => rightIds.includes(l.id))
                    .sort((a, b) => rightIds.indexOf(a.id) - rightIds.indexOf(b.id));

                setFilters((f) => ({ ...f, selected_left_layers, selected_right_layers }));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchLayers();
    }, []);

    // Update the url based on the selected layers for each side.
    useEffect(() => {
        updateURL(filters.selected_left_layers, filters.selected_right_layers);
    }, [filters.selected_left_layers, filters.selected_right_layers]);

    const updateURL = (left: COGServerResponse[], right: COGServerResponse[]) => {
        const params = new URLSearchParams(searchParams.toString());
        if (left.length !== 0) params.set("left", left.map((l) => l.id).join(","));
        else params.delete("left");

        if (right.length !== 0) params.set("right", right.map((l) => l.id).join(","));
        else params.delete("right");

        router.push(`?${params.toString()}`, { scroll: false });
    };

    if (loading) return <p>Loading layers...</p>;
    if (!layers.length) return <p>No layers available</p>;

    return (
        <div>
            <ShareButton />
            <div className="my-4 flex flex-col " id="layers-selectors">
                <FancyMultiSelect
                    opt_layers={layers}
                    setSelectedLayers={(selected_left_layers) => setFilters((f) => ({ ...f, selected_left_layers }))}
                    selected_layers={filters.selected_left_layers}
                    title="Left layers"
                />
                <FancyMultiSelect
                    opt_layers={layers}
                    setSelectedLayers={(selected_right_layers) => setFilters((f) => ({ ...f, selected_right_layers }))}
                    selected_layers={filters.selected_right_layers}
                    title="Right layers"
                />
            </div>

            <div className="rounded-lg my-4" id="preset-container">
                <button
                    onClick={() => setShowPreset((prev) => !prev)}
                    className="flex items-center justify-between w-full p-2 md:p-4"
                >
                    <h3 className="text-lg font-semibold text-[#232C33] mb-1 flex items-center">Preset Tools</h3>

                    {showPreset ? (
                        <ChevronDown className="w-5 h-5 text-slate-600" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                    )}
                </button>

                {showPreset && (
                    <div className="p-4 space-y-3">
                        <PresetButton
                            buttonName="Bathy 2023/2025 comparison"
                            urlString="/explorer?lat=-21.17536&lng=55.29213&zoom=16&left=ortho_2023%2Cbathy_2023&right=ortho_2025%2Cbathy_2025"
                        />
                        <PresetButton
                            buttonName="Habitat map / Orthophoto 2023"
                            urlString="/explorer?lat=-21.17536&lng=55.29213&zoom=16&left=ortho_2023%2Cpred_drone_2023&right=ortho_2023"
                        />
                        <PresetButton
                            buttonName="IGN 2022 vs Drone Orthophoto 2023"
                            urlString="/explorer?lat=-21.17536&lng=55.29213&zoom=16&right=ortho_2023&left=ign_2022"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
