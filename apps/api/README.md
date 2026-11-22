# @nexus/api

Platform API runtime for PROJECT NEXUS.

## Requirements

- Node.js 24
- npm
- PostgreSQL 16+ for database-backed readiness and migrations

## Local setup

From the repository root:

```bash
npm install
cp apps/api/.env.example apps/api/.env
npm run api:dev
```

The liveness endpoint is available at `http://127.0.0.1:4000/api/v1/health`.

The readiness endpoint returns HTTP 503 until `DATABASE_URL` points to a reachable PostgreSQL database. This is intentional: the API must not report database readiness when no database is configured.

## Database migrations

Set `DATABASE_URL` in the environment, then run:

```bash
npm run db:migrate --workspace @nexus/api
```

Migrations are version-controlled under `apps/api/drizzle`. Review migration SQL before applying it to any shared or production database.

## Current scope

Implemented:
- Fastify application bootstrap
- Validated environment configuration
- Liveness and database readiness endpoints
- Drizzle schema and initial PostgreSQL migration
- Automated API smoke tests

Not implemented:
- Account registration or authentication
- Player profile routes
- Public catalog routes
- Production CORS/cookie configuration
- Hosted API or managed database
