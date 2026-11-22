# PROJECT NEXUS — Architecture Overview

## 1. System shape

PROJECT NEXUS consists of a platform layer and independently packaged games.

- **Platform layer:** identity, profiles, discovery, catalog metadata, creator workflows, moderation, progression, and social features.
- **Game layer:** individual 2D/3D experiences built and released independently.
- **Integration layer:** a versioned SDK and documented APIs that allow games to use platform identity and selected shared capabilities.

A game is not a page or scene inside one giant application. It is a separately built experience registered in the platform catalog.

## 2. Logical components

| Component | Responsibility | Initial implementation |
|---|---|---|
| Web portal | Discovery, game pages, player profiles | Next.js + TypeScript |
| Creator Studio | Game registration and publishing workflow | Web application module |
| Platform API | Catalog, profiles, publishing metadata | TypeScript API module |
| Identity and social | Accounts, friends, chat, matchmaking | Nakama integration |
| Data | Platform records and relationships | PostgreSQL |
| Game runtime | 2D/3D game execution | Godot 4 |
| Game SDK | Consistent game-to-platform integration | Godot SDK |
| Build and asset storage | Versioned packages and media | Object storage + CDN |
| Moderation | Reports, review state, enforcement | Platform API module |

## 3. Initial deployment strategy

Start with a **modular monolith** for platform-owned business logic. Keep clear module boundaries in code, but avoid operating many independently deployed microservices before there is a demonstrated need.

Nakama may run as a separate infrastructure component because it provides a focused real-time multiplayer and social backend. PostgreSQL is the system of record for platform-owned data; define ownership boundaries carefully if Nakama also persists its own data.

## 4. Game delivery

Each game has metadata, ownership, visibility, supported platforms, version history, package artifacts, and moderation status.

A release pipeline should:
1. Receive a creator upload or trusted build artifact.
2. Check file type, size, manifest, and declared engine/runtime version.
3. Scan and validate the package in an isolated environment.
4. Apply moderation and policy checks.
5. Store immutable versioned artifacts.
6. Publish the approved version to the catalog.
7. Deliver compatible builds through web hosting or desktop distribution.

Never execute arbitrary uploaded code inside the platform API process or grant a game package direct access to platform secrets.

## 5. Runtime and compatibility

Godot 4 is the primary engine. Web exports can support suitable experiences, but browser support has constraints involving WebAssembly, WebGL 2, memory, download size, browser APIs, and networking. Do not promise that every 3D game will run in every browser.

The catalog should declare supported targets per game:
- Web
- Windows
- Linux
- Android (later phase)

The launcher selects a compatible build and gives the player a clear fallback when a target is unsupported.

## 6. Multiplayer model

Use Nakama for account-linked social and multiplayer capabilities such as friends, chat, matchmaking, and leaderboards. Game-specific authoritative simulation remains the responsibility of the game server/runtime design.

Competitive or economy-sensitive state must not rely on client-trusted values. Validate important actions server-side.

## 7. Security and trust boundaries

- Treat creator uploads and game packages as untrusted.
- Isolate validation and execution workloads.
- Apply upload quotas, rate limits, and file-size limits.
- Use least-privilege credentials and separate secrets by environment.
- Validate all API input and enforce ownership checks.
- Keep moderation events and administrative actions auditable.
- Design reporting, takedown, and appeal workflows before opening public publishing.

## 8. Key quality attributes

Prioritize safe publishing, reliable game delivery, clear versioning, observable failures, and backward-compatible SDK/API contracts. Optimize scale only after real usage provides evidence.
