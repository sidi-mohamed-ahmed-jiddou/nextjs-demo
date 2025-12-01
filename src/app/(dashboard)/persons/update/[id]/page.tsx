import { getUserById } from "@/actions/persons";
import UpdateUserForm from "@/components/UpdatePersonForm";

const UpdateUserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const userId = parseInt(id, 10);
  const result = await getUserById(userId);

  if (!result || result.error || !result.data) {
    return <div>User not found</div>;
  }

  const user = result.data;

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold text-blue-400 mb-4">Update User</h1>
      <UpdateUserForm user={user} />
    </div>
  );
};

export default UpdateUserPage;