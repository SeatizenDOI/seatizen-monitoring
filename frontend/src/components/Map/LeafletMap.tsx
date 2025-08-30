// "use client";

// import { MapContainer, TileLayer, LayersControl, Marker, Popup, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";


// // Fix and change icon for leaflet map.
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "/leaflet/marker-icon-2x.png",
//   iconUrl: "/leaflet/marker-icon.png",
//   shadowUrl: "/leaflet/marker-shadow.png",
// });

// export type Layer = {
//   name: string;
//   type: "tile" | "marker";
//   url?: string;
//   markers?: { lat: number; lng: number; popup?: string }[];
//   checked?: boolean;
// };

// interface LeafletMapProps {
//   layers: Layer[];
//   center?: [number, number];
//   zoom?: number;
// }

// function UpdateUrlOnMove() {
//   const map = useMapEvents({
//     moveend: () => {
//       const center = map.getCenter();
//       const zoom = map.getZoom();
//       const newParams = new URLSearchParams(window.location.search);
//       newParams.set("lat", center.lat.toFixed(5));
//       newParams.set("lng", center.lng.toFixed(5));
//       newParams.set("zoom", zoom.toString());
//       window.history.replaceState({}, "", `${window.location.pathname}?${newParams}`);
//     },
//   });
//   return null;
// }

// // export default function LeafletMap({ layers, center = [0, 0], zoom = 2 }: LeafletMapProps) {
// const LeafletMap = ({ layers, center = [0, 0], zoom = 2 }: LeafletMapProps) => {

//   const searchParams = useSearchParams();
//   const [mapCenter, setMapCenter] = useState<[number, number]>(center);
//   const [mapZoom, setMapZoom] = useState<number>(zoom);

//   // On first load, check URL params
//   useEffect(() => {
//     const lat = searchParams.get("lat");
//     const lng = searchParams.get("lng");
//     const z = searchParams.get("zoom");
//     if (lat && lng && z) {
//       setMapCenter([parseFloat(lat), parseFloat(lng)]);
//       setMapZoom(parseInt(z));
//     }
//   }, [searchParams]);

//   return (
//     <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "100vh", width: "100%" }}>
//       <UpdateUrlOnMove />
//       <LayersControl position="topright">
//         {layers.map((layer, idx) => {
//           if (layer.type === "tile" && layer.url) {
//             return (
//               <LayersControl.BaseLayer
//                 key={idx}
//                 name={layer.name}
//                 checked={layer.checked ?? false}
//               >
//                 <TileLayer url={layer.url} />
//               </LayersControl.BaseLayer>
//             );
//           }
//           if (layer.type === "marker" && layer.markers) {
//             return (
//               <LayersControl.Overlay key={idx} name={layer.name} checked={layer.checked ?? false}>
//                 {layer.markers.map((marker, mIdx) => (
//                   <Marker key={mIdx} position={[marker.lat, marker.lng]}>
//                     {marker.popup && <Popup>{marker.popup}</Popup>}
//                   </Marker>
//                 ))}
//               </LayersControl.Overlay>
//             );
//           }
//           return null;
//         })}
//       </LayersControl>
//     </MapContainer>
//   );
// }

// export default LeafletMap;