"use server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { InferInsertModel, eq } from "drizzle-orm";
export async function fetchUserById(userId: string) {
  try {
    const user = await db.query.users.findFirst({
      where:eq(users.id, userId)
    })

    return user;
  } catch (err) {
    if (err instanceof Error) console.log(err.stack);
  }
}
interface UserUpdateParams {
  id: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  email: string;
  isSetup?: boolean;
}

export async function updateUser(user: UserUpdateParams): Promise<void> {
  try {
    const connectionString = process.env.DATABASE_URL;
    //@ts-ignore

    // let userD = await createUser(user)
    let userD = await db
      .insert(users)
      .values(user)
      .onConflictDoUpdate({
        target: users.id,
        set: user,
        where: eq(users.id, user.id),
      })
      .returning();

    console.log(userD,"gggg");
    // if (userD) {
    //   // if (path === "/profile/edit") {
    //   //   revalidatePath(path);
    //   // }
    // } else {
    //   throw new Error(`User not found for ID: ${userId}`);
    // }
  } catch (error:any) {
    console.log(`Failed to create/update user: ${error.message}`);
  }
}
