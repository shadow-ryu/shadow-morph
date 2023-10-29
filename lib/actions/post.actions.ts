"use server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { InferInsertModel, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface CreatePostParams {
  userId: string;
  title: string;
  content: any;
  guild_id?: string;
}
export async function createPost({
  userId,
  title,
  content,
  guild_id,
}: CreatePostParams) {
    try {
      // TODO: make logic to extract data of hastags or metions from content
  let post = await db.insert(posts).values({
    user_id: userId,
    title: title,
    content: content,
    // guild_id: guild_id,
  }).returning();
  if(post){
    return(post)
  }
    }catch(er:any){
        console.log(`Failed to create/update user: ${er.message}`);
    }
}
