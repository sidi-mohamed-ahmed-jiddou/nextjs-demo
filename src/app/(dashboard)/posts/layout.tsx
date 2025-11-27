import { AddPostForm } from '@/components/AddPostForm'

export default function PostsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ASIDE */}
            <aside className="md:col-span-1 border-r pr-4 mt-20 p-20">
                <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
                <AddPostForm />
            </aside>

            {/* MAIN CONTENT */}
            <main className="md:col-span-2">{children}</main>
        </div>
    )
}
