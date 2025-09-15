import { GCRMNPointType, ICON_ANCHOR, ICON_SIZE, POPUP_ANCHOR } from "./definition";
import L from "leaflet";

export async function load_gcrmn_data(map: L.Map) {
    let gcrmnMarkers: L.Marker[] = [];

    try {
        const response = await fetch("/points_gcrmn.json");
        if (!response.ok) {
            throw new Error("GCRMN Data not found");
        }

        const gcrmn_data: GCRMNPointType[] = await response.json();

        var coral_icon = L.icon({
            iconUrl: "/leaflet/marker_coral_crop.svg", // TODO Change for apnea
            iconSize: ICON_SIZE,
            iconAnchor: ICON_ANCHOR,
            popupAnchor: POPUP_ANCHOR,
        });

        var externe_icon = L.icon({
            iconUrl: "/leaflet/marker_externe_crop.svg", // TODO Change for scuba diving
            iconSize: ICON_SIZE,
            iconAnchor: ICON_ANCHOR,
            popupAnchor: POPUP_ANCHOR,
        });

        gcrmn_data.forEach((gcrmn) => {
            const popup = new L.Popup({
                content: `
                            <span style="color:red;"><b>${gcrmn.label}</b></span><br>
                            <b>Position:</b> ${gcrmn.latitude.toFixed(5)}, ${gcrmn.longitude.toFixed(5)}<br>
                            <b>Mnemonic:</b> ${gcrmn.mnemonic}<br>
                            <b>Creation date:</b> ${gcrmn.creation_date}<br>
                            <b>Update date:</b> ${gcrmn.update_date}<br>`,
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
