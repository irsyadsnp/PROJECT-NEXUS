# ADR-016: Render for Initial Platform API Hosting

- Status: Accepted
- Date: 2026-11-22

## Context

PROJECT NEXUS needs a server-capable deployment target for its Fastify Platform API. The web portal is static, but the API requires a persistent Node.js process and outbound PostgreSQL connectivity to Neon.

## Decision

Use Render Web Services on the Free plan for the initial MVP deployment, in the Singapore region. Keep PostgreSQL hosted separately on Neon in Singapore.

The Render service uses the repository Blueprint configuration in `render.yaml`. Runtime configuration:
- Build: `npm ci && npm run api:build`
- Start: `npm run api:start`
- Health check: `/api/v1/health`
- `HOST=0.0.0.0`
- `NODE_ENV=production`
- `DATABASE_URL` supplied manually as a secret using the Neon pooled connection string.

## Consequences

- No-cost initial API hosting is available for MVP validation.
- Free services spin down after 15 minutes without inbound traffic and may take about one minute to wake.
- Free instances have resource and reliability limitations and are not suitable for production workloads.
- The API remains stateless; persistent data stays in Neon.
- Upgrade the service plan before production launch or sustained multiplayer/API traffic.

## Security

- Never commit database credentials.
- Configure `DATABASE_URL` in the Render dashboard as a secret.
- Do not use `DATABASE_URL_UNPOOLED` as the API runtime connection.
