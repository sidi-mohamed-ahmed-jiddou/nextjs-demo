"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function DashboardHeader() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const isAdmin = session?.user?.role === "admin";

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged out successfully");
                    router.push("/login");
                },
            },
        });
    };

    if (isPending) {
        return (
            <header className="bg-white text-gray-800 shadow-lg sticky top-0 z-50">
                <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-2xl font-bold">My APP</div>
                    <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
                </nav>
            </header>
        );
    }

    return (
        <header className="bg-white text-gray-800 shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="text-2xl font-bold">My APP</div>
                <ul className="flex gap-6 items-center">
                    <li>
                        <Link href={isAdmin ? "/admin/persons" : "/persons"} className="px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition duration-300 font-medium">
                            Persons
                        </Link>
                    </li>
                    <li>
                        <Link href={isAdmin ? "/admin/products" : "/products"} className="px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition duration-300 font-medium">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link href={isAdmin ? "/admin/posts" : "/posts"} className="px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition duration-300 font-medium">
                            Posts
                        </Link>
                    </li>
                    <li>
                        <Button onClick={handleLogout} variant="outline">
                            Logout <LogOut className="size-4" />
                        </Button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}