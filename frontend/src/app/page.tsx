import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h2>Hello</h2>

            <Link href={"/exporter"}>Exporter</Link>
            <Link href={"/explorer"}>Explorer</Link>
            <Link href={"/explorer-asv"}>Explorer ASV</Link>
        </div>
    );
}
