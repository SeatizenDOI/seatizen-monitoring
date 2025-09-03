"use client";

interface ScorePredictionFilterProps {
    value: "score" | "prediction";
    onChange: (value: "score" | "prediction") => void;
}

export default function ScorePredictionFilter({ value, onChange }: ScorePredictionFilterProps) {
    return (
        <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            <label
                className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition 
                    ${value === "score" ? "bg-blue-500 text-white shadow-md" : "bg-white text-gray-700 border"}`}
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
                className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition 
                    ${value === "prediction" ? "bg-blue-500 text-white shadow-md" : "bg-white text-gray-700 border"}`}
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
    );
}
