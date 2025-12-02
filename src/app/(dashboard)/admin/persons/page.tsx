import { getPersons } from "@/actions/persons";
import Link from "next/link";
import DeleteUserButton from "@/components/DeletePersonButton";
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

    <div className="p-8 space-y-6 max-w-4xl mx-auto mt-0">
      <h1 className="text-2xl font-bold text-center">Users</h1>
      <Link
        href="/admin/persons/add"
        className="px-4 py-2 my-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add User
      </Link>

      <Table className="mt-4">
        <TableCaption>List of users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {persons?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="flex gap-2">
                <Link
                  href={`/admin/persons/update/${user.id}`}
                  className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500"
                >
                  Update
                </Link>

                <Link
                  href={`/admin/persons/details/${user.id}`}
                  className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 ml-2"
                >
                  Detail
                </Link>
                <DeleteUserButton personId={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
};

export default PersonsPage;