export type GameStatus = "concept" | "prototype" | "published";

export type Game = {
  id: string;
  title: string;
  genre: string;
  format: "2D" | "3D";
  description: string;
  longDescription: string;
  accent: "voxel" | "neon";
  stage: string;
  status: GameStatus;
  developer: string;
  tags: string[];
  supportedPlatforms: string[];
  features: string[];
};

export const games: Game[] = [
  {
    id: "voxel-frontier",
    title: "Voxel Frontier",
    genre: "Sandbox",
    format: "3D",
    description:
      "A persistent block-based world focused on exploration, building, and shared creation.",
    longDescription:
      "Voxel Frontier is the planned 3D sandbox experience for PROJECT NEXUS. The concept centers on exploring a block-based environment, shaping terrain, and building structures. Its first milestone will validate how an independently developed Godot game can connect to the NEXUS platform.",
    accent: "voxel",
    stage: "Concept",
    status: "concept",
    developer: "PROJECT NEXUS",
    tags: ["Exploration", "Building", "Creative"],
    supportedPlatforms: ["Web — planned", "Desktop — planned"],
    features: [
      "Explore a block-based environment",
      "Build and modify structures",
      "Validate independent game integration",
    ],
  },
  {
    id: "neon-drift",
    title: "Neon Drift",
    genre: "Platformer",
    format: "2D",
    description:
      "A precision platforming experiment built to validate the NEXUS game integration flow.",
    longDescription:
      "Neon Drift is a planned 2D precision platformer. The prototype will focus on responsive movement, readable level design, and a compact arcade loop. It is intended to be the first small game used to test packaging and launch integration.",
    accent: "neon",
    stage: "Concept",
    status: "concept",
    developer: "PROJECT NEXUS",
    tags: ["Precision", "Arcade", "Action"],
    supportedPlatforms: ["Web — planned", "Desktop — planned"],
    features: [
      "Precision-based platforming",
      "Compact arcade challenges",
      "Test the NEXUS game launch flow",
    ],
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.id === slug);
}
