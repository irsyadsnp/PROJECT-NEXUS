CREATE TYPE "public"."user_role" AS ENUM('player', 'creator', 'moderator', 'admin');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'suspended', 'deleted');--> statement-breakpoint
CREATE TYPE "public"."game_format" AS ENUM('2d', '3d');--> statement-breakpoint
CREATE TYPE "public"."game_status" AS ENUM('concept', 'prototype', 'published', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."game_visibility" AS ENUM('private', 'unlisted', 'public');--> statement-breakpoint
CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "email" varchar(320) NOT NULL,
  "username" varchar(32) NOT NULL,
  "password_hash" text NOT NULL,
  "role" "user_role" DEFAULT 'player' NOT NULL,
  "status" "user_status" DEFAULT 'active' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "users_email_lowercase" CHECK ("users"."email" = lower("users"."email")),
  CONSTRAINT "users_username_lowercase" CHECK ("users"."username" = lower("users"."username"))
);--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_unique" ON "users" USING btree ("username");--> statement-breakpoint
CREATE TABLE "player_profiles" (
  "user_id" uuid PRIMARY KEY NOT NULL,
  "display_name" varchar(40) NOT NULL,
  "bio" varchar(280) DEFAULT '' NOT NULL,
  "avatar_url" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "player_profiles" ADD CONSTRAINT "player_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE TABLE "sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "token_hash" varchar(64) NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "last_seen_at" timestamp with time zone,
  "revoked_at" timestamp with time zone
);--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_token_hash_unique" ON "sessions" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "sessions_user_expiry_idx" ON "sessions" USING btree ("user_id", "expires_at");--> statement-breakpoint
CREATE TABLE "games" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" varchar(80) NOT NULL,
  "title" varchar(120) NOT NULL,
  "short_description" varchar(280) NOT NULL,
  "description" text DEFAULT '' NOT NULL,
  "genre" varchar(40) NOT NULL,
  "format" "game_format" NOT NULL,
  "status" "game_status" DEFAULT 'concept' NOT NULL,
  "visibility" "game_visibility" DEFAULT 'private' NOT NULL,
  "developer_user_id" uuid,
  "cover_image_url" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "published_at" timestamp with time zone
);--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_developer_user_id_users_id_fk" FOREIGN KEY ("developer_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "games_slug_unique" ON "games" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "games_catalog_status_visibility_published_idx" ON "games" USING btree ("status", "visibility", "published_at");
