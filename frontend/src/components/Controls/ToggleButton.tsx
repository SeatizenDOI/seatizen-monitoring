"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface ToggleButtonProps {
    label: string;
    label_description?: string;
    onToggle?: (state: boolean) => void;
    defaultState?: boolean;
}

export default function ToggleButton({ label, label_description, onToggle, defaultState = false }: ToggleButtonProps) {
    const [isActive, setIsActive] = useState(defaultState);

    const handleClick = () => {
        const newState = !isActive;
        setIsActive(newState);
        if (onToggle) onToggle(newState);
    };

    return (
        <div className="p-6 space-y-8">
            {/* Enhanced Toggle Switch */}
            <div className="space-y-4">
                <label className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-teal-50 rounded-xl flex items-center justify-center">
                            {isActive ? (
                                <Eye className="w-5 h-5 text-teal-600" />
                            ) : (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                            )}
                        </div>
                        <div>
                            <span className="font-medium text-gray-800 text-sm">{label}</span>
                            <p className="text-xs text-gray-500">
                                {label_description ?? "Show location markers on map"}
                            </p>
                        </div>
                    </div>

                    {/* Custom Toggle Switch */}
                    <div className="relative">
                        <input type="checkbox" checked={isActive} onChange={handleClick} className="sr-only" />
                        <div
                            className={`w-14 h-8 rounded-full transition-all duration-300 ease-in-out cursor-pointer shadow-inner flex ${
                                isActive
                                    ? "bg-gradient-to-r from-teal-200 to-teal-300 shadow-teal-200"
                                    : "bg-gray-200 shadow-gray-100"
                            }`}
                        >
                            <div
                                className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ease-in-out flex items-center justify-center mt-1 ${
                                    isActive ? "translate-x-7" : "translate-x-1"
                                }`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                        isActive ? "bg-teal-300" : "bg-gray-300"
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
}
