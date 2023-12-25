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
export const userRelations = relations(users, ({ one, many }) => ({
  posts: many(posts),
  guilds:many(guilds)
}));
export const posts:any = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  authorId: varchar("authorId").references(() => users.id),
  guildId: integer("guildId").references(() => guilds.id),
  content: json("content"),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).defaultNow(),
  parentId: integer("parentId")
    .references(() => posts.id)
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
  // postConfigurations:many(postConfigurations),
  posts: many(posts),
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
  type: varchar("type"),
  ownerId: varchar("ownerId").references(() => users.id),
  guildId: integer("guildId").references(() => guilds.id),
  postSetting:json("postSetting"),
  profileSetting:json("profileSetting"),
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
