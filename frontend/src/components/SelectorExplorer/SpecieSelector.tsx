"use client";

import { useEffect, useRef } from "react";
import Choices from "choices.js";

export type SpecieSelectorProps = {
    species: string[];
    selected_specie: string;
    onChange: (specie: string) => void;
    name?: string;
};

export default function SpecieSelector({ species, selected_specie, onChange, name }: SpecieSelectorProps) {
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const choicesRef = useRef<Choices | null>(null);

    useEffect(() => {
        if (selectRef.current) {
            // Initialize Choices.js only once
            choicesRef.current = new Choices(selectRef.current, {
                searchEnabled: false,
                shouldSort: false,
                itemSelectText: "",
                position: "bottom",
            });

            // Listen to change events from Choices.js
            selectRef.current.addEventListener("change", (e) => {
                const value = (e.target as HTMLSelectElement).value;
                onChange?.(value);
            });

            // Cleanup on unmount
            return () => {
                choicesRef.current?.destroy();
            };
        }
    }, []);

    // Update selected value if controlled from parent
    useEffect(() => {
        if (choicesRef.current && selected_specie !== undefined) {
            choicesRef.current.setChoiceByValue(selected_specie);
        }
    }, [selected_specie]);

    return (
        <div className="flex flex-row gap-1 w-3xl">
            <label htmlFor={name}>Species</label>
            <select ref={selectRef} id={name} name={name} defaultValue={selected_specie}>
                <option value="">Select a specie</option>
                {species.map((specie) => (
                    <option key={specie} value={specie}>
                        {specie}
                    </option>
                ))}
            </select>
        </div>
    );
}
