import { relations } from "drizzle-orm";
import {
  boolean,
  uuid,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { nullable } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  username: varchar("username", { length: 256 }),
  image: text("image"),
  isSetup: boolean("isSetup").default(false),
  bio: text("bio"),
  interests: json("json").$type<string[]>(),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).defaultNow(),
});

export const posts: any = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  authorId: varchar("authorId").references(() => users.id),
  guildId: integer("guildId"),
  isGuild: boolean("isGuild").default(false),
  content: json("content"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
  parentId: integer("parentId"),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: varchar("content", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow(),
  authorId: varchar("authorId").references(() => users.id),
  postId: serial("postId").references(() => posts.id), // Add this line
  isReply: boolean("isReply").default(false),
  replyToId: serial("replyToId"),
  votes: json("votes"),
});
export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  guild: one(guilds, {
    fields: [posts.guildId],
    references: [guilds.id],
  }),
  comments: many(comments, {
    author: true,
  }),
}));
export const commentRelations = relations(comments, ({ one, many }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  // postConfigurations:many(postConfigurations),
  comments: many(comments),
}));

export const guilds = pgTable("guilds", {
  id: serial("id").primaryKey(),
  name: varchar("title", { length: 256 }),
  guildHandle: varchar("guildHandle"),
  ownerId: varchar("ownerId").references(() => users.id),
  info: text("info"),
  guildLogo: text("guildLogo"),
  tags: text("tags"),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).defaultNow(),
});

/**
 * // commentButtonImage: varchar("comment_button_image"),
  // commentColor: varchar("comment_color"),
  // commentFontColor: varchar("comment_font_color"),
  // commentBorder: varchar("comment_border"),
  // commentBgImage: varchar("comment_bg_image"),
 */
export const presets = pgTable("presets", {
  id: serial("id").primaryKey(),
  presetType: varchar("presetType"),
  pageType: varchar("pageType"),
  ownerId: varchar("ownerId").references(() => users.id),
  guildId: integer("guildId").references(() => guilds.id),
  backgroundColor: varchar("backgroundColor"),
  textColor: varchar("textColor"),
  userTitleColor: varchar("userTitleColor"),
  customSetting: json("customSetting"),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).defaultNow(),
});
// export const subscriptions = pgTable(
//   "subscriptions",
//   {
//     userId: varchar("userId").references(() => users.id),
//     guildId: varchar("guildId").references(() => guilds.id),
//   },
//   (self) => ({
//     primaryKey: [self.userId, self.guildId],
//   })
// );

// export const likeEnum = pgEnum('unlike', ['like']);

// export const postConfigurations = pgTable(
//   "post_configurations",
//   {
//     userId: varchar("user_id").references(() => users.id),
//     postId: varchar("post_id").references(() => posts.id),
//     bookmark: boolean("bookmark").default(false),
//     // mood: likeEnum('unlike'),
//   },
//   (self) => ({
//     primaryKey: [self.userId, self.postId],
//   })
// );
export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  image: string;
  isSetup: boolean;
  bio: string;
  interests: string[];
  createdAt: string;
  updatedAt: string;
}
export interface Post {
  id: number;
  title: string;
  authorId: string;
  guildId: number;
  isGuild: boolean;
  content: any; // Adjust the type as per your data structure
  createdAt: Date;
  updatedAt: Date;
  parentId?: number;
}
export interface Guild {
  id: number;
  name: string;
  guildHandle: string;
  ownerId: string;
  info: string;
  guildLogo: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
}
export interface Preset {
  id: number;
  presetType: string;
  pageType: string;
  ownerId: string;
  guildId: number;
  backgroundColor: string;
  textColor: string;
  userTitleColor: string;
  customSetting: any; // Adjust the type as per your data structure
  createdAt: string;
  updatedAt: string;
}
export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  authorId: string;
  postId: number;
  isReply: boolean;
  replyToId?: number;
  votes: any; 
}
