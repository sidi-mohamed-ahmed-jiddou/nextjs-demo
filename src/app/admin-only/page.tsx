import { requireRole } from "@/lib/rbac";

export default async function AdminOnlyPage() {
    await requireRole("admin");

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Admin Only Page</h1>
            <p>If you can see this, you are an admin.</p>
        </div>
    );
}
