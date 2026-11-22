# ADR-013: Dedicated modular Platform API

- Status: Accepted
- Date: 2026-11-22
- Decision owners: PROJECT NEXUS

## Context

The public web portal is deployed as a static Next.js export on GitHub Pages. Static hosting cannot run server-side route handlers, persistent sessions, background jobs, or database connections. Platform capabilities such as account registration, profiles, catalog management, creator ownership, and moderation therefore require a separately hosted runtime.

The platform needs a backend that is straightforward to develop and operate for an MVP, while preserving clear domain boundaries and a path to scale.

## Decision

- Create a dedicated API application at `apps/api`.
- Use Fastify 5 and TypeScript on Node.js 24.
- Start with a modular monolith. Organize code by domain and enforce module boundaries; do not split domains into independently deployed microservices in the MVP.
- Use PostgreSQL as the system of record for platform-owned data.
- Use Drizzle ORM for typed database access and versioned schema migrations.
- Use Zod for request and environment validation.
- Publish a versioned HTTP API under `/api/v1`; document the contract with OpenAPI.
- Keep the static Next.js portal as a client of this API. Configure production API origins through environment variables; do not hardcode deployment hosts.
- Keep authentication and authorization decisions server-side. Game clients and browser clients are untrusted.
- Integrate Nakama later for social and real-time multiplayer capabilities. It does not replace the platform's PostgreSQL ownership model.

## Initial domain modules

1. **Identity:** users, credentials, sessions, registration, login, logout, current-user endpoint.
2. **Profiles:** public player profile fields and profile updates with ownership checks.
3. **Catalog:** public game metadata, discovery queries, and game detail reads.
4. **Publishing (later):** creator ownership, game versions, upload validation, moderation, and release state.
5. **Administration (later):** privileged actions and auditable moderation operations.

## Security requirements

- Hash passwords with a modern password-hashing algorithm; never store plaintext passwords.
- Use secure, HTTP-only cookies for browser sessions in production, with explicit SameSite and origin/CSRF protections.
- Validate all inputs and reject unknown or malformed payloads.
- Apply rate limits to authentication and other abuse-sensitive endpoints.
- Enforce authorization and ownership checks inside the API, not in UI controls.
- Keep secrets out of source control and expose only validated environment configuration.
- Do not execute uploaded game packages inside the API process. Package inspection and execution, if ever required, must occur in isolated workers.

## Consequences

### Positive
- The API can be hosted independently of GitHub Pages.
- Domain boundaries remain clear without the operational cost of microservices.
- TypeScript can be shared across the web and API layers where contracts are stable.
- PostgreSQL remains the authoritative store for platform-owned records.

### Trade-offs
- The API requires a separate hosting environment, secrets, database provisioning, and operational monitoring.
- Browser authentication requires correct cookie, CORS, CSRF, and origin configuration.
- The team must maintain API contracts and database migrations.

## Follow-up

- Define the initial relational schema and migration workflow.
- Implement health checks and the first public catalog endpoint.
- Implement registration, login, logout, and current-user flows with security tests.
- Add API deployment only after the service can be configured with production secrets and a managed PostgreSQL instance.
