import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export type Permission = "create:post" | "read:post" | "update:post" | "delete:post" | "create:product" | "read:product" | "update:product" | "delete:product" | "create:person" | "read:person" | "update:person" | "delete:person";

const ROLES: Record<string, Permission[]> = {
    admin: ["create:post", "read:post", "update:post", "delete:post", "create:product", "read:product", "update:product", "delete:product", "create:person", "read:person", "update:person", "delete:person"],
    user: ["read:post", "read:product", "read:person"],
};

export async function checkPermission(permission: Permission) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return { success: false, error: "Unauthorized" };
    }

    const userRole = session.user.role as keyof typeof ROLES;
    const permissions = ROLES[userRole] || [];

    if (!permissions.includes(permission)) {
        return { success: false, error: "You are not allowed to perform this action" };
    }

    return { success: true };
}

export async function requireRole(role: "admin" | "user") {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== role) {
        redirect("/");
    }

    return session;
}
