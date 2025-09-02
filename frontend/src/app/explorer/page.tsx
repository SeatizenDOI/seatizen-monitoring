import type { Metadata } from "next";
import ExplorerPage from "./ExplorerPage";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Explorer",
    description: "Explore our data",
};

export default function Page() {
    return (
        <Suspense fallback={<p>Loading explorer...</p>}>
            <ExplorerPage />
        </Suspense>
    );
}
