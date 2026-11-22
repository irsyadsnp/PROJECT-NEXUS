# ADR-003: Next.js and TypeScript for the web platform

- **Status:** Accepted
- **Date:** 2026-11-22

## Context
The platform requires discovery pages, player accounts, creator workflows, and administrative interfaces.

## Decision
Use Next.js with TypeScript for the web portal and creator-facing web experience. Use Tailwind CSS for initial styling.

## Consequences
- Shared types and validation can reduce contract drift.
- Keep player and creator experiences as clear application modules.
- Avoid premature frontend micro-app architecture.
