"use client";
import Link from "next/link";
import React from "react";
import Xarrow from "react-xarrows";

// Oval shape for raw data/inputs and final outputs
const OvalBox = ({ id, title, items, url }: { id: string; title: string; items: string[]; url: string }) => {
    return (
        <div className="relative group">
            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4A7A85] to-[#7A9B8E] rounded-full opacity-0 group-hover:opacity-30 blur-md transition duration-500"></div>

            <div
                id={id}
                className="relative p-6 rounded-full border-2 transition-all duration-300"
                style={{
                    backgroundColor: "#F9F7F4",
                    borderColor: "#4A7A85",
                    minHeight: "140px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                    boxShadow: "0 4px 6px -1px rgba(74, 122, 133, 0.1), 0 2px 4px -1px rgba(74, 122, 133, 0.06)",
                }}
            >
                <h3 className="font-bold text-sm mb-2" style={{ color: "#2D4A45" }}>
                    {title}
                </h3>
                {items && (
                    <div className="text-xs space-y-1" style={{ color: "#232C33" }}>
                        {items.map((item, i) => (
                            <div key={i}>{item}</div>
                        ))}
                    </div>
                )}

                {/* Bottom accent */}
                <div
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full transition-all duration-300 group-hover:w-20"
                    style={{
                        width: "40px",
                        backgroundColor: "#4A7A85",
                    }}
                ></div>
            </div>
        </div>
    );
};

