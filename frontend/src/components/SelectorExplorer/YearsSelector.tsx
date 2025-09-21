"use client";

import React, { useState } from "react";
import HelperTooltip from "../HelperTooltip";
import { getTrackBackground, Range } from "react-range";

type YearSelectorProps = {
    id: string;
    years: number[]; // list of years (strings)
    selected_year?: number; // currently selected year (controlled)
    onChange: (year: number) => void; // callback when user selects a year
};

export default function YearSelector({ id, years, selected_year, onChange }: YearSelectorProps) {
    const [values, setValues] = useState([years.indexOf(selected_year ?? 2023)]);
    const STEP = 1;
    const MIN = 0;
    const MAX = years.length - 1;

    return (
        <div id={id} className="relative flex flex-col items-center space-y-4 w-full max-w-lg">
            <HelperTooltip text="Acquisition year without disctinction with major event."></HelperTooltip>
            {/* Label above the slider */}
            <div className="text-xl font-semibold text-gray-800">{years[values[0]]}</div>

            {/* Slider */}
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => {
                    setValues(values);
                    onChange(years[values[0]]);
                }}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="w-full h-2 rounded-full"
                        style={{
                            ...props.style,
                            background: getTrackBackground({
                                values,
                                colors: ["#e5e7eb"],
                                min: MIN,
                                max: MAX,
                            }),
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div {...props} className="h-5 w-5 bg-teal-200 rounded-full shadow-md cursor-pointer " />
                )}
            />

            {/* Tick Labels */}
            <div className="flex justify-between w-full text-sm text-gray-600">
                {years.map((year, idx) => (
                    <span key={year} className={`${idx === values[0] ? "font-bold text-teal-400" : ""}`}>
                        {year}
                    </span>
                ))}
            </div>
        </div>
    );
}
