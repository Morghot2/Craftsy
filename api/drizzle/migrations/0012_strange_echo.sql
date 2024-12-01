ALTER TABLE "purchased_services" RENAME TO "purchases";--> statement-breakpoint
ALTER TABLE "purchases" DROP CONSTRAINT "purchased_services_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "purchases" DROP CONSTRAINT "purchased_services_service_id_services_id_fk";
--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "buyer_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "purchase_time" timestamp DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchases" ADD CONSTRAINT "purchases_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchases" ADD CONSTRAINT "purchases_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "purchases" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "purchases" DROP COLUMN IF EXISTS "purchased_at";--> statement-breakpoint
ALTER TABLE "purchases" DROP COLUMN IF EXISTS "quantity";