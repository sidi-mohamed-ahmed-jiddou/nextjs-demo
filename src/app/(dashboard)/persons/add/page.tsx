import AddUserForm from "@/components/AddPersonForm";

const addUserPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Add New User</h1>
        <AddUserForm />
      </div>
    </div>
  );
}

export default addUserPage;