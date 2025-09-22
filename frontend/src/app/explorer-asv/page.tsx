import type { Metadata } from "next";
import ASVExplorerPage from "./ASVExplorerPage";
import { Suspense } from "react";
import { FiltersProvider } from "@/context/ASVExplorerFilterContext";
import TutorialModal from "@/components/TutorialModal";
import { tutorialSteps } from "./tutorialSteps";
import { TOKEN_PAGE_ASV_EXPLORER } from "@/lib/definition";

export const metadata: Metadata = {
    title: "ASV Explorer",
    description: "Explore our ASV data",
};

export default function Page() {
    const tutorial_description =
        " The ASV Explorer page allows you to explore ASV multilabel prediction rasters by class and year.";
    return (
        <Suspense fallback={<p>Loading ASV explorer...</p>}>
            <FiltersProvider>
                <TutorialModal
                    description={tutorial_description}
                    tutorialSteps={tutorialSteps}
                    local_storage_token={TOKEN_PAGE_ASV_EXPLORER}
                />
                <ASVExplorerPage />
            </FiltersProvider>
        </Suspense>
    );
}
