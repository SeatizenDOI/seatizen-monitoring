import type { Metadata } from "next";
import { poppins } from "@/app/ui/fonts";
import "@/app/ui/globals.css";
import "@/app/ui/leaflet-splitmap/layout.css";
import "@/app/ui/leaflet-splitmap/range.css";
import "@/app/ui/globals.css";

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
            <body className={`${poppins.className} antialiased`}>{children}</body>
        </html>
    );
}
