CREATE TABLE IF NOT EXISTS "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"sessiontoken" text NOT NULL,
	"user_id" integer NOT NULL
);
