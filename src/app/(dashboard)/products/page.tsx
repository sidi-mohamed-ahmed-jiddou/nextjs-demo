"use client";

import { getProducts } from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";

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
        <div className="p-8 space-y-6 max-w-6xl mx-auto mt-0">
            <div className="flex flex-col space-y-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products Catalog</h1>
                <p className="text-gray-500">Explore our available products and stock.</p>
            </div>

            <div className="rounded-xl border bg-white text-card-foreground shadow-sm overflow-hidden">
                <div className="p-0">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Description</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Stock</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {Array.isArray(data) ? data.map((product) => (
                                <tr key={product.id} className="bg-white hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                    <td className="px-6 py-4 text-gray-600 max-w-md truncate" title={product.description || ''}>
                                        {product.description || 'No description'}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-green-600">
                                        ${Number(product.price).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stock > 10
                                                ? 'bg-green-100 text-green-800'
                                                : product.stock > 0
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
