import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow access to public routes and auth API
    if (publicRoutes.includes(pathname) || pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith("/admin") && session.user.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
    runtime: "nodejs",
};
