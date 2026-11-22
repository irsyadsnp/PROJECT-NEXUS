# ADR-006: GitHub as the source-control home

- **Status:** Accepted
- **Date:** 2026-11-22

## Context
The project needs version history, reviewable changes, issue tracking, and a canonical remote repository.

## Decision
Use the GitHub repository `irsyadsnp/PROJECT-NEXUS` as the canonical source-control repository, with `main` as the default branch.

## Consequences
- Commit messages should describe the change.
- Use branches and pull requests for substantial future work.
- Never commit secrets, local environment files, or generated build artifacts.
