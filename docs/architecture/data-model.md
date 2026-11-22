# Platform Database Model

## Design principles

- PostgreSQL is the source of truth for platform-owned records.
- Use UUID primary keys for externally referenced entities.
- Store timestamps in UTC using `timestamptz`.
- Use unique constraints for identity fields; do not rely on application-only checks.
- Keep public profile data separate from authentication credentials.
- Treat game catalog visibility and release state as server-controlled.
- Use migrations as the only supported schema-change mechanism.

## MVP tables

### `users`

Account identity and credential record.

| Column | Type | Constraints / notes |
|---|---|---|
| id | uuid | Primary key |
| email | varchar(320) | Not null; unique; normalized lowercase |
| username | varchar(32) | Not null; unique; normalized lowercase |
| password_hash | text | Not null; Argon2id encoded hash |
| role | varchar(16) | Not null; default `player`; constrained to known roles |
| status | varchar(16) | Not null; default `active`; constrained to active, suspended, deleted |
| created_at | timestamptz | Not null; default now() |
| updated_at | timestamptz | Not null; default now() |

Never return `password_hash` from API responses. Email and username changes require explicit validation and uniqueness checks.

### `player_profiles`

Public-facing player information, one-to-one with a user.

| Column | Type | Constraints / notes |
|---|---|---|
| user_id | uuid | Primary key; FK to users.id with cascade delete |
| display_name | varchar(40) | Not null |
| bio | varchar(280) | Not null; default empty |
| avatar_url | text | Nullable; must reference approved media |
| created_at | timestamptz | Not null; default now() |
| updated_at | timestamptz | Not null; default now() |

Do not place private account data or moderation notes in this table.

### `sessions`

Opaque server-side browser sessions.

| Column | Type | Constraints / notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | Not null; FK to users.id with cascade delete |
| token_hash | char(64) | Not null; unique hash of random session token |
| expires_at | timestamptz | Not null |
| created_at | timestamptz | Not null; default now() |
| last_seen_at | timestamptz | Nullable |
| revoked_at | timestamptz | Nullable |

Only the raw random token is sent once in a secure cookie. Persist only its cryptographic hash. Expired and revoked sessions must not authenticate requests.

### `games`

Canonical catalog metadata. The initial seed may contain concept records, but public catalog endpoints must return only records explicitly approved for publication.

| Column | Type | Constraints / notes |
|---|---|---|
| id | uuid | Primary key |
| slug | varchar(80) | Not null; unique |
| title | varchar(120) | Not null |
| short_description | varchar(280) | Not null |
| description | text | Not null; default empty |
| genre | varchar(40) | Not null |
| format | varchar(8) | Not null; constrained to 2d or 3d |
| status | varchar(16) | Not null; constrained to concept, prototype, published, suspended |
| visibility | varchar(16) | Not null; constrained to private, unlisted, public |
| developer_user_id | uuid | Nullable; FK to users.id |
| cover_image_url | text | Nullable; approved media only |
| created_at | timestamptz | Not null; default now() |
| updated_at | timestamptz | Not null; default now() |
| published_at | timestamptz | Nullable |

Public listing requires both `status = 'published'` and `visibility = 'public'`. A hidden or suspended game must never become public through a client-supplied filter.

## Later tables (not part of the first migration)

- `game_versions`: immutable release metadata, semantic version, target platform, artifact key, checksum, engine version, review status, and creator.
- `game_ownerships`: creator/team ownership and role assignments.
- `game_tags` and `tags`: normalized searchable tags.
- `reports`: user-submitted safety and policy reports.
- `moderation_actions`: append-only audit trail for moderator decisions.
- `friendships`, `messages`, `achievements`, and `leaderboard_entries`: later social/progression capabilities; assess Nakama ownership before creating platform duplicates.

## Relationships

```text
users 1 ─── 1 player_profiles
users 1 ─── N sessions
users 1 ─── N games (developer_user_id, optional)
games 1 ─── N game_versions (later)
users N ─── N games through game_ownerships (later)
```

## Indexes and constraints

- Unique indexes: normalized `users.email`, normalized `users.username`, `games.slug`, `sessions.token_hash`.
- Session lookup index: `sessions(user_id, expires_at)`.
- Catalog index: `games(status, visibility, published_at)`; add genre/format indexes only after query patterns justify them.
- Add database CHECK constraints for enumerated role, status, format, and visibility values.
- Add foreign keys for every ownership relation.
- Use transactions for registration so user and profile creation either both succeed or both roll back.
- Avoid hard deletion for user accounts once public activity exists; define anonymization/retention policy before production onboarding.

## First migration scope

The first migration should create only `users`, `player_profiles`, `sessions`, and `games`, plus constraints and indexes described above. Do not pre-create speculative marketplace, currency, inventory, or chat tables.

## Open operational decisions

- Choose a managed PostgreSQL host and region before production provisioning.
- Define backup retention, restore testing, and account-data retention policy before onboarding real users.
- Decide whether game catalog records are seeded from code or managed through an admin workflow; the database remains the production source of truth.
