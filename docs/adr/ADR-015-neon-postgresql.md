# ADR-015: Managed PostgreSQL Provider

- Status: Accepted
- Date: 2026-11-22
- Decision owners: PROJECT NEXUS maintainers

## Context

The Platform API foundation uses PostgreSQL, the `pg` driver, and Drizzle ORM. The project needs a managed database for development and early MVP validation without requiring a local database installation. The initial deployment should remain low-cost and place the database near the expected Indonesian user base.

## Decision

Use **Neon Postgres** as the initial managed PostgreSQL provider, with the project created in **AWS Asia Pacific 1 (Singapore, ap-southeast-1)**.

Use the Free plan during development and MVP validation. Keep database access behind the Platform API; browser clients must never connect directly to PostgreSQL. Keep credentials in the API host's secret manager or deployment environment, never in Git.

## Rationale

- Neon provides a managed PostgreSQL service compatible with the existing `pg` and Drizzle implementation.
- The Free plan currently includes 1 GB storage per project and 100 compute-unit hours per project per month.
- Compute scales to zero after inactivity, which is suitable for an early project with intermittent traffic.
- Singapore is the closest listed Neon region to Indonesia and avoids the longer network path to US or European regions.
- Neon supports branching, which can later support isolated development and preview databases.

## Consequences and constraints

- The first query after idle may incur wake-up latency.
- Free-tier quotas are suitable for development and early validation, not a production availability commitment.
- Monitor compute hours, storage, and egress; reassess the plan before public launch or sustained traffic.
- Confirm current quotas and region availability in the Neon console when creating the project.
- No Neon account, project, database, credential, or billing configuration is created by this ADR.
- Do not run migrations until the owner has created the database, configured the API secret, and explicitly approved the target environment.

## Implementation notes

1. Create one Neon project named `project-nexus` in `ap-southeast-1`.
2. Use the default PostgreSQL database initially; keep development and production environments separate before public launch.
3. Store the connection string as `DATABASE_URL` in the API hosting environment. Do not commit it to `.env` files or GitHub.
4. Run the existing Drizzle migration only after verifying the target database and obtaining explicit approval.
5. Use a pooled connection endpoint for normal API traffic where supported by the eventual API host; use a direct connection for migration operations if required by the provider/tooling.

## References

- [Neon plans and quotas](https://neon.com/docs/introduction/plans)
- [Neon regional latency and available regions](https://neon.com/demos/regional-latency)
- [Neon Free plan update, 1 GB storage](https://neon.com/blog/neon-free-plan-1-gb-per-project)
