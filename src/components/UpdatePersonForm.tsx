"use client";

import { updateUser } from "@/actions/persons";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { userSchema, UserSchema } from "@/app/(dashboard)/persons/schemas/user.schema";

const userRoles = ["admin", "user"];

export default function UpdateUserForm({
  user,
}: {
  user: { id: number; name: string; email: string; role?: string };
}) {
  const router = useRouter();

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role ?? "user",
    },
  });

  const onSubmit = async (data: UserSchema) => {
    try {
      const result = await updateUser(user.id, data);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("User updated successfully!");
      router.push("/persons");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update user.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md space-y-4"
      >

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="email"
                  className="w-full px-3 py-2 border rounded"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full px-3 py-2 border rounded"
                >
                  {userRoles.map((r) => (
                    <option key={r} value={r}>
                      {r === "admin" ? "Admin" : "User"}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {form.formState.isSubmitting ? "Updating..." : "Update User"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/persons")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </Form>
  );
}