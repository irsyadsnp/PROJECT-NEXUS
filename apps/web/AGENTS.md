# Agent Instructions — NEXUS Web

- Follow the repository architecture and accepted ADRs.
- Use TypeScript with strict mode; avoid `any`.
- Use the Next.js App Router.
- Prefer Server Components. Add Client Components only when browser-side interaction is required.
- Keep components small and colocate route-specific components with their route until reuse is established.
- Do not add authentication, database, or multiplayer dependencies until the relevant integration stage.
- Never commit secrets. Read configuration from environment variables and document new variables in `.env.example`.
- Keep the interface responsive and accessible: semantic HTML, keyboard navigation, visible focus, and sufficient contrast.
- Do not present mock data as live platform data. Label prototypes and placeholders clearly.
- Run lint, typecheck, and production build before declaring a change complete.
