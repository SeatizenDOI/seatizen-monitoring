import { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
    title: "Legal Notice",
    description: "Legal Notice",
};

export default function LegalNoticePage() {
    return (
        <LegalPageLayout title="Legal Notice">
            <section>
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Publisher</h2>
                <p>
                    <strong>Ifremer DOI</strong>
                    <br />
                    Rue Jean Bertho, BP60 97822 - LE PORT CEDEX
                    <br />
                    Email:{" "}
                    <a href="mailto:seatizen.ifremer@gmail.com" className="text-primary-600 underline">
                        seatizen.ifremer@gmail.com
                    </a>
                    <br />
                    Phone: +262 2 62 43 36 84
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Company Information</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Legal form: ETI</li>
                    <li>RCS: Brest 330715368</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Website Host</h2>
                <p>
                    <strong>OVH</strong>
                    <br />
                    2, rue Kellermann, 59100 Roubaix.
                    <br />
                    Website:{" "}
                    <a href="https://www.ovhcloud.com" className="text-primary-600 underline">
                        https://www.ovhcloud.com
                    </a>
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary-500 mb-2">Jurisdiction</h2>
                <p>
                    This website is governed by French law. Any dispute shall be brought before the competent courts of
                    France.
                </p>
            </section>
        </LegalPageLayout>
    );
}
