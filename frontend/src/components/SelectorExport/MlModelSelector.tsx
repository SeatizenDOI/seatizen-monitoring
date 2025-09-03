"use client";

import { URL_BACKEND_SERVER } from "@/lib/definition";
import { useEffect, useState } from "react";

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
                const res = await fetch(`${URL_BACKEND_SERVER}/api/v1/ml_model/`);
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
    }, [onSelectModel]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newId = Number(e.target.value);
        setSelectedModel(newId);
        onSelectModel(newId); // ✅ Notify parent on change
    };

    if (loading) return <p className="text-gray-500">Loading models...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-4">
            <label className="block mb-2 font-semibold">Select ML Model:</label>
            <select className="border rounded p-2 w-full" value={selectedModel ?? ""} onChange={handleChange}>
                {models.map((model) => (
                    <option key={model.id} value={model.id}>
                        {model.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
