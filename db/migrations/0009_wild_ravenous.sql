ALTER TABLE "folders" ADD COLUMN "sharable" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "html" text;