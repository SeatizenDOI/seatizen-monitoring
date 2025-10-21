"use client";
import { useState } from "react";
import { Languages, Menu, X } from "lucide-react";
import { Introduction } from "./articles/introduction";
import { Exporter } from "./articles/exporter";

export enum LanguagesEnum {
    FRENCH = "fr",
    ENGLISH = "en",
}

export default function SummaryComponent() {
    const [selectedId, setSelectedId] = useState(1);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [language, setLanguage] = useState(LanguagesEnum.ENGLISH);

    const items = [
        // {
        //     id: 1,
        //     title:
        //         language === LanguagesEnum.ENGLISH
        //             ? "Welcome to Seatizen tutorials"
        //             : "Bienvenue sur les tutoriels Seatizen",
        //     content: Introduction(language),
        // },
        {
            id: 1,
            title:
                language === LanguagesEnum.ENGLISH
                    ? "How to extract a sub-dataset"
                    : "Comment extraire un sous-jeu de données",
            content: Exporter(language),
        },
    ];

    const selected = items.find((item) => item.id === selectedId);

    const handleSelectItem = (id: number) => {
        setSelectedId(id);
        setMobileMenuOpen(false);
    };

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === LanguagesEnum.ENGLISH ? LanguagesEnum.FRENCH : LanguagesEnum.ENGLISH));
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-sage-50 to-sage-100 p-4 md:p-8">
            {/* Desktop Sidebar - Island Style */}
            <div className="hidden md:block sticky top-24 h-fit w-64 bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            {language === LanguagesEnum.ENGLISH ? "Summary" : "Sommaire"}
                        </h2>
                        <button
                            onClick={toggleLanguage}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title={language === LanguagesEnum.ENGLISH ? "Switch to French" : "Passer en anglais"}
                        >
                            <span
                                className={`${
                                    language === LanguagesEnum.ENGLISH ? "animate-pulse text-ocean-400" : ""
                                } text-gray-500 `}
                            >
                                EN
                            </span>{" "}
                            /{" "}
                            <span
                                className={`${
                                    language === LanguagesEnum.FRENCH ? "animate-pulse text-ocean-400" : ""
                                } text-gray-500 `}
                            >
                                FR
                            </span>
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setSelectedId(item.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                                    selectedId === item.id
                                        ? "bg-ocean-50 text-ocean-700 font-medium "
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {item.title}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content - Island Style */}
            <div className="flex-1 md:ml-8">
                <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 ">
                    {/* Mobile Menu Button - Top Right */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden absolute top-6 right-6 bg-ocean-50 text-ocean-700 font-medium p-3 rounded-xl z-2"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <h1 className="text-4xl font-bold text-gray-900 mb-6 pr-16 md:pr-0">{selected?.title}</h1>
                    <div className="text-lg text-gray-700 leading-relaxed">{selected?.content}</div>
                </div>
            </div>

            {/* Mobile Menu Overlay - Centered */}
            {mobileMenuOpen && (
                <>
                    {/* Backdrop */}

                    {/* Centered Menu */}
                    <div className="absolute flex justify-center items-center bg-deepteal-50/40 w-full h-full z-10  md:hidden p-8">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-96 overflow-y-auto relative">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {language === "en" ? "Summary" : "Sommaire"}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={toggleLanguage}
                                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <Languages size={20} className="text-gray-600" />
                                        </button>
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <X size={20} className="text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                                <nav className="space-y-2">
                                    {items.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleSelectItem(item.id)}
                                            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                                                selectedId === item.id
                                                    ? "bg-ocean-50 text-ocean-700 font-medium "
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                        >
                                            {item.title}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
