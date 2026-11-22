# ADR-019: Neon Drift as the First Godot Game

- Status: Accepted
- Date: 2026-11-22
- Decision owners: PROJECT NEXUS

## Context

The platform needs a real first-party game to validate the eventual game packaging and launch flow. The web portal and catalog provider are in place, but the catalog entries are still concepts and the production API is deferred.

## Decision

1. Build Neon Drift as a standalone Godot 4 2D precision platformer.
2. Keep the game source under `games/neon-drift`, independent from the Next.js portal and Platform API.
3. Start with one compact level and a narrow gameplay loop: move, jump, avoid hazards, respawn, and reach the finish.
4. Use keyboard controls and built-in Godot physics; do not add multiplayer, accounts, SDK dependencies, monetization, or creator tooling to this first prototype.
5. Treat source creation and runtime validation as separate milestones. The game remains a prototype and must not be advertised as playable until it has been run and tested in Godot 4.
6. Validate the desktop project first, then investigate a Web export and portal launch integration as separate gates.

## Consequences

- The first game can be developed and tested without waiting for API hosting.
- The game remains independently buildable and can later adopt a documented NEXUS launch contract.
- Browser packaging, platform identity, cloud saves, and multiplayer remain out of scope for this milestone.
