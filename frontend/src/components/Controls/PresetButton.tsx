"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface PresetButtonProps {
    urlString: string;
    buttonName: string;
}

export default function PresetButton({ urlString, buttonName }: PresetButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        window.location.href = urlString;
    };

    return (
        <button
            onClick={handleClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
            {buttonName}
        </button>
    );
}
