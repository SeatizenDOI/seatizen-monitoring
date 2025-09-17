import { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact",
};

export default function ContactPage() {
    return (
        <LegalPageLayout title="Contact Us">
            <p>If you have questions or wish to exercise your data rights, you can reach us at:</p>
            <ul className="list-none space-y-1">
                <li>
                    Email:{" "}
                    <a href="mailto:seatizen.ifremer@gmail.com" className="text-primary-600 underline">
                        seatizen.ifremer@gmail.com
                    </a>
                </li>
                <li>Address: Ifremer La Réunion Rue Jean Bertho, BP60 97822 - LE PORT CEDEX</li>
                <li>Phone: +262 2 62 42 03 40</li>
            </ul>
        </LegalPageLayout>
    );
}
