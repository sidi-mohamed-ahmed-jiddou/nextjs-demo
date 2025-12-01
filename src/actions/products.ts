"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { checkPermission } from "@/lib/rbac";

export async function getProducts() {
  const permission = await checkPermission("read:product");
  if (!permission.success) {
    return { error: permission.error };
  }
  try {
    const result = await db
      .select()
      .from(products)
      .orderBy(products.id);
    return result;


  } catch (error) {
    return { error: "Failed to fetch products" };
  }
}

interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export async function createProduct(data: CreateProductInput) {
  const permission = await checkPermission("create:product");
  if (!permission.success) {
    return { error: permission.error };
  }
  const { name, description, price, stock } = data;

  if (price < 0) {
    return { error: "Le prix ne peut pas être négatif" };
  }
  if (stock < 0) {
    return { error: "Le stock ne peut pas être négatif" };
  }

  try {
    await db.insert(products).values({
      name: name,
      description: description,
      price: price.toString(),
      stock: stock,
    });


    revalidatePath("/products");
    return { success: true }

  } catch (error) {
    return { success: false, error: "Failed to create product" }
  }

}

export async function getProductById(id: number) {
  const permission = await checkPermission("read:product");
  if (!permission.success) {
    return { error: permission.error };
  }
  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return product[0];
  }
  catch (error) {
    return { error: "Failed to fetch product by ID" };
  }
}

export async function updateProduct(id: number, data: { name?: string; description?: string; price?: number; stock?: number }) {
  const permission = await checkPermission("update:product");
  if (!permission.success) {
    return { error: permission.error };
  }

  try {
    await db.update(products).set({
      name: data.name,
      description: data.description,
      price: data.price?.toString(),
      stock: data.stock,
    }).where(eq(products.id, id));
    revalidatePath("/products");
    return { success: true }
  }
  catch (error) {
    return { success: false, error: "Failed to update product" }
  }
}

export async function deleteProduct(id: number) {
  const permission = await checkPermission("delete:product");
  if (!permission.success) {
    return { error: permission.error };
  }
  try {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/products");
    return { success: true }
  }
  catch (error) {
    return { success: false, error: "Failed to delete product" }
  }
}