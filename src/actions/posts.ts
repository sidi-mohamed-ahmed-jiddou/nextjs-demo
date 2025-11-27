"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function createPost({ title, content }: { title: string; content: string }) {
    try {
        await db.insert(posts).values({
          title,
          content,
        });
    } catch (error) {
        throw new Error("Failed to create post");
    }
}

export async function getPosts() {
  try {
    const result = await db.select().from(posts).orderBy(posts.id);
    return result;
  } catch (error) {
    throw new Error("Failed to fetch posts");
  }
}


export async function updatePost(id: number, data: { title?: string; content?: string }) {
  try {
    await db.update(posts).set(data).where(eq(posts.id, id));
  } catch (error) {
    throw new Error("Failed to update post");
  }
}

export async function deletePost(id: number) {
  try {
    await db.delete(posts).where(eq(posts.id, id));
  } catch (error) {
    throw new Error("Failed to delete post");
  }
}
