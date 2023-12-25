"use server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { db } from "@/lib/db";
import { guilds, presets, subscriptionsTable, users } from "@/lib/db/schema";
import { InferInsertModel, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PgVarchar } from "drizzle-orm/pg-core";

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
      return {
        data: guild,
        message: "created",
        success: true,
      };
    }
  } catch (er) {
    return { message: "Failed to create" };
  }
}

interface BuildPresetParams {
  userTitleColor: string;
  owner_id: string; // Assuming owner_id is a string, you can adjust the type accordingly
  guild_id: string; // Assuming guild_id is a string, you can adjust the type accordingly
  background: string;
  text_color: string;
  banner_color: string;
  banner_border: string;
  banner_image: string;
  post_bg_color: string;
  post_border: string;
  post_bg_image: string;
  comment_button_image: string;
  comment_color: string;
  comment_font_color: string;
  comment_border: string;
  comment_bg_image: string;
}
// Import your database module

export async function saveOrUpdatePreset({
  guild_id,
  type,
  id = null,
  customizeSetting,
}: any) {
  const { post, profile } = customizeSetting;
console.log(profile)
  try {
    // Assuming you have a way to get the user by owner_id
    // const user = await db.select().from(users).where(eq(users.id, owner_id)).first();
    const user = { id: "user_2XRjBc1msivqXqPTydMGKJamWqX" };
    if (!user) {
      throw new Error("User not found");
    }

    const presetData = {
      postSetting:post,
      owner_id: user.id,
      guild_id,
      type,
      profileSetting:profile,
    };

    // Filter out undefined or null values from presetData
    const filteredPresetData = Object.fromEntries(
      Object.entries(presetData).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    );

    // Use a single query to insert and return the result
    const [preset] = await db
      .insert(presets)
      .values(filteredPresetData)
      .returning();

    console.log(preset, "preset");

    return {
      data: preset,
      message: "Created",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return { message: error.message || "An error occurred" };
  }
}

interface subscriptionProps {
  guild_id: string;
  userId: string;
  unSub: boolean;
}

export async function handleSubscription({
  guild_id,
  userId: user_id,
  unSub = false,
}: subscriptionProps) {
  try {
    const subscriptionRecord = await db
      .select()
      .from(subscriptionsTable)
      .where({
        // @ts-ignore
        guildId: guild_id,
        userId: user_id,
      });

    if (unSub) {
      if (subscriptionRecord) {
        await db.delete(subscriptionsTable).where({
          // @ts-ignore
          guildId: guild_id, // Corrected variable names to match your code
          userId: user_id,
        });
        return {
          message: "Unsubscribed successfully",
          success: true,
          variant: "success",
        };
      } else {
        return {
          message: "Unsubscribed unsuccessfully ,try again later",
          variant: "destructive",
          success: false,
        };
      }
    } else {
      if (!subscriptionRecord) {
        await db
          .insert(subscriptionsTable)
          .values({ guildId: guild_id, userId: user_id });

        return {
          message: "Subscribed successfully",
          success: true,
          variant: "success",
        };
      } else {
        return {
          message: "You're already subscribed to this guild",
          variant: "warning",
          success: true,
        };
      }
    }
  } catch (error) {
    return {
      message: "Failed to handle subscription",
      variant: "destructive",
      success: false,
    };
  }
}
