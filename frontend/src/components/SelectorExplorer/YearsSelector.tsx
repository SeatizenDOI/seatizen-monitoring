"use client";

import React, { useState } from "react";
import HelperTooltip from "../HelperTooltip";
import { getTrackBackground, Range } from "react-range";

type YearSelectorProps = {
    id: string;
    years: number[]; // list of years (strings)
    selected_year?: number; // currently selected year (controlled)
    onChange: (year: number) => void; // callback when user selects a year
    color: string;
};

type ColorClass = { text: string; bg: string };
const defaultColor: ColorClass = { text: "text-gray-400", bg: "bg-gray-400" };

export default function YearSelector({ id, years, selected_year, onChange, color }: YearSelectorProps) {
    const [values, setValues] = useState([years.indexOf(selected_year ?? 2023)]);
    const STEP = 1;
    const MIN = 0;
    const MAX = years.length - 1;
    const colorMap: Record<string, ColorClass> = {
        deepteal: { bg: "bg-deepteal-400", text: "text-deepteal-800" },
        ocean: { bg: "bg-ocean-400", text: "text-ocean-800" },
    };

    const classes = colorMap[color] ?? defaultColor;
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
                                colors: ["#e5e7eb", "#e5e7eb"],
                                min: MIN,
                                max: MAX,
                            }),
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        key={props.key}
                        className={`h-5 w-5 rounded-full shadow-md cursor-pointer ${classes.bg}`}
                    />
                )}
            />

            {/* Tick Labels */}
            <div className="flex justify-between w-full text-sm text-gray-600">
                {years.map((year, idx) => (
                    <span key={year} className={`${idx === values[0] ? `font-bold ${classes.text}` : ""}`}>
                        {year}
                    </span>
                ))}
            </div>
        </div>
    );
}
