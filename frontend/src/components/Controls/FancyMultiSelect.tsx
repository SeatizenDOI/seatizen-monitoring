import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Search, Check, Ruler, Earth, Camera, Satellite } from "lucide-react";
import { COGServerResponse } from "@/lib/definition";

export interface FancyMultiSelectProps {
    opt_layers: COGServerResponse[];
    setSelectedLayers: (values: COGServerResponse[]) => void;
    selected_layers: COGServerResponse[];
    title: string;
}

interface LayerGroup {
    group: string;
    icon: React.ComponentType<any>;
    color: string;
    items: COGServerResponse[];
}

interface ColorStruct {
    bg: string;
    text: string;
    border: string;
    ring: string;
}

export default function FancyMultiSelect({
    opt_layers,
    setSelectedLayers,
    selected_layers,
    title,
}: FancyMultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const selectRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Sample data with optgroups
    const options: Record<string, LayerGroup> = {
        bathy: {
            group: "Bathymetry Layers",
            icon: Ruler,
            color: "blue",
            items: [],
        },
        ortho: {
            group: "Aerial Imagery 40 - 60m",
            icon: Camera,
            color: "green",
            items: [],
        },
        ign: {
            group: "Aerial imagery 1500 - 3000m",
            icon: Satellite,
            color: "purple",
            items: [],
        },
        pred: {
            group: "Habitat map",
            icon: Earth,
            color: "orange",
            items: [],
        },
    };

    for (const opt of opt_layers) {
        const group_id = opt.id.split("_")[0];
        if (!(group_id in options)) continue;

        options[group_id].items.push(opt);
    }

    // Get color classes based on group color
    const getColorClasses = (color: string) => {
        const colorMap: Record<string, ColorStruct> = {
            blue: {
                bg: "bg-deepteal-100",
                text: "text-deepteal-600",
                border: "border-deepteal-200",
                ring: "ring-deepteal-500",
            },
            green: { bg: "bg-ocean-100", text: "text-ocean-600", border: "border-ocean-200", ring: "ring-ocean-500" },
            purple: {
                bg: "bg-sage-100",
                text: "text-sage-600",
                border: "border-sage-200",
                ring: "ring-sage-500",
            },
            orange: {
                bg: "bg-beige-100",
                text: "text-beige-600",
                border: "border-beige-200",
                ring: "ring-beige-500",
            },
        };
        return colorMap[color] || colorMap.blue;
    };

    // Filter options based on search term
    const filteredOptions = Object.values(options)
        .map((group) => ({
            ...group,
            items: group.items.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        }))
        .filter((group) => group.items.length > 0);

    // Get all items for easy lookup
    const allItems = Object.values(options).flatMap((group) =>
        group.items.map((item) => ({
            ...item,
            groupColor: group.color,
            groupIcon: group.icon,
        }))
    );

    const handleItemToggle = (itemId: string) => {
        const layer = opt_layers.find((l) => l.id === itemId);
        if (!layer) return;

        setSelectedLayers(
            selected_layers.includes(layer)
                ? selected_layers.filter((l) => l.id !== itemId)
                : [...selected_layers, layer]
        );
    };

    const handleRemoveItem = (itemId: string) => {
        setSelectedLayers(selected_layers.filter((l) => l.id !== itemId));
    };

    const handleClearAll = () => {
        setSelectedLayers([]);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node | null;
            if (selectRef.current && target && !selectRef.current.contains(target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <span className="block font-medium text-md md:text-xl  mb-2">{title}</span>
            <div className="relative" ref={selectRef}>
                {/* Main Select Button */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative w-full bg-white border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                        isOpen
                            ? "border-sage-500 ring-4 ring-sage-100 shadow-lg"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            {selected_layers.length === 0 ? (
                                <span className="text-gray-500 font-medium">Select map layers and data sources...</span>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {selected_layers.slice(0, 3).map((item, index) => {
                                        const group_item = allItems.find((i) => i.id === item.id);
                                        if (!group_item) return;
                                        const colors = getColorClasses(group_item.groupColor);
                                        const IconComponent = group_item.groupIcon;

                                        return (
                                            <div
                                                key={item.id}
                                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${colors.bg} ${colors.text} ${colors.border} border relative`}
                                            >
                                                <span className="text-xs font-bold bg-white bg-opacity-50 rounded px-1 min-w-[16px] text-center">
                                                    {index + 1}
                                                </span>
                                                <IconComponent className="w-3 h-3" />
                                                <span>{item.name}</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveItem(item.id);
                                                    }}
                                                    className="hover:bg-white hover:bg-opacity-50 rounded-full p-0.5 transition-colors"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        );
                                    })}
                                    {selected_layers.length > 3 && (
                                        <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                                            +{selected_layers.length - 3} more
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                            {selected_layers.length > 0 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClearAll();
                                    }}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                            <ChevronDown
                                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                                    isOpen ? "rotate-180" : ""
                                }`}
                            />
                        </div>
                    </div>
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl overflow-hidden">
                        {/* Search Bar */}
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search layers and data sources..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Options List */}
                        <div className="max-h-80 overflow-y-auto">
                            {filteredOptions.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p>No matching options found</p>
                                </div>
                            ) : (
                                filteredOptions.map((group) => {
                                    const colors = getColorClasses(group.color);
                                    const IconComponent = group.icon;

                                    return (
                                        <div key={group.group} className="border-b border-gray-100 last:border-b-0">
                                            {/* Group Header */}
                                            <div className={`px-4 py-3 ${colors.bg} border-l-4 ${colors.border}`}>
                                                <div className="flex items-center gap-2">
                                                    <IconComponent className={`w-4 h-4 ${colors.text}`} />
                                                    <span className={`font-semibold text-sm ${colors.text}`}>
                                                        {group.group}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Group Items */}
                                            {group.items.map((item) => {
                                                const isSelected = selected_layers.includes(item);
                                                const selectedIndex = selected_layers.indexOf(item);

                                                return (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => handleItemToggle(item.id)}
                                                        className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-150 ${
                                                            isSelected
                                                                ? `${colors.bg} border-l-4 ${colors.border}`
                                                                : "hover:bg-gray-50"
                                                        }`}
                                                    >
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                                                        isSelected
                                                                            ? `${colors.border} bg-white`
                                                                            : "border-gray-300"
                                                                    }`}
                                                                >
                                                                    {isSelected && (
                                                                        <Check className={`w-3 h-3 ${colors.text}`} />
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <p
                                                                        className={`font-medium ${
                                                                            isSelected ? colors.text : "text-gray-900"
                                                                        }`}
                                                                    >
                                                                        {item.name}
                                                                        {isSelected && (
                                                                            <span className="ml-2 text-xs bg-white bg-opacity-70 px-2 py-0.5 rounded-full">
                                                                                #{selectedIndex + 1}
                                                                            </span>
                                                                        )}
                                                                    </p>
                                                                    <p className="text-sm text-gray-500 mt-0.5">
                                                                        {item.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Footer */}
                        {selected_layers.length > 0 && (
                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        {selected_layers.length} item{selected_layers.length !== 1 ? "s" : ""} selected
                                    </span>
                                    <button
                                        onClick={handleClearAll}
                                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                    >
                                        Clear all
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
