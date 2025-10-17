import fs from "fs";
import path from "path";
import { Metadata } from "next";
import Workflow from "@/components/Workflow";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Publications",
    description: "Scientific publications ",
};

type Publication = {
    citation: string;
    doi: string;
    category: string;
};

// Load publications at build time (SSG)
async function getPublications(): Promise<Publication[]> {
    const filePath = path.join(process.cwd(), "public/publications.json");
    const data = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

export default async function PublicationsPage() {
    const publications = await getPublications();
    const categories = ["Data Descriptor", "Artificial Intelligence", "eDNA"];

    return (
        <main className="flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold mb-10 text-center">Related Publications by Category</h1>

            <div className="flex flex-col gap-12 max-w-4xl w-full">
                {categories.map((category) => {
                    const pubs = publications.filter((p) => p.category === category);
                    if (pubs.length === 0) return null;

                    return (
                        <section key={category}>
                            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {pubs.map((pub, i) => (
                                    <div
                                        key={i}
                                        className="rounded-2xl shadow-lg p-5 bg-white border border-gray-200 hover:shadow-xl transition"
                                    >
                                        <p className="text-foreground mb-2">
                                            <strong>{pub.citation}</strong>
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            DOI:{" "}
                                            <a
                                                href={pub.doi}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary-400 hover:underline"
                                            >
                                                {pub.doi}
                                            </a>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

            <div className="my-48 border-2 rounded-xl relative p-12 flex items-center justify-center bg-gradient-to-br from-deepteal-200 to-ocean-800 text-cream-50">
                <div className="relative text-center px-6 max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-6xl font-bold text-background bg-clip-text mb-6 leading-tight">
                            Join the Seatizen Atlas Community
                        </h1>
                        <p className="text-xl md:text-2xl text-beige-200 max-w-4xl mx-auto leading-relaxed mb-12">
                            Discover, visualize, and download the data produced by the Seatizen Team. Access
                            georeferenced frames, habitat predictions, and more.
                        </p>
                        <Link
                            href="https://zenodo.org/communities/seatizen-data/"
                            target="_blank"
                            className="bg-gradient-to-r from-ocean-500 to-ocean-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-ocean-600 hover:to-ocean-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl "
                        >
                            Join us
                        </Link>
                    </div>
                </div>
            </div>

            <Workflow />
        </main>
    );
}
