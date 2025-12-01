"use server";

import { db } from "@/db";
import { persons } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { checkPermission } from "@/lib/rbac";

export async function addPerson(data: { name: string; email: string; role?: string }) {
  const permission = await checkPermission("create:person");
  if (!permission.success) {
    return { error: permission.error };
  }

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
    return { error: "Failed to add person" };
  }
}


export async function getPersons() {
  const permission = await checkPermission("read:person");
  if (!permission.success) {
    return { error: permission.error };
  }

  try {
    const result = await db
      .select()
      .from(persons)
      .orderBy(persons.id);

    return { success: true, data: result, message: "Persons fetched successfully" };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch persons",
    }
  }
}

export async function getPersonById(id: number) {
  const permission = await checkPermission("read:person");
  if (!permission.success) {
    return { error: permission.error };
  }

  try {
    const result = await db
      .select()
      .from(persons)
      .where(eq(persons.id, id))
      .limit(1);

    return { success: true, data: result[0] ?? null };
  } catch (error) {
    return { error: "Failed to fetch person by ID" };
  }
}


export async function updatePerson(
  id: number,
  data: { name: string; email: string; role?: string }
) {
  const permission = await checkPermission("update:person");
  if (!permission.success) {
    return { error: permission.error };
  }

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

    return { success: true };
  } catch (error) {
    return { error: "Failed to update person" };
  }
}

export async function deletePerson(id: number) {
  const permission = await checkPermission("delete:person");
  if (!permission.success) {
    return { error: permission.error };
  }

  try {
    await db
      .delete(persons)
      .where(eq(persons.id, id));

    revalidatePath("/persons");

    return { success: true };
  } catch (error) {
    return { error: "Failed to delete person" };
  }
}