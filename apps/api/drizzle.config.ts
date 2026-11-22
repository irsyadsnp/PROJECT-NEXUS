import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const migrationDatabaseUrl = process.env.DATABASE_URL_UNPOOLED;

if (!migrationDatabaseUrl) {
  throw new Error(
    "DATABASE_URL_UNPOOLED is required for Drizzle migrations. Use the direct, non-pooled Neon connection string.",
  );
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: migrationDatabaseUrl,
  },
  strict: true,
  verbose: true,
});
