import type { Metadata } from "next";
import ExporterPage from "./ExporterPage";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Exporter",
    description: "Export our data",
};

export default function Page() {
    return (
        <Suspense fallback={<p>Loading explorer...</p>}>
            <ExporterPage />
        </Suspense>
    );
}
