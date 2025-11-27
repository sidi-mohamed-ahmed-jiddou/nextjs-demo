import { authClient } from "@/lib/auth-client";

export function Logout() {
    const handleLogout = async () => {
        await authClient.signOut();
    }
    
}