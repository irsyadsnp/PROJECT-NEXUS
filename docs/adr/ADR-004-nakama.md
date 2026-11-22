# ADR-004: Nakama for multiplayer and social capabilities

- **Status:** Accepted
- **Date:** 2026-11-22

## Context
Real-time social and multiplayer features require capabilities beyond ordinary CRUD endpoints.

## Decision
Adopt Nakama as the initial backend for account-linked social and multiplayer features, including friends, chat, matchmaking, and leaderboards.

## Consequences
- Define which system owns each user and game data field.
- Keep game simulation authority in the game-specific server design.
- Test operational requirements, hosting, version compatibility, and integration before public launch.
