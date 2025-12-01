import { getUserById } from "@/actions/persons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const UserDetailsPage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    const userId = parseInt(id, 10);
    const result = await getUserById(userId);

    if (!result || result.error || !result.data) {
        return (
            <Card className="w-full max-w-sm mx-auto mt-10">
                <CardHeader>
                    <CardTitle>User Not Found</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-center">
                    <Button asChild variant="secondary">
                        <Link href="/users">Back to users</Link>
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    const user = result.data;

    return (
        <Card className="w-full max-w-sm mx-auto mt-16">
            <CardHeader className="mb-4">
                <CardTitle>User Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                </div>

                <p className="font-bold text-xl">Email: {user.email}</p>

                <p className="font-bold text-xl">Role: {user.role}</p>
            </CardContent>

            <CardFooter className="flex justify-center">
                <Button asChild variant="secondary">
                    <Link href="/persons">Back to List of users</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default UserDetailsPage;