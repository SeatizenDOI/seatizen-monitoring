"use client";

import dynamic from "next/dynamic";
import { ClassSelectorProps } from "./MlClassSelector";

const DynamicClassSelector = dynamic(() => import("./MlClassSelector"), {
    loading: () => <p>Chargement...</p>,
    ssr: false,
});

export default function ClassSelector(props: ClassSelectorProps) {
    return <DynamicClassSelector {...props} />;
}