// Rectangle for repositories
const RectangleBox = ({ id, title, items, url }: { id: string; title: string; items: string[]; url?: string }) => {
    return (
        <div className="relative w-full group">
            {/* Glow effect on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4A7A85] to-[#7A9B8E] rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>

            {/* Card */}
            <div
                id={id}
                className="relative rounded-2xl p-4 border transition-all duration-300 hover:shadow-2xl z-10"
                style={{
                    backgroundColor: "#F9F7F4",
                    borderColor: "#CDE1DD",
                }}
            >
                {/* Content */}
                <div className="pr-12">
                    <h2 className="text-xl font-bold mb-3 transition-colors duration-300" style={{ color: "#2D4A45" }}>
                        {title}
                    </h2>

                    <p className="text-sm mb-4" style={{ color: "#232C33" }}>
                        {items.map((item, i) => (
                            <div key={i}>{item}</div>
                        ))}
                    </p>

                    {url && (
                        <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 group/link"
                            style={{ color: "#4A7A85" }}
                        >
                            <span>View Repository</span>
                            <svg
                                className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </Link>
                    )}
                </div>

                {/* Bottom accent line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ backgroundColor: "#4A7A85" }}
                ></div>
            </div>
        </div>
    );
};

export default function SeatizenLayout() {
    return (
        <div className="w-full min-h-screen p-8" style={{ backgroundColor: "#fbfbfb" }}>
            <div className="max-w-7xl mx-auto">
                <div className="space-y-12 relative">
                    {/* Row 1 - ASV, ODM, UAV */}
                    <div className="grid grid-cols-14 gap-6 relative z-20">
                        <div className="col-span-3">
                            <OvalBox
                                id="asv-data"
                                title="ASV données brutes"
                                items={["Video 4K 24 FPS", "GPS Device + Base", "Bathymétrie"]}
                                url="https://doi.org/10.5281/zenodo.12711065"
                            />
                        </div>
                        <div className="col-span-1"></div>
                        <div className="col-span-4">
                            <RectangleBox
                                id="odm"
                                title="OpenDroneMap"
                                items={["External tools to generate orthophoto with georeferenced images."]}
                                url="https://github.com/opendronemap/odm"
                            />
                        </div>
                        <div className="col-span-1"></div>
                        <div className="col-span-3">
                            <OvalBox
                                id="uav-data"
                                title="UAV données brutes"
                                items={["Images géoréférencées", "GCP"]}
                                url="https://doi.org/10.5281/zenodo.15844876"
                            />
                        </div>
                        <div className="col-span-2"></div>
                    </div>

                    {/* Row 2 - plancha-workflow, drone-workflow */}
                    <div className="grid grid-cols-12 gap-6 relative bg-deepteal-50 border-2 rounded-3xl border-deepteal-200 p-8">
                        <div
                            className="absolute -top-4 left-8 px-4 py-2 z-20 rounded-full font-bold text-sm"
                            style={{ backgroundColor: "#2D4A45", color: "#E8F3F1" }}
                        >
                            Workflow Metadata
                        </div>
                        <div className="col-span-4">
                            <RectangleBox
                                id="plancha-workflow"
                                title="plancha-workflow"
                                items={[
                                    "PPK",
                                    "Frames georeferenced",
                                    "Bathymetry",
                                    "",
                                    "Extract metadata and generate georeferenced frames with centimeter accuracy.",
                                ]}
                                url="https://github.com/SeatizenDOI/plancha-workflow"
                            />
                        </div>
                        <div id="inter2" className="col-span-3 -z-10"></div>
                        <div className="col-span-4">
                            <RectangleBox
                                id="drone-workflow"
                                title="drone-workflow"
                                items={["Extraction des métadonnées des images.", "Génération de pdf, geopackage, ..."]}
                                url="https://github.com/SeatizenDOI/drone-workflow"
                            />
                        </div>
                        <div className="col-span-1"></div>
                    </div>

                    {/* Row 3 - plancha-inference, drone-upscaling, the-point-is-the-mask */}
                    <div className="grid grid-cols-13 gap-6 relative bg-ocean-50 border-2 rounded-3xl border-ocean-200 p-8">
                        <div className="absolute -top-4 left-8 px-4 py-2 z-20 rounded-full font-bold text-sm bg-ocean-500 text-ocean-50">
                            IA Predictions & Training
                        </div>
                        <div className="col-span-4">
                            <RectangleBox
                                id="plancha-inference"
                                title="plancha-inference"
                                items={["Jacques - useless / useful", "Multilabel", "PDF Preview", "Rasters"]}
                                url="https://github.com/SeatizenDOI/plancha-inference"
                            />
                        </div>
                        <div className="col-span-2"></div>
                        <div className="col-span-3">
                            <RectangleBox
                                id="drone-upscaling"
                                title="drone-upscaling"
                                items={[
                                    "Prépare, entraine et fait de l'inférence avec une IA pour la classification multilabel",
                                ]}
                                url="https://github.com/SeatizenDOI/drone-upscaling"
                            />
                        </div>
                        <div id="inter" className="col-span-1"></div>
                        <div className="col-span-3">
                            <RectangleBox
                                id="the-point-is-the-mask"
                                title="the-point-is-the-mask"
                                items={["Weakly supervised semantic segmentation"]}
                                url="https://github.com/SeatizenDOI/the-point-is-the-mask"
                            />
                        </div>
                    </div>

                    {/* Row 4 - DinoVdeau */}
                    <div className="grid grid-cols-12 gap-6 relative z-20">
                        <div className="col-span-4"></div>
                        <div className="col-span-4">
                            <RectangleBox
                                id="dinovdeau"
                                title="Dinovd'Eau"
                                items={["Finetune a multilabel / monolabel model with DinoV2 as Backbone"]}
                                url="https://github.com/SeatizenDOI/dinovdeau"
                            />
                        </div>
                        <div className="col-span-4"></div>
                    </div>

                    {/* Row 5 - fiftyone-tools */}
                    <div className="grid grid-cols-12 gap-6 relative z-20">
                        <div className="col-span-4"></div>
                        <div className="col-span-4">
                            <RectangleBox
                                id="fiftyone-tools"
                                title="fiftyone-tools"
                                items={["Tools to manually annotated images with labels to enhance new dataset"]}
                                url="https://github.com/SeatizenDOI/fiftyone-tools"
                            />
                        </div>
                        <div className="col-span-4"></div>
                    </div>

                    {/* Row 6 - zenodo-tools (wide) */}
                    <div className="grid grid-cols-12 gap-6 relative z-20">
                        <div className="col-span-2"></div>
                        <div className="col-span-8">
                            <RectangleBox
                                id="zenodo-tools"
                                title="zenodo-tools"
                                items={[
                                    "Tools to communicate with zenodo-api:",
                                    "",
                                    "• zenodo-upload: Send a session on zenodo (raw data, processed data, custom data, update metadata, delete draft session)",
                                    "• zenodo-download: Download a session from a doi or a session name matching the good doi",
                                    "• zenodo-manager: Create or update a geopackage to centralize all metadata and generate subtiles to easily manipulate all sessions",
                                ]}
                                url="https://github.com/SeatizenDOI/zenodo-tools"
                            />
                        </div>
                        <div className="col-span-2"></div>
                    </div>

                    {/* Row 7 - seatizen-monitoring and cog-server (bottom ovals) */}
                    <div className="grid grid-cols-12 gap-6 relative z-20">
                        <div className="col-span-1"></div>
                        <div className="col-span-4">
                            <RectangleBox
                                id="seatizen-monitoring"
                                title="seatizen-monitoring"
                                items={["Exporter", "Explorer", "Easy explorer"]}
                                url="https://github.com/SeatizenDOI/seatizen-monitoring"
                            />
                        </div>
                        <div className="col-span-2"></div>
                        <div className="col-span-4">
                            <RectangleBox
                                id="cog-server"
                                title="cog-server"
                                items={[
                                    "Visualize orthophoto on qgis.",
                                    "",
                                    "• Serve ortho, bathy, habitat map prediction as raster under one URL.",
                                    "• Can get depth at one point or prediction.",
                                ]}
                                url="https://github.com/SeatizenDOI/cog-server"
                            />
                        </div>
                        <div className="col-span-1"></div>
                    </div>
                </div>

                <div className="hidden md:block">
                    {/* All Arrows */}
                    <Xarrow start="asv-data" end="plancha-workflow" path="grid" color="#4A7A85" strokeWidth={2} />
                    <Xarrow start="uav-data" end="drone-workflow" path="grid" color="#4A7A85" strokeWidth={2} />
                    <Xarrow start="uav-data" end="odm" path="grid" color="#4A7A85" strokeWidth={2} />

                    <Xarrow
                        start="plancha-workflow"
                        end="odm"
                        startAnchor="top"
                        endAnchor="left"
                        color="#4A7A85"
                        strokeWidth={2}
                    />

                    <Xarrow
                        start="odm"
                        end="inter2"
                        startAnchor={"bottom"}
                        endAnchor={"bottom"}
                        path="grid"
                        color="#4A7A85"
                        strokeWidth={2}
                        showHead={false}
                    />

                    <Xarrow
                        start="inter2"
                        end="drone-upscaling"
                        startAnchor={"bottom"}
                        endAnchor={"top"}
                        path="grid"
                        color="#4A7A85"
                        strokeWidth={2}
                    />
                    <Xarrow
                        start="inter2"
                        end="the-point-is-the-mask"
                        startAnchor={"bottom"}
                        endAnchor={"top"}
                        path="grid"
                        color="#4A7A85"
                        strokeWidth={2}
                    />

                    <Xarrow
                        start="plancha-workflow"
                        end="plancha-inference"
                        path="grid"
                        color="#4A7A85"
                        strokeWidth={2}
                    />

                    <Xarrow
                        start="dinovdeau"
                        end="plancha-inference"
                        startAnchor="left"
                        endAnchor="right"
                        color="#4A7A85"
                        strokeWidth={2}
                        path="grid"
                    />

                    <Xarrow
                        start="dinovdeau"
                        end="drone-upscaling"
                        startAnchor="top"
                        color="#4A7A85"
                        strokeWidth={2}
                        path="grid"
                    />

                    <Xarrow
                        start="drone-workflow"
                        end="inter"
                        path="straight"
                        startAnchor="bottom"
                        endAnchor="middle"
                        color="#4A7A85"
                        strokeWidth={2}
                        showHead={false}
                    />
                    <Xarrow start="plancha-inference" end="zenodo-tools" path="grid" color="#4A7A85" strokeWidth={2} />
                    <Xarrow
                        start="inter"
                        end="zenodo-tools"
                        path="grid"
                        startAnchor="middle"
                        endAnchor="right"
                        color="#4A7A85"
                        strokeWidth={2}
                    />

                    <Xarrow
                        start="the-point-is-the-mask"
                        end="inter"
                        path="straight"
                        endAnchor="middle"
                        showHead={false}
                        color="#4A7A85"
                        strokeWidth={2}
                    />
                    <Xarrow
                        start="drone-upscaling"
                        end="inter"
                        path="straight"
                        endAnchor="middle"
                        color="#4A7A85"
                        showHead={false}
                        strokeWidth={2}
                    />

                    <Xarrow
                        start="fiftyone-tools"
                        end="dinovdeau"
                        path="grid"
                        color="#4A7A85"
                        strokeWidth={2}
                        zIndex={1}
                    />
                </div>
            </div>
        </div>
    );
}
