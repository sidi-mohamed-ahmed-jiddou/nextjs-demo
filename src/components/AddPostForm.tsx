"use client";

import { useRouter } from "next/navigation";
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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreatePost } from "@/app/(dashboard)/posts/hooks/useCreatePost";

export function AddPostForm() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreatePost();

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: { title: string; content: string }) => {
    try {
      await mutateAsync(values);
      toast.success("Post created successfully!");
      form.reset();
    } catch (err) {
      toast.error("Failed to create post");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-sm"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <textarea 
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter content"
                {...field} />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Post"}
        </Button>
      </form>
    </Form>
  );
}