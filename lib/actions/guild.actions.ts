"use server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { db } from "@/lib/db";
import { guilds, users } from "@/lib/db/schema";
import { InferInsertModel, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
interface BuildGuildParams {
  name: string;
  info: string;

  guild_handle: string;
  guild_logo: string;
  tags: string;
  owner_id: string;
}
export async function BuildGuild({
  name,
  info,
  tags,
  guild_logo,
  guild_handle,
  owner_id,
}: BuildGuildParams) {
  try {
    // TODO: better way to do this   reduce 2 db call to one
    let user = await db.select().from(users).where(eq(users.id, owner_id));
    console.log(user);
    if (!user) {
      throw new Error("user not found");
    }
    let guild = await db
      .insert(guilds)
      //@ts-ignore
      .values({ name, info, tags, guild_logo, guild_handle, owner_id: user.id })
      .returning();
    if (guild) {
        return{
            data:guild,
            message:"created",
            success:true

        }
    }
  } catch (er:any) {
    console.log(`Failed to create/update user: ${er.message}`);
    return { message: "Failed to create" };
  }
}
