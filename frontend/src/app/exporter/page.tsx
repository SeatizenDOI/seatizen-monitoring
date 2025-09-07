import type { Metadata } from "next";
import ExporterPage from "./ExporterPage";
import { Suspense } from "react";
import { FiltersProvider } from "@/context/FiltersContext";

export const metadata: Metadata = {
    title: "Exporter",
    description: "Export our data",
};

export default function Page() {
    return (
        <Suspense fallback={<p>Loading explorer...</p>}>
            <FiltersProvider>
                <ExporterPage />
            </FiltersProvider>
        </Suspense>
    );
}
