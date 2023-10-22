CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"email" varchar(256),
	"bio" text,
	"json" json,
	"createdAt" timestamp DEFAULT now()
);
