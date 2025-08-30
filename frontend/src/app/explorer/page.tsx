
"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const SplitMap = dynamic(() => import("leaflet-splitmap"), { ssr:false })
export default function Page() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: L.Map | null = null;
    let control: any;

    async function initMap() {

      // Create the map
      map = L.map(mapRef.current as HTMLDivElement, {
        center: [48.8566, 2.3522],
        zoom: 5,
      });

      // Base layers for split
      const leftLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      });

      const rightLayer = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenTopoMap contributors",
      });

      // Add SplitMap control
      control = new SplitMap({
        leftLayers: [leftLayer],
        rightLayers: [rightLayer],
      }).addTo(map);
    }

    initMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
}


// import LeafletCompareMap from "@/components/Map/LeafletMapCompare";

// export default function Page() {
//   return (
//     <LeafletCompareMap
//       leftUrl="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       rightUrl="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
//       center={[48.8566, 2.3522]}
//       zoom={5}
//     />
//   );
// }


// "use client";

// import { useState } from "react";
// import LeafletMap from "@/components/Map/LeafletMap";
// import { Layer } from "@/components/Map/LeafletMap";
// import LayerDropdown from "@/components/Controls/LayerDropDown";


// export default function Page() {
//   const [selectedBase, setSelectedBase] = useState("OpenStreetMap");


//   const layers: Layer[] = [
//     {
//       name: "OpenStreetMap",
//       type: "tile",
//       url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//       checked: selectedBase === "OpenStreetMap",
//     },
//     {
//       name: "Satellite",
//       type: "tile",
//       url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
//       checked: selectedBase === "Satellite",
//     },
//     {
//       name: "Cities",
//       type: "marker",
//       markers: [
//         { lat: 48.8566, lng: 2.3522, popup: "Paris" },
//         { lat: 51.5074, lng: -0.1278, popup: "London" },
//       ],
//       checked: true,
//     },
//   ];

//   return (
//     <div>
//       <LayerDropdown
//         options={["OpenStreetMap", "Satellite"]}
//         onChange={(value) => setSelectedBase(value)}
//       />
//       <LeafletMap layers={layers} center={[48.8566, 2.3522]} zoom={5} />
//     </div>
//   );
// }


// // "use client";

// // import { useEffect, useState } from "react";
// // import LeafletMap from "@/components/Map/LeafletMap";

// // type Layer = {
// //   name: string;
// //   type: "tile" | "marker";
// //   url?: string;
// //   checked?: boolean;
// //   markers?: { lat: number; lng: number; popup?: string }[];
// // };

// // export default function Page() {
// //   const [layers, setLayers] = useState<Layer[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function fetchLayers() {
// //       try {
// //         const res = await fetch("http://localhost:8000/layers");
// //         if (!res.ok) throw new Error("Failed to fetch layers");
// //         const data: Layer[] = await res.json();
// //         setLayers(data);
// //       } catch (error) {
// //         console.error(error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchLayers();
// //   }, []);

// //   if (loading) return <p>Loading map...</p>;
// //   if (!layers.length) return <p>No layers available</p>;

// //   return <LeafletMap layers={layers} center={[48.8566, 2.3522]} zoom={5} />;
// // }
