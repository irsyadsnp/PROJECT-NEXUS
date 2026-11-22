# PROJECT NEXUS

> A universe of games, built by everyone.

PROJECT NEXUS is a user-generated gaming platform where players discover and play games while creators build, publish, and maintain their own experiences.

## Product direction

- **Game formats:** 2D and 3D.
- **Experiences:** single-player and multiplayer.
- **Initial distribution:** web portal, with desktop builds supported where browser constraints make them unsuitable.
- **Creator workflow:** create independently, package, validate, publish, update, and manage a game.
- **Platform model:** independent games integrated through shared platform services and SDKs.

## Initial technology decisions

| Area | Decision |
|---|---|
| Game engine | Godot 4 |
| Web platform | Next.js, TypeScript, Tailwind CSS |
| Multiplayer and social | Nakama |
| Primary database | PostgreSQL |
| Source control | GitHub |

See [Architecture](docs/architecture/overview.md), [Roadmap](docs/roadmap/ROADMAP.md), and the [Architecture Decision Records](docs/adr/).

## Repository structure

```text
apps/                 Web portal and creator-facing applications
game-sdk/             Shared integration SDKs
games/                First-party reference games
infrastructure/       Deployment and local development configuration
docs/architecture/    System design
docs/adr/             Accepted technical decisions
docs/roadmap/         Delivery phases
```

The structure is a target map; directories will become tracked as implementation files are added.

## Development status

- **Foundation:** architecture, repository structure, roadmap, and ADRs are documented.
- **Web portal:** responsive landing page, local game catalog, discovery filters, and static game detail routes are implemented.
- **CI:** dependency installation, lint, typecheck, and production build are validated through GitHub Actions.
- **Deployment:** GitHub Pages static-export workflow is configured. The first deployment must complete before the public site URL is considered verified.

No production authentication, database integration, creator publishing, or playable games are implemented yet. Current catalog entries are concepts, not released games.

## Local development

Requirements: Node.js 24 and npm.

```bash
npm ci
npm run dev
```

## Deployment

The `Deploy Web to GitHub Pages` workflow builds a static Next.js export and publishes `apps/web/out` when changes are pushed to `main`.

The expected project site URL is:

`https://irsyadsnp.github.io/PROJECT-NEXUS/`

This URL should be considered active only after the first deployment succeeds.

## Principles

1. Build a working vertical slice before expanding scope.
2. Keep games independently buildable and deployable.
3. Treat uploaded game packages as untrusted input.
4. Keep platform identity, progression, and social features behind documented interfaces.
5. Prefer a modular monolith for the first release; split services only when scale or operational needs justify it.

## License

License selection is pending. Until a license is added, all rights are reserved by the repository owner.
