export default function Loading() {
    return (
        <div className="space-y-4 p-6">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className="animate-pulse p-4 border rounded-xl shadow-sm bg-white"
                >
                    <div className="h-4 w-1/3 bg-gray-200 rounded mb-3" />
                    <div className="h-3 w-full bg-gray-200 rounded mb-2" />
                    <div className="h-3 w-2/3 bg-gray-200 rounded" />
                </div>
            ))}
        </div>
    )
}
