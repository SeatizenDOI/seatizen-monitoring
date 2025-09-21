"use client";

import { useState } from "react";
import { ChevronDown, Fish } from "lucide-react";
import { SpecieWithColor } from "@/lib/definition";
import HelperTooltip from "../HelperTooltip";

export type SpecieSelectorProps = {
    id: string;
    species: SpecieWithColor[];
    selected_specie?: SpecieWithColor;
    onChange: (specie: SpecieWithColor) => void;
};

export default function SpecieSelector({ id, species, selected_specie, onChange }: SpecieSelectorProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div id={id} className="space-y-4 relative mb-4 pt-4">
            <HelperTooltip text="The taxon or the substrat come from the GCRMN report. You can found more detail in the <a href='https://doi.org/10.1038/s41597-024-04267-z' target='_blank'>SeatizenAtlas paper</a>." />
            <div className="flex items-center gap-2 text-xs font-medium text-gray-600 tracking-wide">
                <Fish className="w-3 h-3" />
                Taxon and substrate
            </div>

            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl text-left flex items-center justify-between hover:shadow-md transition-all duration-200"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: selected_specie?.color ?? "#d1d5dc" }}
                        />
                        <span className="text-sm font-medium text-gray-700">
                            {selected_specie?.name ?? "Select a species"}
                        </span>
                    </div>
                    <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                </button>

                {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 h-[30vh] mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-scroll">
                        {species.map((spec) => (
                            <button
                                key={spec.name}
                                onClick={() => {
                                    onChange(spec);
                                    setDropdownOpen(false);
                                }}
                                className="w-full p-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                            >
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: spec.color }} />
                                <span className="text-sm font-medium text-gray-700">{spec.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
