# Platform API Architecture

## Purpose

The Platform API is the server-side boundary for platform-owned data and business rules. It is deployed independently from the static Next.js portal.

## Runtime and deployment boundary

- Application: `apps/api`
- Runtime: Node.js 24
- HTTP framework: Fastify 5
- Language: TypeScript
- API prefix: `/api/v1`
- Database: PostgreSQL
- Data access and migrations: Drizzle ORM
- Input validation: Zod
- API contract: OpenAPI

GitHub Pages hosts only the static web export. It must never be treated as the API host or as a place to store secrets. The API and database will be deployed to separate server-capable hosting. The production API origin is supplied to the web app through build-time public configuration.

## Module boundaries

The API is a modular monolith. Each module owns its routes, schemas, service logic, and persistence operations. Modules may call explicitly exported application services from other modules; avoid direct access to another module's internal tables or implementation.

| Module | MVP responsibility | Later responsibility |
|---|---|---|
| Identity | Registration, login, logout, session, current user | Account recovery, verification, linked identity |
| Profiles | Read and update player profile | Privacy controls, player preferences |
| Catalog | Public list, search, game details | Ranking, recommendations, collections |
| Publishing | — | Creator ownership, upload, versions, release |
| Moderation | — | Reports, review queue, enforcement, appeals |
| Administration | — | Role management and audited operations |

## Request lifecycle

1. Fastify receives the request.
2. Request ID, security headers, origin policy, and rate limits are applied.
3. Zod validates parameters, query strings, and request bodies.
4. Authentication resolves the session where required.
5. The route delegates to a module service.
6. The service enforces authorization and business invariants.
7. Drizzle accesses PostgreSQL within the module's persistence boundary.
8. A stable response envelope or documented error is returned.

## Initial API surface

All routes are versioned under `/api/v1`.

| Method | Route | Access | Purpose |
|---|---|---|---|
| GET | `/health` | Public | Liveness/readiness baseline |
| POST | `/auth/register` | Public, rate-limited | Create account |
| POST | `/auth/login` | Public, rate-limited | Create browser session |
| POST | `/auth/logout` | Authenticated | Revoke current session |
| GET | `/auth/me` | Authenticated | Return current account |
| GET | `/games` | Public | Browse published catalog |
| GET | `/games/:slug` | Public | Read published game detail |
| GET | `/profiles/:username` | Public | Read public player profile |
| PATCH | `/profiles/me` | Authenticated | Update own profile |

The first implementation slice should deliver health and read-only catalog endpoints before account mutation flows. Authentication endpoints must not be exposed until cookie, CSRF, rate-limit, and password-hashing behavior is tested.

## Authentication and browser security

- Use opaque, high-entropy server-side sessions; store only a hash of the session token in PostgreSQL.
- Passwords are hashed using Argon2id with parameters appropriate to the production runtime.
- Production cookies are Secure, HttpOnly, and SameSite=Lax or stricter where compatible.
- Restrict credentialed CORS to explicit portal origins. Never use wildcard origins with credentials.
- Protect state-changing cookie-authenticated requests with origin validation and a CSRF token strategy.
- Revoke sessions on logout and support server-side expiry.
- Do not place long-lived secrets or privileged tokens in browser storage.

## Data ownership

PostgreSQL is authoritative for platform users, profiles, game metadata, creator ownership, moderation records, and platform progression. Nakama is introduced later for real-time presence, chat, matchmaking, and multiplayer coordination. Any data mirrored between systems must have a documented source of truth and synchronization rule.

## Operational requirements

- Validate environment variables at startup and fail fast on invalid configuration.
- Provide structured logs with request IDs; never log passwords, cookies, session tokens, or secrets.
- Add readiness checks for database connectivity before production deployment.
- Use forward-only, reviewed migrations; never mutate production schema manually.
- Back up PostgreSQL and test restoration before public user onboarding.
- Keep API deployment and database credentials in hosting secrets, not GitHub source files.

## Repository target

```text
apps/
  web/                 # Static Next.js portal
  api/
    src/
      app.ts           # Fastify composition
      server.ts        # Runtime entry point
      config/           # Validated environment
      modules/
        identity/
        profiles/
        catalog/
      plugins/          # Shared Fastify plugins
      lib/              # Cross-cutting primitives
    drizzle/            # Versioned database migrations
    drizzle.config.ts
    package.json
    tsconfig.json
```

Add directories only when their first implementation files are introduced. Keep shared contracts in a package only when both applications genuinely consume them.
