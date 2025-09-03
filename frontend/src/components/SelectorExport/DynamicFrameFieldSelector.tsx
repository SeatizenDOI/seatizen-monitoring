"use client";

import dynamic from "next/dynamic";
import { FrameFieldSelectorProps } from "./FrameFieldSelector";

const DynamicFrameFieldSelector = dynamic(() => import("./FrameFieldSelector"), {
    loading: () => <p>Chargement...</p>,
    ssr: false,
});

export default function FrameFieldSelector(props: FrameFieldSelectorProps) {
    return <DynamicFrameFieldSelector {...props} />;
}
