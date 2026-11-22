# ADR-002: Godot 4 as the primary game engine

- **Status:** Accepted
- **Date:** 2026-11-22

## Context
The platform must support first-party 2D and 3D games while keeping the development stack accessible and avoiding engine licensing dependencies that are unsuitable for an early independent project.

## Decision
Use Godot 4 as the primary engine for first-party games and the initial creator SDK.

## Consequences
- One engine supports both 2D and 3D workflows.
- Export targets and browser compatibility must be tested per game.
- Engine version and export templates must be pinned for reproducible builds.
- Other engines may be considered later through a package/runtime contract, not assumed in the MVP.
