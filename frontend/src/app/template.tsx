import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col justify-between">
            <Header />
            <div className="mt-20">{children}</div>
            <Footer />
        </div>
    );
}
