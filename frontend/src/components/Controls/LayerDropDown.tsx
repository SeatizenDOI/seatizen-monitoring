"use client";

import { useEffect, useRef } from "react";
import Choices from "choices.js";
import { COGServerResponse } from "@/lib/definition";

export interface LayerDropdownProps {
    opt_layers: COGServerResponse[];
    onChange: (values: COGServerResponse[]) => void;
    selected_layers: COGServerResponse[];
}

export default function LayerDropdown({ opt_layers, onChange, selected_layers }: LayerDropdownProps) {
    const selectRef = useRef<HTMLSelectElement>(null);
    const choicesRef = useRef<Choices | null>(null);

    // Keep a map of label - options to return COGServerResponse data.
    const layerMap = new Map(opt_layers.map((layer) => [layer.id, layer]));

    // Group options by category based on `name`
    const groupedOptions: Record<string, COGServerResponse[]> = opt_layers.reduce((acc, option) => {
        const groupName = option.name.split(" ")[0];
        if (!acc[groupName]) acc[groupName] = [];
        acc[groupName].push(option);
        return acc;
    }, {} as Record<string, COGServerResponse[]>);

    useEffect(() => {
        if (!selectRef.current) return;

        // When we select a value in the dropdown, we want to return a COGServerResponse instead of an id.
        const updateLabels = () => {
            if (!choicesRef.current) return;
            const values = choicesRef.current.getValue();
            const labels = (
                Array.isArray(values)
                    ? values.map((v) => layerMap.get(v.value as string))
                    : [layerMap.get(values.value as string)]
            ) as COGServerResponse[];
            onChange(labels);
        };

        if (!choicesRef.current) {
            choicesRef.current = new Choices(selectRef.current, {
                searchEnabled: false,
                searchChoices: false,
                itemSelectText: "",
                removeItemButton: true,
                placeholderValue: "Select which map to show",
                noResultsText: "No results found",
                noChoicesText: "No choices to choose from",
                loadingText: "Loading...",
                closeDropdownOnSelect: false,
                position: "bottom",
                shouldSort: false,
                shouldSortItems: false,
            });

            // Set values from URL.
            const choices_values = choicesRef.current.getValue();
            const choices_values_array = Array.isArray(choices_values) ? choices_values : Array(choices_values);
            if (choices_values_array.length !== selected_layers.length) {
                choicesRef.current.setChoiceByValue(selected_layers.map((s) => s.id));
            }

            selectRef.current.addEventListener("change", updateLabels);
        }

        return () => {
            if (selectRef.current) {
                selectRef.current.removeEventListener("change", updateLabels);
            }
            if (choicesRef.current) {
                choicesRef.current.destroy();
                choicesRef.current = null;
            }
        };
    }, []);

    return (
        <div style={{ width: "35%" }}>
            <select ref={selectRef} multiple>
                {Object.entries(groupedOptions).map(([groupName, groupItems]) => (
                    <optgroup key={groupName} label={groupName}>
                        {groupItems.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.name}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>
    );
}
