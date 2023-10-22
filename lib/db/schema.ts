import { boolean, json, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id').primaryKey().notNull(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }),
  username: varchar('username', { length: 256 }),
  image: text('image'),
  onboarded: boolean('onboarded').default(false),
  bio: text('bio'),
  interests: json('json').$type<string[]>(),
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow(),
});
