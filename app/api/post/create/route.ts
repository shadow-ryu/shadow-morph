import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { PostValidator } from "@/lib/validations/post";
import { z } from "zod";

export async function GET(req: Request) {
  const body = await req.json();

  const { title, content,userId } = PostValidator.parse(body);
console.log(title, content,userId);
  try {
    let post = await db
      .insert(posts)
      .values({
        user_id:userId ,
        title: title,
        content: content,
        // guild_id: guild_id,
      })
      .returning();
      console.log(post);

    return new Response(JSON.stringify(post));
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 });
  }
}
