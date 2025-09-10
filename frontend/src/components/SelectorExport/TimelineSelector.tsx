"use client";

import { useEffect, useState } from "react";
import { Range } from "react-range";

interface TimelineSliderProps {
    startDate: string;
    endDate: string;
    onChange: (start: string, end: string) => void;
}

export default function TimelineSlider({ startDate, endDate, onChange }: TimelineSliderProps) {
    const [minDate, setMinDate] = useState<Date | null>(null);
    const [maxDate, setMaxDate] = useState<Date | null>(null);
    const [values, setValues] = useState<number[]>([0, 0]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND_SERVER}/api/v1/deposits/search`)
            .then((res) => res.json())
            .then((data) => {
                const min = new Date(data.timeline.min);
                const max = new Date(data.timeline.max);
                const selected_min = new Date(startDate);
                const selected_max = new Date(endDate);
                setMinDate(min);
                setMaxDate(max);
                setValues([selected_min.getTime(), selected_max.getTime()]);
            });
    }, [startDate, endDate]);

    if (!minDate || !maxDate) return null;

    const formatDate = (ts: number) => new Date(ts).toISOString().split("T")[0];

    return (
        <div className="w-full max-w-xl p-16">
            <label className="block mb-4 text-sm font-semibold text-gray-700">
                Timeline: From <span className="text-blue-600">{formatDate(values[0])}</span> to{" "}
                <span className="text-blue-600">{formatDate(values[1])}</span>
            </label>

            <Range
                step={24 * 60 * 60 * 1000} // 1 day in ms
                min={minDate.getTime()}
                max={maxDate.getTime()}
                values={values}
                onChange={(vals) => {
                    // just update locally
                    setValues(vals);
                }}
                onFinalChange={(vals) => {
                    // only notify parent when drag ends
                    onChange(formatDate(vals[0]), formatDate(vals[1]));
                }}
                renderTrack={({ props, children }) => (
                    <div {...props} className="relative w-full h-2 rounded-full bg-gray-200">
                        <div
                            ref={props.ref}
                            className="absolute h-2 rounded-full bg-blue-500"
                            style={{
                                left: `${
                                    ((values[0] - minDate.getTime()) / (maxDate.getTime() - minDate.getTime())) * 100
                                }%`,
                                width: `${((values[1] - values[0]) / (maxDate.getTime() - minDate.getTime())) * 100}%`,
                            }}
                        />
                        {children}
                    </div>
                )}
                renderThumb={({ props, index }) => (
                    <div
                        {...props}
                        key={props.key}
                        className="w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md cursor-pointer"
                    >
                        <div className="absolute top-6 text-xs text-gray-600">{formatDate(values[index])}</div>
                    </div>
                )}
            />
        </div>
    );
}
