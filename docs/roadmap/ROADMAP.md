# Product Roadmap

Roadmap phases are delivery gates, not promises of dates. Each phase must have a working, testable outcome before the next phase expands scope.

## Stage 0 — Foundation
- [x] Confirm product direction: UGC gaming platform, 2D and 3D.
- [x] Select initial technology direction.
- [x] Record architecture decisions.
- [x] Establish initial web coding conventions and agent guidance.

**Exit condition:** repository architecture and technical decisions are documented and reviewed. Initial web coding guidance is in place.

## Stage 1 — Platform MVP
- [x] Bootstrap responsive Next.js web portal shell.
- [x] Validate installation and quality checks in GitHub Actions.
- [x] Validate lint, typecheck, and production build in GitHub Actions.
- [x] Commit the generated npm lockfile and switch CI to deterministic installs.
- [x] Build initial responsive portal navigation and interactive local Game Catalog / Discover page.
- [x] Decide the Platform API architecture and module boundaries.
- [x] Define the initial PostgreSQL relational model.
- [x] Create the dedicated Platform API foundation (Fastify, TypeScript, Drizzle, Zod).
- [x] Provision Neon PostgreSQL in Singapore and establish the reviewed migration workflow.
- [x] Implement API health and readiness endpoints; verify them with the database in GitHub Actions.
- [ ] Implement public catalog API endpoints.
- [ ] Implement secure account registration, login, logout, sessions, and player profiles.
- [x] Create initial local game catalog, discovery filters, and static game detail pages.
- [x] Add a typed catalog data boundary that can switch from local mock data to the Platform API.
- [x] Add browser-local favorites and a My Library page (device-local only; no account simulation).
- [ ] Connect discovery and game detail pages to the Platform API after hosting resumes.
- [ ] Add a basic compatible-build launcher after a real game build is available.
- [ ] Add admin-only game listing controls.

**Temporary delivery strategy:** API runtime hosting and production API integration are deferred under [ADR-017](../adr/ADR-017-frontend-first-api-hosting-deferral.md). The catalog provider contract is defined in [ADR-018](../adr/ADR-018-game-catalog-provider-boundary.md). Continue frontend work with the existing local catalog. Do not represent mock data as live data or use browser storage for authentication, purchases, multiplayer, or authoritative progression.

**Exit condition:** a player can sign in, discover a published game, open its detail page, and launch a first-party experience. This exit condition still requires the deferred backend and real game build.

## Stage 2 — First-party games
- [ ] Build a small 2D platformer as the first end-to-end game.
- [ ] Build a limited 3D voxel sandbox prototype.
- [ ] Integrate the Godot SDK with platform identity and game metadata.
- [ ] Test web and desktop packaging separately.

**Exit condition:** two independently built games are registered and playable on their declared targets.

## Stage 3 — Social and multiplayer
- [ ] Integrate Nakama accounts/social features.
- [ ] Add friends and presence.
- [ ] Add chat with moderation controls.
- [ ] Add matchmaking or server discovery for a supported game.
- [ ] Add achievements and leaderboards.

**Exit condition:** one multiplayer game completes a tested end-to-end session.

## Stage 4 — Creator publishing
- [ ] Creator onboarding and ownership model.
- [ ] Game registration and metadata editor.
- [ ] Upload, validation, moderation, and release pipeline.
- [ ] Version history and rollback.
- [ ] Creator analytics.

**Exit condition:** an approved external creator can publish and update a game without direct repository access.

## Stage 5 — Creation ecosystem
- [ ] Visual creation tools and templates.
- [ ] Asset library and marketplace foundations.
- [ ] Expanded scripting/integration SDK.
- [ ] Monetization only after trust, policy, payments, and abuse controls are designed.

**Exit condition:** creators can produce and maintain richer experiences using documented tools.

## Stage 6 — Expansion
- [ ] Desktop launcher.
- [ ] Android client where technically viable.
- [ ] Cross-platform identity and multiplayer.
- [ ] Scaling, reliability, and cost optimization based on observed usage.

## Scope control

Do not start with a full Roblox-scale editor, marketplace, economy, or universal browser runtime. First prove the core loop: create or package a game, publish it safely, discover it, and play it.
