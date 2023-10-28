"use server";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from "postgres";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { InferInsertModel, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function fetchUsers(userId: string) {
  try {
    const user = await db.select().from(users).where(eq(users.id, userId));
    return user;
  } catch (err) {
    if (err instanceof Error) console.log(err.stack);
  }
}
interface UserUpdateParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  email:string;
  path: string;
  is_setup?:false;
}

export async function updateUser({
  userId,
  bio,email,
  name,
  path,
  username,
  image,
  is_setup,
}: UserUpdateParams): Promise<void> {
  try {
   const connectionString = process.env.DATABASE_URL

    const client = postgres(connectionString!)
    const db =  drizzle(client);
   
    let user = await db
      .insert(users)
      .values({
        id: userId,
        username: username.toLowerCase(),
        name: name,
        email:email,
        bio: bio,
        image: image,
        is_setup: is_setup,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          username: username.toLowerCase(),
          bio: bio,
          email:email,
          image: image,
          is_setup: is_setup,
        },
        where: eq(users.id, userId),
      })
      .returning();

    console.log(user);
    if (user) {
      if (path === "/profile/edit") {
        revalidatePath(path);
      }
    } else {
      throw new Error(`User not found for ID: ${userId}`);
    }
  } catch (error:any) {
    console.log(`Failed to create/update user: ${error.message}`);
  }
}
