"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { ShipWheel, Menu, X, Settings, CircleQuestionMark } from "lucide-react";
import { useMediaQuery } from "react-responsive";

export interface ResizablePanelProps {
    left_content: ReactNode;
    right_content: ReactNode;
    right_title: string;
}

export default function ResizablePanel({ left_content, right_content, right_title }: ResizablePanelProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sidebarWidth, setSidebarWidth] = useState(500);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery({ maxWidth: 768 }); // Tailwind "md"
    const [rightKey, setRightKey] = useState(0); // Use to force refresh for the right_content

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        if (!isFullscreen) setSidebarOpen(false);
    };

    // Dragging logic
    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (!isDragging || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            let newWidth = e.clientX - containerRect.left;

            // Clamp between 0 and 450px max
            newWidth = Math.max(0, Math.min(newWidth, 1200));

            setRightKey((prev) => prev + 1);
            if (newWidth < 300) {
                // Auto-close
                setSidebarOpen(false);
                setSidebarWidth(0);
                setIsDragging(false);
                return;
            }

            setSidebarWidth(newWidth);
            setSidebarOpen(true);
        };

        const handlePointerUp = () => {
            setRightKey((prev) => prev + 1);
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener("pointermove", handlePointerMove);
            window.addEventListener("pointerup", handlePointerUp);
        }

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [isDragging]);

    if (isMobile) {
        // 📱 Mobile layout: no draggable split pane
        return (
            <div className="flex flex-col-reverse m-4">
                <div className="bg-background py-4 px-2">{left_content}</div>
                <div className="flex-1">{right_content}</div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="flex relative max-h-[90vh] overflow-hidden">
            {/* Sidebar */}
            <div
                className={`overflow-hidden bg-background relative`}
                style={{ width: sidebarOpen && !isFullscreen ? sidebarWidth : 0 }}
            >
                <div className="p-6 h-full overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex flex-row ">
                            <div className="w-8 h-8 flex items-center justify-center">
                                <Settings className="w-8 h-8 text-gray-800" />
                            </div>
                            <h1 className="pl-4 text-xl font-bold text-gray-800">Map Controls</h1>
                        </div>
                        <div className="flex flex-row justify-end">
                            <button
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.reload();
                                }}
                                className="p-1"
                            >
                                <CircleQuestionMark className="w-5 h-5 hover:text-sage-400" />
                            </button>
                            <button
                                onClick={() => {
                                    setSidebarOpen(false);
                                    setRightKey((prev) => prev + 1);
                                }}
                                className="p-1"
                            >
                                <X className="w-5 h-5 hover:text-sage-400" />
                            </button>
                        </div>
                    </div>
                    {left_content}
                </div>

                {/* Drag Handle */}
                {sidebarOpen && !isFullscreen && (
                    <div
                        className={`absolute top-0 right-0 w-2 h-full cursor-col-resize bg-pearl-600 hover:bg-sage-400 ${
                            isDragging ? "bg-sage-500" : ""
                        }`}
                        onPointerDown={() => setIsDragging(true)}
                    />
                )}
            </div>

            {/* Main Map Container */}
            <div className="flex-1 ">
                {/* Top Bar */}
                <div className="z-10 bg-pearl-200 backdrop-blur-sm border-b border-gray-200">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-4">
                            {(!sidebarOpen || isFullscreen) && (
                                <button
                                    onClick={() => {
                                        setRightKey((prev) => prev + 1);
                                        setSidebarOpen(true);
                                        setSidebarWidth(450); // default width on reopen
                                    }}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                            )}
                            <div className="flex items-center gap-2 ">
                                <ShipWheel className="w-5 h-5 text-gray-600" />
                                <span className="font-medium text-gray-800 italic ">{right_title}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Maps Container */}
                <div key={rightKey} className={`flex h-full ${isFullscreen ? "fixed inset-0 z-20 pt-0" : ""}`}>
                    {right_content}
                </div>

                {/* Fullscreen Exit */}
                {isFullscreen && (
                    <button
                        onClick={toggleFullscreen}
                        className="absolute top-4 right-4 z-30 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}
