"use client";

import { useState } from "react";

export default function ShareButton() {
    const [copied, setCopied] = useState(false);

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // reset after 2s
        } catch (err) {
            console.error("Failed to copy URL:", err);
        }
    };

    return (
        <button onClick={handleClick} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            {copied ? "Copied!" : "Share"}
        </button>
    );
}
