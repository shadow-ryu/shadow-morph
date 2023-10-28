import { boolean,uuid, json, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }),
  username: varchar('username', { length: 256 }),
  image: text('image'),
  is_setup: boolean('is_setup').default(false),
  bio: text('bio'),
  interests: json('json').$type<string[]>(),
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow(),
});
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  user_id: varchar('user_id'),
  // guild_id: serial('guild_id'),
  content: json('content'),
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow(),
});
