export default function DashboardPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Person Management</h2>
                    <p className="text-gray-600">Manage your users and personnel here.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Product Catalog</h2>
                    <p className="text-gray-600">View and update your product inventory.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Blog Posts</h2>
                    <p className="text-gray-600">Create and edit your blog posts.</p>
                </div>
            </div>
        </main>
    );
}