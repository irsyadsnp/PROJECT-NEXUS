# ADR-005: PostgreSQL as the platform database

- **Status:** Accepted
- **Date:** 2026-11-22

## Context
The platform needs durable relational data for users, games, ownership, releases, moderation, and catalog metadata.

## Decision
Use PostgreSQL as the primary database for platform-owned relational data.

## Consequences
- Schema changes must be versioned as migrations.
- Define indexes and retention policies based on measured query patterns.
- Avoid storing large game binaries in relational tables; use object storage.
