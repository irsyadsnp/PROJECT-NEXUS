# ADR-009 — Reproducible npm Dependency Installation

- Status: Accepted
- Date: 2026-11-22

## Context

The repository uses npm workspaces. A successful CI run exposed that the repository did not yet contain a root `package-lock.json`. Without a committed lockfile, dependency resolution can drift between machines and CI runs.

## Decision

- Use a single root `package-lock.json` for all npm workspaces.
- Use `npm ci` whenever the lockfile exists.
- On the first push-based CI run without a lockfile, use `npm install`, then commit the generated lockfile using the GitHub Actions bot.
- Pull-request validation does not write to the repository.
- Keep Node.js 24 as the standardized runtime.

## Consequences

- Dependency versions become reproducible after the initial lockfile commit.
- CI can use the stricter `npm ci` installation path on subsequent runs.
- The initial lockfile bootstrap requires the workflow token to have repository contents write permission on pushes to `main`.
- Review dependency changes through the lockfile diff in GitHub.
