"use client";

import { useEffect, useRef, useState } from "react";
import Choices from "choices.js";
import { URL_BACKEND_SERVER } from "@/lib/definition";

type MlClass = {
    id: number;
    name: string;
};

export interface ClassSelectorProps {
    modelId: number | null;
    onSelectClasses: (classIds: number[]) => void; // return array of selected IDs
}

export default function ClassSelector({ modelId, onSelectClasses }: ClassSelectorProps) {
    const [classes, setClasses] = useState<MlClass[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const selectRef = useRef<HTMLSelectElement | null>(null);
    const choicesInstance = useRef<Choices | null>(null);

    // Fetch classes
    useEffect(() => {
        if (!modelId) return;

        async function fetchClasses() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${URL_BACKEND_SERVER}/api/v1/ml_class/model/${modelId}`);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data: MlClass[] = await res.json();

                // Add "All classes" option at top
                const allClassesOption: MlClass = { id: 0, name: "All classes" };
                setClasses([allClassesOption, ...data]);

                // Notify parent that "All classes" is selected by default
                onSelectClasses([0]);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchClasses();
    }, [modelId, onSelectClasses]);

    // Initialize Choices.js with multi-select
    useEffect(() => {
        if (!selectRef.current) return;

        choicesInstance.current?.destroy(); // destroy previous instance

        choicesInstance.current = new Choices(selectRef.current, {
            removeItemButton: true,
            searchEnabled: true,
            itemSelectText: "",
            shouldSort: false,
            duplicateItemsAllowed: false,
        });

        choicesInstance.current.setChoiceByValue("0");

        // Listen to change events
        selectRef.current.addEventListener("change", () => {
            const selectedOptions = Array.from(selectRef.current!.selectedOptions).map((o) => Number(o.value));
            onSelectClasses(selectedOptions);
        });

        return () => {
            choicesInstance.current?.destroy();
            choicesInstance.current = null;
        };
    }, [classes, onSelectClasses]);

    if (!modelId) return <p>Please select a model first.</p>;
    if (loading) return <p className="text-gray-500">Loading classes...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-4">
            <label className="block mb-2 font-semibold">Select ML Classes:</label>
            <select ref={selectRef} multiple>
                {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                        {cls.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
