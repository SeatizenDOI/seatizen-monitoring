import type { Metadata } from "next";
import ASVExplorerPage from "./ASVExplorerPage";
import { Suspense } from "react";
import { FiltersProvider } from "@/context/ASVExplorerFilterContext";

export const metadata: Metadata = {
    title: "ASV Explorer",
    description: "Explore our ASV data",
};

export default function Page() {
    return (
        <Suspense fallback={<p>Loading ASV explorer...</p>}>
            <FiltersProvider>
                <ASVExplorerPage />
            </FiltersProvider>
        </Suspense>
    );
}
