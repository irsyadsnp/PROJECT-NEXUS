# Web Development Setup

## Requirements

- Node.js 24 (see the repository `.nvmrc`).
- npm 10.9 or newer.
- Git.

The current Next.js installation guide requires Node.js 20.9 or newer. This repository standardizes on Node.js 24 for development consistency.

## Install

From the repository root:

```bash
nvm install
nvm use
npm install
```

If Node Version Manager (nvm) is not installed, install Node.js 24 LTS using the official Node.js distribution for your operating system.

## Environment

Copy the example environment file:

```bash
cp apps/web/.env.example apps/web/.env.local
```

The initial web shell does not require secrets or external services.

## Run the web application

```bash
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Workspace notes

The root package uses npm workspaces. Install dependencies from the repository root, not from `apps/web`. The first successful `npm install` creates the root `package-lock.json`; commit that lockfile to make dependency resolution reproducible.

## Current limitations

This stage creates the web application shell only. Authentication, persistent data, Nakama, PostgreSQL, creator uploads, and playable game builds are not connected yet.
