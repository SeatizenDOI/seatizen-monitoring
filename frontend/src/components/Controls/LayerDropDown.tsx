"use client";

import { useEffect, useRef } from "react";
import Choices from "choices.js";

interface LayerDropdownProps {
  options: string[];
  onChange: (value: string) => void;
}

export default function LayerDropdown({ options, onChange }: LayerDropdownProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectRef.current) {
      const choices = new Choices(selectRef.current, {
        searchEnabled: false,
        itemSelectText: "",
      });

      selectRef.current.addEventListener("change", (event: any) => {
        onChange(event.target.value);
      });

      return () => {
        choices.destroy();
      };
    }
  }, [onChange]);

  return (
    <select ref={selectRef}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
