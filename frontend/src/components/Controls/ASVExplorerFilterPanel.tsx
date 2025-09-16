import { useASVExplorerFilters } from "@/context/ASVExplorerFilterContext";
import YearSelector from "./YearsSelector";
import { useEffect, useState } from "react";
import { COGFiltersASV } from "@/lib/definition";
import SpecieSelector from "./DynamicSpeciesSelector";

export default function ASVExplorerFilterPanel() {
    const { filters, setFilters } = useASVExplorerFilters();
    const [species, setSpecies] = useState<string[]>([]);
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
        <div className="m-4 pb-52 flex flex-row justify-between border-2 w-full">
            <div className=" flex flex-col">
                <SpecieSelector
                    species={species}
                    selected_specie={filters.left_specie}
                    onChange={(left_specie) => setFilters((f) => ({ ...f, left_specie }))}
                    name="left"
                />
                <YearSelector
                    years={years}
                    selected_year={filters.left_year}
                    onChange={(left_year) => setFilters((f) => ({ ...f, left_year }))}
                    name="left"
                />
            </div>
            <div className="flex flex-col">
                <SpecieSelector
                    species={species}
                    selected_specie={filters.right_specie}
                    onChange={(right_specie) => setFilters((f) => ({ ...f, right_specie }))}
                    name="right"
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
