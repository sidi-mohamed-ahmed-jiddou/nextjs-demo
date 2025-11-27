import { getProductById } from "@/actions/products";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    const productId = parseInt(id, 10);
    const product = await getProductById(productId);

    if (!product) {
        return (
            <Card className="w-full max-w-sm mx-auto mt-10">
                <CardHeader>
                    <CardTitle>Product Not Found</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-center">
                    <Button asChild variant="secondary">
                        <Link href="/products">Back to Products</Link>
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-sm mx-auto mt-16">
            <CardHeader className="mb-4">
                <CardTitle>Product Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-600">{product.description}</p>
                </div>

                <p className="font-bold text-xl">Price: ${product.price}</p>

                <p className="text-md">
                    <span className="font-semibold">Stock:</span> {product.stock}
                </p>
            </CardContent>

            <CardFooter className="flex justify-center">
                <Button asChild variant="secondary">
                    <Link href="/products">Back to Products</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductDetailsPage;