"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SpecieWithColor } from "@/lib/definition";
type ASVExplorerFilters = {
    left_year: number;
    right_year: number;
    left_specie?: SpecieWithColor;
    right_specie?: SpecieWithColor;
};

type ASVExplorerFilterContextType = {
    filters: ASVExplorerFilters;
    setFilters: React.Dispatch<React.SetStateAction<ASVExplorerFilters>>;
};

const ASVExplorerFiltersContext = createContext<ASVExplorerFilterContextType | undefined>(undefined);

export function FiltersProvider({ children }: { children: ReactNode }) {
    const [filters, setFilters] = useState<ASVExplorerFilters>({
        left_year: 2023,
        right_year: 2023,
        left_specie: undefined,
        right_specie: undefined,
    });

    return (
        <ASVExplorerFiltersContext.Provider value={{ filters, setFilters }}>
            {children}
        </ASVExplorerFiltersContext.Provider>
    );
}

export function useASVExplorerFilters() {
    const ctx = useContext(ASVExplorerFiltersContext);
    if (!ctx) throw new Error("useASVExplorerFilters must be used within FiltersProvider");
    return ctx;
}
