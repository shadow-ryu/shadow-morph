"use server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { InferInsertModel, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// export async function fetchUsers(userId: string) {
//   try {
//     const user = await db.select().from(users).where(eq(users.id, userId));
//     return user;
//   } catch (err) {
//     if (err instanceof Error) console.log(err.stack);
//   }
// }
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
