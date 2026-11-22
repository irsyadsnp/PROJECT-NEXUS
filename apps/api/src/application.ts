import Fastify, { type FastifyInstance } from "fastify";
import type { Database } from "./db/client.js";
import { sql } from "drizzle-orm";

export interface AppOptions {
  database?: Database;
}

export function registerRoutes(app: FastifyInstance, options: AppOptions = {}): void {
  app.get("/api/v1/health", async () => ({
    status: "ok",
    service: "nexus-platform-api",
    timestamp: new Date().toISOString(),
  }));

  app.get("/api/v1/ready", async (_request, reply) => {
    if (!options.database) {
      return reply.code(503).send({
        status: "not_ready",
        reason: "database_not_configured",
      });
    }

    try {
      await options.database.execute(sql`select 1`);
      return { status: "ready" };
    } catch {
      return reply.code(503).send({
        status: "not_ready",
        reason: "database_unavailable",
      });
    }
  });
}

export function buildApp(options: AppOptions = {}): FastifyInstance {
  const app = Fastify({
    logger: process.env.NODE_ENV !== "test",
    trustProxy: false,
    bodyLimit: 1_048_576,
  });

  registerRoutes(app, options);
  return app;
}
