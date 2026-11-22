# ADR-010: Local-first game discovery catalog

- Status: Accepted
- Date: 2026-11-22
- Decision owners: PROJECT NEXUS

## Context

The platform needs a player-facing discovery surface before account, database, and publishing services are integrated. The first catalog must be testable without presenting prototype data as live inventory.

## Decision

- Implement the first discovery route at `/discover` using the Next.js App Router.
- Keep the initial game records in a typed, route-local data collection.
- Support client-side search across title, genre, description, and tags.
- Support genre and 2D/3D format filters, plus a reset state.
- Label every entry as a concept/prototype and explicitly indicate that it is not playable.
- Keep catalog presentation separate from the platform data-access layer so the source can later be replaced by an API without changing the discovery interaction contract.
- Link the landing page's Discover navigation and primary call-to-action to `/discover`.

## Consequences

### Positive
- The discovery experience can be validated before backend infrastructure exists.
- Search and filters are immediately testable.
- Mock concepts are clearly distinguished from published games.
- The catalog can later be backed by a server-side API.

### Trade-offs
- Data is static and not user-editable.
- Search and filtering run in the browser and are suitable only for the small initial catalog.
- No game detail page, launch capability, ratings, or live availability is implied by this stage.

## Follow-up

Replace the local data source with a typed catalog API after the platform API and database schema are established.
