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
} from "lucide-react";
import { divIcon } from "leaflet";

export default function Page() {
    // Logo carousel state
    const [currentLogoSlide, setCurrentLogoSlide] = useState(0);

    // Partner logos - replace with actual logos
    const partnerLogos = [
        { name: "IFREMER", logo: "IFREMER" },
        { name: "CNRS", logo: "CNRS" },
        { name: "IRD", logo: "IRD" },
        { name: "University of La Réunion", logo: "ULR" },
        { name: "GCRMN", logo: "GCRMN" },
        { name: "CRISP", logo: "CRISP" },
        { name: "PARETO", logo: "PARETO" },
        { name: "Marine Protected Areas", logo: "MPA" },
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
    return <div></div>;
    return (
        <div className="min-h-screen bg-cream-50">
            {/* Header */}
            <header className="relative bg-gradient-to-br from-deepteal-700 to-ocean-800 text-cream-50 overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0 bg-repeat animate-pulse"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 15c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15 0-8.284 6.716-15 15-15zm0 5c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

                <div className="relative z-10 container mx-auto px-6 py-20">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="mb-6">
                            <GiTurtleShell className="w-20 h-20 mx-auto mb-4 text-sage-300" />
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-cream-100">
                            Seatizen Monitoring
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 font-light opacity-90 text-beige-200">
                            Open-Source Marine Research & Conservation Platform
                        </p>
                        <p className="text-lg mb-10 opacity-80 max-w-3xl mx-auto text-pearl-200">
                            Comprehensive underwater mapping, coral reef monitoring, and marine biodiversity analysis
                            using cutting-edge ASV technology, citizen science, and collaborative research to protect
                            our ocean ecosystems through open data and transparent science.
                        </p>

                        {/* Open Source Badge */}
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex items-center px-4 py-2 bg-sage-600 bg-opacity-20 rounded-full border border-sage-400 border-opacity-30">
                                <Heart className="w-4 h-4 mr-2 text-sage-300" />
                                <span className="text-sage-200 font-medium">100% Open Source</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            <a
                                href="/explorer"
                                className="flex flex-col items-center p-6 bg-cream-100 bg-opacity-10 backdrop-blur-sm border border-cream-300 border-opacity-30 rounded-2xl hover:bg-opacity-20 transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <MdOutlineExplore className="w-8 h-8 mb-3 text-ocean-300" />
                                <span className="font-semibold text-cream-100">Explorer</span>
                            </a>
                            <a
                                href="/explorer-asv"
                                className="flex flex-col items-center p-6 bg-cream-100 bg-opacity-10 backdrop-blur-sm border border-cream-300 border-opacity-30 rounded-2xl hover:bg-opacity-20 transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <GiTurtleShell className="w-8 h-8 mb-3 text-sage-300" />
                                <span className="font-semibold text-cream-100">ASV Data</span>
                            </a>
                            <a
                                href="/exporter"
                                className="flex flex-col items-center p-6 bg-cream-100 bg-opacity-10 backdrop-blur-sm border border-cream-300 border-opacity-30 rounded-2xl hover:bg-opacity-20 transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <CiExport className="w-8 h-8 mb-3 text-deepteal-300" />
                                <span className="font-semibold text-cream-100">Exporter</span>
                            </a>
                            <a
                                href="/publications"
                                className="flex flex-col items-center p-6 bg-cream-100 bg-opacity-10 backdrop-blur-sm border border-cream-300 border-opacity-30 rounded-2xl hover:bg-opacity-20 transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <MdArticle className="w-8 h-8 mb-3 text-pearl-300" />
                                <span className="font-semibold text-cream-100">Publications</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-16">
                {/* Open Source Section */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <Github className="w-12 h-12 mx-auto mb-4 text-deepteal-600" />
                        <h2 className="text-4xl font-bold text-deepteal-800 mb-4">Built with Open Science</h2>
                        <p className="text-lg text-pearl-600 max-w-2xl mx-auto">
                            All our research, data, and code are freely available to the global scientific community
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-sage-200">
                            <div className="flex items-center mb-6">
                                <Code className="w-8 h-8 text-deepteal-600 mr-3" />
                                <h3 className="text-xl font-semibold text-pearl-800">Open Source Code</h3>
                            </div>
                            <p className="text-pearl-600 mb-6">
                                Access our complete codebase, contribute to development, and adapt our tools for your
                                research needs. Built with modern web technologies and best practices.
                            </p>
                            <a
                                href="https://github.com/SeatizenDOI"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-pearl-800 text-white rounded-lg hover:bg-pearl-700 transition-colors"
                            >
                                <Github className="w-5 h-5 mr-2" />
                                View on GitHub
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-ocean-200">
                            <div className="flex items-center mb-6">
                                <Database className="w-8 h-8 text-ocean-600 mr-3" />
                                <h3 className="text-xl font-semibold text-pearl-800">Seatizen Atlas DB</h3>
                            </div>
                            <p className="text-pearl-600 mb-6">
                                Comprehensive marine research database with standardized datasets, metadata, and
                                research protocols available through our DOI repository.
                            </p>
                            <a
                                href="https://doi.org/10.5281/zenodo.11125847"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition-colors"
                            >
                                <Database className="w-5 h-5 mr-2" />
                                Access Database
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Research Capabilities */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold text-deepteal-800 text-center mb-12">Research Capabilities</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-sage-50 to-sage-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-sage-200">
                            <div className="w-12 h-12 bg-sage-600 rounded-xl flex items-center justify-center mb-6">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-sage-800">ASV Underwater Imaging</h3>
                            <p className="text-sage-700">
                                High-resolution underwater orthophotography using autonomous surface vehicles for
                                detailed coral reef documentation and habitat mapping.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-ocean-50 to-ocean-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-ocean-200">
                            <div className="w-12 h-12 bg-ocean-600 rounded-xl flex items-center justify-center mb-6">
                                <Microscope className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-ocean-800">Citizen Science Integration</h3>
                            <p className="text-ocean-700">
                                Community-driven data collection and validation through standardized protocols, training
                                programs, and collaborative monitoring initiatives.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-deepteal-50 to-deepteal-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-deepteal-200">
                            <div className="w-12 h-12 bg-deepteal-600 rounded-xl flex items-center justify-center mb-6">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-deepteal-800">Temporal Analysis</h3>
                            <p className="text-deepteal-700">
                                Multi-year comparative studies tracking ecosystem changes, coral health, and
                                environmental impact assessment over time.
                            </p>
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
                                    <MdKeyboardArrowLeft className="w-6 h-6 text-pearl-600" />
                                </button>
                                <h3 className="text-lg font-semibold text-pearl-700">Collaborative Network</h3>
                                <button
                                    onClick={nextSlide}
                                    className="p-2 rounded-full bg-pearl-100 hover:bg-pearl-200 transition-colors"
                                >
                                    <MdKeyboardArrowRight className="w-6 h-6 text-pearl-600" />
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
                                                                <span className="text-pearl-600 font-semibold text-xs text-center">
                                                                    {partner.logo}
                                                                </span>
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

                {/* Publications Section */}
                <section className="mb-20">
                    <div className="bg-gradient-to-r from-deepteal-700 to-ocean-800 rounded-2xl p-8 md:p-12 text-cream-50">
                        <div className="flex items-center justify-center mb-6">
                            <BookOpen className="w-12 h-12 text-sage-300 mr-4" />
                            <h2 className="text-3xl font-bold">Scientific Publications</h2>
                        </div>
                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto text-center">
                            Explore our peer-reviewed research, methodologies, and findings contributing to marine
                            science and ocean conservation efforts worldwide.
                        </p>
                        <div className="text-center">
                            <a
                                href="/publications"
                                className="inline-flex items-center px-8 py-4 bg-cream-100 text-deepteal-800 font-semibold rounded-xl hover:bg-white transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <MdArticle className="w-5 h-5 mr-2" />
                                Browse Publications
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Quick Stats */}
                <section className="mb-20">
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-sage-200">
                            <div className="text-3xl font-bold text-sage-600 mb-2">500+</div>
                            <div className="text-sage-700">Monitoring Sites</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-ocean-200">
                            <div className="text-3xl font-bold text-ocean-600 mb-2">50TB</div>
                            <div className="text-ocean-700">Research Data</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-deepteal-200">
                            <div className="text-3xl font-bold text-deepteal-600 mb-2">25+</div>
                            <div className="text-deepteal-700">Publications</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-pearl-300">
                            <div className="text-3xl font-bold text-pearl-600 mb-2">100%</div>
                            <div className="text-pearl-700">Open Access</div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-pearl-800 text-pearl-300 py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center mb-4">
                                <GiTurtleShell className="w-8 h-8 mr-2 text-sage-400" />
                                <h3 className="text-xl font-bold text-white">Seatizen Monitoring</h3>
                            </div>
                            <p className="text-pearl-400 mb-4">
                                Open-source marine research platform advancing ocean conservation through collaborative
                                science and transparent data sharing.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="https://github.com/SeatizenDOI"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pearl-400 hover:text-sage-400 transition-colors"
                                >
                                    <Github className="w-6 h-6" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-white">Platform</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/explorer" className="hover:text-sage-400 transition-colors">
                                        Explorer
                                    </a>
                                </li>
                                <li>
                                    <a href="/explorer-asv" className="hover:text-sage-400 transition-colors">
                                        ASV Data Explorer
                                    </a>
                                </li>
                                <li>
                                    <a href="/exporter" className="hover:text-sage-400 transition-colors">
                                        Data Exporter
                                    </a>
                                </li>
                                <li>
                                    <a href="/publications" className="hover:text-sage-400 transition-colors">
                                        Publications
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="https://doi.org/10.5281/zenodo.11125847"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-sage-400 transition-colors"
                                    >
                                        Atlas Database
                                    </a>
                                </li>
                                <li>
                                    <a href="/api" className="hover:text-sage-400 transition-colors">
                                        API Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="/methodology" className="hover:text-sage-400 transition-colors">
                                        Methodology
                                    </a>
                                </li>
                                <li>
                                    <a href="/support" className="hover:text-sage-400 transition-colors">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-pearl-700 mt-8 pt-8 text-center">
                        <p className="text-pearl-400">
                            © 2024 Seatizen Monitoring. Open source marine research platform.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
