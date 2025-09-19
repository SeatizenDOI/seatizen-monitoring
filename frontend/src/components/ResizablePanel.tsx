"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { ShipWheel, Menu, X } from "lucide-react";
import { useMediaQuery } from "react-responsive";

export interface ResizablePanelProps {
    left_content: ReactNode;
    right_content: ReactNode;
    right_title: string;
}

export default function ResizablePanel({ left_content, right_content, right_title }: ResizablePanelProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sidebarWidth, setSidebarWidth] = useState(450);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery({ maxWidth: 768 }); // Tailwind "md"

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

        const handlePointerUp = () => setIsDragging(false);

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
        <div ref={containerRef} className="flex relative">
            {/* Sidebar */}
            <div
                className={`overflow-hidden bg-background shadow-lg relative`}
                style={{ width: sidebarOpen && !isFullscreen ? sidebarWidth : 0 }}
            >
                <div className="p-6 h-full overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl font-bold text-gray-800">Map Controls</h1>
                        <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    {left_content}
                </div>

                {/* Drag Handle */}
                {sidebarOpen && !isFullscreen && (
                    <div
                        className={`absolute top-0 right-0 w-2 h-full cursor-col-resize bg-gray-200 hover:bg-gray-300 ${
                            isDragging ? "bg-gray-400" : ""
                        }`}
                        onPointerDown={() => setIsDragging(true)}
                    />
                )}
            </div>

            {/* Main Map Container */}
            <div className="flex-1 ">
                {/* Top Bar */}
                <div className="z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-4">
                            {(!sidebarOpen || isFullscreen) && (
                                <button
                                    onClick={() => {
                                        setSidebarOpen(true);
                                        setSidebarWidth(450); // default width on reopen
                                    }}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                            )}
                            <div className="flex items-center gap-2">
                                <ShipWheel className="w-5 h-5 text-gray-600" />
                                <span className="font-medium text-gray-800 italic">{right_title}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Maps Container */}
                <div className={`flex h-full ${isFullscreen ? "fixed inset-0 z-20 pt-0" : ""}`}>{right_content}</div>

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
