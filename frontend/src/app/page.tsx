import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1 className="text-9xl text-deepteal-900 font-black font-outfit">Hello</h1>
            <h2 className="text-9xl text-pearl-300 font-bold font-outfit">Hello</h2>
            <h3 className="text-9xl font-medium text-primary">Hello</h3>
            <h4 className="text-9xl font-normal">Hello</h4>
            <h5 className="text-9xl font-light">Hello</h5>
            <h6 className="text-9xl font-thin">Hello</h6>

            <span>Hello</span>
            <p>Hello</p>
            <code>Hello</code>

            <Link href={"/exporter"}>Exporter</Link>
            <Link href={"/explorer"}>Explorer</Link>
            <Link href={"/explorer-asv"}>Explorer ASV</Link>
        </div>
    );
}
