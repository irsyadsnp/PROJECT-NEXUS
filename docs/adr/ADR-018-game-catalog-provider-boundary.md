# ADR-018: Provider Boundary for the Game Catalog

- Status: Accepted
- Date: 2026-11-22
- Decision owners: PROJECT NEXUS

## Context

The web portal currently uses a checked-in TypeScript catalog as prototype data. Pages should not depend directly on the storage or transport mechanism because a future catalog API must be introduced without rewriting presentation components.

## Decision

1. Define an asynchronous `GameCatalogProvider` contract with `listGames()` and `getGameById(id)`.
2. Use `localGameCatalog` as the current implementation, backed by the checked-in prototype catalog.
3. Have server-rendered routes load catalog data through the provider and pass serializable game records to interactive client components.
4. Keep the provider selection explicit in one module. Do not introduce API calls, environment-dependent fallback behavior, or fake remote data before a reachable API is available.
5. Keep prototype game status authoritative: concept entries remain non-playable and must not be presented as published experiences.

## Consequences

- Home, Discover, My Library, and game detail pages share one catalog access contract.
- A future API-backed provider can implement the same asynchronous interface.
- The current site remains statically buildable with local prototype data.
- The local catalog remains the source of truth until API hosting is resumed and integration is validated.
