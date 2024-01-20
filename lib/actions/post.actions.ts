
"use server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { db } from "@/lib/db";
import { Post, posts, users } from "@/lib/db/schema";
import { InferInsertModel, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateResponse } from "../utils";

interface CreatePostParams {
  userId: string;
  title: string;
  postId?: string;
  content: any;
  isGuild: boolean;
  guildId?: string;
}
export async function createPost({
  userId,
  title,
  content,
  isGuild,
  postId,
  guildId,
}: CreatePostParams) {
  try {
    // TODO: make logic to extract data of hastags or metions from content
    // let post = await db.insert(posts).values({
    //   user_id: userId,
    //   title: title,
    //   content: content,
    //   // guild_id: guild_id,
    // }).returning();
    const [user] = await db.select().from(users).where(eq(users.id, userId));

    console.log("object", user);
    if (!user) {
      return { success: false };
    }
    let data: any = {
      authorId: userId,
      title: title,
      content: content,
      isGuild: isGuild,
      guildId,
      postId: postId || -1,
      // guild_id: guild_id,
    };
    console.log(data, "data");
    let [post] = await db
      .insert(posts)
      .values(data)
      // .onConflictDoUpdate({
      //   target: posts.id,
      //   set: data,
      //   where: eq(posts.id, postId),
      // })
      .returning();

    if (post) {
      return generateResponse({
        status: postId ? 200 : 201,
        message: `${postId ? "updated" : "created"} successfully`,
        data: post,
      });
    }
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    console.log(`Failed to create/update user: ${message}`);
  }
}

export async function fetchPostById({ id }: { id: number | string }) {
  console.log(typeof id, "post");
  if (!id) {
    return generateResponse({
      message: "Post not found",
      status: 404,
    });
  }
  try {
    // let [post] = await db.query.posts.findMany({
    //   // Use 'with' to include related data
    
    //   with: {
    //     author: true,
    //     guild: true,
    //   },
    // });
  
    const post = await db.query.posts.findFirst({
      where: (posts, { eq }) => (eq(posts.id, id)),
     
      with: {
        author: true,
        guild: true,
      },
    });
    console.log(post,"poddt")
    if (!post) {
      return generateResponse({
        message: "Post not found",
        status: 404,
      });
    }
    const comments = await db
      .select()
      .from(posts)
      .where(eq(posts.parentId, id));

    post["comments"] = comments.length ? comments : [];
    return generateResponse({
      message: "fetch post",
      data: post,
      success:true,
      status: 200,
    });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    console.log(` ${message}`);
  }
}
