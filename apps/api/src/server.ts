import { buildApp } from "./app.js";
import { env } from "./config/env.js";
import { createDatabase } from "./db/client.js";

const database = env.DATABASE_URL ? createDatabase(env.DATABASE_URL) : undefined;
const app = buildApp({ database: database?.db });

try {
  await app.listen({ host: env.HOST, port: env.PORT });
} catch (error) {
  app.log.error(error);
  await database?.pool.end();
  process.exit(1);
}

const shutdown = async (signal: string) => {
  app.log.info({ signal }, "Shutting down API");
  await app.close();
  await database?.pool.end();
  process.exit(0);
};

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));
