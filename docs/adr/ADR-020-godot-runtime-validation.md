# ADR-020: Automated Godot Runtime Validation

- Status: Accepted
- Date: 2026-11-22
- Decision owners: PROJECT NEXUS

## Context

Neon Drift source was merged without a Godot runtime in the development environment. The existing web/API workflow does not parse GDScript or launch Godot scenes, so it cannot validate the game project.

## Decision

1. Add a dedicated GitHub Actions workflow for changes under `games/neon-drift/**`.
2. Pin the CI runtime to Godot 4.4.1 for reproducible validation.
3. Run a headless editor import to detect project and script parsing issues.
4. Launch the main scene headlessly for a short smoke test.
5. Keep desktop interaction testing and Web export validation as separate gates; a successful headless smoke test alone does not prove gameplay quality or browser compatibility.

## Consequences

- Changes to Neon Drift can receive engine-level validation in GitHub Actions.
- The workflow does not require a local Godot installation for routine source checks.
- Manual gameplay testing and Web export remain necessary before calling the game playable or publishing it.
