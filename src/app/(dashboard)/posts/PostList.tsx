'use client'

import { getPosts } from '@/actions/posts'
import { useQuery } from '@tanstack/react-query'

export default function PostList() {
    const { data } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    })

    return (
        <div className="p-8 space-y-6 max-w-7xl mx-auto mt-0">
            <div className="flex flex-col space-y-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Latest Posts</h1>
                <p className="text-gray-500">Read the latest updates and articles.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(data) ? data.map((post: { id: number; title: string; content: string }) => (
                    <div
                        key={post.id}
                        className="group flex flex-col p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-100"
                    >
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
                            {post.content}
                        </p>
                        <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                            <span>Read more &rarr;</span>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No posts found.
                    </div>
                )}
            </div>
        </div>
    )
}
