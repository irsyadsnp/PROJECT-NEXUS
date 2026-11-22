# ADR-009 — Reproducible npm Dependency Installation

- Status: Accepted
- Date: 2026-11-22

## Context

The repository uses npm workspaces. CI initially ran without a committed root `package-lock.json`, so dependency resolution could vary between environments.

## Decision

- Use one root `package-lock.json` for all npm workspaces.
- Use `npm ci` whenever the lockfile exists.
- During the initial bootstrap, use `npm install` to generate the lockfile.
- On pushes to `main`, GitHub Actions proposes the generated lockfile through a dedicated pull request rather than pushing directly to `main`.
- Pull-request validation does not create or update the lockfile pull request.
- Keep Node.js 24 as the standardized runtime.

## Consequences

- Dependency versions become reproducible after the lockfile is merged.
- CI uses the stricter `npm ci` installation path on subsequent runs.
- The lockfile change is reviewed as a pull request, avoiding non-fast-forward pushes to `main` from a stale workflow checkout.
- GitHub Actions requires repository contents write and pull-request write permissions to create the automation pull request.
