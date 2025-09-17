import Link from "next/link";
import { LinkItem } from "@/lib/definition";

export default function Footer() {
    const footer_links: LinkItem[] = [
        { href: "/nous-contacter", name: "Nous Contacter" },
        { href: "/cgu", name: "CGU" },
        { href: "/mentions-legales", name: "Mentions Légales" },
    ];

    return (
        <footer className="px-4 py-8 font-medium">
            <div className="flex flex-col md:flex-row md:justify-between">
                <div className="mb-4 flex flex-row justify-center gap-4 md:mb-0">
                    {footer_links.map((link) => {
                        return (
                            <Link key={link.name} href={link.href} className="hover:text-blue-600">
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="text-center text-gray-400">
                    © 2025 <span className="font-semibold">Seatizen Monitoring</span>. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
