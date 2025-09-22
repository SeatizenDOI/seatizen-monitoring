import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { Item } from "@/lib/definition";

export interface CustomMultiSelectProps {
    placeholder: string;
    data: Item[];
    selected_items: Item[];
    set_selected_items: (v: Item[]) => void;
}

export default function CustomMultiSelect({
    placeholder = "Select items...",
    data,
    selected_items,
    set_selected_items,
}: CustomMultiSelectProps) {
    const [availableOptions, setAvailableOptions] = useState<Item[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filter out selected items from available options whenever data or selected_items change
    useEffect(() => {
        setAvailableOptions(data.filter((option) => !selected_items.some((sel) => sel.id === option.id)));
    }, [data, selected_items]);

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
        const newSelectedItems = [...selected_items, item];
        const newAvailableOptions = availableOptions.filter((option) => option.id !== item.id);

        set_selected_items(newSelectedItems);
        setAvailableOptions(newAvailableOptions);
    };

    // Handle removing an item from selected
    const handleRemoveItem = (item: Item) => {
        const newSelectedItems = selected_items.filter((selected) => selected.id !== item.id);
        const newAvailableOptions = [...availableOptions, item].sort((a, b) => a.name.localeCompare(b.name));

        set_selected_items(newSelectedItems);
        setAvailableOptions(newAvailableOptions);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Input Area */}
            <div
                className="min-h-[48px] px-3 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer focus-within:ring-2 focus-within:ring-deepteal-300 focus-within:border-transparent"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-wrap gap-2 items-center">
                    {/* Selected Items */}
                    {selected_items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center bg-deepteal-300 text-[#F9F7F4] px-3 py-1.5 rounded-full text-sm font-medium"
                        >
                            <span>{item.name}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveItem(item);
                                }}
                                className="ml-2 hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}

                    {/* Placeholder or Input */}
                    {selected_items.length === 0 && <span className="text-gray-500 text-base">{placeholder}</span>}

                    {/* Spacer to push chevron to right */}
                    <div className="flex-1" />

                    {/* Chevron */}
                    <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {availableOptions.length === 0 ? (
                        <div className="px-4 py-3 text-gray-500 text-sm">No more options available</div>
                    ) : (
                        availableOptions.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => handleSelectItem(option)}
                                className="px-4 py-3 hover:bg-deepteal-300 hover:bg-opacity-10 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                            >
                                <div className="font-medium text-gray-900">{option.name}</div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
