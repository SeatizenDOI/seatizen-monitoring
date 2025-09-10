"use client";

import { useEffect, useRef, useState } from "react";
import Choices from "choices.js";

export interface FrameFieldSelectorProps {
    value: string[];
    onChange: (value: string[]) => void;
}

export default function FrameFieldSelector({ value, onChange }: FrameFieldSelectorProps) {
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const choicesRef = useRef<Choices | null>(null);
    const [fields, setFields] = useState<string[]>([]);

    // Fetch fields from backend
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND_SERVER}/api/v1/frame/fields`)
            .then((res) => res.json())
            .then((data) => {
                setFields(data);
                onChange(value);
            })
            .catch((err) => console.error("Failed to fetch fields:", err));
    }, []);

    // Initialize Choices.js only when fields are loaded
    useEffect(() => {
        if (!selectRef.current || fields.length === 0) return;

        // Destroy any existing instance
        choicesRef.current?.destroy();

        // Fill options manually
        selectRef.current.innerHTML = "";
        fields.forEach((f) => {
            const option = document.createElement("option");
            option.value = f;
            option.text = f;
            selectRef.current?.appendChild(option);
        });

        // Initialize Choices.js
        choicesRef.current = new Choices(selectRef.current, {
            searchEnabled: true,
            itemSelectText: "",
            shouldSort: false,
            removeItemButton: true,
            placeholder: true,
            placeholderValue: "Select field",
        });

        // Set initial value if provided
        if (value) {
            choicesRef.current.setChoiceByValue(value);
        }

        // Handle change events
        const handler = () => {
            const selected = choicesRef.current?.getValue(true) || [];
            onChange(Array.isArray(selected) ? selected : [selected]);
        };
        selectRef.current.addEventListener("change", handler);

        return () => {
            selectRef.current?.removeEventListener("change", handler);
            choicesRef.current?.destroy();
            choicesRef.current = null;
        };
    }, [fields]);

    // 🔄 Keep Choices.js in sync with external `value` updates
    useEffect(() => {
        if (!choicesRef.current) return;
        choicesRef.current.removeActiveItems();
        choicesRef.current.setChoiceByValue(value);
    }, [value]);

    return <select ref={selectRef} multiple />;
}
