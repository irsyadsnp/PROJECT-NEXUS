# ADR-012: Static web deployment through GitHub Pages

- Status: Accepted
- Date: 2026-11-22
- Decision owners: PROJECT NEXUS

## Context

The web application is built with Next.js, but the repository had only a CI validation workflow. A successful Next.js build does not publish the site. The earlier proposed GitHub Pages URLs therefore returned 404 because no Pages deployment pipeline had been configured.

## Decision

- Use Next.js static export for the current public web portal.
- Set `output: "export"` and `trailingSlash: true`.
- Apply the repository base path `/PROJECT-NEXUS` only in GitHub Pages builds through the `GITHUB_PAGES=true` environment variable.
- Deploy the generated `apps/web/out` directory with GitHub Actions using the official Pages configure, upload, and deploy actions.
- Keep the existing Web CI workflow for pull-request validation and code quality checks.
- Do not imply server-side API, authentication, database, or dynamic runtime capabilities until those services are implemented and hosted.

## Consequences

### Positive
- The site can be hosted on the repository's GitHub Pages domain without a separate server.
- Static routes generated from the game catalog can be published.
- Deployment is repeatable on pushes to `main`.

### Trade-offs
- Static export cannot host Next.js server-side features, route handlers, or server actions.
- Future authentication, API, creator publishing, and multiplayer services must run as separate hosted services.
- Only game slugs returned by `generateStaticParams` are generated as detail pages at build time.

## Follow-up

Verify the first Pages deployment and test the root, Discover, and both generated game detail routes on the published domain.
