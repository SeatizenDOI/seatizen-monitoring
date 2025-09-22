import Link from "next/link";
import React from "react";
import {
    Database,
    Map,
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
} from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#F9F7F4]">
            {/* Header */}
            <header className="relative bg-gradient-to-br from-[#4A7A85] to-[#3a6670] text-[#F9F7F4] overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0 bg-repeat animate-pulse"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

                <div className="relative z-10 container mx-auto px-6 py-20">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="mb-6">
                            <Waves className="w-16 h-16 mx-auto mb-4 text-[#F9F7F4]" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Ocean Monitoring Initiative
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 font-light opacity-90">
                            Advanced Marine Research & Conservation Platform
                        </p>
                        <p className="text-lg mb-10 opacity-80 max-w-3xl mx-auto">
                            Comprehensive underwater mapping, coral reef monitoring, and marine biodiversity analysis
                            using cutting-edge ASV technology, satellite imagery, and AI-powered data processing to
                            protect our ocean ecosystems for future generations.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/explorer"
                                className="inline-flex items-center px-8 py-4 bg-[#F9F7F4] text-[#4A7A85] font-semibold rounded-xl hover:bg-white transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <Map className="w-5 h-5 mr-2" />
                                Explore Map Data
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                            <a
                                href="/database"
                                className="inline-flex items-center px-8 py-4 border-2 border-[#F9F7F4] text-[#F9F7F4] font-semibold rounded-xl hover:bg-[#F9F7F4] hover:text-[#4A7A85] transition-all duration-300"
                            >
                                <Database className="w-5 h-5 mr-2" />
                                Access Database
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-16">
                {/* About Section */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold text-[#4A7A85] text-center mb-12">
                        Revolutionizing Marine Research
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <Camera className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Underwater Orthophotography</h3>
                            <p className="text-gray-600">
                                High-resolution underwater imagery captured by autonomous surface vehicles (ASV)
                                providing detailed visual documentation of coral reefs and marine habitats.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                <Microscope className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">eDNA Analysis</h3>
                            <p className="text-gray-600">
                                Environmental DNA sampling and analysis to detect marine species presence, biodiversity
                                assessment, and ecosystem health monitoring across research sites.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                                <BarChart3 className="w-6 h-6 text-teal-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Bathymetric Mapping</h3>
                            <p className="text-gray-600">
                                Precise seafloor topography mapping and temporal comparison analysis to track changes in
                                marine environments and coral reef structures over time.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Research Partners */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold text-[#4A7A85] text-center mb-12">
                        Research Partners & Collaborators
                    </h2>

                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                            {/* Placeholder logos - replace with actual partner logos */}
                            <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
                                <span className="text-gray-500 font-semibold">GCRMN</span>
                            </div>
                            <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
                                <span className="text-gray-500 font-semibold">IFREMER</span>
                            </div>
                            <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
                                <span className="text-gray-500 font-semibold">CNRS</span>
                            </div>
                            <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center">
                                <span className="text-gray-500 font-semibold">IGN</span>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-gray-600 max-w-3xl mx-auto">
                                Our collaborative research network includes leading marine research institutions,
                                government agencies, and conservation organizations working together to advance ocean
                                science and marine ecosystem protection.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Key Features */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold text-[#4A7A85] text-center mb-12">Platform Capabilities</h2>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-[#4A7A85] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Globe className="w-5 h-5 text-[#4A7A85]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Interactive Map Explorer</h3>
                                    <p className="text-gray-600">
                                        Browse and compare multiple data layers including bathymetry, habitat maps, and
                                        orthophotography with advanced visualization tools.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-[#4A7A85] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <MapPin className="w-5 h-5 text-[#4A7A85]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Research Site Database</h3>
                                    <p className="text-gray-600">
                                        Comprehensive database of monitoring locations with detailed metadata, sampling
                                        protocols, and historical data records.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-[#4A7A85] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Satellite className="w-5 h-5 text-[#4A7A85]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Temporal Analysis</h3>
                                    <p className="text-gray-600">
                                        Compare changes over time with multi-year dataset comparisons and trend analysis
                                        for long-term ecosystem monitoring.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-xl font-semibold mb-6 text-gray-800">Latest Research Updates</h3>
                            <div className="space-y-4">
                                <div className="border-l-4 border-[#4A7A85] pl-4">
                                    <h4 className="font-medium text-gray-800">Coral Health Assessment 2023-2025</h4>
                                    <p className="text-sm text-gray-600">
                                        Comparative analysis of coral coverage changes
                                    </p>
                                </div>
                                <div className="border-l-4 border-blue-400 pl-4">
                                    <h4 className="font-medium text-gray-800">eDNA Biodiversity Mapping</h4>
                                    <p className="text-sm text-gray-600">Species presence and abundance monitoring</p>
                                </div>
                                <div className="border-l-4 border-green-400 pl-4">
                                    <h4 className="font-medium text-gray-800">ASV Technology Integration</h4>
                                    <p className="text-sm text-gray-600">Advanced underwater imaging systems</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <a
                                    href="/research"
                                    className="inline-flex items-center text-[#4A7A85] hover:text-[#3a6670] font-medium"
                                >
                                    View all research updates
                                    <ExternalLink className="w-4 h-4 ml-1" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Access */}
                <section className="mb-20">
                    <div className="bg-gradient-to-r from-[#4A7A85] to-[#3a6670] rounded-2xl p-8 md:p-12 text-[#F9F7F4] text-center">
                        <Fish className="w-16 h-16 mx-auto mb-6 opacity-80" />
                        <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                            Access our comprehensive marine research platform and contribute to ocean conservation
                            efforts.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/explorer"
                                className="inline-flex items-center px-6 py-3 bg-white text-[#4A7A85] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <Map className="w-5 h-5 mr-2" />
                                Map Explorer
                            </a>
                            <a
                                href="/database"
                                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#4A7A85] transition-colors"
                            >
                                <Database className="w-5 h-5 mr-2" />
                                Research Database
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
