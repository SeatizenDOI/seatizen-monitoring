"use client";

import L from "leaflet";
import { useEffect } from "react";



interface LeafletSplitMapProps {
  leftUrl: string;
  rightUrl: string;
  center?: [number, number];
  zoom?: number;
}

function SplitMapControl({ leftUrl, rightUrl }: { leftUrl: string; rightUrl: string }) {
  const map = useMap();

  useEffect(() => {
    let control: any;

    // Create left and right layers
      const leftLayer = L.tileLayer(leftUrl, { attribution: "Left Layer" });
      const rightLayer = L.tileLayer(rightUrl, { attribution: "Right Layer" });

      // Add the SplitMap control
      // control = new SplitMap({
      //   leftLayers: [leftLayer],
      //   rightLayers: [rightLayer],
      // }).addTo(map);

    return () => {
      if (control) {
        map.removeControl(control);
      }
    };
  }, [map, leftUrl, rightUrl]);

  return null;
}

export default function LeafletSplitMap({
  leftUrl,
  rightUrl,
  center = [48.8566, 2.3522],
  zoom = 5,
}: LeafletSplitMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100vh", width: "100%" }}
    >
      <SplitMapControl leftUrl={leftUrl} rightUrl={rightUrl} />
    </MapContainer>
  );
}
