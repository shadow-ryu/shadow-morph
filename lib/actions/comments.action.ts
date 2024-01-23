"use server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { db } from "@/lib/db";
import { Post, posts, users,comments } from "@/lib/db/schema";
import { InferInsertModel, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateResponse } from "../utils";

interface CreateCommentParams {
  userId: string;
  commentId?:string
  postId: string;
  content: any;
  isReply: boolean;
  replyToId?: string;
  pathname?:any
}
export async function addComment({
  userId,
  content,
  isReply,
  commentId,
  postId,
  replyToId,
}: CreateCommentParams) {
  try {

    const [user] = await db.select().from(users).where(eq(users.id, userId));

    if (!user) {
      return { success: false };
    }
    let data: any = {
      authorId: userId,
      content: content,
      postId: postId ,
    };
    if(isReply){
        data["replyToId"]= replyToId
        data["isReply"]= isReply
    }
    let [comment] = await db
      .insert(comments)
      .values(data)
    //   .onConflictDoUpdate({
    //     target: comments.id,
    //     set: data,
    //     where: eq(comments.id, commentId),
    //   })
      .returning();

    if (comment) {
      return generateResponse({
        status: postId ? 200 : 201,
        message: `${postId ? "updated" : "created"} successfully`,
        data: comment,
      });
    }
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    console.log(`Failed to create/update comment: ${message}`);
  }
}

