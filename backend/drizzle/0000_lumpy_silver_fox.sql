CREATE TABLE IF NOT EXISTS "user_todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"is_checked" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text,
	"password" text
);
