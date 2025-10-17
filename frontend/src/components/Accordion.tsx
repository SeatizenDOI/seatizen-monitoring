import { ReactNode, useState } from "react";
import { ChevronRight, LucideIcon } from "lucide-react";
export interface AccordionComponentProps {
    icon: LucideIcon;
    content: ReactNode;
    title: string;
    reverse?: boolean;
    defaultOpen?: boolean;
}
export default function AccordionComponent({
    icon: Icon,
    title,
    content,
    reverse,
    defaultOpen,
}: AccordionComponentProps) {
    const [showPreset, setShowPreset] = useState(defaultOpen ?? false);

    return (
        <div className="mb-3 bg-pearl-50 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 overflow-y-visible hover:shadow-md hover:bg-pearl-100">
            {showPreset && reverse && content}
            <button
                onClick={() => setShowPreset((prev) => !prev)}
                className="flex items-center justify-between w-full p-2 md:p-4"
            >
                <div className="flex flex-row items-center justify-baseline ">
                    <div className="p-2 bg-ocean-50 rounded-lg">
                        <Icon className="w-3 h-3 md:w-5 md:h-5 text-ocean-700" />
                    </div>
                    <h3 className="text-sm md:text-xl font-semibold text-[#232C33] pl-4 mb-1 flex items-center">
                        {title}
                    </h3>
                </div>

                <ChevronRight
                    className={`w-5 h-5 text-slate-600 ${showPreset ? (reverse ? "-rotate-90" : "rotate-90") : ""}`}
                />
            </button>

            {showPreset && !reverse && content}
        </div>
    );
}
