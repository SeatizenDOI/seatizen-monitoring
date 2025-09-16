"use client";

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
        <div className="flex gap-4 items-center">
            {years.map((year) => {
                const inputId = `${groupName}-${year}`;
                return (
                    <label key={year} htmlFor={inputId} className="flex items-center gap-1 cursor-pointer">
                        <input
                            id={inputId}
                            type="radio"
                            name={groupName} // unique group name per component instance
                            value={year}
                            checked={selected_year === year} // controlled by prop
                            onChange={() => onChange?.(year)}
                            className="cursor-pointer"
                        />
                        <span>{year}</span>
                    </label>
                );
            })}
        </div>
    );
}
