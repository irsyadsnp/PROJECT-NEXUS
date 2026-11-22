# ADR-008: Bootstrap the web platform as an npm workspace

- **Status:** Accepted
- **Date:** 2026-11-22

## Context
The repository will contain multiple applications and shared packages. The initial setup must be easy to install on a standard Node.js development environment without requiring an additional package manager.

## Decision
Use npm workspaces at the repository root. Place the first Next.js App Router application in `apps/web`. Standardize development on Node.js 24 and use TypeScript, ESLint, and Tailwind CSS.

## Consequences
- Dependencies are installed from the repository root.
- Root scripts provide a single entry point for common web tasks.
- The initial workspace can grow to include Creator Studio and shared packages.
- A lockfile must be generated with the first dependency installation and committed.
- This bootstrap does not imply that backend services or game runtimes are implemented.
