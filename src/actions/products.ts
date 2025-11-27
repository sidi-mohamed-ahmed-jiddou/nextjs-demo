"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  try {
    const result = await db
      .select()
      .from(products)
      .orderBy(products.id);
    return result;


  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}

interface CreateProductInput {
    name: string;
    description?: string;
    price: number;
    stock: number;
}

export async function createProduct(data: CreateProductInput) {
  const { name, description, price, stock } = data;

  if (price < 0 )  {
    throw new Error("Le prix ne peut pas être négatif");
  }
  if (stock < 0 )  {
    throw new Error("Le stock ne peut pas être négatif");
  }

  try {
        await db.insert(products).values({
            name: name,
            description: description,
            price: price.toString(),
            stock: stock,
        });


    revalidatePath("/products");
    return { success: true}

    } catch (error) {
    throw new Error("Failed to create product");
    }

}

export async function getProductById(id: number) {
  try {
        const product = await db
            .select()
            .from(products)
            .where(eq(products.id, id));
    return product[0];
    }
    catch (error) {
    throw new Error("Failed to fetch product by ID");
    }
}

export async function updateProduct(id: number, data:{name?: string; description?: string; price?: number; stock?: number}) {
  try {
        await db.update(products).set({
            name: data.name,
            description: data.description,
            price: data.price?.toString(),
            stock: data.stock,
        }).where(eq(products.id, id));
    revalidatePath("/products");
    return { success: true}
    }
    catch (error) {
    throw new Error("Failed to update product");
    }
}

export async function deleteProduct(id: number) {
  try {
        await db.delete(products).where(eq(products.id, id));
    revalidatePath("/products");
    return { success: true}
    }
    catch (error) {
    throw new Error("Failed to delete product");
    }
}