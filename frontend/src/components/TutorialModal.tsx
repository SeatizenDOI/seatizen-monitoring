"use client";

import { TutorialStep } from "@/lib/definition";
import { useEffect, useState } from "react";

export interface TutorialModalProps {
    description: string;
    tutorialSteps: TutorialStep[];
    local_storage_token: string;
}

export default function TutorialModal({ description, tutorialSteps, local_storage_token }: TutorialModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isIntro, setIsIntro] = useState(true);
    const [stepIndex, setStepIndex] = useState(0);
    const [highlightStyle, setHighlightStyle] = useState<any>({});

    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem(local_storage_token);
        if (!hasSeenTutorial) setIsVisible(true);
    }, []);

    // Wait until the DOM element exists for highlighting
    useEffect(() => {
        if (!isVisible || isIntro) return;

        const step = tutorialSteps[stepIndex];

        const checkElement = () => {
            const element = document.querySelector(step.selector);
            if (element) {
                const rect = element.getBoundingClientRect();
                setHighlightStyle({
                    top: rect.top + window.scrollY - 8,
                    left: rect.left + window.scrollX - 8,
                    width: rect.width + 16,
                    height: rect.height + 16,
                });

                // Smooth scroll to center element
                element.scrollTo({ behavior: "smooth" });
                return true;
            }
            return false;
        };

        if (!checkElement()) {
            const observer = new MutationObserver(() => {
                if (checkElement()) observer.disconnect();
            });

            observer.observe(document.body, { childList: true, subtree: true });

            const timeout = setTimeout(() => observer.disconnect(), 10000);
            return () => {
                observer.disconnect();
                clearTimeout(timeout);
            };
        }
    }, [stepIndex, isVisible, isIntro]);

    const handleSkip = () => {
        localStorage.setItem(local_storage_token, "true");
        setIsVisible(false);
    };

    const handleStart = () => setIsIntro(false);

    const nextStep = () => {
        if (stepIndex < tutorialSteps.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            handleSkip();
        }
    };

    if (!isVisible) return null;

    // ✅ Show INTRO modal first
    if (isIntro) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Welcome to the Tutorial</h2>
                    <p className="text-slate-700 mb-6">{description}</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleSkip}
                            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
                        >
                            Skip
                        </button>
                        <button
                            onClick={handleStart}
                            className="px-4 py-2 rounded-md bg-gradient-to-r from-ocean-500 to-ocean-700 text-white font-semibold shadow hover:opacity-90 transition"
                        >
                            Start
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const step = tutorialSteps[stepIndex];

    const tooltipWidth = 260;
    const tooltipHeight = 140;
    const padding = 16; // minimal space from edges

    const elementTop = highlightStyle.top || 0;
    const elementLeft = highlightStyle.left || 0;
    const elementWidth = highlightStyle.width || 0;
    const elementHeight = highlightStyle.height || 0;

    let tooltipTop = elementTop + elementHeight / 2 - tooltipHeight / 2;
    let tooltipLeft = elementLeft - tooltipWidth - padding;

    // ✅ 1. Check if there is space on the left
    if (tooltipLeft < padding) {
        tooltipLeft = elementLeft + elementWidth + padding;
    }

    // ✅ 2. If still overflowing right side, try top/bottom
    if (tooltipLeft + tooltipWidth > window.innerWidth - padding) {
        const spaceBelow = window.innerHeight - (elementTop + elementHeight);

        if (spaceBelow > tooltipHeight + padding) {
            // Place below
            tooltipTop = elementTop + elementHeight + padding;
            tooltipLeft = elementLeft + elementWidth / 2 - tooltipWidth / 2;
        } else {
            // ✅ 3. Fallback: center on screen
            tooltipTop = window.innerHeight / 2 - tooltipHeight / 2;
            tooltipLeft = window.innerWidth / 2 - tooltipWidth / 2;
        }
    }

    // ✅ Clamp tooltip so it never goes offscreen
    tooltipTop = Math.max(padding, Math.min(tooltipTop, window.innerHeight - tooltipHeight - padding));
    tooltipLeft = Math.max(padding, Math.min(tooltipLeft, window.innerWidth - tooltipWidth - padding));

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="absolute inset-0 bg-black/50 pointer-events-auto" />
            <div
                className="absolute border-4 border-ocean-700 rounded-lg pointer-events-none transition-all duration-300"
                style={highlightStyle}
            />
            <div
                className="absolute bg-white shadow-lg rounded-lg p-4 w-64 pointer-events-auto animate-fade-in"
                style={{
                    top: tooltipTop,
                    left: tooltipLeft,
                }}
            >
                <h3 className="font-semibold text-primary-600 mb-2">{step.title}</h3>
                <p className="text-gray-700 mb-4 text-justify">{step.description}</p>

                <div className="flex flex-row justify-between">
                    <button
                        onClick={nextStep}
                        className="bg-gradient-to-r from-ocean-500 to-ocean-700 hover:opacity-90 text-white px-4 py-2 rounded-md font-semibold transition"
                    >
                        {stepIndex === tutorialSteps.length - 1 ? "Done" : "Next"}
                    </button>
                    <p className="text-gray-700 self-end">
                        {stepIndex + 1} / {tutorialSteps.length}
                    </p>
                </div>
            </div>
        </div>
    );
}
