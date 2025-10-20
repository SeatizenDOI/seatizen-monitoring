"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Item } from "@/lib/definition";

export interface CustomSelectProps {
    placeholder: string;
    data: Item[];
    selected_item: Item;
    set_selected_item: (v: Item) => void;
}

export default function CustomSelect({
    placeholder = "Select an item...",
    data,
    selected_item,
    set_selected_item,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node | null;
            if (dropdownRef.current && target && !dropdownRef.current.contains(target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle selecting an item from dropdown
    const handleSelectItem = (item: Item) => {
        set_selected_item(item);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Input Area */}
            <div
                className="min-h-[48px] px-3 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:ring-2 hover:ring-sage-500 hover:border-transparent transition-colors focus-within:ring-2 focus-within:ring-sage-300 focus-within:border-transparent"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-between">
                    {/* Selected Item or Placeholder */}
                    {selected_item ? (
                        <span className="text-gray-900 text-base font-medium">{selected_item.name}</span>
                    ) : (
                        <span className="text-gray-500 text-base">{placeholder}</span>
                    )}

                    <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {data.length === 0 ? (
                        <div className="px-4 py-3 text-gray-500 text-sm">No options available</div>
                    ) : (
                        data.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => handleSelectItem(option)}
                                className={`px-4 py-3 hover:bg-sage-100 hover:bg-opacity-10 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
                                    selected_item?.id === option.id ? "bg-sage-100 bg-opacity-20" : ""
                                }`}
                            >
                                <div className="font-medium">{option.name}</div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
