# ADR-007: Games are independently built and integrated

- **Status:** Accepted
- **Date:** 2026-11-22

## Context
The platform is intended to host many different experiences. Coupling all games into one executable would constrain engine versions, release cycles, performance, and creator autonomy.

## Decision
Treat each game as an independently buildable and versioned package registered in the platform catalog. Integrate games through documented metadata, launch contracts, and a versioned SDK.

## Consequences
- Each game declares supported targets and runtime requirements.
- Game releases can be updated or rolled back independently.
- Upload validation and runtime isolation are mandatory before public creator publishing.
- Shared services must expose stable contracts and must not trust arbitrary game clients.
