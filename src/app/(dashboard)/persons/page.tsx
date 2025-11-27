import { getUsers } from "@/actions/persons";
import Link from "next/link";
import DeleteUserButton from "@/components/DeleteUserButton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const UsersPage = async () => {
  const users = await getUsers();
  return (

    <div className="p-8 space-y-6 max-w-4xl mx-auto mt-0">
      <h1 className="text-2xl font-bold text-center">Users</h1>
      <Link
        href="/persons/add"
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="flex gap-2">
                <Link
                  href={`/persons/update/${user.id}`}
                  className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500"
                >
                  Update
                </Link>

                <Link
                  href={`/persons/details/${user.id}`}
                  className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 ml-2"
                >
                  Detail
                </Link>
                <DeleteUserButton userId={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
};

export default UsersPage;