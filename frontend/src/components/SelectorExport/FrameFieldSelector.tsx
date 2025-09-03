"use client";

import { useEffect, useRef, useState } from "react";
import Choices from "choices.js";
import { URL_BACKEND_SERVER } from "@/lib/definition";

export interface FrameFieldSelectorProps {
    value: string[];
    onChange: (value: string[]) => void;
}

const DEFAULT_SELECTED_FIELDS = ["gps_latitude", "gps_longitude", "version_doi", "relative_path"];

export default function FrameFieldSelector({ value, onChange }: FrameFieldSelectorProps) {
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const choicesRef = useRef<Choices | null>(null);
    const [fields, setFields] = useState<string[]>([]);

    // Fetch fields from backend
    useEffect(() => {
        fetch(`${URL_BACKEND_SERVER}/api/v1/frame/fields`)
            .then((res) => res.json())
            .then((data) => setFields(data))
            .catch((err) => console.error("Failed to fetch fields:", err));
    }, []);

    // Initialize Choices.js once fields are loaded
    useEffect(() => {
        if (!selectRef.current || fields.length === 0) return;

        // Clear previous instance if any
        if (choicesRef.current) {
            choicesRef.current.destroy();
        }

        // Add options
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

        // Set initial values
        choicesRef.current.setChoiceByValue(DEFAULT_SELECTED_FIELDS);
        onChange(DEFAULT_SELECTED_FIELDS);

        // Listen for selection changes
        selectRef.current.addEventListener("change", () => {
            const selected = choicesRef.current?.getValue(true) || [];
            onChange(Array.isArray(selected) ? selected : [selected]);
        });

        return () => {
            choicesRef.current?.destroy();
            choicesRef.current = null;
        };
    }, [fields, value]);

    return <select ref={selectRef} multiple></select>;
}
