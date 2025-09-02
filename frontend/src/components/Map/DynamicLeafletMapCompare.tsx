"use client";

import dynamic from "next/dynamic";
import { LeafletSplitMapProps } from "./LeafletMapCompare";

const DynamicLeafletMapCompare = dynamic(() => import("./LeafletMapCompare"), {
    loading: () => <p>Chargement...</p>,
    ssr: false,
});

export default function MapCompare(props: LeafletSplitMapProps) {
    return <DynamicLeafletMapCompare {...props} />;
}
