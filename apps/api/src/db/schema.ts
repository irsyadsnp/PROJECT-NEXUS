import {
  boolean,
  check,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["player", "creator", "moderator", "admin"]);
export const userStatusEnum = pgEnum("user_status", ["active", "suspended", "deleted"]);
export const gameFormatEnum = pgEnum("game_format", ["2d", "3d"]);
export const gameStatusEnum = pgEnum("game_status", ["concept", "prototype", "published", "suspended"]);
export const gameVisibilityEnum = pgEnum("game_visibility", ["private", "unlisted", "public"]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    username: varchar("username", { length: 32 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    role: userRoleEnum("role").notNull().default("player"),
    status: userStatusEnum("status").notNull().default("active"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("users_email_unique").on(table.email),
    uniqueIndex("users_username_unique").on(table.username),
    check("users_email_lowercase", sql`${table.email} = lower(${table.email})`),
    check("users_username_lowercase", sql`${table.username} = lower(${table.username})`),
  ],
);

export const playerProfiles = pgTable("player_profiles", {
  userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  displayName: varchar("display_name", { length: 40 }).notNull(),
  bio: varchar("bio", { length: 280 }).notNull().default(""),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    tokenHash: varchar("token_hash", { length: 64 }).notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("sessions_token_hash_unique").on(table.tokenHash),
    uniqueIndex("sessions_user_expiry_idx").on(table.userId, table.expiresAt),
  ],
);

export const games = pgTable(
  "games",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 80 }).notNull(),
    title: varchar("title", { length: 120 }).notNull(),
    shortDescription: varchar("short_description", { length: 280 }).notNull(),
    description: text("description").notNull().default(""),
    genre: varchar("genre", { length: 40 }).notNull(),
    format: gameFormatEnum("format").notNull(),
    status: gameStatusEnum("status").notNull().default("concept"),
    visibility: gameVisibilityEnum("visibility").notNull().default("private"),
    developerUserId: uuid("developer_user_id").references(() => users.id, { onDelete: "set null" }),
    coverImageUrl: text("cover_image_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("games_slug_unique").on(table.slug),
    uniqueIndex("games_catalog_status_visibility_published_idx").on(table.status, table.visibility, table.publishedAt),
  ],
);
