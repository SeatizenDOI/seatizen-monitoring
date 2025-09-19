import type { Metadata } from "next";
import ExporterPage from "./ExporterPage";
import { Suspense } from "react";
import { FiltersProvider } from "@/context/FiltersContext";
import TutorialModal from "@/components/TutorialModal";
import { tutorialSteps } from "./tutorialSteps";
import { TOKEN_PAGE_EXPORTER } from "@/lib/definition";

export const metadata: Metadata = {
    title: "Exporter",
    description: "Export our data",
};

export default function Page() {
    const tutorial_description =
        " \
        Welcome to the Seatizen export page. \
        This page allows you to browse the SeatizenAtlas database and export the selected information. \
        This short guide will walk you through the main features of the interface step by step. \
    ";
    return (
        <Suspense fallback={<p>Loading explorer...</p>}>
            <FiltersProvider>
                <TutorialModal
                    description={tutorial_description}
                    tutorialSteps={tutorialSteps}
                    local_storage_token={TOKEN_PAGE_EXPORTER}
                />
                <ExporterPage />
            </FiltersProvider>
        </Suspense>
    );
}
