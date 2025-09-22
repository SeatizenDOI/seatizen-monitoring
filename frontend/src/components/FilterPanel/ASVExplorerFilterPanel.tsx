import { useASVExplorerFilters } from "@/context/ASVExplorerFilterContext";
import YearSelector from "@/components/SelectorExplorer/YearsSelector";
import { useEffect, useState } from "react";
import { COGFiltersASV, SpecieWithColor } from "@/lib/definition";
import SpecieSelector from "@/components/SelectorExplorer/SpecieSelector";

export default function ASVExplorerFilterPanel() {
    const { filters, setFilters } = useASVExplorerFilters();
    const [species, setSpecies] = useState<SpecieWithColor[]>([]);
    const [years, setYears] = useState<number[]>([]);
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
        <div className="mx-4 my-8" id="panel-explorer-asv">
            <div className="bg-green-50 border border-green-100 rounded-lg mb-4">
                <div className="bg-green-100 px-4 py-2 border-b border-green-200">
                    <span className="text-sm font-semibold text-green-800 uppercase tracking-wide">Left Panel</span>
                </div>

                <div className="p-4 border-b border-green-100">
                    <SpecieSelector
                        id="specie-explorer-asv-left"
                        species={species}
                        selected_specie={filters.left_specie}
                        onChange={(left_specie) => setFilters((f) => ({ ...f, left_specie }))}
                    />
                </div>

                <div className="p-4">
                    <YearSelector
                        id="year-explorer-asv-left"
                        years={years}
                        selected_year={filters.left_year}
                        onChange={(left_year) => setFilters((f) => ({ ...f, left_year }))}
                    />
                </div>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg mb-4 overflow-hidden">
                <div className="bg-amber-100 px-4 py-2 border-b border-amber-200">
                    <span className="text-sm font-semibold text-amber-800 uppercase tracking-wide">Right Panel</span>
                </div>

                <div className="p-4 border-b border-amber-100">
                    <SpecieSelector
                        id="specie-explorer-asv-right"
                        species={species}
                        selected_specie={filters.right_specie}
                        onChange={(right_specie) => setFilters((f) => ({ ...f, right_specie }))}
                    />
                </div>

                <div className="p-4">
                    <YearSelector
                        id="year-explorer-asv-right"
                        years={years}
                        selected_year={filters.right_year}
                        onChange={(right_year) => setFilters((f) => ({ ...f, right_year }))}
                    />
                </div>
            </div>
        </div>
    );
}
