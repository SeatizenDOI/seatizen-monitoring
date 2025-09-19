"use client";

import "@/app/ui/header.css";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { GiTurtleShell } from "react-icons/gi";
import { CiExport } from "react-icons/ci";
import { MdOutlineExplore, MdArticle } from "react-icons/md";

import { LinkItem } from "@/lib/definition";
import { HeaderLink } from "@/components/HeaderLink";

const url_paths: LinkItem[] = [
    {
        name: "Exporter",
        href: "/exporter",
        icon: CiExport,
    },
    { name: "Explorer", href: "/explorer", icon: MdOutlineExplore },
    {
        name: "Explorer ASV data",
        href: "/explorer-asv",
        icon: GiTurtleShell,
    },
    { name: "Publications", href: "/publications", icon: MdArticle },
];

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <>
            <Link className="fixed left-0 top-0 z-20 flex bg-transparent p-2" href="/">
                <div className="h-16 w-16 overflow-hidden rounded-full shadow-md">
                    <Image
                        src="/logo.png"
                        width={96}
                        height={96}
                        alt="Logo seatizen monitoring"
                        className="object-cover"
                    />
                </div>
                <span className="flex items-center text-xl p-2 font-extrabold text-foreground md:text-4xl">
                    Seatizen Monitoring
                </span>
            </Link>
            <div className="to fixed left-0 top-0 z-10 flex h-20 w-full flex-row items-center justify-end bg-background">
                <nav>
                    <section className="flex px-8 2xl:hidden">
                        <div className="space-y-2" onClick={() => setIsNavOpen((prev) => !prev)}>
                            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                        </div>

                        <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                            <div className="absolute right-0 top-0 p-8" onClick={() => setIsNavOpen(false)}>
                                <svg
                                    className="h-16 w-8 text-gray-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </div>
                            <div className="flex min-h-[250px] flex-col items-center justify-between">
                                {url_paths.map((url) => HeaderLink(url, false))}
                            </div>
                        </div>
                    </section>

                    <div className="hidden px-8 2xl:flex">{url_paths.map((url) => HeaderLink(url, true))}</div>
                </nav>
            </div>
        </>
    );
}
