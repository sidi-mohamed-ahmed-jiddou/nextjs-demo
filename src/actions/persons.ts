"use server";

import { db } from "@/db";
import { persons } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface UpdateUserInput {
  id: number;
  name?: string;
  email?: string;
  role?: string;
}

export async function addUser(data: { name: string; email: string; role?: string }) {
  const { name, email, role } = data;

  const existingUser = await db
    .select()
    .from(persons)
    .where(eq(persons.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { error: "Email already exists" };
  }

  try {
    await db.insert(persons).values({
      name: name.trim(),
      email: email.trim(),
      role: role?.trim() || "user",
    });

    revalidatePath("/persons");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add user",
    };
  }
}


export async function getUsers() {
  try {
    const result = await db
      .select()
      .from(persons)
      .orderBy(persons.id);

    return { success: true, data: result, message: "Users fetched successfully" };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch users",
    };
  }
}

export async function getUserById(id: number) {
  try {
    const result = await db
      .select()
      .from(persons)
      .where(eq(persons.id, id))
      .limit(1);

    return result[0] ?? null;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch user by ID",
    };
  }
}


export async function updateUser(
  id: number,
  data: { name: string; email: string; role?: string }
) {
  try {
    await db
      .update(persons)
      .set({
        name: data.name,
        email: data.email,
        role: data.role || "user",
      })
      .where(eq(persons.id, id));

    revalidatePath("/persons");
    revalidatePath(`/persons/details/${id}`);
    revalidatePath(`/persons/update/${id}`);

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update user",
    };
  }
}

export async function deleteUser(id: number) {
  try {
    await db
      .delete(persons)
      .where(eq(persons.id, id));

    revalidatePath("/persons");

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete user",
    };
  }
}