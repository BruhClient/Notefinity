CREATE TABLE "folders" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"folderId" text NOT NULL,
	"Title" text DEFAULT 'Untitled' NOT NULL,
	"content" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"sharable" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "folders" ADD CONSTRAINT "folders_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_folderId_folders_id_fk" FOREIGN KEY ("folderId") REFERENCES "public"."folders"("id") ON DELETE cascade ON UPDATE no action;