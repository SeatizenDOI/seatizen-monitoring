export default function SpinningLoader() {
    return (
        <div className="flex w-full items-center justify-center bg-gray-50">
            <div className="text-center space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-deepteal-400">Loading ...</h2>

                    <div className="flex gap-6 items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-deepteal-100 border-t-transparent rounded-full animate-spin mx-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
