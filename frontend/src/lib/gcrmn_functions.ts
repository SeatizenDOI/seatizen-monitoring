import { GCRMNPointType, ICON_ANCHOR, ICON_SIZE, POPUP_ANCHOR } from "./definition";
import L from "leaflet";

export async function load_gcrmn_data(map: L.Map) {
    const gcrmnMarkers: L.Marker[] = [];

    try {
        const response = await fetch("/points_gcrmn.json");
        if (!response.ok) {
            throw new Error("GCRMN Data not found");
        }

        const gcrmn_data: GCRMNPointType[] = await response.json();

        const coral_icon = L.icon({
            iconUrl: "/leaflet/marker_platier.svg",
            iconSize: ICON_SIZE,
            iconAnchor: ICON_ANCHOR,
            popupAnchor: POPUP_ANCHOR,
        });

        const externe_icon = L.icon({
            iconUrl: "/leaflet/marker_pe.svg",
            iconSize: ICON_SIZE,
            iconAnchor: ICON_ANCHOR,
            popupAnchor: POPUP_ANCHOR,
        });

        gcrmn_data.forEach((gcrmn) => {
            const popup = new L.Popup({
                className: "gcrmn-popup",
                content: `
                <div class="popup-group">
                    <div class="popup-header">
                       ${gcrmn.label}
                    </div>
                    <div class="popup-content">
                        <div class="popup-field">
                            <span class="popup-label">Position:</span>
                            <span class="popup-value popup-coordinates">${gcrmn.latitude.toFixed(
                                5
                            )}, ${gcrmn.longitude.toFixed(5)}</span>
                        </div>
                        <div class="popup-field">
                            <span class="popup-label">Mnemonic:</span>
                            <span class="popup-value popup-mnemonic">${gcrmn.mnemonic}</span>
                        </div>
                        <div class="popup-field">
                            <span class="popup-label">Creation date:</span>
                            <span class="popup-value">${gcrmn.creation_date}</span>
                        </div>
                        <div class="popup-field">
                            <span class="popup-label">Update date:</span>
                            <span class="popup-value">${gcrmn.update_date}</span>
                        </div>
                    </div>
                </div>
                `,
                closeOnClick: true,
                autoClose: true,
                closeButton: true,
            });

            const marker = L.marker([Number(gcrmn.latitude), Number(gcrmn.longitude)], {
                icon: gcrmn.label.includes("Platier") ? coral_icon : externe_icon,
            })
                .addTo(map)
                .bindPopup(popup);

            gcrmnMarkers.push(marker);
        });
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }

    return gcrmnMarkers;
}
