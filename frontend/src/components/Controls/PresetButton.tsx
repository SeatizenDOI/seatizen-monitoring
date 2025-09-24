"use client";

import React from "react";
interface PresetButtonProps {
    urlString: string;
    buttonName: string;
}

export default function PresetButton({ urlString, buttonName }: PresetButtonProps) {
    const handleClick = () => {
        window.location.href = urlString;
    };

    return (
        <button
            onClick={handleClick}
            className="w-full px-4 py-3 bg-[#F9F7F4] bg-opacity-10 hover:bg-opacity-20  font-medium rounded-lg transition-all duration-200 border border-[#F9F7F4] border-opacity-20 hover:border-opacity-30 hover:shadow-lg"
        >
            {buttonName}
        </button>
    );
}
