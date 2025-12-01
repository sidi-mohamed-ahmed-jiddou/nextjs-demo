"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { checkPermission } from "@/lib/rbac";

export async function createPost({ title, content }: { title: string; content: string }) {
  const permission = await checkPermission("create:post");
  if (!permission.success) {
    return { error: permission.error };
  }

  try {
    await db.insert(posts).values({
      title,
      content,
    });
    return { success: true };
  } catch (error) {
    return { error: "Failed to create post" };
  }
}

export async function getPosts() {
  const permission = await checkPermission("read:post");
  if (!permission.success) {
    return { error: permission.error };
  }

  try {
    const result = await db.select().from(posts).orderBy(posts.id);
    return result;
  } catch (error) {
    return { error: "Failed to fetch posts" };
  }
}

export async function updatePost(id: number, data: { title?: string; content?: string }) {
  const permission = await checkPermission("update:post");
  if (!permission.success) {
    return { error: permission.error };
  }

  try {
    await db.update(posts).set(data).where(eq(posts.id, id));
    return { success: true };
  } catch (error) {
    return { error: "Failed to update post" };
  }
}

export async function deletePost(id: number) {
  const permission = await checkPermission("delete:post");
  if (!permission.success) {
    return { error: permission.error };
  }

  try {
    await db.delete(posts).where(eq(posts.id, id));
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete post" };
  }
}
