export default function LegalPageLayout({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-outfit font-bold text-primary-600 mb-8">{title}</h1>
            <div className="space-y-6 text-gray-700 leading-relaxed">{children}</div>
        </main>
    );
}
