"use client";

import { Calendar } from "lucide-react";
import React, { useId } from "react";

type YearSelectorProps = {
    years: string[]; // list of years (strings)
    selected_year?: string; // currently selected year (controlled)
    onChange?: (year: string) => void; // callback when user selects a year
    name?: string; // optional name for the radio group
};

export default function YearSelector({ years, selected_year, onChange, name }: YearSelectorProps) {
    const id = useId(); // unique id per component instance
    const groupName = name ?? `year-group-${id}`;

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-600 uppercase tracking-wide">
                <Calendar className="w-3 h-3" />
                Year Selection
            </div>
            <div className="grid grid-cols-2 gap-2">
                {years.map((year) => (
                    <label key={`left-${year}`} className="relative cursor-pointer">
                        <input
                            type="radio"
                            name={groupName} // unique group name per component instance
                            value={year}
                            checked={selected_year === year}
                            onChange={(e) => onChange?.(e.target.value)}
                            className="sr-only"
                        />
                        <div
                            className={`p-3 rounded-lg text-center text-sm font-semibold transition-all duration-200 border-2 ${
                                selected_year === year
                                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-500 shadow-lg shadow-blue-200 scale-105"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                            }`}
                        >
                            {year}
                            {selected_year === year && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                            )}
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
}
