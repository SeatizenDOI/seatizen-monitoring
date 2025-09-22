import { EdnaDataType, ICON_ANCHOR, ICON_SIZE, POPUP_ANCHOR } from "./definition";
import L from "leaflet";

export async function load_edna_data(map: L.Map) {
    let ednaMarkers: L.Marker[] = [];

    try {
        const response = await fetch("/edna_data.json");
        if (!response.ok) {
            throw new Error("EDNA Data not found");
        }

        const edna_data: EdnaDataType[] = await response.json();

        var edna_icon = L.icon({
            iconUrl: "/leaflet/marker_edna.svg",
            iconSize: ICON_SIZE,
            iconAnchor: ICON_ANCHOR,
            popupAnchor: POPUP_ANCHOR,
        });

        edna_data.forEach((edna) => {
            const popup = new L.Popup({
                className: "edna-popup", // Add custom class
                content: `
                <div class="popup-content">
                    <div class="popup-header">
                        <h3 class="popup-title">${edna.place}</h3>
                        <div class="popup-location">${edna.date}</div>
                    </div>
                
                    <div class="popup-body">
                        <div class="popup-left">
                            <div class="popup-info">
                                <div class="info-item">
                                    <div class="info-label">Position</div>
                                    <div class="info-value">${edna.GPSLatitude}, ${edna.GPSLongitude}</div>
                                </div>
                            
                                <div class="info-item">
                                    <div class="info-label">Publication</div>
                                    <div class="info-value">
                                        <a href="${edna.publication.link}" target="_blank">${edna.publication.name}</a>
                                    </div>
                                </div>
                            
                                <div class="info-item">
                                    <div class="info-label">Data Source</div>
                                    <div class="info-value">
                                        <a href="${edna.data.link}" target="_blank">${edna.data.name}</a>
                                    </div>
                                </div>
                            
                                <div class="info-item">
                                    <div class="info-label">Description</div>
                                    <div class="info-value">${edna.description}</div>
                                </div>
                            </div>
                        </div>
                    
                        <div class="popup-right">
                            <div class="popup-image-container">
                                <div class="popup-image">
                                    <img src="${edna.thumbnail}" alt="eDNA Data">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `,
                closeOnClick: true,
                autoClose: true,
                closeButton: true,
            });

            const marker = L.marker([Number(edna.GPSLatitude), Number(edna.GPSLongitude)], { icon: edna_icon })
                .addTo(map)
                .bindPopup(popup);

            marker.on("popupopen", () => {
                const popupLatLng = marker.getPopup()?.getLatLng();
                if (!popupLatLng) {
                    return;
                }

                // Project the popup's lat/lng to pixel coordinates
                const point = map.project(popupLatLng, map.getZoom());

                // Offset upward by N pixels (e.g., 150px)
                point.y -= 350;

                // Convert back to lat/lng
                const newLatLng = map.unproject(point, map.getZoom());

                // Smooth pan to adjusted center
                map.panTo(newLatLng, {
                    animate: true,
                    duration: 0.5,
                });
            });
            ednaMarkers.push(marker);
        });
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }

    return ednaMarkers;
}
