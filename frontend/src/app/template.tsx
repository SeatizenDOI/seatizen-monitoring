export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col justify-between">
            <div>{children}</div>
        </div>
    );
}