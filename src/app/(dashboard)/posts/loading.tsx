import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="p-8 space-y-6 max-w-7xl mx-auto mt-0">
            <div className="flex flex-col space-y-2 mb-8">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-5 w-64" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="flex flex-col p-6 bg-white border rounded-xl shadow-sm h-[200px]"
                    >
                        <Skeleton className="h-7 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3 mb-4" />
                        <div className="mt-auto pt-4 border-t border-gray-100">
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
