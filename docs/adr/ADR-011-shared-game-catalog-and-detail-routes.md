# ADR-011: Shared game catalog and dynamic detail routes

- Status: Accepted
- Date: 2026-11-22
- Decision owners: PROJECT NEXUS

## Context

The Discover route and game detail routes need a single consistent source of game metadata. Duplicating local records across routes would create drift and make the later API migration harder.

## Decision

- Move initial typed game records into `apps/web/lib/games.ts`.
- Give each game a stable slug, status, developer, long description, feature list, tags, and planned platform metadata.
- Resolve detail pages through the Next.js App Router at `/games/[slug]`.
- Generate static params for known catalog entries and use `notFound()` for unknown slugs.
- Link each Discover card and featured landing-page title to its detail page.
- Keep the Play control disabled unless the game status is explicitly `published`.

## Consequences

### Positive
- Discover, landing, and detail pages use the same canonical metadata for game records.
- Unknown slugs return a proper 404.
- The catalog can be replaced by an API-backed repository later.
- Prototype concepts cannot accidentally be launched as playable games.

### Trade-offs
- The initial catalog remains static and local.
- Platform labels are plans, not verified compatibility claims.
- The Play control has no launcher integration yet.

## Follow-up

Add a typed catalog service backed by the platform API and database. Implement launch tickets and compatibility checks only after game builds and runtime targets exist.
