"use client";
import React, { useState, useEffect } from "react";
import {
    Github,
    Database,
    Waves,
    Fish,
    Globe,
    BarChart3,
    Camera,
    MapPin,
    ArrowRight,
    ExternalLink,
    Users,
    Award,
    Microscope,
    Satellite,
    BookOpen,
    Code,
    Heart,
    ChevronLeft,
    ChevronRight,
    ScrollText,
    Cpu,
    ChevronDown,
    Download,
    Eye,
    Map,
    Zap,
    Archive,
} from "lucide-react";
import { divIcon } from "leaflet";
import Link from "next/link";

export default function Page() {
    // Logo carousel state
    const [currentLogoSlide, setCurrentLogoSlide] = useState(0);

    // Partner logos - replace with actual logos
    const partnerLogos = [
        { name: "IFREMER", logo: "/partners/ifremer.jpg" },
        { name: "CNRS", logo: "/partners/cnrs.png" },
        { name: "LIRMM", logo: "/partners/lirmm.jpg" },
        { name: "IRD", logo: "/partners/ird.jpg" },
        { name: "INIRIA", logo: "/partners/inria.png" },
        { name: "ID OCEAN", logo: "/partners/idocean.jpg" },
        { name: "PPR", logo: "/partners/ppr.png" },
        { name: "Région Réunion", logo: "/partners/region-reunion-logo.png" },
        { name: "Gouvernement français", logo: "/partners/gouvernement.png" },
        { name: "OFB", logo: "/partners/ofb.jpg" },
        { name: "Parc naturel marin", logo: "/partners/parc_naturel_marin.jpeg" },
        { name: "Union Européenne", logo: "/partners/ue.png" },
    ];

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentLogoSlide((prev) => (prev + 1) % Math.ceil(partnerLogos.length / 4));
        }, 3000);
        return () => clearInterval(timer);
    }, [partnerLogos.length]);

    const nextSlide = () => {
        setCurrentLogoSlide((prev) => (prev + 1) % Math.ceil(partnerLogos.length / 4));
    };

    const prevSlide = () => {
        setCurrentLogoSlide(
            (prev) => (prev - 1 + Math.ceil(partnerLogos.length / 4)) % Math.ceil(partnerLogos.length / 4)
        );
    };

    return (
        <div className="min-h-screen ">
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-deepteal-200 to-ocean-800 text-cream-50">
                <div className="relative text-center px-6 max-w-6xl mx-auto">
                    <div className="mb-8">
                        <div className="mb-6">
                            <Cpu className="w-20 h-20 mx-auto mb-4 text-sage-300" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-cream-100 bg-clip-text mb-6 leading-tight">
                            Seatizen Monitoring
                        </h1>
                        <p className="text-xl md:text-2xl text-beige-200 mb-4 max-w-4xl mx-auto leading-relaxed">
                            Open-access platform to explore, visualize, and download georeferenced marine data collected
                            by autonomous surface vehicles, drones, and more ...
                        </p>
                        <p className="text-lg text-pearl-100 max-w-3xl mx-auto">
                            Seatizen Monitoring is the interface with the Seatizen Atlas Database.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-ocean-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="text-3xl font-bold text-ocean-600 mb-2">300+</div>
                            <div className="text-deepteal-700">Sessions</div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-sage-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="text-3xl font-bold text-sage-600 mb-2">2M+</div>
                            <div className="text-deepteal-700">Images</div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-deepteal-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="text-3xl font-bold text-deepteal-600 mb-2">12TB</div>
                            <div className="text-deepteal-700">Data</div>
                        </div>
                    </div>

                    <p className="text-lg text-deepteal-800 mb-8">
                        From autonomous surface vehicles to AI-powered habitat mapping, discover lagoon ecosystems like
                        never before
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link
                            href="/explorer"
                            className="bg-gradient-to-r from-ocean-500 to-ocean-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-ocean-600 hover:to-ocean-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            <Eye className="w-5 h-5" />
                            Explore Data Now
                        </Link>
                        <Link
                            href="https://doi.org/10.5281/zenodo.11125847"
                            target="_blank"
                            className="bg-white/80 backdrop-blur-sm text-deepteal-700 px-8 py-4 rounded-full text-lg font-semibold border border-deepteal-300 hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            <Download className="w-5 h-5" />
                            Explore Dataset
                        </Link>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-6 py-16">
                {/* What is a Session Section */}
                <section className="py-20 bg-gradient-to-r from-pearl-100 to-cream-100" id="sessions">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-deepteal-600 mb-6">What is a Session?</h2>
                                <p className="text-lg text-deepteal-700 mb-6 leading-relaxed">
                                    A <strong>session</strong> corresponds to a single data collection mission. We start
                                    the platform (ASV, drone, diver), upload a predefined survey plan, let it execute
                                    the mission, and stop once it returns to the starting point.
                                </p>
                                <p className="text-lg text-sage-600 mb-6 leading-relaxed">
                                    This allows for <strong>consistent, repeatable acquisitions</strong> across time and
                                    space, which is essential for long-term ecological monitoring.
                                </p>
                                <p className="text-lg text-deepteal-600 leading-relaxed">
                                    All sessions are stored in a <strong>unified directory structure</strong>,
                                    regardless of how the data was collected, and archived on <strong>Zenodo</strong>{" "}
                                    for open access.
                                </p>
                            </div>
                            <div className="space-y-4">
                                {/* Image placeholder */}
                                <div className="bg-gray-300 rounded-2xl h-48 flex items-center justify-center border border-gray-400">
                                    <span className="text-gray-600 font-medium">Session Workflow Image</span>
                                </div>
                                <div className="bg-gradient-to-br from-ocean-100 to-sage-100 rounded-2xl p-6 border border-ocean-200 shadow-lg">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <div className="w-14 h-14 bg-ocean-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Waves className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="text-sm text-deepteal-700">ASV Platform</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-14 h-14 bg-sage-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Camera className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="text-sm text-deepteal-700">Drone Surveys</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-14 h-14 bg-deepteal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Fish className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="text-sm text-deepteal-700">SCUBA Divers</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-14 h-14 bg-cream-700 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Archive className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="text-sm text-deepteal-700">Zenodo Archive</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Data Available Section */}
                <section className="py-20" id="data">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-deepteal-600 mb-6">What Data is Available?</h2>
                            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
                                SeatizenAtlas provides both raw and processed data
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 mb-12">
                            {/* Image placeholder */}
                            <div className="bg-gray-300 rounded-3xl h-64 flex items-center justify-center border border-gray-400">
                                <span className="text-gray-600 font-medium">Data Collection Image</span>
                            </div>

                            {/* Raw Data */}
                            <div className="bg-gradient-to-br from-ocean-50 to-ocean-100 rounded-3xl p-8 border border-ocean-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-ocean-500 rounded-xl flex items-center justify-center mr-4">
                                        <Database className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-ocean-700">Raw Data</h3>
                                </div>
                                <p className="text-ocean-600 mb-4">Direct output from acquisition platforms.</p>
                                <div className="text-sm text-ocean-500 bg-ocean-50 p-4 rounded-lg">
                                    <p className="font-medium mb-2">Privacy Protection:</p>
                                    <p>
                                        Some ASV and citizen science data are not public to protect privacy — for
                                        example, beachgoers may appear in GoPro images.
                                    </p>
                                </div>
                            </div>

                            {/* Processed Data */}
                            <div className="bg-gradient-to-br from-sage-50 to-sage-100 rounded-3xl p-8 border border-sage-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-sage-500 rounded-xl flex items-center justify-center mr-4">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-sage-700">Processed Data</h3>
                                </div>
                                <ul className="space-y-2 text-sage-600 mb-4">
                                    <li>
                                        • <strong>Photogrammetry</strong>
                                    </li>
                                    <li>
                                        • <strong>Georeferenced images</strong> (centimeter precision using PPK)
                                    </li>
                                    <li>
                                        • <strong>Bathymetric rasters</strong>
                                    </li>
                                    <li>
                                        • <strong>Metadata CSV files</strong>
                                    </li>
                                    <li>
                                        • <strong>AI prediction rasters</strong> (habitat classification, coral
                                        detection)
                                    </li>
                                </ul>
                                <div className="text-sm text-sage-500 bg-sage-50 p-4 rounded-lg">
                                    <p>
                                        All processed data stored in <strong>GeoPackage database</strong> (SQLite with
                                        spatial capabilities) and published on <strong>Zenodo</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-lg text-deepteal-600 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-deepteal-200 shadow-lg max-w-2xl mx-auto">
                                For more details, see our reference paper: <strong>SeatizenAtlas Nature</strong>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Explore Tools Section */}
                <section className="py-20 bg-gradient-to-r from-deepteal-50 to-ocean-50" id="explore">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-deepteal-600 mb-6">Explore the Data</h2>
                            <p className="text-xl text-deepteal-600 max-w-4xl mx-auto">
                                This makes it easy to understand <strong>where</strong>, <strong>when</strong>, and{" "}
                                <strong>what</strong> has been observed — from a single dive to a large-scale lagoon
                                mapping campaign.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
                            {/* Database Viewer */}
                            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-deepteal-100">
                                <div className="flex items-start ">
                                    <div className="w-14 h-14 bg-gradient-to-br from-deepteal-500 to-deepteal-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                        <Database className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold text-deepteal-700 mb-3">
                                            Database Viewer
                                        </h3>
                                        <p className="text-deepteal-600">
                                            Browse all sessions, filter by acquisition platform, date, or geographic
                                            extent. Export metadata, predictions, and model classes for further
                                            analysis.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Explorer */}
                            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-ocean-100">
                                <div className="flex items-start ">
                                    <div className="w-14 h-14 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                        <Map className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold text-ocean-700 mb-3">Map Explorer</h3>
                                        <p className="text-ocean-600">
                                            Visualize ASV and drone orthophotos, overlay prediction rasters, click to
                                            see predicted habitat labels or bathymetry values, and compare two areas
                                            side-by-side.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* ASV Explorer */}
                            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-sage-100">
                                <div className="flex items-start ">
                                    <div className="w-14 h-14 bg-gradient-to-br from-sage-500 to-sage-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                        <Waves className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold text-sage-700 mb-3">ASV Explorer</h3>
                                        <p className="text-sage-600">View ASV predictions by label and date.</p>
                                    </div>
                                </div>
                            </div>

                            {/* GCRMN & eDNA */}
                            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-cream-300">
                                <div className="flex items-start">
                                    <div className="w-14 h-14 bg-gradient-to-br from-cream-700 to-cream-800 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                        <Microscope className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold text-cream-800 mb-3">
                                            GCRMN & eDNA Points
                                        </h3>
                                        <p className="text-cream-700">
                                            Locate long-term monitoring sites (GCRMN) and eDNA sampling points with
                                            protocol details and results.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI Section */}
                <section className="py-20" id="ai">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-deepteal-600 mb-6">Artificial Intelligence</h2>
                            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
                                AI models are trained to help scale up analysis
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 mb-12">
                            {/* Image Classification */}
                            <div className="bg-gradient-to-br from-ocean-50 to-ocean-100 rounded-3xl p-8 border border-ocean-200 shadow-xl">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-ocean-500 rounded-xl flex items-center justify-center mr-4">
                                        <Cpu className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-ocean-700">
                                        Multilabel Image Classification
                                    </h3>
                                </div>
                                <div className="bg-gray-300 rounded-xl h-32 mb-6 flex items-center justify-center border border-gray-400">
                                    <span className="text-gray-600 font-medium">AI Classification Example</span>
                                </div>
                                <div className="space-y-3 text-ocean-600">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-ocean-500 rounded-full mr-3"></div>
                                        <span>
                                            <strong>14,492</strong> ASV & SCUBA images manually annotated using FiftyOne
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-ocean-500 rounded-full mr-3"></div>
                                        <span>
                                            Fine-tuned <strong>DINOv2 Transformers</strong> for multilabel predictions
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Drone Data */}
                            <div className="bg-gradient-to-br from-sage-50 to-sage-100 rounded-3xl p-8 border border-sage-200 shadow-xl">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-sage-500 rounded-xl flex items-center justify-center mr-4">
                                        <Camera className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-sage-700">Drone Data</h3>
                                </div>
                                <div className="bg-gray-300 rounded-xl h-32 mb-6 flex items-center justify-center border border-gray-400">
                                    <span className="text-gray-600 font-medium">Drone Analysis Example</span>
                                </div>
                                <div className="space-y-3 text-sage-600">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-sage-500 rounded-full mr-3"></div>
                                        <span>
                                            Used ASV predictions as <em>pseudo-labels</em> for drone orthophotos
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-sage-500 rounded-full mr-3"></div>
                                        <span>
                                            <strong>Multilabel classification</strong>:{" "}
                                            <a
                                                href="https://doi.org/10.1016/j.ecoinf.2025.103149"
                                                className="text-sage-700 underline"
                                            >
                                                Publication
                                            </a>
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-sage-500 rounded-full mr-3"></div>
                                        <span>
                                            <strong>Weakly supervised semantic segmentation</strong> to generate habitat
                                            maps:{" "}
                                            <a
                                                href="http://dx.doi.org/10.48550/arXiv.2508.18958"
                                                className="text-sage-700 underline"
                                            >
                                                arXiv link
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* AI Approach */}
                            <div className="bg-gradient-to-br from-deepteal-50 to-deepteal-100 rounded-3xl p-8 border border-deepteal-200 shadow-xl">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-deepteal-500 rounded-xl flex items-center justify-center mr-4">
                                        <BarChart3 className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-deepteal-700">Integrated Approach</h3>
                                </div>
                                <div className="bg-gray-300 rounded-xl h-32 mb-6 flex items-center justify-center border border-gray-400">
                                    <span className="text-gray-600 font-medium">Scale Comparison Chart</span>
                                </div>
                                <p className="text-deepteal-600 leading-relaxed">
                                    This approach allows us to combine the <strong>precision of ASV surveys</strong>{" "}
                                    with the <strong>coverage of drones</strong>, producing detailed ecological maps at
                                    scale.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Background Section */}
                <section className="py-20 bg-gradient-to-r from-pearl-100 to-beige-100" id="projects">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-deepteal-600 mb-6">Project Background</h2>
                            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
                                Three innovative projects driving marine monitoring technology forward
                            </p>
                        </div>

                        <div className="space-y-12">
                            {/* SEATIZEN */}
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-ocean-200">
                                    <div className="flex items-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-xl flex items-center justify-center mr-4 text-white text-xl font-bold">
                                            S
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-ocean-700">SEATIZEN</h3>
                                            <p className="text-ocean-600 font-semibold">(2020–2022)</p>
                                        </div>
                                    </div>
                                    <p className="text-ocean-600 mb-4 text-lg leading-relaxed">
                                        Development of a <strong>citizen science underwater device</strong> combining a
                                        GoPro and GPS.
                                    </p>
                                    <p className="text-ocean-600 mb-6 leading-relaxed">
                                        <strong>Goal:</strong> make lagoon monitoring accessible to the public.
                                    </p>
                                    <a
                                        href="https://ocean-indien.ifremer.fr/Projets/Innovations-technologiques/SEATIZEN-2020-2022"
                                        className="inline-flex items-center text-ocean-700 font-semibold hover:text-ocean-800 transition-colors"
                                    >
                                        Learn more <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                </div>
                                <div className="bg-gray-300 rounded-3xl h-64 flex items-center justify-center border border-gray-400">
                                    <span className="text-gray-600 font-medium">SEATIZEN Device Photo</span>
                                </div>
                            </div>

                            {/* PLANCHA */}
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                <div className="bg-gray-300 rounded-3xl h-64 flex items-center justify-center border border-gray-400 lg:order-1">
                                    <span className="text-gray-600 font-medium">PLANCHA ASV Photo</span>
                                </div>
                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-sage-200 lg:order-2">
                                    <div className="flex items-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-sage-500 to-sage-600 rounded-xl flex items-center justify-center mr-4 text-white text-xl font-bold">
                                            P
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-sage-700">PLANCHA</h3>
                                            <p className="text-sage-600 font-semibold">(2021–2023)</p>
                                        </div>
                                    </div>
                                    <p className="text-sage-600 mb-4 text-lg leading-relaxed">
                                        Development of an <strong>instrumented autonomous surface vehicle (ASV)</strong>{" "}
                                        with:
                                    </p>
                                    <ul className="space-y-2 text-sage-600 mb-4">
                                        <li>• Differential GPS (centimeter accuracy)</li>
                                        <li>• Autopilot & twin motors</li>
                                        <li>• Single-beam echosounder</li>
                                        <li>• GoPro camera</li>
                                    </ul>
                                    <p className="text-sage-600 mb-4 leading-relaxed">
                                        This platform maps <strong>~3,000 m²</strong> in 1 hour, capturing GoPro images
                                        down to 10 m depth and bathymetry up to 100 m depth. Drone flights are performed
                                        simultaneously for comparison.
                                    </p>
                                    <a
                                        href="https://ocean-indien.ifremer.fr/en/Projects/Technological-innovations/PLANCHA-2021-2023"
                                        className="inline-flex items-center text-sage-700 font-semibold hover:text-sage-800 transition-colors"
                                    >
                                        Learn more <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                </div>
                            </div>

                            {/* PPUMPIT */}
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-deepteal-200">
                                    <div className="flex items-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-deepteal-500 to-deepteal-600 rounded-xl flex items-center justify-center mr-4 text-white text-xl font-bold">
                                            PP
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-deepteal-700">PPUMPIT</h3>
                                            <p className="text-deepteal-600 font-semibold">DNA-sampling catamaran</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Partner Carousel */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold text-deepteal-800 text-center mb-12">
                        Research Partners & Collaborators
                    </h2>

                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-pearl-200">
                        <div className="relative">
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    onClick={prevSlide}
                                    className="p-2 rounded-full bg-pearl-100 hover:bg-pearl-200 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6 text-pearl-600" />
                                </button>
                                <h3 className="text-lg font-semibold text-pearl-700">Collaborative Network</h3>
                                <button
                                    onClick={nextSlide}
                                    className="p-2 rounded-full bg-pearl-100 hover:bg-pearl-200 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6 text-pearl-600" />
                                </button>
                            </div>

                            <div className="overflow-hidden">
                                <div
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${currentLogoSlide * 100}%)` }}
                                >
                                    {Array.from({ length: Math.ceil(partnerLogos.length / 4) }).map((_, slideIndex) => (
                                        <div key={slideIndex} className="w-full flex-shrink-0">
                                            <div className="grid grid-cols-4 gap-8 items-center">
                                                {partnerLogos
                                                    .slice(slideIndex * 4, slideIndex * 4 + 4)
                                                    .map((partner, index) => (
                                                        <div key={index} className="flex flex-col items-center">
                                                            <div className="w-20 h-20 bg-pearl-100 rounded-xl flex items-center justify-center mb-2 hover:bg-pearl-200 transition-colors">
                                                                <img src={partner.logo} alt={`Logo ${partner.name}`} />
                                                            </div>
                                                            <span className="text-xs text-pearl-500 text-center">
                                                                {partner.name}
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Carousel indicators */}
                            <div className="flex justify-center mt-6 space-x-2">
                                {Array.from({ length: Math.ceil(partnerLogos.length / 4) }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentLogoSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-colors ${
                                            index === currentLogoSlide ? "bg-deepteal-600" : "bg-pearl-300"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
        </div>
    );
}
