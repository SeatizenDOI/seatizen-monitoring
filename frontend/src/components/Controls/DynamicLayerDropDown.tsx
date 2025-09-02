"use client";

import dynamic from "next/dynamic";
import { LayerDropdownProps } from "./LayerDropDown";

const DynamicLayerDropDown = dynamic(() => import("./LayerDropDown"), {
    loading: () => <p>Chargement...</p>,
    ssr: false,
});

export default function LayerDropDown(props: LayerDropdownProps) {
    return <DynamicLayerDropDown {...props} />;
}
