import type { Metadata } from "next";
import ExplorerPage from "./ExplorerPage";
import { Suspense } from "react";
import TutorialModal from "@/components/TutorialModal";
import { tutorialSteps } from "./tutorialSteps";
import { TOKEN_PAGE_EXPLORER } from "@/lib/definition";
import { FiltersProvider } from "@/context/ExplorerFilterContext";

export const metadata: Metadata = {
    title: "Explorer",
    description: "Explore our data",
};

export default function Page() {
    const tutorial_description =
        "The Explorer page allows you to view all raster data (orthophoto, prediction rasters, bathymetry, etc.) produced with the Seatizen Atlas database.";
    return (
        <Suspense fallback={<p>Loading explorer...</p>}>
            <FiltersProvider>
                <TutorialModal
                    description={tutorial_description}
                    tutorialSteps={tutorialSteps}
                    local_storage_token={TOKEN_PAGE_EXPLORER}
                />
                <ExplorerPage />
            </FiltersProvider>
        </Suspense>
    );
}
