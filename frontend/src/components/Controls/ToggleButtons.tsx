"use client";

import { useState } from "react";

interface ToggleButtonProps {
    label: string;
    onToggle?: (state: boolean) => void;
    defaultState?: boolean;
}

export default function ToggleButton({ label, onToggle, defaultState = false }: ToggleButtonProps) {
    const [isActive, setIsActive] = useState(defaultState);

    const handleClick = () => {
        const newState = !isActive;
        setIsActive(newState);
        if (onToggle) onToggle(newState);
    };

    return (
        <button
            onClick={handleClick}
            className={`px-4 py-2 rounded-md font-semibold transition-all ${
                isActive ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"
            }`}
        >
            {label}: {isActive ? "ON" : "OFF"}
        </button>
    );
}
