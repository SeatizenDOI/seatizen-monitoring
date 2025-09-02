import { EdnaDataType } from "./definition";
import L from "leaflet";

export async function load_edna_data(map: L.Map) {
    try {
        const response = await fetch("/edna_data.json");
        if (!response.ok) {
            throw new Error("EDNA Data not found");
        }

        const edna_data: EdnaDataType[] = await response.json();

        edna_data.forEach((edna) => {
            const popup = new L.Popup({
                content: `
                            <h3>${edna.place} - ${edna.date}</h3>
                            <b>Position:</b> ${edna.GPSLatitude}, ${edna.GPSLongitude}<br>
                            <b>Publication:</b> <a href="${edna.publication.link}" target="_blank"> ${edna.publication.name}</a><br>
                            <b>Data:</b> <a href="${edna.data.link}" target="_blank"> ${edna.data.name}</a><br>
                            <b>Description:</b> ${edna.description}<br>
                            <img src="${edna.thumbnail}" width="400">`,
                maxWidth: 600,
                closeOnClick: true,
                autoClose: true,
                closeButton: true,
            });

            const marker = L.marker([Number(edna.GPSLatitude), Number(edna.GPSLongitude)])
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
        });
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
}
