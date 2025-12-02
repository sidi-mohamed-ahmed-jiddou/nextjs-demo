"use client";

import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/actions/posts";
import { getQueryClient } from "@/app/get-query-client";

import { toast } from "sonner";

export function useCreatePost() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (data: { title: string; content: string }) => {
      const result = await createPost(data);
      if (result?.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
