CREATE TABLE IF NOT EXISTS "guilds" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"guildHandle" varchar,
	"ownerId" varchar,
	"info" text,
	"guildLogo" text,
	"tags" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"authorId" varchar,
	"guildId" integer,
	"isGuild" boolean DEFAULT false,
	"content" json,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"parentId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "presets" (
	"id" serial PRIMARY KEY NOT NULL,
	"presetType" varchar,
	"pageType" varchar,
	"ownerId" varchar,
	"guildId" integer,
	"pageBorder" varchar,
	"backgroundColor" varchar,
	"textColor" varchar,
	"userTitleColor" varchar,
	"customSetting" json,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" varchar(256);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "isSetup" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updatedAt" timestamp DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guilds" ADD CONSTRAINT "guilds_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "presets" ADD CONSTRAINT "presets_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "presets" ADD CONSTRAINT "presets_guildId_guilds_id_fk" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
