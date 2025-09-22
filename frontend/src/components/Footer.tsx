import Link from "next/link";
import { LinkItem } from "@/lib/definition";

export default function Footer() {
    const footer_links: LinkItem[] = [
        { href: "/legal/contact", name: "Contact" },
        { href: "/legal/terms", name: "Terms" },
        { href: "/legal/privacy-policy", name: "Privacy Policy" },
        { href: "/legal/legal-notice", name: "Legal Notice" },
    ];

    return (
        <footer className="px-4 py-8 font-medium">
            <div className="flex flex-col md:flex-row md:justify-between">
                <div className="mb-4 flex flex-row justify-center gap-4 md:mb-0">
                    {footer_links.map((link) => {
                        return (
                            <Link key={link.name} href={link.href} className="hover:text-sage-500">
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
