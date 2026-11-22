# ADR-014: Initial PostgreSQL relational model

- Status: Accepted
- Date: 2026-11-22
- Decision owners: PROJECT NEXUS

## Context

The Platform API requires a stable data model for account identity, browser sessions, player profiles, and the public game catalog. These domains have different privacy and lifecycle requirements and should not be collapsed into a single generic user or content table.

## Decision

- Use separate `users`, `player_profiles`, `sessions`, and `games` tables for the first database migration.
- Use UUID primary keys and UTC `timestamptz` timestamps.
- Enforce normalized email and username uniqueness in PostgreSQL.
- Store only Argon2id password hashes and hashes of opaque session tokens.
- Keep public profile attributes separate from credentials and private account state.
- Make catalog publication server-controlled: public discovery requires both published status and public visibility.
- Defer game versions, team ownership, moderation, marketplace, inventory, and social tables until their workflows are implemented and ownership boundaries are defined.
- Maintain schema changes through reviewed Drizzle migrations.

## Consequences

### Positive
- The initial schema covers the core identity and discovery loop without speculative domains.
- Database constraints protect invariants even when multiple API paths modify records.
- Credential and profile data have separate access boundaries.

### Trade-offs
- The schema will evolve as creator publishing, moderation, and social features are introduced.
- Production onboarding requires explicit retention, backup, and restore policies.

## Follow-up

Use `docs/architecture/data-model.md` as the initial schema specification. Review constraints and migration SQL before applying any migration to a production database.
