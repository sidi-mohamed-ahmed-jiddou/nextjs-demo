"use client";

import { updateProduct } from "@/actions/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema, ProductSchema } from "@/app/(dashboard)/products/schemas/product.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function UpdateProductForm({
  product,
}: {
  product: {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
  };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<ProductSchema>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description ?? "",
      price: product.price,
      stock: product.stock,
    },
  } as any);

  const mutation = useMutation({
    mutationFn: async (data: ProductSchema) => {
      return updateProduct(product.id, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully!");
      router.push("/products");
    },

    onError: () => {
      toast.error("Failed to update product.");
    },
  });

  const onSubmit = (data: ProductSchema) => {
    mutation.mutate({
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    });
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full px-3 py-2 border rounded"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
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
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
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


        <div className="flex justify-end gap-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {mutation.isPending ? "Updating..." : "Update Product"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/products")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </Form>
  );
}