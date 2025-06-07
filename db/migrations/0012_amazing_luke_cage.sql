CREATE TYPE "public"."user_plan" AS ENUM('Free', 'Pro');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "plan" "user_plan" DEFAULT 'Free' NOT NULL;