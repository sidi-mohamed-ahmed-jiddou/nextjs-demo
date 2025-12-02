"use client";

import { useRouter } from "next/navigation";
import { addPerson } from "@/actions/persons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { personSchema, PersonSchema } from "@/app/(dashboard)/admin/persons/schemas/person.schema";

interface AddUserFormProps {
  onSuccess?: () => void;
}

const AddUserForm = ({ onSuccess }: AddUserFormProps) => {
  const router = useRouter();
  const form = useForm<PersonSchema>({
    resolver: zodResolver(personSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      role: "user",
    },
  });

  const onSubmit: SubmitHandler<PersonSchema> = async (values) => {
    try {
      const result = await addPerson(values);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      onSuccess?.();
      toast.success("Person added successfully!");
      router.push("/persons");
      router.refresh();
    } catch (error) {
      toast.error("Failed to add person");
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter name"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
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
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Enter user email"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={isLoading}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding User...
            </>
          ) : (
            "Add User"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddUserForm;