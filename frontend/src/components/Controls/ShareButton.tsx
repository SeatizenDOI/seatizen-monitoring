"use client";

import { CopyCheck, Share2 } from "lucide-react";
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
        <div onClick={handleClick} className="flex justify-center" id="share-button">
            <button className=" bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                {copied ? (
                    <>
                        <CopyCheck className="w-5 h-5" /> Copied
                    </>
                ) : (
                    <>
                        <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" /> Share
                    </>
                )}
            </button>
        </div>
    );
}
