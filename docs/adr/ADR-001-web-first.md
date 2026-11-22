# ADR-001: Web-first platform

- **Status:** Accepted
- **Date:** 2026-11-22

## Context
The platform needs a low-friction discovery and account experience across devices. Building native clients for every platform at the start would multiply implementation and release costs.

## Decision
Build the player-facing platform as a responsive web application first. Support desktop game builds where browser execution is unsuitable. Consider Android after the web MVP is validated.

## Consequences
- Fast access through a browser and a single initial deployment surface.
- Game compatibility must be declared per target.
- Browser limitations mean not every game can be promised as a web build.
- A desktop launcher may be added without replacing the web portal.
