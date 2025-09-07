"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { DEFAULT_SELECTED_END_DATE, DEFAULT_SELECTED_PLATFORMS, DEFAULT_SELECTED_START_DATE } from "@/lib/definition";

type Filters = {
    platform: string[];
    startDate: string;
    endDate: string;
    filterType: "score" | "prediction";
    selectedField: string[];
    selectedModelId: number | null;
    selectedClassId: number[];
};

type FiltersContextType = {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export function FiltersProvider({ children }: { children: ReactNode }) {
    const [filters, setFilters] = useState<Filters>({
        platform: DEFAULT_SELECTED_PLATFORMS,
        startDate: DEFAULT_SELECTED_START_DATE,
        endDate: DEFAULT_SELECTED_END_DATE,
        filterType: "score",
        selectedField: [],
        selectedModelId: null,
        selectedClassId: [],
    });

    return <FiltersContext.Provider value={{ filters, setFilters }}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
    const ctx = useContext(FiltersContext);
    if (!ctx) throw new Error("useFilters must be used within FiltersProvider");
    return ctx;
}
