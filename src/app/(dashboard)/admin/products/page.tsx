"use client";

import { getProducts } from "@/actions/products";
import DeleteProductButton from "@/components/DeleteProductButton";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const ProductPage = () => {

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 mt-20 ">
        <Button disabled size="sm">
          <Spinner />
          Loading...
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Product List</h1>

      <Link
        href="/products/add"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block"
      >
        Add New Product
      </Link>

      <table className="w-full border-collapse border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.id}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.description}</td>
              <td className="border p-2">{product.price}</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2 space-x-2">
                <Link
                  href={`/products/details/${product.id}`}
                  className="bg-purple-400 text-white px-3 py-1 rounded hover:bg-purple-500"
                >
                  Details
                </Link>

                <Link
                  href={`/products/update/${product.id}`}
                  className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500"
                >
                  Update
                </Link>

                <DeleteProductButton id={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;
