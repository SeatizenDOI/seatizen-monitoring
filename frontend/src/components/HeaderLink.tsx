"use client";

import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { LinkItem } from "@/lib/definition";
import Link from "next/link";
import { Cloud } from "lucide-react";

/** Build a single link in nav header. */
export function HeaderLink(link: LinkItem, isDesktop: boolean) {
    const pathname = usePathname();
    const LinkIcon = link.icon ?? Cloud;

    return (
        <Link
            key={isDesktop ? link.name : link.name + "_menu"}
            href={link.href}
            className={clsx(
                "flex h-[48px] items-center gap-2 p-3 text-xl font-bold hover:scale-x-105 hover:text-sage-500 md:justify-start md:p-2 md:px-3",
                {
                    "animate-pulse text-sage-300": pathname === link.href,
                }
            )}
        >
            <LinkIcon className="w-6" />
            <p>{link.name}</p>
        </Link>
    );
}
