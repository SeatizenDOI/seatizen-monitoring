"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { COGServerResponse } from "@/lib/definition";
type ExplorerFilters = {
    selected_left_layers: COGServerResponse[];
    selected_right_layers: COGServerResponse[];
};

type ExplorerFilterContextType = {
    filters: ExplorerFilters;
    setFilters: React.Dispatch<React.SetStateAction<ExplorerFilters>>;
};

const ExplorerFiltersContext = createContext<ExplorerFilterContextType | undefined>(undefined);

export function FiltersProvider({ children }: { children: ReactNode }) {
    const [filters, setFilters] = useState<ExplorerFilters>({
        selected_left_layers: [],
        selected_right_layers: [],
    });

    return (
        <ExplorerFiltersContext.Provider value={{ filters, setFilters }}>{children}</ExplorerFiltersContext.Provider>
    );
}

export function useExplorerFilters() {
    const ctx = useContext(ExplorerFiltersContext);
    if (!ctx) throw new Error("useExplorerFilters must be used within FiltersProvider");
    return ctx;
}
