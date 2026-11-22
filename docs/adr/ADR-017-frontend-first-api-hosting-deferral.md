# ADR-017: Defer API Hosting and Continue Frontend-First

- Status: Accepted
- Date: 2026-11-22
- Decision owners: PROJECT NEXUS

## Context

The web portal already has a static Next.js implementation with a local typed game catalog, discovery filters, and static game detail routes. The Platform API foundation and Neon database/migration workflow have been developed, and API health/readiness checks pass in GitHub Actions.

However, deploying the Fastify API to Vercel has required repeated runtime and entrypoint troubleshooting. Continuing to block portal and game development on API hosting creates avoidable delivery friction. The web portal is designed for static deployment through GitHub Pages.

## Decision

1. Pause API runtime hosting and production API integration for the current frontend milestone. Do not spend further implementation time on Vercel/Render API deployment until a later, explicitly scheduled backend milestone.
2. Continue portal development using the existing typed local catalog in `apps/web/lib/games.ts` as clearly identified prototype/mock data.
3. Keep catalog access behind a small typed data boundary so the local source can later be replaced by an API-backed implementation without rewriting page components.
4. Browser-local persistence may be used only for non-sensitive, device-specific preferences such as favorites and recently viewed games.
5. Do not simulate real authentication, user identity, multiplayer, server-authoritative progression, creator ownership, or purchases with local storage.
6. Keep unpublished concepts non-playable. A game may be launched only when a compatible, validated build is actually available.
7. Preserve the existing API and Neon work as future infrastructure. Do not delete migrations, schemas, API code, or credentials as part of this deferral.

## Consequences

### Positive
- Frontend and first-party game work can continue without waiting for API hosting.
- The static portal remains deployable through GitHub Pages.
- Prototype data is explicit and replaceable.
- Local-only features can be tested without implying production account or backend capabilities.

### Trade-offs
- Favorites and recent history are isolated to the current browser/device.
- No cross-device synchronization, account system, or server-authoritative game state is available.
- Catalog updates require source changes until the API is deployed.

## Revisit criteria

Resume API hosting when the frontend reaches a stable integration boundary and the next milestone specifically requires server-backed catalog, identity, persistence, or multiplayer. At that point, select and validate one hosting target with a minimal health-check deployment before connecting frontend features.
