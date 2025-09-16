"use client";

import dynamic from "next/dynamic";
import { SpecieSelectorProps } from "./SpecieSelector";

const DynamicSpecieSelector = dynamic(() => import("./SpecieSelector"), {
    loading: () => <p>Chargement...</p>,
    ssr: false,
});

export default function SpecieSelector(props: SpecieSelectorProps) {
    return <DynamicSpecieSelector {...props} />;
}
