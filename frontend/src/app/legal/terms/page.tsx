import { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
    title: "Terms",
    description: "Terms",
};

export default function TermsPage() {
    return (
        <LegalPageLayout title="Terms of Use">
            <section>
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Acceptance of Terms</h2>
                <p>By using this website, you agree to be bound by these Terms of Use.</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Intellectual Property</h2>
                <p>
                    All content (text, images, logos, etc.) is protected by copyright. You may not reproduce or
                    distribute content without permission.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Liability</h2>
                <p>
                    We strive to provide accurate information but disclaim responsibility for errors, omissions, or
                    interruptions.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Governing Law</h2>
                <p>These Terms are governed by French law.</p>
            </section>
        </LegalPageLayout>
    );
}
