"use client";

import MapExport from "@/components/Map/DynamicLeafletMapExport";

export default function ExplorerPage() {
    // The div is in reverse because the LayerDropDown need to be init before the map.
    return (
        <div className="flex flex-col-reverse">
            <div className="border-2 min-h-4/6 max-h-4/6 h-fit">
                <MapExport />
            </div>
        </div>
    );
}
