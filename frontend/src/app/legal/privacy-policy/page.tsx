import { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
    title: "Privacy policy",
    description: "Privacy policy",
};

export default function PrivacyPolicyPage() {
    return (
        <LegalPageLayout title="Privacy Policy">
            <section>
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Introduction</h2>
                <p>
                    We take the protection of your personal data seriously. This Privacy Policy explains what personal
                    data we collect, how we use it, and your rights under the GDPR.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Data Controller</h2>
                <p>
                    The data controller is <strong>Ifremer DOI</strong>. Contact:{" "}
                    <a href="mailto:seatizen.ifremer@gmail.com" className="text-primary-600 underline">
                        seatizen.ifremer@gmail.com
                    </a>
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Data We Collect</h2>
                <p>We only collect personal data you provide through the contact page (name, email, message).</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Cookies</h2>
                <p>
                    This website does <strong>not use cookies or trackers</strong>.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Your Rights</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Right of access, rectification, and deletion</li>
                    <li>Right to restrict processing</li>
                    <li>Right to object</li>
                    <li>Right to data portability</li>
                </ul>
                <p>
                    You can exercise your rights by emailing:{" "}
                    <a href="mailto:seatizen.ifremer@gmail.com" className="text-primary-600 underline">
                        seatizen.ifremer@gmail.com
                    </a>
                </p>
            </section>
        </LegalPageLayout>
    );
}
