"use client";

import { useEffect, useRef, useState } from "react";
import Choices from "choices.js";
import { URL_BACKEND_SERVER } from "@/lib/definition";

export interface PlatformSelectorProps {
    value: string[];
    onChange: (value: string[]) => void;
}

export default function PlatformSelector({ value, onChange }: PlatformSelectorProps) {
    const [platforms, setPlatforms] = useState<string[]>([]);
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const choicesInstance = useRef<Choices | null>(null);

    // Fetch platforms from backend
    useEffect(() => {
        fetch(`${URL_BACKEND_SERVER}/api/v1/deposits/filters`)
            .then((res) => res.json())
            .then((data) => {
                setPlatforms(data.platforms || []);
                onChange(value);
            })
            .catch((err) => console.error("Failed to fetch platforms:", err));
    }, []);

    // Initialize Choices.js after platforms load
    useEffect(() => {
        if (!selectRef.current || platforms.length === 0) return;

        // Destroy any previous Choices instance
        if (choicesInstance.current) {
            choicesInstance.current.destroy();
        }

        // Create new instance
        choicesInstance.current = new Choices(selectRef.current, {
            searchEnabled: true,
            removeItemButton: true,
            itemSelectText: "",
            shouldSort: true,
            allowHTML: true,
        });

        // Handle change event
        selectRef.current.addEventListener("change", () => {
            const selected = Array.from(selectRef.current!.selectedOptions).map((o) => o.value);
            onChange(selected);
        });

        // Set initial value if provided
        if (value) {
            choicesInstance.current.setChoiceByValue(value);
        }

        return () => {
            if (choicesInstance.current) {
                choicesInstance.current.destroy();
                choicesInstance.current = null;
            }
        };
    }, [platforms, onChange, value]);

    return (
        <div className="p-4">
            <label className="block mb-2 font-semibold">Select Platform:</label>
            <select ref={selectRef} multiple>
                <option value="">All Platforms</option>
                {platforms.map((p) => (
                    <option key={p} value={p}>
                        {p}
                    </option>
                ))}
            </select>
        </div>
    );
}
