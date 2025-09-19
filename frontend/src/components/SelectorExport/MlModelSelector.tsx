"use client";

import { useEffect, useState } from "react";
import HelperTooltip from "../HelperTooltip";

type MlModel = {
    id: number;
    name: string;
};

interface ModelSelectorProps {
    onSelectModel: (modelId: number) => void;
}

export default function ModelSelector({ onSelectModel }: ModelSelectorProps) {
    const [models, setModels] = useState<MlModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<number | null>(null);

    useEffect(() => {
        async function fetchModels() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND_SERVER}/api/v1/ml_model/`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data: MlModel[] = await res.json();
                setModels(data);

                if (data.length > 0) {
                    setSelectedModel(data[0].id);
                    onSelectModel(data[0].id); // ✅ Notify parent
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchModels();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newId = Number(e.target.value);
        setSelectedModel(newId);
        onSelectModel(newId); // ✅ Notify parent on change
    };

    if (loading) return <p className="text-gray-500">Loading models...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="relative w-full p-4">
            <HelperTooltip text="Multilabel model for benthic habitat and coral morphotype detection. They can be found on Hugginface." />

            <label className="block font-medium text-sm md:text-md text-slate-700 mb-2">Multilabel Model</label>
            <select
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                value={selectedModel ?? ""}
                onChange={handleChange}
            >
                {models.map((model) => (
                    <option key={model.id} value={model.id}>
                        {model.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
