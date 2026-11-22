# Repository Structure

This is the intended structure. Add directories when their first real file is introduced; Git does not track empty folders.

```text
PROJECT-NEXUS/
├── apps/
│   ├── web/                 # Static player-facing portal
│   ├── api/                 # Modular Platform API (Fastify)
│   └── creator-studio/      # Creator publishing interface
├── packages/
│   └── shared/              # Shared types and contracts (when needed)
├── game-sdk/
│   └── godot/               # Godot integration SDK
├── games/
│   ├── voxel-world/         # 3D reference experience
│   └── 2d-platformer/       # 2D reference experience
├── packages/
│   └── contracts/           # Shared API contracts when genuinely needed
├── infrastructure/
│   ├── database/
│   ├── nakama/
│   └── deployment/
├── docs/
│   ├── architecture/
│   ├── adr/
│   └── roadmap/
├── .gitignore
└── README.md
```

## Organization rules

- Keep the web portal and creator interface separate at the application boundary; they may share UI and API packages.
- Keep every game independently buildable.
- Put shared platform contracts in a versioned SDK/package rather than copying API assumptions into each game.
- Keep deployment configuration and database migrations under version control.
- Do not create a separate microservice for every domain in the MVP. Begin with modular boundaries in one platform API.
