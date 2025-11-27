import { getProductById } from "@/actions/products";
import UpdateProductForm from "@/components/UpdateProductForm";

const UpdateProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const productId = parseInt(id, 10);
    const product = await getProductById(productId);

    const cleanedProduct = {
        id: product.id,
        name: product.name,
        description: product.description ?? "",
        price: Number(product.price),
        stock: Number(product.stock)
    };


    if (!product) {
        return <div>Product not found</div>;
    }
    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-3xl font-bold text-blue-400 mb-4">Update Product</h1>
            <UpdateProductForm product={cleanedProduct} />
        </div>
    );
};
export default UpdateProductPage;

