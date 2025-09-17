import fs from "fs";
import path from "path";
import { Metadata } from "next";

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
        </main>
    );
}
