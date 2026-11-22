# Product Roadmap

Roadmap phases are delivery gates, not promises of dates. Each phase must have a working, testable outcome before the next phase expands scope.

## Stage 0 — Foundation
- [x] Confirm product direction: UGC gaming platform, 2D and 3D.
- [x] Select initial technology direction.
- [x] Record architecture decisions.
- [ ] Establish coding conventions and contribution workflow.

**Exit condition:** repository architecture and technical decisions are documented and reviewed.

## Stage 1 — Platform MVP
- [ ] Build responsive web portal.
- [ ] Implement account registration, login, and player profiles.
- [ ] Create game catalog, search, categories, and game detail pages.
- [ ] Add a basic compatible-build launcher.
- [ ] Add admin-only game listing controls.

**Exit condition:** a player can sign in, discover a published game, open its detail page, and launch a first-party experience.

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
