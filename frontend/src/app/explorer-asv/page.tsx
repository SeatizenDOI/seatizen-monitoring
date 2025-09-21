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
        " \
        Welcome to the Seatizen export page. \
        This page allows you to browse the SeatizenAtlas database and export the selected information. \
        This short guide will walk you through the main features of the interface step by step. \
    ";
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
