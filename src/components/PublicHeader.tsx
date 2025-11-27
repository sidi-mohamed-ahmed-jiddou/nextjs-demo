import Link from 'next/link';

export default function PublicHeader() {
    return (
        <header className="bg-white text-gray-800 shadow-lg sticky top-0 z-50 w-full">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="text-2xl font-bold">My APP</div>
                <ul className="flex gap-6">
                    <li>
                        <Link href="/login" className="px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition duration-300 font-medium">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link href="/register" className="px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition duration-300 font-medium">
                            Register
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
