"use client";

import dynamic from "next/dynamic";
import { PlatformSelectorProps } from "./PlatformSelector";

const DynamicPlatformSelector = dynamic(() => import("./PlatformSelector"), {
    loading: () => <p>Chargement...</p>,
    ssr: false,
});

export default function PlatformSelector(props: PlatformSelectorProps) {
    return <DynamicPlatformSelector {...props} />;
}
