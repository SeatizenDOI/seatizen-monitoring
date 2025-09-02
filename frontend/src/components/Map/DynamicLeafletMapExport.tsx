"use client";

import dynamic from "next/dynamic";
import { LeafletExportProps } from "./LeafletMapExport";

const DynamicLeafletMapExport = dynamic(() => import("./LeafletMapExport"), {
    loading: () => <p>Chargement...</p>,
    ssr: false,
});

export default function MapExport(props: LeafletExportProps) {
    return <DynamicLeafletMapExport {...props} />;
}
