import { getPersons } from "@/actions/persons";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const PersonsPage = async () => {
    const { data: persons, success, message } = await getPersons();

    if (!success) {
        return (
            <div className="w-full h-screen flex justify-center">
                <div className="p-8 space-y-6 w-full max-w-lg">
                    <Alert variant="destructive" className="border-l-4 border-red-500 shadow-lg rounded-xl">
                        <AlertCircleIcon className="h-5 w-5 text-red-600" />
                        <AlertTitle className="text-xl font-semibold">Erreur !</AlertTitle>
                        <AlertDescription className="text-base">
                            <p>{message}</p>
                            <p> Verify your connection and try again.</p>
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-6 max-w-5xl mx-auto mt-0">
            <div className="flex flex-col space-y-2 text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Users Directory</h1>
                <p className="text-gray-500">View user information.</p>
            </div>

            <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
                <div className="p-6">
                    <Table>
                        <TableCaption>A list of all registered users.</TableCaption>
                        <TableHeader>
                            <TableRow className="bg-gray-50 hover:bg-gray-50">
                                <TableHead className="font-semibold text-gray-900">Name</TableHead>
                                <TableHead className="font-semibold text-gray-900">Email</TableHead>
                                <TableHead className="font-semibold text-gray-900">Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {persons?.map((user) => (
                                <TableRow key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell className="text-gray-600">{user.email}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin'
                                                ? 'bg-purple-100 text-purple-800'
                                                : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default PersonsPage;
