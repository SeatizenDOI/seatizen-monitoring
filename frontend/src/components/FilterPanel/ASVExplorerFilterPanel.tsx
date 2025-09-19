import { useASVExplorerFilters } from "@/context/ASVExplorerFilterContext";
import YearSelector from "@/components/SelectorExplorer/YearsSelector";
import { useEffect, useState } from "react";
import { COGFiltersASV, SpecieWithColor } from "@/lib/definition";
import SpecieSelector from "@/components/SelectorExplorer/DynamicSpeciesSelector";

export default function ASVExplorerFilterPanel() {
    const { filters, setFilters } = useASVExplorerFilters();
    const [species, setSpecies] = useState<SpecieWithColor[]>([]);
    const [years, setYears] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Retrieve all the layers from the cog server.
    useEffect(() => {
        async function fetchFilters() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL_COG_SERVER}/filters-asv`);
                if (!res.ok) throw new Error("Failed to fetch filters");
                const filters: COGFiltersASV = await res.json();

                setYears(filters.years);
                setSpecies(filters.species);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchFilters();
    }, []);

    if (loading) return <p>Loading filters...</p>;

    return (
        <div className="mx-4 my-8">
            <div className=" flex flex-col pt-2 pb-10">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-3 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
                    <h3 className="font-semibold text-gray-800 text-sm">Left panel</h3>
                </div>
                <SpecieSelector
                    species={species}
                    selected_specie={filters.left_specie}
                    onChange={(left_specie) => setFilters((f) => ({ ...f, left_specie }))}
                />
                <YearSelector
                    years={years}
                    selected_year={filters.left_year}
                    onChange={(left_year) => setFilters((f) => ({ ...f, left_year }))}
                    name="left"
                />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
                    <h3 className="font-semibold text-gray-800 text-sm">Right panel</h3>
                </div>
                <SpecieSelector
                    species={species}
                    selected_specie={filters.right_specie}
                    onChange={(right_specie) => setFilters((f) => ({ ...f, right_specie }))}
                />
                <YearSelector
                    years={years}
                    selected_year={filters.right_year}
                    onChange={(right_year) => setFilters((f) => ({ ...f, right_year }))}
                    name="right"
                />
            </div>
        </div>
    );
}
