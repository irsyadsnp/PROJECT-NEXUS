import { buildApp } from "./application.js";
import { env } from "./config/env.js";
import { createDatabase } from "./db/client.js";

// Vercel detects src/app.ts as the Fastify Function entry point.
// Export the Fastify instance and let Vercel manage the request lifecycle.
const database = env.DATABASE_URL ? createDatabase(env.DATABASE_URL) : undefined;
const app = buildApp({ database: database?.db });

export default app;
