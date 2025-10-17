import type { Metadata } from "next";
import { outfit } from "@/app/ui/fonts";
import "@/app/ui/globals.css";
import "@/app/ui/leaflet-splitmap/layout.css";
import "@/app/ui/leaflet-splitmap/range.css";
import "@/app/ui/edna-tooltip.css";
import "@/app/ui/gcrmn-tooltip.css";
import "@/app/ui/comparison-tooltip.css";

export const metadata: Metadata = {
    title: {
        template: "%s | Seatizen Monitoring",
        default: "Seatizen Monitoring",
    },
    description: "Seatizen Monitoring",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={`${outfit.className} antialiased`}>{children}</body>
        </html>
    );
}
