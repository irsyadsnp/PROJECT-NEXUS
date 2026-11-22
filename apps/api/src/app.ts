import Fastify from "fastify";
import { registerRoutes } from "./application.js";
import { env } from "./config/env.js";
import { createDatabase } from "./db/client.js";

// Vercel's Fastify preset requires the detected entrypoint to import Fastify directly.
const database = env.DATABASE_URL ? createDatabase(env.DATABASE_URL) : undefined;
const app = Fastify({
  logger: process.env.NODE_ENV !== "test",
  trustProxy: false,
  bodyLimit: 1_048_576,
});

registerRoutes(app, { database: database?.db });

export default app;
