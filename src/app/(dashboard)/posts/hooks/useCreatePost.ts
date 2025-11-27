"use client";

import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/actions/posts";
import { getQueryClient } from "@/app/get-query-client";

export function useCreatePost() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async (data: { title: string; content: string }) => {
      return await createPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
