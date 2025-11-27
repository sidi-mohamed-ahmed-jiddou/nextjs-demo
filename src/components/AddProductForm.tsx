"use client";

import { createProduct } from "@/actions/products";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductSchema, productSchema } from "@/app/(dashboard)/products/schemas/product.schema";

const AddProductForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<ProductSchema>({
    resolver: yupResolver(productSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produit créé avec succès.");
      form.reset();
      router.push("/products");
    },

    onError: (error: { message: string }) => {
      toast.error(`Erreur lors de la création : ${error.message}`);
    },
  });

  const onSubmit = (values: ProductSchema) => {
    mutation.mutate({
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-sm"
      >

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du produit</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Entrez le nom du produit"
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
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Entrez la description du produit"
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
              <FormLabel>Prix</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Entrez le prix du produit"
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
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Entrez le stock du produit"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition 
                      ${mutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {mutation.isPending ? "Ajout en cours..." : "Ajouter le produit"}
        </button>
      </form>
    </Form>
  );
};

export default AddProductForm;