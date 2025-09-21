"use client";

import { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";
interface HelperTooltipProps {
    text: string;
}

export default function HelperTooltip({ text }: HelperTooltipProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<"top" | "bottom">("bottom");
    const buttonRef = useRef<SVGSVGElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    // Determine tooltip position based on space
    useEffect(() => {
        if (isOpen && buttonRef.current && tooltipRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const tooltipHeight = tooltipRef.current.offsetHeight;
            const spaceBelow = window.innerHeight - buttonRect.bottom;
            const spaceAbove = buttonRect.top;

            if (spaceBelow < tooltipHeight + 12 && spaceAbove > tooltipHeight + 12) {
                setPosition("top");
            } else {
                setPosition("bottom");
            }
        }
    }, [isOpen]);

    return (
        <div className="absolute top-2 right-2">
            <Info
                ref={buttonRef}
                onPointerEnter={() => setIsOpen(true)}
                onPointerLeave={() => setIsOpen(false)}
                className="w-6 h-6 text-slate-500 hover:text-secondary-400"
                aria-label="Helper tooltip"
            />

            {isOpen && (
                <div
                    ref={tooltipRef}
                    className={`absolute z-50 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-4 text-gray-800 text-sm transition`}
                    style={{
                        top: position === "bottom" ? "calc(100% + 8px)" : undefined,
                        bottom: position === "top" ? "calc(100% + 8px)" : undefined,
                        right: -6,
                    }}
                >
                    <div dangerouslySetInnerHTML={{ __html: text }} />
                    <div
                        className="absolute w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45"
                        style={{
                            top: position === "bottom" ? "-6px" : undefined,
                            bottom: position === "top" ? "-6px" : undefined,
                            right: "0.75rem",
                        }}
                    />
                </div>
            )}
        </div>
    );
}
