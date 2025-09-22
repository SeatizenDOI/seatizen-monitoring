"use client";

import HelperTooltip from "../HelperTooltip";

interface ScorePredictionFilterProps {
    value: "score" | "prediction";
    onChange: (value: "score" | "prediction") => void;
}

export default function ScorePredictionFilter({ value, onChange }: ScorePredictionFilterProps) {
    return (
        <div className="relative w-full p-4">
            <HelperTooltip text="This component allows the user to toggle the feature on and off." />
            <label className="text-sm md:text-md block font-medium text-slate-700 mb-2">Prediction Type</label>

            <div className="flex items-center gap-4">
                <label
                    className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition text-sm md:text-md 
                    ${
                        value === "score"
                            ? "hover:brightness-110 bg-[linear-gradient(135deg,#6BA097,#4D7C73)] text-pearl-200 shadow-md"
                            : "bg-white text-gray-700 border"
                    }`}
                >
                    <input
                        type="radio"
                        name="filterType"
                        value="score"
                        checked={value === "score"}
                        onChange={() => onChange("score")}
                        className="hidden"
                    />
                    Score
                </label>

                <label
                    className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition text-sm md:text-md 
                    ${
                        value === "prediction"
                            ? "hover:brightness-110 bg-[linear-gradient(135deg,#6BA097,#4D7C73)] text-pearl-200 shadow-md"
                            : "bg-white text-gray-700 border"
                    }`}
                >
                    <input
                        type="radio"
                        name="filterType"
                        value="prediction"
                        checked={value === "prediction"}
                        onChange={() => onChange("prediction")}
                        className="hidden"
                    />
                    Prediction
                </label>
            </div>
        </div>
    );
}
